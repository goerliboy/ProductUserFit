import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Reduce HMR overhead
      protocol: 'ws',
      timeout: 1000,
      overlay: false
    },
    watch: {
      // Ignore files that shouldn't trigger HMR
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom']
  }
});