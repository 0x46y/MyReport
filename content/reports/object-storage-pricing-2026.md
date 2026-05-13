---
title: "オブジェクトストレージ料金比較メモ: S3 / R2 / GCS / Azure Blob / B2 / Wasabi"
date: "2026-05-12"
excerpt: "画像、音声、動画、AI生成物を預けるときに、保存料金だけでなく egress と操作料金まで含めて選び方を整理する。"
---

画像、音声、動画、バックアップ、AI生成物などを扱うとき、どこかにファイルを置く必要が出てくる。代表的なのは Amazon S3 だが、最近は Cloudflare R2、Backblaze B2、Wasabi、Google Cloud Storage、Azure Blob Storage など選択肢がかなり多い。

最初に結論を書くと、個人開発や Web 配信寄りの用途では Cloudflare R2 がかなり強い。一方で、企業システムや AWS 前提の業務基盤では今でも Amazon S3 が標準的な選択肢になる。保存だけを安くしたいなら Backblaze B2 や Wasabi も候補に入る。

ただし、オブジェクトストレージの料金は単純な保存料金だけでは決まらない。重要なのは、保存料金、外向き転送料金、API 操作料金、最低保存期間、クラウド連携の5つを見ることだ。

## 料金の目安

以下は 2026年5月時点で確認した公開料金をもとにした目安。リージョン、契約、ストレージ階層、無料枠、為替、税金によって実際の請求は変わる。

| サービス | 保存料金の目安 | 外向き転送 | 操作料金 | 向いている用途 |
| --- | --- | --- | --- | --- |
| Amazon S3 Standard | 約 $0.023 / GB-month | インターネット向けは有料。AWS 全体で最初の 100GB/月は無料枠あり。 | PUT / GET / LIST などで課金 | 企業システム、AWS 前提の構成、監査や権限管理が重要な用途 |
| Cloudflare R2 Standard | $0.015 / GB-month | 無料 | Class A $4.50 / 100万操作、Class B $0.36 / 100万操作 | 個人 SaaS、画像配信、音声配信、Workers と組み合わせる構成 |
| Google Cloud Storage Standard | リージョンにより変動。Standard はおおむね $0.02 台 / GB-month | 有料。転送先と地域で変動 | 操作・取得・転送で課金 | GCP の分析、AI、BigQuery、Vertex AI と組み合わせる用途 |
| Azure Blob Storage Hot | リージョンと冗長化で変動。Hot はおおむね $0.02 前後 / GB-month | 有料。転送先と地域で変動 | 読み書き操作、階層、取得で課金 | Microsoft 系システム、Azure 前提の業務基盤 |
| Backblaze B2 | $6.95 / TB-month から | 平均保存量の 3倍まで無料、それ以降は $0.01 / GB | 多くの取引が無料 | バックアップ、アーカイブ、S3互換で安く置きたい用途 |
| Wasabi | $6.99 / TB-month から | egress と API request は無料とうたっている | 無料 | 1TB 以上を長めに置くバックアップ、素材保管、アーカイブ |

この表だけ見ると Backblaze B2 や Wasabi がかなり安く見える。ただし Wasabi には Pay as You Go でも 1TB 分の最低月額課金があり、90日間の最低保存期間もある。少量の画像や個人サイト素材を置く用途では、見かけの単価だけで判断すると逆に割高になることがある。

Cloudflare R2 は保存単価だけを見ると B2 や Wasabi より高い。しかし egress が無料で、Cloudflare Workers、CDN、独自ドメイン、キャッシュと組み合わせやすい。Web で配信されるファイルを置くなら、保存料金より egress の差が効いてくる。

## 一番重要なのは egress

オブジェクトストレージで初心者が一番見落としやすいのは egress、つまり外向き通信料だ。保存料金は安く見えても、ユーザーが大量にダウンロードすると転送料金が一気に増える。

例えば、1TB のファイルを保存し、月に 10TB ダウンロードされたとする。

| サービス | 保存コストのイメージ | 10TB 配信時の転送コストの考え方 | コメント |
| --- | --- | --- | --- |
| Amazon S3 | 約 $23 / 月 | インターネット向け転送が有料。単価次第では保存料金より転送料金が圧倒的に大きくなる。 | 機能は強いが、配信量が多い場合は CloudFront や設計込みで考える必要がある。 |
| Cloudflare R2 | 約 $15 / 月 | R2 からの egress は無料 | 配信中心の個人開発ではかなり強い。 |
| Backblaze B2 | 約 $6.95 / 月 | 平均保存量の 3倍まで無料。それ以上は追加料金 | バックアップやほどほどの配信に強い。 |
| Wasabi | 約 $6.99 / 月 | egress 無料。ただし 1TB 最低課金と最低保存期間に注意 | 大きめのデータを長く置く用途に向く。 |

つまり、Web サイト、画像配信、音源配信、動画素材配信、AI生成画像の公開など、ユーザーがファイルを読む用途では egress がかなり重要になる。

逆に、バックアップのように「保存するがほとんど取り出さない」用途なら、保存単価や最低保存期間の方が重要になる。

## Amazon S3 の立ち位置

Amazon S3 は今でもオブジェクトストレージの標準だと思う。S3 API を基準にした互換サービスも多く、S3 の考え方を知っておくと他のストレージにも応用しやすい。

S3 の強みは、単なるファイル置き場ではなく、AWS 全体と深くつながっていることだ。

- IAM による細かい権限管理
- CloudFront との連携
- Lambda、Athena、Glue、Redshift などとの連携
- ライフサイクル管理
- バージョニング
- 監査、ログ、暗号化、レプリケーション
- Glacier 系の低頻度アクセス・アーカイブ階層

企業システムでは、単価だけでなく運用、権限、監査、既存システムとの連携が重要になる。そのため、多少高くても S3 を選ぶ理由がある。

一方で、個人開発で画像や音声を配信したいだけなら、S3 は少し重い選択になることがある。保存料金よりも、ダウンロード量に対する転送料金の方が怖い。

## Cloudflare R2 の立ち位置

Cloudflare R2 の一番大きな特徴は、egress が無料であることだ。公式料金でも Standard storage は $0.015 / GB-month、Class A / B 操作料金はあるが、外向き転送は無料とされている。

これは、個人開発や Web 配信にはかなり大きい。たとえば以下のような用途は R2 と相性がよい。

- ユーザーが見る画像
- 音声ファイル
- MIDI や譜面データ
- AI生成画像
- 静的ファイル
- 個人 SaaS の添付ファイル
- Cloudflare Workers から読むファイル

今回のように Next.js と Cloudflare Workers でサイトを公開している場合、R2 を同じ Cloudflare 側に置けるのも分かりやすい。Workers から R2 を読み、必要なら Cache や CDN と組み合わせて配信できる。

ただし R2 が常に S3 の完全上位互換というわけではない。高度な監査、細かい IAM、巨大な企業運用、周辺サービスとの統合では S3 の方が成熟している。R2 は Cloudflare のエッジ思想に寄ったストレージなので、Workers や Cloudflare 全体と組み合わせて価値が出やすい。

## Backblaze B2 と Wasabi

Backblaze B2 と Wasabi は、保存コストを抑えたいときに候補になる。

Backblaze B2 は $6.95 / TB-month からで、平均保存量の 3倍まで egress が無料、それを超える分は $0.01 / GB とされている。S3互換 API も使えるので、バックアップ、アーカイブ、メディア素材の保管には使いやすい。

Wasabi は $6.99 / TB-month からで、egress や API request に追加料金がないことを強く打ち出している。ただし、1TB の最低月額課金と、Pay as You Go で 90日間の最低保存期間がある。少量のファイルを頻繁に入れ替える用途より、ある程度まとまったデータを長く置く用途に向いている。

## Google Cloud Storage と Azure Blob Storage

Google Cloud Storage と Azure Blob Storage は、単体の安さだけで選ぶというより、それぞれのクラウドを使う理由があるときに選ぶものだと思う。

GCS は BigQuery、Vertex AI、GKE など GCP のデータ分析・AI・コンテナ基盤と組み合わせると強い。データレイクや機械学習パイプラインの入口として使うなら自然な選択肢になる。

Azure Blob Storage は Microsoft 系の業務基盤と相性がよい。Microsoft Entra ID、Azure Functions、Synapse、Microsoft 365、Windows 系の既存システムとつながる場面では選びやすい。

個人開発で「安く画像を配信したい」だけなら R2 や B2 の方が分かりやすいことが多い。ただし、すでに GCP や Azure を使っているなら、ストレージも同じクラウドに寄せるメリットはある。

## 自分ならどう選ぶか

自分の用途で考えると、今のところ一番現実的なのは Cloudflare R2 だと思う。理由は、Cloudflare Workers、Next.js、静的サイト、画像や音声の配信と相性がよいからだ。

もし個人 SaaS や創作系サービスで、ユーザーに画像、音源、MIDI、AI生成物を配信するなら、まず R2 を検討する。大量に読まれる可能性があるファイルでは、egress 無料の価値が大きい。

用途ごとの選び方は、ざっくり次のようになる。

| 用途 | 第一候補 | 理由 |
| --- | --- | --- |
| 個人サイトの画像・添付ファイル | Cloudflare R2 | Workers / CDN と近く、egress 無料が効く |
| 個人 SaaS のユーザー生成ファイル | Cloudflare R2 | 配信コストを読みやすくできる |
| AWS 前提の企業システム | Amazon S3 | IAM、監査、周辺サービス連携が強い |
| バックアップ・アーカイブ | Backblaze B2 / Wasabi | 保存単価が低く、長期保管に向く |
| AI / データ分析パイプライン | Google Cloud Storage | BigQuery、Vertex AI、GKE と組み合わせやすい |
| Microsoft 系の業務システム | Azure Blob Storage | Azure / Microsoft 製品との連携が強い |

## まとめ

オブジェクトストレージは、保存料金だけで比較すると判断を間違えやすい。特に Web 配信では egress が効く。S3 は標準で強いが、配信量が増えると転送料金を意識する必要がある。R2 は保存単価だけなら最安ではないが、egress 無料と Cloudflare 連携が大きい。

個人開発、Next.js、Cloudflare Workers、画像・音声・AI生成物の配信という文脈では、まず Cloudflare R2 を候補にするのが自然だと思う。企業案件や AWS 前提のシステムなら S3、保存特化なら Backblaze B2 や Wasabi、GCP / Azure のサービスと深く組み合わせるなら GCS や Azure Blob Storage を選ぶ、という整理が現実的だ。

## 参考リンク

- [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [Cloudflare R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [Google Cloud Storage Pricing](https://cloud.google.com/storage/pricing)
- [Azure Blob Storage Pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/)
- [Backblaze B2 Pricing](https://www.backblaze.com/cloud-storage/pricing)
- [Wasabi Pricing](https://wasabi.com/pricing)
- [Wasabi Pricing FAQ](https://wasabi.com/pricing/faq)
