---
title: "自分のアプリにAIを組み込むなら Codex か OpenAI API か"
date: "2026-05-13"
excerpt: "Codex App Server、Codex SDK、codex exec、Responses API、Agents SDK、ChatKit の違いを、Next.js の自作アプリに組み込む観点で整理する。"
category: "OpenAI / AI"
tags: "openai, codex, ai, nextjs, sdk"
---

自分の Next.js アプリに AI 機能を入れたいと考えたとき、選択肢がいくつか出てくる。Codex App Server、Codex SDK、codex exec、Responses API、Agents SDK、ChatKit、Realtime API などだ。

名前だけ見るとどれも「AI を組み込むためのもの」に見えるが、実際にはかなり役割が違う。特に Codex 系は、一般的なチャット AI や要約機能というより「コーディングエージェントを自分の環境やUIから動かす」ための選択肢だ。

結論から言うと、自分の Web アプリに一般的な AI 機能を入れるなら、まずは OpenAI API の Responses API を Next.js の Route Handler 経由で呼ぶのが一番分かりやすい。Codex を選ぶのは、AI にコードベースを読ませたり、ファイルを編集させたり、テストを実行させたりする「開発支援エージェント」を作りたい場合だ。

## まず分けるべき2種類のAI

最初に整理した方がよいのは、作りたい AI がどちらなのかだ。

| 作りたいもの | 第一候補 | 理由 |
| --- | --- | --- |
| チャット、要約、分類、検索、文章生成、フォーム補助 | Responses API | 自分のアプリのバックエンドから呼びやすく、テキスト、画像入力、ツール呼び出し、状態管理に対応しやすい |
| 複数ステップの業務フロー、ツール実行、承認つきエージェント | Agents SDK | エージェントの流れ、ツール、状態、ガードレールをアプリ側で設計しやすい |
| チャットUIを早く載せたい | ChatKit | チャットUIを自作しなくても、埋め込み型の体験を作りやすい |
| 音声会話や低遅延の対話 | Realtime API | WebRTC や WebSocket で音声・リアルタイム対話を扱える |
| コードを書く、直す、レビューする、テストを動かすAI | Codex | コードベース、ファイル編集、シェル実行、承認フローを含むコーディングエージェントに向いている |

自分の Web アプリに「AIっぽい機能」を入れたいだけなら、Codex から始める必要はない。たとえば、ユーザーの入力を要約する、記事タイトルを提案する、質問に答える、データを分類する、フォーム入力を補助する、といった用途なら Responses API が自然だ。

一方で、ユーザーが GitHub リポジトリやローカルプロジェクトを開き、「このバグを直して」「テストを書いて」「PR をレビューして」と頼むようなアプリを作りたいなら Codex 系が候補になる。

## Codex App Server / SDK / exec の違い

Codex 系の選択肢は、ざっくり次のように分けられる。

| 選択肢 | 向いている用途 | 強み | 注意点 |
| --- | --- | --- | --- |
| Codex App Server | 独自UI、IDE、デスクトップアプリ、リッチな Codex クライアント | Codex のイベント、承認、スレッド、差分、ストリーミングを UI に流し込みやすい | JSON-RPC クライアントを作る必要があり、統合は軽くない |
| Codex SDK | サーバー側ツールや内部ツールからローカル Codex エージェントを制御 | TypeScript のライブラリとして扱えるので、JSON-RPC を直接書くより始めやすい | App Server より対応言語や surface が狭いと説明されている |
| codex exec | CI、cron、スクリプト、単発の自動化 | 1コマンドで非対話実行でき、ログや終了コードをパイプラインに組み込みやすい | 独自UIの土台としては弱い |

OpenAI の App Server 解説では、Codex の Web、CLI、IDE 拡張、デスクトップアプリなどは同じ Codex harness に支えられており、App Server はその harness を UI フレンドリーな JSON-RPC イベントとして扱うためのものだと説明されている。つまり App Server は「Codex を自分の UI に載せたい」ときの本命に近い。

ただし、App Server は簡単な REST API ではない。ターン、スレッド、アイテム、承認、差分、ストリーミングイベントを扱う必要がある。自分で Web UI を作るなら魅力的だが、最初の実験としては少し重い。

Codex SDK は、アプリ側からローカル Codex エージェントをプログラム的に動かしたいときに向いている。TypeScript でバックエンドや内部ツールを作っているなら、App Server の JSON-RPC を直接扱うより始めやすい。ただし、公式の App Server 解説では SDK は App Server より先に出たため、対応言語や surface は小さめだと説明されている。

codex exec は一番シンプルだ。たとえば CI で「テストを実行して、失敗したら修正案を出す」「差分をレビューする」「TODO を洗い出す」といった一発実行に向いている。独自 Web UI の裏側に無理やり使うこともできなくはないが、UI としてのイベント表現や承認フローを丁寧に作りたいなら App Server や SDK の方が自然だ。

## 性能差として見るべきではない

「App Server は月額課金に含まれるが、SDK や exec より性能が低いのではないか」という見方は、少なくとも公式情報だけからは断定しにくい。

公式の整理では、App Server、SDK、exec の違いは主にプロトコル、組み込み方、UI との相性、実行形態の違いだ。App Server は Codex harness のフル機能を UI 向けイベントとして扱うためのもの、SDK はプログラムからローカル Codex を制御するもの、exec は非対話の一発実行に向いたもの、という理解の方が安全だと思う。

モデルや品質の話は、どのモデルを使うか、どの認証経路を使うか、どの環境で動かすかによって変わる。App Server だから低性能、SDK だから高性能、と単純に見るのは危ない。

## 課金の考え方

ここも混同しやすい。Codex と OpenAI API は、使い方によって課金の見え方が変わる。

| 使い方 | 課金・認証の考え方 |
| --- | --- |
| ChatGPT 上の Codex / Codex cloud | ChatGPT の対象プランに含まれる範囲がある。公式 docs でも Codex cloud は Plus、Pro、Business、Edu、Enterprise などのプランに含まれると説明されている |
| Codex CLI の ChatGPT sign-in | ChatGPT アカウントでサインインして使う導線がある。API key を手で扱わずに使えるケースがある |
| OpenAI API key を使う実装 | Platform API の従量課金として考える。モデルごとの input / output token 料金を見る |
| Responses API / Agents SDK / ChatKit / Realtime API | 基本的には OpenAI API の利用として、モデルやツール、音声、検索などの料金を見る |

つまり「App Server だけ月額に含まれて、SDK / exec は必ず別課金」とは言い切らない方がよい。実際には、ChatGPT の Codex 機能として使うのか、API key を使って Platform API として使うのかで整理する必要がある。

自分の Next.js アプリに AI を組み込む場合は、最初は API key をサーバー側に置いて Responses API を呼ぶ構成になることが多い。その場合は ChatGPT の月額プランとは別に、OpenAI Platform の従量課金として考えるのが自然だ。

## Next.js の自作アプリなら何から始めるか

自分の Next.js アプリに AI 機能を入れるなら、最初のおすすめは次の構成だ。

| 段階 | 選択肢 | 内容 |
| --- | --- | --- |
| Step 1 | Responses API + Next.js Route Handler | `app/api/ai/route.ts` を作り、サーバー側で OpenAI API を呼ぶ |
| Step 2 | Function calling / tools | アプリ内のデータ取得や処理を AI から呼べるようにする |
| Step 3 | Agents SDK | 複数ステップの判断、承認、状態管理が必要になったら導入する |
| Step 4 | ChatKit | チャットUIを速く作りたい、または埋め込みUIを使いたい場合に検討する |
| Step 5 | Realtime API | 音声会話、低遅延の対話、リアルタイム字幕が必要になったら検討する |

この順番にすると、最初から大きなエージェント基盤を作らずに済む。まずはローカルで Next.js を起動し、API route から Responses API を呼ぶ。UI は普通の React コンポーネントで作る。これだけで「自分のアプリに AI を組み込む」最初の体験は作れる。

API key はブラウザに出してはいけない。Next.js なら Client Component から直接 OpenAI API を叩くのではなく、Route Handler や Server Action を通す。`.env.local` に `OPENAI_API_KEY` を置き、サーバー側だけで読む形にする。

## Codex を使うならどんなアプリか

Codex が向いているのは、普通のチャットボットではなく「コードに対して作業するアプリ」だ。

たとえば次のようなものなら Codex を検討する価値がある。

- GitHub リポジトリを読んで修正案を出すレビュー支援ツール
- ローカルプロジェクトに対してテスト追加やリファクタを行う開発支援UI
- 社内のコードベースに対する質問応答と修正提案
- CI で失敗したテストを読み、原因と修正案を出す自動化
- IDE やデスクトップアプリに組み込むコーディングエージェント

この場合、独自 UI に組み込むなら App Server が本命に近い。バックエンドや内部ツールで使うなら SDK、CI やスクリプトなら codex exec が向いている。

## 自分の場合の現実的な結論

自分の Next.js アプリに「AI 機能」を組み込みたい、という目的なら、まず Codex ではなく Responses API から始めるのがよいと思う。

理由はシンプルで、最初に作りたいものがチャット、要約、記事作成補助、検索、分類、フォーム補助のような機能なら、コーディングエージェントの harness までは必要ないからだ。Next.js の API route に OpenAI SDK を入れ、ローカルで試すところから始めるのが一番軽い。

一方で、「自分のアプリ上で Codex みたいな開発エージェントを動かしたい」という話なら、次の順番で考える。

| 目的 | 選ぶもの |
| --- | --- |
| Web UI やデスクトップUIに Codex の進捗、承認、差分を出したい | Codex App Server |
| サーバー側 TypeScript からローカル Codex を制御したい | Codex SDK |
| CI や cron で一発実行したい | codex exec |
| 一般的な AI 機能をアプリに入れたい | Responses API |
| AI が複数ツールを使う業務フローを作りたい | Agents SDK |
| チャットUIを早く載せたい | ChatKit |

最初の実験としては、Next.js ローカル環境で Responses API を呼ぶ小さなページを作るのがよい。その後、AI に自分のファイルや GitHub リポジトリを扱わせたい段階になってから、Codex App Server や SDK を調べる方が無駄が少ない。

## 参考リンク

- [Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/)
- [Codex cloud](https://developers.openai.com/codex/cloud)
- [OpenAI Models](https://developers.openai.com/api/docs/models)
- [Responses API reference](https://platform.openai.com/docs/api-reference/responses)
- [Migrate to the Responses API](https://platform.openai.com/docs/guides/responses-vs-chat-completions)
- [Function calling in the OpenAI API](https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api)
- [ChatKit](https://platform.openai.com/docs/guides/chatkit)
- [Realtime API with WebRTC](https://platform.openai.com/docs/guides/realtime-webrtc)
- [Zenn のメモ](https://zenn.dev/kun432/scraps/9fe862943fb00e)
