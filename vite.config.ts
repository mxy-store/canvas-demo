import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const repoName = 'canvas-demo'

export default defineConfig({
  // 直接使用环境变量，开发环境为 '/'，生产环境为 '/canvas-demo/'
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
