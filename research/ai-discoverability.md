# AI 可发现性调研：solo 独立站如何让人类和 AI 都能发现并查询内容

- 调研日期：2026-09-23
- 目标读者：solo 开发者，站点 = 想法（文章）+ demo，希望被搜索引擎、聊天机器人、answer engine、AI agent 同时发现和查询
- 方法与局限：一手抓取 llmstxt.org、agents.md、darkvisitors.com、developers.cloudflare.com（curl 直读）；GitHub 走 api.github.com / raw.githubusercontent.com；调研后半程用户开启本地代理（127.0.0.1:12334）后补齐了 **platform.openai.com/docs/bots 与 docs.perplexity.ai 的官方一手来源**（含两站的 .md 版页面）。仍未能一手复核的只有：openai.com 发布公告原文（403/500）、docs.claude.com 爬虫页（区域封锁）、Perplexity Search Console 界面——相关条目已标置信度，未验证项绝不写成确定事实。

---

## ① llms.txt / llms-full.txt

**一句话**：放在网站根目录的一个 markdown 文件，相当于「给 AI 看的站点导览页」——H1 站名 + 一段摘要 + 分节链接清单，AI 先读它再按需点链接。

**现状（2026-09，一手来源，高置信）**：来源 https://llmstxt.org/（作者 Jeremy Howard，2024-09-03 发布，**v2 修订于 2026-08-10**）：

- 规范原文自述采用情况：「数千站点发布 llms.txt，文档平台自动生成，Chrome Lighthouse 把它纳入 agentic browsing 审计项；OpenAI、Anthropic、Gemini 自己的开发者文档都发布了 llms.txt」。
- **本次一手交叉验证（2026-09-23）**：OpenAI 平台文档爬虫页页首自述「complete documentation index, see llms.txt；Markdown 版页面 = 原 URL 加 `.md`」（`platform.openai.com/docs/bots.md`）；Perplexity 文档站每个页面页首都有「Fetch the complete documentation index at llms.txt」引导（`docs.perplexity.ai/docs/resources/perplexity-crawlers.md`）——即 v2 的「llms.txt + 每页 .md 镜像」约定已被两大 AI 厂商自家文档落地。Cloudflare 文档站同样发布 llms.txt / llms-full.txt（导航一手确认）。
- v2 新增：① 每个页面可在同 URL 提供 markdown 版（`page.md` 或 `page.html.md`）；② 用标准 link relation 声明：`rel="alternate" type="text/markdown"` 指向页面 md 版、`rel="describedby"` 指向覆盖它的 llms.txt（HTML `<link>` 或 HTTP `Link:` 头均可，后者可在 CDN 层加）。
- 规范原文明确与存量标准共存：sitemap 列全量页面给搜索引擎，llms.txt 给 LLM 精选导览；可补 robots.txt 之不足。

**格式（规范原文模板）**：

```markdown
# 站点/项目名          ← 唯一必需项（H1）
> 一句话摘要（blockquote），含理解后文所需的关键信息
任意补充段落（不能含标题）
## 分节名
- [链接标题](https://url): 可选说明
## Optional
- [次要链接](https://url)   ← 约定：短上下文时 agent 可跳过
```

**llms-full.txt**：规范本体只定义 `llms.txt`；`llms-full.txt`（把全站内容并入一个大 md 文件）是生态惯例——Cloudflare 官方文档站同时发布 `llms.txt` 和 `llms-full.txt`（在 developers.cloudflare.com 导航中可见，一手确认），Firecrawl 的 llmstxt-generator（firecrawl/llmstxt-generator，537★，api.github.com 2026-09-23）两种都生成。高置信。

**成本**：手写 10–30 分钟，纯静态文件，零依赖、零运行成本。可放到根 `/llms.txt` 或子路径（如 `/docs/llms.txt` 只覆盖该路径）。

**置信度提示**：各 AI 产品（ChatGPT/Claude/Perplexity）是否在检索链路里读 llms.txt，官方均无公开承诺——把它当「低成本增量」而非替代品。中置信。

---

## ② agents.md（AGENTS.md）

**一句话**：放在（代码）仓库根目录、给 AI 编码 agent 看的说明文件——「README for agents」，写构建/测试命令、代码风格、注意事项。

**现状（2026-09，一手来源，高置信）**：来源 https://agents.md/：

- 自称 **60k+ 开源项目**在用；GitHub、openai/codex（仓库里有 88 个 AGENTS.md）、apache/airflow 等均为展示案例。
- 支持的工具清单（官网列出）：OpenAI Codex、Google Jules、Gemini CLI、Cursor、GitHub Copilot coding agent、Devin、Windsurf、Aider、Zed、Warp、VS Code、Junie（JetBrains）、Amp、opencode、goose 等。
- 治理：由 Linux Foundation 旗下 Agentic AI Foundation 托管。
- 格式：纯 markdown，**无必填字段**；monorepo 可嵌套，目录树中离被改文件最近的那个优先；用户聊天指令 > 文件内容。

**关键辨析（对本研究重要）**：AGENTS.md 是**代码仓库给编码 agent** 的标准，**不是**「网站给 web agent 的 robots.txt 升级版」。你的独立站本身放 AGENTS.md 没有消费者；但你的 demo 代码仓库放一个，能让 Codex/Cursor/Copilot 用户（和帮你维护的 agent）更好用地理解项目——间接提升 demo 的可复现性。高置信。

**成本**：5–15 分钟一个 md 文件，零依赖。

---

## ③ robots.txt 对 AI 爬虫的放行与阻止

**一句话**：robots.txt 按.User-agent 名字前缀匹配控制各 AI 爬虫；想让 AI 搜到你就要放行「搜索/实时抓取类」bot，不想被拿去训练就只封「训练类」bot——两类是不同 UA，可以分开对待。

**主流爬虫清单（2026-09）**：一手来源：OpenAI 官方爬虫文档 `platform.openai.com/docs/bots.md`（2026-09-23 经代理直读）+ Perplexity 官方爬虫文档 `docs.perplexity.ai/docs/resources/perplexity-crawlers.md`（同日直读）+ Dark Visitors agent 目录（https://darkvisitors.com/agents ，每日更新的爬虫数据库）。Anthropic 官方页区域封锁未能直读，其 UA 名以 Dark Visitors 交叉验证（高置信）：

| 用途 | User-agent | 归属 | 一手要点（官方原文） |
|---|---|---|---|
| **搜索索引（answer engine 走这类）** | `OAI-SearchBot` | OpenAI | 「用于让网站出现在 ChatGPT 搜索结果中；**封了它 = 不出现在 ChatGPT search 答案里**（仍可作为导航链接出现）」；IP 段公开于 openai.com/searchbot.json |
| 训练 | `GPTBot` | OpenAI | 「抓取内容可能用于训练基础模型；封它 = 不用于训练」——与 OAI-SearchBot **各自独立**，可只放搜索、只封训练 |
| 用户实时抓取 | `ChatGPT-User` | OpenAI | 用户发起的抓取，「robots.txt 规则可能不适用」，不影响能否出现在 Search |
| 广告验证 | `OAI-AdsBot` | OpenAI | 只访问投广落地页 |
| **搜索索引** | `PerplexityBot` | Perplexity | 「让网站出现在 Perplexity 搜索结果并带链接；**不用于 AI 基础模型训练**」；IP 段公开于 perplexity.ai/perplexitybot.json |
| 用户实时抓取 | `Perplexity-User` | Perplexity | 用户发起，「**通常无视 robots.txt**」 |
| 训练 | `ClaudeBot` | Anthropic | 官方页未直读；Dark Visitors 交叉验证 |
| 搜索索引 | `Claude-SearchBot` | Anthropic | 同上 |
| 训练开关（产品 token，非爬虫） | `Google-Extended` | Google | 控制 Gemini/Vertex 训练；Google 系搜索仍看 `Googlebot` |
| 训练 | `CCBot` / `Bytespider` / `meta-externalagent` / `Applebot-Extended` / `Amazonbot` | Common Crawl / 字节 / Meta / Apple / Amazon | Dark Visitors 目录 |
| 搜索索引 | `Googlebot` / `Bingbot` / `DuckAssistBot` | Google（AI Overviews 也用主爬虫）/ Microsoft / DuckDuckGo | Dark Visitors 目录 |

官方细节（两家均一致）：robots.txt 变更约 **24 小时**生效；OpenAI 提示若同时放行 OAI-SearchBot 和 GPTBot，可能复用同一次抓取结果；Perplexity 另外给了 Cloudflare 等 WAF 白名单配置指引（UA + IP 段）。

注意：**真浏览器型 agent**（Dark Visitors 分类里的 ChatGPT Agent、Google-Mariner、Manus-User、NovaAct 等）用真实浏览器访问，robots.txt 对其无约束力（一手确认自 Dark Visitors 目录分类）。

**推荐写法（solo 站默认开放）**：

```text
User-agent: *
Allow: /

# 只想拒绝"拿去训练"时才加这些（不想拒绝就整段省掉）：
# User-agent: GPTBot
# Disallow: /
# User-agent: ClaudeBot
# Disallow: /
# User-agent: Google-Extended
# Disallow: /

Sitemap: https://example.com/sitemap.xml
```

**风险注记**：用户发起型抓取器（ChatGPT-User / Perplexity-User）按官方文档就**不受 robots.txt 约束**；Perplexity 2024 年还被多家媒体报道过索引爬虫不完全遵守 robots.txt。封禁不是 100% 保证。中高置信。

**成本**：10 分钟，零依赖。每家都提供了官方验证方式（如 OpenAI 的 bot IP 列表），个人站一般用不上。

---

## ④ 传统可发现性对 AI 仍然生效（而且是最基本盘）

**一句话**：answer engine 的检索层基本还是经典 SEO 那一套——可抓取的干净 HTML、sitemap、结构化数据、外链；AI 是在传统索引之上做问答，不是另起炉灶。

- **sitemap.xml**：sitemaps.org 标准；在 robots.txt 加 `Sitemap:` 行。静态站生成器（Hugo/Astro/Next export）全内置。成本≈0。
- **JSON-LD / schema.org**：页面 `<head>` 里嵌 `@context: https://schema.org` 的 JSON-LD，个人站常用类型 `Person`、`WebSite`、`Article`（博客文）、`SoftwareApplication`（demo）。对 AI 的价值：实体消歧（这个"cheng"是谁、这个 demo 叫什么版本）。Google 富结果与 AI 功能都以其为输入。高置信（schema.org 是长期标准；具体某 AI 产品用到何种程度不公开，中置信）。
- **OG 标签**（ogp.me）：`og:title/og:description/og:image`，分享卡片 + 所有爬虫的摘要。成本≈0。
- **RSS**：最老最稳的机器可读内容流，大量 AI 工具/聚合器至今只吃 RSS。静态生成器内置。成本≈0。
- **服务端渲染/静态 HTML**：JS-only 渲染的站点对多数爬虫仍是黑洞。个人静态站天然没问题。
- 佐证：llms.txt 规范原文自述定位是「与 sitemap/robots 互补」（一手，见①）。

**成本**：用静态站生成器时全部内置，配置 1–2 小时，零运行成本。

---

## ⑤ ChatGPT Search / Perplexity 实际怎么收录小站

**一句话**：两家都提供官方爬虫开关决定你能否出现在其答案里——ChatGPT 看 `OAI-SearchBot`、Perplexity 看 `PerplexityBot`（均为一手确认）；检索层与 Bing 索引关系密切，所以小站最高杠杆动作是放行这两个 bot + 免费进 Bing 索引。

- **ChatGPT Search**（2024-10-31 发布）：
  - 一手（platform.openai.com/docs/bots.md，2026-09-23）：`OAI-SearchBot` 的 robots.txt 开关**直接决定**站点是否出现在 ChatGPT search 答案中（封了仍可作为导航链接出现）；它不是训练爬虫。→ 站长必做：robots.txt 放行 OAI-SearchBot（见③）。
  - Bing 关系：2024 发布期官方与微软说明 ChatGPT search 检索层「结合 Bing 与自有爬虫」——本次未能从一手页面复核到原话（openai.com 公告 403，存档页正文无 "Bing" 字样），**中高置信**（多家 2024–2025 媒体一致报道 + 训练知识）。务实结论：**进 Bing 索引（Bing Webmaster Tools 免费提交 + IndexNow）= 进 ChatGPT Search 候选池**，此结论本身被广泛实践。中高置信。
- **Perplexity**：
  - 一手（docs.perplexity.ai/docs/resources/perplexity-crawlers.md，2026-09-23）：官方对站长的全部指引 = 放行 `PerplexityBot` + （可选）按其公开 IP 段配 WAF 白名单；明确声明 PerplexityBot **不用于基础模型训练**。旧指南 docs.perplexity.ai/guides/getting-indexed 现已 404（一手确认），现行指南即上述爬虫页。
  - Perplexity Search Console（`search.perplexity.ai/search-console`，提交站点/sitemap）：多个第三方 2025 报道提及，**未能一手验证**（界面需登录），中置信，采用前自行打开确认。
  - 「自建索引 + Bing 兜底」：训练知识与公开报道，中高置信。
- **通用结论**：对小站而言收录路径 = 可抓取的 HTML + sitemap + robots.txt 放行搜索类 bot + 少量外链（AI 检索同样用链接信号）+ 主动提交（Bing WMT / IndexNow / Perplexity Search Console）。不需要为 ChatGPT 单独做提交通道。中高置信。

---

## ⑥ 把站点内容暴露成 MCP server

**一句话**：MCP（Model Context Protocol，Anthropic 开源标准）让你的站点变成 AI 客户端（Claude、Cursor、VS Code 等）可直接调用的「工具/资源服务器」——用户在 AI 里问「这个站有什么 demo」时，AI 真的能查。

**现状（一手来源，高置信）**：Cloudflare Agents 文档 https://developers.cloudflare.com/agents/model-context-protocol/ （页面标注更新 2026-06-03，2026-09-23 直读）：

- Cloudflare 支持部署**远程 MCP server**：Streamable HTTP 传输 + OAuth 授权，跑在 Workers/Agents 上；官方给了完整脚手架（「Build a Remote MCP Server」指南、McpAgent API）。文档还给了最佳实践：少而精的工具优于全 API 包装。
- 顺带的信号：Cloudflare 自己的文档站发布了 `developers.cloudflare.com/agents/llms.txt` 与 `llms-full.txt`（页面导航一手确认）——大厂同时用 llms.txt + MCP。

**现成开源方案（api.github.com 验证，2026-09-23）**：

| 方案 | 星数 | 是什么 |
|---|---|---|
| langchain-ai/**mcpdoc** | 1035★ | 把任意网站的 llms.txt 暴露成 MCP server 供 IDE/客户端查询——**已有 llms.txt 的站几乎零改造就能被 MCP 化** |
| invertase/**docs.page** | 675★ | 从 GitHub 分支直接托管 markdown 文档，自带 AI chat + MCP |
| AnswerDotAI/**llms-txt** | 2628★ | llms.txt 规范库 + Python CLI（生成/校验） |

**成本**：Cloudflare Workers 免费档对个人站绰绰有余（具体额度以官方 pricing 页为准，`developers.cloudflare.com/workers/platform/pricing/`，2026-09-23 直读成功但本报告不抄具体数字；历史上免费档为 10 万请求/天量级，中置信）。时间：跟随官方模板半天到一天。纯静态站也可行——内容本来就是 markdown，Worker 只做薄查询层。

**v1 就做的意义**：MCP 不急于 v1；先有 llms.txt（mcpdoc 可直接吃），后续再加自建 MCP。

---

## ⑦ 开源「跟我的网站对话」组件（已验证）

**一句话**：要「访问者在你站上直接问 AI 关于你内容的问题」，开源路线三条：全功能自托管聊天 UI（lobe-chat）、一键部署轻量聊天（NextChat）、带检索的文档 RAG（kotaemon / DocsGPT）——都已验证支持自定义 OpenAI 兼容 endpoint。

**验证方式**：raw.githubusercontent.com 直读 README（2026-09-23），配置项为 README 原文。

1. **lobehub/lobe-chat** — 自托管全功能聊天 UI（docker 一条命令；UI 内可图形化配置多 provider）
   - 自定义 endpoint：环境变量 `OPENAI_PROXY_URL` 覆盖 OpenAI API base URL（README L277，示例值 `https://aihubmix.com/v1` 等）→ 任何 OpenAI 兼容网关/中转/本地 vLLM 都能接。另支持大量内置 provider。
   - 适合：想要一个功能完整、能挂知识库的站内聊天站。成本：一台 VPS 或 docker，半小时起步。
2. **ChatGPTNextWeb/NextChat** — 最轻的 Vercel 一键部署聊天
   - 自定义 endpoint：环境变量 `BASE_URL`（README L183，默认 `https://api.openai.com`，可指 `http://your-openai-proxy.com`）+ `OPENAI_API_KEY` + `CODE`（页面访问码）。Vercel 免费档可跑。
   - 适合：零服务器预算、只要一个能问问题的聊天入口。成本：15 分钟。
   - 注：本身是独立聊天应用不是嵌入式 widget；可用 iframe 方式嵌，官方不主打此场景（中置信）。
3. **Cinnamon/kotaemon**（25779★，api.github.com 验证）— RAG 文档问答 UI（Gradio）
   - 自定义 endpoint：设置 UI 里配置 LLM/Embedding provider（OpenAI、AzureOpenAI、Ollama、Groq 等，README L58/L71/L81 一手确认）；docker `ghcr.io/cinnamon/kotaemon:latest`。
   - 适合：「跟站上全部文档对话 + 引用溯源 + PDF 预览高亮」的认真 RAG 场景。成本：docker + 一个 embedding 模型，1–2 小时。
   - 补充选项 **arc53/DocsGPT**（18284★，MIT，2026-09-22 仍在活跃推送，api.github.com 验证）：主打文档 QA 且提供**可嵌入网站的 widget**（嵌入方式中置信，README 未在本次直读范围内，采用前自查其 docs）。

**推荐 top3**：lobe-chat（最灵活）、NextChat（最省）、kotaemon（要检索就选它）。

---

## 机制清单（速查表）

| 机制 | 一句话 | 怎么做（文件/格式） | 成本 |
|---|---|---|---|
| llms.txt | 给 AI 的站点导览页 | 根目录 markdown：H1+摘要+H2 分节链接清单（模板见①） | 10–30 分钟，静态零成本 |
| llms-full.txt | 全量内容单文件版 | 生成器：firecrawl/llmstxt-generator 或脚本拼接 | 同上 |
| 页面 .md 镜像 | 每页同 URL 出 markdown | `page.md` + `rel="alternate" type="text/markdown"`；`describedby` 指向 llms.txt | 生成器内置/CI 一段脚本 |
| AGENTS.md | 给编码 agent 的 repo 说明 | demo 仓库根目录纯 markdown | 5–15 分钟 |
| robots.txt | 分 UA 放行/封禁 | 放行 OAI-SearchBot/Claude-SearchBot/PerplexityBot/Googlebot/Bingbot；训练类按需封 | 10 分钟 |
| sitemap/RSS/OG/JSON-LD | 传统机器可读基本盘 | 生成器内置 + 每页一段 JSON-LD（Person/WebSite/Article/SoftwareApplication） | 1–2 小时配置 |
| Bing WMT + IndexNow | 免费进 Bing 索引（ChatGPT Search 候选池） | bing.com/webmasters 提交 + IndexNow key | 30 分钟 |
| Perplexity Search Console | 主动进 Perplexity 索引 | search.perplexity.ai/search-console 提交 sitemap（中置信） | 10 分钟 |
| MCP server | AI 客户端直接查询站点 | Cloudflare Agents 远程 MCP（Streamable HTTP+OAuth）或 mcpdoc 直接吃 llms.txt | 半天–一天，免费档 |
| 开源对话组件 | 站内「问 AI」入口 | lobe-chat / NextChat / kotaemon，均支持 OpenAI 兼容 endpoint（见⑦） | 15 分钟–2 小时 |

---

## 「最小 AI 可查独立站」规格

**v1（纯静态、零运行成本，约 1 天）**：

1. 静态生成器出干净 HTML（SSG 自带：sitemap.xml、RSS、OG）
2. 手写 `/llms.txt`（H1 站名 + 摘要 + Ideas/Demos 两节链接）；内容多再加 llms-full.txt
3. robots.txt：`Allow: /` 全放行 + `Sitemap:` 行（solo 站默认不封训练类，换最大暴露）
4. 每页 JSON-LD：`Person` + `WebSite`，文章加 `Article`，demo 加 `SoftwareApplication`
5. Bing Webmaster Tools 提交 + 开 IndexNow（一箭双雕：Bing + ChatGPT Search 候选池）
6. demo 代码仓库加 AGENTS.md
7. （可选 10 分钟）Perplexity Search Console 提交 sitemap

**v2（加对话与 MCP，0 元到小额）**：

1. 用 langchain-ai/mcpdoc 把现有 llms.txt 直接变成 MCP server；或跟 Cloudflare 官方模板在 Workers 免费档部署一个远程 MCP（tools 如 `search_ideas`、`get_demo_info`，内容来自 markdown）
2. 嵌「问 AI」入口：DocsGPT widget（嵌入向）或自托管 NextChat（Vercel 免费）/ lobe-chat（VPS），endpoint 指向自选的 OpenAI 兼容服务
3. 内容量大后升级 kotaemon 做带引用溯源的 RAG

---

## 来源清单（除标注外均为 2026-09-23 直读成功）

1. llms.txt 规范 v2 — https://llmstxt.org/ （Jeremy Howard，2024-09-03 发布 / 2026-08-10 修订；curl 直读）
2. AGENTS.md 官网 — https://agents.md/ （Linux Foundation / Agentic AI Foundation；curl 直读）
3. **OpenAI 官方爬虫文档（一手）** — https://platform.openai.com/docs/bots 及其 `.md` 版（本地代理 127.0.0.1:12334 抓取）
4. **Perplexity 官方爬虫文档（一手）** — https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md ；及其 llms.txt 索引 https://docs.perplexity.ai/llms.txt （代理抓取；旧指南 /guides/getting-indexed 已 404）
5. Dark Visitors agent 目录 — https://darkvisitors.com/agents （每日更新的 AI 爬虫数据库；curl 直读）
6. Cloudflare Agents MCP 文档 — https://developers.cloudflare.com/agents/model-context-protocol/ （更新 2026-06-03；curl 直读）
7. Cloudflare Workers 定价 — https://developers.cloudflare.com/workers/platform/pricing/ （curl 直读，未抄具体数字）
8. GitHub（api.github.com / raw.githubusercontent.com，2026-09-23）：AnswerDotAI/llms-txt（2628★）、langchain-ai/mcpdoc（1035★）、firecrawl/llmstxt-generator（537★）、invertase/docs.page（675★）、Cinnamon/kotaemon（25779★）、arc53/DocsGPT（18284★，MIT，最后推送 2026-09-22）；lobehub/lobe-chat 与 ChatGPTNextWeb/NextChat 的 README（配置项原文已核，星数未查）
9. 未能一手直读、以训练知识 + 交叉验证引用（正文中已标置信度）：ChatGPT search 发布公告 https://openai.com/index/introducing-chatgpt-search/ （2024-10-31；直连 403、存档页正文无 "Bing" 字样，Bing 关系按中高置信处理）；Anthropic 爬虫文档（docs.claude.com 区域封锁）；Perplexity Search Console https://search.perplexity.ai/search-console ；schema.org / ogp.me / sitemaps.org / rssboard.org 标准

（调研过程：原预算 ≤25 次搜索/抓取；中途网络受限失败较多，后经用户开代理+Chrome 补抓了关键官方来源，实际请求次数略超预算、换来 OpenAI/Perplexity 一手引用。本文件所有「中置信」条目采用前建议自行打开来源确认。）
