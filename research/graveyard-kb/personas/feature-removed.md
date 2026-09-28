# 透镜2：功能移除（feature-removed）——评估知识笔记

## 1. 透镜职责

评一个新想法时，这个透镜在找一件事：**产品还活着、平台还活着，但你的想法所依附的那个"功能位"——插件位、商店位、API 端点、免费额度、某个子功能——被别人砍掉的风险**。一句话：你的地基如果是别人的功能，别人的功能会死，而且死的时候通常不带走你的数据。

## 2. 死法画像

### P1 战略一换向，先砍非收入面（confidence 高）
机制：挂在母体上的功能若不在当前主推叙事里（新模型、企业、订阅），就是战略会议上的第一批牺牲品。判断标志：功能的 Story 和母体今天讲的故事不是一条线。这类死法往往连公告都没有，"悄悄"是高频副词。
证据：`ChatGPT Plugins（feature-removed，OpenAI）：Killed in favor of the more controlled GPTs`；`Google AI Test Kitchen（feature-removed，Google）：Quietly discontinued as Google moved all AI demos to the Gemini app`；`OpenAI for Science（feature-removed，OpenAI）：shed 'side quests' to refocus compute on coding and enterprise products`

### P2 被新形态吸收：能力活、身份死、数据不保（confidence 高）
机制：功能本身有价值不构成豁免——被吸收进更新的统一产品后，以独立形态死亡。关键细节：用户资产几乎从不随迁（保存的例程不转移、图片不下载就没、prompt 不导出即失）。对依附者而言"功能还在某处"等于分发渠道没了。
证据：`Google Project Mariner（feature-removed，Google）：The tech was absorbed into Gemini Agent. Saved routines and trained behaviors didn't transfer`；`OpenAI Realtime API Beta（feature-removed，OpenAI）：deprecated as OpenAI shipped a GA version with a different interface, forcing developers to rewrite`；`DALL·E GPT in ChatGPT（feature-removed，OpenAI）：Images stored inside the DALL·E GPT were not migrated; anything not downloaded before August 30 is gone`

### P3 免费档整体退潮，羊群式跟砍（confidence 高）
机制：AI 功能的免费层是获客补贴而非承诺。推理成本被诚实定价后，免费/个人档批量死亡，且有一家砍、48 小时内别家跟的羊群效应——依赖某家免费额度跑起来的东西会集体断粮。
证据：`Qwen Code Free Tier（feature-removed，Alibaba）：killed 48 hours after MiniMax made the same move...Daily free requests slashed from 1,000 to 100`；`MiniMax API Free Tier（feature-removed，MiniMax）：signaling the end of the 'free forever' era of Chinese AI APIs`；`Sourcegraph Cody Free & Pro（feature-removed，Sourcegraph）：abandoning the free-tier growth playbook once inference costs got priced honestly`

### P4 平台边界上的监管斩：一夜蒸发、无导出路径（confidence 高）
机制：受平台辖制的功能类别，监管动作可让功能在数周内死亡，且平台选择最省事的合规方式——全量关停而非改造，用户创建的资产没有出口。死亡半径极大（两大平台同日、百万级用户）。
证据：`Doubao & Qwen AI Agent Builders（feature-removed，Chinese Government）：Every user-created agent stopped functioning...with no export or migration path`；`Replika Romantic Mode（feature-removed，Italian Data Protection Authority）：stripped romantic features overnight — devastating millions of users`

### P5 发布即巅峰：承诺清单本身是死亡清单（confidence 中）
机制：高调发布的宏大功能矩阵，其中一部分从未真正产品化，数月后"悄悄搁置"。特征：发布会式功能（语音、CLI、收入分成），无兑现时间表。死的不是旧功能，是从未活过的承诺——依附这些承诺做规划的人被坑。
证据：`GitHub Copilot X（feature-removed，GitHub）：Many of the announced features were quietly shelved or absorbed into standard Copilot`；`OpenAI GPT Store（feature-removed，OpenAI）：Revenue sharing never materialized, discovery was broken, and most GPTs saw near-zero usage`

### P6 公开翻车一次就处决（confidence 中）
机制：功能输出与母体声誉直接挂钩时，一次难看的公开翻车或持续低准确率就足以处决功能。大厂对丢脸的容忍度极低——股价和 CEO 表态都会变成行刑队。语料里上线 3 周即斩、6 个月即斩各一例。
证据：`Google Gemini Image Generation People（feature-removed，Google）：wiping 3.5% off Alphabet's stock...CEO called the outputs 'completely unacceptable'`；`OpenAI AI Text Classifier（feature-removed，OpenAI）：correctly identifying only 26% of AI-written text while falsely flagging 9%`；`Midjourney Free Tier（feature-removed，Midjourney）：Killed after viral abuse and deepfake scandals (including a fake Pope photo)`

### P7 低效用/低使用即被静默清理，规模不是护身符（confidence 中）
机制：活十年（Gmailify）、服务数百万人（Interview Warmup）都不构成豁免——不服务当前战略就静默关停，连下线公告都不发。"只报告问题、给不出下一步"的功能也算低效用，会被官方说辞盖棺。
证据：`Gmailify（feature-removed，Google）：Quietly discontinued after a decade, stranding users`；`Google Interview Warmup（feature-removed，Google）：Quietly killed...visitors clicking 'Get Started' are silently redirected to a generic article`；`Google Dark Web Report（feature-removed，Google）：user feedback showed the tool failed to provide useful follow-up steps`

### 对单点功能型想法的含义（承上小结）
一个想法=一个功能时，这个功能位若落在别人平台内（插件/商店/API/免费档），你的生死由别人的战略日历决定，且你的用户资产大概率陪葬。单点想法的护城河只能来自平台外的部分：自有用户关系、自有数据、可导出的用户资产、离平台仍成立的形态。

## 3. 评估检查单

1. 这个想法建在谁的生态位上（插件、商店、API、模型端点、免费额度）？对方改规则或换产品形态的那天，你的分发渠道还剩什么？（P1/P2）
2. 依赖的 API/端点是不是 beta/preview/实验性？有没有 GA 承诺？接口更换时你重写的成本多大？（P2）
3. 成本结构里有没有"某家的免费额度"？额度明天归零或缩水 90%，想法还成立吗？（P3）
4. 核心输出若当众翻车一次（错得难看、被滥用出丑闻），谁替你扛股价级/监管级压力？你的功能离"丢脸面"有多近？（P6）
5. 你这个功能在宿主（或未来收购方）的收入故事里占哪一行？若答案是"不占"，你就是别人战略会上可牺牲项。（P1/P7）
6. 用户在你这里攒的资产（数据、作品、配置、agent），你死那天他们能带走吗，还是"没导出就没"？（P2/P4）——这同时决定你的死法口碑。
7. 想法的功能类别（虚拟人、AI 伴侣、生成内容分发）在哪些市场已被监管点名？平台最省事的合规方式是全量关停。（P4）
8. 你（或你依附方）发布时承诺的功能面，收着点了吗？承诺清单会成为日后的死亡清单。（P5）

## 4. 诚实边界

- **语料几乎全是大厂砍自己的功能**（OpenAI×6、Google×7、其余为 Microsoft/GitHub/Anthropic/Midjourney/Sourcegraph/中国三家的功能位）。"产品活着功能被砍"本身是大厂病；独立 solo 者没有母体战略可被牺牲，本透镜对独立想法的主要射程是**依附面**（你建在谁的地基上），不是直接判决。完全不依赖平台 API/生态、有自有用户和离线形态的想法，基本不在射程内，应交给别的透镜。
- **"被吸收"未必是坏事**：能力升级、用户受益，坟场只记死亡不记受益者。对想法作者，"被大厂吸收"的另一面是想法被验证——只是独立者通常拿不到吸收后的收益。
- **死因是编者归因**：如 "Low Utility" 实为 Google 官方说辞转述；真实死因常是组合拳（砍免费档既是成本也是跟风）。归因标签别当因果用。
- **语料偏 AI 产品、偏近期**：23 条全为 AI 相关 service/app，2026 年条目过半；传统软件、非 AI 功能的砍除规律未覆盖，对非 AI 想法信号更弱。

## 5. 引用清单

- ChatGPT Plugins（feature-removed，OpenAI）
- Google AI Test Kitchen（feature-removed，Google）
- OpenAI for Science（feature-removed，OpenAI）
- Google Project Mariner（feature-removed，Google）
- OpenAI Realtime API Beta（feature-removed，OpenAI）
- DALL·E GPT in ChatGPT（feature-removed，OpenAI）
- Qwen Code Free Tier（feature-removed，Alibaba）
- MiniMax API Free Tier（feature-removed，MiniMax）
- Sourcegraph Cody Free & Pro（feature-removed，Sourcegraph）
- Doubao & Qwen AI Agent Builders（feature-removed，Chinese Government）
- Replika Romantic Mode（feature-removed，Italian Data Protection Authority）
- GitHub Copilot X（feature-removed，GitHub）
- OpenAI GPT Store（feature-removed，OpenAI）
- Google Gemini Image Generation People（feature-removed，Google）
- OpenAI AI Text Classifier（feature-removed，OpenAI）
- Midjourney Free Tier（feature-removed，Midjourney）
- Gmailify（feature-removed，Google）
- Google Interview Warmup（feature-removed，Google）
- Google Dark Web Report（feature-removed，Google）

数据源 killedbyai.net graveyard.json（CC BY 4.0）@ shaf1258b39，截至 2026-09-28
