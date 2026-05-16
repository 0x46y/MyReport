---
title: "Cloudflare Workers に置く個人サイトの初期設計"
date: "2026-05-11"
excerpt: "Next.js の静的出力を Workers の Assets で配信し、記事とポートフォリオを同居させる方針を整理する。"
category: "Web Development"
tags: "nextjs, cloudflare, workers, portfolio"
---

このサイトは、まず静的なコンテンツサイトとして始める。更新頻度が高くない個人レポートでは、サーバー処理を最初から増やすより、ビルド済みの HTML を速く配る方が扱いやすい。

記事データは TypeScript の配列に置いている。数が増えたら Markdown や MDX に移せるが、最初は構造を固定して、ページの見え方と分類を先に決める。

Cloudflare Workers では wrangler の Assets 配信を使う。認証、検索、コメントなどが必要になった段階で、Worker 側の処理を追加する。
