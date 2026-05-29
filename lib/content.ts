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
      type: "image";
      alt: string;
      src: string;
      caption?: string;
    }
  | {
      type: "code";
      language?: string;
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
  category: string;
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
  downloads?: {
    label: string;
    href: string;
    note?: string;
  }[];
  body?: PostBlock[];
};

const contentDirectory = path.join(process.cwd(), "content");

export const reports = getPosts("reports");
export const notes = getPosts("notes");
export const allPosts = [...reports, ...notes].sort((a, b) => b.date.localeCompare(a.date));

export const projects: Project[] = [
  {
    slug: "idea-canvas-web",
    name: "Idea Canvas Web / Desktop",
    type: "Web / Desktop app",
    summary:
      "カードを動的に並び替えながら、アイデアや検討事項をブラウザとローカルのデスクトップ環境で整理するアプリ。",
    points: ["Next.js", "React", "TypeScript", "Tauri v2", "Cloudflare Workers"],
    url: "https://idea-canvas-web.ysmyapp.workers.dev/",
    downloads: [
      {
        label: "Windows版をダウンロード",
        href: "/downloads/idea-canvas_0.1.0_x64_en-US.msi",
        note: "Portfolio preview / Windows installer",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "Idea Canvas は、アイデアや検討事項をカードとして並べ、ブラウザ上でもローカルのデスクトップアプリとしても動かせるようにした整理ツールです。単にテキストを入力して一覧表示するだけではなく、カードを対話的に動かしながら、考えを整理することを目的にしています。",
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
          ["Windows版", "[idea-canvas_0.1.0_x64_en-US.msi](/downloads/idea-canvas_0.1.0_x64_en-US.msi)"],
          ["目的", "アイデアや検討事項をカードとして整理する"],
          ["主な技術", "Next.js、React、TypeScript、Tauri v2、Cloudflare Workers"],
          ["保存方法", "Web版はブラウザ側の保存領域を利用。Desktop版はローカル環境で動作するWindowsアプリとしてビルド"],
          ["入出力", "JSON形式の保存・読み込み、テキスト / Markdownとして扱いやすい形式での出力に対応"],
          ["想定用途", "アイデア整理、タスク分類、検討メモ、簡易ブレインストーミング"],
        ],
      },
      {
        type: "heading",
        text: "Web版とDesktop版",
      },
      {
        type: "paragraph",
        text: "Web版はブラウザからすぐに触れる公開デモとして用意し、Desktop版は同じアイデア整理ツールをTauri v2でWindows向けにパッケージ化しました。ポートフォリオでは、Webアプリを公開するだけでなく、ローカルで起動できるデスクトップアプリとして配布可能な形まで作れることを示すために、Windowsインストーラーも掲載しています。",
      },
      {
        type: "table",
        headers: ["版", "役割", "見せたい点"],
        rows: [
          ["Web版", "ブラウザで動く公開デモ", "Cloudflare Workers上にデプロイし、URLからすぐ試せること"],
          ["Desktop版", "ローカルで起動するWindowsアプリ", "Tauri v2でインストーラー形式にビルドし、ブラウザ外のアプリとして配布できること"],
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
          "Tauri v2 を使ってWeb技術ベースのUIをデスクトップアプリとしてビルドできること",
          "カード型UIのような対話的な画面を構築できること",
          "ユーザー操作に応じて状態を更新できること",
          "整理した内容をJSONで保存・読み込みし、テキスト / Markdownとして再利用しやすく出力できること",
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
          "複数キャンバスの管理",
          "必要になった場合の Supabase 連携",
        ],
      },
    ],
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
        category: frontmatter.category ?? "Uncategorized",
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

    if (line.startsWith("```")) {
      const language = line.replace(/^```/, "").trim() || undefined;
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({ type: "code", language, text: codeLines.join("\n") });
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

    if (imageMatch) {
      const alt = imageMatch[1].trim();
      blocks.push({
        type: "image",
        alt,
        src: imageMatch[2].trim(),
        caption: alt || undefined,
      });
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
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/) &&
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
