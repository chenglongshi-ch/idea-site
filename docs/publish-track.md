# 发布轨道——数据管理 + 托管/域名注册（v0.1）

- 读者：主线程/被派发 agent（执行照 §3 顺序跑）；面向用户的摘要在对话面。
- 血统：用户 2026-09-29 直令（「数据的管理你需要先想好」「在什么地方去注册需要你帮我思考」）+ 终态明示=域名项目（STATUS content-reality 行）。
- 事实时点：Cloudflare 官方 limits 页 curl 直取 + 本机（大陆）可达性实测，均 2026-09-29；域名价格为常见区间，以购买页实时为准。

## 1. 数据管理设计（发布前定稿）

**三条不变式（管理原则，发布不改变）：**

1. **站零运行时存储**——除评论外不收任何访客写入；没有数据库要管，托管上只有构建产物。
2. **正本永远在 git**——`dist/` 是产物，可丢可重建；「数据管理」实际 = 「仓库管理」。
3. **迁移自由**——换托管 = 重传 dist；换域名 = 改 `site` 字段 + DNS；`000N-` 永久链是**路径型**（`/ideas/0001-slug/`）不含域名，**换域不断链**（RSS/llms.txt 内绝对 URL 随重建自动更新）。

**三类数据归属：**

| 数据 | 正本 | 备份 | 谁写 | 发布后变化 |
|---|---|---|---|---|
| 内容（想法正文/demo 三件套/lineage） | git 仓库 | GitHub 远端（§3 步 1 建立） | 提交方（协议 v0.5） | 零变化 |
| 访客评论 | GitHub Discussions（giscus） | GitHub 自身 | 访客 | 新增；**与站同仓**（站仓反正要公开，一处管理，API 可导出） |
| 行为统计 | Cloudflare Web Analytics 免费档 | — | 系统 | 新增；**不引第三方分析**（隐私+零依赖，流量真成问题再议） |

风险与对策：正本单点在本机 → 步 1 建远端即解；preview 体积增长（0002 已 1.2MB）→ STATUS 观察项在册，超阈值再裁规格。

## 2. 托管与注册地（决策记录）

**实测（2026-09-29，本机=大陆）**：Cloudflare 自定义域名 `developers.cloudflare.com` HTTP 200 直连可达；`docs.github.com` 302 正常。`*.pages.dev` 默认域大陆不稳（社区长期共识，未实测）——**不依赖它：上线即绑自定义域**。

**托管 = Cloudflare Pages**（免费档，官方 [limits 页](https://developers.cloudflare.com/pages/platform/limits/) 2026-09-29 直取）：500 builds/月（本站节奏=每次提交一次构建，量级富余）、20,000 文件/站（现约 30 文件）、单文件 ≤25MB、带宽不设上限（官方长期口径）、自定义域、git 连仓库自动构建（私仓可连）。

**域名注册 fork：**

| 方案 | 路径 | 付款 | 备案门 |
|---|---|---|---|
| **A：国内注册商（推荐）** | 阿里云/腾讯云买 .com（约 ¥60-80/年，首年常有促销）→ NS 改指 Cloudflare → 绑 Pages | 支付宝 | **保留**（备案硬要求=国内注册商域名，未来国内路线不焊死） |
| B：国外注册商 | Cloudflare Registrar（成本价）/Namecheap/Porkbun，CF 生态内闭环 | 需外币卡/PayPal | 不保留 |

推荐 A：付款摩擦最低 + 备案门不焊死。后缀选 .com（认知零成本）；挑名原则：短、可拼读、不含连数字。

**免费档与渐进路线（v0.1.1 补，2026-09-29 用户问「没有免费的吗」）**：托管本就免费，唯一付费项=域名。零成本起步 = `*.pages.dev` 子域直接上线（代价=大陆访问不稳，owner 自查与发链受摩擦；社区子域 is-a.dev/js.org = 借域可回收，与永久链承诺相冲，不用；Freenom 类已死）。**渐进合法**：000N- 永久链路径型不含域名——先 pages.dev 上线验证反响，购域后绑定即升级，链接不断。**修订推荐：起步零成本（pages.dev）→ 反响验证后购域（fork A）**。

**GitHub Pages 路线（同日用户问「github 的 docs 呢」）**：三源——gh-pages 分支 / **main 的 `docs/` 目录**（零构建直发）/ **GitHub Actions 构建**（推源码自动 build+deploy）。**取 Actions 模式**：docs/ 目录模式把构建产物提交进 git，违反不变式②（正本是源码、产物可丢），且非 `用户名.github.io` 专属仓时站挂子路径 `/repo/`，需全站配 `base` 适配根路径假设。免费口径=公开仓全免费（私有仓 Pages 需 Pro；本站反正公开，giscus 同仓）。域名 `*.github.io`（借域，大陆不稳同 pages.dev）。**卖点=账号面只留 GitHub 一家**（代码+评论+托管一仓抓）；默认仍 CF Pages（自定义域大陆实测 200+带宽口径），用户若偏好账号收窄即切。

**免费域三档全景（v0.1.2 补，2026-09-29 用户「不想先付钱」；可达性=本机大陆实测同日）**：

1. **托管自带子域**（零申请零等待）：`*.pages.dev` / `*.github.io` / `*.workers.dev`——**pages.dev 大陆本机浏览器实测 3/3 真实站可开（09-29，含 scratchcn/voice-generator/turnstile-demo；时点实测优先于「被墙」社区共识，波动性已知、上线验收时复测）**；github.io 时好时坏；
2. **社区子域**（GitHub PR 申请，数天~数周，需站已上线）：**is-a.dev**（开发者个人站/项目）/ **js.org**（JS 开源项目，Astro 合格）——两注册局官网大陆实测 200；CNAME 指向 CF Pages 后可达性≈自定义域（**绑定后须实测确认**）；借域可回收，弱相容永久链承诺（000N- 路径型保证升级不断链）；
3. **免费真域名**：**eu.org**——**排除**（curl 超时 + 浏览器 ERR_CERT_AUTHORITY_INVALID 双通道确认大陆直连不可用，且用户浏览器无代理，申请/管理不可行）；us.kg——**排除**（浏览器 ERR_CONNECTION_RESET 实测，服务现状亦未核）；Freenom 类已死。学生身份另有 GitHub Student Pack（Namecheap .me 免费一年）；国内新用户 ¥1-9 促销域名=「先付一块钱」档，次年续费恢复原价，仅备查。

**零付钱推荐序**：pages.dev 今天上线（零等待）→ 同步 PR 申请 is-a.dev（站已上线才可申请，正好接上）→ 真实访客出现再购 .com（每步升级链接不断）。

## 3. 上线步骤序（U=用户账号/付款，A=agent）——**2026-09-29 执行记录**

> **已上线**：https://chenglongshi-ch.github.io/idea-site/ ——GitHub 路线（用户裁「github 可以实现就 github」），步骤序按实际执行改写如下。

1. [A] ✅ 敏感物复查全绿 → 远端建立 `chenglongshi-ch/idea-site`（public+Discussions）→ main 首推
2. [U→A] ✅ 用户裁 GitHub 路线（零账号注册）；Pages API 启用（build_type=workflow）+ `deploy.yml`（全第一方 actions，产物不进 git）
3. [域名·后置中] 当前 = github.io 子路径；零付钱序下一步 = **is-a.dev 申请**（站已上线即满足前提，批下换绑不断链）
4. [A] ✅ `site`+`base` 子路径全链路适配（模板内链/RSS/llms.txt/.md 镜像；Astro v7 两坑收编入 CLAUDE.md）；页脚占位换中性文案（about/now 口吻仍挂账）
5. [U→A] ✅ giscus 四值 agent 代办（Announcements 分类，仅维护者可开帖）
6. [A] ✅ 上线验证：**9 路由 200 + giscus 挂载（2026-09-29 大陆直连实测）**

**残余**：is-a.dev 申请（网址升级）；about/now 文案口吻（发布前欠账在册）；访客流量观察 → 购域决定；浏览器活体走查（console 净）待一次实机抽查。

> 演化位：绑定自定义域之前的 `pages.dev` 临时预览在大陆不保证可用——步 3 完成前不对外发链接。

---

*v0.1 2026-09-29 首版；随执行逐步回填（步 1-6 打勾记档）。*
