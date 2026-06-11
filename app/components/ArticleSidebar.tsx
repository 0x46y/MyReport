import Link from "next/link";
import type { Post } from "@/lib/content";

export default function ArticleSidebar({
  allPosts,
  post,
}: {
  allPosts: Post[];
  post: Post;
}) {
  const relatedPosts = allPosts
    .filter((candidate) => candidate.slug !== post.slug || candidate.kind !== post.kind)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, 3)
    .map((candidate) => candidate.post);

  return (
    <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-normal text-slate-500">記事情報</p>
        <dl className="mt-4 grid gap-4 text-sm leading-7">
          <div>
            <dt className="font-black text-slate-950">種類</dt>
            <dd className="mt-1 text-slate-600">{post.kind === "reports" ? "レポート" : "ノート"}</dd>
          </div>
          <div>
            <dt className="font-black text-slate-950">公開日</dt>
            <dd className="mt-1 text-slate-600">
              <time dateTime={post.date}>{post.date}</time>
            </dd>
          </div>
        </dl>
      </section>

      {post.tags.length ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-normal text-slate-500">タグ</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-teal-900 transition hover:border-teal-500 hover:text-teal-700"
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                key={tag}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-normal text-slate-500">移動</p>
        <div className="mt-4 grid gap-2 text-sm font-black text-teal-700">
          <Link className="underline-offset-4 hover:underline" href="/articles">
            記事一覧に戻る
          </Link>
          <Link className="underline-offset-4 hover:underline" href={`/${post.kind}`}>
            {post.kind === "reports" ? "技術レポート" : "用語・補助ノート"} 一覧へ
          </Link>
        </div>
      </section>

      {relatedPosts.length ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-normal text-slate-500">関連する記事</p>
          <div className="mt-4 grid gap-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                className="grid gap-1 border-t border-slate-100 pt-4 first:border-t-0 first:pt-0"
                href={`/${relatedPost.kind}/${relatedPost.slug}`}
                key={`${relatedPost.kind}-${relatedPost.slug}`}
              >
                <span className="text-xs font-bold text-slate-500">{relatedPost.date}</span>
                <span className="text-sm font-black leading-6 text-slate-950 transition hover:text-teal-700">
                  {relatedPost.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  );
}
