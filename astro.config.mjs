import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'http://localhost:4321',
  server: {
    allowedHosts: true
  },
  integrations: [tailwind()],
  devToolbar: {
    enabled: false
  }
});