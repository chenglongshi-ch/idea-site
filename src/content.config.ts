import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 内容模型：docs/spec-site.md §4
// changelog 为 §3「更新日志（日期+一行）」区块的最小数据面（§8 开放点，随 first-real-idea 回填）
// ymd：spec 写法是未加引号的 YYYY-MM-DD，YAML 会解析成 Date——统一归一成日期串
const ymd = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v));

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ideas' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    status: z.enum(['seed', 'growing', 'shipped']),
    tags: z.array(z.string()).default([]),
    created: ymd,
    updated: ymd,
    changelog: z.array(z.object({ date: ymd, note: z.string() })).default([]),
  }),
});

export const collections = { ideas };
