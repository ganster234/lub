import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {  //配置@到src目录
    alias: {
      "@": "/src",
    },
  },
  server:{  //暴露端口
    host:'0.0.0.0',//解决vite use--host to expose
    port:8081,//配置端口
    open:true,//配置默认打开浏览器
  },
})
