import { defineConfig } from 'cypress';
import { startDevServer } from '@cypress/vite-dev-server';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://127.0.0.1:3001/', // Adjust the base URL as needed
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});