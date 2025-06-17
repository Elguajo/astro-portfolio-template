// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import svgr from 'vite-plugin-svgr';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rabbitit.fun',
  devToolbar: {
    enabled: false
  },
  integrations: [sitemap(), react()],

  vite: {
    plugins: [svgr(), tailwindcss()]
  }
});
