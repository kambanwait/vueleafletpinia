import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: false,
    cssCodeSplit: false,
  },
  plugins: [vue()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
