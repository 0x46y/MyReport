---
title: "ローカルで動くことと本番環境で動くことは違う"
date: "2026-06-01"
excerpt: "Next.js、Cloudflare Workers、Vercel、Stripe Webhook などで起こりやすい、ローカル環境と本番環境の差分を整理する。"
category: "Cloud"
tags: "cloud, nextjs, cloudflare, vercel, edge-runtime, stripe, production"
---

ローカル環境で動いたことは重要だが、それだけでは本番環境で動く保証にはならない。

特に、Next.js、Cloudflare Workers、Vercel、Stripe Webhook、Edge Runtime、Node.js Runtime のように、実行環境やリクエスト処理が関係する機能では、ローカルと本番で差が出ることがある。

## なぜ差が出るのか

ローカルでは、開発用サーバー、Node.js、ローカル環境変数、手元のタイムゾーン、手元のネットワークで動いている。

一方で本番環境では、次のような条件が変わる。

- Node.js Runtime ではなく Edge Runtime や Workers runtime で動く
- 利用できる Node.js API が違う
- リクエストボディやヘッダーの扱いが違う
- 環境変数やシークレットの渡し方が違う
- タイムゾーンや時刻同期の前提が違う
- デプロイ後のURL、HTTPS、Webhook送信元が変わる
- CDNやキャッシュが間に入る
- APIのレート制限やタイムアウトが本番で効く

そのため、「ローカルでAPIが返った」「画面上では動いた」だけでは、本番での成立条件を確認したことにはならない。

## Edge Runtime と Node.js Runtime の違いを見る

VercelやCloudflare Workersのようなエッジ環境は、低レイテンシで配信しやすい一方、通常のNode.jsサーバーと完全に同じではない。

Cloudflare Workers は V8 ベースの Workers runtime で動く。Node.js 互換機能は用意されているが、Node.jsそのものを丸ごと動かす前提ではない。ファイルシステム、長時間処理、一部のNode.js API、ネイティブモジュールを前提にしたライブラリでは、動作差分を確認する必要がある。

Next.js を Vercel で動かす場合は、Next.js の開発元が提供するプラットフォーム上で動くため、新機能との相性を確認しやすい。一方で Cloudflare で Next.js のSSRまで使う場合は、OpenNext などのアダプターを使い、どの機能が対応しているかを確認する必要がある。

## Webhook は raw body と署名検証を見る

Stripe Webhook のような外部サービスからの通知では、署名検証が重要になる。

Stripe の公式ドキュメントでも、Webhook の署名検証には raw body が必要で、フレームワークがリクエストボディを加工すると検証に失敗することがあると説明されている。

これは、ローカルでJSONとして読めたから大丈夫、という話ではない。Webhookでは、受け取った文字列、ヘッダー、署名、時刻、シークレットが一致して初めて検証できる。

確認したいこと:

- raw body を加工せずに取得できるか
- `Stripe-Signature` ヘッダーをそのまま取得できるか
- 本番環境のシークレットが正しいか
- 時刻ずれやリトライ時の扱いに問題がないか
- ローカルテストと本番Webhookで同じ検証手順になっているか
- フレームワークやランタイムが自動でbodyをparseしていないか

## 実際に遭遇した例

自分の場合は、Stripe Webhook の署名検証で問題に遭遇した。

ローカル環境では処理できているように見えていたが、Cloudflare Workers 上にデプロイした後、Webhook の署名検証が通らないことがあった。原因を追うと、Webhook では JSON として整形されたデータではなく、Stripe から送られてきた raw body を使って署名検証する必要があった。

このときに重要だったのは、Stripe の設定そのものだけではなく、実行環境がリクエストボディをどう扱うかだった。フレームワークやランタイムが先に body を parse してしまうと、署名検証に必要な元の文字列と一致しなくなる可能性がある。

この問題は Cloudflare 特有というより、Webhook や署名検証を扱う際に、実行環境ごとの差分を事前に確認できていなかったことが原因だった。

この経験から、Webhook、署名検証、決済、OAuth のような処理は、ローカルで動くかだけでなく、本番相当のURL、HTTPS、ヘッダー、raw body、環境変数まで含めて早めに確認すべきだと考えるようになった。

## 早めに本番相当で確認したい処理

次のような処理は、早めに本番相当の環境で試したい。

| 処理 | なぜ本番確認が必要か |
| --- | --- |
| Stripe Webhook | raw body、署名、ヘッダー、時刻が関係する |
| OAuth / Googleログイン | リダイレクトURL、ドメイン、HTTPSが関係する |
| ファイルアップロード | サイズ制限、ストレージ、タイムアウトが関係する |
| AI API呼び出し | タイムアウト、料金、レート制限、シークレット管理が関係する |
| メール送信 | SPF、DKIM、送信ドメイン、迷惑メール判定が関係する |
| キャッシュ | CDN、ブラウザキャッシュ、再生成タイミングが関係する |
| 日付処理 | タイムゾーン、UTC、ローカル時刻が関係する |

これらは、実装そのものより、環境差分で詰まりやすい。

## PoCで確認したいこと

本番環境との差分を減らすには、PoCの段階で次を確認したい。

- ローカルだけでなく、本番相当のURLで動かす
- 無料枠ではなく、必要なら少額課金して本番に近い構成で試す
- WebhookやOAuthは本番ドメインで一度通す
- シークレット、環境変数、権限を本番と同じ考え方で管理する
- Edge Runtime と Node.js Runtime のどちらで動くか確認する
- 利用しているライブラリが本番ランタイムに対応しているか確認する
- ログを見て原因を追える状態にする

「開発環境では動いたが、本番では動かない」は、技術力だけの問題ではない。確認する環境をどこまで本番に近づけたかの問題でもある。

## まとめ

ローカルで動くことは、実装の第一段階として重要だ。しかし、Webhook、認証、Edge Runtime、キャッシュ、時刻、外部API、ファイルアップロードが絡む場合は、本番環境で同じように動くとは限らない。

技術選定では、機能があるかだけではなく、その機能が自分の本番環境で動くかを早めに確認したい。

特にVercelとCloudflareのように、同じNext.jsを扱えても実行環境や対応状況が違う場合は、公式対応、アダプター、ランタイム差分、利用ライブラリの互換性を確認する必要がある。

## 参考リンク

- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Next.js on Cloudflare Workers](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/static-assets/)
- [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/)
- [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Stripe webhook signature verification](https://docs.stripe.com/webhooks/signatures)
