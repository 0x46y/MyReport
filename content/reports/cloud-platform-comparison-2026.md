---
title: "クラウドプラットフォーム比較メモ: AWS / Azure / GCP と Vercel / Cloudflare"
date: "2026-05-11"
excerpt: "三大クラウドとフロントエンド・エッジ系プラットフォームを、個人開発と実務選定の観点から整理する。"
category: "Cloud"
tags: "cloud, aws, azure, gcp, vercel, cloudflare"
---

結論から言うと、個人開発や小さな技術検証では Cloudflare や Vercel のような軽量なプラットフォームから始める方が進めやすい。一方で、企業システムでは既存基盤、権限管理、監査、移行コストを含めて AWS、Azure、GCP を選ぶ理由がある。

Web アプリケーションを作るとき、どのクラウドやデプロイ先を選ぶかは意外と大きな判断になる。単に有名だから、安そうだから、という理由だけではなく、作りたいものの規模、運用にかけられる時間、チームの技術スタック、将来の拡張性によって適した選択肢は変わる。

この記事では、自分がこれまで調べた AWS、Azure、GCP の三大クラウドと、フロントエンド寄りのデプロイ先としてよく使われる Vercel、Cloudflare を比較しながら、どう使い分けるとよさそうかを整理する。

## 無料枠は「あるか」だけでなく「使いやすいか」も見る

個人開発や技術検証では、無料枠の大きさは重要だ。ただし、無料枠は「制度として用意されているか」と「自分の用途で実際に使いやすいか」を分けて見る必要がある。

| プラットフォーム | 無料枠や初期検証の見方 | 注意点 |
| --- | --- | --- |
| AWS | 新規アカウント向けの無料枠やクレジット、Always Free のサービスが用意されている。EC2、S3、Lambda など基本サービスを試しやすい。 | サービスごとに無料条件が違い、無料枠を超えた部分は従量課金になる。権限、ネットワーク、監視まで含めると学習範囲は広い。 |
| Azure | 無料アカウントで一定量の無料サービスを試せる。Microsoft 系の業務基盤に触れるなら学習価値は高い。 | 自分が試した範囲では、無料対象の VM 系リソースを作成しようとしたときに、利用可能なリージョンや SKU が見つからず検証を進めにくいことがあった。無料枠があることと、すぐ作れることは分けて考えたい。 |
| GCP | 新規向けクレジットと、Compute Engine、Cloud Storage、BigQuery、Cloud Run などの無料枠がある。データ分析や AI の入口として試しやすい。 | 本格的に使う場合は、プロジェクト、IAM、課金、ネットワークの理解が必要になる。 |
| Vercel | Next.js をすぐ公開でき、個人プロジェクトの検証は始めやすい。 | Hobby plan は個人・非商用向けとされているため、商用や業務利用では Pro 以上を確認する必要がある。 |
| Cloudflare | Workers、Static Assets、R2、D1、Zero Trust などを小さく試しやすい。静的サイトや軽量 API の検証では無料枠が使いやすい。 | 無料枠は広いが、R2 の操作料金や Workers のリクエスト上限など、サービスごとの制限は確認する必要がある。 |

無料枠は、無料であること自体よりも、検証の手が止まりにくいかが大事だ。たとえば、無料で使える枠があっても、利用できるリージョンや SKU を探すのに時間がかかるなら、数百円から数千円を払って確実に検証できる環境を使う方が学習効率は高い場合がある。

## 三大クラウドの比較

| プラットフォーム | 強み | 向いているケース | 注意点 |
| --- | --- | --- | --- |
| AWS | サービス数と事例が多く、compute、storage、database、analytics、networking、security などを幅広く組み合わせられる。 | 大規模な業務システム、複雑な要件、先行事例や学習資料の多さを重視するプロジェクト。 | IAM、VPC、料金、監視など、最初に理解する範囲が広い。 |
| Azure | Microsoft 製品や既存の企業システムとの親和性が高い。オンプレミス、マルチクラウド、エッジを含めた運用にも強い。 | Active Directory、Microsoft 365、Windows Server、.NET などを前提にした企業システム。 | 個人開発で最初に選ぶより、既存の Microsoft 資産がある環境で強みが出やすい。 |
| GCP | Google のインフラ思想に近く、BigQuery、GKE、Vertex AI などデータ分析、機械学習、Kubernetes 周辺に強い。 | 大量データの分析、AI 活用、Kubernetes を中心にした開発基盤。 | 本格利用にはクラウド全体の設計力が必要になる。 |

AWS は総合力が高く、事例も多い。EC2、S3、RDS、Lambda など、名前を聞く機会が多い基本サービスも多く、学習教材や実務情報を探しやすい。一方で、できることが多い分だけ、最初に把握すべき範囲も広い。

Azure は Microsoft 系の環境と組み合わせると強い。企業の既存システムでは Windows、Active Directory、Microsoft 365、.NET などが前提になっていることも多く、その文脈では Azure を選ぶ理由が分かりやすい。

GCP はデータ分析や機械学習、Kubernetes 周辺に強い印象がある。BigQuery や GKE のように、Google の得意領域がサービスとして見えやすい。大量データを扱うプロジェクトや AI 活用を重視する場合は、自然に候補に入りやすい。

## Vercel と Cloudflare の比較

| プラットフォーム | 強み | 向いているケース | 注意点 |
| --- | --- | --- | --- |
| Vercel | Next.js の開発元で、Git 連携、プレビュー URL、SSR、ISR、Streaming などの体験がまとまっている。 | Next.js を使って最速でプロダクト化したい場合。チームでプレビュー環境を回したい場合。 | 高度に使うほど Vercel 前提の運用になりやすく、料金や制約の確認が必要。 |
| Cloudflare | エッジネットワーク上で Workers と Static Assets を扱える。静的配信、低レイテンシ、低コスト運用に寄せやすい。 | 静的サイト、個人サイト、軽量な API、エッジ配信を重視する構成。 | Next.js の SSR まで使う場合は OpenNext など追加の理解が必要になる。 |

Vercel は Next.js を使う場合の開発体験が非常に強い。Git に push するとプレビュー環境が作られ、フロントエンド中心の開発サイクルを回しやすい。Next.js の機能を素直に使いながら公開したい場合、まず候補に入る。

Cloudflare は、静的アセットや Worker を世界中のネットワークから配信できる点が魅力だ。今回の個人サイトでは、Next.js の static export で生成した out ディレクトリを Workers Assets として公開している。記事やポートフォリオ中心のサイトなら、まず静的に配信し、必要になったら API や D1、R2 などを追加する進め方が合っていると感じた。

## 自分が Cloudflare を選んだ理由

今回の個人サイトでは、候補として AWS、Azure、GCP、Vercel、Cloudflare を見た。そのうえで、最初の公開先として Cloudflare Workers Assets を選んだ。

採用した理由:

- Next.js の静的出力をそのまま配信できる
- Workers、R2、D1、Zero Trust などを同じ Cloudflare 側で試しやすい
- 個人サイト規模では無料枠で始めやすい
- 独自ドメインや HTTPS、CDN まわりの設定が分かりやすい
- サーバーを常時管理する必要がない

採用しなかった案:

- AWS: S3、CloudFront、Lambda などを組み合わせれば強いが、今回の静的サイト公開には構成がやや大きい
- Azure: Microsoft 系の業務基盤と組み合わせるなら有力だが、個人サイト公開の最初の一手としては少し重い
- GCP: Cloud Run や Cloud Storage は魅力的だが、今回の用途では Cloudflare の方が単純だった
- Vercel: Next.js との相性は強いが、商用利用や利用上限を考えると、個人サイトの公開先としては Cloudflare の方が自分の目的に合っていた

実際に運用してみると、記事とポートフォリオ中心の静的サイトでは Cloudflare はかなり合っていた。デプロイは Wrangler で完結し、必要になれば R2 や Workers 側に機能を足せる。一方で、複雑なバックエンド、社内ネットワーク連携、AWS の既存資産との統合が必要な場合は、Cloudflare だけで考えるのではなく AWS や Azure も候補に戻すべきだと感じている。

## 自分ならどう使い分けるか

- 複雑な業務システムや細かいインフラ制御が必要なら AWS を検討する。
- Microsoft 系の既存環境とつなぐなら Azure を検討する。
- データ分析、AI、Kubernetes を重視するなら GCP を検討する。
- Next.js の開発体験とプレビュー環境を重視するなら Vercel を検討する。
- 静的サイト、低コスト運用、エッジ配信を重視するなら Cloudflare を検討する。

結論として、クラウド選定で大事なのは、どれが一番優れているかではなく、今の要件に対して過剰でも不足でもないかだと思う。大規模で複雑なものにはメガクラウドが向いているし、個人サイトやフロントエンド中心のプロダクトには Vercel や Cloudflare の方が軽く始められることも多い。

今回のサイトは、まず記事とポートフォリオを公開することが目的だった。そのため、最初から大きなクラウド構成を組むのではなく、Next.js で静的生成し、Cloudflare Workers Assets にデプロイする構成にした。必要になった機能だけ後から足す方が、個人開発には合っていると感じている。

## 参考リンク

- [AWS Overview](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html)
- [Microsoft Azure overview](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-azure/)
- [Google Cloud overview](https://docs.cloud.google.com/docs/overview)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [AWS Free Tier](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html)
- [Azure free account services](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-free-services)
- [Google Cloud free program](https://cloud.google.com/free)
- [Vercel Pricing](https://vercel.com/pricing)
- [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
