import { defineConfig } from 'vite';

export default defineConfig({
  base: '/vkr-research',
  test: {
    globals: true,
    environment: 'jsdom',
    mockReset: true,
  include: ['**/tests/**']
  }
});
