// 想法页 markdown 镜像端点（Q2 查询面，ai-query-q2q4 首件）：/ideas/<slug>.md
// 设计依据 = run 20260927T084023-1a1d R3 §2/§7-1——llms.txt 规范 v2「detail behind links」正解：
// 根 llms.txt 做小索引，正文细节活在链接后面（本端点），内容源本就是 markdown collection，构建期白拿。
// 版本纪律照 R5：镜像为派生产物只增不改（重建即刷新），源文件（src/content/ideas/）才是正本。
// 写法 = llms.txt.js / rss.xml.js 先例（手写文本、零依赖）+ 动态路由需 getStaticPaths（[slug].astro 同款）。
import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const ideas = await getCollection('ideas');
  return ideas.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export async function GET({ props, site }) {
  const { entry } = props;
  const d = entry.data;

  // hasDemo = 文件存在性探测（[slug].astro 同款）：镜像只对真实存在的 demo 给链接
  const hasDemo = fs.existsSync(path.join(process.cwd(), 'public/demos', entry.id, 'index.html'));

  // site 只含 origin（Astro v7 实测不含 base，2026-09-29 发布验收抓出），BASE_URL 补子路径段（rss.xml.js 同款）
  const base = `${site ? site.toString().replace(/\/+$/, '') : ''}${import.meta.env.BASE_URL}`.replace(
    /\/+$/,
    ''
  );

  // frontmatter：字符串一律 JSON.stringify（双引号串是合法 YAML，防标题/摘要含冒号破格）
  const frontmatter = [
    `title: ${JSON.stringify(d.title)}`,
    `summary: ${JSON.stringify(d.summary)}`,
    `status: ${d.status}`,
    `tags: [${d.tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    `created: ${JSON.stringify(d.created)}`,
    `updated: ${JSON.stringify(d.updated)}`,
  ].join('\n');

  // 正文原样（entry.body 不含 frontmatter）；追加链接/更新日志两节，对齐想法页四件套中可静态表达的面
  const sections = [`---\n${frontmatter}\n---\n\n${(entry.body ?? '').trimEnd()}`];

  sections.push(
    [
      '## 链接',
      '',
      `- 页面：${base}/ideas/${entry.id}/`,
      hasDemo ? `- Demo：${base}/demos/${entry.id}/` : '- Demo：尚无（萌芽阶段）',
    ].join('\n')
  );

  if (d.changelog.length > 0) {
    sections.push(
      ['## 更新日志', ...d.changelog.map((item) => `- ${item.date} ${item.note}`)].join('\n')
    );
  }

  sections.push('> 本文件由构建自动生成（源 = ideas collection），勿手改；想法上架后随 build 自动同步。');

  const md = sections.join('\n\n') + '\n';

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
