import fs from "node:fs";
import path from "node:path";

export type PostKind = "reports" | "notes";

export type PostBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "list";
      items: string[];
    };

export type Post = {
  kind: PostKind;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: PostBlock[];
};

export type Project = {
  name: string;
  type: string;
  summary: string;
  points: string[];
};

const contentDirectory = path.join(process.cwd(), "content");

export const reports = getPosts("reports");
export const notes = getPosts("notes");
export const allPosts = [...reports, ...notes].sort((a, b) => b.date.localeCompare(a.date));

export const projects: Project[] = [
  {
    name: "My Report",
    type: "Personal site",
    summary:
      "個人的な技術レポート、制作物、ポートフォリオ、意見記事をまとめた個人サイト。",
    points: ["Next.js App Router", "Static export", "Cloudflare Workers Assets"],
  },
  {
    name: "Local Research Notes",
    type: "Writing workflow",
    summary:
      "検証ログと記事の下書きをつなげるための、個人用リサーチノート運用。",
    points: ["Draft first", "Short summaries", "Reusable report format"],
  },
  {
    name: "Tool Experiments",
    type: "Prototype archive",
    summary:
      "作り切る前の試作を、判断材料として残すための小さなアーカイブ。",
    points: ["Prototype logs", "Decision records", "Next action notes"],
  },
];

export const featuredPosts = allPosts.slice(0, 3);

export function getPostBySlug(kind: PostKind, slug: string) {
  const collection = kind === "reports" ? reports : notes;
  return collection.find((post) => post.slug === slug);
}

function getPosts(kind: PostKind): Post[] {
  const directory = path.join(contentDirectory, kind);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(directory, fileName), "utf8");
      const { frontmatter, markdown } = parseFrontmatter(raw);

      return {
        kind,
        slug,
        title: frontmatter.title ?? slug,
        date: frontmatter.date ?? "1970-01-01",
        excerpt: frontmatter.excerpt ?? "",
        tags: parseTags(frontmatter.tags),
        body: parseMarkdown(markdown),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function parseTags(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { frontmatter: {}, markdown: raw } as {
      frontmatter: Record<string, string>;
      markdown: string;
    };
  }

  const closingIndex = raw.indexOf("\n---", 3);

  if (closingIndex === -1) {
    return { frontmatter: {}, markdown: raw } as {
      frontmatter: Record<string, string>;
      markdown: string;
    };
  }

  const frontmatterText = raw.slice(3, closingIndex).trim();
  const markdown = raw.slice(closingIndex + 4).trim();
  const frontmatter = Object.fromEntries(
    frontmatterText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
        return [key, value];
      }),
  );

  return { frontmatter, markdown };
}

function parseMarkdown(markdown: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  const lines = markdown.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", text: line.replace(/^##\s+/, "") });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().replace(/^-\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    if (isTableStart(lines, index)) {
      const headers = splitTableRow(lines[index]);
      index += 2;
      const rows: string[][] = [];

      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("## ") &&
      !lines[index].trim().startsWith("- ") &&
      !isTableStart(lines, index)
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function isTableStart(lines: string[], index: number) {
  const current = lines[index]?.trim();
  const next = lines[index + 1]?.trim();
  return Boolean(
    current?.startsWith("|") &&
      next?.startsWith("|") &&
      /^\|?[\s:-]+\|[\s|:-]*$/.test(next),
  );
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}
