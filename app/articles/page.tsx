import Link from "next/link";
import { allPosts } from "@/lib/content";

export const metadata = {
  title: "Articles | My Report",
  description: "All reports and notes published on My Report.",
};

export default function ArticlesPage() {
  const reportsCount = allPosts.filter((post) => post.kind === "reports").length;
  const notesCount = allPosts.filter((post) => post.kind === "notes").length;

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
          技術レポート、検証メモ、個人的なノートを新しい順にまとめています。
        </p>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <SummaryCard label="All" value={allPosts.length} />
        <SummaryCard label="Reports" value={reportsCount} />
        <SummaryCard label="Notes" value={notesCount} />
      </section>

      <section className="grid gap-4">
        {allPosts.map((post) => (
          <Link
            className="grid gap-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
            href={`/${post.kind}/${post.slug}`}
            key={`${post.kind}-${post.slug}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-teal-900">
                {post.kind === "reports" ? "Report" : "Note"}
              </span>
              <time className="text-sm text-slate-500" dateTime={post.date}>
                {post.date}
              </time>
            </div>
            <h2 className="text-2xl font-black tracking-normal text-slate-950">{post.title}</h2>
            <p className="leading-8 text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </section>
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
