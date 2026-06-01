import Link from "next/link";
import { reports } from "@/lib/content";

export const metadata = {
  title: "Reports | My Report",
  description: "技術調査、実現可能性検証、制約、リスク、判断材料を整理したレポート一覧。",
};

export default function ReportsPage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Technical reports
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          技術レポート
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          技術調査、実現可能性検証、制約、リスク、判断材料を整理した長めの記録です。
          「作れるか」だけでなく、なぜ難しいのか、どこで判断すべきかも残します。
        </p>
      </div>
      <div className="grid gap-4">
        {reports.map((post) => (
          <Link
            className="grid gap-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
            href={`/reports/${post.slug}`}
            key={post.slug}
          >
            <time className="text-sm text-slate-500" dateTime={post.date}>
              {post.date}
            </time>
            <h2 className="text-2xl font-black tracking-normal text-slate-950">{post.title}</h2>
            <p className="leading-8 text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
