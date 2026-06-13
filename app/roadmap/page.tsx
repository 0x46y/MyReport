import Link from "next/link";
import { allPosts, type Post } from "@/lib/content";

export const metadata = {
  title: "Roadmap | My Report",
  description:
    "MyReportの記事を、クラウド・データベースの基礎、技術調査、小さな検証、本番導入、発注・運用の順に読むためのロードマップ。",
};

type RoadmapItem = {
  slug: string;
  note: string;
};

type RoadmapSection = {
  label: string;
  title: string;
  description: string;
  items: RoadmapItem[];
};

const roadmapSections: RoadmapSection[] = [
  {
    label: "Step 1",
    title: "基礎を押さえる",
    description:
      "クラウド、無料枠、データベース、ストレージなど、個人開発や小規模な技術検証で最初に詰まりやすい前提を整理する段階です。",
    items: [
      {
        slug: "free-tier-verification-checklist",
        note: "無料枠があること、実際に検証できること、本番利用できることを分けて見る。",
      },
      {
        slug: "cloud-platform-comparison-2026",
        note: "AWS、Azure、GCP、Vercel、Cloudflareを用途と制約で比較する。",
      },
      {
        slug: "object-storage-pricing-2026",
        note: "保存料金だけでなく、外向き転送料や操作料金まで含めて見る。",
      },
      {
        slug: "personal-development-database-selection",
        note: "SQLite、Prisma、Supabase、Firebaseを個人開発の流れで使い分ける。",
      },
      {
        slug: "nosql-rdb-selection-conditions",
        note: "NoSQLとRDBを、用途、整合性、運用の観点で選ぶ。",
      },
    ],
  },
  {
    label: "Step 2",
    title: "技術調査と小さな検証の進め方を整理する",
    description:
      "このサイトの中心になる段階です。動くかどうかだけでなく、小さな検証、本番導入、撤退条件、調査結果の見せ方を判断材料として整理します。",
    items: [
      {
        slug: "poc-success-production-adoption-risks",
        note: "小さな検証で動いたことと、本番導入できることを分けて考える。",
      },
      {
        slug: "technical-research-exit-criteria",
        note: "成功条件だけでなく、保留、撤退、別案検討の条件を決める。",
      },
      {
        slug: "visualizing-technical-research-outcomes",
        note: "調査結果を、採用候補、条件付き採用、保留、撤退、別案検討として見せる。",
      },
      {
        slug: "ai-assisted-technical-writing-editorial-policy",
        note: "AIと技術記事を書くときに、読者、具体例、判断材料を先に決める。",
      },
      {
        slug: "technical-failure-patterns-in-business-systems",
        note: "業務システム開発で見落としやすい前提条件を先に確認する。",
      },
      {
        slug: "ai-code-generation-human-checkpoints",
        note: "AIコーディング時に、人間が確認したい情報源、環境差分、非機能要件を見る。",
      },
      {
        slug: "local-production-edge-runtime-differences",
        note: "本番環境で初めて見つかる制約を、ローカル検証と分けて確認する。",
      },
    ],
  },
  {
    label: "Step 3",
    title: "発注・契約・運用までつなげる",
    description:
      "発注側と開発側の認識を合わせ、予算、契約形態、保守、運用、言葉の違いを整理する段階です。",
    items: [
      {
        slug: "requesting-system-development-first-decisions",
        note: "発注前に、目的、利用者、更新者、データ管理、保守、ドメインを整理する。",
      },
      {
        slug: "system-development-cost-increase-factors",
        note: "発注者向けに、見積もりの桁感、費用が増える条件、見落としやすい作業を整理する。",
      },
      {
        slug: "system-development-beyond-technology-constraints",
        note: "技術だけでなく、予算、契約、納期、運用費、組織内の意思決定も考える理由を見る。",
      },
      {
        slug: "cloud-running-cost-vendor-lockin",
        note: "クラウド選定で見落としやすい運用費と依存関係を整理する。",
      },
      {
        slug: "exploratory-development-contract-risk-agile",
        note: "不確実性が高い開発で、調査、責任範囲、判断タイミングを先に決める。",
      },
    ],
  },
  {
    label: "Step 4",
    title: "CAD・3D自動化の制約を見る（専門分野）",
    description:
      "ここからは製造業や3Dデータを扱う方向けの専門分野です。ファイル形式、ライセンス、データ量、変換品質を先に確認します。",
    items: [
      {
        slug: "manufacturing-3d-automation-cad-control",
        note: "製造業の3D自動化で、メッシュとソリッド、API、外部依存を分けて見る。",
      },
      {
        slug: "cad-file-formats-native-stl-iges-step",
        note: "3Dファイル形式ごとに残る情報と失われる情報を整理する。",
      },
      {
        slug: "cad-license-vendor-lockin-cost-recovery",
        note: "CAD自動化でライセンスとベンダーロックインが判断に効く理由を見る。",
      },
      {
        slug: "3d-data-size-cloud-cost-test-explosion",
        note: "3Dデータ自動化で工数が増えやすい理由を整理する。",
      },
    ],
  },
];

const readerRoutes = [
  {
    title: "発注者・利用者向け",
    description:
      "開発を依頼する前に、目的、予算、更新者、保守、契約形態を整理したい人向けです。",
    slugs: [
      "requesting-system-development-first-decisions",
      "system-development-cost-increase-factors",
      "system-development-beyond-technology-constraints",
      "cloud-running-cost-vendor-lockin",
      "visualizing-technical-research-outcomes",
    ],
  },
  {
    title: "技術調査・検証担当者向け",
    description:
      "調査結果を判断材料として残し、小さな検証から本番導入へ進める条件を整理したい人向けです。",
    slugs: [
      "poc-success-production-adoption-risks",
      "technical-research-exit-criteria",
      "visualizing-technical-research-outcomes",
      "ai-assisted-technical-writing-editorial-policy",
      "technical-failure-patterns-in-business-systems",
    ],
  },
  {
    title: "クラウド・データベースを選びたい人向け",
    description:
      "無料枠、クラウド、ストレージ、データベースの選定を小さく試しながら整理したい人向けです。",
    slugs: [
      "free-tier-verification-checklist",
      "cloud-platform-comparison-2026",
      "object-storage-pricing-2026",
      "personal-development-database-selection",
    ],
  },
];

const postsBySlug = new Map(allPosts.map((post) => [post.slug, post]));

export default function RoadmapPage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <section className="mb-14 max-w-4xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Reading roadmap
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          おすすめの読み方
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          MyReportの記事を、クラウド・データベースの基礎、技術調査、小さな検証、本番導入、発注・運用の順に読めるように整理しています。
          日付順ではなく、判断材料として使いやすい順番で読むためのページです。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 font-black text-white transition hover:bg-teal-800"
            href="/articles"
          >
            記事一覧で探す
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-5 font-black text-slate-800 transition hover:border-teal-600 hover:text-teal-700"
            href="/notes/system-development-terms"
          >
            用語メモを見る
          </Link>
        </div>
      </section>

      <section className="mb-16 grid gap-5 lg:grid-cols-3">
        {readerRoutes.map((route) => (
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={route.title}>
            <h2 className="text-xl font-black tracking-normal text-slate-950">{route.title}</h2>
            <p className="mt-3 leading-8 text-slate-600">{route.description}</p>
            <ol className="mt-5 space-y-3">
              {route.slugs.map((slug, index) => (
                <ReaderRouteItem index={index} key={slug} post={postsBySlug.get(slug)} />
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        {roadmapSections.map((section) => (
          <RoadmapSectionCard key={section.title} section={section} />
        ))}
      </section>
    </main>
  );
}

function ReaderRouteItem({ index, post }: { index: number; post?: Post }) {
  if (!post) {
    return null;
  }

  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600">
        {index + 1}
      </span>
      <Link className="font-bold leading-7 text-teal-800 underline-offset-4 hover:underline" href={`/${post.kind}/${post.slug}`}>
        {post.title}
      </Link>
    </li>
  );
}

function RoadmapSectionCard({ section }: { section: RoadmapSection }) {
  const posts = section.items
    .map((item) => ({ item, post: postsBySlug.get(item.slug) }))
    .filter((entry): entry is { item: RoadmapItem; post: Post } => Boolean(entry.post));

  return (
    <section className="border-t border-slate-200 pt-10">
      <div className="mb-6 max-w-4xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          {section.label}
        </p>
        <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
          {section.title}
        </h2>
        <p className="mt-4 text-lg leading-9 text-slate-600">{section.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map(({ item, post }, index) => (
          <Link
            className="flex min-h-56 flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
            href={`/${post.kind}/${post.slug}`}
            key={post.slug}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-slate-600">
                {index + 1}
              </span>
              <span className="text-xs font-bold text-slate-500">{post.category}</span>
            </div>
            <h3 className="mt-5 text-xl font-black leading-8 tracking-normal text-slate-950">
              {post.title}
            </h3>
            <p className="mt-3 leading-8 text-slate-600">{item.note}</p>
            <p className="mt-auto pt-5 text-sm leading-7 text-slate-500">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
