// @ts-check
import fs from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import rehypeExternalLinks from 'rehype-external-links';
import { siteConfig } from './src/site.config';
import webmanifest from 'astro-webmanifest';
import vtbot from 'astro-vtbot';
import alpinejs from '@astrojs/alpinejs';

/** @type {any[]} */
const vitePlugins = [
  svgr({
    svgrOptions: {
      icon: true,
    },
  }),
  tailwindcss(),
  visualizer({
    emitFile: true,
    filename: 'package_analyze.html',
  }),
  // The raw font plugin can be re-enabled when bundled font files are available.
];

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  devToolbar: {
    enabled: false,
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
      include: ['react', 'react-dom', '@heroui/react', 'tinacms'],
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2, // Multiple passes for better compression
        },
        mangle: {
          safari10: true, // Fix Safari 10 issues
        },
      },
      rollupOptions: {
        output: {
          // Optimize chunk naming for better caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            // UI component libraries
            'ui-vendor': ['@heroui/react', '@heroicons/react'],
            // Animation libraries
            'animation-vendor': [
              'framer-motion',
              'keen-slider',
              'canvas-confetti',
            ],
            // Utility libraries
            'utils-vendor': ['clsx', 'tailwind-merge', 'dayjs', 'lodash'],
            // Icon libraries
            'icons-vendor': ['@iconify/react', 'lucide-react'],
            // Image processing
            'image-vendor': ['sharp', '@resvg/resvg-js'],
            // Markdown processing
            'markdown-vendor': ['mdast-util-to-string', 'reading-time'],
            // Other utilities
            'misc-vendor': ['qrcode', 'satori', 'satori-html'],
          },
        },
      },
    },
    plugins: /** @type {any} */ (vitePlugins),
    server: {
      watch: {
        ignored: ['**/.git/**', '**/website/**', '**/dist/**'],
      },
    },
  },
  integrations: [
    sitemap(),
    react(),
    icon(),
    vtbot(),
    webmanifest({
      name: siteConfig.title,
      short_name: 'HDUD',
      description: siteConfig.description,
      lang: siteConfig.lang,
      icon: 'public/favicon/favicon.svg',
      icons: [
        {
          src: 'public/favicon/favicon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          src: 'public/favicon/favicon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'public/favicon/favicon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: '/',
      theme_color: '#fdfaf6',
      background_color: '#fdfaf6',
      display: 'standalone',
    }),
    alpinejs(),
  ],
  redirects: {
    '/blog': '/blog/home',
    '/blog/index': '/blog/home',
    '/blog/tags': '/blog/tags/Python',
    '/blog/posts': '/blog/posts/1',
  },
  markdown: {
    // Reading time calculation
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        // Add external link icons
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' },
        },
      ],
    ],
  },
});

/**
 * Create a Vite plugin that loads font files as raw strings.
 * @param {string[]} extensions
 * @returns {import('vite').PluginOption}
 */
export function rawFonts(extensions) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_, id) {
      if (extensions.some(ext => id.endsWith(ext))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }

      return null;
    },
  };
}
