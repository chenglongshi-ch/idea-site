# site

想法展示独立站。白话说：每个想法做成一页——想法本身 + 一个能点的 demo；人和 AI 都能发现它、查询它、留下反响。现在先把「想法 → demo → 挂本地站」这条链在本地跑通，发布上线后置（demo 生成通道已双实验定稿：Agnes 主力 / 商汤 flash-lite 备用）。

## 安装

- Python 用 [uv](https://docs.astral.sh/uv/) 管理（实验脚本用系统 Python 3.12+ 也能跑）。
- 在项目根建 `.env`（已被 .gitignore 排除，绝不提交），需含变量名：
  - `AGNES_API_KEY` — Agnes 通道（demo 生成主力）
  - `SENSENOVA_API_KEY` — 商汤通道（备用）
  - `SENSENOVA_BASE_URL` — 商汤端点
  - 只写「变量名=你自己的 key 值」；key 值绝不进代码、仓库或对话。

## 用法

- 人入口 = 本 README；agent 入口 = [CLAUDE.md](CLAUDE.md)（含模型通道表、端点与工艺陷阱）。
- 实验脚本与结论在 `research/experiments/`（每个实验目录一份 RESULT.md）；平台/工具调研在 `research/`。

## 继承清单（来自前作 vedio）

前作 `d:\project\vedio`（同用户、同 Agnes 生态的视频生成管线）。这个项目不是从零开始，也不是整套照搬：

**继承**（已实证的判断力资产）：

- 血统三件套模式：单一事实源 / append-only 事件账本 / 产物 lineage json（含 `producer` + `rev`）——「每个 demo 怎么来的」可追溯，直接平移。
- 低配额节流骨架思路：provider 内 monotonic 节流钟、「被拒也计时」、「参数只能收紧不能放宽」——抄模式不抄视频档数值（文本 ~3s 级，不是视频 60s 级）。
- Windows UTF-8 防炸经验：stdout/stderr reconfigure + 双写逐行 flush 日志（runtime.py 整文件可搬）。
- Agnes API 实证事实：端点/限额/行为坑，见 `research/vedio-assets.md` §2 事实卡。

**抛弃**（域不匹配）：视频管线整套——poller 轮询、ffmpeg 合成、shows 分集组织、60s 视频节流地板。文本/图像是同步 HTTP 调用，零轮询需求；site 的域模型是「想法/demo/查询」，不是短剧分集。日后真要加视频再回 vedio 搬。

状态：build（2026-09-23 立项，先本地跑通）

## 本地开发

站为 [Astro](https://astro.build) 静态站（官方 minimal 模板起手，2026-09-23 并入；功能面以 [docs/spec-site.md](docs/spec-site.md) 为准）：

```sh
npm install        # 安装依赖
npm run dev        # 本地开发服务器 http://localhost:4321
npm run build      # 生产构建到 ./dist/
npm run preview    # 本地预览构建产物
```

路由：`/` 想法卡片列表；`/ideas/<slug>/` 想法页（问题与方案 + 页内 demo iframe + 更新日志 + 评论区占位）；`/demos/<slug>/` 纯 demo 直链（`public/demos/` 静态直出）。想法条目在 `src/content/ideas/`，frontmatter 见 spec §4。
