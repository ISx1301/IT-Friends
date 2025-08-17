import sanity from '@sanity/astro'
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from "vite";
import vercel from '@astrojs/vercel';

const { PROJECT_ID, SECRET_API_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  site: 'http://localhost:4321',

  output: 'server',
  server: {
    allowedHosts: true
  },

  base: import.meta.env.BASE_URL ?? '',

  integrations: [tailwind(),
    sanity({
      projectId: PROJECT_ID,
      dataset: 'production',
      apiVersion: '2021-10-21',   
      // Set useCdn to false if you're building statically.
      useCdn: true,
      token: SECRET_API_TOKEN
    }),
  ],

  i18n: {
    locales: ["uk", "en"],
    defaultLocale: "uk",
    routing: {
      prefixDefaultLocale: false
    }
  },

  devToolbar: {
    enabled: false
  },

  adapter: vercel({
    imageService: true,
  })
});