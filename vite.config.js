
 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react-swc'

 export default defineConfig({
   plugins: [react()],
  server: {
     host: '127.0.0.3', 
     port: 5022, 
  },
 })