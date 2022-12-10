import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { createAPIServer } from './server/app';

export default defineConfig({
  plugins: [react()]
});

createAPIServer();
