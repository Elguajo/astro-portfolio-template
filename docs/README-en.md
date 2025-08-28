# DesignPhotographyPortfolio

DesignPhotographyPortfolio is an **Astro template** designed for quickly building static portfolio websites for designers and photographers.

**Tech Stack**: [Astro](https://astro.build/) + React + HeroUI + [Tailwind CSS](https://tailwindcss.com/)  

## Features

**Features supported by this Astro theme**:

1. Light/Dark theme toggle;
2. Multi-language support based on i18n;
3. Built with React, Tailwind CSS, DaisyUI, AlpineJS, and HeroUI;
4. SEO-friendly;
5. Responsive design;
6. Highly customizable;
7. Sitemap;
8. Built-in analytics;
9. Ready to use out of the box;
10. Manage portfolios and page content with Markdown files;
11. Store images by portfolio and automatically generate compressed versions;
12. Enhance user experience with hover effects and font animations;
13. Masonry-style image display with stable rendering;
14. Integrated Giscus-based comment system;
15. Open Graph tags and dynamic OG image generation for social media sharing;
16. PWA support, allowing one-click installation to desktop from the browser.

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

