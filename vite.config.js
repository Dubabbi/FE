import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true
    }),
    basicSsl()
  ],
  server: {
    port: 3000,
    https: true,
    cors: {
      origin: 'https://main.dzudx79pr6bs5.amplifyapp.com',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
    },
    proxy: {
      '/api': {
        target: 'https://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      },
    }
  },
});