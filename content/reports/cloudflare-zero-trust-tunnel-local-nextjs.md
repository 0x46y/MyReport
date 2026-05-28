---
title: "Cloudflare Zero Trust と Tunnel でローカルアプリを安全に公開する"
date: "2026-05-19"
excerpt: "Next.js などのローカル開発アプリを、クラウドにデプロイせず Cloudflare 経由で一時公開する方法と、Access / Workers / Tunnel の役割を整理する。"
category: "Cloudflare"
tags: "cloudflare, zero-trust, tunnel, access, nextjs, local-dev, workers"
---

Cloudflare Workers に Next.js アプリをデプロイして公開する方法は便利だが、毎回クラウドに上げるほどではない場面もある。

例えば、ローカルで `bun run dev` や `npm run dev` を実行している Next.js アプリを、少しだけ他の人に見せたい場合がある。上司やチームメンバーに進捗を見てもらいたい、スマートフォンから動作確認したい、まだ本番デプロイ前の画面を一時的に共有したい、という場面である。

このときに使える選択肢の一つが Cloudflare Tunnel である。さらに Cloudflare Access を組み合わせると、URLを知っている人なら誰でも見られる状態ではなく、特定のメールアドレスや認証済みユーザーだけがアクセスできる状態にできる。

今回は、Cloudflare Zero Trust、Access、Workers、Tunnel の違いを整理しながら、ローカルで動いている Next.js アプリを Cloudflare 経由で公開する考え方をまとめる。

## ゼロトラストとは何か

ゼロトラストは、簡単に言えば「社内ネットワークだから安全」「外部ネットワークだから危険」といった境界だけで信用しない考え方である。

昔は、社内LANの内側にいるユーザーや端末はある程度信用し、外部からのアクセスを強く制限する考え方が多かった。しかし今は、リモートワーク、クラウドサービス、個人端末、SaaS、外部委託などが増え、内側と外側の境界がはっきりしにくい。

そのため、ゼロトラストでは次のような観点で確認する。

- 誰がアクセスしているか
- どの端末からアクセスしているか
- どのアプリにアクセスしようとしているか
- どの条件なら許可するか
- 許可した後に何をどこまで使わせるか
- アクセス履歴を後から追えるか

つまり、ゼロトラストは「何も信用しない」というより、「場所だけで信用せず、毎回条件を確認する」という考え方に近い。

## Cloudflare Access でできること

Cloudflare Access は、Webアプリや内部ツールの前段に置く認証・認可の仕組みである。

例えば、公開URLにアクセスしたときに、いきなりアプリ画面を見せるのではなく、先に Cloudflare 側のログイン画面を通す。そこで特定のメールアドレス、メールドメイン、Googleログイン、GitHubログイン、ワンタイムPINなどの条件を満たしたユーザーだけをアプリに通す。

今回のように「特定のメールアドレスを持つ人だけが自分のWebアプリにアクセスできる」状態を作れたなら、それは Cloudflare Access の入口としてかなり良い。

ただし、それだけでゼロトラストを完全にマスターしたとは言いにくい。できているのは、主に「誰がアプリに到達してよいか」を制御する部分である。

次に理解できるとよいのは、次の領域である。

- メールアドレスだけでなく、GoogleやGitHubなどのIdP連携を理解する
- MFAやワンタイムPINを使った認証を理解する
- アプリごとに許可ユーザーを分ける
- 管理画面と閲覧画面でポリシーを分ける
- ログを見て誰がいつアクセスしたか確認する
- 端末条件やWARP接続など、より細かい条件を扱う
- Cloudflare側だけでなく、アプリやDB側も最小権限にする

Access はゼロトラストの重要な入口だが、ゼロトラスト全体では「認証した後に何を許すか」「突破されたときに被害を広げないか」まで考える必要がある。

## Workers と Tunnel の違い

Cloudflare 周りで混乱しやすいのが、Workers と Tunnel の違いである。

Cloudflare Workers は、Cloudflare のエッジ上で JavaScript / TypeScript のコードを実行する仕組みである。自分のアプリそのものが Cloudflare 側で動く。

一方、Cloudflare Tunnel は、自宅PC、社内PC、VPS、AWS上のサーバーなど、別の場所で動いているアプリへ Cloudflare 経由で接続する仕組みである。アプリ本体は Cloudflare 上ではなく、自分のPCやサーバー上で動いている。

| 項目 | Cloudflare Workers | Cloudflare Tunnel |
| --- | --- | --- |
| アプリが動く場所 | Cloudflare のエッジ | 自宅PC、社内PC、VPS、AWSなど |
| 主な用途 | 本番公開、軽量API、静的サイト、Next.js公開 | ローカル開発環境、社内ツール、自宅サーバー、ComfyUIなどの公開 |
| 必要なもの | Workers向けのデプロイ | `cloudflared` の接続 |
| ポート開放 | 不要 | 不要 |
| ローカル `localhost:3000` の共有 | 直接はしない | 得意 |

自分の Next.js アプリを Cloudflare Workers にデプロイしている場合は、Workers がアプリ本体である。

一方で、ローカルPCで `localhost:3000` として起動している Next.js アプリを外から見せたい場合は、Tunnel が向いている。

## Cloudflare Tunnel とは何か

Cloudflare Tunnel は、ローカルやプライベートネットワーク内のサービスを、Cloudflare 経由で外部に公開する仕組みである。

普通に自宅PCのアプリを外部公開しようとすると、ルーターのポート開放、グローバルIP、ファイアウォール設定、DNS設定などを考える必要がある。

Cloudflare Tunnel では、ローカル側で `cloudflared` というクライアントを起動し、Cloudflare に対して外向きの接続を張る。外部ユーザーは Cloudflare のURLにアクセスし、Cloudflare がその通信をローカルアプリへ中継する。

イメージは次のようになる。

```text
ユーザー
  ↓
Cloudflare
  ↓
cloudflared
  ↓
localhost:3000 の Next.js アプリ
```

重要なのは、ローカルPC側でインターネットから直接アクセスされるポートを開けなくてよい点である。

つまり、Tunnel は単なるポートフォワーディングというより、Cloudflare を入口にした安全な中継に近い。

## Quick Tunnel でローカル Next.js を一時公開する

手っ取り早く試すだけなら、Quick Tunnel が使える。

例えば、Next.js をローカルで起動する。

```text
bun run dev
```

通常は次のようなURLで起動する。

```text
http://localhost:3000
```

この状態で、別のターミナルから次のように実行する。

```text
cloudflared tunnel --url http://localhost:3000
```

すると、`https://xxxxx.trycloudflare.com` のような一時URLが発行される。このURLにアクセスすると、実際には自分のPC上で起動している `localhost:3000` のアプリへ到達する。

これは、まだ本番デプロイする前の画面を一時的に共有したいときにかなり便利である。

ただし、Quick Tunnel はあくまで一時共有向けである。URLはランダムで、継続運用や本番公開には向かない。長く使うなら、Cloudflare アカウント上で名前付きの Tunnel を作り、自分のドメインやサブドメインに紐づける方がよい。

## Access と Tunnel を組み合わせる

Tunnel だけでもローカルアプリを外部公開できる。しかし、そのままだとURLを知っている人がアクセスできてしまう可能性がある。

そこで Cloudflare Access を組み合わせる。

例えば、次のような構成にできる。

```text
ユーザー
  ↓
Cloudflare Access
  ↓
Cloudflare Tunnel
  ↓
localhost:3000 の Next.js アプリ
```

これにより、次のような制御ができる。

- 自分のメールアドレスだけ許可する
- 会社のメールドメインだけ許可する
- Googleログイン済みユーザーだけ許可する
- ワンタイムPINを通った人だけ許可する
- 管理画面だけ自分専用にする

つまり、ローカルで動いているアプリをクラウドにデプロイしなくても、Cloudflare 経由で認証付き公開できる。

これは個人開発や小規模な社内ツールではかなり便利である。

## Workers と Tunnel の使い分け

Workers と Tunnel は、どちらが上位というものではなく、用途が違う。

本番公開する静的サイトや軽量なWebアプリなら Workers が向いている。今回の個人サイトのように、Next.js をビルドして Cloudflare Workers にデプロイする構成は、公開先として安定している。

一方で、ローカルで動いているアプリや、自宅PCのGPUを使うアプリ、社内ネットワーク内の管理画面などは Tunnel が向いている。

| 用途 | 向いている選択肢 |
| --- | --- |
| 個人サイトを本番公開する | Workers |
| Next.js アプリを正式に公開する | Workers |
| 開発中の `localhost:3000` を一時共有する | Tunnel |
| ComfyUI や Ollama を外から確認する | Tunnel |
| 社内ツールをVPNなしで見せる | Tunnel + Access |
| 認証付きで管理画面を守る | Access |

つまり、デプロイ済みのWebアプリは Workers、手元や社内にあるアプリへの安全な通路は Tunnel、と考えると分かりやすい。

## 無料枠と料金感

Cloudflare の強いところは、個人開発や小規模な検証なら無料枠だけでかなり試せる点である。

2026年5月時点の公式料金を見ると、Cloudflare Zero Trust の Free プランは50ユーザーまで利用できる。Pay-as-you-go は $7/user/month で、より大きいチームや業務向けの利用に進む場合の選択肢になる。

個人開発で「自分だけ」「数人だけ」「staging環境だけ」を守る用途なら、Access や Tunnel は無料枠で足りることが多いと考えられる。

| 機能 | 無料枠の感覚 | 注意点 |
| --- | --- | --- |
| Cloudflare Tunnel | 個人検証ではかなり使いやすい | 本格運用ではドメイン、ログ、運用設計を考える |
| Cloudflare Access | Zero Trust Free で50ユーザーまで | 企業利用ではログ保持やサポート要件を確認する |
| Workers | Free で 100,000 requests/day | 超過や重い処理は有料プランを検討する |
| CDN | Free プランでも利用可能 | 高度な制御やビジネス要件では有料機能が必要 |
| HTTPS | Universal SSL を利用可能 | 独自ドメイン自体の取得費用は別 |
| DDoS保護 | Free プランにも含まれる | 高度なSLAやサポートは上位プラン |
| WAF | Free Managed Ruleset など一部利用可能 | 高度なルールや管理は有料プラン |
| R2 | 10 GB-month、Class A 100万回、Class B 1000万回まで無料 | Egress は無料だが、操作回数には課金がある |

Tunnel だけを見れば、`localhost:3000` を Cloudflare 経由で一時公開するような使い方はかなり始めやすい。Access を付けても、小規模なら50ユーザーの無料枠内に収まることが多い。

Workers も個人サイトや小規模APIとは相性がよい。公式料金では Free プランに 100,000 requests/day があり、静的アセットへのリクエストは無料かつ無制限と説明されている。今回のような個人サイトや検証用アプリでは、最初は無料枠で十分なことが多い。

ただし、「Cloudflare は全部無料」と考えるのは危ない。課金されやすいポイントは別にある。

- Workers の大量実行
- Workers の CPU 使用量
- R2 の保存容量
- R2 の Class A / Class B 操作回数
- Cloudflare Images / Stream などの画像・動画系サービス
- Workers AI などのAI推論
- 高度なWAFやBot対策
- Zero Trust の50ユーザー超過や業務向けサポート
- 独自ドメインの取得費用

特に R2 は「Egress が無料」という点が強いが、保存容量と操作回数には料金がある。画像やファイルを大量に配信する場合、データ転送料だけでなく、読み取り回数である Class B operations も見る必要がある。

個人開発でありがちな構成は、次のようになる。

```text
Cloudflare Free / Free Tier
  ├─ Workers
  ├─ Access
  ├─ Tunnel
  ├─ DNS
  ├─ SSL
  ├─ CDN
  └─ 必要に応じて R2
```

この構成は、個人サイト、staging環境、小規模なWebアプリ、自宅AIツールの確認にはかなり相性がよい。

一方で、Cloudflare だけで何でもやるのは向いていない。Workers は軽量・短時間・エッジ実行に強いが、CUDA を使う重いAI推論、長時間のPython処理、ffmpegの重処理、大きなバッチ処理には向かない。

そのため、現実的には次のような分担がよいと感じる。

| 役割 | 向いている環境 |
| --- | --- |
| 認証、CDN、HTTPS、軽量API | Cloudflare |
| Next.js の個人サイト公開 | Cloudflare Workers |
| ローカル開発環境や自宅AIの一時共有 | Cloudflare Tunnel |
| 画像やファイル保存 | Cloudflare R2 |
| GPU、Python、重いAI処理 | GCP / AWS / ローカルGPU |

つまり、Cloudflare はフロント、認証、公開経路、エッジ処理に強い。重いAI処理やGPU処理は、GCP、AWS、ローカルGPUなどに分ける方が自然である。

個人開発としては、まず Cloudflare の無料枠で始め、必要になったところだけ R2、Workers Paid、AI推論、外部クラウドを検討するのが現実的だと感じた。

## AWS Security Group との違い

AWS の Security Group は、EC2 などのリソースに対して通信を許可・拒否する仮想ファイアウォールである。

例えば、特定のIPからだけSSHを許可する、Webサーバーの80番や443番だけを開ける、といった制御を行う。

一方、Cloudflare Access + Tunnel は、ユーザー認証を前段に置き、Cloudflare 経由でアプリへ到達させる仕組みである。

| 観点 | AWS Security Group | Cloudflare Access + Tunnel |
| --- | --- | --- |
| 主な制御対象 | IP、ポート、通信元 | ユーザー、認証、アプリ到達 |
| 置かれる場所 | AWSリソース側 | Cloudflare側 |
| 得意なこと | ネットワーク単位の制御 | アプリ単位の認証付きアクセス |
| 補完関係 | サーバー側の防御 | 入口側の認証・中継 |

理想はどちらか一方ではなく、両方を組み合わせることだ。

Cloudflare Access でユーザーを確認し、Tunnel でサーバーを直接公開せず、AWS側では Security Group や IAM で最小権限にする。これができると、入口だけでなく奥側も守りやすくなる。

## 自分の理解の現在地

特定メールアドレスだけが Cloudflare Access を通ってWebアプリへアクセスできる状態を作れたなら、ゼロトラストの入口としてはかなり良い。

ただし、正確には「ゼロトラストをマスターした」というより、「Cloudflare Access によるアプリ単位の認証制御を実装できた」と言う方が近い。

次にできると理解が深まるのは、次のあたりである。

- Quick Tunnel で `localhost:3000` を一時公開する
- 名前付き Tunnel を作って自分のサブドメインに紐づける
- Tunnel の前段に Access を設定する
- メールアドレス、メールドメイン、IdPごとにポリシーを分ける
- Access のログを見てアクセス履歴を確認する
- 管理画面と通常画面でポリシーを分ける
- AWSやDB側でも直接公開しない構成を意識する

このあたりまでできると、単に「ログインを付けた」だけではなく、Cloudflare を使った安全な公開経路をかなり理解できていると言いやすい。

## まとめ

Cloudflare Zero Trust は、「特定メールアドレスだけを通す」だけで終わるものではない。しかし、それはかなり良い入口である。

Cloudflare Access は、アプリに入る前の認証・認可を担当する。Workers は、Cloudflare 上でアプリやAPIを動かす。Tunnel は、ローカルPCや社内サーバーで動いているアプリを、ポート開放なしで Cloudflare 経由公開する。

この3つを分けて考えると、役割が整理しやすい。

```text
本番公開したいアプリ
  → Workers

ローカルや社内のアプリを外から見たい
  → Tunnel

誰がアクセスできるか制御したい
  → Access
```

個人開発では、Next.js などをローカルで起動し、`cloudflared tunnel --url http://localhost:3000` で一時公開するだけでもかなり便利である。そこに Access を付ければ、特定の人だけが見られる検証環境も作れる。

本番公開は Workers、開発中の共有は Tunnel、アクセス制御は Access。まずはこの使い分けを理解しておくと、Cloudflare を使った個人開発や小規模運用の幅がかなり広がる。

参考:

- [Cloudflare Tunnel setup](https://developers.cloudflare.com/tunnel/setup/)
- [Cloudflare Tunnel routing](https://developers.cloudflare.com/tunnel/routing/)
- [Quick Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/)
- [Cloudflare Access policies](https://developers.cloudflare.com/cloudflare-one/policies/access/)
- [Cloudflare pricing](https://www.cloudflare.com/plans/)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
