# 透镜5：平台依赖——评估知识笔记

> 学习阶段产物（run 20260928T102259-a70f）。分管切片：acqui-hired 全 7 条 + hardware-failed 全 5 条 + 全库 killedBy 依赖链视角。评审时带此笔记上岗。

## 1. 透镜职责

评审新想法时只问一件事：**这个想法的命脉攥在谁手里？**——核心能力建在谁的 API/平台/硬件上、依赖多深、那个「别人」有没有动机或前科把它抽走。

## 2. 死法画像

### P1 掏心式收购：买的是人，产品成遗孤【confidence：高】
大厂挖走创始人+核心团队（或收购公司只要人），产品瞬间成孤儿——维护者清零，用户资产蒸发。信号：当团队价值 > 产品价值，产品随时可被「人才收购」顺手杀掉。
- `Inflection AI / Pi（acqui-hired，Microsoft）：hired CEO Mustafa Suleyman and most of the engineering team, leaving Pi as an orphaned product`——15 亿美元估值照样掏空
- `Adept AI（acqui-hired，Amazon）：Amazon hired 80% of the team including the CEO and co-founders`——80% 团队一夜走人，还引来 FTC 关注
- `Relay.app（acqui-hired，Google）：Bank and part of the team joined Google's Chrome division`——首页只留一句 shutting down，一个月后谜底是创始人入职

### P2 断粮式收购：买你不是用你，是不给对手用【confidence：中（单例，机制清晰）】
工具若成了多家共用的底层基础设施，可能被某巨头买下后立刻关停——动机不是整合而是断供竞品，你的全部客户变陪葬。
- `Stainless SDK Generator（acqui-hired，Anthropic）：Used by OpenAI, Google, Cloudflare, Replicate, Runway, and Meta…a strategic kill to deny competitors access to critical infrastructure`——OpenAI/Google/Meta 一夜失去 SDK 自动生成

### P3 远程处决：智能设备是云的客户端，公司死=设备砖【confidence：高】
hardware-failed 五条没有一条死于物理损坏，**死状全部是远程废掉**：设备或数据由云端/母公司一键抹除，买家手持砖头无退款。硬件死法的底层是依赖结构死——智能不在设备上，在别人服务器上。
- `Humane AI Pin（hardware-failed，Reality）：All $699 devices were remotely bricked when cloud services shut down. No refunds offered.`
- `Moxie Robot（hardware-failed，Embodied Inc.）：funding collapsed…the company shut down abruptly — bricking all devices`——自闭症儿童对着机器人录告别视频
- `Limitless Pendant（hardware-failed，Meta）：immediately ended hardware sales, sunset the desktop app`——买家自有产品线，买技术不养产品
- `Rabbit R1（hardware-failed，Reality）：Buyers stuck with a $199 paperweight`——公司转纯软件，硬件弃养

### P4 薄壳 wrapper 被原生功能碾平：平台自己出手那天就是死期【confidence：高】
产品=别人模型 API 上的一层皮。当模型厂把该功能做成自带（免费/捆绑），皮的价值一夜归零——不是平台针对你，是它的产品迭代顺手碾过你（跨类型视角：startup-failed 里最大簇）。
- `ChatPDF / PDF Chat Wrappers（startup-failed，OpenAI / Google / Anthropic）：obsolete overnight when OpenAI, Google, and Claude added native file upload`——一个品类集体死
- `Jasper AI（startup-failed，OpenAI / Anthropic）：wrapper business model collapsed as GPT-4o and Claude made its core features available for free`——15 亿估值独角兽
- `Tune AI（startup-failed，AWS / Google / Azure）：cloud providers released identical tooling at lower cost`；`Huxe（startup-failed，Google / Spotify）：Spotify 在关停公告前一天上线近乎相同的功能`；`Reforged Labs（startup-failed，Foundation Models）：the gap we were selling into is closing`（客户被基础模型教会了自建）

### P5 凶手高度集中：你命悬的对象，就是最爱杀的对象【confidence：高】
当期全库 killedBy 家族计数：**OpenAI 29、Google 26、Anthropic 10、Microsoft 10**——四大家合计 75/128 = **59%**（Meta 5、Amazon/AWS 5、自毁 8、长尾各 ≤3）。依赖任何一家的 API 生态=把命交给坟场头号刽子手；且它们连亲儿子都杀：`OpenAI Assistants API（product-killed，OpenAI）：a hard cut, no read-only mode, no grace period`；`Amazon Bedrock Agents（product-killed，AWS）：maintenance mode…CreateAgent 直接 403`。亲儿子尚且如此，干儿子更无宽限可指望。

### P6 依赖越深，死状越惨：用户资产无出口【confidence：中】
死因是平台的，葬的是用户沉淀——依赖结构不仅决定你会不会死，还决定用户死得多惨，这是想法的口碑负债。
- `Character.AI（acqui-hired，Google）：Users lost unique AI personalities they had spent hundreds of hours training`
- `Weights（acqui-hired，OpenAI）：Voice models not exported as .pth/.index files before March 31 are gone; the platform kept no archive`

**当期凶手榜（killedBy 家族合并，/128）**：OpenAI 29、Google 26（含 Gemini/Google Cloud）、Anthropic 10、Microsoft 10（含 Copilot）、自毁 8、Meta 5、Amazon/AWS 5。

## 3. 评估检查单

1. 想法的核心能力建在谁的 API/平台/运行时上？逐一列出——是单点还是多点？
2. 那个平台明天把该功能做成自带的（免费或捆绑进大产品），想法还剩什么它给不了的东西？（皮有多薄）
3. 依赖的平台近三年杀过哪些自己的产品/端点？连亲儿子都杀的，别指望干儿子待遇。
4. 想法做成功后会不会变成大厂收购靶子——且买家只要团队/技术不要产品？（做出名=替别人打收购广告）
5. 若涉及硬件：断网/公司关门后，设备是还能用的资产，还是远程变砖？
6. 用户在想法里沉淀的资产（数据/调教成果/社区内容）有没有导出路径，还是随平台蒸发？
7. 依赖关系有没有合同/付费保护，还是纯靠 ToS 善意和对方产品路线图的心情？
8. 是否同时踩在几家互斥巨头的生态上——被一家吸功能，或成为两家打架的炮灰？

## 4. 诚实边界

- **样本全是公司级产品**（拿过融资、有团队、媒体报到过才进坟场）。solo 项目死法不同：没有收购价值（P1/P2 基本不适用），但抗吸功能更弱（无合同议价、无迁移缓冲）——P4 对 solo 只会更快。
- **凶手榜是别名合并的近似计数**（Google/Gemini/Cloud 归一家）；killedBy 单字段可写多家（如「OpenAI / Google / Anthropic」），逐条与家族口径有差。
- 库偏 AI 产品（killedbyai.net 选样），对非 AI 平台依赖（支付/应用商店/社交图谱）参考性未验证。
- 入库偏「被大厂杀」的高曝光案例——solo 工具默默死于平台小改动的不进坟场：依赖死法的**频率被低估、烈度被高估**。
- acqui-hired 对创始人是好结局、对产品才是死：本透镜判「产品死」≠判「人失败」。

## 5. 引用清单

- Inflection AI / Pi — acqui-hired — Microsoft
- Adept AI (Independent) — acqui-hired — Amazon
- Relay.app — acqui-hired — Google
- Weights (weights.gg) — acqui-hired — OpenAI
- Character.AI (Independent) — acqui-hired — Google
- Neeva — acqui-hired — Snowflake
- Stainless SDK Generator — acqui-hired — Anthropic
- Humane AI Pin — hardware-failed — Reality
- Rabbit R1 — hardware-failed — Reality
- Moxie Robot — hardware-failed — Embodied Inc.
- Limitless Pendant (Rewind AI) — hardware-failed — Meta
- Google Jamboard — hardware-failed — Google
- ChatPDF / PDF Chat Wrappers — startup-failed — OpenAI / Google / Anthropic
- Jasper AI (Original Platform) — startup-failed — OpenAI / Anthropic
- Writer (GPT Wrapper Era) — startup-failed — Microsoft Copilot
- Tune AI — startup-failed — AWS / Google / Azure
- Huxe — startup-failed — Google / Spotify
- Reforged Labs — startup-failed — Foundation Models
- OpenAI Assistants API — product-killed — OpenAI
- Amazon Bedrock Agents (Classic) — product-killed — AWS

数据源 killedbyai.net graveyard.json（CC BY 4.0）@ sha f1258b39，截至 2026-09-28


## 2026-09-29 首析回写（run 20260929T221336-5371，《家庭任务清单》评审；学习环写层——整层 consolidation 未触发，以下为带置信度的增量观察）

- **P2 扩充候选「生成类工具=模型厂收购关停的高发品类」**（confidence 中；依据：Reve AI Image Generation（acqui-hired，OpenAI，2026-09-27 关停，当期新条目）与 Weights（weights.gg）同凶手、同品类——acqui-hired 切片 8 条中 OpenAI 占 2）。
- **P5/尾部凶手榜计数更新**：128→135 @ sha ee47d45043d7（2026-09-29）。当期原始字段 top15：OpenAI 29、Google 20、Anthropic 10、Microsoft 7……top15 内可见合并约 71/135 ≈ 53%（前口径 75/128 ≈ 59%；Google 家族长尾落 top15 外未计，此为下限近似，别名合并近似性声明保留）。
- **新增透镜操作经验「检查单前置分流」**（confidence 中，单轮实践待验证）：对零运行时依赖的纯本地 demo，本透镜正确产出=（a）标出未来引入依赖的决策点并预埋数据出口条件；（b）对照 OS 原生功能带预判产品化碾压面（P4 机制迁移、凶手从模型厂换成 OS 生态时须声明跨选样边界）。
