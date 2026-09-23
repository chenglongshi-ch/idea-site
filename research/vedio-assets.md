# vedio 项目可复用资产盘点（面向 site：独立站 + 想法→demo 生成）

> 盘点时点：2026-09-23；来源项目：`d:\project\vedio`（Agnes 视频生成管线，M1/M2 已跑通）
> 新项目技术栈：Agnes AI（OpenAI 兼容免费 API，文本+图像为主）+ 商汤 SenseNova。
> 注：vedio 全库 grep 无任何 SenseNova/商汤痕迹——第二 provider 是全新地基，vedio 只能供 Agnes 侧与工程模式。

## 1. 复用清单

### 1.1 直接搬（改动成本：近零～小时级）

| 资产 | 路径 | 干什么 | 改造成本一句话 |
|---|---|---|---|
| `runtime.py` | `vedio/runtime.py`（40 行） | Windows 控制台 UTF-8 防炸（stdout+stderr reconfigure）、`now_iso()`、stdout+run.log 双写逐行 flush、`write_lineage()` | 零改动整文件搬；Windows 开发环境刚需 |
| `ledger.py` | `vedio/ledger.py`（85 行） | append-only jsonl 事件账本 + `replay()` 还原末态；容忍半行（进程被杀残行）；Ctrl-C 不写假终态 | 零改动搬；事件 kind 从 submit/progress/result/corrected 换成 site 语义（如 idea/demo/publish） |
| `load_api_key()` | `vedio/provider.py` | .env 读 key（环境变量优先、setdefault 不覆盖、绝不进仓库） | 零改动；SenseNova 加一个同名函数换 env 名即可 |
| 节流钟模式 | `vedio/provider.py` 的 `_last_submit`/monotonic 实现 | 进程内 monotonic 节流，「被拒也计时」「构造参数只能收紧不能放宽（floor）」两条执法纪律 | 抄模式不抄参数：文本 ~20 RPM ≈ 3s 间隔、图像按尺寸分层（1K 3s / 2K 6s / 3K·4K 60s），视频 60s 钟不要 |
| 退出码契约 | `vedio/cli.py`/`story.py` 文档串 | 0 成功｜1 用法｜2 提交被拒｜3 未出片｜4 下载失败｜130 Ctrl-C，分类可聚合 | 抄约定换语义 |

### 1.2 改造后搬（成本：半天级）

| 资产 | 路径 | 改造点 |
|---|---|---|
| `AgnesProvider` 骨架 | `vedio/provider.py`（279 行，仅依赖 httpx） | 保留：单通道属主思想（节流在 provider 内执法，不靠调用方自律）、`_safe_json` 兜底解析、双 client（API 带 Bearer / CDN 下载无 auth——带 Bearer 反 401）、`.part` 临时文件原子落盘。**必须补**：`chat()` 方法——vedio 管线零 LLM，`/v1/chat/completions` 从未封装过，这是最大的缺口（OpenAI 兼容，POST 即得，半小时活）。`generate_image()`（t2i/i2i 一体 + 尺寸分层节流）可原样用。删：`submit_video`/`poll_video`（视频域）。多 provider（+SenseNova）可抽象成 base + 两个子类，每个子类自带独立节流钟 |
| 血统三件套模式 | shots.yaml / ledger.jsonl / take json（见 §4） | 模式整体搬，字段换 site 域：idea→demo 的每次生成一个 lineage json |
| `story.py` 的 run/status 骨架 | `vedio/story.py` 前 ~450 行 | 值得抄的**模式**：--dry-run 结构校验零配额、断点续跑三分支（skip 已 done / 凭留档 url 复下载 / 探针回收不重提交）、运行中重读单一事实源 + corrected 留痕、`next_take_no` 永不覆盖。但 836 行里约 240 行是 ffmpeg，照抄代码不值，抄控制流形状 |
| 目录契约思想 | `CLAUDE.md` 约定节 + STATUS.md | 三层分立：创作资产 git 跟踪 / 生成产物一任务一目录整体 gitignored / 实验脚本 git 跟踪——site 直接类比：想法+demo 元数据入库、生成产物（图片等）gitignored、lineage json 含 producer+rev |

### 1.3 参考文档（搬知识不搬代码）

- `docs/research/2026-09-03-agnes-api.md` —— Agnes 全部已验证事实（§2 事实卡摘要见下文）
- `docs/research/2026-09-03-agenui.md` —— AGenUI/A2UI 生成式 UI 调研（见 §3，与「想法→demo」直接相关）
- `docs/research/2026-09-03-drama-workflow-architecture.md` —— 三层分立架构（人验收终态权 / LLM 裁决建议权不进控制流 / 确定性骨架+Provider 属主执法）+ 负清单（不引入外部 agent 框架运行时）。site 的「被人/AI 查询」+ 生成链路可直接沿用这个权责划分

依赖面：整个 vedio 包只依赖 `httpx` + `pyyaml` + `imageio-ffmpeg`（仅 ffmpeg 二进制解析用，site 不需要）。Python 3.12+ / uv / hatchling。极薄。

## 2. Agnes 文本/图像 API 关键事实卡

（时点 2026-09-03/04 实测 + 官方文档 2026-07-30；CLAUDE.md 已记的视频侧事实不重复）

**端点**：Base `https://apihub.agnes-ai.com/v1`，`Authorization: Bearer $AGNES_API_KEY`，OpenAI 兼容（openai SDK 改 base_url 可用）。国内直连无障碍。

**文本模型**（端点 `/v1/chat/completions`，vedio 未封装过、site 需自建）：

| 模型 | ctx / out | 备注 |
|---|---|---|
| `agnes-2.5-flash` | 512K / 65.5K | 文本+视觉，coding/agent/tool-calling，与 2.0 完全兼容——**site 主力候选** |
| `agnes-2.0-flash` | 512K / 64K | 文本+视觉（1M ctx 2026-06 已回滚） |
| `agnes-1.5-flash` | 256K | 纯文本低延迟 |
| `agnes-2.5-pro/-alpha/-beta` | — | `/v1/models` 实测在列，文档未详 |

**图像模型**（端点 `POST /v1/images/generations`）：

| 模型 | 备注 |
|---|---|
| `agnes-image-2.1-flash` | 高密度生成+编辑，URL/Base64 出——vedio 实际在用 |
| `agnes-image-2.0-flash` | 快速文生图/图生图 |
| `agnes-image-2.5-flash` | `/v1/models` 实测在列 |

**i2i(edit) 协议（实证）**：同端点加 `extra_body={"response_format":"url","image":[URL 或 data:URI]}`（extra_body 是裸 JSON 字段非 SDK 概念）；t2i 则裸参数 model/prompt/size/n。URL 可直传，无需先转 b64。

**免费档限额（公开 RPM → 实际可执行 RPM）**：文本 30→**20**；图像 1K 30→**20** / 2K 20→**10** / 3K·4K 2·1→**1**；视频 2→**1**。→ site 节流：文本 ~3s/次、图像按请求尺寸分层（provider.py `_image_interval` 已实现这套）。

**付费对比**：Starter $4 / Plus $10 / Pro $50 月付——图像三家都是 4,000 张/天，差异主要在文本请求量；Token Plan 视频加到 5 RPM。

**行为坑（实证）**：
- 图像瞬时 **503 "image queue is full"** 重试即过（按 5xx 退避重试即可，别当终态）
- **图像尺寸也吸附**：请求 704x1280 实出 736×1312；1K 档延迟 7–31s/张
- i2i edit 保真度：布局级保持成立（肯定式 KEEP prompt 达 8.5/10），纹理级必重绘漂移；**否定式指令（Do not）拖分**；reframe 幅度有上限（推近 medium 行、极端特写 prompt 修不动）
- 社区已有 Claude Code skill（单 API 封装级），无编排能力

## 3. AGenUI / A2UI 调研结论摘要

（`docs/research/2026-09-03-agenui.md` 全文总结；调研时点 2026-09-03）

**是什么**：
- **A2UI**：Google 2025-09 开源的 Agent-to-User Interface 协议（v0.9，16.3k★）。核心思想：LLM 不输出自由 HTML，而是输出**受 Schema 约束的结构化组件描述流**——UI 由协议描述、由渲染端生成，天然防注入、可流式、可跨端。
- **AGenUI**：高德开源的 A2UI 渲染 SDK（1.1k★，Apache 2.0，v1.4.0，活跃）。C++ 共享内核 + iOS/Android/**HarmonyOS** 三端**原生**渲染，是生态里完成度最高的原生实现。生态另有 a2ui-vue、A2UI-Android/Compose、Flutter 实现。

**核心流程**（五步）：
1. **Catalog 协商**：客户端上报组件清单 Schema（AGenUI 25 组件 + 14 函数）→ Agent 知道能画什么；
2. **LLM 生成**：自然语言 → 严格受约束的 A2UI 消息（updateComponents / updateDataModel，流式）；
3. **C++ 内核**：流式解析 → 虚拟组件树 → diff → 样式/主题解析；
4. **原生渲染**：ObjC/JNI/NAPI 桥接（宣称滚动 120fps）；
5. **交互回传**：Action 事件 / Function Call → 回到 Agent 循环。

**组件体系**：18 个协议标准组件（Text/Button/List/Tabs/Modal/Slider/Video…）+ 4 个 SDK 扩展（Table/Carousel/Web/RichText）+ 运行时注册自定义组件（Playground 演示了 Chart/Markdown/Lottie）。

**配套工具链**：
- **A2UI Generation Skill**：`npx skills add AGenUI/AGenUI` 装进 Claude Code/Cursor/Codex 等 55+ 运行时；
- **AGenUI Studio**：`npx agenui-studio`，本地 BYO-key 工作台（NL → A2UI → 预览/校验 → 扫码推真机），支持 DeepSeek/Qwen/GLM/OpenAI/Gemini。

**对 site 的意义（比 vedio 时期「弱相关」升级为强相关）**：「想法→demo」的 demo 若是**交互式 UI** 而非静态图/视频，A2UI 正是「LLM 输出结构化 UI 描述」的现成协议——省掉自创 schema，且 Catalog 协商机制天然解决「模型能生成什么组件」的约束问题。**关键抉择**：AGenUI 本体是移动端原生（C++ 内核/鸿蒙），**独立站是 Web**——Web 渲染应看生态里的 **a2ui-vue** 或 doc 指出的 CopilotKit **AG-UI**（15.7k★）；A2UI 协议思想 + Generation Skill（喂给 Claude Code 生成 A2UI 的 skill）可直接用。vedio 当时的裁定「当前阶段不引入」对 site 应重新评估。

## 4. 「产物血统」模式评估（对 demo 可追溯性的借鉴）

vedio 的三层血统体系，实测已跑通三个 episode：

1. **shots.yaml（输入侧单一事实源）**：人可随时手编的 YAML 镜头表（defaults + shots[]：id/scene/cast/prompt_ref/keyframe/takes_budget）。关键设计：**prompt 正文独立放 prompts/*.md（git 跟踪）+ sha256 指纹**——元数据与内容分离，内容漂移靠 sha 对账。运行中人改表 = 「corrected」事件留痕（不算失败、不耗预算），已提交任务锁旧参数，重跑自动对账补拍。
2. **ledger.jsonl（过程侧事件账本）**：append-only，四类事件 submit/progress/result/corrected；「事件即真相，末态即现状」——`replay()` 同 (shot,take) 后写覆盖先写，无迁移无快照；**Ctrl-C 不写假终态** → 重跑对「有 video_id 无 result」的任务先探针一次，已完成的直接救回，零配额浪费。
3. **take 血统 json（产物侧一 take 一档）**：mp4 旁边一个同名 json，**状态机逐步覆写**（queued 先落盘——进程中途死也留痕 → submitted → polling → done/**degraded**（服务端已出片但本地文件缺失，url 留档可复跑）/failed），含完整 prompt 原文 + prompt_sha256 + params + model + submit_http + video_id + url + 双时间戳 + elapsed + file_mb。另有实验脚本层的强化契约（CLAUDE.md 立法）：**lineage json 必含 `producer`（生成脚本路径）+ `rev`（git rev，脏树记内容哈希）**——`outputs/2026-09-07-agnes-multiref-probe/takes/*/take-01.json` 是带 producer/rev 的实样，连 400 被拒的 take 也留全请求响应。

**对 site 的映射**（可借鉴度高，~80% 直接平移）：
- 每个 demo 一个 lineage json：`idea`（原文+sha）+ `producer`（生成脚本/agent 标识）+ `rev`（git rev）+ model/params/prompt + 产物 URL/文件 + 状态机（含 degraded 态——远端已生成本地未落盘）；
- 「想法被编辑 = sha 变 = 自动重新生成」平移 vedio 的「prompt 漂移 = 自动补拍」语义，**免手动版本管理**；
- append-only ledger 平移为 site 的生成事件流：断点续跑、被 AI/人查询时的「这个 demo 怎么来的」审计面、以及免费配额下的零浪费重试，全都靠它；
- 注意减配：vedio 的 take 编号永不覆盖（next_take_no 双 max）对「一个想法多次生成 demo」的 site 场景同样成立，值得保留。

## 5. 「不要搬」清单（vedio 特有的视频管线死重）

| 资产 | 路径/规模 | 为什么是死重 |
|---|---|---|
| `poller.py` + `queue.py`（PollWheel） | ~200 行 | 视频是异步任务（提交→轮询→76s+ 出片），才需要 15s 宽间隔轮询、429 四层退避、多任务轮子。**文本/图像是同步 HTTP 调用**（图像 7-31s 但一次请求返回），零轮询需求。site 若日后加视频再回来搬 |
| `story.py` 的 assemble 全部 | ~240 行（cmd_assemble/probe_stream/concat/转码兜底/BGM mux） | ffmpeg 拼接纯视频负担：concat copy→失败降级转码、yuv420p、xfade 坑、BGM amix 混音——site 的 demo 是文本/图像/UI，一个字节都用不上 |
| keyframe/ti2vid/keyframes 协议层 | `story.py` `_load_keyframe` + E03 探针工艺 | Agnes 视频图锚协议（首尾帧、data-URI、多图时序解释）——纯视频域知识，且已实证 v2.0 无非时序参考通道 |
| `cli.py`（gen-one） | 124 行 | 单镜头视频 CLI，形状完全视频域；site 要的是 web 服务入口不是 CLI（但其「先落 queued 再干活」的血统写时序值得抄，见 §4） |
| `shows/` 目录约定 | episodes/cast/scenes/audio/bgm | 短剧域的内容组织（分集/角色卡/场景锚/CC0 BGM 登记）；site 的域模型是「想法/demo/查询」，重新设计 |
| 视频节流参数 | `MIN_SUBMIT_INTERVAL_FLOOR=60` | 视频 ~1 RPM 的地板值；site 文本+图像频次高一个数量级，套 60s 会把站堵死——**抄分层节流的模式，不抄数值** |
| imageio-ffmpeg 依赖 | pyproject | ffmpeg 二进制解析专用，site 无 ffmpeg 需求 |
| 「管线零 LLM」哲学 | CLAUDE.md/架构文档 | vedio 刻意把 LLM 挡在控制流外（LLM 只在 CC 会话侧做分镜）；site 的「想法→demo」核心就是 LLM 驱动生成——权责划分思想（三层分立）可搬，这条负清单必弃 |

## 6. 一句话总裁

vedio 对 site 的价值排序：**血统三件套模式（shots/ledger/take-json，几乎整体平移）＞ provider 节流执法模式（补上缺失的 chat() 即成 Agnes 全家桶）＞ AGenUI 调研（demo 若走交互 UI 路线则是现成协议）＞ 一切视频管线代码（死重）**。最大的单点缺口：vedio 从未封装过 Agnes 文本端点（管线零 LLM 是设计哲学），site 的第一件事就是把 `/v1/chat/completions` + ~20 RPM 节流补进 provider。
