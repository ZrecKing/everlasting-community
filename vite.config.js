import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend (View) berada di folder client/
export default defineConfig({
  root: 'client',
  envDir: '..',
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: '../dist-client', emptyOutDir: true },
})
