/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './__test__/setup.ts'
    }
   
});
