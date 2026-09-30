# 透镜4：模型升级（model-upgrade）— 评估知识笔记

学习自 killedbyai.net 语料 deathType=model-upgrade 全量 46 条（占 128 条的 36%，最大切片）。

## 1. 透镜职责

评审一个想法时，这个透镜在找一件事：**它的地基是不是租来的模型能力**——卖点、速度、价格、行为一致性、某个专能端点，任意一项押在「当前模型的暂时性缺陷或暂时性差价」上，下一代模型发布就可能把它抹掉。本切片的死者几乎全是模型本体，产品受害以附带伤亡（collateral）记录——所以读法是反推：把模型供应商杀死旧能力的机制当武器库清单，逐一对照新想法的地基。

## 2. 死法画像

**P1 代际淘汰常态化，寿命急剧压缩**（confidence：高）
模型退役不是事故而是常规节奏，且周期从 ~15 个月压缩到 2026 年的 100-176 天。建在任何一代模型上的产品，其地基天然带倒计时；「preview」已等于「准备三个月内迁移」。
- `GPT-4.5 Preview（model-upgrade，OpenAI）：最贵模型（$75/M input）上线仅 4 个月即弃，OpenAI 商业史上最短命`
- `Google Gemini 3 Pro Preview（model-upgrade，Google）：仅存活 111 天——"preview"已是"预期三个月内迁移"的行话`
- `MAI-Code-1-Flash (GitHub Copilot)（model-upgrade，GitHub / Microsoft）：从发布到全线退役 100 天，"第一波"只活了一个夏天`

**P2 能力归一：专能端点死于通用模型**（confidence：高）
只做单一模态/任务的模型或端点，是能力整合的第一个祭品：通用模型一旦把该能力卷进主体，独立端点即被砍。产品若建在「专能端点比通用模型快/便宜/好用」的窗口期上，窗口关闭无预警。
- `OpenAI Codex API（model-upgrade，OpenAI）：GPT-3.5/4 代码能力足够后专用代码模型即无必要，下游重写整个集成层`
- `GPT-4 Vision Preview（model-upgrade，OpenAI）：GPT-4o 把视觉卷进单一更快更便宜的包，视觉专用端点消失`
- `Google Imagen (Vertex AI)（model-upgrade，Google）：图像生成折入 Gemini 3 本体，独立 Imagen 端点全部迁移`

**P3 范式切换：API 形状本身会死**（confidence：高）
比模型换代更深一层：completion→chat→「推理即参数」，每次范式切换都重写 API 形状，下游集成层整个重做，与模型好坏无关。
- `GPT-3 (Original Models)（model-upgrade，OpenAI）：davinci/curie/babbage/ada 全家退役，Instruct/Turbo 范式取代`
- `Cohere Generate (Original)（model-upgrade，Cohere）：行业从 completion 转向 conversation 范式，旧端点死`
- `Mistral Magistral（model-upgrade，Mistral）：整个「推理模型」产品线塌缩为通用模型上的一个参数 reasoning_effort`

**P4 价格档被下一代填掉**（confidence：高）
「这个价位刚好够用」是租来的套利：下一代在同价位给更好能力、或在零头价格给同等能力，价差护城河当场蒸发。
- `OpenAI GPT-3.5 Turbo（model-upgrade，OpenAI）：GPT-4o Mini 同价更优，全球用量最大的模型退役`
- `Claude 3 Opus（model-upgrade，Anthropic）：Claude 3.5 Sonnet 以零头成本全面超越，15 个月退役`
- `GPT-4 (Original)（model-upgrade，OpenAI）：Turbo/4o 以零头成本提供同等能力，上线 15 个月弃`

**P5 静默劣化与强制迁移：下游的死法不是崩，是变平庸**（confidence：高）
退役的伤害常无告警：slug 被静默重定向、快照被强制自动升级、退役名当别名继续活着——账单和输出质量在你没改一行代码时改变。依赖特定行为/fine-tune/输出一致性的产品受害最深。
- `xAI Grok Legacy Models（model-upgrade，xAI）：8 模型齐砍，slug 静默重定向——账单与输出质量无预警改变`
- `GPT-4o (API: 2024-05-13 & 2024-08-06)（model-upgrade，OpenAI）：快照被自动升级到 GPT-5.1，盲迁且无回滚`
- `Groq Qwen3-32B & Llama 4 Scout（model-upgrade，Groq）：退役模型静默失败——下游 app 没崩，只是开始变得平庸`

**P6 多级渠道不护体，只是错峰续命**（confidence：高）
经 Bedrock/Vertex/Foundry 等云渠道调模型，厂商退役后各平台时间表不一、窗口有限，且可能不指名替代品。「多渠道冗余」实际是到期日各不相同的多个倒计时。
- `Claude 3 Haiku on Google Cloud（model-upgrade，Google Cloud）：Anthropic 已埋，Google Cloud 多供 125 天、Bedrock 再拖——一个模型三场葬礼`
- `Cohere Command R & Command R+ on Amazon Bedrock（model-upgrade，AWS）：Cohere 自家 2025-9 已砍，Bedrock 2026-8 才断且不指替代`

**P7 自研模型的战略投降：跟不上代际节奏就出局**（confidence：中）
造模型本身也会死于模型升级竞赛——自研成本追不上代际更替速度的选手直接放弃自研转投竞品，押注其生态的下游连带遭殃。语料显式仅 1 条但机制清晰。
- `Samsung Gauss（model-upgrade，Samsung）：自研太贵，悄悄搁置、Galaxy AI 转投 Google Gemini`

**P8 免费层最先被砍，付费合同才豁免**（confidence：中）
目录修剪（catalog pruning）先砍免费/开发者层，committed-spend 企业合同豁免；免费层还叠加不活跃惩罚。建在供应商免费层或免费额度上的产品是最脆的地基。
- `Groq Llama 3.1 8B Instant & Llama 3.3 70B Versatile（model-upgrade，Groq）：只砍免费/开发者层，企业合同豁免；免费目录中再无同上下文余量替代者`
- `Amazon Nova Premier & Nova Sonic（model-upgrade，Amazon）：无自动迁移，15 天不活跃账户提前断供`

**P9 模型人格黏性挡不住退役（反例参照）**（confidence：低）
用户对模型人格的依恋是真实资产但救不了本体：80 万日活的哀悼与请愿改变不了退役决策；唯一幸存迹象是事后「恢复有限访问」。启示反着读：人格/风格黏性要沉淀在产品自有层，租来的模型人格随版本归零。推论成分较高，故 confidence 低。
- `GPT-4o (ChatGPT)（model-upgrade，OpenAI）：GPT-5 接管后退役，~80 万日活用户情感反弹、请愿回归——最被哀悼的模型`
- `Claude 3 Opus（model-upgrade，Anthropic）：告别 Substack 后又恢复有限访问——挽留仅到此为止`

## 3. 评估检查单

1. 产品的核心卖点是不是「现在的模型还做不到 X」？X 被下一代原生做到的概率与时间窗多大？
2. 是不是靠比官方更快/更便宜/更好调用取胜？速度差和价格差是最先被抹平的两个面——你的差价建立在供应商定价表的哪一行？
3. 依赖的是「这类能力」还是某个具体版本/端点/快照的行为一致性（含 fine-tune、输出风格）？快照被强制自动升级时，能不能一天内切换？
4. 押的是专能端点（只做图像/语音/编辑/代码）吗？通用模型卷进该模态之日就是地基拆除之时。
5. 你所在的品类会不会塌缩成下一代 API 的一个参数（如 reasoning_effort）？
6. 免费层/免费额度是不是你的成本地基？catalog pruning 先砍免费层。
7. 经多层云渠道调模型的话，逐个核对过各平台的退役时间表吗？
8. 有没有一层差异化沉淀在自己手里（数据、工作流、用户关系、品牌人格）？租模型人格 = 供应商一次退役就归零。

## 4. 诚实边界

- **死者是模型本体，不是产品**：本切片 46 条 type 全为 model/service，没有一条创业产品；产品受害仅以 collateral 附带记录（重写集成层、被迫迁移、静默劣化）。评产品时本透镜提供的是「地基侧杀戮机制」，不是产品直接死因样本。
- **能力预测噪声大**：供应商自己也预测不准（o1-preview 数月内被自家 o3 杀、GPT-4.5 四个月即弃）——判定「X 会不会很快被下一代做到」本质是外推，置信度天然有限。
- **样本时间偏置**：退役事件密集于 2025-2026 churn 加速期，寿命数据可能高估长期烈度，也可能低估整合完成后平台期的稳定性。
- **覆盖面缺口**：killedBy 全为大厂闭源 API；开源权重模型可自托管、不退役，其上的产品死法本库不覆盖。部分「死」实为改名/合并（DeepSeek 旧名仍作别名活着），伤害在迁移成本与行为漂移而非能力消失。

## 5. 引用清单

- GPT-4.5 Preview（model-upgrade，OpenAI）
- Google Gemini 3 Pro Preview（model-upgrade，Google）
- MAI-Code-1-Flash (GitHub Copilot)（model-upgrade，GitHub / Microsoft）
- OpenAI Codex API（model-upgrade，OpenAI）
- GPT-4 Vision Preview（model-upgrade，OpenAI）
- Google Imagen (Vertex AI)（model-upgrade，Google）
- GPT-3 (Original Models)（model-upgrade，OpenAI）
- Cohere Generate (Original)（model-upgrade，Cohere）
- Mistral Magistral（model-upgrade，Mistral）
- OpenAI GPT-3.5 Turbo（model-upgrade，OpenAI）
- Claude 3 Opus（model-upgrade，Anthropic）
- GPT-4 (Original)（model-upgrade，OpenAI）
- xAI Grok Legacy Models（model-upgrade，xAI）
- GPT-4o (API: 2024-05-13 & 2024-08-06)（model-upgrade，OpenAI）
- Groq Qwen3-32B & Llama 4 Scout（model-upgrade，Groq）
- Claude 3 Haiku on Google Cloud（model-upgrade，Google Cloud）
- Cohere Command R & Command R+ on Amazon Bedrock（model-upgrade，AWS）
- Samsung Gauss（model-upgrade，Samsung）
- Groq Llama 3.1 8B Instant & Llama 3.3 70B Versatile（model-upgrade，Groq）
- Amazon Nova Premier & Nova Sonic（model-upgrade，Amazon）
- GPT-4o (ChatGPT)（model-upgrade，OpenAI）

数据源 killedbyai.net graveyard.json（CC BY 4.0）@ sha f1258b39，截至 2026-09-28


## 2026-09-29 首析回写（run 20260929T221336-5371，《家庭任务清单》评审；学习环写层——整层 consolidation 未触发，以下为带置信度的增量观察）

- **新增判定协议 pattern（候选，未正式升 P）**：零模型依赖想法的快速豁免路径——功能面全为确定性 CRUD/规则逻辑时，本透镜产出应为「接近空列+结构性豁免声明」，论断只剩两类合法残留：路线图滑移风险（将来把卖点换成模型能力）、生产工具链风险（demo 生成通道）。建议检查单加第 0 问「功能面里有没有任何一项非用模型不可？」——答无即走豁免通道（confidence 高；依据：本轮评审实例）。
- **数据源刷新注记**：当期 TOTAL 135 / model-upgrade 47 @ sha ee47d45043d7（截至 2026-09-29）；P1-P9 对 47 条仍全覆盖；最可能新增条目为 OpenAI davinci-002/babbage-002/gpt-3.5-turbo-instruct（2026-09-28 关停，P1/P3 既有模式）——身份系推断（P5 原料零落仓无法逐条 diff）。
- **P9 零增量声明**：人格黏性反例模式本轮无新证据，不修订。
