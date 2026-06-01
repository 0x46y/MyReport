import Link from "next/link";

export const metadata = {
  title: "Yuya | Technical Profile",
  description:
    "技術調査、実現可能性検証、業務自動化、AI・クラウド活用を中心にした技術プロフィール。",
};

const tags = [
  "Python",
  "VBA",
  "TypeScript",
  "Next.js",
  "React",
  "Tauri",
  "Cloudflare Workers",
  "R2",
  "OpenAI API",
  "CATIA",
  "AutoCAD",
  "OCCT",
  "WebAssembly",
  "Playwright",
  "ComfyUI",
];

const canDo = [
  "既存業務の自動化可否を調査し、実現可能性の検証や小さなツールとして形にする",
  "外部製品、API、ライセンス、データ形式の制約を含めて実現可能性を整理する",
  "技術的に成立しにくい要求に対して、理由、代替案、段階的な進め方を説明する",
  "AIやクラウドを業務に入れる前に、コスト、運用、セキュリティ、検証方法を洗い出す",
  "WebアプリやTauriデスクトップアプリとして、触れるプロトタイプを作る",
  "技術的な失敗パターンを記事やチェックリストとして残し、関係者に説明しやすくする",
];

const experienceHighlights = [
  {
    title: "システム運用・監視",
    body: "エラー発生時の報告、ログ確認、業務影響の切り分けなど、安定運用に関わる業務を経験しています。",
  },
  {
    title: "開発支援・CI/CD",
    body: "GitLab、Docker、Ansibleなどを使った開発環境整備や、開発資源配布の自動化に関わってきました。",
  },
  {
    title: "業務効率化ツール",
    body: "Python、VBA、スクリプトを使い、既存作業の自動化や業務支援ツールの作成に取り組んでいます。",
  },
  {
    title: "CAD関連ツール",
    body: "CATIAやAutoCAD周辺の自動化、3Dデータ、ファイル形式、外部依存の調査に取り組んでいます。",
  },
];

const works = [
  {
    title: "Web / Desktopアプリの公開",
    href: "/portfolio/idea-canvas-web",
    body: "Reactで作成したアイデア整理アプリを、Web版とTauri製Windowsデスクトップ版の両方で見せられる形に整理しました。",
  },
  {
    title: "業務システム開発のリスク整理",
    href: "/reports/technical-failure-patterns-in-business-systems",
    body: "AI、クラウド、自動化、既存システム改修で起こりやすいリスクを、相談時に共有できるチェックリストとして整理しました。",
  },
  {
    title: "3D / CAD自動化の技術調査",
    href: "/reports/manufacturing-3d-automation-cad-control",
    body: "CADデータ形式、ベンダーロックイン、組み合わせ爆発、クラウドコストなど、製造業3D自動化で詰まりやすい点を整理しています。",
  },
  {
    title: "Cloudflare Workersでのサイト運用",
    href: "/reports/cloudflare-workers-nextjs-start",
    body: "Next.jsの静的出力をCloudflare Workersへデプロイし、記事・ポートフォリオ・ダウンロード配布をまとめています。",
  },
];

const representativeWork = [
  {
    title: "開発環境・CI/CDの自動化",
    body: "開発環境の整備、資源配布の自動化、運用中の障害対応を通じて、開発プロセスを安定させる取り組みに関わってきました。",
  },
  {
    title: "業務効率化ツールの作成",
    body: "Python、VBA、スクリプトを使い、既存作業の手順化、自動化、調査用ツールの作成に取り組んできました。",
  },
  {
    title: "CAD自動化・外部製品調査",
    body: "CATIAやAutoCAD周辺の自動化では、API、ライセンス、ファイル形式、依存関係を確認しながら実現可能性を整理しています。",
  },
  {
    title: "Webアプリ・クラウド公開",
    body: "Next.js、Tauri、Cloudflareを使い、Web版とデスクトップ版のアプリ公開、静的サイト運用、配布導線の整備を行っています。",
  },
];

const focusAreas = [
  {
    title: "技術調査・実現可能性検証",
    body: "新しい要求や技術に対して、ライセンス、依存関係、運用コスト、データ形式、外部製品との連携可否を確認します。作れるかどうかだけでなく、運用できるか、説明できるかも整理します。",
  },
  {
    title: "業務自動化・実現可能性検証",
    body: "PythonやVBAを使い、定型作業、既存ツール操作、ファイル処理、データ変換を小さく検証し、使える形に落とし込みます。",
  },
  {
    title: "CAD関連の調査・ツール開発",
    body: "CATIA、AutoCAD、3Dデータ、ファイル形式、外部依存、ライセンス制約を含めて、実現可能性と撤退条件を整理します。",
  },
  {
    title: "AI・クラウド活用の検証",
    body: "OpenAI API、ローカルAI、Cloudflare Workers/R2などを使い、業務適用時の効果と制約を確認します。",
  },
];

const principles = [
  "不確実性が高い案件では、最初から完成保証ではなく、調査・実現可能性検証・段階的な判断を前提にします。",
  "外部製品や商用ソフトに依存する開発では、公開APIやライセンスの範囲を先に確認します。",
  "AIで全部を置き換えるのではなく、人が判断すべき範囲とAIに任せる範囲を分けます。",
  "法律、契約、労務の専門家ではないため、最終判断は専門部署や専門家と確認します。",
];

const interests = [
  "AI活用",
  "Cloudflare",
  "WebAssembly",
  "CAD自動化",
  "業務システム改善",
  "実現可能性検証",
  "技術的な失敗パターン",
  "開発プロセスと合意形成",
];

const recurringThemes = [
  "組み合わせ爆発",
  "ベンダーロックイン",
  "ライセンス制約",
  "クラウドコスト",
  "AI導入リスク",
  "外部製品との依存関係",
  "バイナリ形式のデータ",
  "運用と保守",
  "受け入れ条件とテスト",
];

export default function ProfilePage() {
  return (
    <main className="px-5 py-14 md:px-12 md:py-20 lg:px-24">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,900px)_minmax(280px,360px)] lg:items-start">
        <article>
          <section>
            <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
              Technical Notes & Portfolio
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-normal text-slate-950 md:text-7xl">
              Yuya
            </h1>
            <p className="mt-4 text-2xl font-black leading-9 text-teal-800">
              技術調査 / 実現可能性検証 / 業務自動化 / AI・クラウド活用
            </p>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
              Python、VBA、Next.js、Cloudflare、Tauri、CAD関連技術を使い、
              既存業務の自動化、技術検証、プロトタイプ作成を行っています。
              複雑な技術課題に対して、実現可能性、外部依存、コスト、運用、受け入れ条件を整理し、
              できること、調査が必要なこと、成立しにくいことを説明できる状態にすることを重視しています。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Technical Investigation", "Feasibility", "Automation", "CAD / 3D", "AI", "Cloud"].map((item) => (
                <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-black text-teal-900" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">Background</h2>
            <p className="mt-5 text-lg leading-9 text-slate-700">
              2017年から、システム監視、運用、開発支援、インフラ自動化、業務効率化ツール、CAD関連ツール開発に関わってきました。
              運用現場でのログ確認や障害対応、開発環境の整備、CI/CD、自動化、既存システム改修を経験する中で、
              「作れるか」だけでなく、依存関係、データ品質、運用、受け入れ条件まで整理する重要性を意識するようになりました。
              現在は、業務改善に使える技術調査、実現可能性検証、プロトタイプ作成、AI・クラウド活用の検証を中心に発信しています。
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">できること</h2>
            <ul className="mt-5 grid gap-3 text-lg leading-9 text-slate-700">
              {canDo.map((item) => (
                <li className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">経験してきた領域</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {experienceHighlights.map((item) => (
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={item.title}>
                  <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">代表的な取り組み</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {representativeWork.map((item) => (
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={item.title}>
                  <h3 className="text-xl font-black leading-7 text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">公開している成果物・記事</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {works.map((work) => (
                <Link
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
                  href={work.href}
                  key={work.href}
                >
                  <h3 className="text-xl font-black leading-7 text-slate-950">{work.title}</h3>
                  <p className="mt-3 leading-8 text-slate-600">{work.body}</p>
                  <span className="mt-4 inline-flex font-black text-teal-700 underline-offset-4 hover:underline">
                    詳細を見る
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">得意分野</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {focusAreas.map((item) => (
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={item.title}>
                  <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-8 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">よく扱うテーマ</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {recurringThemes.map((item) => (
                <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-black text-rose-900" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">関心領域</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {interests.map((item) => (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-black text-amber-900" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">技術スタック</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-black text-slate-700 shadow-sm" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">進め方で注意していること</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-9 text-slate-700">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black tracking-normal text-slate-950">このサイトについて</h2>
            <p className="mt-5 text-lg leading-9 text-slate-700">
              このサイトでは、技術調査、実現可能性検証、業務改善、AI活用、CAD自動化、クラウド運用について記録しています。
              「作りました」という成果だけでなく、なぜ難しいのか、どこが制約になるのか、どこで判断すべきかを残すための技術ノートとして運用しています。
            </p>
          </section>
        </article>

        <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-normal text-slate-500">Summary</p>
            <dl className="mt-4 grid gap-4 text-sm leading-7">
              <div>
                <dt className="font-black text-slate-950">Handle</dt>
                <dd className="mt-1 text-slate-600">Yuya</dd>
              </div>
              <div>
                <dt className="font-black text-slate-950">Main</dt>
                <dd className="mt-1 text-slate-600">Technical Investigation / Automation / AI</dd>
              </div>
              <div>
                <dt className="font-black text-slate-950">Focus</dt>
                <dd className="mt-1 text-slate-600">実現可能性、外部依存、運用リスクの整理</dd>
              </div>
              <div>
                <dt className="font-black text-slate-950">Output</dt>
                <dd className="mt-1 text-slate-600">実現可能性検証、プロトタイプ、技術記事、チェックリスト</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-normal text-slate-500">Links</p>
            <div className="mt-4 grid gap-2 text-sm font-black text-teal-700">
              <Link className="underline-offset-4 hover:underline" href="/portfolio">
                ポートフォリオ一覧
              </Link>
              <Link className="underline-offset-4 hover:underline" href="/reports">
                技術レポート一覧
              </Link>
              <Link className="underline-offset-4 hover:underline" href="/articles">
                全記事一覧
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
