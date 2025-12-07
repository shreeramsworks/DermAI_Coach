import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 1. Load env variables from Vercel or local .env file
  // The third argument '' ensures we load ALL variables, not just those starting with VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // 2. This is the magic part. It tells the build process:
      // "Wherever you see 'process.env.API_KEY' in the code, replace it with the actual value from the environment."
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
    }
  };
});