import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../docs',
  },
  test: {
    environment: 'node',
  },
  optimizeDeps: {
    include: ['postcss', 'fzf'],
  },
  plugins: [
    {
      // /api/css/old および /api/css/new で old/ new/ の CSS ファイルを
      // raw テキストとして提供する。Vite の CSS 変換・SPA フォールバックを回避。
      name: 'serve-css-api',
      configureServer(server) {
        server.middlewares.use('/api/css', (req, res, next) => {
          const which = (req.url ?? '').replace(/^\//, '').split('?')[0]
          if (which !== 'old' && which !== 'new') { next(); return }
          const filePath = path.join(process.cwd(), 'data', which, 'module.css')
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.setHeader('Cache-Control', 'no-store')
            res.end(fs.readFileSync(filePath, 'utf-8'))
            return
          }
          res.statusCode = 404
          res.end('Not found')
        })
      },
    },
  ],
})
