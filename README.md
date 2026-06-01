# My Report

MyReport は、技術調査、実現可能性検証、業務自動化、AI・クラウド活用に関する個人技術ノートです。

単なる制作物紹介ではなく、なぜ難しいのか、どこが制約になるのか、どこで判断すべきかを記録することを目的にしています。

Next.js の static export で生成した静的ファイルを、Cloudflare Workers Assets として公開しています。

## Features

- Next.js App Router
- Tailwind CSS v4
- Markdown based articles
- Article search, sorting, tag filtering, and pagination
- Portfolio page
- Profile page
- Cloudflare R2 image demo page
- Cloudflare Workers Assets deployment

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Bun
- Wrangler
- Cloudflare Workers

## Pages

- `/` - Home
- `/articles` - All articles with search and filters
- `/reports` - 技術調査、実現可能性検証、制約、リスク、判断材料を整理する長めの記録
- `/notes` - 用語、短い補足、あとから参照したい補助メモ
- `/portfolio` - 制作物の目的、技術、公開形態、改善点を整理するページ
- `/profile` - 技術調査、実現可能性検証、業務自動化を中心にしたプロフィール
- `/r2-image-test` - Cloudflare R2 image reference demo. Public navigation には出していない検証用ページ

## Content

Articles are stored as Markdown files.

```text
content/
  reports/
    cloud-platform-comparison-2026.md
    codex-vs-openai-api-for-my-app-2026.md
    object-storage-pricing-2026.md
  notes/
    small-tools.md
```

Each article uses frontmatter.

```md
---
title: "Article title"
date: "2026-05-14"
excerpt: "Short description shown in article lists."
tags: "nextjs, cloudflare, ai"
---

Article body.
```

Supported Markdown features are intentionally simple:

- paragraphs
- `##` headings
- unordered lists
- tables
- inline links

## Development

Install dependencies:

```bash
bun install
```

Run the local development server:

```bash
bun run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
bun run build
```

This generates static output in:

```text
out/
```

## Deploy

Login to Cloudflare if needed:

```bash
wrangler login
```

Deploy:

```bash
bun run deploy
```

The Worker configuration is in `wrangler.toml`.

```toml
name = "my-report"

[assets]
directory = "./out"
not_found_handling = "404-page"
```

## R2 Image Demo

The `/r2-image-test` page displays a test image uploaded to Cloudflare R2.

The default image URL is currently defined in:

```text
app/r2-image-test/page.tsx
```

You can override it with:

```bash
NEXT_PUBLIC_R2_TEST_IMAGE_URL="https://example.r2.dev/R2_test_image.png"
```

## Notes

This project is designed as a small static publishing site first. If richer editing is needed later, the Markdown files can be connected to a Git-based CMS such as Decap CMS or TinaCMS.
