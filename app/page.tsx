import Link from "next/link";
import { featuredPosts, projects } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section
        className="flex min-h-[78vh] items-center bg-cover bg-center px-5 py-20 text-white md:min-h-[calc(100vh-73px)] md:px-12 lg:px-24"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(15, 23, 42, 0.88), rgba(13, 148, 136, 0.68)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="max-w-4xl">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-200">
            Personal reports and portfolio
          </p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-normal md:text-6xl lg:text-7xl">
            技術と制作の記録を、あとから読み返せる形で残す。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/85">
            このサイトは、個人的な技術レポート、制作物、ポートフォリオ、意見記事をまとめた個人サイトです。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 font-black text-teal-950 transition hover:bg-amber-100"
              href="/articles"
            >
              Browse articles
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/80 px-5 font-black text-white transition hover:bg-white/10"
              href="/portfolio"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Latest writing
          </p>
          <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
            最近のレポートとノート
          </h2>
          <Link
            className="mt-5 inline-flex font-black text-teal-700 underline-offset-4 hover:underline"
            href="/articles"
          >
            全記事を見る
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link
              className="flex min-h-72 flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
              href={`/${post.kind}/${post.slug}`}
              key={post.slug}
            >
              <span className="w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-teal-900">
                {post.kind}
              </span>
              <h3 className="text-xl font-black leading-7 tracking-normal text-slate-950">
                {post.title}
              </h3>
              <p className="leading-8 text-slate-600">{post.excerpt}</p>
              <time className="mt-auto text-sm text-slate-500" dateTime={post.date}>
                {post.date}
              </time>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-t border-slate-200 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-12 md:py-20 lg:px-24">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Portfolio
          </p>
          <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
            制作物の目的と学びを整理する
          </h2>
          <p className="mt-5 text-lg leading-9 text-slate-600">
            作ったものを単なるリンク集にせず、目的、実装の判断、詰まった点、次に改善したいことまで
            短く残しています。
          </p>
        </div>
        <div className="grid gap-4">
          {projects.slice(0, 2).map((project) => (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={project.name}>
              <h3 className="text-xl font-black tracking-normal text-slate-950">{project.name}</h3>
              <p className="mt-3 leading-8 text-slate-600">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
