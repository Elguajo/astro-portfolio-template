# DesignPhotographyPortfolio

DesignPhotographyPortfolio is an **Astro template** designed for quickly building static portfolio websites for designers and photographers.

**Tech Stack**: [Astro](https://astro.build/) + React + HeroUI + [Tailwind CSS](https://tailwindcss.com/)  

## Features

- **Content Collections and Content-layer API**: Manage portfolio and page content with Markdown files.
- **Image Compression and Efficient Management**: Store images by portfolio and automatically generate compressed versions.
- **Interaction Design**: Enhance user experience with mouse hover effects and font animations.
- **SEO-optimized**: Integrated with **Astro SEO** and **sitemap** for greater search engine visibility.
- **Image Display Handling**: Displays images in a responsive column layout, employing compression and dimension metadata to avoid rendering shift and enable lazy loading.
- **Dark Mode Support**: Easily enable **dark mode** with Tailwind’s dark mode configuration.

## Directory Structure

```text
❯ lsd --tree -I node_modules -I .git -I source-image -I works -I dist -I .astro
 .
├──  public
│   ├──  favicon
│   │   ├──  favicon-16*16.png
│   │   ├──  favicon-180*180.png
│   │   ├──  favicon-192*192.png
│   │   ├──  favicon-32*32.png
│   │   ├──  favicon-512*512.png
│   │   └──  favicon.svg
│   ├──  fonts
│   │   └──  gillsans.ttf
│   ├──  images
│   │   ├──  works
│   │   │   ├──  *.webp
│   │   │   └──  *.avif
│   │   ├──  lost.jpg
│   │   └──  screenshot.png
│   └──  site.webmanifest
├──  scripts
│   ├──  auto-deploy-website.py
│   └──  compress-images.js
├── 󱧼 src
│   ├──  components
│   │   ├──  AllImageGrid.tsx
│   │   ├──  Footer.astro
│   │   ├──  Header.tsx
│   │   ├──  Image.tsx
│   │   ├──  MemberGrid.astro
│   │   ├──  ScrambleText.tsx
│   │   ├──  ThemeSwitcher.tsx
│   │   └──  WorksGrid.astro
│   ├──  content.config.ts
│   ├──  data
│   │   ├──  imageInfo.json
│   │   ├──  works
│   │   │   └──  *.md
│   │   └──  pages
│   │       └──  about.md
│   ├──  icons
│   │   ├──  close.svg
│   │   ├──  left.svg
│   │   ├──  logo.svg
│   │   ├──  rabbitit.svg
│   │   ├──  refresh.svg
│   │   └──  right.svg
│   ├──  js
│   │   └──  cursor.ts
│   ├──  layouts
│   │   └──  Layout.astro
│   ├──  lib
│   │   └──  getWorks.ts
│   ├──  pages
│   │   ├──  404.astro
│   │   ├──  [work_id].astro
│   │   ├──  about.astro
│   │   ├──  index.astro
│   │   └──  works.astro
│   └──  styles
│       └──  global.css
├── 󱧼 source-image
│   └── 󱧼 works-name
│       ├──  *.jpg
│       ├──  *.png
│       ├──  main.[png/jpg]
│       └──  main.md
├──  astro.config.mjs
├──  README.md
├──  package-lock.json
├──  package.json
└──  tsconfig.json
```

## Commands

| Command | Action |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server at `http://localhost:4321` |
| `npm run build` | Build for production into `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro …` | Run an `Astro` command, e.g.: `astro add` or `astro check` |
| `npm run astro -- --help` | Get help for `Astro` commands |
| `npm run auto-deploy-website` | Build and deploy to GitHub repository |
| `npm run compress-images` | Compress images and output to `./public/images/works/` | 


## Quick Start

Save your portfolio’s raw images in the `./source-image` directory — each directory’s name serves as its portfolio title.

The supported image formats are `png` and `jpg`. Each portfolio directory should include a `main.[png|jpg]` file and a `main.md` file with its metadata.

Running `npm run compress-images` will automatically compress the images and generate their dimension files. The compressed files will be placed under `./public/images/works/`. The Markdown files will be placed in `./src/data/pages/`. The `main.md` files will be renamed to match their respective portfolio directory names.

## source-image Directory Reference

```text
❯ ls -R ./source-image
6d-k         by702        ddbbmm       hatayurie    more         reflexdesign studionaeo   tian-design  typo-d

./source-image/6d-k:
1.jpg    10.jpg   11.jpg   2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/by702:
1.jpg    10.jpg   11.jpg   2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/ddbbmm:
1.jpg    10.jpg   2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/hatayurie:
1.jpg    10.jpg   2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/more:
fukunaga-print idea-mag

./source-image/more/fukunaga-print:
1.jpg    2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    main.jpg main.md

./source-image/more/idea-mag:
1.jpg    10.jpg   2.jpg    3.jpg    4.jpg    5.jpg    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/reflexdesign:
1.jpg    10.jpg   11.jpg   12.jpg   2.jpg    3.jpg    4.png    6.jpg    7.jpg    8.jpg    9.jpg    main.jpg main.md

./source-image/studionaeo:
1.jpg    11.jpg   2.jpg    4.jpg    6.jpg    8.jpg    main.md
10.jpg   12.png   3.png    5.jpg    7.jpg    9.png    main.png

./source-image/tian-design:
1.jpg     11.jpg    3.jpg     5.jpg     7.jpg     9.jpg     main.md
10.jpg    2.jpg     4.jpg     6.jpg     8.jpg     main.jpeg

./source-image/typo-d:
1.png    10.jpg   11.jpg   2.jpeg   3.jpeg   4.jpg    5.jpeg   6.jpg    7.png    8.png    9.png    main.jpg main.md
```
