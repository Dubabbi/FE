import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true
    })
  ],
  server: {
    port: 3000,
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Bearer', 'xfe38sefpESfd39er'], 
      credentials: true, // 쿠키를 포함한 요청 허용
      maxAge: 3600 // 사전 요청(Preflight)의 결과를 1시간 동안 캐시
    },
    proxy: {
      '/api': {
        target: 'http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      },
      '/socket.io': {
        target: 'http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        ws: true,
      }
    }
  },
});
