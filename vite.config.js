import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 8888;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/img': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
