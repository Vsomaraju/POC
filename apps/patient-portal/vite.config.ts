import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => ({
  root: __dirname,
  plugins: [
    react(),
    nxViteTsPaths(),
    federation({
      name: 'patient_portal',
      filename: 'remoteEntry.js',
      exposes: {
        './PatientApp': `${__dirname}/src/bootstrap.tsx`,
        './PatientRoutes': `${__dirname}/src/routes.tsx`,
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0', eager: true },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0', eager: true },
        'react-router-dom': { singleton: true, requiredVersion: '^6.21.1', eager: true },
      },
      remoteType: 'module',
      devOptions: {
        disableRuntime: false,
      },
    }),
  ],
  server: {
    port: 4201,
    host: true,
    cors: true,
    strictPort: false,
    middlewareMode: false,
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
    },
  },
}));