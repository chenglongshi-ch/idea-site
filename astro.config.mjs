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
        if (path.startsWith('/demos/') && path.endsWith('/') && path !== '/demos/') {
          req.url = `${path}index.html${query ? `?${query}` : ''}`;
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [demosDirIndex()],
  },
});
