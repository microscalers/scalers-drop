// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about PURE comments in ox library
        if (warning.message && warning.message.includes('/*#__PURE__*/')) {
          return
        }
        warn(warning)
      }
    }
  }
})
