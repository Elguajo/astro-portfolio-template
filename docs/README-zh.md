# DesignPhotographyPortfolio

DesignPhotographyPortfolio是一个Astro模版，用于快速构建适合设计师/摄影师展示图片作品的静态网站。

技术栈：Astro + React + HeroUI + Tailwind

支持的功能：

* 内容集合和内容层 API: 使用 Markdown 管理结构化的作品集和页面。
* 图片压缩与高效管理: 图片可以根据作品集分类放置，执行命令自动生成压缩后的图片和作品集页面。
* 交互性设计: 通过**鼠标动画与字体悬浮动画**，增强用户体验。
* 针对**SEO**进行了优化: 包括**Astro SEO集成和站点地图**，以提高搜索引擎的可发现性。
* 图片展示逻辑处理: 图片通过分列布局自适应展示, 并在压缩时计算好尺寸以规避渲染时抖动, 图片懒加载减轻终端浏览器负载。
* 主题切换: 通过Tailwind dark mode实现主题快速切换。

## 目录结构

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

## 命令

命令 | 动作
---- | ----
`npm install` | 安装依赖
`npm run dev` | 启动开发环境 `localhost:4321`
`npm run build` | 打包至目录 `./dist/`
`npm run preview` | 本地打包完预览网站成品
`npm run astro ...` | 运行astro命令, 如：`astro add`, `astro check`
`npm run astro -- --help` | 获取astro命令帮助
`npm run auto-deploy-website` | 打包并将成本上传到github仓库
`npm run compress-images` | 图片压缩并放入`./public/images/works/`

## 快速开始

将作品集原图放入`./source-image`目录, 目录中的文件名就是作品集的名称。

支持的图片格式有`png`和`jpg`，作品集目录里面还需要`main.[png/jpg]`文件和`main.md`文件，标记主图和页面文件。

运行命令`npm run compress-images`自动压缩图片并生成图片的尺寸信息文件，最终会压缩成`webp`和`avif`两种格式文件。

`./source-image`目录中的图片压缩后会放入`./public/images/works`的同名目录中，mardown文件会放入`./src/data/pages/`中，其中`main.md`文件会改名成与作品集同名文件。

## source-image目录参考

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
