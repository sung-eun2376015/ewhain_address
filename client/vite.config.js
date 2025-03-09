import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 백엔드 서버 포트로 설정
        changeOrigin: true, // Origin 헤더를 백엔드 서버로 변경
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거하여 백엔드와 경로를 일치시킴
        secure: false, // HTTPS가 아닌 HTTP 요청 허용
      },
    },
  },
});
