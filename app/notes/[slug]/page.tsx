import { notFound } from "next/navigation";
import { getPostBySlug, notes, type PostBlock } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("notes", slug);

  return {
    title: post ? `${post.title} | My Report` : "Note | My Report",
    description: post?.excerpt,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug("notes", slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex justify-center px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <article className="w-full max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Opinion note
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-normal text-teal-950 md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-slate-600">{post.excerpt}</p>
        <time className="mt-5 block text-sm text-slate-500" dateTime={post.date}>
          {post.date}
        </time>
        <div className="mt-10 grid gap-8 text-lg leading-10 text-slate-800">
          {post.body.map((block, index) => (
            <PostBlockView block={block} key={index} />
          ))}
        </div>
      </article>
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
