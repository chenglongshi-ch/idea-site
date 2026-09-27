---
name: idea-onboarding
description: 想法上架全链操作手册（site 独立站）——想法→生成demo→提交→验收→上架六步的跑法与坑位。Invoke when 上架新想法 / 跑想法全链 / 新想法起手 / 生成 demo / 验收 demo / 收到 demo 提交 / demo 挂站 / idea onboarding / launch a new idea / demo acceptance / review a demo submission。
---

# idea-onboarding — 想法上架全链操作手册（site 独立站）

把「想法 → 生成 demo → 提交 → 验收 → 上架」的跑法收进一本手册。消费者 = 未来会话 / 被派发的 agent（第二个想法上架起直接照此跑）。血统 = 时空语录首跑（run 20260927T162733-41bb，2026-09-27 全链首次跑通）。

**本文只收操作顺序 + 坑位**；协议细则、通道参数、页面 schema 一律指针，防双源漂移：

| 要查什么 | 去哪 |
|---|---|
| 模型通道表（Agnes / flash-lite / glm-5.2 一手结论与端点） | `CLAUDE.md` 领域关键事实节 |
| 提交协议 v0.3（三件套清单 / lineage schema / 300 字口径 / 验收噪音归类） | `docs/demo-protocol.md` |
| 页面清单 / 内容模型 / 新增想法工作流 | `docs/spec-site.md` |
| Agnes 端点 / 限额 / 节流事实卡 | `research/vedio-assets.md` §2 |
| 首跑实录（本手册坑位的原始出处） | `D:\skill-data\runs\project-lifecycle\20260927T162733-41bb\first-run-digest.md` |

近同型（查重索引 2026-09-27）：`novel-initializer` agent（obsidian-novel-engine，「想法→vault 结构落地」同形不同域，无复用关系，仅登记）。

## ① 输入与前置

- 想法文本 + 出处。**含引语/名人言论的想法，出处必须可考**——模型生成内容默认不考据（首跑 18 条语录多处出处存疑，判「验证期可接受、shipped 前人工核」；时空语录后做 5 处最小修，lineage `post_edits` 字段记手改——手改走这个先例）。
- slug 规则见协议 §5（一经挂站不改）；想法条目 frontmatter 对齐 `src/content.config.ts`。

## ② demo 生成（通道选择 + 命令模板）

通道裁定细节看 `CLAUDE.md` 通道表，此处只收跑法：

- **Agnes `agnes-2.5-flash` 主力**——首跑实测 34.3s 一次成功零兜底（3641 tok）。
- **flash-lite 备用**，两个前置缺一不可：请求必带 `{"thinking":{"type":"disabled"}}`（否则思考吃光预算正文 0 字）；产出必过浏览器功能验收（E1b 同名 `render()` 覆盖致倒计时冻结的教训）。
- **glm-5.2 禁用于单发大 HTML**（STATUS Deadends 已录，勿重试）。

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
- lineage 必填 `producer` / `rev` / `date`；`rev` = 生成时刻工作树 HEAD 12 位 hex（无论脏净一律记），脏树**必加** `artifact_sha256`（index.html sha256 前 12 位）——语义见协议 §3 注①。
- **producer 仓外记法（2026-09-27 人裁定案 A）**：走 run 体系的提交方 `producer` 指 run 目录（repo 外持久 + run_id 现成追溯）；不走 run 的必加 `producer_sha256`（脚本内容哈希，仅对新提交生效）。三案利弊存档 `docs/producer-lineage-decision.md`。
- 坑：生成脚本写产物用二进制或 `newline=''`——Windows 文本模式 CRLF 膨胀，致 lineage `size_bytes` 与磁盘不符（首跑实录瑕疵）。
- 想法 + demo 同批一次提交：`status` 取 `growing`，changelog 行随条目由提交方写（时序口径见协议 §4）。

## ④ 构建验收

- **形态验证前重启 dev server**——content.config schema 变更后，长驻 dev 会话某次热更可能用陈旧 schema 校验新条目（collection 清空 → 全页 404 假象）。
- **`npm run build`（新进程）为准**，不以长驻 dev 表现下结论。
- 想法条目 body ≤300 字为构建期断言（计数口径见协议 §4）。
- 坑：TaskStop 杀 npm wrapper 杀不死 astro 子进程——停服务用 `npx astro dev stop`。

## ⑤ 实机验收清单（逐项点检）

形态类评价只认实机/截图，读代码不算（E1b 冻结 bug 即反例）。逐项：

1. **路由 200**：`/`、`/ideas/<slug>/`、`/demos/<slug>/` + 既有页面全量点一遍。
2. **console 归类**：报错分两类（协议 §6）——demo 责任（外链请求/弹窗/demo 自身 JS 报错）→ 打回；站级噪音（如 `/favicon.ico` 404）→ 站侧待办，不归提交方。
3. **交互活体**：iframe 内真点真验（首跑例：穿梭按钮连点 5 次全部切换无连续重复）——显示冻结类 bug 读代码看不出来。
4. **移动端 375×667**：宿主页无横向溢出；iframe 高 `min(600px, 80vh)` 分支生效；demo 内部无横向滚动。
5. **搜索**：想法关键词命中且只命中该卡；无结果词出空态。
6. **preview 上脸**：卡片从状态色渐变占位 → 真实截图（img src 指向 preview）。

截图存 `shots/<slug>/`（交互前后对照各一张 + 移动端）。走查毕 `npx astro dev stop` + curl 复核端口已关。

## ⑥ 上架收尾

- STATUS.md：对应 task 行更新（新想法则加行）。
- `docs/dispatches.md`：派发记录补一行。
- changelog：条目内随提交方已写，过验后只追加验收记事、不改写（协议 §4）。
- **llms.txt 零手动**：构建期自动派生（`src/pages/llms.txt.js`，源 = ideas collection）——提交物不含它、零同步责任；走查带一眼 `/llms.txt` 200 即可。首跑曾手动漏同步出真实事故，v0.3 已治本，勿再手写。
- git 提交归主线程 / change-set squash（main 只收 squash merge；被派发 agent 零 commit）。

---

## v0-design（2026-09-27 建）

- **适应度声明**：怎么算合适 = 第二个想法上架时，不用再回头翻散装文档（CLAUDE.md / 协议 / spec / digest 四处拼跑法）即合适；最小样本 = 1 次实战（时空语录首跑）。
- **首战校准条款**：第二个想法跑完，按实际卡点回改本手册——哪步被迫翻了别处（=指针不够用）、哪步多余、哪个实际坑没写进来。
- **否定式覆盖清单**（「本次未行使什么」，首战后填）：
  - [ ] 待填：flash-lite 备用通道（首跑未用）
  - [ ] 待填：打回重修流程（首跑一次过，未走打回）
  - [ ] 待填：preview 缺失不阻断分支（首跑附带了 preview）
  - [ ] 待填：坟场分析槽位（协议 §9 定稿后首用）
- **调整或退役线**：首战后若手册没有减少翻文档量（仍要四处拼），降级回 CLAUDE.md 注记；若第二个想法跑完零回改且第三个想法也不翻文档，摘 v0 标。
