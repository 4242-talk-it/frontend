import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // 아까 설정한 global 문제 해결용
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 스프링 부트 주소
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'http://localhost:8080',
        ws: true, // 웹소켓 프록시 설정
      },
    },
  },
})
