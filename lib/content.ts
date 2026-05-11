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
  body: PostBlock[];
  references?: {
    label: string;
    href: string;
  }[];
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
    slug: "cloud-platform-comparison-2026",
    title: "クラウドプラットフォーム比較メモ: AWS / Azure / GCP と Vercel / Cloudflare",
    date: "2026-05-11",
    excerpt:
      "三大クラウドとフロントエンド・エッジ系プラットフォームを、個人開発と実務選定の観点から整理する。",
    body: [
      {
        type: "paragraph",
        text: "Web アプリケーションを作るとき、どのクラウドやデプロイ先を選ぶかは意外と大きな判断になる。単に有名だから、安そうだから、という理由だけではなく、作りたいものの規模、運用にかけられる時間、チームの技術スタック、将来の拡張性によって適した選択肢は変わる。",
      },
      {
        type: "paragraph",
        text: "この記事では、自分がこれまで調べた AWS、Azure、GCP の三大クラウドと、フロントエンド寄りのデプロイ先としてよく使われる Vercel、Cloudflare を比較しながら、どう使い分けるとよさそうかを整理する。",
      },
      {
        type: "heading",
        text: "三大クラウドの比較",
      },
      {
        type: "table",
        caption: "AWS / Azure / GCP のざっくり比較",
        headers: ["プラットフォーム", "強み", "向いているケース", "注意点"],
        rows: [
          [
            "AWS",
            "サービス数と事例が多く、compute、storage、database、analytics、networking、security などを幅広く組み合わせられる。",
            "大規模な業務システム、複雑な要件、先行事例や学習資料の多さを重視するプロジェクト。",
            "IAM、VPC、料金、監視など、最初に理解する範囲が広い。",
          ],
          [
            "Azure",
            "Microsoft 製品や既存の企業システムとの親和性が高い。オンプレミス、マルチクラウド、エッジを含めた運用にも強い。",
            "Active Directory、Microsoft 365、Windows Server、.NET などを前提にした企業システム。",
            "個人開発で最初に選ぶより、既存の Microsoft 資産がある環境で強みが出やすい。",
          ],
          [
            "GCP",
            "Google のインフラ思想に近く、BigQuery、GKE、Vertex AI などデータ分析、機械学習、Kubernetes 周辺に強い。",
            "大量データの分析、AI 活用、Kubernetes を中心にした開発基盤。",
            "本格利用にはクラウド全体の設計力が必要になる。",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "AWS は総合力が高く、事例も多い。EC2、S3、RDS、Lambda など、名前を聞く機会が多い基本サービスも多く、学習教材や実務情報を探しやすい。一方で、できることが多い分だけ、最初に把握すべき範囲も広い。",
      },
      {
        type: "paragraph",
        text: "Azure は Microsoft 系の環境と組み合わせると強い。企業の既存システムでは Windows、Active Directory、Microsoft 365、.NET などが前提になっていることも多く、その文脈では Azure を選ぶ理由が分かりやすい。",
      },
      {
        type: "paragraph",
        text: "GCP はデータ分析や機械学習、Kubernetes 周辺に強い印象がある。BigQuery や GKE のように、Google の得意領域がサービスとして見えやすい。大量データを扱うプロジェクトや AI 活用を重視する場合は、自然に候補に入りやすい。",
      },
      {
        type: "heading",
        text: "Vercel と Cloudflare の比較",
      },
      {
        type: "table",
        caption: "フロントエンド・エッジ系プラットフォームの比較",
        headers: ["プラットフォーム", "強み", "向いているケース", "注意点"],
        rows: [
          [
            "Vercel",
            "Next.js の開発元で、Git 連携、プレビュー URL、SSR、ISR、Streaming などの体験がまとまっている。",
            "Next.js を使って最速でプロダクト化したい場合。チームでプレビュー環境を回したい場合。",
            "高度に使うほど Vercel 前提の運用になりやすく、料金や制約の確認が必要。",
          ],
          [
            "Cloudflare",
            "エッジネットワーク上で Workers と Static Assets を扱える。静的配信、低レイテンシ、低コスト運用に寄せやすい。",
            "静的サイト、個人サイト、軽量な API、エッジ配信を重視する構成。",
            "Next.js の SSR まで使う場合は OpenNext など追加の理解が必要になる。",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "Vercel は Next.js を使う場合の開発体験が非常に強い。Git に push するとプレビュー環境が作られ、フロントエンド中心の開発サイクルを回しやすい。Next.js の機能を素直に使いながら公開したい場合、まず候補に入る。",
      },
      {
        type: "paragraph",
        text: "Cloudflare は、静的アセットや Worker を世界中のネットワークから配信できる点が魅力だ。今回の個人サイトでは、Next.js の static export で生成した out ディレクトリを Workers Assets として公開している。記事やポートフォリオ中心のサイトなら、まず静的に配信し、必要になったら API や D1、R2 などを追加する進め方が合っていると感じた。",
      },
      {
        type: "heading",
        text: "自分ならどう使い分けるか",
      },
      {
        type: "list",
        items: [
          "複雑な業務システムや細かいインフラ制御が必要なら AWS を検討する。",
          "Microsoft 系の既存環境とつなぐなら Azure を検討する。",
          "データ分析、AI、Kubernetes を重視するなら GCP を検討する。",
          "Next.js の開発体験とプレビュー環境を重視するなら Vercel を検討する。",
          "静的サイト、低コスト運用、エッジ配信を重視するなら Cloudflare を検討する。",
        ],
      },
      {
        type: "paragraph",
        text: "結論として、クラウド選定で大事なのは、どれが一番優れているかではなく、今の要件に対して過剰でも不足でもないかだと思う。大規模で複雑なものにはメガクラウドが向いているし、個人サイトやフロントエンド中心のプロダクトには Vercel や Cloudflare の方が軽く始められることも多い。",
      },
      {
        type: "paragraph",
        text: "今回のサイトは、まず記事とポートフォリオを公開することが目的だった。そのため、最初から大きなクラウド構成を組むのではなく、Next.js で静的生成し、Cloudflare Workers Assets にデプロイする構成にした。必要になった機能だけ後から足す方が、個人開発には合っていると感じている。",
      },
    ],
    references: [
      {
        label: "AWS Overview",
        href: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html",
      },
      {
        label: "Microsoft Azure overview",
        href: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-azure/",
      },
      {
        label: "Google Cloud overview",
        href: "https://docs.cloud.google.com/docs/overview",
      },
      {
        label: "Next.js on Vercel",
        href: "https://vercel.com/docs/frameworks/nextjs",
      },
      {
        label: "Cloudflare Workers Static Assets",
        href: "https://developers.cloudflare.com/workers/static-assets/",
      },
    ],
  },
  {
    kind: "reports",
    slug: "cloudflare-workers-nextjs-start",
    title: "Cloudflare Workers に置く個人サイトの初期設計",
    date: "2026-05-11",
    excerpt:
      "Next.js の静的出力を Workers の Assets で配信し、記事とポートフォリオを同居させる方針を整理する。",
    body: [
      {
        type: "paragraph",
        text: "このサイトは、まず静的なコンテンツサイトとして始める。更新頻度が高くない個人レポートでは、サーバー処理を最初から増やすより、ビルド済みの HTML を速く配る方が扱いやすい。",
      },
      {
        type: "paragraph",
        text: "記事データは TypeScript の配列に置いている。数が増えたら Markdown や MDX に移せるが、最初は構造を固定して、ページの見え方と分類を先に決める。",
      },
      {
        type: "paragraph",
        text: "Cloudflare Workers では wrangler の Assets 配信を使う。認証、検索、コメントなどが必要になった段階で、Worker 側の処理を追加する。",
      },
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
      {
        type: "paragraph",
        text: "技術レポートは、結論だけではなく前提を残すと価値が上がる。同じ選択を将来もう一度検討するとき、当時の制約が分かるからだ。",
      },
      {
        type: "paragraph",
        text: "一つの記事では、目的、環境、試した手順、結果、判断、未解決の項目を短く分ける。細かいログは必要なところだけ引用する。",
      },
      {
        type: "paragraph",
        text: "読者が未来の自分だけでも、タイトルと冒頭の要約は外向きに書く。検索や一覧で見たときに、何の記事か一瞬で分かるようにする。",
      },
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
      {
        type: "paragraph",
        text: "個人用の小さい道具は、他人に説明しづらい癖や面倒を吸収できる。一般化しないからこそ、すぐ役に立つことがある。",
      },
      {
        type: "paragraph",
        text: "ただし、道具が増えすぎると管理対象になる。残すものは、何度も使うもの、考え方を記録できるもの、捨てても惜しくないものに分けたい。",
      },
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
