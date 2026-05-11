export type PostKind = "reports" | "notes";

export type Post = {
  kind: PostKind;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

export type Project = {
  name: string;
  type: string;
  summary: string;
  points: string[];
};

export const reports: Post[] = [
  {
    kind: "reports",
    slug: "cloudflare-workers-nextjs-start",
    title: "Cloudflare Workers に置く個人サイトの初期設計",
    date: "2026-05-11",
    excerpt:
      "Next.js の静的出力を Workers の Assets で配信し、記事とポートフォリオを同居させる方針を整理する。",
    body: [
      "このサイトは、まず静的なコンテンツサイトとして始める。更新頻度が高くない個人レポートでは、サーバー処理を最初から増やすより、ビルド済みの HTML を速く配る方が扱いやすい。",
      "記事データは TypeScript の配列に置いている。数が増えたら Markdown や MDX に移せるが、最初は構造を固定して、ページの見え方と分類を先に決める。",
      "Cloudflare Workers では wrangler の Assets 配信を使う。認証、検索、コメントなどが必要になった段階で、Worker 側の処理を追加する。",
    ],
  },
  {
    kind: "reports",
    slug: "report-template",
    title: "技術レポートを書くための最小テンプレート",
    date: "2026-05-10",
    excerpt:
      "目的、前提、試したこと、結果、次に見ることを固定して、あとから読み返せる記事にする。",
    body: [
      "技術レポートは、結論だけではなく前提を残すと価値が上がる。同じ選択を将来もう一度検討するとき、当時の制約が分かるからだ。",
      "一つの記事では、目的、環境、試した手順、結果、判断、未解決の項目を短く分ける。細かいログは必要なところだけ引用する。",
      "読者が未来の自分だけでも、タイトルと冒頭の要約は外向きに書く。検索や一覧で見たときに、何の記事か一瞬で分かるようにする。",
    ],
  },
];

export const notes: Post[] = [
  {
    kind: "notes",
    slug: "small-tools",
    title: "小さい道具を作ることについて",
    date: "2026-05-09",
    excerpt:
      "完成度よりも、日々の判断を少し軽くする道具を持つことの価値について。",
    body: [
      "個人用の小さい道具は、他人に説明しづらい癖や面倒を吸収できる。一般化しないからこそ、すぐ役に立つことがある。",
      "ただし、道具が増えすぎると管理対象になる。残すものは、何度も使うもの、考え方を記録できるもの、捨てても惜しくないものに分けたい。",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "My Report",
    type: "Personal site",
    summary:
      "技術レポート、ポートフォリオ、個人的なノートをまとめる静的サイト。",
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

export const featuredPosts = [...reports, ...notes]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export function getPostBySlug(kind: PostKind, slug: string) {
  const collection = kind === "reports" ? reports : notes;
  return collection.find((post) => post.slug === slug);
}
