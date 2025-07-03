import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  server: {
    allowedHosts: true
  },
  integrations: [tailwind()],
  devToolbar: {
    enabled: false
  }
});
