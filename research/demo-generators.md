# 开源「想法 → 可运行 demo/应用」生成工具盘点（选型用）

- 调研时点：**2026-09-23**（所有 GitHub 数据均为当日 API 实拉，下同）
- 使用场景：solo 开发者，Windows 11 + Git Bash + Python(uv)。模型走两家 OpenAI 兼容 API：
  - Agnes AI：`https://apihub.agnes-ai.com/v1`，文本 `agnes-2.5-flash`（512K ctx），免费档 ~20RPM
  - 商汤 SenseNova：由另一 agent 并行调研，本文只要求候选工具**支持自定义 OpenAI 兼容 endpoint**
- 核心判据（①）：能自托管 + 能配自定义 OpenAI 兼容 base_url（写明证据）
- 方法说明：本机 WebFetch 域名校验失败、WebSearch 配额耗尽、r.jina.ai 返回空，故证据全部改走 GitHub API / raw.githubusercontent 一手文件；docs.dyad.ai、docs.onlook.com、docs.openhands.dev 三个文档站无法直抓，相关结论已降置信度标注。
- **复核附注（同日主线程）**：用户开 Hiddify 代理后，Dyad 与 Onlook 两处已用 Chrome DevTools 浏览器直抓官方站补验（见各工具小节「浏览器复核」）；OpenHands 未复核（不在推荐路线）。

## 术语白话（先讲清再用）

- **WebContainer**：在浏览器里直接跑 Node.js 的技术（StackBlitz 出品）。好处：生成的代码不用装环境就能在预览窗里跑起来。
- **生成式 UI / A2UI**：AI 不输出代码，而是输出一份「界面长什么样」的协议数据（JSON），由客户端渲染成真界面。适合聊天式 demo，不适合要源码的场景。
- **BYOK**（bring your own key）：工具不带模型，你自己填 API key。

## 对比表（工具 × 五点）

| 工具 | ① 自托管+自定义 base_url | ② 输出形态 | ③ Windows 可跑性 | ④ License + 活跃度（2026-09-23 实拉） | ⑤ 预览/执行沙箱 |
|---|---|---|---|---|---|
| **bolt.diy** | ✅ 强证据：env `OPENAI_LIKE_API_BASE_URL` + `OPENAI_LIKE_API_KEY`（README 列 "OpenAI-like providers"，.env.example 有原文） | React/全栈 web app（Vite/Next 风格），浏览器内即时预览 | ✅ 好：官方 Windows `.exe` 安装包；也可 Docker 或 pnpm 本跑 | MIT；19.9k★；最后 push **2026-02-07**（约 7 个月未动，活跃度中等偏低） | WebContainer（浏览器内，无需服务器沙箱）；应用本体可选 Docker 跑 |
| **Dyad** | ✅ 强证据（浏览器复核 2026-09-23）：官方 Custom Models 页原文 "Dyad lets you use any AI model or provider, as long as they offer an OpenAI-compatible API"；Settings → AI Providers → Add Custom Provider（填 API Base URL）+ Add Custom Model。文档站实际在 **www.dyad.sh/docs**（docs.dyad.ai 已失效） | React + Vite + Tailwind 全栈 app（Electron 桌面工作台） | ✅ 好：README 明言 "Cross-platform: Easy to run on Mac or Windows"；仓库有 `windowsSign.ts` | Apache-2.0（`src/pro` 为 FSL 1.1 fair-source）；21.6k★；最后 push **2026-09-23（当天）**，最活跃 | 本地进程直跑（应用跑在你机器上），无 Docker/E2B |
| **Onlook** | ❌ 复核维持出局（浏览器 2026-09-23）：README 定位 "now in early access"＋等名单，模型通道仅 OpenRouter/Morph/Relace，无自定义 base_url 入口 | Next.js + Tailwind web app（可视化编辑器） | 中：Electron 桌面应用；依赖列表含 Docker | Apache-2.0；26.8k★；最后 push 2026-08-25。**已转型**：开源编辑器保留，新产品转 hosted 早鸟 waitlist | 本地运行 + Docker（依赖列表） |
| **openv0**（→ `nraiden/openv0`） | 未验证（项目停更，不值得再查） | v0 风格 React UI（shadcn/ui） | 需 Node/Docker（README 未核） | MIT；3.96k★；最后 push **2024-09-19**，停更约 2 年 → **不推荐** | 未核 |
| **gpt-engineer** | 理论可（走 LiteLLM 生态）但项目已死 | 任意语言代码库（CLI 生成整个 project） | Python CLI，Windows 原生可跑 | MIT；55k★；主仓 **archived=true**，最后 push 2025-05-14；gpt-engineer-org 下仓库 2024-06 后无动静 → **不推荐** | 本地文件写入，无执行沙箱 |
| **OpenHands**（`OpenHands/OpenHands`） | ✅ 高置信：`config.toml` 的 `[llm]` 段 `base_url`/`api_key`，model 用 `openai/` 前缀走 LiteLLM（长期如此的标准配置；本次文档站 docs.openhands.dev 未抓到原文，**置信度高但非当日一手**） | 通用 agent：能建项目、改代码、跑命令 | ⚠️ 重：以 Docker 沙箱为主，Windows 走 Docker Desktop + WSL2（仓库有专门 README.windows.md） | MIT；88.9k★；最后 push 2026-09-22，非常活跃 | Docker 容器沙箱（默认本地，可选 VM/云） |
| **screenshot-to-code** | ✅ 强证据：README FAQ 原文 "Set `OPENAI_BASE_URL` in `backend/.env` or directly in the UI in the settings dialog. Make sure the URL has `v1` in the path" | 截图/设计稿 → HTML/React 代码；新版带 agent 自检（headless Chromium） | 中：后端 Python（uv 可跑）+ 前端 pnpm，或 docker-compose 一把梭 | MIT；79.5k★；最后 push 2026-09-09 | 本地进程；agent 预览用 Playwright Chromium（可选） |
| **LlamaCoder** | ❌ 无自定义 endpoint 文档：面向 Together AI + Neon Postgres 的演示站（README 只有 `DATABASE_URL` 等），要接 Agnes 得改代码 | 单个 React 组件（Next.js 站点） | 需 Node + pnpm + Neon 数据库 | MIT；7.1k★；最后 push 2026-09-15（零星维护） | 纯生成无运行沙箱（Vercel 部署型） |
| **Tempo** | — | — | — | ❌ `tempo-sh/tempo` GitHub **404**（2026-09-23 查证）→ 疑似下线/转向闭源，未再深挖 | — |
| **AGenUI / A2UI** | ✅ 强证据（Studio）：`~/.agenui/config.json` 的 `providers[]` 每项都是 OpenAI 兼容 endpoint（`base_url` + `api_key` 字段原文见 playground/studio/README.md），"plus any OpenAI-compatible endpoint"；settings 对话框可视化编辑 | A2UI 协议（Agent-to-UI）：自然语言 → 界面协议 JSON → 原生渲染（Android/iOS/HarmonyOS SDK，C++ core） | Studio：`npx agenui-studio` 本地起（Node）；移动端构建才需要 Android Studio/Xcode | Apache-2.0；1.16k★；最后 push 2026-09-22，活跃 | 本地（"runs entirely on your machine"，README 原文） |
| **轻量路线：LLM 直出 Streamlit/Gradio/Mesop/marimo** | ✅ 天然支持：openai SDK 设 `base_url` 指向 Agnes 即可，无工具层阻力 | 单文件 Python 脚本 → 浏览器打开即用 | ✅ 最好：纯 Python + `uv run`，零 Node/Docker | Streamlit/Gradio 均为 Apache-2.0 且为一等开源项目（常识级事实，**高置信**，未当日核验 star 数） | 本地直跑（`streamlit run app.py` / `marimo edit`） |

## 各工具证据细节（来源 + 原文）

### bolt.diy（原 openbolt）
- 仓库：https://github.com/stackblitz-labs/bolt.diy （MIT，19,900★，pushed_at 2026-02-07T14:36:22Z）
- 自定义 endpoint 证据（.env.example，raw main 分支，2026-09-23 抓）：
  ```
  OPENAI_LIKE_API_BASE_URL=your_openai_like_base_url_here
  OPENAI_LIKE_API_KEY=your_openai_like_base_url_here 同段的 key
  OLLAMA_API_BASE_URL=http://127.0.0.1:11434
  LMSTUDIO_API_BASE_URL=http://127.0.0.1:1234
  ```
- README（同日抓）："19+ AI Provider Integrations … and OpenAI-like providers - and it is easily extended to use any other model supported by the Vercel AI SDK"；"Download the binary for your platform (available for Windows, macOS, and Linux)"、"For Windows: Run the `.exe` installer"、`pnpm electron:build:win`；Docker 与 pnpm 本跑两种方式并存。
- 预览机制：bolt 系产品默认在浏览器 WebContainer 里跑生成代码（无需服务器沙箱）——这是 bolt.new 开源核心的设计（**置信度高**；README 本次 grep 未直接命中该词，docs.bolt.diy 未抓）。
- 结论：**接 Agnes/SenseNova 的首选 GUI 工具**，唯一顾虑是主仓 7 个月没 push（可能有维护放缓风险，社区 fork 生态大）。

### Dyad
- 仓库：https://github.com/dyad-sh/dyad （21,602★，pushed_at 2026-09-23T00:08:51Z = 调研当天，最活跃）
- README（2026-09-23 抓）："Cross-platform: Easy to run on Mac or Windows."；License 双轨：`src/pro` 外 Apache-2.0，`src/pro` 内 FSL 1.1（fair-source，商用限制）。
- org 仓库佐证模型层可插拔：https://github.com/dyad-sh/ollama-ai-provider-v2 （"Vercel AI Provider for running LLMs locally using Ollama"，pushed 2025-08-17）。
- 仓库内 `docs/` 全是工程文档；用户文档站真身是 **www.dyad.sh/docs**（docs.dyad.ai 域名连不上、docs.dyad.sh 是 GitHub Pages 404）。
- **浏览器复核（2026-09-23，主线程 Chrome 直抓）**：`/docs/guides/ai-models/custom-models` 原文——"Dyad lets you use any AI model or provider, **as long as they offer an OpenAI-compatible API**."；操作路径：Settings → AI Providers → **Add Custom Provider**（ID + Display Name + **API Base URL**）→ 该 provider 页底部 **Add Custom Model**（Model ID 须与 API 文档完全一致 + Context Window 等按文档填）。另证活跃度：v1.16.0 发布于复核前 1 天。
- 结论（复核后升级）：**判据① 一手证据坐实，置信度高**；产品形态最适合 solo（本地 Electron、app 本地直跑、Windows 友好）。

### Onlook
- 仓库：https://github.com/onlook-dev/onlook （Apache-2.0，26,791★，pushed_at 2026-08-25T01:06:22Z）
- README（2026-09-23 抓）：自我定位已变——"The design tool for AI-native designers — now in early access"（新产品转 hosted waitlist）；"This is the open-source visual editor that started Onlook (Next.js + TailwindCSS)"；致谢区列 OpenRouter / Morph / Relace / Docker。
- **浏览器复核（2026-09-23，主线程 Chrome 直抓 GitHub README）**：定位 "The design tool for AI-native designers — **now in early access**" ＋ "Join the waitlist"；模型相关只列 OpenRouter（LLM）、Morph Fast Apply、Relace，全文无自定义 base_url 入口。
- 结论（复核后定案）：**判据① 不过，出局**；且新产品转 hosted waitlist，与「自托管+自有模型」方向相悖。

### openv0（v0 开源复刻代表）
- 原地址 raidan00/openv0 已 404，现名 https://github.com/nraiden/openv0 （MIT，3,956★，pushed_at **2024-09-19**）。
- 停更约 2 年。同类复刻（如 insprd/openv0-react-modelfarm 等）均为玩具级。**整条 v0 复刻路线 2026 年已凉**（置信度高：搜索结果前三均 2024-2025 后无动静）。

### gpt-engineer
- gpt-engineer-org/gpt-engineer → 301 重定向回 https://github.com/AntonOsika/gpt-engineer ：**archived=true**，MIT，55,089★，pushed_at 2025-05-14T10:15:10Z。
- gpt-engineer-org 组织下活跃仓库最新 push 2024-06-08（gpte-bench-template），gptengineer.app 仓已归档（2024-04）。
- 结论：**已死项目**，不推荐选型。

### OpenHands（原 OpenDevin）
- 仓库：https://github.com/OpenHands/OpenHands （MIT，88,866★，pushed_at 2026-09-22T20:38:00Z，极活跃；原 All-Hands-AI/OpenHands 已 301 迁移）
- README（2026-09-23 抓）："It runs locally on your machine by default, but can connect to multiple agent backends, e.g. running agents in Docker containers, on VMs…"；"Docker: Docker Desktop on macOS/Windows"；有专门 `README.windows.md`（Windows PowerShell 启动命令）。
- 自定义 endpoint：`config.toml` `[llm]` 段配 `model = "openai/xxx"` + `base_url` + `api_key`（LiteLLM 约定）。**置信度高**（该机制多年稳定、社区广泛引用），但本次 docs.openhands.dev 原文未抓到，标非当日一手。
- 结论：功能最全但零件最多（Docker/WSL2），对「快速出可展示 demo」偏重，适合当通用 agent 底座备选。

### screenshot-to-code
- 仓库：https://github.com/abi/screenshot-to-code （MIT，79,542★，pushed_at 2026-09-09T17:27:34Z）
- README FAQ（2026-09-23 抓，逐字）：**"How can I configure an OpenAI proxy? … configure the OpenAI base URL to use a proxy. Set `OPENAI_BASE_URL` in `backend/.env` or directly in the UI in the settings dialog. Make sure the URL has `v1` in the path"** —— 对 Agnes `…/v1` 正好匹配。
- 运行：后端 Python + 前端 pnpm 手跑，或 `docker-compose up -d --build`；Windows 有 .env UTF-8 编码注意事项（README 明示用 Notepad++ 转 UTF-8）。
- 新版带 agent 自检：Playwright 装 Chromium 后，agent 能自己渲染生成页并视觉检查（"Screenshot preview … headless browser"，README 原文）。
- 定位注意：它是「设计稿/截图 → 代码」，不是「想法 → app」；适合当 UI 重建环节的补充件。

### LlamaCoder
- 仓库：https://github.com/Nutlope/llamacoder （MIT，7,130★，pushed_at 2026-09-15T09:37:09Z）
- README（2026-09-23 抓）只有 `DATABASE_URL`（Neon Postgres）等配置，绑定 Together AI。无自定义 base_url 入口 → **判据①不过**（要接 Agnes 需改源码）。
- 定位：Together 的演示项目，输出单个 React 组件，不适合本场景选型。

### Tempo
- `tempo-sh/tempo` GitHub API 返回 **Not Found**（2026-09-23 两次查证）。项目疑似下线或转闭源，未再消耗预算深挖。同类需求由 bolt.diy/Dyad 覆盖。

### AGenUI / A2UI（生成式 UI 路线）
- 仓库：https://github.com/AGenUI/AGenUI （Apache-2.0，1,164★，pushed_at 2026-09-22T03:44:47Z，活跃）
- README（2026-09-23 抓）："AGenUI Studio is a local, **bring-your-own-key** workbench that turns natural-language descriptions into renderable A2UI protocol … supports multiple LLM providers (DeepSeek, Qwen, GLM, OpenAI, Gemini, and more) and runs entirely on your machine."
- playground/studio/README.md（同日抓，逐字）："**BYOK multi-model** — DeepSeek, Qwen (DashScope), GLM (Zhipu), Moonshot, MiniMax, OpenAI, Gemini, Anthropic, OpenRouter, **plus any OpenAI-compatible endpoint**."；配置文件 `~/.agenui/config.json`，"Each entry under `providers` is an OpenAI-compatible endpoint"，字段表：`base_url` = "OpenAI-compatible API base URL"、`api_key` = "Your API key (kept local, never uploaded)"；也可在应用 settings 对话框里增删 provider。
- 启动：`npx agenui-studio`（默认 8765 端口）；核心是 Python server + React 前端。
- 定位：输出是「协议渲染的原生界面」（移动端为主），不是传统 web app 源码 —— 做聊天式/移动端 demo 很亮眼，做常规 web 产品不合适。

### 轻量路线：LLM 直出 Streamlit / Gradio / Mesop / marimo
- 无需专门工具：openai SDK `base_url="https://apihub.agnes-ai.com/v1"` + 一段提示词模板（要求模型只输出一个完整可跑的 `app.py`），落盘后 `uv run streamlit run app.py`（或 `uv run marimo edit app.py`）。
- 框架参考：Streamlit https://docs.streamlit.io 、Gradio https://www.gradio.app/docs 、marimo https://github.com/marimo-team/marimo 、Mesop https://github.com/google/mesop （均为开源 Python 应用框架，Apache-2.0 量级；**license 具体条目未当日逐一核验**，常识级高置信）。
- 优点：零件最少、Agnes 20RPM 完全够、Python 生态（pandas/matplotlib）对数据类 demo 最顺手；缺点：没有「应用产品感」，复杂多文件工程不擅长。

## Top3 推荐路线

### 路线 A（轻量，最少零件）：Agnes 直出 Streamlit/marimo 单文件 + uv
- **接入方式**：openai Python SDK（uv 依赖）设 `base_url=https://apihub.agnes-ai.com/v1`、`api_key`、`model="agnes-2.5-flash"`；写一个 30 行驱动脚本（或直接用 Claude Code 当驱动器），提示词固定输出格式「只给一个 app.py，不要解释」；`uv run --with streamlit streamlit run app.py`。
- **上手成本**：≤ 半小时。零 Node、零 Docker。
- **适合**：数据工具、算法演示、内部展示。**第一步先走这条**，顺便验证 agnes-2.5-flash 的代码质量。

### 路线 B（完整，体验最好）：bolt.diy（Windows .exe）+ OpenAI-Like provider
- **接入方式**：装官方 Windows `.exe`（README 提供）；`.env.local` 或界面 Settings 选 OpenAI-like provider，填 `OPENAI_LIKE_API_BASE_URL=https://apihub.agnes-ai.com/v1` + `OPENAI_LIKE_API_KEY`，模型名 `agnes-2.5-flash`；SenseNova 若确认 OpenAI 兼容同理换 URL。
- **上手成本**：1–2 小时（含安装与首个项目）。生成 React/全栈 app，浏览器内即时预览，演示观感最好。
- **风险**：agnes flash 模型在长链路全栈生成上的表现未验证；bolt.diy 主仓 2026-02 后未 push（维护放缓信号）。

### 路线 C（备选）：AGenUI Studio（生成式 UI）
- **接入方式**：`npx agenui-studio`；编辑 `~/.agenui/config.json`（或 settings 对话框）加一个 provider：`base_url=https://apihub.agnes-ai.com/v1`、`api_key=…`；把想法变成 A2UI 协议界面，手机扫码在 Playground 真机预览。
- **上手成本**：约 1 小时（含 Node 环境；移动端真机构建才需要 Android Studio/Xcode，预览不需要）。
- **适合**：想要「聊天式/移动端原生感」的炫技 demo；不适合要交付 web 源码的场景。
- 同档补充件：screenshot-to-code（`OPENAI_BASE_URL`，URL 须含 `/v1`）用于设计稿→代码；OpenHands（Docker + config.toml `base_url`）当重型通用 agent 底座。

### 落选说明
- **Dyad（复核后移出落选）**：自定义 endpoint 已坐实（见上），**与 bolt.diy 并列路线 B**——Dyad 更活跃（复核当天仍在发版）+ 设置界面原生加 provider；bolt.diy 证据同样硬但主仓 7 个月未动。两个都装试试后择一。
- **gpt-engineer / openv0 / Tempo**：归档、停更 2 年、404，全部出局。
- **Onlook / LlamaCoder**：判据① 无明证，出局。

## 最大风险（选型前必读）
1. **模型质量是真正的变量**：工具链再顺，agnes-2.5-flash / SenseNova 在「多文件全栈生成 + 工具调用」上的能力未实测。免费档 ~20RPM 在 agent 型工具高频请求下可能吃紧（bolt.diy 可在设置里调小并发/用轻量模型）。
2. **文档站复核进展**：Dyad ✅ 已坐实（官方 custom-models 页一手证据）、Onlook ❌ 出局定案（各节「浏览器复核」）；OpenHands 未复核（config.toml `base_url` 机制置信度高且不在推荐路线，真要用前再验）。
3. bolt.diy 维护放缓（2026-02 后无 push），若长期用需关注社区 fork。

## 附：本次查证命令痕迹
GitHub API：`repos/{owner}/{repo}`（license/pushed_at/stars）、`search/repositories`、`orgs/{org}/repos`、`contents/`；原文：`raw.githubusercontent.com/{repo}/main/README.md`、`.env.example`、`playground/studio/README.md`。全部时点 2026-09-23。
