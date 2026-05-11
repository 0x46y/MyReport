import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">404</p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          ページが見つかりません
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          記事の URL が変わったか、まだ公開されていない可能性があります。
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 font-black text-white transition hover:bg-teal-800"
          href="/"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
