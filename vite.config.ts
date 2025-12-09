import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 仓库名（项目页会部署到 https://<user>.github.io/<repo>/）
const repoName = 'canvas-demo'
const isGitHubPages = process.env.DEPLOY_ENV === 'github-pages' || process.env.CI === 'true'

// 若为项目页（canvas-demo），生产环境下 base 应该是 /canvas-demo/
export default defineConfig({
  base: isGitHubPages ? `/${repoName}/` : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
