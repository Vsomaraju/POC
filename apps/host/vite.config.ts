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
      name: 'host',
      remotes: {
        // Use preview port (4301) for development after building patient-portal
        // For dev mode, you'll need to build patient-portal first: npm run build:patient-portal
        // Then serve it: nx preview patient-portal
        patient_portal: mode === 'production' 
          ? 'http://localhost:4201/assets/remoteEntry.js'
          : 'http://localhost:4301/assets/remoteEntry.js', // Preview port for dev
      },
      shared: {
        react: { requiredVersion: '^18.2.0' },
        'react-dom': { requiredVersion: '^18.2.0' },
        'react-router-dom': { requiredVersion: '^6.21.1' },
      },
      remoteType: 'module',
    }),
  ],
  server: {
    port: 4200,
    host: true,
    cors: true,
    strictPort: false,
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
}));