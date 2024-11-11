import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {
        external: ['@web3-react/core']
      }
    },
    optimizeDeps: {
      exclude: ['@web3-react/core']
    }
  }
});