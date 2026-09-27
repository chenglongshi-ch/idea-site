# 坟场对比功能可行性调研（上架时自动对比 AI 项目坟场给建议）

> run 20260927T084815-0a6e · 2026-09-27 · 3 agent 并行（A 仓内约束 / B 数据源外查 / C 机制选型，digest 存档 run 目录）+ 主线程汇总
> 需求原话（2026-09-27，需求台账同日行）：「这边我记得是有一个 ai 项目坟场的，我希望上架的时候可以自行去对比分析给出建议」

## 裁定：可行，且 MVP 零基建

一句话：**结构化死因数据全网只有 killedbyai.net 一家（128 条，CC BY 4.0，免鉴权 JSON API）——恰好落在机制调研判定的「全量塞上下文合法区」（≤300 条），所以第一版不需要任何检索基建，一次 LLM 调用即可完成对比分析**；语料涨过 300 条再上本地语义检索（bge-small-zh-v1.5）。生成侧按 2026-09-26 定界落外部项目，站只加协议槽位 + 验收。

## 1. 数据底座（B 路实查，时点 2026-09-27）

| 源 | 条目 | 死因数据 | 获取/许可 | 定位 |
|---|---|---|---|---|
| **killedbyai.net** | 128 | **causeOfDeath 128/128 全填 + deathType 六枚举**（model-upgrade 46/product-killed 26/feature-removed 23/startup-failed 21/acqui-hired 7/hardware-failed 5）+ killedBy 凶手公司 | graveyard.json 免鉴权 API；**数据 CC BY 4.0**（商用须署名）；周级活跃（repo 2026-09-26 仍 push）。**获取通道实测（2026-09-27 冒烟）：主机直连 killedbyai.net 超时（curl exit 28），现实通路 = api.github.com contents API 取源 repo mixtpatrik/killedbyai（实测 101.8KB 拉取+解析 OK）** | **MVP 主料，分析骨架**；偏大厂（OpenAI 27/Google 20/Anthropic 10），创业长尾薄 |
| HF `rightaichoice/product-hunt-graveyard-2026` | 2,291（+deadpool 7,999 复核面） | 无死因；verdict（alive/dead/parked/…）+ 探测证据 | hf-mirror 可拉；CC BY 4.0 + Zenodo DOI | **统计基线**：死亡率 24.4%、AI 与非 AI 相同（24.5% vs 24.4%）、写作类工具 45.2% 最致命 |
| dang.ai/ai-graveyard | 1,757 | 无死因字段（dead 标记+日期+分类） | 无 API，Next.js RSC 需爬；许可未明示 | 长尾补料（本地分析用，原文不进站） |
| 404tomb.com | 597 | Cause of Death 完整段落（详情页） | 纯爬；中英双语 UI | 长尾死因文本 |
| theaicemetery.com | 119 | 一句话死因（首页 JSON-LD 可直接解析） | 爬；更新活跃 | 长尾死因文本 |
| aigraveyard.org | 99 | 文学化死因叙事 | feed.xml RSS 现成通道；最新鲜（更新至 2026-09-22） | 长尾死因文本 |
| killedbygoogle.com | 307 | 无死因字段 | graveyard.json 开源 MIT；api.killedbygoogle.com DNS 已死，走 GitHub | schema 模板 + 非科技死产品底料 |

关键事实：**中文独立坟场站不存在**（中文媒体「AI 墓地」报道全部指向 dang.ai），中文死因数据是真空档——对本站（中文想法）既是覆盖缺口也是差异化机会；TAAFT 无死亡标记数据面；aitoolgraveyard.com 是 AI 生成空壳。

## 2. 机制选型（C 路，时点 2026-09-27）

- **无强先例**：GitHub「startup idea validation llm」全站 44 仓库、「competitor analysis llm」123 个，无头部项目；商业工具（ValidatorAI 等）全是「LLM 记忆+报告」型。差异化在**语料面（死产品库）**而非机制；「检索 top-k → LLM 分析」即业内默认。
- **Token 账**（中文 1 字≈1 tok，每条 50–300 tok）：128 条 ≈ 1–6 千 tok（全量塞无压力，商汤积分池也可承受）；300 条内全量塞合法；2,000 条 ≈ 中位 30 万 tok——全量塞会重付全库 token（商汤 60k/5h 积分池一次爆 5 倍）且 lost-in-middle 漏看最像条目 → 假「新颖」判定，恰是红海检测最坏错误方向。
- **升级路线（>300 条触发）**：本地 `bge-small-zh-v1.5`（95.8MB / CPU 分钟级 / hf-mirror.com 本机可达 / numpy 暴力点积免向量库）一次建库 + 检索 top-k 30–50 → Agnes flash 一次性分析；BM25（jieba+rank_bm25，零模型下载）作并集兜底。坑：bge 相似度分布集中 0.6–1，**用排序别用绝对阈值**。
- **现有通道无 embeddings 端点**：Agnes 文档 0 次提及（仅 chat/images/videos）；商汤新平台（token.sensenova.cn）无；旧原生 API（api.sensenova.cn/v1/llm/embeddings）有但响应非 OpenAI 形状 + 模型清单死链，需运行时拉模型名并冒烟——故本地小模型为主案。
- **通道分工**：分析主力 Agnes flash；glm-5.2 可担长上下文分析（长上下文问答正是其长处——禁用项只是「单发大 HTML」，见 STATUS Deadends）。

## 3. 架构落位（A 路约束）

- **定界（2026-09-26 用户原话）**：「这边不管落码，只是提供一个功能和协议接口，我会在其余的地方开始」——分析生成本体（拉数据+跑 LLM+产出报告的脚本）落外部项目/脚本侧，与 demo 生成同构（`gen_demo.py` 模式：参考实现归外部侧）。
- **站侧只做三件**：①协议槽位（demo-protocol 增可选节，仿三件套）：分析产物 = 带 lineage 的文件（producer + rev + date + **数据底座与截至日期**——128 条死因库的时点必须随报告走）；②构建期验收断言（有分析产物则血统必齐，同 300 字断言先例）；③实机走查展示面（E1b 教训：形态类只认浏览器）。
- **纯静态站零运行时**：访客浏览时不可能触发分析；「上架时自行对比」的自动化时机 = 外部项目提交前跑脚本（或 pre-commit），与 demo 提交流水线同轨。

## 4. MVP 切法（建议，可否决）

1. 拉 killedbyai `graveyard.json`（CC BY，报告尾署名）→ 128 条全量塞 → Agnes flash（或 glm-5.2）一次调用出对比报告：相似条目 top + 死因归类 + 给作者的建议 + 置信边界。
2. 报告随想法按协议槽位提交，站渲染为想法页可选区块。
3. 升级触发 = 语料 >300（并入 dang/404tomb/theaicemetery 爬料时）→ 上 bge-small-zh 检索（C 路线②）。
4. 诚实边界写进报告模板：结构化死因偏大厂（战略砍杀型死亡），对 solo 想法（市场/留存型死亡）适用性有限——分析 prompt 须区分 deathType 语境，别拿大厂砍产品逻辑吓唬 solo 想法；中文死因空白 = LLM 从文章级源补标，报告标数据底座与截至日期。

## 5. 风险与边界

- **信噪比**是头号风险：128 条死因 70%+ 是大厂行为（model-upgrade/product-killed/feature-removed），startup-failed 仅 21 条——「给建议」的弹药对创业想法其实偏薄，首版预期管理为「撞车提醒 + 死因视角」而非「判生死」。
- **合规**：killedbyai/HF 为 CC BY 4.0（可商用须署名）；爬取源（dang/404tomb/theaicemetery）本地分析可，死因原文上站展示需再裁。
- **鲜度**：killedbyai 周级、aigraveyard.org 最新鲜、HF Part 2 日更——分析产物带数据截至日期即可，无需自建实时。

## 血统

- 产线：run 20260927T084815-0a6e（三 digest：agent-a-repo-sweep.md / agent-b-data-sources.md / agent-c-mechanism.md，存 `$SKILL_DATA/runs/project-lifecycle/<run_id>/`）
- 本文 producer = 主线程汇总；外部事实时点均为 2026-09-27 实查；git rev 见随附提交。
