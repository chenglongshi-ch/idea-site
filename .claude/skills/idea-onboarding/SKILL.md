---
name: idea-onboarding
description: 想法上架全链操作手册（site 独立站）——想法→生成demo→提交→验收→上架六步的跑法与坑位。Invoke when 上架新想法 / 跑想法全链 / 新想法起手 / 生成 demo / 验收 demo / 收到 demo 提交 / demo 挂站 / idea onboarding / launch a new idea / demo acceptance / review a demo submission。
---

# idea-onboarding — 想法上架全链操作手册（site 独立站）

把「想法 → 生成 demo → 提交 → 验收 → 上架」的跑法收进一本手册。消费者 = 未来会话 / 被派发的 agent（第二个想法上架起直接照此跑）。血统 = 时空语录首跑（run 20260927T162733-41bb，2026-09-27 全链首次跑通）+ 拍星星找故事二跑（run 20260928T104718-4055，2026-09-28，首战校准跑）+ 家庭任务清单三跑（run 20260929T221336-5371，2026-09-29，摘标窗口跑：首次打回重修 + 首次带 §9 四件套）。

**本文只收操作顺序 + 坑位**；协议细则、通道参数、页面 schema 一律指针，防双源漂移：

| 要查什么 | 去哪 |
|---|---|
| 模型通道表（Agnes / flash-lite / glm-5.2 一手结论与端点） | `CLAUDE.md` 领域关键事实节 |
| 提交协议 v0.5（三件套清单 / lineage schema / 300 字口径 / 验收噪音归类 / slug=000N- 编号制 / §2 内容组织+血统外显） | `docs/demo-protocol.md` |
| 页面清单 / 内容模型 / 新增想法工作流 | `docs/spec-site.md` |
| Agnes 端点 / 限额 / 节流事实卡 | `research/vedio-assets.md` §2 |
| 首跑实录（本手册坑位的原始出处） | `D:\skill-data\runs\project-lifecycle\20260927T162733-41bb\first-run-digest.md` |
| 二跑实录（首战校准 + 预估对比基准） | `D:\skill-data\runs\project-lifecycle\20260928T104718-4055\second-run-digest.md` |
| 三跑实录（打回重修 + §9 首析 + 评审面板跑法） | `D:\skill-data\runs\project-lifecycle\20260929T221336-5371\third-run-digest.md` |
| 外部提交模拟实录（外部侧打包/站侧接收首战，协议 v0.6 输入，测试件已回滚） | `D:\skill-data\runs\project-lifecycle\20260930T095544-ee30\sim-digest.md` |
| 坟场评审系统设计（透镜/主持人/数据通道/A-B 校准） | `docs/graveyard-review-design.md` |

近同型（查重索引 2026-09-27）：`novel-initializer` agent（obsidian-novel-engine，「想法→vault 结构落地」同形不同域，无复用关系，仅登记）。

## ① 输入与前置

- 想法文本 + 出处。**含引语/名人言论的想法，出处必须可考**——这是对**提交方**的输入要求；**内容考据与修复归提交方（demo 与站分离，2026-09-28 用户定界）**：站侧验收只管结构与功能（三件套/lineage/断言/路由/console/交互活体），发现内容疑点→记档移交提交方，**不代修不阻断**（时空语录 5 处最小修是用户特裁例外，非默认路径；post_edits 字段留给提交方自记）。
- slug 规则见协议 §5（v0.4：`000N-` 编号前缀由站侧按上架顺序分配，一经挂站不改含编号；存量迁移由站侧做，提交方不自改）；想法条目 frontmatter 对齐 `src/content.config.ts`。

## ② demo 生成（通道选择 + 命令模板）

通道裁定细节看 `CLAUDE.md` 通道表，此处只收跑法：

- **Agnes `agnes-2.5-flash` 主力**——首跑 34.3s / 二跑 87.7s / 三跑 62.8s，全部一次成功零兜底（一次成功率累计 3/3）；耗时/tok 随交互复杂度伸缩、与产出量成比例。
- **flash-lite 备用**，两个前置缺一不可：请求必带 `{"thinking":{"type":"disabled"}}`（否则思考吃光预算正文 0 字）；产出必过浏览器功能验收（E1b 同名 `render()` 覆盖致倒计时冻结的教训）。
- **glm-5.2 禁用于单发大 HTML**（STATUS Deadends 已录，勿重试）。
- **v0.5 布局与外显随生成进 prompt，别等验收才发现**：集合型内容（≥10 条/多类别）生成时就要求索引视图（分类切换/目录/网格任一）；探索型交互（探索即玩法）要求收集进度或索引入口；页脚带生成方式行（与 lineage `generator`/`date` 同源）——对应验收 §⑤-7/8（协议 §2）。

命令模板（Windows Git Bash）：

```bash
set -a; source d:/project/site/.env; set +a   # key 只从 .env export，绝不进代码/对话
/d/project/vedio/.venv/Scripts/python.exe <生成脚本>   # 系统python实测exit 49不稳，固定用vedio venv
# 临时文件给 python 传 Windows 真实路径（C:/Users/.../Temp/）——Git Bash 的 /tmp 对原生 python 不可见
```

生成脚本归属：`gen_demo.py` 是外部项目侧参考实现（协议尾注）；首跑实况 = run 目录内 `gen_spacetime_demo.py`（单发 prompt + lineage 落盘的最小可用形状，可照抄改 slug）。

## ③ 提交物落位（三件套 + ideas 条目）

清单与 schema 全按 `docs/demo-protocol.md` §0-§4，此处只收跑法要点：

- `public/demos/<slug>/`：`index.html`（单文件自包含，行为约束见协议 §2）+ `preview.*`（内容基准 = demo 首屏的**确定状态**——随机开屏的 demo 须截固定帧，否则不可复现；规格见协议 §1）+ `lineage.json`。
- preview 截法（二跑收编）：chrome-devtools `emulate` viewport `1200x750x2` → `take_screenshot` 带 filePath 直存 `preview.png`（实得 2400×1500）；**必须在交互前截**首屏确定状态。
- lineage 必填 `producer` / `rev` / `date`；`rev` = 生成时刻工作树 HEAD 12 位 hex（无论脏净一律记），脏树**必加** `artifact_sha256`（index.html sha256 前 12 位）——语义见协议 §3 注①。
- **producer 仓外记法（2026-09-27 人裁定案 A）**：走 run 体系的提交方 `producer` 指 run 目录（repo 外持久 + run_id 现成追溯）；不走 run 的必加 `producer_sha256`（脚本内容哈希，仅对新提交生效）。三案利弊存档 `docs/producer-lineage-decision.md`。
- 坑：生成脚本写产物用二进制或 `newline=''`——Windows 文本模式 CRLF 膨胀，致 lineage `size_bytes` 与磁盘不符（首跑实录瑕疵）。
- 想法 + demo 同批一次提交：`status` 取 `growing`，changelog 行随条目由提交方写（时序口径见协议 §4）。
- **四件套条件件（§9，三跑起）**：附坟场对照分析时提交物 = 三件套 + `analysis.md`（同目录），lineage 加 `review_producer`/`data_source`/`data_as_of`/`personas` 四字段（协议 §9）——构建期断言（`[slug].astro`）执法，缺字段 build 红 Panels；想法页自动渲染「坟场对照」区块 + 锚点。面板跑法（5 透镜 N+1、数据直连 api.github.com、A/B 校准）见指针表 graveyard-review-design 行；**并发 ≤5**（10 并发实测触发 glm-5.2 429，三跑 3 agent 阵亡后 SendMessage 原地续跑救回）。

## ④ 构建验收

- **形态验证前重启 dev server**——content.config schema 变更后，长驻 dev 会话某次热更可能用陈旧 schema 校验新条目（collection 清空 → 全页 404 假象）。
- **`npm run build`（新进程）为准**，不以长驻 dev 表现下结论。
- 想法条目 body ≤300 字为构建期断言（计数口径见协议 §4）。
- 坑：TaskStop 杀 npm wrapper 杀不死 astro 子进程——停服务用 `npx astro dev stop`。

## ⑤ 实机验收清单（逐项点检）

形态类评价只认实机/截图，读代码不算（E1b 冻结 bug 即反例）。逐项：

1. **路由 200**：`/`、`/ideas/<slug>/`、`/demos/<slug>/` + 既有页面全量点一遍。**走查介质用 `npx astro preview`（build 后）**——base 子路径下 `astro dev` 对 public 静态目录 URL 一律 404（`/demos/<slug>/` 404、`/index.html` 200，三跑实测，存量 demo 同症状），别被 dev 假 404 带偏。
2. **console 归类**：报错分两类（协议 §6）——demo 责任（外链请求/弹窗/demo 自身 JS 报错）→ 打回；站级噪音（如 `/favicon.ico` 404）→ 站侧待办，不归提交方。dev 环境另有 `[vite] connecting` debug（构建产物无），不算报错（二跑收编）。外部自验 file:// 直开报 `Unsafe attempt to load URL` = 环境伪影非 demo 责任（http 复验消失，模拟首战收编）；giscus「Discussion not found」新想法零评论正常提示 = 站级。
3. **交互活体**：iframe 内真点真验（首跑例：穿梭按钮连点 5 次全部切换无连续重复）——显示冻结类 bug 读代码看不出来。canvas 型 demo（交互对象不进 a11y 树、无 DOM 元素可点）：从内联源码挖比例坐标 map → 合成 MouseEvent/TouchEvent 打坐标，结果以 DOM 状态（polaroid.show / p-title 等）+截图取证（二跑实况）。
4. **移动端 375×667**：宿主页无横向溢出；iframe 高 `min(600px, 80vh)` 分支生效；demo 内部无横向滚动。
5. **搜索**：想法关键词命中且只命中该卡；无结果词出空态。
6. **preview 上脸**：卡片从状态色渐变占位 → 真实截图（img src 指向 preview）。
7. **内容组织（v0.5）**：集合型 demo 检索引视图在场；探索型检收集进度/索引入口——纯线性随机流打回（协议 §2）。
8. **血统外显（v0.5）**：demo 页脚生成方式行在场且与 lineage.json `generator`/`date` 同源——缺行或不同源打回（协议 §2）。

截图存 `shots/<slug>/`（交互前后对照各一张 + 移动端）。命名模板（2026-09-28 整理定）：「页-状态-视口」固定语序（如 idea页-交互前 / demo-交互后 / 首页-375）——前两跑语序颠倒，自第三个想法起统一。shots/ 已不入 git（2026-09-28 用户裁：.gitignore+untrack，本地留档作验收证据）。走查毕 `npx astro dev stop` + curl 复核端口已关。

## ⑥ 上架收尾

- STATUS.md：对应 task 行更新（新想法则加行）。
- `docs/dispatches.md`：派发记录补一行。
- changelog：条目内随提交方已写，过验后只追加验收记事、不改写（协议 §4）。
- **llms.txt 零手动**：构建期自动派生（`src/pages/llms.txt.js`，源 = ideas collection）——提交物不含它、零同步责任；走查带一眼 `/llms.txt` 200 即可。首跑曾手动漏同步出真实事故，v0.3 已治本，勿再手写。
- git 提交归主线程 / change-set squash（main 只收 squash merge；被派发 agent 零 commit）。

## ⑦ 外部提交接收（站侧视角；2026-09-30 模拟首战，协议 v0.6）

站侧收到**外部提交包**（非站内自产）时走本节 + 复用 ④⑤：

1. **判包**（来源三档：PR 主通道 / Issue 附包链接 / 站内目录交接，协议 §6-3——认包不认路）：`<name>/`（三件套，无编号）+ `<name>.md`（想法条目）；lineage 必填三件齐 + **非 run 提交方必带 `producer_sha256`**（协议 §3②，脚本自动计算——模拟首战首次行使该分支；人工手填=不合规）。
2. **协议校验**：单文件自包含（iframe/fetch/src 零外链 grep 即判）、300 字口径、体积软限 200KB、§2 内容组织 + 血统外显——站侧**只验不改内容**，考据疑点记档移交提交方（见 ① 定界）。
3. **落位**：分配下一个 `000N-`（现库 3 个 → 0004 起）→ 目录 + 条目改名、lineage.slug 同步加前缀、`post_edits` 簿记「站侧接入」一行——**站侧对提交物的唯一改动**（协议 §5 v0.6 提交时序）。
4. **验收**：走 ④（build 断言）+ ⑤（preview 八项），外部包无豁免项。
5. 模拟首战实测（2026-09-30，节气小历测试件）：Agnes 51.5s/13KB 一次成功（通道累计 **4/4**）；163 字提交方自算 = 构建断言一致；iframe 桌面 600px / 移动 534px 精确；iframe 内点击展开活体过；console 零 demo 责任；llms.txt 零手动收录。4 缺口（门面/交接/编号时序/过时 dev 走查）已随协议 v0.6 收口，清单见指针表 sim-digest 行。

---

## v0-design（2026-09-27 建）

- **适应度声明**：怎么算合适 = 第二个想法上架时，不用再回头翻散装文档（CLAUDE.md / 协议 / spec / digest 四处拼跑法）即合适；最小样本 = 1 次实战（时空语录首跑）。
- **首战校准（2026-09-28 done，拍星星找故事二跑）**：指针制全命中（通道表/协议/digest 一次到位，零散装翻找）；回改 3 处——§② 补二跑实测数、§③ 补 preview 截法、§⑤ 补 canvas 交互驱动+vite 噪音归类；无步骤多余；§③ 预收编的 CRLF 坑本次 `newline=''` 生效零瑕疵。
- **摘标窗口跑（2026-09-29 三跑，家庭任务清单）**：**未摘标，留 v0**——回改 5 处（§② 三跑实测数、§③ 四件套条件件、§⑤ dev/preview 走查介质坑、指针表 +2、v0 本节）；判定依据=手册未覆盖 §9 首析时的提交路径，逼出指针表外翻 `docs/graveyard-review-design.md`（协议 §9 的指针链二跳——严格口径算翻文档）。**首次行使**：打回重修（375 溢出→最小修→lineage post_edits→复验）、§9 四件套、preview 走 preview server。摘标条件顺延为「第四个想法零翻文档零回改」。
- **否定式覆盖清单**（「未行使什么」，三跑后口径；~~-删除线~~=已行使）：
  - [x] flash-lite 备用通道（三跑均未用——Agnes 一次成功率 3/3，备用通道持续零实战数据）
  - ~~打回重修流程~~（**三跑已行使**：375px 成员卡溢出 382>341 → 打回提交方最小修 `flex-wrap` → post_edits 簿记 → 复验清零——闭环走通）
  - ~~外部提交接收路径~~（**2026-09-30 模拟行使**：外部侧临时目录打包 + 站侧接收全链通，⑦ 节即其沉淀——强度=流程全通，非真外部方；真外部首提时按 ⑦ 复核）
  - [x] preview 缺失不阻断分支（三跑均附带 preview；站侧回退占位卡分支仍无实战）
  - ~~坟场分析槽位~~（**三跑已行使**：§9 四件套首析落地——analysis.md + lineage 四字段 + 构建断言 + 想法页区块全链通）
- **调整或退役线**：首战有回改 → 留 v0；摘标条件顺延。若届时仍要四处拼跑法，降级回 CLAUDE.md 注记。
- **接线声明（2026-09-28 审计补记，清「条款落盘+接线」判据欠账）**：hook/cron 面**零接线且够用**——六步均人/主线程驱动；300 字断言内嵌 astro 构建管线（`src/pages/ideas/[slug].astro`）；llms.txt 自动派生在 `src/pages/llms.txt.js`；收尾记 STATUS/dispatches 由 STATUS 契约三触发承担；权限接线（npm build/dev、`npx astro dev stop`、chrome-devtools MCP）已入项目 settings.json。
