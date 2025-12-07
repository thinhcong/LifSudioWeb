import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // hoặc dùng '0.0.0.0'
    port: 5173,      // tuỳ chọn
  }
})
