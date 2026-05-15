import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, type PostBlock } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return {
    title: project ? `${project.name} | Portfolio` : "Portfolio | My Report",
    description: project?.summary,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-16 xl:px-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,820px)_minmax(280px,360px)] lg:justify-between lg:items-start">
        <article className="w-full">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Portfolio
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-normal text-teal-950 md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 text-xl leading-9 text-slate-600">{project.summary}</p>

          {project.body ? (
            <div className="mt-10 grid gap-8 text-lg leading-10 text-slate-800">
              {project.body.map((block, index) => (
                <PortfolioBlock block={block} key={index} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-lg leading-10 text-slate-800">
              この制作物の詳細は準備中です。
            </p>
          )}
        </article>

        <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-normal text-slate-500">Project</p>
            <dl className="mt-4 grid gap-4 text-sm leading-7">
              <div>
                <dt className="font-black text-slate-950">Type</dt>
                <dd className="mt-1 text-slate-600">{project.type}</dd>
              </div>
              <div>
                <dt className="font-black text-slate-950">Stack</dt>
                <dd className="mt-1 text-slate-600">{project.points.join(", ")}</dd>
              </div>
            </dl>
          </section>

          {project.url ? (
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 font-black text-white transition hover:bg-teal-800"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              公開ページを見る
            </Link>
          ) : null}

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-normal text-slate-500">Navigation</p>
            <div className="mt-4 grid gap-2 text-sm font-black text-teal-700">
              <Link className="underline-offset-4 hover:underline" href="/portfolio">
                ポートフォリオ一覧に戻る
              </Link>
              <Link className="underline-offset-4 hover:underline" href="/articles">
                記事一覧を見る
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function PortfolioBlock({ block }: { block: PostBlock }) {
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
