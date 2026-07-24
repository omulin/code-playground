import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // 💡 Rustのビルド・ターゲットフォルダをViteの監視対象から除外する
      ignored: ["**/src-tauri/target/**"],
    },
  },
});