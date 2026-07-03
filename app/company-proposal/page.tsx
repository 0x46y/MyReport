import Link from "next/link";

export const metadata = {
  title: "会社向け貢献提案メモ | My Report",
  description:
    "来週の面談・報告に向けて、既存案件への支援、会社へ提案できる貢献領域、小規模技術検証案、確認事項を整理するための下書きページ。",
};

const contributionAreas = [
  {
    title: "既存案件向けの技術調査・小規模技術検証",
    summary:
      "AI、クラウド、CAD周辺技術、外部APIなどについて、既存案件や顧客要望に接続できる範囲で小さく検証し、会社として受けられる仕事かを判断できる材料にする。",
    businessValue: ["受注前の技術リスクを減らす", "見積もり精度を上げる", "既存顧客への追加提案につなげる"],
    firstStep: "現在の案件や部署に近いテーマを会社側に教えてもらい、成立条件、制約、費用、次に確認することを1枚にまとめる。",
  },
  {
    title: "業務自動化・小規模ツール開発",
    summary:
      "Python、VBA、PowerShell、Webアプリ、AIを使い、社内作業や顧客向け作業の一部を自動化する。",
    businessValue: ["手作業の工数を減らす", "確認漏れや転記ミスを減らす", "小さな改善を継続的に作れる"],
    firstStep: "社内で時間がかかっている定型作業を1つ選び、現状手順、削減できそうな作業、試作範囲を確認する。",
  },
  {
    title: "技術ナレッジ・提案資料整備",
    summary:
      "技術調査、失敗しやすい条件、小規模技術検証の結果、外部製品の制約を、社内で再利用できる記事やチェックリストとして残す。",
    businessValue: ["同じ調査の繰り返しを減らす", "営業・開発・管理者へ説明しやすくする", "若手や他部署への共有材料になる"],
    firstStep: "MyReportで整理してきた記事を、社内向けに『提案前チェックリスト』として再編集する。",
  },
];

const proposalCards = [
  {
    title: "案1: 既存CATIA案件で技術的に難しい部分を補完できるか検証する",
    position:
      "CATIAそのものを置き換えるのではなく、既存のCATIA案件で発生する調査、確認、簡易チェックの一部を補完できるかを検証する。",
    customerValue: [
      "CATIAライセンスやAPI制約で止まる作業の一部を、既存案件の支援として確認できる可能性がある",
      "STEPなどの交換形式を使い、顧客や部署へ追加提案できる選択肢を増やす",
      "干渉チェック、形状確認、簡易レポート出力など、周辺作業の見積もりや工数削減につながる可能性がある",
    ],
    verification: [
      "STEPファイルを読み込む",
      "ブラウザまたはローカルアプリで3D表示する",
      "簡単な寸法・干渉・属性確認の可否を見る",
      "結果をレポート化できるか確認する",
    ],
    decisions: [
      "現在のCATIA案件に近い部署や顧客があるか",
      "提案先になりそうな部署や案件があるか",
      "小規模技術検証として時間を取る価値があるか",
      "顧客提案や見積もり補助につながる可能性があるか",
    ],
  },
  {
    title: "案2: 社内・顧客業務の自動化相談窓口",
    position:
      "明確な大型案件になる前の段階で、現場の手作業、Excel運用、ファイル変換、確認作業を小さく聞き取り、自動化候補を整理する。",
    customerValue: [
      "小さな改善を受注や追加提案につなげやすくする",
      "作業の属人化、転記ミス、確認漏れを減らす提案ができる",
      "AIやクラウドを使う前に、本当に自動化すべき作業を整理できる",
    ],
    verification: [
      "対象作業を1つ選ぶ",
      "現状手順、入力データ、出力物、確認者を整理する",
      "Python、VBA、Webアプリ、AIのどれが合うか比較する",
      "小さな試作または改善案を提示する",
    ],
    decisions: [
      "社内または顧客作業で、時間がかかっている定型作業があるか",
      "小規模改善として扱える部署や案件があるか",
      "業務時間内で調査・試作してよい範囲はどこまでか",
      "成果物をツール、手順書、チェックリストのどれとして出すのがよいか",
    ],
  },
];

const otherCandidates = [
  {
    title: "障がい者歯科向けシステム相談の可能性確認",
    position:
      "現時点では個人的な相談段階。正式な依頼や予算化の話になった場合、会社として受託検討の対象にできるかを確認する。",
    customerValue: [
      "医療・福祉領域の現場課題をもとにしたWebシステム案件になる可能性がある",
      "利用者、職員、医療機関側の業務を整理し、予約、問診、情報共有、記録管理などの相談につなげられる可能性がある",
      "現場の困りごとを聞ける接点があるため、要件の具体化を進めやすい",
    ],
    verification: [
      "正式な相談か、個人的な相談かを分ける",
      "誰が依頼者で、誰が予算を持つかを確認する",
      "扱う情報に医療情報や個人情報が含まれるか確認する",
      "会社として受ける場合の契約、責任範囲、保守体制を確認する",
    ],
    decisions: [
      "正式相談や予算化の話になった場合、会社として受託検討の対象になるか",
      "医療・福祉系のWebシステムを会社として扱えるか",
      "個人情報や医療情報を扱う場合、必要な確認先や責任範囲は何か",
    ],
  },
];

const articleLinks = [
  {
    title: "受け入れ条件を決めないまま開発すると何が起きるのか",
    href: "/reports/acceptance-criteria-before-development",
    note: "来週の報告で、作るだけでなく何をもって受け入れるかを説明する材料。",
  },
  {
    title: "技術的にできることと会社として採用できることは違う",
    href: "/reports/technical-possibility-company-adoption-gap",
    note: "技術提案を会社の判断材料へ変換するための考え方。",
  },
  {
    title: "高額な業務ソフトを自動化するときに確認したいこと",
    href: "/reports/expensive-business-software-automation-checkpoints",
    note: "CATIAなど外部製品依存の案件で、ライセンス、API、サポート範囲を確認する材料。",
  },
  {
    title: "小さな検証（PoC）が成功しても本番導入できない理由",
    href: "/reports/poc-success-production-adoption-risks",
    note: "PoCと本番導入を分けて説明する材料。",
  },
  {
    title: "技術調査では「分からなかったこと」も成果になる理由",
    href: "/reports/unknown-findings-as-technical-research-outcomes",
    note: "調査結果を、成功・失敗だけでなく次の判断材料として報告するための材料。",
  },
];

const slideDraft = [
  {
    title: "1. 面談で確認したこと",
    points: [
      "来週、会社へどのように貢献できるかを提案する機会がある",
      "会社としては、技術そのものより、受注や売上につながるかを重視している",
      "提案内容について、利益が生まれるかは会社側で判断する",
      "こちらの希望と会社が任せられる仕事の接続点を確認する必要がある",
    ],
  },
  {
    title: "2. 自分が提供できる価値",
    points: [
      "技術調査、小規模技術検証、業務自動化、CAD周辺調査、AI・クラウド活用を扱える",
      "作れるかだけでなく、制約、費用、ライセンス、運用、受け入れ条件を整理できる",
      "調査結果を記事、チェックリスト、提案資料として残せる",
    ],
  },
  {
    title: "3. 提案したい方向性",
    points: [
      "既存CATIA案件で技術的に難しい部分を補完できるか検証する",
      "社内・顧客業務の自動化相談窓口",
      "その他の案件候補として、正式相談になった場合の障がい者歯科向けシステム案件の検討可否確認",
    ],
  },
  {
    title: "4. 会社に判断してほしいこと",
    points: [
      "どのテーマなら会社の既存顧客、部署、案件に接続できるか",
      "どの範囲なら業務時間内の小規模技術検証として扱えるか",
      "顧客へ提案する場合、誰に相談し、どの部署と連携すべきか",
    ],
  },
];

const companyRequests = [
  "現在の案件や部署で適用できそうなテーマを教えていただきたい",
  "小規模な技術検証として進められる範囲を相談したい",
  "顧客提案につながる可能性があるテーマをご一緒に検討したい",
  "調査を依頼いただく場合、目的、成果物、判断者、責任範囲を最初に確認したい",
];

export default function CompanyProposalPage() {
  return (
    <main className="px-5 py-12 md:px-12 md:py-16 lg:px-20">
      <article className="mx-auto max-w-6xl">
        <section className="border-b border-slate-200 pb-10">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            Internal proposal draft
          </p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
            会社向け貢献提案メモ
          </h1>
          <p className="mt-5 max-w-4xl text-xl font-bold leading-9 text-teal-800">
            来週の面談に向けて、自主学習・技術記事・試作経験を「既存案件や既存顧客の支援にどう接続できるか」という形に整理する。
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <SummaryBox label="次回面談目安" value="2026年7月9日（木）" />
            <SummaryBox label="資料の目的" value="提案・相談・判断材料化" />
            <SummaryBox label="主な軸" value="既存案件支援 / 技術検証 / 自動化" />
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-black tracking-normal text-slate-950">報告の結論案</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            私は、研究だけをしたいのではなく、既存案件や顧客要望の中で技術的に難しい部分を小さく検証し、
            受注、見積もり、追加提案につながるかを判断する材料を作る役割で貢献したいです。
          </p>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            そのために、CAD周辺の技術調査、業務自動化、AI・クラウド活用、社内ナレッジ整備を、
            「技術的に面白いか」ではなく「会社として売上や工数削減につながるか」という基準で提案します。
          </p>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            進める場合は、最初に目的、成果物、判断者、責任範囲を確認し、過去と同じ認識違いが起きないようにしたいです。
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">面談で確認した前提</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoCard
              title="会社側が見ていること"
              items={[
                "その技術を欲しい部署や顧客がいるか",
                "今会社が受けている仕事に接続できるか",
                "売上、受注、工数削減、追加提案につながるか",
                "仕事の範囲や責任境界で再び認識違いが起きないか",
                "利益が生まれるかは会社として判断する",
              ]}
            />
            <InfoCard
              title="こちらが整理して持っていくこと"
              items={[
                "やりたい技術ではなく、会社への貢献として説明する",
                "研究テーマではなく、既存案件支援や小規模技術検証として説明する",
                "受注済みではない話は、可能性確認として扱う",
                "目的、成果物、判断者、責任範囲を最初に確認する姿勢を出す",
                "判断してほしいことを明確にする",
              ]}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">貢献できる領域</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {contributionAreas.map((area) => (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={area.title}>
                <h3 className="text-xl font-black leading-8 text-slate-950">{area.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{area.summary}</p>
                <h4 className="mt-5 text-sm font-black uppercase tracking-normal text-teal-800">会社への価値</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
                  {area.businessValue.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-5 rounded-md bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">
                  最初の一歩: {area.firstStep}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">来週提案したい主な案</h2>
          <div className="mt-6 grid gap-6">
            {proposalCards.map((proposal) => (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={proposal.title}>
                <h3 className="text-2xl font-black leading-9 text-slate-950">{proposal.title}</h3>
                <p className="mt-4 text-lg leading-9 text-slate-700">{proposal.position}</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <MiniPanel title="会社・顧客への価値" items={proposal.customerValue} />
                  <MiniPanel title="小規模技術検証" items={proposal.verification} />
                  <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
                    <h4 className="font-black text-teal-950">判断してほしいこと</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-teal-950">
                      {proposal.decisions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">その他の案件候補として確認したいこと</h2>
          <p className="mt-4 max-w-4xl text-lg leading-9 text-slate-700">
            これは主提案ではなく、正式な相談や予算化の話になった場合に会社として検討できるかを確認する位置づけにする。
            受注済み案件のようには話さない。
          </p>
          <div className="mt-6 grid gap-6">
            {otherCandidates.map((proposal) => (
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={proposal.title}>
                <h3 className="text-2xl font-black leading-9 text-slate-950">{proposal.title}</h3>
                <p className="mt-4 text-lg leading-9 text-slate-700">{proposal.position}</p>
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  <MiniPanel title="案件化した場合の価値" items={proposal.customerValue} />
                  <MiniPanel title="事前に確認すること" items={proposal.verification} />
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <h4 className="font-black text-slate-950">会社に確認したいこと</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
                      {proposal.decisions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-3xl font-black tracking-normal text-teal-950">会社にお願いしたいこと</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-9 text-teal-950">
            {companyRequests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">面談での言い方案</h2>
          <div className="mt-5 grid gap-4">
            <QuoteBlock>
              研究だけをしたいというより、既存案件や顧客提案につながるかを小さく検証し、
              判断材料を作る役割で貢献できないかと考えています。
            </QuoteBlock>
            <QuoteBlock>
              CATIAを置き換えるというより、既存CATIA案件で止まりやすい周辺作業を、STEPやOCCTなどで補完できるかを確認したいです。
              既存案件の追加提案や見積もり精度向上につながるか、会社として判断していただきたいです。
            </QuoteBlock>
            <QuoteBlock>
              進める場合は、目的、成果物、判断者、責任範囲を最初に確認したいです。
              以前のように仕事の範囲や責任境界で認識違いが起きないようにしたいです。
            </QuoteBlock>
            <QuoteBlock>
              その他の候補として、個人的に相談を受けているシステムの話があります。現時点では正式依頼ではありませんが、
              もし病院などから正式な開発相談や予算化の話になった場合、会社として受託を検討することは可能でしょうか。
            </QuoteBlock>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">PowerPoint / Word 化する場合の構成</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {slideDraft.map((slide) => (
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={slide.title}>
                <h3 className="text-xl font-black leading-8 text-slate-950">{slide.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
                  {slide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">次回までに準備すること</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-100 text-sm text-slate-700">
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 font-black">項目</th>
                  <th className="border-b border-slate-200 px-4 py-3 font-black">やること</th>
                  <th className="border-b border-slate-200 px-4 py-3 font-black">目的</th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7 text-slate-700">
                <TableRow
                  item="面談録音の要約"
                  action="NotebookLMで要点、会社側の期待、次回宿題を抽出する"
                  purpose="認識違いを減らす"
                />
                <TableRow
                  item="提案を1枚に圧縮"
                  action="貢献領域、主提案2案、その他の案件候補、会社に判断してほしいことをA4またはスライド1枚にする"
                  purpose="面談で話しやすくする"
                />
                <TableRow
                  item="CATIA案件支援"
                  action="STEP、OCCT、Python、WebAssemblyで既存案件のどの困りごとを補完できるかを1つに絞る"
                  purpose="研究ではなく既存案件支援として見せる"
                />
                <TableRow
                  item="責任範囲"
                  action="調査を依頼される場合の目的、成果物、判断者、責任範囲を確認する文言を用意する"
                  purpose="過去と同じ認識違いを避ける"
                />
                <TableRow
                  item="障がい者歯科の相談"
                  action="正式依頼ではないこと、予算化された場合の会社検討可否を聞く形にする"
                  purpose="確定案件のように誤解されないようにする"
                />
                <TableRow
                  item="面談時間"
                  action="2026年7月9日（木）を候補に、自分から時間を指定する"
                  purpose="次回報告の段取りを決める"
                />
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">根拠として使える記事</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {articleLinks.map((article) => (
              <Link
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
                href={article.href}
                key={article.href}
              >
                <h3 className="text-lg font-black leading-7 text-slate-950">{article.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{article.note}</p>
                <span className="mt-4 inline-flex font-black text-teal-700 underline-offset-4 hover:underline">
                  記事を見る
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-black leading-7 text-slate-950">{value}</p>
    </div>
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

function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-lg border-l-4 border-teal-600 bg-slate-50 p-5 text-lg font-bold leading-9 text-slate-800">
      {children}
    </blockquote>
  );
}

function TableRow({ item, action, purpose }: { item: string; action: string; purpose: string }) {
  return (
    <tr>
      <td className="border-b border-slate-100 px-4 py-3 font-black text-slate-950">{item}</td>
      <td className="border-b border-slate-100 px-4 py-3">{action}</td>
      <td className="border-b border-slate-100 px-4 py-3">{purpose}</td>
    </tr>
  );
}
