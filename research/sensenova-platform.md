# 商汤 SenseNova（日日新）开放平台盘点

- 调研时点：2026-09-23（全部一手页面当日抓取验证）
- 平台入口：https://platform.sensenova.cn （注册/登录页 `/register`、`/login`，手机号 +86 验证码一步注册，实测 `/register` 会跳转登录流程）
- 平台定位（2026-09 现状）：SenseNova 已重构为「LLM API 服务平台」（控制台镜像版本号 `nova-platform-web-console:1.1.0-20260922`），配套订阅制 **TokenPlan**。旧的 SenseCore 帮助文档站 `https://www.sensecore.cn/help/docs/sensenova/` 已 404。
- 官网（营销页/模型页/定价页）：https://www.sensenova.cn ；模型页 `/models`；定价页 `/token-plan`

---

## ① 模型清单（一手来源：https://platform.sensenova.cn/docs 「模型总览」，2026-09-23）

| 类别 | 模型名 | Model ID | 说明 |
|---|---|---|---|
| 对话/推理 LLM（自研） | SenseNova 6.8 Flash Lite | `sensenova-6.8-flash-lite` | 轻量多模态智能体模型，文本+图片输入，上下文 256K，最大输出 64K，fp8；面向数据分析/复杂信息呈现 |
| 对话/推理 LLM（托管三方） | DeepSeek V4 Flash | `deepseek-v4-flash` | 深度求索高效经济型模型，1M 上下文，思考/非思考模式（0731 正式版） |
| 对话/推理 LLM（托管三方） | DeepSeek V4.1 Flash | `deepseek-flash` | 552B MoE，多模态理解（图片+视频输入），1M 上下文，Agent/工具调用强化 |
| 对话/推理 LLM（托管三方） | GLM-5.2 | `glm-5.2` | 智谱旗舰开源模型，长程 Coding/复杂工程，1M 上下文，多档思考强度 |
| 对话/推理 LLM（托管三方） | Kimi K3 | `kimi-k3` | 月之暗面旗舰开源多模态 Agent 模型，2.8T 参数，原生视觉，1M 上下文 |
| 文生图 / 图编辑 | SenseNova U1.5 Lite | `sensenova-u1.5-lite` | Neo-unify 架构，生成+编辑一体，参考图（最多 5 张），2K/4K |
| 文生图 / 图编辑（加速） | SenseNova U1.5 Fast | `sensenova-u1.5-fast` | U1.5 Lite 加速版，更快生成/修改 |
| 视觉理解 | （无独立视觉模型） | — | 视觉理解由 `sensenova-6.8-flash-lite`、`deepseek-flash`（含视频输入）、`kimi-k3` 在 Chat 接口内承担 |
| 文生视频 | **平台未提供 API** | — | 官网产品线有 Seko「多模态短片创作 Agent」（应用，非公开 API）；API 文档无视频生成端点 |
| embedding | **新平台 API 未提供** | — | 开源生态有 Piccolo Embedding（https://github.com/OpenSenseNova/piccolo-embedding ，通用 embedding、灵活向量维度），需自托管；平台托管 embedding/rerank 未见文档，未能验证 |
| rerank | **平台未提供（未能验证到任何 rerank 模型/端点）** | — | — |

补充（官网模型页 https://www.sensenova.cn/models ，2026-09-23）：
- 营销页还列了旗舰图片模型 **SenseNova U1 Pro**（未见对应 API Model ID，未在 /docs 出现）。
- 旧品牌 SenseChat（商量）在当前平台文档中已不再出现；当前自研对话模型统一命名 SenseNova x.x。
- 旧端点 `https://api.sensenova.cn/compatible-mode/v1/chat/completions` 实测仍在线（2026-09-23 返回 401 `Authorization Not Found`，说明服务存活、需鉴权），但其模型清单/文档已无公开入口可查——**未能直接验证**旧平台当前还挂哪些模型。

## ② OpenAI 兼容性（一手证据：https://platform.sensenova.cn/docs ，2026-09-23）

- **是，OpenAI 兼容**。Base URL：`https://token.sensenova.cn/v1`（注意：不是 `api.sensenova.cn/compatible-mode/v1`，那是旧端点）。
  - 端点：`POST /v1/chat/completions`、`GET /v1/models`、`POST /v1/images/generations`、`POST /v1/images/edits`；文档另提及兼容 OpenAI **Responses API**（思考字段映射 `reasoning.effort`），未见单独 URL。
- **另有 Anthropic 兼容端点** `POST https://token.sensenova.cn/v1/messages`（Claude Code 可直接接入，`ANTHROPIC_BASE_URL=https://token.sensenova.cn`，不带 `/v1`）。
- **认证：API Key（Bearer），非 JWT 签名**。`Authorization: Bearer $SENSENOVA_API_KEY`；密钥 `sk-` 开头，在控制台 https://platform.sensenova.cn/console/keys 创建（最多 20 枚），可随时注销。旧端点 api.sensenova.cn 的 JWT 签名方式在新文档中未再出现。
- 官方提供 Cursor / Cline / Continue / OpenCode / TRAE / OpenClaw / Hermes Agent / Claude Code / CC Switch / 办公小浣熊 的逐项接入配置（同一 Base URL + API Key）。

## ③ 免费额度 / 定价（一手：https://www.sensenova.cn/token-plan + /docs 「积分」，2026-09-23）

- **文本（LLM）**：TokenPlan「Free · 公测」档 **¥0/月，限时放量**；付费 Lite/Pro 档「即将上线」（价格未公布）。计费用「积分」：
  - 公测期两类积分池（通用积分 / Flash-Lite 专属积分）**各自**有 60,000 积分/滚动 5 小时 + 600,000 积分/滚动周 额度。
  - 2026-08-28 起活动：每消耗 1 点 Flash-Lite 专属积分返赠 1 点通用积分（按日汇总、每小时结算、返赠积分 30 天有效）。
  - `/v1/models` 返回示例中 `sensenova-6.8-flash-lite` 的 pricing 全为 `"0"`（公测免费佐证）。
- **图像**：U1.5 系列走同一积分体系（响应返回 input/output tokens 用量）；**去水印（`watermark=false`）公测期免费，后续转付费**。无单独按张价目表。
- **视频**：无视频生成 API，故无定价。
- 未公布任何按 token/按张的公开单价表（截至 2026-09-23）；旧端点 api.sensenova.cn 的计价页面已不可达，未能验证。

## ④ 速率限制（一手：/docs，2026-09-23）

- 文档**未公布 QPS/RPM 数字**。可查的硬限制：
  - 积分滚动窗口：60,000 积分/5 小时 + 600,000 积分/周（每池，公测期）——实际起到用量限速作用。
  - 429 `quota_exceeded_error`：速率/额度超限，官方建议指数退避重试。
  - 图像接口：`n` 仅支持 1；生成图 URL 有效期 24 小时；API Key 上限 20 枚。
  - DeepSeek V4.1 Flash 图片输入：单图 ≤50MB、请求体 ≤64MB、单请求 ≤200 张、URL 图片总量 ≤200MB。

## ⑤ 文档入口 URL（全部 2026-09-23 验证可达）

| 内容 | URL |
|---|---|
| API 文档（含模型总览/鉴权/积分/各模型参数） | https://platform.sensenova.cn/docs |
| 模型列表（营销页，模型特色/场景/Skill 体系） | https://www.sensenova.cn/models |
| 定价页（TokenPlan 订阅方案） | https://www.sensenova.cn/token-plan |
| 控制台 / API Key 管理 | https://platform.sensenova.cn/console/keys |
| 注册 / 登录 | https://platform.sensenova.cn/register （跳转登录流程） |
| 开源生态（Piccolo Embedding、SenseNova-U1、MARS 等） | https://github.com/OpenSenseNova |
| API 端点 | `https://token.sensenova.cn/v1`（OpenAI 兼容）/ `https://token.sensenova.cn/v1/messages`（Anthropic 兼容） |

## ⑥ Function calling / tool use（一手：/docs，2026-09-23）

- **支持，且是全量 OpenAI 风格**：`tools`（JSON Schema 参数）、`tool_choice`（`auto`/`none`/`required`/指定工具）、`parallel_tool_calls`、回传 `role:"tool"` + `tool_call_id`，`finish_reason: "tool_calls"`。**全部 7 个对话类模型均有工具调用章节**（含 sensenova-6.8-flash-lite、deepseek 系列、glm-5.2、kimi-k3）。
- Anthropic `/v1/messages` 端点同样支持 tools（`tool_choice.type`: auto/any/tool）。
- 另支持 `response_format: json_object`（部分模型含 `json_schema`）、思考模式（`reasoning_effort`: none/low/…/max）。
- 对 agent 场景结论：**可直接用**；官方主推的接入对象就是 Claude Code、Cline、OpenClaw、Hermes Agent 等 agent 工具。

---

## 模型 × 用途映射

### (a) 代码生成/改写（要强聊天模型）
1. **`glm-5.2`** —— 官方描述即「长程 Coding 与复杂工程任务，1M 上下文，思考/非思考模式」，`do_sample=false` 可稳定复现；首选。
2. **`kimi-k3`** —— 2.8T 多模态 Agent 模型，长程编程、工具协同；重活备选。
3. **`deepseek-flash`（V4.1）/ `deepseek-v4-flash`** —— 代码辅助+高频调用性价比档，1M 上下文。
- 提示：`sensenova-6.8-flash-lite` 主打办公/多模态交付（数据分析、PPT），不是重代码模型；代码生成建议 temperature 调低至 0.2–0.5。

### (b) demo 素材生成（文生图/文生视频）
1. **`sensenova-u1.5-fast`** —— 快速出图迭代 demo 素材首选（TokenPlan 免费档明确包含它）。
2. **`sensenova-u1.5-lite`** —— 质量优先时用（2K/4K、参考图编辑、最多 5 张参考图）；公测期 `watermark=false` 免费去水印。
3. **文生视频：平台无 API** —— 只能用 Seko 应用（多模态短片创作 Agent，非公开 API）或另找服务商；若只需「视频理解」，`deepseek-flash` 支持视频输入（仅 Chat 接口）。

### (c) 站点问答 RAG（embedding + rerank）
- **平台当前不满足 RAG 全链路**：无托管 embedding、无 rerank 模型（2026-09-23 文档确认缺失）。
- 可行组合：
  - 检索侧：自托管开源 **Piccolo Embedding**（github.com/OpenSenseNova/piccolo-embedding），或改用其他 embedding/rerank 供应商。
  - 生成侧：`sensenova-6.8-flash-lite`（免费积分额度大、256K 上下文、多模态可读截图）或 `deepseek-v4-flash`（便宜+1M 上下文）做问答生成；两者均支持 JSON 模式，便于结构化引用。

## 风险与注意
- 平台处于公测快速迭代期：积分规则 2026-08-28 刚改过，付费档「即将上线」，价格/额度随时可能变化。
- 免费额度是「滚动窗口积分」而非一次性礼包：5 小时 60K + 周 600K（每池），重跑长任务前先看积分明细。
- 本报告所有「未能验证」项（旧 api.sensenova.cn 模型清单、旧计价、U1 Pro API 化）均因公开页面不可达，未做任何推测性填充。
