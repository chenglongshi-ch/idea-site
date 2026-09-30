# 坟场透镜3：创业失败（startup-failed）——评估知识笔记

## 1. 透镜职责

评审一个新想法时，这个透镜只问一件事：**假如没人来砍它，它自己会不会死**——没收入、没付费用户、成本烧穿、定位错、等不到认证、市场太窄，都归我管。被大厂行政砍杀不归我（那是 product-killed 切片的事）。

## 2. 死法画像

### P1 薄壳被吸收：产品是平台能力的包装纸【confidence：高】
核心功能只是现成模型/平台能力的薄封装，没有独占数据或工作流护城河。平台顺手内置同款（往往只是提高一个默认能力），差异化一夜归零——估值再高也挡不住。全语料最大死簇。
- ChatPDF / PDF Chat Wrappers（startup-failed，OpenAI / Google / Anthropic）："Most became obsolete overnight when OpenAI, Google, and Claude added native file upload and analysis."
- Jasper AI（startup-failed，OpenAI / Anthropic）：$1.5B 独角兽，"wrapper business model collapsed as GPT-4o and Claude made its core features available for free or at a fraction of the cost."
- Huxe（startup-failed，Google / Spotify）：前 NotebookLM 团队打造，"Spotify shipped a near-identical personal podcast feature one day before the wind-down notice."

### P2 成本烧穿+无变现：需求真、账单也真【confidence：高】
用户量不是护身符。每用户推理/服务成本高，又没有付费转化机制，烧到钱光就关。两条子型：不肯收费（免费惯性）和收不上来（用户天然是不付费人群）。
- Figgs AI（startup-failed，Inference Bills）：100 万用户零收入，"Demand was never the problem; the bill was."
- Tune AI（startup-failed，AWS / Google / Azure）："most users were free developers who never converted to paying customers."
- Yupp.ai（startup-failed，Market）：$33M 融资+130 万用户仍死于一年内，"broad consumer preference signal simply stopped being the scarce input anyone would pay for."

### P3 融资依赖断粮：一级市场一关门就死【confidence：高】
公司按「持续输血」模型运营，自身收入撑不起开销。VC 一旦收紧（下一轮融不到），无论技术多好，数月内断粮。
- Robin AI（startup-failed，Market）："After failing to close a $50M Series C, the company cut a third of its staff and was listed on an insolvency marketplace."
- Coqui AI（startup-failed，Market）：开发者标配的开源 TTS 明星库，仍 "ran out of funding and shut down"——技术受欢迎不等于商业成立。
- Stability AI（startup-failed，Itself）：CEO 辞职+财务动荡+版权诉讼叠加，"struggled to survive as a going concern."

### P4 监管死亡谷：认证比产品活得久【confidence：高】
进强监管领域（医疗/心理健康），审批又贵又慢（数年起步），而 LLM 迭代快于监管更新，产品在等批准的过程中被拖死。技术成立不等于允许你卖。
- Kintsugi AI（startup-failed，FDA）：7 年 $30M，"Shut down after nearly 4 years waiting for FDA De Novo clearance that never came."
- Woebot（startup-failed，FDA）："the regulatory process for AI mental health tools proved too costly and slow as LLMs outpaced the FDA's ability to regulate them."
- Cydoc（startup-failed，Big Tech）：7 年 bootstrapped，postmortem 亲述死因三连："the regulatory maze, slow hospital sales cycles, and the impossibility of competing with Big Tech's free AI offerings."

### P5 伪 AI 穿帮：宣传自动化，后台靠人工【confidence：中】
演示里的「AI」实际靠人肉后台撑着，规模一大单位成本露馅；财务造假再连环引爆信任。样本仅 2 条，但机制完整、因果链清晰。
- Builder.ai（startup-failed，Itself）："Its 'neural network' turned out to be 700 engineers in India writing code manually"，收入虚报 300%，五国破产。
- Olive AI（startup-failed，Itself）：$4B 估值+ $902M 融资，"its 'AI' relied heavily on manual human labor behind the scenes"，资产贱卖收场。

### P6 地基抬升：模型每强一代，生存带窄一截【confidence：中】
与 P1 不同，没有谁蓄意杀它——底层模型逐代变强，把「模型还不够好」造成的价值缺口填掉，客户自建即可；或新范式直接改走别的路。有真实付费客户也逃不掉。
- Reforged Labs（startup-failed，Foundation Models）：Supercell/Ubisoft 级客户+六位数合同，CEO 原话："the gap we were selling into is closing."
- Flowise（startup-failed，AI Coding Agents）：55k star 低代码工具，"A tool for building AI without code, killed by AI that writes code."

### P7 窄市场+无人接手：天花板养不活产品【confidence：低】
产品有真实用户与口碑，但目标市场按规模筛完剩不下几个买家，或高度绑定创始人——人一走就慢性死亡。样本薄（2-3 条），与头部挤压机制相邻（见个案 Wsup）。
- Reforged Labs（startup-failed，Foundation Models）："there were simply too few studios at that scale to sustain a company."
- HereAfter AI（startup-failed，Itself）：创始人 2024 年 1 月离开，app 停更两年半后站点消失，用户连逝者录音都无法自助导出。

**个案备注**（不足成 pattern，评审时按需调用）：
- Yara AI（startup-failed，Its Own Founder）：创始人判断 "AI chatbots aren't safe enough for people in real mental health crises" 主动关停——伦理自裁型，全语料罕见。
- theGist（startup-failed，Itself）："A pivot toward sales tooling never caught"，余钱还给投资人关场——pivot 失败即终局。
- Writer（startup-failed，Microsoft Copilot）：多次 pivot 仍被企业原生 Copilot 吸收——pivot 治不了薄壳病。
- Wsup AI（startup-failed，Itself）：18 个月新 app 打不过多年先发的 Character.AI/Replika——同赛道头部挤压。

## 3. 评估检查单

评一个新想法时按序自问：
1. 核心功能是不是现成模型/平台的薄包装？平台内置同款要多久？到时候我剩下什么独占的东西（数据、工作流、关系、场景）？
2. 我的价值是不是建立在「模型现在还做不到 X」上？模型再强一代，用户还需要我吗？
3. 每个活跃用户的服务成本是多少？免费用户会不会把我烧死？谁付钱、凭什么付？
4. 我靠收入活着还是靠积蓄/融资输血？断血 12 个月还能活着吗？
5. 这个领域要牌照/认证吗（医疗、金融、儿童、心理、数据合规）？审批要等几年，等得起吗？
6. 我说的「自动化」去掉人工辅助后还成立吗？用户放大 100 倍，单位成本往哪个方向走？
7. 目标客户/用户总共多少人，算得出来吗？天花板够养活一个持续运行的服务吗？
8. 这事是不是只系于我一个人？我停手三个月，它会不会就死了？
9. 万一它失效或被滥用，会不会伤到脆弱人群（心理危机/医疗/未成年）？出事我扛得住吗？

## 4. 诚实边界

- **样本仅 21/128 条，且全是 AI 创业公司**，多数拿过 VC（$7M-$902M）。这些死法是「融资-烧钱-规模化」模式下的死法。对 solo/小团队：P3（融资断粮）基本不适用——但反面是 solo 没人输血续命，容错更低，P2/P4 反而更致命。
- **solo 最常见的死法在语料里系统性缺席**：没人知道、做出来没人用、自己弃坑、维护不动。killedbyai 收录门槛偏爱「有故事的公司」，一个用户的静默死亡不会被收录。本透镜对「冷启动失败」几乎失明——别拿它判「会不会没人要」，那要靠别的证据。
- **时代偏差**：语料集中于 2023-2026 AI wrapper 泡沫期，P1/P2 占比偏高。若想法不是模型薄壳，P1 警告应降权；反之若正是 wrapper 型，P1 是全语料最一致的死亡预言。
- **标签重叠**：本切片多条 killedBy 是大厂（ChatPDF/Huxe 等），与 feature-removed 切片机制相邻；跨透镜汇总时按机制去重，勿双计。
- **幸存者偏差方向特殊**：能进坟场的都曾「大到值得记录」（独角兽/明星项目/百万用户），起点是多数 solo 项目到不了的位置。本切片规律当「上限警告」用——连它们都死；不可反推「我更小所以更安全」。

## 5. 引用清单

1. Stability AI（startup-failed，Itself）
2. ChatPDF / PDF Chat Wrappers（startup-failed，OpenAI / Google / Anthropic）
3. Jasper AI（startup-failed，OpenAI / Anthropic）
4. Writer（startup-failed，Microsoft Copilot）
5. Builder.ai（startup-failed，Itself）
6. Yara AI（startup-failed，Its Own Founder）
7. Tune AI（startup-failed，AWS / Google / Azure）
8. Olive AI（startup-failed，Itself）
9. Woebot（startup-failed，FDA）
10. Robin AI（startup-failed，Market）
11. Coqui AI（startup-failed，Market）
12. Kintsugi AI（startup-failed，FDA）
13. Cydoc（startup-failed，Big Tech）
14. Reforged Labs（startup-failed，Foundation Models）
15. Yupp.ai（startup-failed，Market）
16. Flowise（startup-failed，AI Coding Agents）
17. Wsup AI（startup-failed，Itself）
18. HereAfter AI（startup-failed，Itself）
19. Huxe（startup-failed，Google / Spotify）
20. Figgs AI（startup-failed，Inference Bills）
21. theGist（startup-failed，Itself）

数据源 killedbyai.net graveyard.json（CC BY 4.0）@ shaf1258b39，截至 2026-09-28


## 2026-09-29 首析回写（run 20260929T221336-5371，《家庭任务清单》评审；学习环写层——整层 consolidation 未触发，以下为带置信度的增量观察）

- **P3 增补「战略金主断粮」变体**（confidence 高；依据：当期新增 Argo AI（Backers Pulled Out，Ford & Volkswagen，$2.7B write-down）、Embark Trucks（Capital Dried Up）、Ghost Autonomy（Funding Collapse））——断粮机制与 VC 收紧同构但输血人是企业战略方；子型注记「依赖单一/少数战略金主=把融资风险换成关系风险」。
- **收录新 causeOfDeath 标签 Overpromised**（confidence 中，单条；依据：Forward (CarePods)，killedBy Itself）——机制=承诺交付远超成本与审批承受力（监管谷+成本结构混合，无 P5 式造假），入个案备注。
- **头部基数修订 + 诚实边界补一条**：切片 21→25、数据 @ sha ee47d45043d7 截至 2026-09-29，引用清单补 4 条；诚实边界加注——语料 100% AI 公司，评非 AI 工具类想法时 P1-P7 多数机制失配，本透镜退化为两条借用（平台免费内置天花板类比 + collateral 数据锁死前置），本轮 9 问 6 问不适用即实例。
