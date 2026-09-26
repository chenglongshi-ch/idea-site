# State

| task_id | status | 一句话 | 指针 |
|---|---|---|---|
| scaffold | done | 最小骨架+调研+双实验已就位 | research/ docs/dispatches.md |
| site-spec | done | 本地站功能定稿（4 页/内容模型/全链工作流/验收） | docs/spec-site.md |
| first-real-idea | pending | 用真实想法跑通「想法→demo→挂本地站」全链。**2026-09-26 定界（用户）：site 只做承载+协议+验收，不管落码**——demo 在外部项目生成，按 docs/demo-protocol.md v0.2 提交（三件套：demos/+ideas/+preview 图）。**站侧 ⑦ 11 条已落码（run 20260926T211205-323e）**；V 验收面随 v2.0 形态翻案重排（V9-V14 新增，见 site-redesign-v2 行），V1 等首个真实 demo | 等外部项目首个提交; docs/spec-site.md; docs/design-spec-site.md; docs/demo-protocol.md |
| site-redesign-v2 | pending | **形态翻案落码完成，等用户实机签收**。代验已过：build 绿+七路由 200+V10 搜索过滤四步+V12 RSS/llms.txt+V13 giscus 占位+V14 移动端（截图 run shots/）。**用户签收位：V9 首页双主题整页+V11 about/now 文案**（占位文案待用户改写）；giscus 真评论需用户建公开 GitHub 仓库后填 src/config.ts。翻案链：用户否决朴素线→premise-audit 增量审计→框架 A 人裁 | run 20260926T214451-f984; docs/design-spec-site.md v2.0 增补节 |
| process-audit | done | 流程合规审计裁定=有条件成立（6 域 5 符合；rev 血统欠账已清偿，治本+回填见 5d9a6ca）；观察项：实验截图无 LFS 约定、dispatches 机器面（agent_spawns.jsonl）未闭环对账 | run 20260923T190745-a8ee |

# Deadends

| 试了 | 死于 | 别再试 | 时点 |
|---|---|---|---|
| glm-5.2 单发大 HTML | reasoning 吃预算+16k 截断+读超时（203s） | 别再拿它做一次性大文件生成，长处在长上下文问答/改码 | 2026-09-23 E1b |
