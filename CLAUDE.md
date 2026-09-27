# site — 想法展示独立站（想法 + 可交互 demo）

## 项目定位（build 阶段，2026-09-23 立项）

想法展示独立站：每个想法一页（想法原文 + 可交互 demo），让人和 AI 都能发现、查询、留反响；先本地跑通，发布上线后置。

**为何选这个方向**（premise-audit 用户原话精神）：「对于一个想法来说，我不清楚如何成功或者反响怎么样」——所以要「一个独立站，让别人或者 AI 查询到」+「给想法变成 demo 的能力」。备选框架里平台优先（反响数据不可累积、无法定点查询）与工具优先（没发布面就验不了反响）均被裁掉，定案：独立站为家 + 轻量 demo 先行 + 平台当放大器。见 `.claude/premise-audit.md`。

**通道定稿（2026-09-23 双实验裁定）**：demo 生成走模型直出单文件 HTML（无生成式 UI 框架、无重型脚手架）；静态站承载想法与反响，可发现机制（llms.txt/robots/收录）零成本起步。

## 用户模型 / onboarding

- solo 开发者，中文交流。
- 工作机 Windows 11 + Git Bash；Python 用 uv 管理。
- **协作模式：主线程统筹 + 多 agent 并行**——用户直令，执行动作派 agent；派发记录见 `docs/dispatches.md`。**派后台/外查 agent 前先核审批前缀带**（agent 审批弹窗直插用户——2026-09-27 实证：3 外查 agent 逼出 ~45 条一次性 local 条目后才补 settings.json）；外查/长跑 agent 提示须带「分段进行、单步勿静默超 600s」防看门狗，停摆/断网可 SendMessage 原地续跑保上下文（同日两例实证）；**会话收尾树净**：当批 change-set squash 完再结束（跨会话混批致分批困难，2026-09-27 实证）。
- **流程允许即自动做（2026-09-27 用户反馈「按照流程可以做就应该自动去做，为什么会需要我去 push」）**：框架/约定/STATUS 已认可的启动与执行不请示（含「要不要开始」本身——提着方案直接干）；仅真属用户的裁定（待人裁点）、实机签收、账号/凭据操作才呈报等令。
- 形态类评价给实机或截图，不给文档描述（E1b 的倒计时冻结 bug 正是浏览器活体验收抓住的，读代码/文档看不出来）。
- **进度呈报（2026-09-27 用户反馈「完全不知道全局和现在的进度」）**：STATUS.md 是给 agent 的账本，不是给用户的界面——会话开场第一段先用人话报三行（项目在哪 / 在等什么 / 下一步）；用户说「报进度 / 到哪了」→ 给全页白话进度（阶段位置 + 完成 / 在途 / 等人拍板 / 排队），派生自 STATUS + git，不另维护副本。

## 领域关键事实（除注明外均为 2026-09-23 实测/一手；过期以官方 console 复核）

**模型通道表**（demo 生成 = 单发大 HTML 任务）：

| 通道 | Model ID | 角色 | 一手结论 |
|---|---|---|---|
| Agnes | `agnes-2.5-flash` | **demo 生成主力** | E1 实测通：38s / 12KB / 功能零缺陷，一次成功无重试，iframe 嵌入可用 |
| 商汤自研 | `sensenova-6.8-flash-lite` | 备用（成本对冲） | E1b 半通：31.7s / 14k 字，但同名 `render()` 覆盖致倒计时显示冻结——产出必过浏览器功能验收 |
| 商汤托管 | `glm-5.2` | **禁用于单发大 HTML** | E1b 不通：203.9s + `completion_tokens=16000` 截断 + >300s 读超时；长处在长上下文问答/改码，不弃用只禁此场景 |

- flash-lite 备用通道两个前置：① 请求必带 `{"thinking":{"type":"disabled"}}`——否则思考吃光预算正文 0 字（E1b 跑① 230.8s 全烧 reasoning）；② 产出过浏览器功能验收。
- **端点**：Agnes `https://apihub.agnes-ai.com/v1`（Bearer key，文本 ~20 RPM 实际）；商汤 `https://token.sensenova.cn/v1`（OpenAI 兼容，另有 `/v1/messages` Anthropic 兼容）。均读 `.env`。
- **商汤免费额度（积分池制，滚动窗口）**：每池 60,000 积分/5h + 600,000/周；通用池与 Flash-Lite 专属池各自独立计额。公测期价格/规则随时可能变。

**工艺陷阱**：

- 思考字段名不统一：glm 系回 `reasoning_content`，商汤自研回 `reasoning`——判空两个都查；冒烟响应可能连 `content` 字段都没有，通路判据 = HTTP 200 + 合法 JSON。
- 冒烟探测别限小 `max_tokens`：思考模型 reasoning token 也吃预算（E1 冒烟 max_tokens=20 返回空串）。
- **dev server 别跨 schema 变更长驻**：content.config.ts 改动后，长驻 dev 会话某次热更可能用陈旧 schema 校验新 fixture（collection 清空 → 全页 404 假象，2026-09-26 实测）；`npm run build`（新进程）为准，形态验证前重启 dev。另：TaskStop 杀 npm wrapper 杀不死 astro 子进程，须 `npx astro dev stop`。
- API key 只进 `.env`（已 gitignore），绝不写进代码、仓库或对话。

## 约定

- Conventional Commits（feat/fix/docs/chore/refactor）+ 阶段 footer：当前 `[build]`（2026-09-23 起），统一置于 subject 尾。
- **main 只收 change-set 级 squash merge**：功能分支过程提交自由，压回 main 一条——`git log` 保持可读作变更台账。
- 调研沉淀在 `research/`；CLAUDE.md 只留结论与指针，细节进调研文件；外部事实引用标注时点。
- 生成产物带血统：lineage json 必含 `producer`（生成脚本路径）+ `rev`（git rev，脏树记内容哈希）——继承 vedio 实证模式（`research/vedio-assets.md` §4）。
- 本地站功能面以 `docs/spec-site.md` 为准（4 页/内容模型/全链工作流/验收，2026-09-23 定稿，first-real-idea 的验收依据）。

### 调研索引

- `research/vedio-assets.md` — vedio 可复用资产盘点 + Agnes 文本/图像事实卡 ★写 provider 前必读
- `research/sensenova-platform.md` — 商汤平台盘点（模型/端点/积分/限额）
- `research/demo-generators.md` — 开源 idea→demo 工具盘点（11 路线）
- `research/precedent-products.md` — 同类想法展示产品形态调研
- `research/ai-discoverability.md` — 独立站被人 + AI 发现机制（llms.txt/robots/收录）
- `research/experiments/e1-agnes-html-demo/RESULT.md` — E1：Agnes 直出 HTML，判**通**
- `research/experiments/e1b-sensenova-html-demo/RESULT.md` — E1b：商汤对称实验，flash-lite 半通 + glm-5.2 不通 + thinking 探针工艺
- `research/graveyard-compare.md` — 上架时对比 AI 坟场给建议：判**可行**（killedbyai.net 唯一结构化死因源 128 条 CC BY；≤300 条全量塞合法零基建；>300 上 bge-small-zh 检索）

## 构建命令

- 实验脚本：`python research/experiments/<实验名>/<脚本>.py`（解释器**默认用 `d:/project/vedio/.venv/Scripts/python.exe`**——系统 python 2026-09-27 实测 exit 49 不稳）；key 从 `.env` export 后再跑：`set -a; source .env; set +a`；临时文件给 python 传 Windows 真实路径（`C:/Users/.../Temp/`），Git Bash 的 `/tmp` 对原生 python 不可见。
- 站构建命令：`npm install`（首次）；`npm run dev`（本地站 http://localhost:4321，4 页见 docs/spec-site.md §3）；`npm run build`（静态产物）。
- demo 提交协议：外部项目生成 demo，按 `docs/demo-protocol.md`（v0.1，2026-09-26 定界「site 只做承载+协议+验收，不管落码」）提交两件套（demos/ + ideas/）；`gen_demo.py` 归属外部项目侧作参考实现。

<!-- pl-status-contract@0.16.0 正本: ~/.claude/skills/project-lifecycle/templates/status-contract.md（vintage 锚，manager sediment-audit 对账用；本地适配在下一行可选注记） -->

## STATUS（会话检查点契约）

@STATUS.md

- **两节**： `# State` = task_id | status | 一句话 | 指针；`# Deadends` = append-only（试了X → 死于Y → 别再试；兼 CP3 设计轨负知识载体: 每代弃路一行 = 代 rev + 弃因）。
- **写盘时机（不等会话结束）**： ①切换思路 → 更新 State 行（新方向一句话，旧方向标记）；②教益性失败 → Deadends 落一行；③context 压力（/context 过半）→ 收编在途发现进对应节。
- **子agent纪律**： 主线程连续读 >2 个大文件 → 开子 agent（探索烧 agent 自己的 context，digest-only 回）；agent 发现**当场收编进 STATUS.md**，不留在对话里。
- **派生优于维护**： status 尽量从 git/文件存在性派生；描述只写不可派生物（意图/未决/决定）。
- **接手时对账（read-repair）**： 接手任务/开新工作先以最近提交（git log / 关键文件 mtime）对账 State 行，不一致**先修 STATUS 再干活**——@召回只注入不校验，多会话/隔日接手时陈旧行会被当权威消费（写侧三触发管不到读侧，与「派生优于维护」互为两侧）。**对账面含显式计数器与候选登记册**（「第N例计数」类标记 + docs/master-plan.md §4 候选表——沉淀到期先看见，041b 最小桥包配套条款）。
- **context 将满时**： 在途且势头重要 → `/compact focus on <当前任务+已排除路径>`（死端已在文件里，摘要丢细节无害）；死端多/任务到边界 → STATUS 收尾（state + deadends + next）后开新会话，`@STATUS.md` 自动召回。
