import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(
      execSync('git rev-parse --short HEAD').toString().trim()
    ),
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
