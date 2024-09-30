import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('@mui')) {
              return 'vendor-mui'
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix'
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-maps'
            }
            return 'vendor' // all other node_modules
          }
        }
      },
    },
    chunkSizeWarningLimit: 1000, // Increased warning limit
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    open: true,
  },
});