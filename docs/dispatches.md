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
| 2026-09-26 | research:R1-os-skills | 开源设计 skill+同位设计资产盘点（run 20260926T222859-d9e1 第一波·design-round 复现） | 608s | 67,012 | 完成 → agents/R1-os-skills.md（109 行 6 节，核验过；top3=P0 frontend-design 整件/P1 Radix 阶表+Open Props/P1 TypeUI 注册表；照出 v2 现状坐 AI 默认聚集区邻位；通道工艺=chrome-devtools 页内 fetch 兜底） | 断点×1 已救回 |
| 2026-09-27 | design:A1-concept | 设计概念稿·总监视角（消费 R1+R2，自选姿态深化）（同 run 第二波） | 296s | 64,148 | 完成 → agents/A1-concept.md（106 行 8 节，核验过；自选 A 苗圃·「留灯的苗圃」：形式回填意义+shipped=出圃补词表层；5 条裁决性原则+六材质词表；正面反驳 R2 首推 B 三点论据+编号件列为嫁接项；宋体成色标实机过目） | — |
| 2026-09-27 | design:RT-review | 红队：四稿对抗审（稿间/A1↔A2 互驳/rubric 复核/稿↔代码/权威源自撞）（同 run） | 223s | 77,739 | 完成 → agents/RT-review.md（125 行 8 节，核验过；P0×2/P1×5/P2×6，A2 对账 9/9 命中、A1 hover 漏看；立场=只改呈现不替拍板） | — |
| 2026-09-27 | main:synthesis | 主线程综合裁决：五稿亲读+13 项逐裁+登记号补充论证 → synthesis-rulings.md；方向级拍板交用户 | — | — | 完成 → synthesis-rulings.md（同 run） | — |
| 2026-09-27 | fold:design-round | 沉淀：design-spec v2.1 增补（A 净改善/B 反AI味/C token 法/D 编号资产四节）+design-concept-candidates.md 候选库（用户裁定概念后置） | — | — | 完成 → 两文件落盘（主线程直写，材料已全读过） | — |
| 2026-09-27 | mockup:M1-baseline-nursery | 基线打磨版+苗圃 mockup（用户直令「给我候选效果或 mockup」——形态只认实机） | 283s | 71,661 | 完成 → baseline-polished.html(263行,圆角三档同屏+hover-lab before/after 并排定格)+nursery.html(265行,暖黑#171310+琥珀只照活物+材质分化圆角+宋体≥1.6rem+玻璃罩檐口),核验过;未尽=单主题/静态摆设过滤 | — |
| 2026-09-27 | mockup:M2-cabinet | 夜巡馆 mockup（A2 token 表直接折） | 283s | 71,063 | 完成 → cabinet.html（402行，章戳1px外框+黄铜严守三处+卡角编号paper带+衬线≥1.6rem 三处；agent 自带渲染验证），核验过 | — |
| 2026-09-27 | main:mockup-verify | 主线程 chrome-devtools 三页截图代验（1200px fullPage） | — | — | 完成 → shots/design-mockups/{baseline-polished,nursery,cabinet}.png；三脸视觉方向均忠实概念稿无跑偏；baseline 未逐像素代验（现状脸跑偏风险最低） | — |
| 2026-09-27 | mockup:M3-sidebar | **用户裁定样式=baseline 产品脸**（概念脸归档候选库）；新需求=侧边栏+页面重划分 → 三文件侧边栏布局 mockup（home/idea/about） | 383s | 72,864 | 完成 → sidebar-{home 235/idea 233/about 179 行}，agent 自验+主线程截图代验（home/idea 过目，about 同构）；三裁量记头注：想法页不做上下株导航/状态词种植隐喻（mockup 级，待用户裁）/about 素文无卡 | — |
| 2026-09-27 | research:R3-ai-query | AI 可查询接口调研：llms.txt 生态/结构化端点/MCP 静态内容（run 20260927T084023-1a1d） | 347s | 61,504 | 完成 → agents/R3-ai-query.md（95 行 7 节+来源清单，核验过；一手：Anthropic llms.txt=69KB full 版判例/分片=规范原生/agents.json 停更 13 个月不适用/mcpdoc=唯一消费侧证据；零后端档=.md 镜像+feed.json+ideas.json，轻后端档=Workers remote MCP 两工具） | — |
| 2026-09-27 | research:R4-ai-act | AI 可操作通道+权限约束模式调研（同 run） | 464s | 54,662 | 完成 → agents/R4-ai-act.md（91 行 7 节，核验过；curl 一手 8 源；结论：零后端档=内容写走 git PR+branch protection 人审、反响写走 Discussions GraphQL（public_repo token 已验证可写，站零改动）、发现面补 agents.md；轻后端=edge proxy per-key quota，压力出现再上；威胁模型=solo 个人站基线） | — |
| 2026-09-28 | exp:cdtmcp-dual | 双实例并发实验：默认无旗标×2/--isolated/共享 browserUrl 三配置，MCP stdio JSON-RPC 探针（run 20260927T222720-f250；断连救回 1 次） | 3383s | 82,463 | 完成 → 03-per-sub/exp-results.md+raw×3+清理审计：**默认×2 双双被挡**（already running…Use --isolated，撞上他会话真实争用）；**--isolated×2 隔离成功**（页表 0/0 互不见+两棵独立 chrome 树+pipe 无端口）；**共享 browserUrl 双向串台**；--port/--tabs 不存在、--pageIdRouting 默认 true 非隔离、--autoConnect 存在；终态干净零残留、他会话进程未动 | — |
| 2026-09-28 | docs:cdtmcp-flags-scopes | 文档取证：chrome-devtools-mcp 旗标/profile 策略/issues + Claude Code MCP 作用域（gh+curl 带内通道）（run 20260927T222720-f250；断连救回 1 次） | 3000s | 66,271 | 完成 → 03-per-sub/B-docs-*.md×2+证据快照×11：官方 §Concurrent sessions 明文多会话=每会话 `--isolated`（#2052 维护者原话背书）；默认 profile 持久+单浏览器；一个 server 不管多 Chrome（#1019）；`--port`/`--tabs` 不存在（否定性）；CLI 与 MCP 面 isolated 默认相反；CC 作用域 local>project>user 整条覆盖、user 级做不了每会话旗标；CC 文档缺 per-session 进程模型表述（由对侧文档+本机 4 实例实证补） | — |
| 2026-09-28 | census:local-wiring | 本机接线实况：~/.claude.json 作用域覆盖+.mcp.json 普查+活 server/浏览器进程 census（只读）（run 20260927T222720-f250；ECONNREFUSED 断连 1 次 SendMessage 原地救回） | 1388s | 58,407 | 完成 → 03-per-sub/C-local-wiring.md：**4 个 server 实例并存无进程冲突，但全共享一个固定 profile**（~/.cache/chrome-devtools-mcp/chrome-profile）；pipe 连接无 TCP 端口；真冲突=profile 单例锁，并发第二会话报「already running…Use --isolated」（源码 BrowserManager.js:252-257 一手行号）；默认配法=并存成立/各控各浏览器不成立 | — |
| 2026-09-27 | research:graveyard-repo | 坟场对比·仓内盘点（run 20260927T084815-0a6e） | 85s | 52,922 | 完成 → run 目录 agent-a-repo-sweep.md（坟场资源仓内零命中；槽位两扩法+定界+静态站约束+glm-5.2 长上下文契合点，主线程核验过） | — |
| 2026-09-27 | research:graveyard-sources | 坟场对比·数据源外查（同 run） | 230s+首跑600s | 106,557(续跑段) | 完成 → run 目录 agent-b-data-sources.md（三档 11 源全实测；核心=killedbyai 128 条结构化死因 CC BY；中文坟场不存在；主线程核验过） | 断点×1 已救回（看门狗 600s 停摆→SendMessage 原地续跑） |
| 2026-09-27 | research:graveyard-mechanism | 坟场对比·机制先例与选型（同 run） | 106s+首跑中断 | 101,598(续跑段) | 完成 → run 目录 agent-c-mechanism.md（无强先例；≤300 全量塞合法/>300 上 bge-small-zh+top-k；两通道均无 embeddings 端点；主线程核验过） | 断点×1 已救回（ECONNREFUSED→SendMessage 原地续跑） |
| 2026-09-27 | main:graveyard-synthesis | 主线程汇总：三 digest → research/graveyard-compare.md 裁定+STATUS/CLAUDE 索引/台账收编 | — | — | 完成 → 裁定=可行 MVP 零基建（材料已全读过） | — |
| 2026-09-27 | run:spacetime-quotes | 时空语录全链首跑：扮外部提交方按 demo-protocol v0.2 走「想法→Agnes 直出 demo→三件套→挂站→实机验收」（run 20260927T162733-41bb，用户直令「demo 不关键…看看流程」） | 1,379s | 75,409 | 完成 → digest 落盘 run 目录；Agnes 34.3s 一次成功；10 路由 200+交互实测+6 截图；**协议缺口 9 条**（首跑核心交付）；主线程核验过（三件套/字数/lineage/截图过目/build 复跑绿） | — |
| 2026-09-27 | main:verify+ledger | 主线程落盘核验+三批 squash 提交（概念轮 docs / 坟场调研+审批带 / 首跑 feat） | — | — | 完成（本行所属提交） | — |
| 2026-09-27 | design:A3-arch | 综合架构稿：消费 R3/R4/R5 出五维能力矩阵+两档演进案+权限模型+拍板点（同 run） | 173s | 50,694 | 完成 → agents/A3-arch.md（147 行 8 节，核验过；本期案=查询 4 端点全静态+操作 2 通道+权限 L0-L3；拍板点 3 主 2 小；稿间唯一分叉收敛=version 内嵌 payload） | — |
| 2026-09-27 | design:RT2-review | 红队：架构稿对抗审（安全面/前提缺口/稿↔现实缝/自撞）（同 run） | 289s | 66,932 | 完成 → agents/RT2-review.md（160 行 8 节，核验过；P0×1=仓未上云总前置缺位+P1×6+P2×5；主体架构未被推翻） | — |
| 2026-09-27 | main:synthesis-2 | 主线程裁决：12 项逐裁+零号升格 → synthesis-rulings.md；premise-audit 增量段四段补齐 | — | — | 完成 → **用户中途拍板零号=先不配置 remote**：操作面挂起为 roadmap，查询面本地开做 | — |
| 2026-09-27 | implement:ai-query | Q1-Q4 查询端点落码（分支）：llms.txt 构建生成+删旧件+.md 镜像+feed.json+ideas.json+AGENTS.md+sandbox 硬化 | — | — | **死产**（2026-09-27 对账：零提交零分支零 stash——中断死于未落盘；llms.txt 部分已由本日 main:protocol-v0.3 重做落地，其余 Q1-Q4 端点排队） | — |
| 2026-09-27 | research:R5-storage-version | 数据存储与版本三层语义调研（同 run） | 266s | 50,856 | 完成 → agents/R5-storage-version.md（97 行 6 节，核验过；curl 一手 6 源；结论：零后端档=内容/血统/审计全留 git+互动托管 giscus+契约带版本号，demo-protocol 版本模式可推广为契约模板；外部 agent 提交升 PR 式零成本演进） | — |
| 2026-09-27 | design:A2-concept | 设计概念稿·设计工程师视角（token/动效/落地实案）（同 run） | 264s | 68,926 | 完成 → agents/A2-concept.md（136 行 8 节，核验过；自选 B 标本馆改造为 dark-first「夜巡馆」：编号系统复利（卡片/页/RSS/llms.txt 四吃）+6 token 名保留只换值+首页单页试样 5 分钟三问；反AI味 3 邻区配防线；编号来源三案⏸留裁） | — |
| 2026-09-26 | research:R2-references | 想法站设计语言参照+概念姿态选项集（同 run） | 342s | 66,693 | 完成 → agents/R2-design-references.md（96 行 5 节，核验过：curl 7 站+chrome-devtools 实机 4 站；5 姿态选项集 A苗圃/B标本馆/C图纸间/D街机厅/E实验记录本，首推 B） | 断点×1 已救回（SendMessage 零重读） |
| 2026-09-27 | research:quote-verify | 时空语录 18 条语录出处考据（run 20260927T170825-2dc0，四档裁定+必改清单） | 4,614s | 94.3k | 完成 → quote-verification.md（54 行，主线程核验过；结论=确认 2/出处讹 4/文本讹 5/存疑 7，恩格斯+霍尔丹类目硬错坐实；WebSearch 配额断改走 chrome-devtools 直取证据页——wikiquote 11 词条全文检索+马恩全集卷 20 扫描） | — |
| 2026-09-27 | research:graveyard-design×3 | 坟场评审设计轮三路：A 人格评审先例 / B 自动学习机制 / C 经验自整理（同 run；digest 各落 run 目录 agent-{a,b,c}-*.md） | A 587s / C 283s；B 中断 | A 58.1k / C 57.6k | A、C 完成（80/83 行，主线程核验过；A=类别透镜人格+保分歧+单调用面板可落，C=触发三型+冲突真空+平移清单）；**B 死于 glm-5.2 5h 配额上限（429，20:27 重置）——残件仅头 6 行零内容**，独特问题面（学习质量对照证据）留缺口，重置后可 SendMessage 原地续跑 | B 断点=未开工实质段 |
| 2026-09-27 | main:protocol-v0.3 | 主线程：llms.txt 自动派生落码+build 绿 / demo-protocol v0.3 正文（7 缺口裁入+§9 占位）/ producer 决策文档待人裁 / 审批带 15→24（fewer-permission-prompts 扫 50 会话）/ 台账对账修复（ai-query 死产） | — | — | 完成（v0.3 整批提交待 producer 人裁+设计轮） | — |
| 2026-09-27 | main:quote-fix | 主线程：时空语录最小修（用户裁）——demo 5 处（3 出处串+霍尔丹出处/类目+恩格斯整条换）+lineage post_edits+ideas summary/changelog；grep 复验旧串 0/新串 5+build 绿+chrome-devtools 实机（18 条/类目分布/穿梭/console 仅站级 404） | — | — | 完成（首刀漏莱布尼茨，grep 复验抓回补刀——复验环节有效） | — |
| 2026-09-27 | main:graveyard-synthesis | 主线程综合：A/C 全文亲读（B 死于配额零内容）→ docs/graveyard-review-design.md（评审面板/学习环/首战校准/协议接口+拍板点）；+用户问「归档/查询」后亲读 R3/R5 增补 §6 数据归档与查询机制（P5/P6 入拍板表） | — | — | 完成（待用户拍板 P1-P6 后协议 §9 定稿） | — |
| 2026-09-27 | skill:idea-onboarding | 上架手册 skill 试用版起草（用户反馈「流程允许即自动做」后自动触发；查重索引+读 5 源料+落盘 v0-design 全义务段） | 363s | 57,358 | 完成 → .claude/skills/idea-onboarding/SKILL.md（94 行，主线程亲读核验过；查重=全局无同型，近型 novel-initializer 已登记引用；producer 节由主线程按当日 A 案裁定回填） | — |
| 2026-09-27 | implement:q2-md-mirror | Q2 想法页 .md 镜像落码（P6 裁定后无依赖先行；消费 R3 口径+llms.txt.js/rss 先例） | 262s | 50,626 | 完成 → [slug].md.js 端点+页面 alternate 声明+Layout head 插槽；build 绿 3 端点；主线程核验过并同批接线 llms.txt 链接直指镜像 | — |
| 2026-09-28 | research:graveyard-kb×5 | 坟场评估知识库种子·学习阶段：5 透镜 agent（产品砍杀/功能移除/创业失败/模型升级/平台依赖）并行吃透 128 条死因切片（run 20260928T102259-a70f；产物 research/graveyard-kb/personas/；P5 合规原料不落仓） | 546/305/526/744/682s | 39.8k/38.5k/39.3k/45.9k/44.1k | 完成 → 五笔记 470 行全核验（行数/sha/CC BY/temp 零残留逐项过）+主线程 INDEX 合成落盘；引用全实引，跨透镜双计已标去重原则 | — |
| 2026-09-28 | main:star-photo-stories | 主线程第二想法全链：拍星星找故事——Agnes 生成 87.7s 一次成功→三件套+条目落位→post_edits 最小修×2→build 绿×2→实机六项（iframe 活体四连拍/移动端 533.6/搜索+空态/preview 上脸/console 零报错）→idea-onboarding 手册首战校准回改 3 处（run 20260928T104718-4055） | — | — | 完成 → 9 路由 200+llms.txt 自动零手动；预估对比=流程符合，耗时 ×2.6 与产出量成比例（详 run 目录 second-run-digest.md） | — |
| 2026-09-23 | research:wiring-facts | [回填] Explore local wiring facts（run e24b 证据 agent；jsonl 机器面对账补录 2026-09-28） | — | — | 完成（推断：premise-audit.md 现存且被台账头引用） | — |
| 2026-09-23 | research:sessionstart-semantics | [回填] Verify SessionStart hook semantics（claude-code-guide，run e24b） | — | — | 未收（产物去向台账无载） | — |
| 2026-09-23 | audit:git-skeleton | [回填] 审计 git 与骨架合规（manager） | — | — | 完成（推断：其发现即 fix:audit-debt 行清偿内容） | — |
| 2026-09-23 | audit:docs-status | [回填] 审计文档实验STATUS合规（manager） | — | — | 完成（推断：同上并入 fix:audit-debt 链） | — |
| 2026-09-23 | census:multi-project-docs | [回填] 多项目文档盘点（manager，跨项目性质） | — | — | 未收（产物去向台账无载） | — |
| 2026-09-28 | audit:status-claude | 整理·STATUS+CLAUDE 对账审计（只读 digest；run 20260928T141720-b7c4） | 118s | 34,220 | 完成 → digest：仓库内 14 指针全在；demo-protocol v0.1→v0.3 漂移实锤+死端候选×2；已改 | — |
| 2026-09-28 | audit:permission-band | 整理·.claude 体系+权限带月度复审（同 run） | 159s | 45,628 | 完成 → digest：主 settings 24 条净（3 条 uv 细分被通配遮蔽）；local 98 条中约 75 条残迹；ask/deny 空；接线欠账 1 笔——已改（local 清至 5 条+deny .env+ask push+SKILL 接线声明） | — |
| 2026-09-28 | audit:docs-consistency | 整理·docs 一致性审计（同 run） | 222s | 65,849 | 完成 → digest：spec-site v1.2 落后现实 4 处（页面清单/镜像端点/gen_demo 引用/验收框）；graveyard 两处「待拍」残留；candidates 缺终局注——已改（spec v1.3 等） | — |
| 2026-09-28 | audit:research-outputs | 整理·research+产物目录审计（同 run） | 218s | 69,573 | 完成 → digest：调研索引缺 graveyard-kb 行；demo-generators/vedio-assets §3 无结案注；example-a 退役条件达成未执行；无 .gitattributes——索引/结案注已改，后两项待人裁 | — |
| 2026-09-28 | audit:dispatches-reconcile | 整理·dispatches 机器面对账草拟（jsonl site 62 ↔ 台账真派发 47；process-audit 观察项闭环） | 215s | 47,876 | 完成 → 回填 5 行 09-23 老账+今日 5 行真实数；反向差 1 条（graveyard-design C 路无 spawn 记录，疑 SendMessage 续跑或 hook 漏记，非旧派发） | — |
| 2026-09-28 | main:numbering-giscus | 主线程：编号迁移 git mv ×4 + lineage slug 同步/post_edits + changelog 簿记 + 协议 v0.4 + 文档同步×5 + build + 实机截图（站能力两件裁定后落地；giscus 站侧零改动确认就绪） | — | — | 完成（本行所属提交） | — |
| 2026-09-29 | panel:graveyard-A×5 | 坟场评审首战·A 臂：5 透镜 agent（带 KB 经验笔记）各自直连拉当期 135 条切片独立评审《家庭任务清单》（run 20260929T221336-5371；产物 panel-A-*.md；含活回测=当期比笔记基线多 7 条） | 222-535s | 44-48k/个 | 完成 → 4/5 一次完成 + feature-removed 死于 429 后 SendMessage 原地续跑救回；活回测战果=抓出 KB 引用清单漏列 4 条 + 新枚举 Parent Pulled Funding；回写候选 15 条已落五笔记 | feature-removed 断点=429 |
| 2026-09-29 | panel:graveyard-B×5 | 坟场评审首战·B 臂：5 透镜 agent（裸语料对照，无经验笔记）同想法独立评审（同 run；产物 panel-B-*.md） | 175-564s | 41-45k/个 | 完成 → 3/5 一次完成 + 2 个 429 续跑救回；产出两条最高决策价值独有洞察（指责界面/全员采用环）——校准关键证据 | startup-failed/platform-dependency 断点=429 |
| 2026-09-29 | panel:moderator×2 | 坟场评审首战·双主持人（A/B 臂各一，互盲）：归纳不表决保分歧 + 高严重度论断原文保全 + 诚实边界 | 128/189s | 58/65k | 完成 → moderator-A/B.md（A：收敛 3+分歧 3；B：收敛 5+分歧 3）；主线程合成 analysis.md（两臂合并蒸馏，B 臂独有洞察标注来源） | — |
