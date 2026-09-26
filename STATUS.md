# State

| task_id | status | 一句话 | 指针 |
|---|---|---|---|
| scaffold | done | 最小骨架+调研+双实验已就位 | research/ docs/dispatches.md |
| site-spec | done | 本地站功能定稿（4 页/内容模型/全链工作流/验收） | docs/spec-site.md |
| first-real-idea | pending | 用真实想法跑通「想法→demo→挂本地站」全链。**2026-09-26 定界（用户）：site 只做承载+协议+验收，不管落码**——demo 在外部项目生成，按 docs/demo-protocol.md v0.1 提交（两件套+lineage 血统+三跳实机验收）。**站侧 ⑦ 11 条已落码（run 20260926T211205-323e，含 ⑦-1 hasDemo 文件探测）+ V2-V7 主线程实机代验通过（截图在 run shots/）**；余：V1（等首个真实 demo）+ V8（用户形态走查）+ 用户浏览器签收 V2-V7；⏸5 可翻案 | 等外部项目首个提交; docs/spec-site.md; docs/design-spec-site.md; docs/demo-protocol.md |
| process-audit | done | 流程合规审计裁定=有条件成立（6 域 5 符合；rev 血统欠账已清偿，治本+回填见 5d9a6ca）；观察项：实验截图无 LFS 约定、dispatches 机器面（agent_spawns.jsonl）未闭环对账 | run 20260923T190745-a8ee |

# Deadends

| 试了 | 死于 | 别再试 | 时点 |
|---|---|---|---|
| glm-5.2 单发大 HTML | reasoning 吃预算+16k 截断+读超时（203s） | 别再拿它做一次性大文件生成，长处在长上下文问答/改码 | 2026-09-23 E1b |
