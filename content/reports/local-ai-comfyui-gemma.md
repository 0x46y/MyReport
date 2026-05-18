---
title: "ローカルでAIを無料で使うための検証: ComfyUI で Gemma を動かす"
date: "2026-05-18"
excerpt: "前回の Unsloth Studio 検証に続き、今回は ComfyUI 上で Gemma 系モデルを読み込み、TextGenerate workflow の動作を確認した。"
category: "Local AI"
tags: "local-ai, comfyui, llm, gemma, gpu, vram"
---

前回は Unsloth Studio を使って、ローカル環境で Gemma 系モデルを動かす検証を行った。今回は、LLMを含むさまざまなAI処理をノードベースで扱える ComfyUI をインストールし、ComfyUI 上で Gemma 系モデルを動かしてみた。

ComfyUI は画像生成の文脈で使われることが多いが、workflow 次第で LLM、画像、動画、音声など複数の入力や処理を扱える。今回はまず、最小構成として text-only の LLM 推論ができるかを確認した。

## 今回の目的

今回の目的は、ComfyUI 上で Gemma 系モデルを読み込み、テキスト生成 workflow が正常に動作するかを確認することだった。

| 項目 | 内容 |
| --- | --- |
| 実行環境 | ローカルPC |
| UI | ComfyUI |
| モデル | gemma4_e4b_it_fp8_scaled.safetensors |
| workflow | TextGenerate workflow |
| 確認内容 | モデル読み込み、日本語プロンプト、日本語応答 |

最終的には、ローカル環境で LLM や音楽生成などのAI workflowを無料で試せる環境を作れるかを見ている。その一部として、今回は Gemma 系 LLM の動作確認を行った。

## Gemma LLM モデルの動作確認

ComfyUI 上で Gemma 系 text encoder を利用した TextGenerate workflow を実行した。

workflow の構成は、概ね次のような流れだった。

```text
CLIP を読み込む
↓
TextGenerate
↓
プレビュー
```

使用したモデルは次の通り。

```text
gemma4_e4b_it_fp8_scaled.safetensors
```

まずは、モデルが workflow から認識されるか、TextGenerate ノードで実行できるかを確認した。

## モデル再読み込みと workflow 修正

モデル追加後、workflow 側で次の問題が発生した。

```text
clip名 = undefined
```

原因として、ComfyUI がモデル追加後に workflow 側のモデル一覧を即時再スキャンしていなかったことが考えられる。モデルファイルを追加しても、既存 workflow の選択肢にすぐ反映されない場合がある。

対応として、以下を実施した。

- ノード再読み込み
- ComfyUI 再起動
- clip名の再選択

これにより、workflow 側でモデルを再選択できるようになり、復旧できることを確認した。

## マルチモーダル workflow の確認

確認した workflow は、text だけでなく image、video、audio などの入力にも対応していた。

| 入力 | 対応状況 |
| --- | --- |
| text | 対応 |
| image | 対応 |
| video | 対応 |
| audio | 対応 |

初期状態では、プロンプトが次のようになっていた。

```text
Describe the image, and transcribe the audio
```

この状態では、画像や音声を接続していない場合に入力不足エラーになる。そのため、まずは text-only の最小構成に変更して動作確認を行った。

## GPUメモリ不足の確認

実行時に `torch.OutOfMemoryError` が発生した。原因としては、Gemma モデル自体のVRAM消費に加えて、最大長の設定や他アプリの同時起動が影響していたと考えられる。

主な要因は次の通り。

- Gemma モデルのVRAM消費
- 最大長 2048 の設定
- VSCode、Codex、ブラウザなどの同時起動
- 他のAI処理や workflow の影響

RTX 3060 環境でも、LLM 系 workflow や Ace Step のような音楽生成 workflow はVRAM使用量が大きい。他アプリと併用すると、不安定になりやすいことを確認した。

## 軽量設定での動作確認

安定動作を確認するため、最大長を短くした。

| 設定 | 値 |
| --- | --- |
| 最大長 | 256 |
| プロンプト | 日本で一番高い山はなんですか？ |

この設定で実行したところ、日本語応答の生成に成功した。

出力例は次の通り。

```text
日本で一番高い山は富士山です。
標高は3,776メートルです。
```

これにより、以下の流れが正常に動作することを確認できた。

- Gemma モデル読み込み
- TextGenerate
- 日本語プロンプト
- 日本語応答生成
- ComfyUI workflow 実行

## Unsloth Studio との違い

前回の Unsloth Studio は、ローカルLLMを比較的シンプルに起動してブラウザから試す用途に向いていた。一方で、ComfyUI はノードベースで workflow を構成できるため、LLM だけでなく画像、音声、動画などを組み合わせたAI処理に向いている。

| 観点 | Unsloth Studio | ComfyUI |
| --- | --- | --- |
| 主な用途 | ローカルLLMの起動と対話 | ノードベースのAI workflow |
| 操作感 | チャットUI寄り | workflow構築寄り |
| 強み | LLMを試しやすい | 画像、音声、動画、LLMを組み合わせやすい |
| 注意点 | 日本語IMEやブラウザ拡張との相性 | workflow設定、モデル再読み込み、VRAM管理が必要 |

今回の検証では、ComfyUI の方が自由度は高いが、その分 workflow の理解やVRAM管理が重要になると感じた。

## 所感

ComfyUI は、LLMだけを動かすには少し大きな環境に見える。ただし、画像生成、音楽生成、動画、音声、LLMを組み合わせることを考えると、ノードベースで処理を組める点は大きなメリットだ。

一方で、VRAM消費はかなり意識する必要がある。特に RTX 3060 環境では、VSCode、Codex、ブラウザなどを同時に開いたまま大きめの workflow を実行すると、GPUメモリ不足になりやすい。

安定動作させるには、次のような運用が有効だと考えられる。

- ComfyUI 単体に近い状態で起動する
- 最大長を短くする
- 不要な workflow を止める
- モデル追加後は ComfyUI を再起動する
- 他のGPU利用アプリを閉じる

## まとめ

今回の検証では、ComfyUI 上で Gemma 系モデルを読み込み、TextGenerate workflow による日本語応答生成に成功した。

前回の Unsloth Studio と比べると、ComfyUI はチャット用途だけに特化した環境ではない。その代わり、ノードを組み合わせて複数のAI処理を扱えるため、ローカルAI実験環境としての拡張性は高い。

ローカルでAIを無料で使い倒すという観点では、まず軽量モデルと短い最大長で安定動作を確認し、その後に画像、音声、音楽生成などの workflow へ広げていくのがよさそうだ。
