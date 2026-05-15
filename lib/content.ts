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
  slug: string;
  name: string;
  type: string;
  summary: string;
  points: string[];
  url?: string;
  body?: PostBlock[];
};

const contentDirectory = path.join(process.cwd(), "content");

export const reports = getPosts("reports");
export const notes = getPosts("notes");
export const allPosts = [...reports, ...notes].sort((a, b) => b.date.localeCompare(a.date));

export const projects: Project[] = [
  {
    slug: "idea-canvas-web",
    name: "Idea Canvas Web",
    type: "Interactive web app",
    summary:
      "カードを動的に並び替えながら、アイデアや検討事項をブラウザ上で整理するWebアプリ。",
    points: ["Next.js", "React", "Browser storage", "Cloudflare Workers"],
    url: "https://idea-canvas-web.ysmyapp.workers.dev/",
    body: [
      {
        type: "paragraph",
        text: "Idea Canvas Web は、アイデアや検討事項をカードとして並べ、ブラウザ上で動的に整理できるWebアプリです。単にテキストを入力して一覧表示するだけではなく、カードを対話的に動かしながら、考えを整理することを目的にしています。",
      },
      {
        type: "heading",
        text: "作ったもの",
      },
      {
        type: "table",
        headers: ["項目", "内容"],
        rows: [
          ["公開URL", "[https://idea-canvas-web.ysmyapp.workers.dev/](https://idea-canvas-web.ysmyapp.workers.dev/)"],
          ["目的", "アイデアや検討事項をカードとして整理する"],
          ["主な技術", "Next.js、React、Cloudflare Workers"],
          ["保存方法", "ブラウザ側の保存領域を利用"],
          ["想定用途", "アイデア整理、タスク分類、検討メモ、簡易ブレインストーミング"],
        ],
      },
      {
        type: "heading",
        text: "Next.js と React で作った理由",
      },
      {
        type: "paragraph",
        text: "Next.js はページ構成やデプロイの見通しを立てやすく、React はカードの追加、編集、並び替えのような状態を持つUIを作りやすいです。今回のようなアプリでは、ユーザーの操作に応じて画面上のカードの並びや内容が変わるため、React の state を使って画面状態を管理する構成が自然でした。",
      },
      {
        type: "heading",
        text: "Supabase ではなくブラウザ保存にした理由",
      },
      {
        type: "paragraph",
        text: "最初は Supabase を使ってデータベースに保存する構成も考えました。ユーザーごとにデータを保存したり、ログイン機能を付けたりするなら、Supabase のようなBaaSは便利です。ただし、今回の目的は長期的にポートフォリオとして公開し続けることでした。",
      },
      {
        type: "paragraph",
        text: "無料枠の条件変更、プロジェクト停止、利用期限、認証やDB管理の手間が増えると、見せたいものに対して構成が重くなります。そのため今回は、バックエンドやDBを用意せず、ブラウザ側に保存する形を選びました。",
      },
      {
        type: "table",
        headers: ["保存方法", "メリット", "注意点"],
        rows: [
          ["Supabase", "複数端末同期、ログイン、共有、永続DBに向いている", "認証、DB設計、無料枠、運用管理を考える必要がある"],
          ["ブラウザ保存", "構成が軽く、ポートフォリオとして長期公開しやすい", "端末やブラウザをまたいだ同期には向かない"],
        ],
      },
      {
        type: "heading",
        text: "ポートフォリオとして見せたい点",
      },
      {
        type: "list",
        items: [
          "Next.js と React で動的なWebアプリを作れること",
          "カード型UIのような対話的な画面を構築できること",
          "ユーザー操作に応じて状態を更新できること",
          "Cloudflare Workers に公開して、実際に触れる形でデプロイできること",
          "DBを使う場合と使わない場合の設計判断ができること",
        ],
      },
      {
        type: "heading",
        text: "今後の改善案",
      },
      {
        type: "list",
        items: [
          "カードの色やカテゴリ分け",
          "キーワード検索",
          "エクスポート / インポート",
          "JSON や Markdown 形式での保存",
          "複数キャンバスの管理",
          "必要になった場合の Supabase 連携",
        ],
      },
    ],
  },
  {
    slug: "my-report",
    name: "My Report",
    type: "Personal site",
    summary:
      "個人的な技術レポート、制作物、ポートフォリオ、意見記事をまとめた個人サイト。",
    points: ["Next.js App Router", "Static export", "Cloudflare Workers Assets"],
  },
  {
    slug: "local-research-notes",
    name: "Local Research Notes",
    type: "Writing workflow",
    summary:
      "検証ログと記事の下書きをつなげるための、個人用リサーチノート運用。",
    points: ["Draft first", "Short summaries", "Reusable report format"],
  },
  {
    slug: "tool-experiments",
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

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
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
