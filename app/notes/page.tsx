import Link from "next/link";
import { notes } from "@/lib/content";

export const metadata = {
  title: "Notes | My Report",
};

export default function NotesPage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Opinion notes
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          個人的なノート
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          技術と直接関係しない考え、違和感、短い日記を置く場所です。
        </p>
      </div>
      <div className="grid gap-4">
        {notes.map((post) => (
          <Link
            className="grid gap-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
            href={`/notes/${post.slug}`}
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
