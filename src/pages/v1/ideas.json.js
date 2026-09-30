// ideas.json endpoint（Q4，自定义结构面）：全量想法的结构化列表——status/tags/demo 直链/坟场评审指针
// AI 查列表即知哪些想法有坟场对照（review 字段），深读走 analysis.md / 想法页；llms.txt 内声明发现
// 路径带 /v1/（R5 版本纪律）：只增不改，破坏性换代另起新路径（/v2/ideas.json），老路径留档
import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const ideas = (await getCollection('ideas')).sort((a, b) =>
    a.data.updated < b.data.updated ? 1 : -1
  );

  const origin = `${site ? site.toString().replace(/\/+$/, '') : ''}${import.meta.env.BASE_URL}`.replace(
    /\/+$/,
    ''
  );

  const items = ideas.map((idea) => {
    const demoDir = path.join(process.cwd(), 'public/demos', idea.id);
    const hasDemo = fs.existsSync(path.join(demoDir, 'index.html'));
    const hasAnalysis = fs.existsSync(path.join(demoDir, 'analysis.md'));
    // review 指针：analysis.md 在场才出现（字段源 = lineage.json §9 扩展，构建期已过 [slug].astro 断言）
    let review = null;
    if (hasAnalysis) {
      const lineage = JSON.parse(fs.readFileSync(path.join(demoDir, 'lineage.json'), 'utf-8'));
      review = {
        as_of: lineage.data_as_of,
        personas: lineage.personas,
        analysis: `${origin}/demos/${idea.id}/analysis.md`,
      };
    }
    return {
      slug: idea.id,
      title: idea.data.title,
      summary: idea.data.summary,
      status: idea.data.status,
      tags: idea.data.tags,
      created: idea.data.created,
      updated: idea.data.updated,
      url: `${origin}/ideas/${idea.id}/`,
      md: `${origin}/ideas/${idea.id}.md`,
      demo: hasDemo ? `${origin}/demos/${idea.id}/` : null,
      review,
    };
  });

  const payload = {
    version: 1,
    as_of: new Date().toISOString().slice(0, 10),
    description:
      '想法站全量想法结构化列表。只增不改：字段只加不删不改义，破坏性换代另起新路径。review 字段 = 坟场对照分析指针（五透镜面板评审，撞车提醒+死因视角）。',
    ideas: items,
  };

  return new Response(JSON.stringify(payload, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
