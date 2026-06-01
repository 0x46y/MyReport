# AGENTS.md

## Site Positioning

This site is not a generic technology blog. It is a personal archive for technical investigation, feasibility assessment, automation, AI/cloud evaluation, and decision support.

The main purpose is to help readers understand:

- what conditions must be satisfied for a technical idea to work
- what constraints, costs, dependencies, and risks should be checked first
- where implementation is possible, where more investigation is needed, and where alternatives should be considered

Do not frame articles as simply proving that something is impossible. Prefer framing them as clarifying success conditions, constraints, trade-offs, and decision points.

## Writing Style

Use Japanese for public article content unless the existing file is clearly English.

Prefer:

- conclusion first
- practical and business-aware tone
- concrete constraints and examples
- neutral wording toward vendors, customers, engineers, and organizations
- "成立条件", "制約", "判断材料", "代替案", "確認したいこと"

Avoid:

- inflammatory wording
- blaming specific roles or companies
- excessive pessimism
- technology hype
- saying only "できない" without explaining conditions or alternatives
- overusing "思う" when the article should state a technical position

Good framing:

- "AI導入前に確認したい条件"
- "CAD自動化で先に確認したい制約"
- "PoCを本番につなげるために見ること"
- "作れることと運用できることは違う"

Avoid framing:

- "AI導入は失敗する"
- "CAD自動化は無理"
- "この要求はできない"

## Article Structure

For reports in `content/reports`, use this structure when it fits:

1. 結論
2. なぜ問題になるか
3. よくある誤解や見落とし
4. 確認したいこと
5. 代替案や成立条件
6. まとめ

Each article should ideally include an early sentence that states the core point clearly.

Example:

```text
業務システム開発で失敗する原因は、コードを書けないことよりも、前提条件を確認しないまま進めてしまうことにある。
```

## Recurring Themes

The site should keep developing these themes:

- 技術調査が軽視される理由
- PoCが成功しても本番導入で失敗する理由
- 作れることと運用できることの違い
- AIがコードを書く時代のボトルネック
- 撤退条件を決める意味
- 組み合わせ爆発
- ベンダーロックイン
- ライセンス制約
- クラウドコスト
- 外部製品やAPIへの依存
- 受け入れ条件と業務判断
- 運用、保守、責任分界点

## Tone About Risk

When discussing risk, keep the article useful to companies and engineers.

Do not make the message "this cannot be done." Make the message "this can work if these conditions are satisfied; otherwise, these risks and alternatives should be discussed."

Useful pattern:

```text
この方法自体は可能だが、次の条件を満たす必要がある。

- ライセンス上その使い方が許されている
- APIやデータ形式が必要な情報を提供している
- 運用時の費用と担当者が決まっている
- 失敗時の確認方法と代替手段がある
```

## Content Types

- `content/reports`: long-form technical investigation and feasibility notes
- `content/notes`: glossary, short reference notes, supplemental explanations
- `content/portfolio`: project writeups that explain purpose, implementation choices, distribution, and future improvements

## Implementation Notes

- Keep Markdown simple. Existing renderer supports paragraphs, headings, unordered lists, tables, and inline links.
- Keep public wording careful. Do not expose private prototype names or internal notes unless intentionally published.
- Avoid adding large refactors when the request is only editorial.
