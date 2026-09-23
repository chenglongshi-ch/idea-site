# 想法展示 / 早期产品验证：既有产品与站点形态调研

- **调研时点**：2026-09-23（所有「时点」均指当日实际抓取/查询）
- **目的**：为 solo 开发者的「想法 + 可交互 demo」独立站找参照（发布形态、反响收集、AI 可发现性）
- **方法与限制（诚实声明）**：本次调研环境内通用搜索引擎不可用（DuckDuckGo DNS 污染、Bing 国际模式返回无关结果、内置 WebSearch/webReader MCP 配额耗尽），改用**目标站点直连抓取 + RSS + GitHub API** 三条通道。因此：单点事实（活跃度、玩法、数据）均为一手抓取；但**未能做社区口碑横评**（Reddit/X 上的大量用户评价未覆盖），涉及「solo 挂上去能收到什么」的部分基于平台机制本身推断，已标注。

---

## 一、形态谱系

### ① 想法/早期产品展示与反馈平台

| 平台 | 现状（2026-09-23 实测） | 一句白话玩法 | 对本项目的可借鉴点 |
|---|---|---|---|
| **Product Hunt** | **活跃**。RSS `https://www.producthunt.com/feed` 返回 HTTP 200，当日条目含 Googlebook、Grok 4.7、QuietGlass 等，源标题 "The best new products, every day"；第三方聚合站「今日热榜」programnotes.cn 亦显示 2026-09-20 更新 | 一天一个冲榜窗口：发帖、社区投票+评论、按日排行，拿到名次可挂 badge | 一次性**脉冲放大器**，不是想法的家；每个想法 ship 时来发一次，导流回自己站。机制描述（投票/榜单/badge）为公知玩法，本次未能抓到官方细则页（主站被 Cloudflare JS 盾挡，HTTP 403），未附具体流量数字 |
| **BetaList** | **活跃**。首页（HTTP 200）出现 "Today September 23rd" 当日新条目（FindPeptideBrands 等）、Trending Startups（Restockd、AmazeAgent.ai、LongTerMemory）、每日 digest 订阅框、Submit Startup 入口与分类浏览（Productivity/AI Assistant/SaaS…） | 「明天之星」目录：预发布产品排队等审，换取早期用户浏览+邮件订阅 | 定位是**预发布钩子**——"即将上线"本身就是内容；有独立站+demo 再来挂，收邮箱是主要回报 |
| **IdeasAI**（ideasai.com） | **活跃且已 AI 原生**。首页标明 "Startup Ideas powered by xAI Grok"、"Ideas AI by @levelsio"：想法 100% 由 AI 生成、由 2,086,338+ 人的左右滑训练；89,872 人每周邮件订阅；有月度 top ideas（带浏览数，如 37 views）和 "Build it" 按钮；最新条目 "2 days ago" | Tinder 式刷想法卡片：左滑不喜欢、右滑喜欢，群体投票反过来训练生成器 | **想法本身可以作为内容流**：卡片 + 极轻反馈（赞/踩）就能积累验证信号；「本月最热想法 + Build it 入口」是个可抄的版式 |
| **Kernal**（kernal.fun / kernal.space） | **消亡**。两个域名 2026-09-23 均 DNS ENOTFOUND（无法解析）；web.archive.org 从本网络不可达，无法核实是关停还是迁址 | （历史玩法：solo 挂想法收集反馈的社区） | 反例警示：**纯想法社区没有留存闭环，容易死**——想法展示要绑在能累积的个人资产（站、邮件列表）上，而不是寄居在单一社区 |

**①小结（solo 挂上去能收到什么）**：PH/BetaList 给的是**短期曝光 + 外链 + 徽章背书**；IdeasAI 证明轻量投票可当验证信号；Kernal 证明想法社区本身不可靠。均不提供「想法的家」。

### ② 个人「想法库」文化与开源模板

- **Digital garden**（代表：Maggie Appleton）
  - 实测：`https://maggieappleton.com/garden`（HTTP 200）自述为 "A growing collection of essays, notes, talks, podcasts, and **half-baked explorations**, gathered and tended over time"，分区为 Essays / Notes / Patterns / Smidgeons / Talks 等——**明确欢迎未成品想法**，以「持续照料」而非「一次性发表」的隐喻组织内容。
  - 借鉴：想法页带**成熟度状态**（半成品 → 成文 → 已做成产品），让「未想清楚」也能合法发布。
- **Now page**（代表：nownownow.com 目录）
  - 实测：`https://nownownow.com`（HTTP 200）为全球 /now 页目录，按地区计数（California 256、England 328、**China 63** 等）。
  - 借鉴：/now 是**维护成本极低、信号密度极高**的一页——告诉人类访客和爬虫「我现在在干什么」，天然适合想法站的「当前焦点」。
- **最接近本项目原型的单人站：swyx.io**
  - 实测：`https://swyx.io/ideas`（HTTP 200）标题 "**Swyx Idea Showcase** — For free: great ideas, lightly used"，**630 entries**，站内搜索 + 按格式过滤（Essay/Note/Talk/Podcast/Tutorial/Snippet）；同站有 /about、/now，且 `https://swyx.io/llms.txt` 返回 HTTP 200（标准 llms.txt 格式，含 Home/About/Now/Ideas 索引）。
  - 借鉴：**个人站 + 想法库 + now + llms.txt 全家桶**已有跑通的单人先例，且 swyx 把想法明确标为「免费拿去用」来换取传播。
- **开源模板（GitHub API 2026-09-23 查询，星数+最近推送）**
  - Astro 系（更贴「静态、内容优先、demo 挂子路径」）：
    - `jktrn/astro-erudite` 865★，pushed 2026-07-27（无样式极简博客模板）
    - `miantiao-me/astro-aria` 383★，pushed 2026-09-08（个人博客+作品集，活跃）
    - `ixartz/Astro-boilerplate` 914★，pushed 2025-08-31（响应式博客+portfolio）
    - `markhorn-dev/astro-sphere` 691★，pushed 2025-06-16（极简静态 portfolio+blog）
    - （反例：`manuelernestog/astrofy` 1437★ 但 2024-07 后停更，勿选）
  - Next 系（适合 demo 本身就是 React 交互组件）：
    - `transitive-bullshit/nextjs-notion-starter-kit` 7032★，pushed 2026-09-19（Notion 当 CMS）
    - `ncdai/chanhdai.com` 2287★，pushed 2026-09-22（shadcn 风格 dev portfolio，很活跃）
    - `once-ui-system/magic-portfolio` 1405★，pushed 2026-08-08
  - 注：以上为按关键词/topic 检索的头部结果，非全面评测。

### ③ 独立开发者「ship 记录」文化

- **levels.io**（Pieter Levels，BIH 文化源头之一）
  - 实测：`https://levels.io`（HTTP 200）导航为 "home · stats · projects · rss · **api** · **llms** · **mcp** · investments · contact"；置顶帖 "Ask me anything"（09-23）、"List of all my projects ever"（09-22）；自述 Nomads.com / Remote OK / Hoodmaps / Photo AI / Interior AI 全部单人无融资；183,381 人邮件订阅。
  - 借鉴：单人站可以同时是**内容站 + 数据 API + AI 端点 + 邮件列表**四位一体；「所有项目总列表」置顶是 ship 文化的标准动作。
- **marclou.com**（Marc Lou，"Indie Page"）
  - 实测：HTTP 200，首屏 "I've built 36 startups solo"，站=产品列表 + 书 + newsletter（50k 读者）。
  - 借鉴：**把「我做过什么」压成一页**，用邮件列表沉淀反复 Launch 的流量。
- **buildinpublic.xyz**
  - 实测：HTTP 200，现为 "An online content hub to help founders go from zero to pro in building in public"（教程/内容枢纽形态）。
  - 借鉴/警示：BIH 的**平台化尝试已退潮为内容站**——build in public 今天更多是 X 等社媒上的个人行为 + 自己站上的记录页，不值得依赖单一 BIH 平台。

### ④ 衡量反响的开源最小组

（GitHub API 2026-09-23；★=stargazers，pushed=最近推送）

- **自托管分析**：`umami-software/umami` 38,956★ / pushed 2026-09-22（"privacy-first analytics platform"）；`plausible/analytics` 29,191★ / pushed 2026-09-22（"open source, privacy-first, cookie-free"）。二选一即可，均活跃维护。
- **评论**：`giscus/giscus` 12,119★ / pushed 2026-05-26（成熟稳定，"commenting system powered by GitHub Discussions"）——零服务器，评论即 GitHub 帖，solo 友好。
- **结构化反馈/投票板**：`getfider/fider` 4,539★ / pushed 2026-09-19（"Open platform to collect and prioritize feedback"，自托管想法投票+排序）——想法多了以后再上。
- **微型反馈 widget**：GitHub 搜 "feedback widget self-hosted" 头部结果均为小星标项目（如 `neodisa/CommentLayer` 6★，Figma 式页面批注；`eggb4by/feedback-cf` 2★，Cloudflare Workers 自托管 widget）——**方向活跃但无霸权方案**，第一版不必上。
- **最小组结论**：静态站 + umami（或 Plausible Cloud 免费档）+ giscus = 覆盖「多少人看了 / 谁说了什么」；「多少人想要」用想法页上的轻投票（第一版可先用 giscus 评论顶替，或 GitHub issue reactions）。

### ⑤ 「AI 原生」的想法展示实践

- **llms.txt 已成正式标准且在演进**：`https://llmstxt.org`（HTTP 200）为 **The /llms.txt file, v2**，作者 Jeremy Howard，2024-09-03 发布、2026-08-10 修订；原文明确："a chat assistant with search reads pages to answer questions about a product… Today it is routine"（AI 助手读网页已成常态），格式=给 agent 的 markdown 站点索引。
- **真实个人站实例**：
  - `swyx.io/llms.txt` HTTP 200（静态生成，含 Ideas 索引）；对照组 `maggieappleton.com/llms.txt` 404、`marclou.com/llms.txt` 307→404——**远未普及，做了就是少数派红利**。
  - **levels.io（满配）**：`https://levels.io/llms.txt`（HTTP 200）为**实时生成**（"This file is generated live… Last updated: 2026-09-21"），内含引用许可声明（"please link back if you quote"）；`https://levels.io/mcp/` 返回 HTTP 405 JSON："**This MCP server is POST-only**… See https://levels.io/llms.txt"——个人博客直接跑 **MCP server**，AI 客户端可把整个站当工具调用。
- **AI 原生想法站**：IdeasAI（见①）即当前最成型的实例——生成、排序、反馈回路全 AI 化。
- **未发现的形态（诚实标注）**：未找到已验证的「平台型 AI 想法收录站」（候选 validatorai.com / uneed.best 本次只测到 301/308 跳转，无法核实内容，不采信）。「被 AI 收录引用」目前可操作的抓手 = **llms.txt + 干净可抓的 HTML + RSS**，而非入驻某个 AI 平台。

---

## 二、「最小可发布形态」建议（第一版页面清单）

**判断：第一版全静态（Astro 系模板起步），唯一「动态」是两段第三方脚本（分析+评论）。** demo 以静态可交互页挂在每想法子路径下。

| # | 页面 | 内容 | 备注 |
|---|---|---|---|
| 1 | `/` 首页 | 一句话定位 + 最新想法卡片（3 张）+ 「我是谁」两行 | 模板自带，改造量最小 |
| 2 | `/ideas/` 想法列表 | 卡片流：标题一句话 + 状态标签（seed 萌芽 / growing 在验证 / shipped 已做）+ 标签 | 状态标签抄 digital garden 的成熟度隐喻 |
| 3 | `/ideas/[slug]/` 想法详情 | 四件套：①问题与方案（300 字内）②**内嵌可交互 demo**（iframe 或同页挂静态交互组件）③更新日志（日期+一行）④giscus 评论区；页尾「想让我做下去？留一句」 | 核心页；IdeasAI 的卡片反馈 + swyx 的想法库式样在此合成 |
| 4 | `/now/` | 当前在验证哪 1-2 个想法、下一步 | nownownow 文化，10 行以内 |
| 5 | `/about/` | 身份 + 为什么公开想法 + 联系方式 | 也可并入首页 |
| 6 | `/demo/[slug]/`（或 `/ideas/[slug]/demo/`） | 纯 demo 页，无文章干扰 | 便于直接分享短链、埋独立分析事件 |
| 7 | `/llms.txt` | 手写 markdown：站定位 + 想法索引（标题+一句话+链接） | 对齐 llms.txt v2；想法更新时同步重生成 |
| 8 | `/sitemap.xml` + `/feed.xml`（RSS） | 标准件 | RSS 同时服务人类订阅与 AI 抓取 |

**反响收集（零后端）**：umami 自托管或 Plausible 免费档（看量）→ giscus（听声）→ 想法页「我想要这个」按钮第一版用 giscus 顶置评论或 GitHub reaction 顶替；跑 3-6 个月有 2+ 想法聚集了明确需求信号，再考虑 fider 或真后端。

---

## 三、独立站 vs 挂别人平台：先后配合

**结论：先独立站，后平台；平台是弹药不是地基。**

1. **先建独立站**（第 1-2 周）：想法的家必须是自己可控、可累积、可被 AI 抓的资产——Kernal 之死与 buildinpublic.xyz 的平台退潮是反面教材；且 PH/BetaList 发帖本来就需要一个可访问的产品页/站点，独立站是上平台的前置条件。
2. **每「做出可玩 demo」才动用一次平台**：BetaList 收早期邮箱（预发布定位契合「想法验证」阶段）；PH 留给真正 ship 的时刻（冲榜窗口一次性消耗）。发帖时把落地页指向独立站的想法详情页，让脉冲流量沉淀为 umami 数据 + giscus 评论 + 邮件订阅。
3. **AI 侧持续做**：llms.txt + RSS + 干净 HTML 从第一天就有（成本≈0，levels.io/swyx.io 已示范）；想法被 AI 引用的回报是长尾的，与平台的短脉冲互补。
4. **验证回路**：每个想法看三件事——demo 事件数（umami）、评论质量（giscus）、「想要」的重复表达；任一想法连续两轮领先，才进入「做深」决策。

---

## 附：来源清单（全部为 2026-09-23 实际抓取）

| 来源 | 类型 | 时点 |
|---|---|---|
| https://www.producthunt.com/feed | RSS，HTTP 200，当日条目 | 2026-09-23 |
| https://producthunt.programnotes.cn/ | 第三方聚合（佐证 PH 每日更新，2026-09-20 快照） | 2026-09-23 经 Bing 结果 |
| https://betalist.com | 首页直抓，HTTP 200 | 2026-09-23 |
| https://ideasai.com | 首页直抓，HTTP 200 | 2026-09-23 |
| kernal.fun / kernal.space | DNS ENOTFOUND（消亡证据） | 2026-09-23 |
| https://maggieappleton.com/garden | 首页直抓，HTTP 200 | 2026-09-23 |
| https://nownownow.com | 目录直抓，HTTP 200 | 2026-09-23 |
| https://swyx.io/ideas 、 https://swyx.io/llms.txt | 直抓，均 HTTP 200 | 2026-09-23 |
| https://levels.io 、 /llms.txt 、 /mcp/ | 直抓，HTTP 200/200/405(JSON) | 2026-09-23 |
| https://marclou.com | 首页直抓，HTTP 200 | 2026-09-23 |
| https://buildinpublic.xyz | 首页直抓，HTTP 200 | 2026-09-23 |
| https://llmstxt.org | 直抓，HTTP 200（v2 规范） | 2026-09-23 |
| GitHub API：umami-software/umami、plausible/analytics、giscus/giscus、getfider/fider | 仓库元数据（★/pushed_at） | 2026-09-23 |
| GitHub API 搜索：astro/nextjs 模板、"feedback widget self-hosted" | 检索结果 | 2026-09-23 |
| maggieappleton.com/llms.txt（404）、marclou.com/llms.txt（307→404） | 反例检查 | 2026-09-23 |
