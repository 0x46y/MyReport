import { notFound } from "next/navigation";
import ArticleSidebar from "@/app/components/ArticleSidebar";
import { allPosts, getPostBySlug, reports, type PostBlock } from "@/lib/content";

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
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-16 xl:px-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,820px)_minmax(280px,360px)] lg:justify-between lg:items-start">
        <article className="w-full">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Technical report
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-normal text-teal-950 md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">{post.excerpt}</p>
          <time className="mt-5 block text-sm text-slate-500 lg:hidden" dateTime={post.date}>
            {post.date}
          </time>
          <div className="mt-10 grid gap-8 text-lg leading-10 text-slate-800">
            {post.body.map((block, index) => (
              <PostBlockView block={block} key={index} />
            ))}
          </div>
        </article>
        <ArticleSidebar allPosts={allPosts} post={post} />
      </div>
    </main>
  );
}

function PostBlockView({ block }: { block: PostBlock }) {
  if (block.type === "heading") {
    return <h2 className="mt-6 text-3xl font-black tracking-normal text-slate-950">{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-3 pl-6">
        {block.items.map((item) => (
          <li key={item}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img className="w-full bg-slate-100" src={block.src} alt={block.alt} loading="lazy" />
        {block.caption ? (
          <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-5 text-sm leading-7 text-slate-100 shadow-sm">
        <code>{block.text}</code>
      </pre>
    );
  }

  if (block.type === "table") {
    return (
      <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {block.caption ? (
          <figcaption className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-base font-black text-slate-950">
            {block.caption}
          </figcaption>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm leading-7">
            <thead className="bg-teal-950 text-white">
              <tr>
                {block.headers.map((header) => (
                  <th className="px-4 py-3 font-black" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr className="border-t border-slate-200 odd:bg-white even:bg-slate-50" key={row.join("-")}>
                  {row.map((cell) => (
                    <td className="align-top px-4 py-4 text-slate-700" key={cell}>
                      {renderInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  }

  return <p>{renderInlineMarkdown(block.text)}</p>;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (!match) {
      return part;
    }

    return (
      <a
        className="font-bold text-teal-700 underline-offset-4 hover:underline"
        href={match[2]}
        key={part}
        rel="noreferrer"
        target="_blank"
      >
        {match[1]}
      </a>
    );
  });
}
