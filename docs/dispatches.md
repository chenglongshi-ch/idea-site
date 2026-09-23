# 派发台账（append-only）

> runtime-contract 协议3：每次 Agent 派发记一行 `日期 | agent | 任务 | 时长 | token | 结局 | 断点状态`。
> kill 不触发通知，本台账是在途工作的人可读凭据；机器面自动账本在 `$SKILL_DATA/logs/agent_spawns.jsonl`。
> 关联：run `20260923T081530-e24b`；派发动机见 `.claude/premise-audit.md` 与 run.json `next_step`。

| 日期 | agent | 任务 | 时长 | token | 结局 | 断点状态 |
|---|---|---|---|---|---|---|
| 2026-09-23 | research:vedio-assets | vedio 可复用资产盘点（只读） | 378s | 71,980 | 完成 → research/vedio-assets.md（13.9KB，核验过） | — |
| 2026-09-23 | research:sensenova | SenseNova 平台模型/额度盘点 | 505s | 127,712 | 完成 → research/sensenova-platform.md（10KB，核验过） | — |
| 2026-09-23 | research:demo-generators | 开源 idea→demo 工具盘点（11 路线） | 787s | 60,777 | 完成 → research/demo-generators.md（17.7KB；Dyad/Onlook 主线程浏览器复核后折入） | — |
| 2026-09-23 | research:precedent-products | 同类想法展示产品/形态调研 | 808s | 55,759 | 完成 → research/precedent-products.md（14.6KB，核验过） | — |
| 2026-09-23 | research:ai-discoverability | 独立站被人+AI 发现机制调研 | 1,198s | 78,819 | 完成 → research/ai-discoverability.md（21.6KB；后经代理+Chrome 补齐官方一手） | — |
| 2026-09-23 | exp:e1-e2 | E1 Agnes 生成 HTML demo + 浏览器验收；E2 iframe 嵌入验证 | 393s | 32,957 | 完成 → 判定**通**（demo.html 12.3KB + RESULT.md + 双截图，主线程核验过；冒烟空回复/1 条无关报错两瑕疵已记录） | — |
| 2026-09-23 | exp:e1b | E1b SenseNova 对称实验（用户改指令：换商汤自研模型；glm-5.2 留参考列） | 1,982s | 60,784 | 完成 → 自研 flash-lite **半通**（31.7s/14k 字/倒计时显示冻结 bug，须 thinking:disabled）；glm-5.2 对本任务**不通**（203s+截断+超时）；主力推荐维持 Agnes；含 thinking 探针/工艺沉淀（思考字段名双查），主线程核验过 | — |
| 2026-09-23 | scaffold | 最小骨架：CLAUDE.md(71行,含锚段)+STATUS+README(继承清单)+git 首提 | 175s | 52,043 | 完成 → 首提 `b427436`（27 文件 3075 行），.env 未跟踪三重验证，工作树 clean，主线程核验过（锚行/thinking 标记/模型表/两节/继承清单全在） | — |
