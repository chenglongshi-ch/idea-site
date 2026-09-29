// 站级集中配置（design-spec v2.③ giscus 件：配置驱动，不引 npm 依赖，giscus 走外链 script）
// 未配置（四字段任一为空）→ 想法页反响块渲染占位说明；四字段齐 → 渲染 giscus 标准挂载。
// 配置步骤：在 GitHub 建公开仓库 → 开启 Discussions → 到 https://giscus.app 拿 repo/repoId/category/categoryId 填到下方。
export const siteConfig = {
  giscus: {
    repo: 'chenglongshi-ch/idea-site', // 公开仓+Discussions 已建（2026-09-29，API 直建）
    repoId: 'R_kgDOUxd8vg',
    category: 'Announcements', // 仅维护者可开新帖型分类，访客跟帖
    categoryId: 'DIC_kwDOUxd8vs4DGnub',
  },
} as const;
