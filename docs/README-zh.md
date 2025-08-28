# DesignPhotographyPortfolio

DesignPhotographyPortfolio是一个Astro模版，用于快速构建适合设计师/摄影师展示图片作品的静态网站。

技术栈：Astro + React + HeroUI + Tailwind

## 功能与特性

**该astro主题支持的功能及特性**：

1. light/dark主题切换;
2. 基于i18n的多国语言支持;
3. 使用React、Tailwind CSS、DaisyUI、AlpineJS、HeroUI构建;
4. SEO友好;
5. 响应式设计;
6. 高度可定制;
7. 网站地图;
8. 内置分析;
9. 开箱即用;
10. 使用Markdown文件管理作品集和页面内容;
11. 按作品集存储图像并自动生成压缩版本;
12. 通过鼠标悬停效果和字体动画增强用户体验;
13. 瀑布流式显示图片，图片渲染过程不抖动;
14. 集成基于Giscus的评论功能;
15. Open Graph 标签和动态 OG 图像生成，用于社交媒体共享;
16. WPA支持，浏览器一键安装网站到桌面。

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

