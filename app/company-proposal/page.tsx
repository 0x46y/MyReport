export const metadata = {
  title: "山浦さん面談向け提案相談資料 | My Report",
  description:
    "山浦さんとの面談で相談するために、既存案件支援、小規模技術検証、会社への貢献イメージを整理した提案資料。",
};

const proposals = [
  {
    title: "既存CATIA案件で技術的に難しい部分を補完できるか検証する",
    purpose:
      "CATIAそのものを置き換えるのではなく、既存案件で止まりやすい周辺作業を補完できるかを確認する。",
    effects: [
      "CATIAのライセンスやAPI制約で止まる作業の一部を別手段で確認できる可能性がある",
      "STEPなどの交換形式を使い、顧客や部署へ追加提案できる選択肢を増やせる可能性がある",
      "形状確認、簡易チェック、レポート出力などで見積もりや工数削減につながる可能性がある",
    ],
    decisionPoints: [
      "現在のCATIA案件に近い部署や顧客があるか",
      "小規模技術検証として試す価値があるか",
      "顧客提案や見積もり補助につながる可能性があるか",
    ],
  },
  {
    title: "社内・顧客業務の自動化候補を整理する",
    purpose:
      "現場の手作業、Excel運用、ファイル変換、確認作業を小さく聞き取り、自動化や手順化の候補を整理する。",
    effects: [
      "手作業の工数削減につながる可能性がある",
      "転記ミス、確認漏れ、属人化を減らす提案ができる可能性がある",
      "小さな改善を、追加提案や社内ナレッジとして残せる可能性がある",
    ],
    decisionPoints: [
      "社内または顧客作業で、時間がかかっている定型作業があるか",
      "小規模改善として扱える部署や案件があるか",
      "成果物をツール、手順書、チェックリストのどれとして出すのがよいか",
    ],
  },
];

const contributionFlow = [
  "既存案件・既存顧客の困りごとを確認する",
  "技術調査で制約、費用、実現可能性を整理する",
  "小規模技術検証で試せる範囲を確認する",
  "既存案件で試行または提案材料にする",
  "顧客提案、追加受注、工数削減につながるか会社として判断する",
];

const consultationPoints = [
  "現在、技術面で困っている案件や部署はあるか",
  "技術調査として優先したいテーマはあるか",
  "小規模技術検証として試せそうな案件はあるか",
  "営業や他部署へ提案できそうなテーマはあるか",
];

const workStylePoints = [
  "最初からすべてを決めていただきたいという意味ではない",
  "まず目的と進め方を共有する",
  "自分なりに案や調査結果を整理して進める",
  "想定外が出た場合は、選択肢、代替案、継続・中断判断を整理する",
  "業務判断が必要なところだけ相談する",
];

export default function CompanyProposalPage() {
  return (
    <main className="px-5 py-12 md:px-12 md:py-16 lg:px-20">
      <article className="mx-auto max-w-6xl">
        <section className="border-b border-slate-200 pb-10">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Proposal discussion
          </p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
            山浦さん面談向け提案相談資料
          </h1>
          <p className="mt-5 max-w-4xl text-xl font-bold leading-9 text-teal-800">
            私が考えた会社への貢献案を整理しました。採用可否や優先順位は会社として判断いただき、既存案件や顧客提案に接続できる可能性を相談したいです。
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-black tracking-normal text-slate-950">今回相談したいこと</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            研究だけをしたいのではなく、会社の既存案件や顧客要望の中で技術的に難しい部分を調査し、
            小規模に検証して、受注、見積もり、追加提案、工数削減につながるかを判断する材料を作る役割で貢献できないか相談したいです。
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">現状の理解</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard
              title="会社側が重視していること"
              items={[
                "お客様や部署から依頼された仕事を受けて売上につなげること",
                "技術そのものではなく、受注、売上、工数削減、追加提案につながるか",
                "会社として利益が生まれるかを判断できる材料があること",
              ]}
            />
            <InfoCard
              title="私が意識して提案したいこと"
              items={[
                "特定技術を売り込むのではなく、既存案件支援として説明する",
                "CATIA、クラウド、AIなどは候補例として扱う",
                "会社側からテーマをいただける場合、自分なりに調査案や進め方案を整理する",
              ]}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">私が考えた提案</h2>
          <div className="mt-6 grid gap-6">
            {proposals.map((proposal) => (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={proposal.title}>
                <h3 className="text-2xl font-black leading-9 text-slate-950">{proposal.title}</h3>
                <p className="mt-4 text-lg leading-9 text-slate-700">{proposal.purpose}</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <MiniPanel title="期待できそうな効果" items={proposal.effects} />
                  <MiniPanel title="会社として判断いただきたい点" items={proposal.decisionPoints} />
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-3xl font-black tracking-normal text-teal-950">会社への貢献イメージ</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {contributionFlow.map((item, index) => (
              <div className="rounded-lg border border-teal-200 bg-white p-4 text-sm font-black leading-7 text-teal-950 shadow-sm" key={item}>
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs text-white">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">仕事の進め方</h2>
          <InfoCard title="確認や相談の仕方" items={workStylePoints} />
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">山浦さんへ相談したいこと</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-9 text-slate-700">
            {consultationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">その他の案件候補</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            障がい者歯科向けシステムの相談は、現時点では個人的な相談段階です。
            正式な依頼や予算化の話になった場合に、会社として受託検討の対象になるか確認したいです。
          </p>
        </section>
      </article>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-8 text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function MiniPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h4 className="font-black text-slate-950">{title}</h4>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
