import Link from "next/link";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Portfolio | My Report",
};

export default function PortfolioPage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mb-9 max-w-3xl">
        <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
          Portfolio
        </p>
        <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
          ポートフォリオ
        </h1>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          作ったものを、目的・役割・使った技術・次の改善に分けて記録します。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article
            className="grid min-h-80 content-between gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            key={project.name}
          >
            <div>
              <p className="mb-4 w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-teal-900">
                {project.type}
              </p>
              <h2 className="text-2xl font-black tracking-normal text-slate-950">{project.name}</h2>
              <p className="mt-3 leading-8 text-slate-600">{project.summary}</p>
            </div>
            <ul className="list-disc space-y-2 pl-5 leading-8 text-slate-600">
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {project.url ? (
              <Link
                className="inline-flex w-fit font-black text-teal-700 underline-offset-4 hover:underline"
                href={project.url}
                target="_blank"
                rel="noreferrer"
              >
                公開ページを見る
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
