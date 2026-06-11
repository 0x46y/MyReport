---
title: "個人開発でDBをどう選ぶか: SQLite / Prisma / Supabase / Firebase"
date: "2026-06-03"
excerpt: "ローカル検証、将来のDB移行、認証付きWebアプリ、分析用途を分けて、個人開発でDBを選ぶときの判断材料を整理する。"
category: "Database"
tags: "database, sqlite, prisma, supabase, firebase, mongodb, rds, bigquery"
---

結論から言うと、個人開発のDB選定では、最初から大きなDB構成を組むより、今の検証段階と将来の移行可能性を分けて考えた方がよい。

ローカルで軽く試すだけならSQLiteで十分なことがある。将来PostgreSQLやMySQLへ移す可能性があるなら、PrismaのようなORMを挟んで、アプリ側のDB操作をある程度そろえる選択肢もある。公開Webアプリとして認証、ストレージ、APIまでまとめて扱いたいならSupabaseやFirebaseが候補になる。

RDB、NoSQL、トランザクション、JOIN、無料枠などの用語は [開発・クラウド・CADの記事で使う用語メモ](/notes/system-development-terms) に短く整理している。NoSQLとRDBの用途ごとの違いは [NoSQLとRDBはどの条件で選ぶのか](/reports/nosql-rdb-selection-conditions) にも整理している。

## 最初に見るべきこと

DB選定では、まず次の条件を見る。

| 観点 | 確認すること |
| --- | --- |
| 検証段階 | ローカルだけか、公開するか、本番運用するか |
| データの正しさ | 少しのズレを許せるか、厳密な整合性が必要か |
| 認証 | ログイン、権限、ユーザーごとのデータ分離が必要か |
| ファイル | 画像、音声、添付ファイルを扱うか |
| 移行性 | 将来別DBへ移す可能性があるか |
| 運用 | バックアップ、監視、スリープ、課金を誰が見るか |
| 分析 | 今の状態を見るDBか、過去データを集計する基盤か |

ここを整理しないまま「有名だから」「無料だから」「JSONで扱いやすいから」で決めると、後から運用や移行で詰まりやすい。

## ローカルで軽く試すならSQLite

SQLiteは、ローカルで小さく検証するにはかなり便利だ。

サーバーを立てずにファイルベースで使えるため、開発初期の試作、CLIツール、小さなデスクトップアプリ、単体検証では扱いやすい。個人開発で「まずデータを保存して動きを見たい」段階なら、PostgreSQLやMySQLを最初から用意しなくてもよい場合がある。

向いているケース:

- ローカルで動く小さなツール
- まず画面や処理の流れを試したい段階
- データ量が小さい
- 複数人が同時に大量アクセスしない
- サーバーやクラウドDBをまだ用意したくない

注意点:

- 複数ユーザーの同時利用には向きにくい
- 本番でスケールするWebサービスとは前提が違う
- クラウドDBへ移すときに型やSQL差分が出る
- バックアップや運用方法を別途考える必要がある

SQLiteは「本番に向かない」というより、向いている範囲がはっきりしているDBだと考える。試作段階では強いが、公開Webサービスや複数人運用に進むなら、どこかで別DBへ移す判断が必要になる。

## 将来DBを変えるならPrismaを挟む選択肢がある

将来、SQLiteからPostgreSQLへ移す可能性があるなら、PrismaのようなORMを挟む選択肢がある。

Prismaは、アプリ側からDBを操作するための層を用意し、PostgreSQL、MySQL、SQLite、MongoDBなど複数のDBに対応している。最初はSQLiteで小さく試し、公開時にPostgreSQLへ切り替えるような流れを作りやすい。

ただし、Prismaを使えばDB差分が完全になくなるわけではない。

確認したいこと:

- SQLiteとPostgreSQLで使える型や制約が違わないか
- JSON、配列、全文検索などDB固有機能に依存していないか
- マイグレーションをどう管理するか
- 本番DBへ移すときに既存データをどう移行するか
- Prismaの抽象化で足りないSQLをどう扱うか

Prismaは、DBを完全に意識しなくてよくするものではなく、アプリ側のDB操作を整理し、移行時の見通しをよくするための道具として見る方がよい。

## 公開WebアプリならSupabaseが候補になる

SupabaseはPostgreSQLを中心に、認証、Storage、API、Edge Functionsなどを組み合わせて使えるサービスだ。

個人開発で公開Webアプリを作る場合、PostgreSQLを使いながら、ログインやユーザーごとのデータ管理もまとめて扱いやすい。Stripeなど外部サービスと組み合わせる場合も、ユーザー、契約、課金状態のようなデータをRDBとして扱いやすい。

向いているケース:

- PostgreSQLを使いたい
- 認証も一緒に扱いたい
- 画像や添付ファイルも扱いたい
- Webアプリとして公開したい
- RDBの整合性を使いたい
- 将来、業務寄りのデータも扱う可能性がある

注意点:

- 無料枠では使われていないプロジェクトが停止する条件がある
- 長期公開するなら有料プランの費用を見る必要がある
- 認証、データベース、Storageをまとめて使うほどSupabaseへの依存も増える
- 本番環境と開発環境をどう分けるかを考える必要がある

Supabaseにはブランチ機能もあり、Gitのブランチに近い感覚で開発用DBを分ける選択肢がある。自分はまだ本格的に使い込んだわけではないが、本番DBと開発中のDBを分けて変更を試せることは、AIエージェントやMCPと組み合わせる開発では重要になりそうだと感じている。

## 素早いプロトタイプならFirebaseも候補になる

Firebaseは、Authentication、Firestore、Storage、Hostingなどを組み合わせて、認証付きのアプリを素早く作りやすい。

Googleアカウントを持っている利用者は多いため、Googleログインを使うアプリでは入口を作りやすい。FirestoreはNoSQLのドキュメントDBなので、SNS、チャット、画像投稿、通知、ユーザーごとの設定のようなデータには向きやすい。

向いているケース:

- Googleログインを使いたい
- SNSやチャットに近いデータ構造
- リアルタイム更新を使いたい
- 仕様変更が多いプロトタイプ
- RDBの厳密なJOINより開発速度を優先する

注意点:

- ドキュメント構造を後から変えると移行が必要になる
- 読み取り回数や書き込み回数がコストに関係する
- 複雑なJOINや集計はRDBと同じ感覚では扱えない
- 業務データの整合性が重要ならRDBも検討する

Firebaseは「素早く作る」には強い。一方で、業務システムのように、注文、在庫、請求、契約、権限を厳密に扱う場合は、最初からPostgreSQLのようなRDBを候補に戻した方が説明しやすい。

## MongoDBはJSONに近い感覚で扱いやすい

MongoDBはドキュメント指向のDBで、JSONに近い形式のデータを扱いやすい。実際にはBSONという形式で保存されるが、Next.jsやJavaScript/TypeScriptに慣れている人にとっては、オブジェクトをそのまま保存するような感覚で扱いやすい。

向いているケース:

- JSONに近い構造のデータを保存したい
- 項目がユーザーや機能ごとに変わりやすい
- RDBの正規化より柔軟性を優先したい
- Node.js / Next.js から扱いやすいDBが欲しい

注意点:

- スキーマ設計を曖昧にしすぎると後から整合性を保ちにくい
- 複雑な業務ルールや厳密なトランザクションが必要ならRDBも検討する
- ドキュメントの粒度を間違えると更新や検索が難しくなる

NoSQLだから整合性がまったくない、RDBだから柔軟性がない、という単純な話ではない。Firestoreにもトランザクションはあるし、PostgreSQLにもJSONBのようなJSONを扱う機能がある。最近はRDBとNoSQLがお互いの利点に寄ってきているため、製品名よりも用途と制約を見る必要がある。

## RDSは別のDBではなく運用を任せる選択肢

Amazon RDSは、新しい種類のDBというより、PostgreSQL、MySQL、MariaDB、Oracle、SQL ServerなどのRDBをAWS上で管理しやすくするサービスだ。

自分でEC2にPostgreSQLを入れる場合、OS、DB設定、バックアップ、監視、アップデート、障害対応を自分で考える必要がある。RDSを使うと、その運用の一部をAWSに任せられる。

見るべきこと:

- どのDBエンジンを使うか
- バックアップや復旧をどうするか
- Multi-AZ構成が必要か
- インスタンスサイズと月額費用
- ストレージ、バックアップ、転送料
- 社内のAWS運用体制に合うか

RDSは便利だが、使えば自動で何も考えなくてよくなるわけではない。冗長化、バックアップ、監視を有効にすると、その分の費用と構成理解が必要になる。個人開発では少し重い場合があるが、企業システムでは運用責任を説明しやすい選択肢になる。

## データウェアハウスは業務DBとは目的が違う

BigQueryやSnowflakeのようなデータウェアハウスは、通常のアプリDBとは目的が違う。

アプリDBは、今動いているサービスの状態を正しく扱うために使う。注文を登録する、在庫を減らす、ユーザー権限を確認する、ログイン状態を管理する、といった用途だ。

一方でデータウェアハウスは、過去のデータを集めて分析するために使う。売上推移、ユーザー行動、地域別集計、月次レポート、AIや機械学習用のデータ集計などが主な用途になる。

| 用途 | 向いているもの |
| --- | --- |
| 注文を登録する | PostgreSQL、MySQL、RDSなど |
| 在庫を正確に更新する | PostgreSQL、MySQL、RDSなど |
| ユーザーごとの投稿を保存する | Firestore、MongoDB、PostgreSQLなど |
| 去年の売上を分析する | BigQuery、Snowflakeなど |
| 大量ログを集計する | BigQuery、Snowflake、分析基盤 |

つまり、データウェアハウスは本来の業務DBを置き換えるものではなく、分析用に別で持つことが多い。小さな個人開発では最初から必要ないことが多いが、ログや売上、ユーザー行動を長期的に分析したい段階では候補になる。

## 自分ならどう選ぶか

自分が個人開発で進めるなら、次の順番で考える。

| 段階 | 第一候補 | 理由 |
| --- | --- | --- |
| ローカルで試す | SQLite | セットアップが軽く、すぐ動かせる |
| 将来DB移行を見たい | Prisma + SQLite | アプリ側のDB操作を整理しやすい |
| 公開WebアプリでRDBが必要 | Supabase | PostgreSQL、認証、Storageをまとめて扱いやすい |
| SNSやチャットの試作 | Firebase / Firestore | 認証、NoSQL、リアルタイム更新を試しやすい |
| JSON中心の柔軟なデータ | MongoDB | JavaScript/TypeScriptと感覚が近い |
| 企業のAWS基盤 | RDS | 運用、バックアップ、監査を説明しやすい |
| 分析・集計 | BigQuery / Snowflake | 過去データの集計や分析に向く |

重要なのは、最初から最終形を決めきらないことだ。まずSQLiteや無料枠で小さく試し、公開する段階でSupabaseやFirebaseを検討し、業務データとして正しさが必要ならPostgreSQLやRDSに寄せる。

DB選定も、クラウド選定と同じく「何が一番有名か」ではなく、「今の用途で何を守る必要があるか」を見る方がよい。

## まとめ

個人開発のDB選定では、ローカル検証、公開、認証、データ整合性、分析用途を分けて考える必要がある。

SQLiteは軽い検証に強い。Prismaは将来のDB移行を見据えた整理に使える。SupabaseはPostgreSQLと認証をまとめて扱いやすい。FirebaseやMongoDBは柔軟なデータ構造や素早いプロトタイプに向いている。RDSはDBそのものというより、RDB運用をAWSに任せる選択肢だ。データウェアハウスは、業務DBではなく分析用の基盤として考える。

最初に動くことだけでなく、後から移行できるか、費用を説明できるか、データの正しさを守れるかを確認したい。

## 参考リンク

- [SQLite is serverless](https://sqlite.org/serverless.html)
- [Prisma supported databases](https://www.prisma.io/docs/orm/reference/supported-databases)
- [Prisma data sources](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)
- [Supabase Database documentation](https://supabase.com/docs/guides/database/overview)
- [Supabase Branching](https://supabase.com/docs/guides/deployment/branching)
- [Firebase products](https://firebase.google.com/products)
- [Cloud Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [MongoDB documents](https://www.mongodb.com/docs/current/core/document/)
- [PostgreSQL JSON types](https://www.postgresql.org/docs/current/datatype-json.html)
- [Amazon RDS documentation](https://docs.aws.amazon.com/rds/)
- [BigQuery documentation](https://cloud.google.com/bigquery/docs)
