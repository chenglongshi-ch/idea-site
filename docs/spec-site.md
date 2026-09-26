# 本地站功能 spec（spec-lite）

- **状态**：v1.2（2026-09-26 design-spec ⑦-3 同步：删 `slug` 必填——文件名即 slug，零消费字段即冗余）；v1.1（2026-09-23 骨架实装回填），2026-09-23 定稿——first-real-idea（本地全链跑通）的功能依据与验收依据。
- **推导来源**：`research/precedent-products.md` §二（发布形态与页面清单）+ CLAUDE.md 通道定稿（模型直出单文件 HTML + 静态站承载）。与调研默认不同处（框架起手）已注明理由。
- **范围**：**本地阶段**——`npm run dev` 可跑、可新增想法、可实机验收即达标。上线件单列 §6 预留，本期一律不做。

## 1. 定位一句话

每个想法一页：想法原文 + 页内可直接玩的 demo；本地可浏览、可新增、可实机验收。

## 2. 技术定案（已定，不再开题）

| 项 | 定案 | 依据 |
|---|---|---|
| 框架 | Astro 静态站，官方 minimal 模板起手 | 所需仅路由 + content collections + dev server；官方 minimal 零博客假设，社区极简模板（erudite 类）仅作样式参考。调研原话「模板起步」取其最小者 |
| demo 形态 | 模型直出**单文件 HTML**，iframe 嵌入想法页；`/demos/<slug>/` 直链即纯 demo 页 | E1 实测 iframe 嵌入可用（定高 520px，见 `test-embed.html`）；生成通道 = Agnes 主力（CLAUDE.md 模型通道表） |
| 内容 | markdown content collection，无数据库无后端 | 零成本起步 |
| 生成职责 | 站**不**生成 demo；生成在仓库脚本侧（`scripts/gen_demo.py`，从 `e1_gen.py` 提炼参数化），产物带血统 | 血统约定（CLAUDE.md 约定节）；E1 脚本已验证通路 |

## 3. 本地页面清单（4 类）

| 路由 | 功能 | 本地验收 |
|---|---|---|
| `/` | 想法卡片列表：标题 + 一句话 + 状态标签 + 日期 | 打开即见全部想法，可点进 |
| `/ideas/[slug]/` | 想法页四件套：①问题与方案（300 字内）②demo（iframe 页内可玩）③更新日志（日期 + 一行）④评论区**占位**（本地不挂） | 四件套齐全，demo 页内可玩 |
| `/demos/[slug]/` | 纯 demo 页（public 静态文件直出，无文章干扰） | 直链打开可玩（验收 / 分享用） |
| 404 | 框架默认 | — |

## 4. 内容模型

想法条目 = `src/content/ideas/<slug>.md`（**文件名即 slug，路由用 entry.id**，标题可中文），frontmatter：

```yaml
title: <标题>
summary: <一句话>
status: seed | growing | shipped   # 萌芽（仅想法）/ 在验证（有 demo）/ 已做成（digital garden 成熟度隐喻）
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
changelog: []                # 可选，[{date, note}]——更新日志数据面（实现已用，v1.1 回填）
```

demo 产物 = `public/demos/<slug>/index.html` + 同目录 `lineage.json`（必含 `producer`（脚本路径）+ `rev`（git rev，脏树记内容哈希））。

## 5. 新增一个想法的工作流（= first-real-idea 全链）

1. 写想法条目（`status: seed`）→ 首页即可见；
2. 生成 demo：`set -a; source .env; set +a` 后 `python scripts/gen_demo.py --slug <slug>`（Agnes 通道）→ 产出 `demo html + lineage.json` 落 `public/demos/<slug>/`；
3. 想法页补「问题与方案」正文 + 更新日志一行，`status → growing`；
4. `npm run dev` → **浏览器实机验收**（形态类评价只认实机/截图，读代码不算——E1b 倒计时冻结 bug 即教训）。

## 6. 明确不做（上线预留，防范围蔓延）

评论区（giscus）、访问分析（umami/Plausible）、「我想要这个」按钮、llms.txt、RSS/sitemap、`/now`、`/about`、邮件订阅——发布时按 `research/precedent-products.md` §二 8 页清单一次挂上。本期只在想法页模板里留「评论区上线挂载点」注释位。

## 7. 验收（first-real-idea 关闭条件）

- [ ] 用第一个真实想法走完 §5 四步；
- [ ] 实机：首页 → 想法页 → demo 三跳全部可用，demo 页内可玩；
- [ ] `lineage.json` 血统齐全（producer + rev）；
- [ ] STATUS：first-real-idea → done。

## 8. 开放点（首战实机后回填，不阻塞开工）

- iframe 高度策略：E1 用定高 520px 实测可行；自适应（scrollHeight 注入）待实测定，首版按定高。
- demo 迭代策略：想法变更后重生成，倾向覆盖 + lineage 追加 rev 记录（不版本化目录）。
- `gen_demo.py` 参数化面：prompt 模板固化到什么程度（想法原文直传 vs 结构化字段拼装）。
- dev 模式 /demos/<slug>/ 目录直链：Vite dev 中间件不解析目录 index，已在 astro.config.mjs 加 dev-only 重写（build/preview 不受影响）。
