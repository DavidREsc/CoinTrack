import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "http://server:5000",
        changeOrigin: true,
        rewrite: (path) => { console.log(path); return path.replace('/^\/api/', '') }
      }
    }
  }
  
})
