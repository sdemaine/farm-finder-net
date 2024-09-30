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
              manualChunks: {
                vendor: ['react', 'react-dom', 'react-router-dom'],
                // Add other large dependencies here
              },
            },
          },
          chunkSizeWarningLimit: 1000, // Increase the warning limit if needed
    },
});
