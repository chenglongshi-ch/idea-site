// JSON Feed v1.1 endpoint（Q3，R3 调研定形态：唯一有规范依归的站级 JSON 列表端点，与 rss.xml 并挂）
// 形态对齐 rss.xml.js 先例：手写 JSON、零依赖、static endpoint；排序同 RSS（updated 倒序 = 首页卡片序）
// 路径带 /v1/（R5 版本纪律：静态站无 header 协商，URL 自描述；只增不改，破坏性换代另起新路径）
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const ideas = (await getCollection('ideas')).sort((a, b) =>
    a.data.updated < b.data.updated ? 1 : -1
  );

  // site 只含 origin（Astro v7 实测不含 base），BASE_URL 补子路径段；root 部署回退 '/'
  const origin = `${site ? site.toString().replace(/\/+$/, '') : ''}${import.meta.env.BASE_URL}`.replace(
    /\/+$/,
    ''
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: '想法站',
    home_page_url: `${origin}/`,
    feed_url: `${origin}/v1/feed.json`,
    description: '每个想法一页：想法原文 + 可交互 demo，从萌芽到做成全程公开。',
    language: 'zh-CN',
    items: ideas.map((idea) => ({
      id: `${origin}/ideas/${idea.id}/`,
      url: `${origin}/ideas/${idea.id}/`,
      title: idea.data.title,
      summary: idea.data.summary,
      // 正文以纯文本形态直给（markdown 原文，AI/工具链零跳转可读）；镜像端点同内容
      content_text: idea.body ?? '',
      date_published: `${idea.data.created}T00:00:00Z`,
      date_modified: `${idea.data.updated}T00:00:00Z`,
      tags: idea.data.tags,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
