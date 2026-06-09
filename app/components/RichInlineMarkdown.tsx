import type { ReactNode } from "react";

type GlossaryTerm = {
  term: string;
  description: string;
};

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Class A / Class B operations",
    description: "Cloudflare R2などで使われる操作料金の分類。書き込み系と読み取り系で料金が分かれる。",
  },
  {
    term: "アベイラビリティゾーン",
    description: "同じリージョン内にある独立した設備区画。障害に強い構成を作るときに使う。",
  },
  {
    term: "Node.js Runtime",
    description: "サーバー側でJavaScriptやTypeScriptを動かす実行環境。",
  },
  {
    term: "Edge Runtime",
    description: "ユーザーに近い場所でコードを実行するためのランタイム。Node.jsと使えるAPIが異なる場合がある。",
  },
  {
    term: "Workers runtime",
    description: "Cloudflare Workersでコードを動かす実行環境。Node.jsそのものではないため互換性確認が必要。",
  },
  {
    term: "オブジェクトストレージ",
    description: "画像、動画、音声、バックアップなどのファイルをオブジェクト単位で保存するストレージ。",
  },
  {
    term: "非機能要件",
    description: "性能、処理時間、可用性、セキュリティ、運用性など、機能そのもの以外の要件。",
  },
  {
    term: "チェックポイント",
    description: "途中まで成功した状態を保存し、失敗時にそこから再開できるようにする考え方。",
  },
  {
    term: "責任分界点",
    description: "どこまでを誰が責任を持つのかを分ける境界。",
  },
  {
    term: "データウェアハウス",
    description: "過去データを集めて分析するための基盤。通常のアプリDBとは目的が違う。",
  },
  {
    term: "トランザクション",
    description: "複数の処理をひとまとまりとして扱い、全部成功するか全部失敗するかを管理する仕組み。",
  },
  {
    term: "パラメトリック",
    description: "寸法や条件などのパラメータを変えることで形状を変更できる設計方法。",
  },
  {
    term: "依存関係",
    description: "アプリやライブラリが動くために必要な別のソフトウェア、パッケージ、サービス、設定。",
  },
  {
    term: "暗黙知",
    description: "手順書や仕様書には明文化されていないが、現場の経験や関係者の判断として共有されている知識。",
  },
  {
    term: "ベンダーロックイン",
    description: "特定の製品や事業者に強く依存し、移行や変更が難しくなる状態。",
  },
  {
    term: "ジオメトリ",
    description: "点、線、面、曲線、曲面、ソリッドなど、形そのものを表す情報。",
  },
  {
    term: "トポロジー",
    description: "点、エッジ、面、ソリッドがどのようにつながっているかを表す情報。",
  },
  {
    term: "アセンブリ",
    description: "複数の部品を組み合わせた構造。部品同士の位置関係や参照関係を持つ。",
  },
  {
    term: "フィーチャー",
    description: "穴、押し出し、面取りなど、CAD上の設計操作や形状要素の単位。",
  },
  {
    term: "Webhook",
    description: "外部サービス側から自分のアプリへイベントを通知してもらう仕組み。",
  },
  {
    term: "OAuth",
    description: "Googleログインなどで使われる、外部サービスのアカウントを使って認可する仕組み。",
  },
  {
    term: "raw body",
    description: "HTTPリクエスト本文を加工せずにそのまま扱ったもの。Webhookの署名検証で必要になることがある。",
  },
  {
    term: "README",
    description: "リポジトリの概要、使い方、セットアップ手順、注意点などを書く説明ファイル。",
  },
  {
    term: "キャッシュ",
    description: "一度取得・生成したデータや結果を保存して、次回以降に再利用する仕組み。",
  },
  {
    term: "S3互換",
    description: "Amazon S3と似たAPIで使えること。ツールを流用できる場合があるが完全同一とは限らない。",
  },
  {
    term: "リージョン",
    description: "クラウド事業者のデータセンターがある地域の単位。",
  },
  {
    term: "従量課金",
    description: "使った分だけ料金が発生する課金方式。",
  },
  {
    term: "無料枠",
    description: "一定量まで無料で使えるクラウドサービスの利用枠。条件や期間の確認が必要。",
  },
  {
    term: "egress",
    description: "クラウドやストレージから外へ出ていくデータ転送。Web配信では料金に大きく影響する。",
  },
  {
    term: "B-Rep",
    description: "境界表現。面、エッジ、頂点などの境界情報でソリッド形状を表す方法。",
  },
  {
    term: "メッシュ",
    description: "三角形や四角形などの小さな面の集まりで3D形状を表す方法。",
  },
  {
    term: "ソリッド",
    description: "中身が詰まった立体として扱える3Dデータ。",
  },
  {
    term: "NoSQL",
    description: "RDB以外のデータベースを広く指す言葉。柔軟なデータ構造を扱いやすい場合がある。",
  },
  {
    term: "PostgreSQL",
    description: "オープンソースのRDB。トランザクション、JOIN、制約、JSON型などを扱える。",
  },
  {
    term: "Supabase",
    description: "PostgreSQLを中心に、認証、Storage、APIなどを組み合わせて使えるBaaS。",
  },
  {
    term: "Firestore",
    description: "FirebaseやGoogle Cloudで使えるNoSQLのドキュメントDB。",
  },
  {
    term: "Firebase",
    description: "認証、Firestore、Storage、Hostingなどを組み合わせて使えるアプリ開発向けプラットフォーム。",
  },
  {
    term: "MongoDB",
    description: "JSONに近い形のドキュメントを扱いやすいNoSQLデータベース。",
  },
  {
    term: "BigQuery",
    description: "Google Cloudのデータウェアハウス。大量データの分析や集計に向く。",
  },
  {
    term: "Snowflake",
    description: "クラウド型のデータウェアハウス。大量データの分析やBI用途で使われる。",
  },
  {
    term: "SQLite",
    description: "サーバーを立てずにファイルベースで使える軽量なRDB。ローカル検証に向く。",
  },
  {
    term: "Prisma",
    description: "TypeScriptやJavaScriptからDBを扱いやすくするORM。",
  },
  {
    term: "RDB",
    description: "表形式のデータを関係として扱うデータベース。整合性やJOINが重要な業務データで候補になる。",
  },
  {
    term: "BaaS",
    description: "Backend as a Service。認証、DB、Storageなどのバックエンド機能をサービスとして使う考え方。",
  },
  {
    term: "ORM",
    description: "アプリのオブジェクトとDBのテーブルを対応づけて扱う仕組み。",
  },
  {
    term: "RDS",
    description: "AWSが提供するマネージドRDBサービス。PostgreSQLやMySQLなどの運用を任せやすくする。",
  },
  {
    term: "JOIN",
    description: "複数の表を関連づけて検索するSQLの機能。",
  },
  {
    term: "IAM",
    description: "誰がどのリソースに何をできるかを管理する仕組み。",
  },
  {
    term: "SDK",
    description: "特定サービスや製品を使いやすくするための開発キット。",
  },
  {
    term: "API",
    description: "ソフトウェア同士が機能やデータをやり取りするための窓口。",
  },
  {
    term: "SKU",
    description: "クラウドで提供されるリソースの種類、サイズ、プランを区別する単位。",
  },
  {
    term: "PoC",
    description: "Proof of Concept。実現可能性や制約を小さく確認する検証工程。",
  },
  {
    term: "撤退条件",
    description: "調査やPoCを続けるか、保留するか、別案へ切り替えるかを判断するための基準。",
  },
  {
    term: "ドメイン",
    description: "Webサイトの住所のようなもの。裏側のサービスを変えても同じURLを使いやすくする。",
  },
  {
    term: "DNS",
    description: "ドメイン名と接続先のサーバーやサービスを対応づける仕組み。",
  },
  {
    term: "CSV",
    description: "表形式のデータをカンマ区切りのテキストとして保存する形式。",
  },
  {
    term: "JSON",
    description: "プログラムが読み書きしやすいテキスト形式のデータ。Web APIや設定でよく使う。",
  },
  {
    term: "拡張子",
    description: "ファイル名の末尾に付く.csv、.json、.xlsxなどの文字。ファイル種類の手がかりになる。",
  },
  {
    term: "請負",
    description: "一般に成果物の完成に対して対価を支払う考え方として使われる契約類型。",
  },
  {
    term: "準委任",
    description: "一般に専門的な作業や支援を行うこと自体に対して対価を支払う考え方として使われる契約類型。",
  },
  {
    term: "保守",
    description: "公開後の不具合修正、更新、問い合わせ対応、セキュリティ対応などを行うこと。",
  },
];

const glossaryByTerm = new Map(glossaryTerms.map((item) => [item.term, item]));
const glossaryPattern = new RegExp(
  `(${glossaryTerms
    .map((item) => item.term)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|")})`,
  "g",
);

export function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.flatMap((part, partIndex) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (match) {
      const href = match[2];
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          className="font-bold text-teal-700 underline-offset-4 hover:underline"
          href={href}
          key={`link-${partIndex}-${href}`}
          rel={isExternal ? "noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {match[1]}
        </a>
      );
    }

    return renderGlossaryTerms(part, partIndex);
  });
}

function renderGlossaryTerms(text: string, partIndex: number): ReactNode[] {
  if (!text) {
    return [text];
  }

  return text.split(glossaryPattern).map((piece, pieceIndex) => {
    const glossary = glossaryByTerm.get(piece);

    if (!glossary) {
      return piece;
    }

    return (
      <span
        aria-label={`${glossary.term}: ${glossary.description}`}
        className="group relative inline-flex cursor-help items-baseline gap-0.5 rounded-sm bg-amber-50 px-1 font-bold text-teal-800 underline decoration-amber-400 decoration-dotted underline-offset-4"
        key={`glossary-${partIndex}-${pieceIndex}-${glossary.term}`}
        tabIndex={0}
        title={`${glossary.term}: ${glossary.description}`}
      >
        <span>{glossary.term}</span>
        <span className="text-[0.65em] font-black text-amber-700">?</span>
        <span
          className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-72 max-w-[min(18rem,80vw)] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm font-normal leading-6 text-slate-700 shadow-lg group-hover:block group-focus:block"
          role="tooltip"
        >
          <span className="block font-black text-slate-950">{glossary.term}</span>
          {glossary.description}
        </span>
      </span>
    );
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
