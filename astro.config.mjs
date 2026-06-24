import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const { PROJECT_ID, SECRET_API_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
  site: 'https://www.itfriends-school.com',

  output: 'server',
  server: {
    allowedHosts: true
  },

  // base: process.env.BASE_URL ?? '',

  integrations: [tailwind(),
    sanity({
      projectId: process.env.PROJECT_ID ?? PROJECT_ID,
      dataset: 'production',
      apiVersion: '2021-10-21',   
      // Set useCdn to false if you're building statically.
      useCdn: true,
      token: process.env.SECRET_API_TOKEN ?? SECRET_API_TOKEN
    }),
    sitemap(),
  ],

  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    routing: {
      prefixDefaultLocale: true
    }
  },

  devToolbar: {
    enabled: false
  },

  adapter: vercel({
    imageService: true,
    devImageService: 'sharp'
  }
  )
});