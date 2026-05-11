import { notFound } from "next/navigation";
import { getPostBySlug, reports } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return reports.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("reports", slug);

  return {
    title: post ? `${post.title} | My Report` : "Report | My Report",
    description: post?.excerpt,
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("reports", slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex justify-center px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <article className="w-full max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Technical report
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-normal text-teal-950 md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-slate-600">{post.excerpt}</p>
        <time className="mt-5 block text-sm text-slate-500" dateTime={post.date}>
          {post.date}
        </time>
        <div className="mt-10 grid gap-6 text-lg leading-10 text-slate-800">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        </div>
      </article>
    </main>
  );
}
