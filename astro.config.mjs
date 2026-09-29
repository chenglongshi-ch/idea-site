// @ts-check
import { defineConfig } from 'astro/config';

// dev-only：Vite dev 的 public 中间件不解析目录 index，
// 把 spec §3 的 /demos/<slug>/ 直链重写到实际文件（build/preview 由静态服务天然支持，不经此钩子）
function demosDirIndex() {
  return {
    name: 'demos-dir-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '';
        const [path, query = ''] = url.split('?');
        if (path.startsWith(`${BASE}/demos/`) && path.endsWith('/') && path !== `${BASE}/demos/`) {
          req.url = `${path}index.html${query ? `?${query}` : ''}`;
        }
        next();
      });
    },
  };
}

// 子路径部署常量（2026-09-29 GitHub Pages 路线）：仓库非 <user>.github.io 专属仓 → 站挂 /idea-site/ 下。
// RSS/llms.txt/.md 镜像经 site 上下文自动带 base；模板内链一律 import.meta.env.BASE_URL 拼——换根路径部署时只改这两行。
const SITE = 'https://chenglongshi-ch.github.io';
const BASE = '/idea-site';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  vite: {
    plugins: [demosDirIndex()],
  },
});
