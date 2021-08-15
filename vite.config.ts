import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

const outDir = path.join(__dirname, 'dist');

export default defineConfig({
  plugins: [reactRefresh()],
  cacheDir: '.cache/.vite',
  resolve: {
    alias: [{ find: '@', replacement: path.join(__dirname, 'src') }],
  },
  build: {
    target: 'esnext',
    outDir,
  },
});
