# AGENTS.md

## Editing Constitution

MyReport is a technical investigation and decision-support archive.

Prefer clarity over jargon.

Prefer evidence over opinion.

Prefer concrete examples over abstract explanations.

The goal is to help readers understand constraints, costs, risks, trade-offs, decisions, and next actions.

## Core Principles

MyReport is a technical investigation and decision-support archive.

Articles focus on feasibility, constraints, costs, operation, dependencies, risks, decisions, and lessons learned.

Technology itself is important, but only as part of a decision-making process.

The goal is to help technical and non-technical readers understand:

- what was investigated
- what was tried
- what was observed
- what decisions were made
- why those decisions were made
- what should be checked next time

Prefer decision support over technology explanation.

Do not make articles so generic that they lose their investigation record.

## Site Positioning

This site is not a generic technology blog. It is a personal archive for technical investigation, feasibility assessment, automation, AI/cloud evaluation, and decision support.

This site should stay focused on technical topics. Non-technical personal essays, creative activity logs, and broad opinion pieces should not be mixed into this site unless they are directly needed to explain a technical decision.

The main purpose is to help readers understand:

- what conditions must be satisfied for a technical idea to work
- what constraints, costs, dependencies, and risks should be checked first
- where implementation is possible, where more investigation is needed, and where alternatives should be considered
- what was actually selected, what happened after trying it, and what should be changed next time

Do not frame articles as simply proving that something is impossible. Prefer framing them as clarifying success conditions, constraints, trade-offs, and decision points.

## Reader First

Assume the reader is intelligent but unfamiliar with the topic.

Do not assume prior knowledge of technical jargon, industry terminology, cloud services, CAD systems, contracts, or software development practices.

### Assume Reader Knowledge

Unless the article is explicitly for specialists, assume the reader:

- understands the problem domain
- does not understand technical jargon
- does not know cloud services
- does not know software development processes
- does not know contract terminology
- may be reading the topic for the first time

Explain concepts before terminology.

Explain the idea first.

Introduce the term second.

For example, prefer:

```text
まず小規模な検証で成立するかを確認する。
このような検証は PoC（ポック）と呼ばれることがある。
```

over:

```text
PoCを実施する。
```

Prefer:

```text
最初に作る範囲を決めて進める方法と、短い単位で試しながら進める方法がある。
後者はアジャイルと呼ばれることがある。
```

over:

```text
アジャイルで進める。
```

## Reader Outcome

Every article should help the reader do at least one of the following:

- understand a constraint
- make a decision
- avoid a mistake
- prepare a discussion
- estimate cost or effort
- identify risks
- plan the next investigation

If an article does not help a reader make a decision, take action, or prepare a useful discussion, reconsider its purpose.

Avoid articles that only explain what a technology is.

Articles may explain technology, but technology explanations should support a decision, an investigation, a lesson learned, or a practical constraint.

Prefer articles that explain:

- when to use it
- when not to use it
- what constraints exist
- what it costs
- what must be checked before adoption
- what happened when it was actually tried

## Writing Style

Use Japanese for public article content unless the existing file is clearly English.

Prefer:

- conclusion first
- real experience and concrete investigation over generic explanation
- actual trial results over general product introductions
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
- mixing non-technical personal themes into technical reports

Good framing:

- "AI導入前に確認したい条件"
- "CAD自動化で先に確認したい制約"
- "PoCを本番につなげるために見ること"
- "作れることと運用できることは違う"

Avoid framing:

- "AI導入は失敗する"
- "CAD自動化は無理"
- "この要求はできない"

## Readability Guidelines

This site may be read not only by engineers, but also by clients, users, business staff, students, and first-time readers.

Prioritize making technical decisions understandable. The goal is not to show technical knowledge, but to help readers share the same assumptions before discussing implementation, cost, operation, and feasibility.

### Explain Concepts Before Terms

Do not start requester-facing articles with jargon.

Avoid:

- アジャイルでは〜
- ウォーターフォールでは〜
- 請負では〜
- 準委任では〜
- B-RepやSTEPでは〜

Prefer:

- 最初に作る範囲を決めて進める方法がある
- 小さく試しながら進める方法がある
- 完成物に対して支払う考え方がある
- 調査や作業時間に対して支払う考え方がある
- CADデータには、見た目だけでなく形状を編集するための情報を持つ形式がある

After explaining the concept, introduce the term:

```text
このような進め方は、開発の世界ではアジャイルと呼ばれることがある。
```

### Glossary And Acronyms

For terms that first-time readers may not know, include reading and a short meaning on first use when appropriate.

Examples:

- API（エーピーアイ・システム同士の窓口）
- PoC（ポック・小規模検証）
- IAM（アイアム・権限管理）
- B-Rep（ビーレップ・CAD形状データ）
- egress（イーグレス・外向き転送料）

Do not over-explain every occurrence. If explanation becomes long, use the glossary or tooltip instead.

### Do Not Blame Readers

Avoid wording that sounds like the requester, user, company, or field staff are at fault.

Avoid:

- 発注者が分かっていない
- 利用者が知識不足
- 現場が間違っている
- 会社が悪い

Prefer:

- 専門分野が違うため、最初に言葉をそろえる必要がある
- 発注側と開発側で見ているものが違う
- 技術、予算、契約、運用を同じ前提で確認する
- 分からないことは確認項目として並べる

### Requester-Facing Articles

For articles aimed at requesters, users, or non-engineers, prioritize:

- 何を決めればよいか
- 何を相談すればよいか
- どこで認識違いが起きやすいか
- どこで費用や期間が変わるか
- 何を後回しにできるか

Keep technical explanation to the minimum needed for decision-making.

### Article Scope

Use one main theme per article.

If an article starts mixing multiple topics, split the detailed topic into a separate article and link to it.

## Evidence And Experience

Prefer writing from concrete evidence rather than abstract opinion.

Prioritize:

1. Actual investigation results
2. Technical verification
3. Project experience
4. Public documentation

Avoid articles that consist only of broad opinions or generic explanations.

When possible, explain:

- what was investigated
- what was tried
- what was observed
- what decision was made
- why that decision was made
- what should be checked next time

The goal is not only to explain technology, but to leave a record that can be reused for future technical and business decisions.

## Preserve Useful Specific Examples

Do not remove concrete examples only because they are detailed.

Prefer concrete examples over abstract explanations when both communicate the same idea.

Specific examples often help readers understand:

- why a problem occurred
- why a decision was made
- what constraints existed
- what trade-offs were considered
- what should be checked next time

Reduce repetition and unnecessary detail, but keep examples that improve understanding.

Good examples include:

- a cloud service that was actually tested
- a deployment or runtime issue that actually occurred
- a CAD/API/file-format limitation that was encountered
- a cost, free-tier, or operation issue that affected the decision
- a PoC result that changed the next action

When editing, do not make articles so generic that they lose the investigation record.

## Before Editing Articles

Before making significant edits to an existing article, first identify and report:

- 想定読者
- 記事の主目的
- 残すべき具体例
- 削ってよい重複説明
- 分割候補
- 用語説明が必要な箇所

Do not start by rewriting the whole article.

First clarify what the article is supposed to do, what value should remain, and what can be simplified.

This is especially important for articles based on actual investigation, project experience, cost comparison, cloud usage, CAD/API constraints, or PoC results.

## Avoid Unnecessary Duplication

Avoid repeating the same explanation across many articles.

General articles should explain the overall idea and link to detailed articles.

Detailed articles should focus on one specific topic.

For example:

- 総論記事: システム開発では技術以外に何を考えるのか
- 個別記事: 発注者が知っておきたい開発費の考え方
- 個別記事: 小さな検証（PoC）が成功しても本番導入できない理由
- 個別記事: クラウドのランニングコストと依存関係は早い段階で確認したい

When the same topic appears in multiple articles, keep only the minimum context needed and link to the more detailed article.

## Prefer Updating Existing Articles Before Creating New Ones

Before creating a new article, check whether the topic already exists.

Consider:

- Is this a new topic?
- Is this a subsection of an existing article?
- Is this a concrete example that belongs in an existing article?
- Is this only a glossary entry?
- Is this mainly a roadmap update?
- Does this introduce a distinct decision point, investigation topic, or lesson learned?

Create a new article only when it introduces a clearly distinct investigation, decision point, or lesson learned.

Avoid creating multiple articles that explain the same idea with slightly different wording.

If a topic naturally belongs inside an existing article, prefer updating and improving that article instead.

When a new article is created, also suggest:

- where it fits in the roadmap
- which existing articles should link to it
- whether a glossary term should be added

## Roadmap Integration

The roadmap is not just an article list. It is the guide for how readers should understand the site.

When adding or significantly changing an article, consider whether the roadmap should be updated.

Check:

- Which reader route does this article belong to?
  - 発注者・利用者向け
  - 技術調査・検証担当者向け
  - クラウド・データベースを選びたい人向け
  - CAD・3D自動化の制約を見る人向け
- Which step does it belong to?
- Should it replace an existing article in the roadmap?
- Should it be linked as a related article instead of being added to the main route?
- Does it duplicate another article already in the roadmap?

Do not add every article to the roadmap. Add only articles that help readers follow a useful learning or decision-making path.

## Article Structure

For investigation and decision-support articles, prefer the following structure when appropriate:

1. 結論
2. なぜ問題になるか
3. よくある誤解や見落とし
4. 確認したいこと
5. 代替案や成立条件
6. 試した結果
7. 後から振り返った評価
8. まとめ

When discussing a tool, platform, architecture, library, or service, include the decision record where possible:

- 候補
- 採用した理由
- 採用しなかった案
- トレードオフ
- 成立条件
- 運用時に確認すること
- 実際に試した結果
- 後から振り返って良かった点、困った点、次に変える点

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
- 採用・不採用の判断理由
- 技術調査の成果をどう可視化するか
- 実際に試した結果と振り返り
- 技術選定の意思決定ログ

## Tone About Risk

When discussing risk, keep the article useful to companies and engineers.

Do not make the message "this cannot be done." Make the message "this can work if these conditions are satisfied; otherwise, these risks and alternatives should be discussed."

When discussing organizational or business problems, keep the article constructive and focused on technical decision-making. If the main topic is no longer a technical decision, do not include it in MyReport.

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

## Boundary Rules

Use MyReport for:

- "AI導入前に確認したい条件"
- "Cloudflare Workersを採用した理由と採用しなかった案"
- "CAD自動化で先に確認したい制約"
- "PoCを本番導入につなげるために確認すること"
- "作れることと運用できることの違い"

Do not use MyReport for:

- personal activity logs where the main value is not technical decision-making
- broad opinion pieces where the main topic is not implementation, operation, cost, dependency, or feasibility
- creative experiments where the main value is expression rather than technical investigation

If a topic overlaps, keep MyReport focused on the technical decision: constraints, costs, dependencies, operation, alternatives, and evidence.

## Decision Log Pattern

For articles about a selected technology or architecture, prefer this pattern:

```text
## 結論

今回は Cloudflare Workers を採用した。

## 候補

- Cloudflare Workers
- AWS Lambda
- GCE

## 採用した理由

- コストを抑えやすい
- 静的サイトとの相性がよい
- 個人運用で管理する範囲を小さくできる

## 採用しなかった案

- AWS Lambda: 学習対象としては有力だが、今回の静的サイトでは構成が大きくなりやすい
- GCE: 自由度は高いが、サーバー管理と運用負荷が増える

## 実際に試した結果

- 運用期間
- 月額費用
- 発生した問題
- デプロイや認証で詰まった点

## 振り返り

- 良かった点
- 困った点
- 次に同じ判断をするなら確認すること
```

## Implementation Notes

- Keep Markdown simple. Existing renderer supports paragraphs, headings, unordered lists, tables, and inline links.
- Keep public wording careful. Do not expose private prototype names or internal notes unless intentionally published.
- Avoid adding large refactors when the request is only editorial.

## Adding New Rules

Do not add new rules casually.

Add a new AGENTS.md rule only when:

- the same problem has happened multiple times
- existing rules do not already cover it
- the rule affects multiple articles or workflows
- the rule helps preserve the site's purpose as an investigation and decision-support archive

Prefer improving existing rules over adding new sections.

Keep this file short enough that future AI agents can actually follow it.
