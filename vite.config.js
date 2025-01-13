import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

const pathSrc = path.resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${pathSrc}/`,
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'] // 添加 .vue 扩展名
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
