# demo 提交协议（site ↔ 外部 demo 项目）

- **读者**：外部 demo 项目的作者与其 agent。site 定位 = 承载方 + 协议定义方 + 验收方，**不负责生成 demo**（2026-09-26 用户定界：「这边不管落码，只是提供一个功能和协议接口，我会在其余的地方开始」）。
- **血统**：功能面以 `docs/spec-site.md` v1.1 为准，UI 面以 `docs/design-spec-site.md` v1.0 为准；约束来源 = E1/E1b 实验结论 + CLAUDE.md 血统约定。协议版本 **v0.1**（2026-09-26 立）。

## 1. 提交物清单（一个想法一次提交）

```
public/demos/<slug>/
├── index.html     # 可交互 demo，单文件
└── lineage.json   # 血统（schema 见 §3）
src/content/ideas/<slug>.md   # 想法条目（schema 见 §4）
```

## 2. index.html 约束

- **单文件自包含**：CSS/JS 全内联，无外链网络资源——宿主以 iframe 嵌入（离线可玩是硬要求）。
- **嵌入环境**：宿主 iframe 首版定高 **600px**（移动端 `min(600px, 80vh)`）；demo 须在此视口内可用。裁切风险由提交方自负，逃生门 = 站侧「新窗口打开 ↗」直链。
- **明暗环境**：宿主页浅色、iframe 底 `#f6f8fa` 中性灰；暗色 demo 须自洽（宿主只做灰阶缓冲，不为 demo 反色）。
- **行为约束**：无 cookie/localStorage 强依赖、无网络请求、无弹窗。
- **体积软上限 200KB**（E1 实测 12KB 量级；超限站侧警告不阻断）。

## 3. lineage.json schema

| 字段 | 必填 | 说明 |
|---|---|---|
| `producer` | ✅ | 生成脚本/工具的**可指认路径**（如 `d:/project/<x>/scripts/gen.py`） |
| `rev` | ✅ | 生成时刻的 git rev；脏树记内容哈希 |
| `date` | ✅ | YYYY-MM-DD |
| `generator` | 推荐 | `{"model": "<模型ID>", "channel": "<端点别名>"}`（通道事实卡见 CLAUDE.md 模型通道表） |
| `slug` | 推荐 | 与目录名一致 |

缺必填项 = **提交不合规**（血统立法，继承 vedio 实证模式）。

## 4. 想法条目（src/content/ideas/\<slug\>.md）

- frontmatter 对齐 `src/content.config.ts` schema：`title/summary/status/tags/created/updated/changelog[]`（`slug` 字段零消费待删⏸）。
- body ≤ **300 字**（构建期断言，超长报错阻断——执法点见 design-spec §③）。
- `status` 语义与 demo 存在性**解耦**：seed=仅想法 / growing=有 demo 在验证 / shipped=已做成；demo 是否存在由站侧**文件探测**（hasDemo，design-spec ⑦-1），status 不隐含。

## 5. slug 规则

小写字母/数字/连字符；一个想法一个 slug；**一经挂站不改**（URL 稳定性，外链/收录不破）。

## 6. 提交流程

1. 外部项目生成 demo → **浏览器自验通过**（形态类只认实机，E1b 教训：倒计时冻结 bug 读代码看不出）。
2. 按 §1 落位两件套（demos/ + ideas/）。
3. 站侧验收：`npm run dev` → 三跳走查（首页 → 想法页 → demo 页内可玩）。
4. 过验 → changelog 簿记一行 + STATUS 更新；不过 → 打回外部项目修。

## 7. 站侧暴露面（site 提供给外部的接口）

- **URL 结构**：`/`（想法列表）/ `/ideas/<slug>/`（想法页四件套）/ `/demos/<slug>/`（demo 直链）。
- **发现机制**（上线后启用，方案已沉淀 `research/ai-discoverability.md`）：llms.txt + robots + 干净 HTML。
- **反响面**：giscus 评论（上线后）。

## 8. 协议变更管理

本协议独立版本化；**向后兼容承诺**：已提交 demo 不因协议升级失效（新增字段一律可选）。变更走 git 提交（Conventional Commits `[build]`）。

---

*v0.1 未尽：自动化校验器（lineage 必填项 + 体积检查脚本）留待沉淀触发；gen_demo.py 角色从「站内生成器」转为「外部项目的参考实现」，提炼归属外部项目侧。*
