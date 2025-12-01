import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        // strip the /api prefix so /api/products → /products on json-server
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
