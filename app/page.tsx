import Link from "next/link";
import { featuredPosts } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section
        className="flex min-h-[78vh] items-center bg-cover bg-center px-5 py-20 text-white md:min-h-[calc(100vh-73px)] md:px-12 lg:px-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.52) 42%, rgba(15, 23, 42, 0.12) 100%), url('/images/hero.png')",
        }}
      >
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-200">
            Technical investigation notes
          </p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-normal md:text-6xl lg:text-7xl">
            技術調査と
            <br />
            実現可能性検証の
            <br />
            記録。
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/85">
            業務自動化、CAD、AI、クラウド活用について、
            「作れるか」だけでなく、制約・コスト・運用・判断条件まで整理するための技術ノートです。
          </p>
          <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-amber-100">
            初めて読む方は「おすすめの読み方」からどうぞ。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 font-black text-teal-950 transition hover:bg-amber-100"
              href="/articles"
            >
              記事一覧を見る
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/80 px-5 font-black text-white transition hover:bg-white/10"
              href="/roadmap"
            >
              おすすめの読み方を見る
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/80 px-5 font-black text-white transition hover:bg-white/10"
              href="/profile"
            >
              プロフィールを見る
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
            最近の技術レポートとノート
          </h2>
          <p className="mt-5 text-lg leading-9 text-slate-600">
            調査したこと、詰まりやすい制約、判断材料として残しておきたい内容を新しい順に並べています。
          </p>
          <Link
            className="mt-5 inline-flex font-black text-teal-700 underline-offset-4 hover:underline"
            href="/articles"
          >
            技術ノート一覧を見る
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

      <section className="border-t border-slate-200 px-5 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Sections
          </p>
          <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
            読む場所の使い分け
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md" href="/roadmap">
            <h3 className="text-2xl font-black tracking-normal text-slate-950">Roadmap</h3>
            <p className="mt-3 leading-8 text-slate-600">
              記事を日付順ではなく、クラウド、技術調査、PoC、発注・運用の流れで読むための案内です。
            </p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md" href="/reports">
            <h3 className="text-2xl font-black tracking-normal text-slate-950">Reports</h3>
            <p className="mt-3 leading-8 text-slate-600">
              技術調査、実現可能性検証、制約、リスク、判断材料を整理する長めの記録です。
            </p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md" href="/portfolio">
            <h3 className="text-2xl font-black tracking-normal text-slate-950">Portfolio</h3>
            <p className="mt-3 leading-8 text-slate-600">
              作ったものを、目的、使った技術、公開形態、今後の改善に分けて見せる場所です。
            </p>
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md" href="/notes">
            <h3 className="text-2xl font-black tracking-normal text-slate-950">Notes</h3>
            <p className="mt-3 leading-8 text-slate-600">
              記事で使う用語、短いメモ、あとから参照したい補助情報を置く場所です。
            </p>
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 px-5 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Portfolio
          </p>
          <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
            作ったものも、判断材料として残す
          </h2>
          <p className="mt-5 text-lg leading-9 text-slate-600">
            作ったものを単なるリンク集にせず、目的、実装時の判断、詰まった点、配布方法、次の改善案まで残しています。
          </p>
          <Link
            className="mt-5 inline-flex font-black text-teal-700 underline-offset-4 hover:underline"
            href="/portfolio"
          >
            ポートフォリオ一覧を見る
          </Link>
        </div>
      </section>
    </main>
  );
}
