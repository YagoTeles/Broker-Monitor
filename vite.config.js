import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import ini from 'ini';

const config = ini.parse(fs.readFileSync('./settings.ini', 'utf-8'));
const host = config.broker?.host || '';
const port = config.broker?.port || '';
console.log(config)
export default defineConfig({
  
  plugins: [react()],
  server: {
    proxy: {
      '/totvs_broker_query': {
        target: `http://${host}:${port}`,
        changeOrigin: true
      }
    }
  }
});
