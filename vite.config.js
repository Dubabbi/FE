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
      allowedHeaders: ['Authorization', 'Content-Type'], 
      credentials: true, 
      maxAge: 3600 
    },
    proxy: {
      '/api': {
        target: 'https://maeummal.com',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      },
      '/socket.io': {
        target: 'https://maeummal.com',
        ws: true,
      }
    }
  },
});