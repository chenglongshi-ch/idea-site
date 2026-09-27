# State

| task_id | status | 一句话 | 指针 |
|---|---|---|---|
| scaffold | done | 最小骨架+调研+双实验已就位 | research/ docs/dispatches.md |
| site-spec | done | 本地站功能定稿（4 页/内容模型/全链工作流/验收） | docs/spec-site.md |
| first-real-idea | done | **全链首跑通过（2026-09-27，时空语录）**：Agnes 34.3s 一次成功零兜底（5675 字符/3641 tok）；三件套齐（demo 7.4KB+preview+lineage 带脏树哈希）；ideas 正文 234 字断言过；build 绿×3（主线程复跑）；10 路由 200；交互/搜索/移动端实机过目（V1 过，顺带 V3/V10/V12/V13/V14）。**首跑真产品=协议缺口 9 条**（v0.3 输入，最重三条：llms.txt 手动同步面无主/producer 仓外不可 git 追溯/rev 脏树哈希语义未定，详 run digest）；遗留：语录出处考据（status=growing，shipped 前人工核） | run 20260927T162733-41bb(first-run-digest.md); demos/spacetime-quotes/; shots/first-real-idea/ |
| site-redesign-v2 | pending | **形态翻案落码完成，等用户实机签收**。代验已过：build 绿+七路由 200+V10 搜索过滤四步+V12 RSS/llms.txt+V13 giscus 占位+V14 移动端（截图 run shots/）。**用户签收位：V9 首页双主题整页+V11 about/now 文案**（占位文案待用户改写）；giscus 真评论需用户建公开 GitHub 仓库后填 src/config.ts。翻案链：用户否决朴素线→premise-audit 增量审计→框架 A 人裁 | run 20260926T214451-f984; docs/design-spec-site.md v2.0 增补节 |
| design-concept-round | done | 5 agent 设计轮（R1 开源skill/R2 参照/A1+A2 概念/RT 红队）+主线程裁决完毕。**用户裁定：概念后置不拍板**（功能与 UI 不冲突）。沉淀=design-spec **v2.1 增补**（A 净改善8条/B 反AI味清单/C token 生成法/D 编号独立资产）+docs/design-concept-candidates.md（三案候选库，含试样协议）。V9/V11 按 v2.0 原形态签收；概念脸取用协议见候选库。出题层教训=**过度规范化**（「好好思考UI」被窄化成「选概念」单选，用户反应实录收编在候选库尾） | run 20260926T222859-d9e1; docs/design-spec-site.md v2.1; docs/design-concept-candidates.md |
| process-audit | done | 流程合规审计裁定=有条件成立（6 域 5 符合；rev 血统欠账已清偿，治本+回填见 5d9a6ca）；观察项：实验截图无 LFS 约定、dispatches 机器面（agent_spawns.jsonl）未闭环对账 | run 20260923T190745-a8ee |
| graveyard-check | done | 坟场对比可行性裁定=**可行，MVP 零基建**。命门已解：结构化死因源全网唯一 killedbyai.net（128 条，causeOfDeath+deathType 六枚举全填，CC BY 4.0，免鉴权 JSON）——恰落 ≤300 条全量塞合法区，一次 LLM 调用即可；>300 条（并爬 dang/404tomb 长尾）再上 bge-small-zh 检索。中文独立坟场不存在=真空档。落位按 9-26 定界：生成归外部项目，站只加协议槽位（带 lineage+数据截至日期）+构建期验收。风险=信噪比（死因 70%+ 偏大厂砍杀型，对 solo 想法弹药薄，首版定位「撞车提醒+死因视角」非「判生死」）。**未拍板：协议槽位是否现在写进 demo-protocol v0.3，还是等首个真实想法同批落** | research/graveyard-compare.md; run 20260927T084815-0a6e; 需求台账 2026-09-27 行 |
| protocol-v0.3 | pending | demo-protocol v0.3 修订——**一次裁完两包**：①首跑协议缺口 9 条（最重：llms.txt 全站唯一手动同步面且协议无人负责/producer 指向仓外脚本站内不可追溯/rev 脏树哈希语义未定；全单见 run 20260927T162733-41bb digest §⑥）；②坟场对比可选槽位（可行性已裁，MVP 切法可直接抄 research/graveyard-compare.md §4）。裁定后落：协议正文+spec §4 同步+构建期断言（llms.txt 若收编自动生成则一并）。**顺带队列：V9 首页双主题+V11 about/now 文案用户实机签收（见 site-redesign-v2 行，占位文案待用户改写）+时空语录出处考据（shipped 前人工核，现 growing 无妨）** | docs/demo-protocol.md; D:\skill-data\runs\project-lifecycle\20260927T162733-41bb\first-run-digest.md; research/graveyard-compare.md |

# Deadends

| 试了 | 死于 | 别再试 | 时点 |
|---|---|---|---|
| glm-5.2 单发大 HTML | reasoning 吃预算+16k 截断+读超时（203s） | 别再拿它做一次性大文件生成，长处在长上下文问答/改码 | 2026-09-23 E1b |
