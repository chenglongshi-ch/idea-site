// llms.txt endpoint（demo-protocol v0.3 治本项，2026-09-27 用户裁定）：构建期从 ideas collection 自动派生
// 消灭全站唯一手动同步面（首跑事故实录：三件套提交后 llms.txt 漏同步——RSS/now 均自动派生，唯独它手动）。
// 形态对齐 rss.xml.js 先例：手写文本、零依赖、static endpoint（export GET 即可，无需 getStaticPaths）。
import { getCollection } from 'astro:content';

export async function GET() {
  // 与 RSS 同序：updated 倒序 = 首页卡片序
  const ideas = (await getCollection('ideas')).sort((a, b) =>
    a.data.updated < b.data.updated ? 1 : -1
  );

  const ideaLines = ideas
    .map((idea) => `- [${idea.data.title}](/ideas/${idea.id}/): ${idea.data.summary}`)
    .join('\n');

  // 统一 \n 换行；页面节为固定路由，硬编码于模板
  const txt = `# 想法站

> 每个想法一页：想法原文 + 可交互 demo，从萌芽到做成全程公开。

## 想法

${ideaLines}

## 页面

- [关于本站](/about/): 身份、为什么公开想法、联系方式
- [当前焦点](/now/): 正在验证的想法与下一步

> 本文件由构建自动生成（源 = ideas collection），勿手改；想法上架后随 build 自动同步。
`;

  return new Response(txt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
