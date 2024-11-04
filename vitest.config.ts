import { defineConfig } from 'vitest/config';
import * as path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Setting the environment to jsdom for React component testing
    // setupFiles: ['./vitest.setup.ts'], // Optional setup file for global configurations
    coverage: {
      provider: 'istanbul', // Code coverage using V8, similar to Jest's configuration
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Module alias similar to moduleNameMapper in Jest
    },
  },
});