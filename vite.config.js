
 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react-swc'

 export default defineConfig({
   plugins: [react()],
  server: {
     host: '192.168.129.72', 
     port: 5022, 
  },
 })