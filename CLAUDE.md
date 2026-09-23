# site — 想法展示独立站（想法 + 可交互 demo）

## 项目定位（build 阶段，2026-09-23 立项）

想法展示独立站：每个想法一页（想法原文 + 可交互 demo），让人和 AI 都能发现、查询、留反响；先本地跑通，发布上线后置。

**为何选这个方向**（premise-audit 用户原话精神）：「对于一个想法来说，我不清楚如何成功或者反响怎么样」——所以要「一个独立站，让别人或者 AI 查询到」+「给想法变成 demo 的能力」。备选框架里平台优先（反响数据不可累积、无法定点查询）与工具优先（没发布面就验不了反响）均被裁掉，定案：独立站为家 + 轻量 demo 先行 + 平台当放大器。见 `.claude/premise-audit.md`。

**通道定稿（2026-09-23 双实验裁定）**：demo 生成走模型直出单文件 HTML（无生成式 UI 框架、无重型脚手架）；静态站承载想法与反响，可发现机制（llms.txt/robots/收录）零成本起步。

## 用户模型 / onboarding

- solo 开发者，中文交流。
- 工作机 Windows 11 + Git Bash；Python 用 uv 管理。
- **协作模式：主线程统筹 + 多 agent 并行**——用户直令，执行动作派 agent；派发记录见 `docs/dispatches.md`。
- 形态类评价给实机或截图，不给文档描述（E1b 的倒计时冻结 bug 正是浏览器活体验收抓住的，读代码/文档看不出来）。

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
- API key 只进 `.env`（已 gitignore），绝不写进代码、仓库或对话。

## 约定

- Conventional Commits（feat/fix/docs/chore/refactor）+ 阶段 footer：当前 `[build]`（2026-09-23 起）。
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

## 构建命令

- 实验脚本：`python research/experiments/<实验名>/<脚本>.py`（系统 python 或 `d:/project/vedio/.venv/Scripts/python.exe` 皆可）；key 从 `.env` export 后再跑：`set -a; source .env; set +a`。
- 站构建命令：待 Astro 脚手架后补。

<!-- pl-status-contract@0.16.0 正本: ~/.claude/skills/project-lifecycle/templates/status-contract.md（vintage 锚，manager sediment-audit 对账用；本地适配在下一行可选注记） -->

## STATUS（会话检查点契约）

@STATUS.md

- **两节**： `# State` = task_id | status | 一句话 | 指针；`# Deadends` = append-only（试了X → 死于Y → 别再试；兼 CP3 设计轨负知识载体: 每代弃路一行 = 代 rev + 弃因）。
- **写盘时机（不等会话结束）**： ①切换思路 → 更新 State 行（新方向一句话，旧方向标记）；②教益性失败 → Deadends 落一行；③context 压力（/context 过半）→ 收编在途发现进对应节。
- **子agent纪律**： 主线程连续读 >2 个大文件 → 开子 agent（探索烧 agent 自己的 context，digest-only 回）；agent 发现**当场收编进 STATUS.md**，不留在对话里。
- **派生优于维护**： status 尽量从 git/文件存在性派生；描述只写不可派生物（意图/未决/决定）。
- **接手时对账（read-repair）**： 接手任务/开新工作先以最近提交（git log / 关键文件 mtime）对账 State 行，不一致**先修 STATUS 再干活**——@召回只注入不校验，多会话/隔日接手时陈旧行会被当权威消费（写侧三触发管不到读侧，与「派生优于维护」互为两侧）。**对账面含显式计数器与候选登记册**（「第N例计数」类标记 + docs/master-plan.md §4 候选表——沉淀到期先看见，041b 最小桥包配套条款）。
- **context 将满时**： 在途且势头重要 → `/compact focus on <当前任务+已排除路径>`（死端已在文件里，摘要丢细节无害）；死端多/任务到边界 → STATUS 收尾（state + deadends + next）后开新会话，`@STATUS.md` 自动召回。
