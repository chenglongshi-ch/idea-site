// llms.txt endpoint（demo-protocol v0.3 治本项，2026-09-27 用户裁定）：构建期从 ideas collection 自动派生
// 消灭全站唯一手动同步面（首跑事故实录：三件套提交后 llms.txt 漏同步——RSS/now 均自动派生，唯独它手动）。
// 形态对齐 rss.xml.js 先例：手写文本、零依赖、static endpoint（export GET 即可，无需 getStaticPaths）。
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  // 与 RSS 同序：updated 倒序 = 首页卡片序
  const ideas = (await getCollection('ideas')).sort((a, b) =>
    a.data.updated < b.data.updated ? 1 : -1
  );

  // 绝对 URL 基（2026-09-29 发布）：site 只含 origin，BASE_URL 补子路径段（Astro v7 实测不含 base）
  const origin = `${site ? site.toString().replace(/\/+$/, '') : ''}${import.meta.env.BASE_URL}`.replace(
    /\/+$/,
    ''
  );

  // 链接直指 .md 镜像（Q2，2026-09-27）：llms.txt 规范「detail behind links」——AI 顺链拿到的是 markdown 而非 HTML
  const ideaLines = ideas
    .map((idea) => `- [${idea.data.title}](${origin}/ideas/${idea.id}.md): ${idea.data.summary}`)
    .join('\n');

  // 统一 \n 换行；页面节为固定路由，硬编码于模板
  const txt = `# 想法站

> 每个想法一页：想法原文 + 可交互 demo，从萌芽到做成全程公开。

## 想法

${ideaLines}

## 页面

- [关于本站](${origin}/about/): 身份、为什么公开想法、联系方式
- [当前焦点](${origin}/now/): 正在验证的想法与下一步

## 查询端点（机器可读，Q3/Q4）

- [ideas.json](${origin}/v1/ideas.json): 全量想法结构化列表——status/tags/demo 直链；带 review 字段的条目附有坟场对照分析（analysis.md，五透镜死因评审）
- [feed.json](${origin}/v1/feed.json): JSON Feed v1.1（与 rss.xml 同源同序，正文以纯文本直给）

## 提交（收外部 demo）

- [demo 提交协议](https://github.com/chenglongshi-ch/idea-site/blob/main/docs/demo-protocol.md): 把想法做成单文件 HTML demo 提交到本站的打包/血统/验收契约（三件套 + 想法条目，站侧分配编号上架）——2026-09-30 模拟实测前，外部视角从站面零入口可发现协议，此节即门面
- 提交通道：向本仓库提 Pull Request（按协议路径加包），或开 Issue 附提交包链接——站侧验收后分配编号上架

> 本文件由构建自动生成（源 = ideas collection），勿手改；想法上架后随 build 自动同步。
`;

  return new Response(txt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
