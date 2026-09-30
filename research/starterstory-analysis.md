# Starter Story（starterstory.com）分析评估

- **调研时点**：2026-09-28（当日实测；外部事实均标时点）
- **目的**：用户直令「分析评估下 start story 这个网站」。经确认（候选清洗后）指 **Starter Story**——与本项目（想法 + 可交互 demo 独立站）最近的形态参照之一。
- **通道声明**：当日 WebSearch/webReader MCP 配额 429（10-06 恢复）、WebFetch 域名校验被网络策略挡 → 走 **chrome-devtools 浏览器实机**（主线程首页快照 + 派发浏览 agent 深逛 digest-only，42 次工具调用，截图存 shots/starter-story/）+ curl 文本直取。cn.bing 精确短语匹配失效（引号被忽略）、百度命中。
- **对象识别过程**（防张冠李戴的底账）：startstory.com / startstory.io / thestartstory.com 无响应；start-story.com 为日本 STORY UP 株式会社（WordPress 企业站，形态不搭）；百度搜 startstory 命中知乎 2026-07-10 文《Starter Story: 2800+ 真实盈利创业故事数据库》+ 相关搜索「StarterStory创业案例平台」→ 锁定 starterstory.com。

---

## 一、是什么（2026-09-28 实测）

**一句话：把「已赚钱的真实生意」做成可检索数据库 + 视频访谈库 + AI 编研档案，用 1.9 万页 SEO 矩阵获客；2026-02 被 HubSpot 收购，现处「Starter Story 2.0 · BETA」重构期。**

- 自称 "Starter Story 2.0 · BETA"（导航角标 + /join 页徽章）；/about 逐字："Starter Story was founded by Pat Walls in 2017."、"became a proud member of the **HubSpot family in February 2026**"。
- H1："Find the business ideas that actually make money."；副文案 "Search **3,032+** real, revenue-generating projects … Updated live. **Free.**"
- 首屏看板：3,032 projects / "$4B+/mo in combined revenue"（口径未注明，推算存疑见 §四）。
- 首页列 **39 个策展数据库**（SEO 落地页矩阵入口）：Problems（1,067 ideas）、Ideas for Solopreneurs（959）、Side Project Ideas（917）、Micro SaaS Ideas（702）、GPT Wrapper Ideas（154）、Weekend Projects（141）…
- 技术栈：Ruby on Rails（active_storage 图片路径）、bunny.net 视频 CDN。

## 二、产品形态（深逛 digest，2026-09-28）

**sitemap 共 19,342 URL**（302→CDN gzip），构成：/ideas 5,950、/stories 3,296、/breakdowns 1,520、/businesses 584、/tools 347、/blog 87、/data 40——**SEO 主力是 /ideas 长尾页**，不是首页那 39 个分类页。

1. **故事页 /stories/**：视频集数页（非文章）。实测样本：13:34 视频 + 12 段 Chapters + **免费全文 transcript（约 2,666 词）** + Stack 面板。营收数据来自创始人视频口述+屏幕共享 dashboard（样本：MRR $8.2K、"300 active subscribers"、"5-10 new trials daily"）。**无评论区**（2.0 整站砍掉）。
2. **主库 /data**：表格产品（Rows/Cards 双视图），口号 "real businesses · real revenue · **cited**"。顶部 **"ASK THE DATA" 自然语言查询框**（示例 "Fitness brands making $20K+/mo"）。筛选：营收区间 / 启动成本区间 / "Solopreneur Score" 排序。字段：IDEA / REVENUE / REV PER EMPLOYEE / HOW GREW / BUILT WITH / SOLO SCORE（0-100）+ 每行 "Build this" 按钮（跳 build.starterstory.com 自家建站工具）。
3. **付费墙边界**：免费看 100 行（"Showing 100 of 3,016 ideas"）+ 单条详情页全免费；第 100 行后 "🔓 Create a free account to see all the data…"（邮箱/Google 注册墙）；**会员价目藏到 /checkout 才 reveal**，页面唯一价格痕迹 = 证言 "$100 Starter Story membership"。
4. **详情页 /businesses/**：**AI 编研档案**，Tabs=Overview/Revenue/Monetization/Growth/Founders/Tools。声明逐字："Starter Story's AI research system compiled this page from 23 public sources — **the founder didn't write it**"；营收标注 "Est. Monthly Revenue ~$650K/mo … Triangulated from 1 public source"；Launched 10 years ago / Updated 18 days ago。
5. **分类页 /data/micro-saas-ideas**：与 /data 同一套表格 app-shell，**薄内容**（无 h2、无 meta description，仅 title+canonical）；比主表多 Monthly Traffic、Rev/visitor 两列；Growth 渠道下拉 taxonomy 约 100 值。服务器渲染表格 HTML（curl 可直取）。
6. **/about**：仅 2,586 字符 FAQ 式；团队规模/流量未披露。流量线索散落处：newsletter 自报 "200,000+ founders"、/join 计数器 "12,568 builders building"、"$10B+ worth of real businesses"。

## 三、商业模式

- **2026-02 起：HubSpot 子公司**。变现拼合（无单一自述页）：母公司输血+导流（站内多处 HubSpot CTA + lead magnet）+ 会员制（价格不透明，~$100 痕迹）+ Affiliate（about 页披露）+ Academy + Build 建站工具。
- 内容侧全免费化（"Free."）：单集视频、全文 transcript、单条档案全开放；账号墙只拦「批量浏览」。
- 历史演化（记忆性背景，**未当场核实**）：2017 访谈博客起家 → 曾转付费会员 → 收购后 2.0 重构。坐实需 Wayback（本网络 2026-09-23 实测不可达，见 precedent-products.md）。

## 四、数据可信度评估

**裁定：诚实的二手数据生意——标注做得好，但「Verified」≠ 验证。**

- 两条数据血缘链都外显：访谈数挂 tooltip "Self-reported by the founder in a Starter Story case study"；AI 编研数挂 "from N public sources" + 页脚免责 "It is not financial advice and does not guarantee any income or results"。
- 内部口径打架三处：3,016（/data）vs 3,032（页脚）；episodes 卡片 "$69K/Month" 标题 vs "$10K/mo" 标签；"$4B+/mo combined" vs "$10B+ worth"（且 $4B/mo 与中位数分布推不平——营销口径）。
- 结论：对读者的价值是「量+可检索+诚实标注」，不是数据审计。

## 五、AI 可发现性（四件套实测）

| 项 | 状态（2026-09-28） |
|---|---|
| llms.txt | **404，不存在** |
| robots.txt | 200；`User-agent: * Allow: / Disallow: /admin` + Twitterbot 单独条款；**无任何 AI 爬虫（GPTBot/ClaudeBot 等）条款** = 默认全开 |
| sitemap | 19,342 URL（构成见 §二） |
| RSS | **死**：/feed.xml、/rss、/feed 全 404，首页无 alternate 声明——收购后放弃订阅渠道 |

## 六、对本项目的启示

**定位差异先立住**：Starter Story 聚合「别人的已验生意」（供给=外部创始人+公开来源，单位=生意/营收数据）；本站发布「自己的未验想法」（供给=本人，单位=想法原文+可玩 demo）。同属 idea 经济，供给方向相反，不构成正面竞争。

1. **数据血缘声明外显可直接搬**：它用两层标注（自报 tooltip / AI 编研来源数）换可信感。本站 demo 由 AI 生成，lineage json 目前是内部资产——**缺一行面向访客的白话声明**（「本 demo 由 X 模型生成，人验过 Y 项」）。落位可在协议 v0.3 加展示面条款或 detail 页模板补槽位。**（2026-09-30 回销：已由协议 v0.5 §2 血统外显条款收口——落位裁=demo 页内自显生成方式行、非 detail 页槽位；三跑起 footer_line_present 构建断言执法）**
2. **AI 编研档案 = 内容规模化解法**：584 个 /businesses 页由 AI 从公开来源批量编研、持续更新。本站想法页扩量可借：demo 机器生成 + 档案 AI 编研 + 人裁骨架（与坟场评审 5 人格流水线同构，经验可复用）。
3. **llms.txt/RSS 双缺席是大站留的空档**：它押 1.9 万 URL sitemap，不做 llms.txt 不做 RSS。本站小体量反着来（llms.txt + .md 镜像已做 Q2）——AI 发现通道上小站反而是差异化便宜货。
4. **付费墙边界设计参考**：单条内容全免费、只对「批量/工具层」设账号墙。对本站：想法页永远全开，未来若有收费面也应在聚合/工具层，不在内容层。
5. **ASK THE DATA 自然语言查询**是新一代站内搜索形态；本站搜索现为关键词制，条目上量后值得加「问一句」入口。
6. **整站砍评论区**：反响走社交外溢。对本站「留反响」定位的提醒——结构化反响（giscus 已规划/坟场评审槽位）比开放式评论更值得维护。

---

## 来源清单（全部 2026-09-28 实测）

| 来源 | 类型 | 时点 |
|---|---|---|
| https://www.starterstory.com/ | 浏览器实机快照（首页，主线程） | 2026-09-28 |
| /stories/i-failed-for-700-days-before-my-app-hit-10k-month | 浏览器实机 + 截图 story-page.png | 2026-09-28 |
| /data、/data/micro-saas-ideas | 浏览器实机 + 截图 data-page.png / category-page.png | 2026-09-28 |
| /businesses/callhippo、/about、/join | 浏览器实机 | 2026-09-28 |
| /llms.txt、/robots.txt、/sitemap.xml、/feed.xml 等 | curl 直取 | 2026-09-28 |
| 百度搜索 startstory（对象识别） | 搜索结果页 | 2026-09-28 |
