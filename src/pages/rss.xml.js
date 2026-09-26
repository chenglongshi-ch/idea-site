// RSS endpoint（design-spec v2.③ RSS 件）：手写 XML，零依赖，Astro static endpoint（export GET 即可，无需 getStaticPaths）
// 条目 = 每个想法：title/summary/link=/ideas/<id>//pubDate=updated（RSS 日期格式）
import { getCollection } from 'astro:content';

// XML 转义（任务口径：& < >，顺带引号一并安全）
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET({ site }) {
  const ideas = (await getCollection('ideas')).sort((a, b) =>
    a.data.updated < b.data.updated ? 1 : -1
  );
  // astro.config 未设 site → 按规格发根相对链接（/ideas/<id>/）；发布期在 astro.config 配 site 后自动补全为绝对 URL
  const base = site ? site.toString().replace(/\/+$/, '') : '';

  const items = ideas
    .map((idea) => {
      const link = `${base}/ideas/${idea.id}/`;
      return [
        '    <item>',
        `      <title>${esc(idea.data.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid>${link}</guid>`,
        `      <description>${esc(idea.data.summary)}</description>`,
        `      <pubDate>${new Date(idea.data.updated).toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  // 手写模板统一 \n 换行；编码由 Response 头 + 构建写盘 UTF-8 保证（Windows 下无 CRLF 混入）
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>想法站</title>
    <link>${base}/</link>
    <description>每个想法一页：想法原文 + 可交互 demo，从萌芽到做成全程公开。</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
