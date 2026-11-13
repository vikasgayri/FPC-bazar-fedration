import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: { port: 5173, open: true },
  // Pre-bundle lazily-imported deps so the dev server never re-optimises mid-session.
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-hook-form', '@hookform/resolvers/zod', 'zod', 'lucide-react', 'i18next', 'react-i18next'],
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
          motion: ['framer-motion'],
          forms: ['react-hook-form', 'zod', '@hookform/resolvers'],
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
})
