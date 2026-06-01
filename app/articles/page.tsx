import { allPosts } from "@/lib/content";
import ArticlesExplorer from "./ArticlesExplorer";
import { Suspense } from "react";

export const metadata = {
  title: "Articles | My Report",
  description: "技術レポート、補助ノート、ポートフォリオに関連する記事一覧。",
};

export default function ArticlesPage() {
  const reportsCount = allPosts.filter((post) => post.kind === "reports").length;
  const notesCount = allPosts.filter((post) => post.kind === "notes").length;
  const articleSummaries = allPosts.map(({ body, ...post }) => post);

  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Article index
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          記事一覧
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          技術調査や実現可能性検証を整理した Reports、用語や短い補足を置く Notes を新しい順にまとめています。
        </p>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <SummaryCard label="All" value={allPosts.length} />
        <SummaryCard label="Reports" value={reportsCount} />
        <SummaryCard label="Notes" value={notesCount} />
      </section>

      <Suspense fallback={<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" />}>
        <ArticlesExplorer posts={articleSummaries} />
      </Suspense>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-normal text-slate-950">{value}</p>
    </div>
  );
}
