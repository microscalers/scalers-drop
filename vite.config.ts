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
      external: (id) => {
        // Exclude SES lockdown from bundle
        if (id.includes('lockdown-install') || 
            id.includes('ses') || 
            id.includes('@agoric/ses') ||
            id.includes('@endo/ses')) {
          return true
        }
        return false
      },
      onwarn(warning, warn) {
        // Suppress warnings about PURE comments in ox library
        if (warning.message && warning.message.includes('/*#__PURE__*/')) {
          return
        }
        warn(warning)
      }
    }
  },
  define: {
    // Disable SES lockdown in browser
    global: 'globalThis',
  }
})
