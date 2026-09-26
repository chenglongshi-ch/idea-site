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
| 2026-09-23 | fix:audit-debt | 审计清偿——血统 rev 治本+回填、glm52 血统指向、footer 位置立法 | — | — | 完成（本行所属提交） | — |
| 2026-09-23 | docs:product-card | 一页纸产品卡——premise-audit+spec 提炼(2fcc 遗留2) | — | — | 完成（本行所属提交） | — |
| 2026-09-23 | scaffold:site-preview | 站骨架提前——Astro minimal+4页+假数据+E1 demo 实嵌+截图 | — | — | 完成（本行所属提交） | — |
| 2026-09-23 | fix:preview-polish | iframe 定高适配+构建命令回填+spec v1.1 对账 | — | — | 完成（本行所属提交） | — |
| 2026-09-26 | research:site-functions | 功能面盘点：spec 定义 vs src/pages 实现差距（只读 digest） | 35s | 30,847 | 完成 → digest 回主线程（骨架与 spec 功能面对齐；缺口=gen_demo.py 生成侧通路+真实数据） | — |
| 2026-09-26 | research:site-ui-docs | 文档地图+界面现状+UI 设计规格缺口清单（只读 digest） | 89s | 125,991 | 完成 → digest 回主线程（4 页形态全实装、视觉=GitHub 风极简；UI 规格 5 类待答问题清单） | — |
| 2026-09-26 | research:competitors | 竞品：先消费 precedent-products.md 再 web 补搜增量（只读 digest） | 1,331s | 37,189 | 完成 → digest 回主线程（增量：halfbakery/neal.fun/uneed/wip/v0 等；WebSearch 429 限流改 curl 定向补验，主线程 curl 抽核 halfbakery 200、neal.fun 403=CDN 拦 curl 非翻案） | — |
| 2026-09-26 | design:W1-structure | UI 设计规格·结构稿：屏清单/交互流/数据依赖（run 20260926T204624-3de3） | 139s | 36,100 | 完成 → agents/W1-structure.md 70 行 7 节，核验过（iframe 定高+逃生门、hasDemo 缝、300 字构建期断言） | — |
| 2026-09-26 | design:W2-experience | UI 设计规格·体验稿：视觉 token/状态空态/形态定位（同 run） | 143s | 36,106 | 完成 → agents/W2-experience.md 58 行 7 节，核验过（token 封顶 13、暗 demo 檐口、空态两档制、朴素线偏内定位） | — |
| 2026-09-26 | design:RT-review | 红队：两稿对抗审（spec/代码/稿间三对照系，P0-P2 分级）（同 run） | 248s | 51,150 | 完成 → agents/RT-review.md 37 行，核验过（P0×0/P1×6/P2×3；hasDemo 缝行号实证；五对撞全落副责交集带） | — |
| 2026-09-26 | design:fold | 合稿：按 synthesis-rulings.md 升格 docs/design-spec-site.md 为正式规格（同 run） | 278s | 54,869 | 完成 → design-spec-site.md v1.0（118 行 8 节，裁决 9/9 落位，8 处实机验收标记与⑧表对齐，主线程终检过） | — |
| 2026-09-26 | implement:design-spec-7 | design-spec ⑦ 实现清单 11 条落码（run 20260926T211205-323e，用户直令「先做出效果」） | 301s | 53,731 | 完成 → 11/11 落码（digest 核验过：file:line 逐条对上；build 主线程复跑绿、dev 三页 200；V2-V7 主线程实机代验通过，V1/V8 留用户走查） | — |
| 2026-09-26 | implement:v2-redesign | v2.0 形态翻案落码：视觉系统+首页 hero/搜索过滤/卡脸网格+想法页重皮+about/now+giscus 配置驱动+RSS+llms.txt（run 20260926T214451-f984） | 659s | 71,251 | 完成 → 文件核验+build 复跑绿（5页+rss）+七路由 200；主线程实机代验 V10/V12/V13/V14 全过（搜索过滤四步实测/RSS XML 合法/giscus 未配置零外链/375px 单列零溢出）；V9/V11 用户签收位 | — |
