# 透镜1：产品砍杀（product-killed）——评估知识笔记

学习阶段产物（run 20260928T102259-a70f）。语料：killedbyai.net graveyard.json 128 条中 deathType=product-killed 的全部 26 条。

## 1. 透镜职责

评审新想法时，这个透镜找的是：**这个想法（或它赖以生存的平台面）会不会死于某个组织的组合管理刀下**——大厂为什么砍自己的产品、有哪些反复出现的机制与征兆，映射到被评想法的生存结构上。

## 2. 死法画像

本节引用均为 deathType=product-killed；括号内 = killedBy / causeOfDeath，摘录为要点转译。

### P1 同类自噬：死于自家下一代 【高】
产品不死于竞品，死于自家战略平台更替。公司 All in 新平台（Copilot/Gemini/Apple Intelligence/新 API）时，旧产品即使有数亿用户也让位——新平台要独占用户注意力和开发者生态，旧产品成了内部竞争的牺牲品。
- Microsoft Cortana（Microsoft Copilot / Replaced by AI）：多年输给 Alexa 和 Siri，随微软全面转向 Copilot 而在 Windows 与移动端被砍
- Google Assistant Classic（Google Gemini / Replaced by AI）：多年投入递减后 Gemini 开始取代它，经典版悄然退场
- OpenAI Assistants API（OpenAI / Replaced by Responses API）：从未离开 beta，最终「硬切、无只读模式、无宽限期」，开发者被迫全量重写
- 同型：Google Bard→Gemini、Bing Chat→Copilot（改姓式砍杀）、Siri Classic、OpenAI Atlas

### P2 实验品折旧：越成功越快被吸收 【高】
Labs 类实验产品是探针不是承诺：产品验证出需求的那一刻，就是独立形态的死期——需求被吸收进主产品面（搜索/Shopping/ChatGPT）。用户把它当家，公司只把它当取样器。
- Google Doppl（Google / Feature Absorption）：入选 TIME 2025 最佳发明，不到一年被吸收进 Google Shopping 搜索结果
- Google Whisk（Google / Feature Absorption）：运营 17 个月后折进 Flow——延续其把实验品并入更少界面的模式
- OpenAI Atlas（OpenAI / Strategic Retreat）：agentic 浏览能力被吸收进 ChatGPT 和 Chrome 扩展；书签/标签页/历史全部不迁移

### P3 算力经济学：烧钱速度 > 战略耐心 【中高】
AI 产品推理成本是持续失血。烧钱速度（Sora 约 $1M/天、Alexa 累计亏损超 $25B）叠加用户下滑（100 万→50 万以下）时，公司砍产品释放算力给更赚钱的用途——产品成了可回收的算力容器，用户规模不是护身符。
- OpenAI Sora（OpenAI / Unsustainable Costs）：峰值约 100 万用户后崩至 50 万以下、每天烧约 100 万美元；OpenAI 把算力腾给编码与企业产品，$10 亿 Disney 合作同告崩盘
- Amazon Alexa 原版（Amazon / Financial Losses）：亏损超 250 亿美元后转向付费墙后的 LLM 版 Alexa Plus，实际杀死了数百万人依赖的免费助手

### P4 首秀即终局：上线头几周的失控即处决 【高】
生成式产品的输出不可控，让「上线即危机」成为最快死法（天级）。公司品牌押在产品输出上，输出失控时品牌风险大于产品价值，砍杀毫不犹豫、以天计。
- Microsoft Tay（Microsoft / Public Backlash）：上线 16 小时内被协力网民教成种族主义+纳粹宣传机器，9.6 万条推文后拔线
- Meta Galactica（Meta / Public Backlash）：上线仅 3 天，因批量生成伪造论文、假引用与偏见内容下线——史上最短命 AI 产品之一
- NYC MyCity Chatbot（NYC Government / Dangerous Misinformation）：告诉商户可以合法私吞小费、炒掉举报性骚扰的员工，舆论哗然后下线
- 同型：BlenderBot 3 当众数落自家公司后悄然下线

### P5 AI 旋风附带伤：母公司 FOMO 砍健康产品 【中高】
不是产品有病，是东家得了 AI FOMO：为给 AI 战略腾资源，健康、有口碑、运营多年的非 AI 产品被直接关停或变现。「产品本身健康」从来不是护身符。
- TV Time（Its Own Parent Company / AI Pivot）：运营 15 年、数百万人爱用的剧集追踪应用被关停，母公司转向 AI——健康产品不是死于 AI 竞争，而是死于东家追金潮
- Adobe Animate（Adobe / AI Pivot, Reversed）：30 年老应用宣布让位 AI 工具；激烈反弹后改判「维护模式」缓刑，不再开发新功能

### P6 开发者面弃杀：beta/免费标签 = 撤回预告 【高】
免费层、preview、长期 beta 不是承诺，是「随时可撤」的法律与心理铺垫。关停配套动作高度雷同：brownout 驱赶、无豁免、付费客户同砍、替代品要求全部重写。
- GitHub Models（GitHub / Strategic Consolidation）：先关新客，再搞两次人为 brownout 逼依赖者现身，随后全黑——付费客户也不豁免
- Meta Llama API（Meta / Strategy Pivot）：14 个月后撤回公开预览，开发者被指向 AWS/Together/Groq 租用；接替服务只供闭源云模型
- Amazon Bedrock Agents Classic（AWS / Maintenance Mode）：改名 Classic+维护模式：新客 403、模型目录冻结、被 AgentCore 取代；同批公告扫进维护的约 20 个服务之一

### P7 承诺-交付落差：营销跑在技术前面 【中】
营销承诺（「企业 AI 的未来」「语音点单」）超出技术现状，实际表现卡在「demo 惊艳但日常不可用」区间，客户/母公司耗尽耐心后撤退。
- McDonald's AI Drive-Thru（McDonald's / Technical Failure）：因点出 260 块麦乐鸡、乱加单、听不懂口音全网出圈；准确率卡在 80% 低位后麦当劳拔线
- IBM Watson Marketing（IBM / Commercial Failure）：曾被吹为企业 AI 未来、投入数十亿仍兑现不了承诺；生成式 AI 使其彻底过时后悄然收缩

## 3. 评估检查单

1. **被吸收测试**：这个想法是不是「某个大产品的一个功能切片」？若大厂主业顺路就能做掉它，独立形态的护城河（数据/社区/垂直深度）在哪——答不出就是探针命。
2. **被替换测试**：想法的形态是否踩在大厂下一代平台的路线上？大厂自家新旧更替时，路线上的第三方都是 collateral。
3. **单位经济测试**：每用户推理/运行成本算得清吗？烧钱换用户阶段谁供血、供多久、什么指标断了就停？
4. **首秀灾难测试**：上线头两周最坏会输出什么？生成内容失控（胡说/有害/违法建议）时牌子扛得住吗？有没有上线前红队环节？
5. **地皮依赖测试**：站在谁的地皮上（免费 API/平台面/托管方）？那个面挂着 beta/preview/免费标签吗？它关停时数据和用户带得走吗？
6. **承诺落差测试**：宣传语比当前技术现状超前几步？demo 场景与日常场景的准确率差距心里有数吗？
7. **用户资产善终测试**：用户积累的东西（数据/作品/关系）若产品死了怎么办，有导出路径吗？（对 solo：既是对用户的责任，也是口碑的根）
8. **AI FOMO 反向测试**：依附的组织（雇主/投资方/合伙方）若转向 AI 热潮，你手上的东西是它的提款机还是它的核心？

## 4. 诚实边界

- **大厂组合管理 ≠ solo 死法**：26 条全部是大厂/机构产品，砍杀逻辑是「千亿盘子里排第几」。solo 没有内部竞争面——P1 对 solo 几乎不直接适用；P5/P6 对 solo 是间接风险（依赖的面被砍），不是「你的产品被砍」。
- **幸存者偏差**：语料只收有讣告的知名产品，无名小产品的死不在样本里——本透镜看到的是「有新闻价值的死」。
- **时代偏差**：样本集中在 2023-2026 AI 热潮期，FOMO 期的过度砍杀可能高估此类死法的基线频率。
- **存在复活与反转**：语料含改判（Adobe Animate 反弹后改维护模式）与复活（Claude Fable 5 & Mythos 5 条目：政府令关停 19 天后重启）案例——砍杀不总是终局，评估时别把信号当死刑判决。
- **单条不构成规律**：User Hatred（Clippy，文化记忆梗）、Safety Concerns（Facebook Bob & Alice，研究恐慌）、Government Order 各仅 1 例，未提炼为 pattern。
- lifeSpan 字段多为空，无法做存活时长统计；摘录为要点转译，非逐字原文。

## 5. 引用清单

（deathType 均为 product-killed；格式：条目 — killedBy）
1. Microsoft Cortana — Microsoft Copilot
2. Google Assistant (Classic) — Google Gemini
3. OpenAI Assistants API — OpenAI
4. Google Bard — Google
5. Bing Chat — Microsoft
6. Siri (Classic) — Apple Intelligence
7. OpenAI Atlas — OpenAI
8. Google Doppl — Google
9. Google Whisk — Google
10. OpenAI Sora — OpenAI
11. Amazon Alexa (Original AI) — Amazon
12. Microsoft Tay — Microsoft
13. Meta Galactica — Meta
14. NYC MyCity Chatbot — NYC Government
15. Meta BlenderBot 3 — Meta
16. TV Time — Its Own Parent Company
17. Adobe Animate — Adobe
18. GitHub Models — GitHub
19. Meta Llama API — Meta
20. Amazon Bedrock Agents (Classic) — AWS
21. McDonald's AI Drive-Thru (IBM) — McDonald's
22. IBM Watson Marketing — IBM
23. Microsoft Clippy — Microsoft
24. Claude Fable 5 & Mythos 5 (June Suspension) — U.S. Government
25. Facebook AI Chatbots (Bob & Alice) — Meta

数据源 killedbyai.net graveyard.json（CC BY 4.0）@ shaf1258b39，截至 2026-09-28
