import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "exports", "company-proposal");
const proposalDate = "2026-07-22";
const pptxPath = path.join(outDir, `company-proposal-${proposalDate}.pptx`);
const docxPath = path.join(outDir, `company-proposal-${proposalDate}.docx`);
const proposalAssetsDir = path.join(root, "assets", "company-proposal");

const deckTitle = "3Dデータから三面図・確認資料を自動生成するPoC提案";

const slides = [
  {
    title: deckTitle,
    subtitle: "既存3D案件の確認作業・資料作成を支援するための小規模検証案",
    bullets: [
      "既存3D案件の周辺作業を支援する案として、3Dデータから三面図風の確認資料を自動生成できるか検証します。",
      "最初から大きな開発にせず、まず1週間で動く最小サンプルを作り、継続する価値を判断できる状態にします。",
      "単なる3D表示ではなく、ビューのトリミング、縮尺調整、用紙フォーマットへの配置を自動化できるかを見ます。",
    ],
  },
  {
    title: "提案目的",
    subtitle: "会社へどう貢献するか",
    bullets: [
      "社内IT部署では、機械設計部署の支援や3D/CATIA周辺の相談が多いと理解している",
      "3Dデータの確認、資料化、説明用出力を軽くできれば、設計者、営業、見積もり、顧客説明の支援につながる可能性がある",
      "今回の提案では、会社側から仕様を細かく決めていただくのではなく、自分の方でPoC範囲を定義して進める",
      "既存案件でより価値が高い用途があれば、レビュー時に優先順位を調整する",
    ],
  },
  {
    title: "現状課題",
    subtitle: "CAD本体だけでは周辺作業の自動化に限界が出やすい",
    bullets: [
      "過去の検討では、正面・側面・上面・アイソメ図を出力できても、用紙フォーマットへの自動配置で制約があった",
      "物体が写っている範囲の自動検出、余白トリミング、縮尺調整、配置座標の指定を十分に制御できなかった",
      "用紙にはタイトル欄、記入欄、押印欄などの避けるべき領域があり、ビュー同士が重ならない配置が必要になる",
      "そのため、単なる表示ではなく、確認資料として整える工程まで自動化できるかを検証したい",
    ],
  },
  {
    title: "実データで起きる課題",
    subtitle: "離れた不要部品まで含めると、見せたい部品が小さくなる",
    bullets: [
      "実際のアセンブリには、治具、搬送用の仮部品、基準用オブジェクト、離れた別部品が含まれる場合がある",
      "モデル全体の外形で縮尺を決めると、離れた小部品のために本来見せたい部品が小さく表示される",
      "BBoxで図面化する範囲を指定し、その範囲だけでビュー生成と縮尺計算を行う",
    ],
  },
  {
    title: "PoCの目的",
    subtitle: "既存3D案件で利用できる確認資料自動生成の実現可能性を検証する",
    bullets: [
      "3Dデータを読み込み、正面・上面・側面・アイソメなどのビューを自動生成できるか検証する",
      "各ビューで物体が写っている範囲を検出し、不要な余白を自動でトリミングできるか検証する",
      "指定された用紙フォーマット内の配置領域に合わせて、縮尺と配置座標を自動計算できるか検証する",
      "タイトル欄、記入欄、押印欄を避け、確認資料またはPDFとして出力できるか判断する",
      "離れた位置にある治具・補助部品などをBBox（図面化する範囲を囲う箱）で対象外にし、見せたい部分だけで縮尺を計算できるか検証する",
    ],
  },
  {
    title: "今回やること / やらないこと",
    subtitle: "スコープを明確にし、1週間で判断しやすい範囲に絞る",
    bullets: [
      "やること: 3Dデータの読み込みと、正面・上面・側面・アイソメビューの生成",
      "やること: 各ビューの外形範囲を取得し、不要な余白を自動トリミングする",
      "やること: 用紙フォーマット上の指定領域に収まるよう縮尺を自動計算する",
      "やること: タイトル欄や押印欄を避けて、各ビューを指定座標へ配置する",
      "やること: 配置結果を画像またはPDFの確認資料として出力する",
      "やること: BBoxで指定した範囲だけを採用し、不要な部品を除外してビューと縮尺を再計算する",
      "余裕があれば: 簡易寸法、注記、ファイル名、確認日時などの補助情報を追加",
      "やらないこと: CAD編集、CATIA置き換え、正式図面、品質保証、解析、AI連携",
    ],
  },
  {
    title: "初期スケジュール",
    subtitle: "まず1週間で最小サンプルを作り、継続判断を行う",
    bullets: [
      "7/22: 再提案を行い、PoCの目的、実施範囲、成果物を確認する",
      "7/23〜7/24: 以前の検討で使用したbitbybitを再利用し、まずSTEPサンプルまたは自作形状をブラウザ上に表示する。表示成立後、IGES・STLの読み込み可否も確認する",
      "7/28〜7/29: 正面・上面・側面・アイソメビューの生成、外形範囲取得、自動トリミング、縮尺調整を実装する",
      "7/30〜7/31: 指定用紙への自動配置と確認資料出力を試し、成果、課題、継続判断の材料をまとめる",
    ],
  },
  {
    title: "成功条件",
    subtitle: "この条件を満たせば、次の検証へ進む価値があると判断しやすい",
    bullets: [
      "3Dサンプルから正面・上面・側面・アイソメビューを自動生成できる",
      "各ビューの外形範囲を取得し、不要な余白を自動で除去できる",
      "指定された用紙内の配置領域に合わせて縮尺を自動調整できる",
      "タイトル欄や押印欄を避けて、各ビューを重ならずに配置できる",
      "配置結果を画像またはPDFとして出力し、既存案件で利用価値があるか判断できる",
      "離れた不要部品をBBoxで除外し、対象部品が見やすい縮尺で表示される",
    ],
  },
  {
    title: "データ取得方法とリスク",
    subtitle: "会社側の価値と確認が必要な点",
    bullets: [
      "期待効果: ビューのトリミング、縮尺調整、用紙配置の手作業を減らせる可能性",
      "期待効果: CATIAライセンスがない人でも確認資料を見られる可能性",
      "現在利用しているCATIAライセンスではSTEP出力に対応していないことを確認済み",
      "PoCでは、STEPサンプル、自作の簡単なSTEP形状、またはIGES・STLで確認資料生成を検証する",
      "正式図面、品質保証、顧客納品物としての利用は、PoCとは別に会社判断が必要",
    ],
  },
  {
    title: "会社への貢献イメージ",
    subtitle: "PoCを既存案件支援や売上機会へつなげる流れ",
    bullets: [
      "1. まず自分の方で、確認資料自動生成の最小PoCを1週間で作る",
      "2. 社内レビューで、既存案件の確認資料・見積もり・顧客説明に使えるか確認する",
      "3. 価値がありそうなら、既存案件で試す用途を会社と相談して絞る",
      "4. 顧客説明資料や追加提案材料として使えるか判断する",
      "5. 価値が見えなければ、調査報告と代替案を残して終了する",
    ],
  },
  {
    title: "山浦さんへ相談したいこと",
    subtitle: "主導権はこちらで持ちつつ、会社側の優先度を確認したいこと",
    bullets: [
      "今回のPoCは、3Dデータから三面図風の確認資料を自動生成することを目標として進めたい",
      "検証にはSTEPサンプルや自作形状を使う。会社で利用可能なIGES・STL等のデータがあれば追加検証したい",
      "既存案件でより価値が高い用途があれば、途中レビュー時に優先順位を調整したい",
      "1週間の初期PoC後に、継続、範囲変更、中止を判断する進め方でよいか確認したい",
      "実データに治具・補助部品・離れた別部品が含まれる場合、BBoxで見せたい範囲だけを図面化する使い方に価値があるか確認したい",
    ],
  },
];

const docSections = [
  ["今回相談したいこと", [
    "2026年7月8日の面談では、会社へどう貢献できるかについて、もう一段具体的に再提案することになりました。",
    "今回は、3Dデータから三面図風の確認資料を自動生成できるかを1つの小規模PoCとして整理します。",
    "まず1週間で動く最小サンプルを作り、継続する価値を判断できる状態にします。",
    "目的はCATIAを置き換えることではなく、既存3D案件の後工程、確認作業、資料作成を補助できるか判断材料を作ることです。",
  ]],
  ["提案目的", [
    "社内IT部署では、機械設計部署の支援や3D/CATIA周辺の相談が多いと理解しています。",
    "3Dデータの確認、資料化、説明用出力を軽くできれば、設計者、営業、見積もり、顧客説明の支援につながる可能性があります。",
    "今回の提案では、会社側から仕様を細かく決めていただくのではなく、自分の方でPoC範囲を定義して進めます。",
    "既存案件でより価値が高い用途があれば、レビュー時に優先順位を調整します。",
  ]],
  ["現状課題", [
    "過去の検討では、正面・側面・上面・アイソメ図を出力できても、用紙フォーマットへの自動配置で制約がありました。",
    "物体が写っている範囲の自動検出、余白トリミング、縮尺調整、配置座標の指定を十分に制御できませんでした。",
    "用紙にはタイトル欄、記入欄、押印欄などの避けるべき領域があり、ビュー同士が重ならない配置が必要になります。",
    "そのため、単なる表示ではなく、確認資料として整える工程まで自動化できるかを検証したいです。",
  ]],
  ["実データで起きる課題", [
    "実際のアセンブリには、治具、搬送用の仮部品、基準用オブジェクト、離れた別部品など、図面化したくないデータが一緒に含まれる場合があります。",
    "モデル全体の外形で縮尺を計算すると、離れた小部品まで収めるため、本来見せたい部品が小さく表示されます。",
    "BBox（図面化する範囲を囲う箱）で対象範囲を指定し、その範囲だけを採用してビュー生成と縮尺計算を行えるか検証します。",
  ]],
  ["PoCの目的", [
    "3Dデータを読み込み、正面・上面・側面・アイソメなどのビューを自動生成できるか検証します。",
    "各ビューで物体が写っている範囲を検出し、不要な余白を自動でトリミングできるか検証します。",
    "指定された用紙フォーマット内の配置領域に合わせて、縮尺と配置座標を自動計算できるか検証します。",
    "タイトル欄、記入欄、押印欄を避け、確認資料またはPDFとして出力できるか判断します。",
    "離れた位置にある治具・補助部品などをBBoxで対象外にし、見せたい部分だけで縮尺を計算できるか検証します。",
  ]],
  ["今回やること / やらないこと", [
    "やること: 3Dデータの読み込みと、正面・上面・側面・アイソメビューの生成。",
    "やること: 各ビューの外形範囲を取得し、不要な余白を自動トリミングする。",
    "やること: 用紙フォーマット上の指定領域に収まるよう縮尺を自動計算する。",
    "やること: タイトル欄や押印欄を避けて、各ビューを指定座標へ配置する。",
    "やること: 配置結果を画像またはPDFの確認資料として出力する。",
    "やること: BBoxで指定した範囲だけを採用し、不要な部品を除外してビューと縮尺を再計算する。",
    "余裕があれば: 簡易寸法、注記、ファイル名、確認日時などの補助情報を追加。",
    "やらないこと: CAD編集、CATIA置き換え、正式図面、品質保証、解析、AI連携。",
  ]],
  ["初期スケジュール", [
    "7/22: 再提案を行い、PoCの目的、実施範囲、成果物を確認します。",
    "7/23〜7/24: 以前の検討で使用したbitbybitを再利用し、まずSTEPサンプルまたは自作形状をブラウザ上に表示します。表示成立後、IGES・STLの読み込み可否も確認します。",
    "7/28〜7/29: 正面・上面・側面・アイソメビューの生成、外形範囲取得、自動トリミング、縮尺調整を実装します。",
    "7/30〜7/31: 指定用紙への自動配置と確認資料出力を試し、成果、課題、継続判断の材料をまとめます。",
  ]],
  ["成功条件", [
    "3Dサンプルから正面・上面・側面・アイソメビューを自動生成できる。",
    "各ビューの外形範囲を取得し、不要な余白を自動で除去できる。",
    "指定された用紙内の配置領域に合わせて縮尺を自動調整できる。",
    "タイトル欄や押印欄を避けて、各ビューを重ならずに配置できる。",
    "配置結果を画像またはPDFとして出力し、既存案件で利用価値があるか判断できる。",
    "離れた不要部品をBBoxで除外し、対象部品が見やすい縮尺で表示される。",
  ]],
  ["データ取得方法とリスク", [
    "期待効果: ビューのトリミング、縮尺調整、用紙配置の手作業を減らせる可能性があります。",
    "期待効果: CATIAライセンスがない人でも確認資料を見られる可能性があります。",
    "現在利用しているCATIAライセンスではSTEP出力に対応していないことを確認済みです。",
    "PoCでは、STEPサンプル、自作の簡単なSTEP形状、またはIGES・STLで確認資料生成を検証します。",
    "正式図面、品質保証、顧客納品物としての利用は、PoCとは別に会社判断が必要です。",
  ]],
  ["会社への貢献イメージ", [
    "1. まず自分の方で、確認資料自動生成の最小PoCを1週間で作る。",
    "2. 社内レビューで、既存案件の確認資料・見積もり・顧客説明に使えるか確認する。",
    "3. 価値がありそうなら、既存案件で試す用途を会社と相談して絞る。",
    "4. 顧客説明資料や追加提案材料として使えるか判断する。",
    "5. 価値が見えなければ、調査報告と代替案を残して終了する。",
  ]],
  ["山浦さんへ相談したいこと", [
    "今回のPoCは、3Dデータから三面図風の確認資料を自動生成することを目標として進めたい。",
    "検証にはSTEPサンプルや自作形状を使います。会社で利用可能なIGES・STL等のデータがあれば追加検証したいです。",
    "既存案件でより価値が高い用途があれば、途中レビュー時に優先順位を調整したい。",
    "1週間の初期PoC後に、継続、範囲変更、中止を判断する進め方でよいか確認したい。",
    "実データに治具・補助部品・離れた別部品が含まれる場合、BBoxで見せたい範囲だけを図面化する使い方に価値があるか確認したい。",
  ]],
];

function ensureOutDir() {
  fs.mkdirSync(outDir, { recursive: true });
}

function addTitle(pptx, slide, title, subtitle) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.16,
    fill: { color: "0F766E" },
    line: { color: "0F766E" },
  });
  slide.addText(title, {
    x: 0.6,
    y: 0.38,
    w: 12.1,
    h: 0.72,
    fontFace: "Yu Gothic",
    fontSize: 26,
    bold: true,
    color: "0F172A",
    fit: "shrink",
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.62,
      y: 1.15,
      w: 11.9,
      h: 0.42,
      fontFace: "Yu Gothic",
      fontSize: 16,
      bold: true,
      color: "0F766E",
      fit: "shrink",
      margin: 0,
    });
  }
}

function addBullets(slide, bullets, y) {
  slide.addText(
    bullets.map((text) => ({ text, options: { bullet: true, breakLine: true } })),
    {
      x: 0.85,
      y,
      w: 11.85,
      h: 5.05,
      fontFace: "Yu Gothic",
      fontSize: 18,
      color: "334155",
      fit: "shrink",
      paraSpaceAfterPt: 9,
      valign: "top",
      margin: 0.06,
    },
  );
}

function addPageNumber(slide, current, total) {
  slide.addText(`${current} / ${total}`, {
    x: 11.7,
    y: 6.95,
    w: 0.9,
    h: 0.25,
    fontSize: 8,
    color: "64748B",
    align: "right",
    margin: 0,
  });
}

function addFlowArrow(pptx, slide, x, y, w = 0.62) {
  slide.addShape(pptx.ShapeType.chevron, {
    x, y, w, h: 0.58,
    fill: { color: "99F6E4" },
    line: { color: "5EEAD4", width: 1 },
  });
}

function addIntroVisual(pptx, slide) {
  addTitle(pptx, slide, deckTitle, "3Dデータを、確認・共有に使える資料へ変換する小規模検証");

  const cards = [
    { x: 0.72, w: 3.1, title: "入力", caption: "3Dデータ", color: "E0F2FE", line: "38BDF8" },
    { x: 4.45, w: 3.55, title: "自動処理", caption: "4方向ビューを生成・調整", color: "CCFBF1", line: "2DD4BF" },
    { x: 8.63, w: 3.98, title: "出力", caption: "確認資料・PDF", color: "FEF3C7", line: "F59E0B" },
  ];
  cards.forEach((card) => slide.addShape(pptx.ShapeType.roundRect, {
    x: card.x, y: 1.82, w: card.w, h: 3.72, rectRadius: 0.08,
    fill: { color: card.color }, line: { color: card.line, width: 1.4 },
  }));

  // 3Dデータを表す簡易立方体
  slide.addShape(pptx.ShapeType.hexagon, { x: 1.52, y: 2.35, w: 1.5, h: 1.38, fill: { color: "BAE6FD" }, line: { color: "0369A1", width: 2 } });
  slide.addText("3D", { x: 1.84, y: 2.78, w: 0.86, h: 0.36, fontFace: "Yu Gothic", fontSize: 20, bold: true, color: "075985", align: "center", margin: 0 });

  // 4方向ビュー
  [[4.92, 2.35], [6.25, 2.35], [4.92, 3.46], [6.25, 3.46]].forEach(([x, y], index) => {
    slide.addShape(pptx.ShapeType.rect, { x, y, w: 1.08, h: 0.76, fill: { color: "FFFFFF" }, line: { color: "0F766E", width: 1.2 } });
    slide.addShape(index === 3 ? pptx.ShapeType.hexagon : pptx.ShapeType.ellipse, { x: x + 0.32, y: y + 0.16, w: 0.44, h: 0.42, fill: { color: "D1FAE5" }, line: { color: "0F766E", width: 1 } });
  });

  // 用紙と表題欄
  slide.addShape(pptx.ShapeType.rect, { x: 9.38, y: 2.28, w: 2.45, h: 1.72, fill: { color: "FFFFFF" }, line: { color: "475569", width: 1.5 } });
  slide.addShape(pptx.ShapeType.rect, { x: 10.73, y: 3.35, w: 1.1, h: 0.65, fill: { color: "FDE68A" }, line: { color: "B45309", width: 1 } });
  [[9.64, 2.55], [10.35, 2.55], [9.64, 3.18]].forEach(([x, y]) => slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.52, h: 0.38, fill: { color: "E2E8F0" }, line: { color: "64748B", width: 0.8 } }));

  addFlowArrow(pptx, slide, 3.83, 3.06);
  addFlowArrow(pptx, slide, 8.01, 3.06);
  cards.forEach((card) => {
    slide.addText(card.title, { x: card.x + 0.2, y: 4.38, w: card.w - 0.4, h: 0.3, fontFace: "Yu Gothic", fontSize: 12, bold: true, color: "64748B", align: "center", margin: 0 });
    slide.addText(card.caption, { x: card.x + 0.2, y: 4.75, w: card.w - 0.4, h: 0.42, fontFace: "Yu Gothic", fontSize: 17, bold: true, color: "0F172A", align: "center", fit: "shrink", margin: 0 });
  });
  slide.addText("まず1週間で最小サンプルを作り、既存案件で使う価値があるかを判断する", {
    x: 1.28, y: 5.86, w: 10.78, h: 0.62, fontFace: "Yu Gothic", fontSize: 18, bold: true,
    color: "115E59", align: "center", valign: "mid", fill: { color: "ECFDF5" }, line: { color: "A7F3D0", width: 1 }, margin: 0.08,
  });
}

function addPurposeVisual(pptx, slide) {
  addTitle(pptx, slide, "提案目的", "3Dデータ周辺の確認・資料化を軽くし、既存案件を支援できるか確かめる");
  const users = [
    { x: 0.72, label: "設計者", need: "確認資料を作る手間", icon: "設" },
    { x: 0.72, label: "営業・見積", need: "形状を説明する資料", icon: "営" },
    { x: 0.72, label: "顧客説明", need: "CADなしで見られる資料", icon: "客" },
  ];
  users.forEach((user, index) => {
    const y = 1.82 + index * 1.32;
    slide.addShape(pptx.ShapeType.roundRect, { x: user.x, y, w: 3.15, h: 1.02, rectRadius: 0.06, fill: { color: "F8FAFC" }, line: { color: "CBD5E1", width: 1 } });
    slide.addShape(pptx.ShapeType.ellipse, { x: user.x + 0.22, y: y + 0.19, w: 0.62, h: 0.62, fill: { color: "0F766E" }, line: { color: "0F766E" } });
    slide.addText(user.icon, { x: user.x + 0.22, y: y + 0.32, w: 0.62, h: 0.25, fontFace: "Yu Gothic", fontSize: 13, bold: true, color: "FFFFFF", align: "center", margin: 0 });
    slide.addText(user.label, { x: user.x + 1.0, y: y + 0.16, w: 1.82, h: 0.28, fontFace: "Yu Gothic", fontSize: 15, bold: true, color: "0F172A", margin: 0 });
    slide.addText(user.need, { x: user.x + 1.0, y: y + 0.52, w: 1.92, h: 0.24, fontFace: "Yu Gothic", fontSize: 10, color: "64748B", fit: "shrink", margin: 0 });
    addFlowArrow(pptx, slide, 3.92, y + 0.22, 0.58);
  });
  slide.addShape(pptx.ShapeType.roundRect, { x: 4.62, y: 2.18, w: 3.4, h: 2.86, rectRadius: 0.08, fill: { color: "CCFBF1" }, line: { color: "14B8A6", width: 1.6 } });
  slide.addText("今回のPoC", { x: 5.12, y: 2.52, w: 2.4, h: 0.34, fontFace: "Yu Gothic", fontSize: 14, bold: true, color: "0F766E", align: "center", margin: 0 });
  slide.addText("3Dデータから\n確認資料を自動生成", { x: 5.0, y: 3.12, w: 2.64, h: 0.92, fontFace: "Yu Gothic", fontSize: 21, bold: true, color: "134E4A", align: "center", valign: "mid", margin: 0 });
  addFlowArrow(pptx, slide, 8.1, 3.28, 0.65);
  slide.addShape(pptx.ShapeType.roundRect, { x: 8.88, y: 1.82, w: 3.72, h: 3.62, rectRadius: 0.08, fill: { color: "FEF3C7" }, line: { color: "F59E0B", width: 1.4 } });
  slide.addText("判断したいこと", { x: 9.32, y: 2.18, w: 2.84, h: 0.35, fontFace: "Yu Gothic", fontSize: 15, bold: true, color: "92400E", align: "center", margin: 0 });
  slide.addText("既存案件で使えるか\n\nどの用途を優先するか\n\n継続・変更・終了", { x: 9.3, y: 2.82, w: 2.9, h: 2.04, fontFace: "Yu Gothic", fontSize: 17, bold: true, color: "78350F", align: "center", valign: "mid", margin: 0 });
  slide.addText("会社側に細かな仕様決定を求める前に、こちらで小さく動かして相談材料を作る", { x: 1.05, y: 5.82, w: 11.2, h: 0.58, fontFace: "Yu Gothic", fontSize: 16, bold: true, color: "334155", align: "center", fill: { color: "F1F5F9" }, margin: 0.08 });
}

function addProblemVisual(pptx, slide) {
  addTitle(pptx, slide, "現状課題", "ビューを出すだけでは、確認資料として使える状態にならない");
  const steps = [
    { title: "ビュー生成", note: "正面・側面・上面", color: "E0F2FE", line: "38BDF8" },
    { title: "余白処理", note: "外形検出・トリミング", color: "FEE2E2", line: "F87171" },
    { title: "縮尺調整", note: "用紙内へ収める", color: "FEE2E2", line: "F87171" },
    { title: "配置", note: "表題欄・押印欄を避ける", color: "FEE2E2", line: "F87171" },
    { title: "確認資料", note: "画像・PDF", color: "DCFCE7", line: "4ADE80" },
  ];
  steps.forEach((step, index) => {
    const x = 0.45 + index * 2.58;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.15, w: 2.05, h: 2.2, rectRadius: 0.06, fill: { color: step.color }, line: { color: step.line, width: 1.3 } });
    slide.addText(index === 0 ? "3D → 2D" : index === 4 ? "✓" : "手作業", { x: x + 0.35, y: 2.53, w: 1.35, h: 0.52, fontFace: "Yu Gothic", fontSize: index === 4 ? 26 : 16, bold: true, color: index === 4 ? "15803D" : index === 0 ? "0369A1" : "B91C1C", align: "center", margin: 0 });
    slide.addText(step.title, { x: x + 0.16, y: 3.25, w: 1.73, h: 0.32, fontFace: "Yu Gothic", fontSize: 16, bold: true, color: "0F172A", align: "center", margin: 0 });
    slide.addText(step.note, { x: x + 0.14, y: 3.72, w: 1.77, h: 0.28, fontFace: "Yu Gothic", fontSize: 10, color: "64748B", align: "center", fit: "shrink", margin: 0 });
    if (index < steps.length - 1) addFlowArrow(pptx, slide, x + 2.08, 2.98, 0.42);
  });
  slide.addShape(pptx.ShapeType.roundRect, { x: 2.72, y: 4.82, w: 7.85, h: 1.05, rectRadius: 0.05, fill: { color: "FFF7ED" }, line: { color: "FDBA74", width: 1 } });
  slide.addText("今回の検証対象", { x: 3.05, y: 5.05, w: 1.65, h: 0.28, fontFace: "Yu Gothic", fontSize: 13, bold: true, color: "C2410C", align: "center", margin: 0 });
  slide.addText("余白の除去、縮尺計算、避ける領域を考慮した配置を自動化できるか", { x: 4.68, y: 5.01, w: 5.5, h: 0.38, fontFace: "Yu Gothic", fontSize: 16, bold: true, color: "7C2D12", align: "center", fit: "shrink", margin: 0 });
  slide.addText("過去の検討では、ビュー出力後の用紙配置を十分に制御できなかった", { x: 1.4, y: 6.18, w: 10.5, h: 0.36, fontFace: "Yu Gothic", fontSize: 14, bold: true, color: "475569", align: "center", margin: 0 });
}

function addBBoxProblemVisual(pptx, slide) {
  addTitle(pptx, slide, "実データで起きる課題", "離れた不要部品まで含めると、見せたい部品が小さくなる");

  slide.addText("モデル全体を対象", { x: 0.72, y: 1.74, w: 5.35, h: 0.35, fontFace: "Yu Gothic", fontSize: 16, bold: true, color: "B91C1C", align: "center", margin: 0 });
  slide.addShape(pptx.ShapeType.roundRect, { x: 0.72, y: 2.18, w: 5.35, h: 2.76, rectRadius: 0.05, fill: { color: "FEF2F2" }, line: { color: "FCA5A5", width: 1.3 } });
  slide.addShape(pptx.ShapeType.hexagon, { x: 1.25, y: 2.88, w: 1.5, h: 1.32, fill: { color: "BAE6FD" }, line: { color: "0369A1", width: 1.5 } });
  slide.addText("見せたい\n部品", { x: 1.56, y: 3.23, w: 0.88, h: 0.5, fontFace: "Yu Gothic", fontSize: 13, bold: true, color: "075985", align: "center", margin: 0 });
  slide.addShape(pptx.ShapeType.ellipse, { x: 5.22, y: 2.48, w: 0.38, h: 0.38, fill: { color: "FCA5A5" }, line: { color: "B91C1C", width: 1 } });
  slide.addText("離れた治具・補助部品", { x: 3.45, y: 2.42, w: 1.62, h: 0.3, fontFace: "Yu Gothic", fontSize: 10, bold: true, color: "991B1B", align: "right", margin: 0 });
  slide.addShape(pptx.ShapeType.rect, { x: 1.02, y: 2.42, w: 4.7, h: 2.18, fill: { color: "FFFFFF", transparency: 100 }, line: { color: "DC2626", width: 1.2, dash: "dash" } });
  slide.addText("全体外形に合わせるため、対象部品が小さくなる", { x: 1.1, y: 4.46, w: 4.58, h: 0.3, fontFace: "Yu Gothic", fontSize: 12, bold: true, color: "B91C1C", align: "center", margin: 0 });

  addFlowArrow(pptx, slide, 6.18, 3.2, 0.72);

  slide.addText("BBoxで見せたい範囲を指定", { x: 7.04, y: 1.74, w: 5.57, h: 0.35, fontFace: "Yu Gothic", fontSize: 16, bold: true, color: "0F766E", align: "center", margin: 0 });
  slide.addShape(pptx.ShapeType.roundRect, { x: 7.04, y: 2.18, w: 5.57, h: 2.76, rectRadius: 0.05, fill: { color: "ECFDF5" }, line: { color: "6EE7B7", width: 1.3 } });
  slide.addShape(pptx.ShapeType.hexagon, { x: 8.65, y: 2.68, w: 2.2, h: 1.72, fill: { color: "BAE6FD" }, line: { color: "0369A1", width: 1.7 } });
  slide.addText("見せたい部品", { x: 9.02, y: 3.34, w: 1.46, h: 0.32, fontFace: "Yu Gothic", fontSize: 14, bold: true, color: "075985", align: "center", margin: 0 });
  slide.addShape(pptx.ShapeType.rect, { x: 8.18, y: 2.43, w: 3.14, h: 2.18, fill: { color: "FFFFFF", transparency: 100 }, line: { color: "0F766E", width: 2, dash: "dash" } });
  slide.addText("BBox", { x: 10.67, y: 2.5, w: 0.52, h: 0.24, fontFace: "Yu Gothic", fontSize: 10, bold: true, color: "0F766E", align: "center", margin: 0 });
  slide.addText("指定範囲だけでビューと縮尺を再計算", { x: 7.55, y: 4.46, w: 4.52, h: 0.3, fontFace: "Yu Gothic", fontSize: 12, bold: true, color: "047857", align: "center", margin: 0 });

  const flow = ["BBoxで範囲指定", "範囲内だけ採用", "縮尺を再計算", "三面図を生成"];
  flow.forEach((label, index) => {
    const x = 0.88 + index * 3.08;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 5.5, w: 2.5, h: 0.68, rectRadius: 0.04, fill: { color: index === 3 ? "0F766E" : "F1F5F9" }, line: { color: index === 3 ? "0F766E" : "CBD5E1", width: 1 } });
    slide.addText(label, { x: x + 0.12, y: 5.71, w: 2.26, h: 0.25, fontFace: "Yu Gothic", fontSize: 12, bold: true, color: index === 3 ? "FFFFFF" : "334155", align: "center", fit: "shrink", margin: 0 });
    if (index < flow.length - 1) addFlowArrow(pptx, slide, x + 2.57, 5.55, 0.42);
  });
  slide.addText("PoCでは『全部のモデル』ではなく『見せたい部分だけ』を図面化できるか確認する", { x: 1.25, y: 6.42, w: 10.85, h: 0.36, fontFace: "Yu Gothic", fontSize: 15, bold: true, color: "115E59", align: "center", margin: 0 });
}

function addDrawingExample(pptx, slide) {
  addTitle(pptx, slide, "成果物イメージ", "図枠の制約を避けながら、各方向のビューを自動配置する");

  const frame = { x: 0.72, y: 1.72, w: 11.9, h: 4.72 };
  slide.addShape(pptx.ShapeType.rect, {
    ...frame,
    fill: { color: "FFFFFF", transparency: 100 },
    line: { color: "334155", width: 1.4 },
  });

  const views = [
    { label: "上面", x: 2.3, y: 2.02, w: 2.15, h: 1.15 },
    { label: "正面", x: 2.3, y: 3.45, w: 2.15, h: 1.22 },
    { label: "側面", x: 4.85, y: 3.45, w: 1.55, h: 1.22 },
    { label: "アイソメ", x: 7.15, y: 2.45, w: 2.5, h: 2.05 },
  ];

  for (const view of views) {
    slide.addText(view.label, {
      x: view.x,
      y: view.y - 0.25,
      w: view.w,
      h: 0.2,
      fontFace: "Yu Gothic",
      fontSize: 10,
      bold: true,
      color: "0F766E",
      align: "center",
      margin: 0,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: view.x,
      y: view.y,
      w: view.w,
      h: view.h,
      rectRadius: 0.04,
      fill: { color: "E2E8F0" },
      line: { color: "475569", width: 1.2 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: view.x + view.w * 0.34,
      y: view.y + view.h * 0.22,
      w: view.w * 0.32,
      h: view.h * 0.56,
      fill: { color: "FFFFFF" },
      line: { color: "475569", width: 1 },
    });
  }

  slide.addShape(pptx.ShapeType.rect, {
    x: 9.7,
    y: 5.15,
    w: 2.92,
    h: 1.29,
    fill: { color: "FEF3C7" },
    line: { color: "B45309", width: 1.2 },
  });
  slide.addText("表題欄・記入欄\n自動配置では避ける領域", {
    x: 9.9,
    y: 5.43,
    w: 2.5,
    h: 0.62,
    fontFace: "Yu Gothic",
    fontSize: 12,
    bold: true,
    color: "92400E",
    align: "center",
    valign: "mid",
    margin: 0,
  });
  slide.addText("模式図（提案内容に合わせて作成）  参考: RootPro CAD図枠テンプレート / CADの使い方備忘録 / Autodesk Support", {
    x: 0.75,
    y: 6.57,
    w: 11.4,
    h: 0.25,
    fontFace: "Yu Gothic",
    fontSize: 8,
    color: "64748B",
    margin: 0,
  });
}

function addScheduleChart(pptx, slide) {
  addTitle(pptx, slide, "初期スケジュール", "7月22日の合意後、最小表示から確認資料出力まで段階的に進める");
  const dates = ["7/22", "7/23", "7/24", "7/25", "7/26", "7/27", "7/28", "7/29", "7/30", "7/31"];
  const startX = 3.0;
  const colW = 0.91;
  const topY = 1.85;
  const rowH = 0.92;
  const tasks = [
    { label: "再提案・範囲確認", start: 0, span: 1, color: "0F766E" },
    { label: "ブラウザ3D表示", start: 1, span: 2, color: "0284C7" },
    { label: "ビュー生成・調整", start: 6, span: 2, color: "7C3AED" },
    { label: "資料出力・結果整理", start: 8, span: 2, color: "D97706" },
  ];

  dates.forEach((date, index) => {
    const holiday = index >= 3 && index <= 4;
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + index * colW,
      y: topY,
      w: colW,
      h: rowH * 4 + 0.5,
      fill: { color: holiday ? "F1F5F9" : "FFFFFF" },
      line: { color: "CBD5E1", width: 0.5 },
    });
    slide.addText(date, {
      x: startX + index * colW,
      y: topY + 0.08,
      w: colW,
      h: 0.25,
      fontFace: "Yu Gothic",
      fontSize: 10,
      bold: true,
      color: holiday ? "94A3B8" : "334155",
      align: "center",
      margin: 0,
    });
    if (holiday) {
      slide.addText("休日", {
        x: startX + index * colW,
        y: topY + 0.35,
        w: colW,
        h: 0.2,
        fontFace: "Yu Gothic",
        fontSize: 8,
        color: "94A3B8",
        align: "center",
        margin: 0,
      });
    }
  });

  tasks.forEach((task, index) => {
    const y = topY + 0.62 + index * rowH;
    slide.addText(task.label, {
      x: 0.72,
      y: y + 0.12,
      w: 2.05,
      h: 0.3,
      fontFace: "Yu Gothic",
      fontSize: 12,
      bold: true,
      color: "334155",
      align: "right",
      margin: 0,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: startX + task.start * colW + 0.08,
      y: y + 0.06,
      w: task.span * colW - 0.16,
      h: 0.48,
      rectRadius: 0.06,
      fill: { color: task.color },
      line: { color: task.color },
    });
  });

  slide.addText("7/23〜24は「準備」ではなく、最低1形式をブラウザで表示できる状態を最初の成果とする", {
    x: 0.85,
    y: 6.45,
    w: 11.45,
    h: 0.35,
    fontFace: "Yu Gothic",
    fontSize: 13,
    bold: true,
    color: "0F766E",
    align: "center",
    margin: 0,
  });
}

function addTemplateExamples(pptx, slide) {
  addTitle(pptx, slide, "図枠テンプレートの例", "表題欄の位置や用紙形式によって、ビューを置ける領域が変わる");
  const examples = [
    { file: "image1.gif", label: "右下に表題欄がある例" },
    { file: "image2.gif", label: "下部に表題欄がある例" },
    { file: "image4.gif", label: "小さな表題欄がある例" },
  ];

  examples.forEach((example, index) => {
    const x = 0.72 + index * 4.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 1.8,
      w: 3.72,
      h: 3.75,
      rectRadius: 0.05,
      fill: { color: "F8FAFC" },
      line: { color: "CBD5E1", width: 1 },
    });
    slide.addImage({
      path: path.join(proposalAssetsDir, example.file),
      x: x + 0.22,
      y: 2.15,
      w: 3.28,
      h: 2.32,
    });
    slide.addText(example.label, {
      x: x + 0.15,
      y: 4.72,
      w: 3.42,
      h: 0.38,
      fontFace: "Yu Gothic",
      fontSize: 13,
      bold: true,
      color: "334155",
      align: "center",
      margin: 0,
    });
  });

  slide.addText("PoCでは、表題欄や記入欄を固定の除外領域として扱い、残りの領域へ各ビューを配置する", {
    x: 0.9,
    y: 5.82,
    w: 11.5,
    h: 0.4,
    fontFace: "Yu Gothic",
    fontSize: 15,
    bold: true,
    color: "0F766E",
    align: "center",
    margin: 0,
  });
  slide.addText("出典: RootPro CAD サンプル図枠テンプレート（提案説明用に掲載）", {
    x: 0.78,
    y: 6.57,
    w: 8.8,
    h: 0.25,
    fontFace: "Yu Gothic",
    fontSize: 8,
    color: "64748B",
    margin: 0,
  });
}

function addFourViewExample(pptx, slide) {
  addTitle(pptx, slide, "目標とする出力例", "3Dデータから各方向のビューを作り、確認しやすい位置へ自動配置する");
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 1.75,
    w: 7.35,
    h: 4.78,
    rectRadius: 0.05,
    fill: { color: "0F172A" },
    line: { color: "334155", width: 1 },
  });
  slide.addImage({
    path: path.join(proposalAssetsDir, "image3.JPG"),
    x: 1.18,
    y: 2.02,
    w: 6.43,
    h: 4.72,
  });

  const points = [
    "正面・上面・側面・アイソメを生成する",
    "各ビューの余白を検出して取り除く",
    "配置領域に収まる縮尺を計算する",
    "表題欄などを避けて配置する",
  ];
  slide.addText(
    points.map((text) => ({ text, options: { bullet: true, breakLine: true } })),
    {
      x: 8.45,
      y: 2.12,
      w: 4.05,
      h: 3.25,
      fontFace: "Yu Gothic",
      fontSize: 17,
      color: "334155",
      fit: "shrink",
      paraSpaceAfterPt: 14,
      margin: 0.05,
    },
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.45,
    y: 5.38,
    w: 4.05,
    h: 0.86,
    rectRadius: 0.06,
    fill: { color: "CCFBF1" },
    line: { color: "5EEAD4", width: 1 },
  });
  slide.addText("配置・縮尺・余白処理の自動化が\n今回の主な検証対象", {
    x: 8.67,
    y: 5.56,
    w: 3.61,
    h: 0.48,
    fontFace: "Yu Gothic",
    fontSize: 13,
    bold: true,
    color: "115E59",
    align: "center",
    margin: 0,
  });
  slide.addText("参考: CADの使い方備忘録『3Dモデルから2D図を作図する方法』", {
    x: 0.78,
    y: 6.85,
    w: 8.5,
    h: 0.22,
    fontFace: "Yu Gothic",
    fontSize: 8,
    color: "64748B",
    margin: 0,
  });
}

async function makePptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "MyReport";
  pptx.company = "MyReport";
  pptx.subject = deckTitle;
  pptx.title = deckTitle;
  pptx.lang = "ja-JP";
  pptx.theme = {
    headFontFace: "Yu Gothic",
    bodyFontFace: "Yu Gothic",
    lang: "ja-JP",
  };

  const totalSlides = slides.length + 3;
  let pageNumber = 0;
  slides.forEach((item) => {
    const slide = pptx.addSlide();
    pageNumber += 1;
    slide.background = { color: "FFFFFF" };
    if (item.title === deckTitle) addIntroVisual(pptx, slide);
    else if (item.title === "提案目的") addPurposeVisual(pptx, slide);
    else if (item.title === "現状課題") addProblemVisual(pptx, slide);
    else if (item.title === "実データで起きる課題") addBBoxProblemVisual(pptx, slide);
    else {
      addTitle(pptx, slide, item.title, item.subtitle);
      addBullets(slide, item.bullets, item.subtitle ? 1.75 : 1.48);
    }
    addPageNumber(slide, pageNumber, totalSlides);

    if (item.title === "今回やること / やらないこと") {
      const templateSlide = pptx.addSlide();
      pageNumber += 1;
      templateSlide.background = { color: "FFFFFF" };
      addTemplateExamples(pptx, templateSlide);
      addPageNumber(templateSlide, pageNumber, totalSlides);

      const exampleSlide = pptx.addSlide();
      pageNumber += 1;
      exampleSlide.background = { color: "FFFFFF" };
      addFourViewExample(pptx, exampleSlide);
      addPageNumber(exampleSlide, pageNumber, totalSlides);
    }

    if (item.title === "初期スケジュール") {
      const scheduleSlide = pptx.addSlide();
      pageNumber += 1;
      scheduleSlide.background = { color: "FFFFFF" };
      addScheduleChart(pptx, scheduleSlide);
      addPageNumber(scheduleSlide, pageNumber, totalSlides);
    }
  });

  await pptx.writeFile({ fileName: pptxPath });
}

function bodyParagraph(text) {
  return new Paragraph({
    spacing: { after: 160, line: 320 },
    children: [new TextRun({ text, font: "Yu Gothic", size: 22 })],
  });
}

async function makeDocx() {
  const children = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: deckTitle, bold: true, font: "Yu Gothic", size: 40 })],
    }),
    bodyParagraph("3Dデータから三面図風の確認資料を自動生成できるかを1つの小規模PoCとして提案するための資料です。まず1週間で最小サンプルを作り、継続する価値を判断できる状態にします。"),
  ];

  for (const [heading, paragraphs] of docSections) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 280, after: 120 },
      children: [new TextRun({ text: heading, bold: true, font: "Yu Gothic", size: 30 })],
    }));
    for (const text of paragraphs) children.push(bodyParagraph(text));
  }

  const doc = new Document({
    creator: "MyReport",
    title: deckTitle,
    sections: [{ children }],
  });

  fs.writeFileSync(docxPath, await Packer.toBuffer(doc));
}

ensureOutDir();
await makePptx();
await makeDocx();
console.log(`created: ${path.relative(root, pptxPath)}`);
console.log(`created: ${path.relative(root, docxPath)}`);
