// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Gold-standard config for Microscalers CLI builds
// Excludes SES / lockdown libs, silences Rollup PURE warnings

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["ses", "@endo/lockdown", "lockdown-install"],
  },
  build: {
    rollupOptions: {
      // Exclude problematic SES / lockdown packages from the bundle
      external: (id) => {
        if (
          id.includes("lockdown-install") ||
          id.includes("ses") ||
          id.includes("@agoric/ses") ||
          id.includes("@endo/ses")
        ) {
          return true
        }
        return false
      },
      // Suppress harmless Rollup PURE warnings from ox libs
      onwarn(warning, warn) {
        if (
          warning.message &&
          warning.message.includes("/*#__PURE__*/")
        ) {
          return
        }
        warn(warning)
      },
    },
  },
  define: {
    // Ensure global context works without Node polyfills
    global: "globalThis",
  },
})
