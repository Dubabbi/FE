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
      allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With', 'If-Modified-Since', 'Bearer', 'xfe38sefpESfd39er'], // 필요한 모든 헤더를 추가
      credentials: true,
      maxAge: 3600
    },
    proxy: {
      '/api': {
        target: 'https://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      },
      '/socket.io': {
        target: 'https://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        ws: true,
      }
    }
  },
  define: {
    'process.env': process.env
  }
});