export const metadata = {
  title: "3Dデータから三面図・確認資料を自動生成するPoC提案 | My Report",
  description:
    "3Dデータから三面図風の確認資料を自動生成できるかを検証するPoC提案資料。",
};

const projectScope = [
  {
    title: "提案目的",
    items: [
      "社内IT部署では、機械設計部署の支援や3D/CATIA周辺の相談が多いと理解している",
      "3Dデータの確認、資料化、説明用出力を軽くできれば、設計者、営業、見積もり、顧客説明の支援につながる可能性がある",
      "会社側から仕様を細かく決めていただくのではなく、自分の方でPoC範囲を定義して進める",
      "既存案件でより価値が高い用途があれば、レビュー時に優先順位を調整する",
    ],
  },
  {
    title: "現状課題",
    items: [
      "過去の検討では、正面・側面・上面・アイソメ図を出力できても、用紙フォーマットへの自動配置で制約があった",
      "物体が写っている範囲の自動検出、余白トリミング、縮尺調整、配置座標の指定を十分に制御できなかった",
      "用紙にはタイトル欄、記入欄、押印欄などの避けるべき領域があり、ビュー同士が重ならない配置が必要になる",
      "単なる表示ではなく、確認資料として整える工程まで自動化できるかを検証したい",
    ],
  },
];

const pocPurpose = [
  "3Dデータを読み込み、正面・上面・側面・アイソメなどのビューを自動生成できるか検証する",
  "各ビューで物体が写っている範囲を検出し、不要な余白を自動でトリミングできるか検証する",
  "指定された用紙フォーマット内の配置領域に合わせて、縮尺と配置座標を自動計算できるか検証する",
  "タイトル欄、記入欄、押印欄を避け、確認資料またはPDFとして出力できるか判断する",
  "離れた位置にある治具・補助部品などをBBox（図面化する範囲を囲う箱）で対象外にし、見せたい部分だけで縮尺を計算できるか検証する",
];

const scopeItems = [
  "やること: 3Dデータの読み込みと、正面・上面・側面・アイソメビューの生成",
  "やること: 各ビューの外形範囲を取得し、不要な余白を自動トリミングする",
  "やること: 用紙フォーマット上の指定領域に収まるよう縮尺を自動計算する",
  "やること: タイトル欄や押印欄を避けて、各ビューを指定座標へ配置する",
  "やること: 配置結果を画像またはPDFの確認資料として出力する",
  "やること: BBoxで指定した範囲だけを採用し、不要な部品を除外してビューと縮尺を再計算する",
  "余裕があれば: 簡易寸法、注記、ファイル名、確認日時などの補助情報を追加",
  "やらないこと: CAD編集、CATIA置き換え、正式図面、品質保証、解析、AI連携",
];

const benefits = [
  "ビューのトリミング、縮尺調整、用紙配置の手作業を減らせる可能性がある",
  "CATIAライセンスがない人でも確認資料を見られる可能性がある",
  "社内レビューや顧客説明のための資料を短時間で作れる可能性がある",
  "既存案件への追加提案材料として使える可能性がある",
];

const limits = [
  "現在利用しているCATIAライセンスではSTEP出力に対応していないことを確認済み",
  "PoCでは、STEPサンプル、自作の簡単なSTEP形状、またはIGES・STLで確認資料生成を検証する",
  "正式図面、品質保証、顧客納品物としての利用は、PoCとは別に会社判断が必要",
  "STEPデータで保持できないCATIAネイティブ情報は、初期PoCの対象外にする",
  "価値が見えなければ、追加開発せず調査報告で終了する",
];

const schedule = [
  "7/22: 再提案を行い、PoCの目的、実施範囲、成果物を確認する",
  "7/23〜7/24: 以前の検討で使用したbitbybitを再利用し、まずSTEPサンプルまたは自作形状をブラウザ上に表示する。表示成立後、IGES・STLの読み込み可否も確認する",
  "7/28〜7/29: 正面・上面・側面・アイソメビューの生成、外形範囲取得、自動トリミング、縮尺調整を実装する",
  "7/30〜7/31: 指定用紙への自動配置と確認資料出力を試し、成果、課題、継続判断の材料をまとめる",
];

const successConditions = [
  "3Dサンプルから正面・上面・側面・アイソメビューを自動生成できる",
  "各ビューの外形範囲を取得し、不要な余白を自動で除去できる",
  "指定された用紙内の配置領域に合わせて縮尺を自動調整できる",
  "タイトル欄や押印欄を避けて、各ビューを重ならずに配置できる",
  "配置結果を画像またはPDFとして出力し、既存案件で利用価値があるか判断できる",
  "離れた不要部品をBBoxで除外し、対象部品が見やすい縮尺で表示される",
];

const deliverables = [
  "3Dデータから生成した確認資料サンプル",
  "STEP読み込み、3D表示、ビュー出力の動作サンプル",
  "できたこと、できなかったこと、使えない条件を整理した調査報告",
  "継続、範囲変更、中止を判断するための材料",
];

const fallbackPlans = [
  "1. まず自分の方で、確認資料自動生成の最小PoCを1週間で作る",
  "2. 社内レビューで、既存案件の確認資料・見積もり・顧客説明に使えるか確認する",
  "3. 価値がありそうなら、既存案件で試す用途を会社と相談して絞る",
  "4. 顧客説明資料や追加提案材料として使えるか判断する",
  "5. 価値が見えなければ、調査報告と代替案を残して終了する",
];

const consultationPoints = [
  "今回のPoCは、3Dデータから三面図風の確認資料を自動生成することを目標として進めたい",
  "検証にはSTEPサンプルや自作形状を使う。会社で利用可能なIGES・STL等のデータがあれば追加検証したい",
  "既存案件でより価値が高い用途があれば、途中レビュー時に優先順位を調整したい",
  "1週間の初期PoC後に、継続、範囲変更、中止を判断する進め方でよいか確認したい",
  "実データに治具・補助部品・離れた別部品が含まれる場合、BBoxで見せたい範囲だけを図面化する使い方に価値があるか確認したい",
];

export default function CompanyProposal20260716Page() {
  return (
    <main className="px-5 py-12 md:px-12 md:py-16 lg:px-20">
      <article className="mx-auto max-w-6xl">
        <section className="border-b border-slate-200 pb-10">
          <p className="mb-3 text-xs font-black uppercase tracking-normal text-amber-700">
            PoC proposal
          </p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
            3Dデータから三面図・確認資料を自動生成するPoC提案
          </h1>
          <p className="mt-5 max-w-4xl text-xl font-bold leading-9 text-teal-800">
            3Dデータから三面図風の確認資料を自動生成できるかを、まず1週間の小規模PoCとして検証します。
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-black tracking-normal text-slate-950">今回の提案方針</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            CATIAそのものを置き換える提案ではありません。CAD本体で行うべき設計作業と、CAD本体の外側で補助できる確認、共有、資料化の作業を分け、
            後者を3Dデータ活用で支援できるかを検証する提案です。最初のPoCは、STEPなどの交換形式を読み込み、正面・上面・側面のビューや確認資料を自動出力する範囲に絞ります。
          </p>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          {projectScope.map((section) => (
            <InfoCard title={section.title} items={section.items} key={section.title} />
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">PoCの目的</h2>
          <InfoCard title="既存3D案件で利用できる確認資料自動生成の実現可能性を検証する" items={pocPurpose} />
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">今回やること / やらないこと</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            1週間で判断しやすい範囲に絞ります。
          </p>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-9 text-slate-700">
            {scopeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <MiniPanel title="メリット・期待できそうな効果" items={benefits} />
          <MiniPanel title="データ取得方法とリスク" items={limits} />
        </section>

        <section className="mt-12 rounded-lg border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-3xl font-black tracking-normal text-teal-950">初期スケジュール</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {schedule.map((item, index) => (
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
          <h2 className="text-3xl font-black tracking-normal text-slate-950">成功条件</h2>
          <InfoCard title="次の検証へ進む価値があると判断しやすい条件" items={successConditions} />
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <InfoCard title="想定する成果物" items={deliverables} />
          <InfoCard title="会社への貢献イメージ" items={fallbackPlans} />
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-black tracking-normal text-slate-950">山浦さんへ相談したいこと</h2>
          <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-9 text-slate-700">
            {consultationPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-8 text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
