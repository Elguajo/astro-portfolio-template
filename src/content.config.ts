import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/works" }),
  schema: z.object({
    base: z.string(),
  }),
});

const imageInfo = defineCollection({
  loader: file("src/data/imageInfo.json"),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/pages" }),
  schema: z.object({
    name: z.string(),
  }),
});

// Export all collections
export const collections = { works, imageInfo, pages };


