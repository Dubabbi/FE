import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(),
    svgr({
    exportAsDefault: true
  })],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      }
    }
  },
});