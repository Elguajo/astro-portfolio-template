# 🎨 Astro Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.13.9-FF5D01?style=flat-square&logo=astro)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, high-performance portfolio template built with **Astro** for designers and photographers. Features responsive design, multi-language support, and optimized image handling.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional layout with light/dark theme support
- 🌍 **Multi-language** - Built-in i18n support (English, Russian)
- 📱 **Responsive** - Mobile-first design that works on all devices
- ⚡ **Performance** - Optimized with Astro's static site generation
- 🖼️ **Image Optimization** - Automatic WebP/AVIF conversion and lazy loading
- 🔍 **SEO Ready** - Meta tags, sitemap, and Open Graph support
- 💬 **Comments** - Integrated Giscus commenting system
- 🎯 **PWA Support** - Installable as a desktop app
- 🛡️ **Error Handling** - Robust error boundaries and graceful fallbacks
- 🧪 **Quality Code** - TypeScript, ESLint, Prettier, and pre-commit hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Elguajo/astro-portfolio-template.git
cd astro-portfolio-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your portfolio!

## 📚 Documentation

We provide comprehensive documentation:

- [📖 English Documentation](./docs/README-en.md) - Complete setup and usage guide
- [🛠️ Development Guide](./docs/DEVELOPMENT.md) - Development setup and component management
- [🏗️ Architecture Guide](./docs/ARCHITECTURE.md) - Project structure and design decisions
- [🤝 Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute to this project
- [📚 API Documentation](./docs/API.md) - Complete API reference
- [📝 CMS Integration Guide](./docs/CMS-INTEGRATION.md) - Complete CMS integration guide

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript checks |
| `npm run compress-images` | Compress and optimize images |
| `npm run analyze` | Analyze bundle size |
| `npm run auto-deploy-website` | Build and deploy to GitHub |

## 📁 Project Structure

```
src/
├── components/          # React and Astro components
│   ├── common/         # Shared components
│   ├── index/          # Homepage components
│   ├── pages/          # Page-specific components
│   └── works/          # Portfolio components
├── data/               # Content and configuration
│   ├── pages/          # Markdown pages
│   └── works/          # Portfolio data
├── i18n/               # Internationalization
├── layouts/            # Page layouts
├── lib/                # Utility functions
├── pages/              # Astro pages
└── styles/             # Global styles
```

## 🎨 Customization

### Adding New Portfolio Items

1. Create a new directory in `./source-image/`
2. Add your images (JPG/PNG format)
3. Include a `main.[jpg|png]` file for the cover image
4. Create a `main.md` file with metadata
5. Run `npm run compress-images` to process images

### Styling

The project uses Tailwind CSS with DaisyUI components. Customize themes in:
- `src/styles/global.css` - Global styles and theme configuration
- `src/site.config.ts` - Site configuration and themes

### Internationalization

Add new languages by:
1. Creating translation files in `src/i18n/design/`
2. Adding the locale to `src/site.config.ts`
3. Creating corresponding pages in `src/pages/[locale]/`

## 📸 Screenshots

**Light Mode**
![Light Mode](./public/images/screenshot-light.webp)

**Dark Mode**
![Dark Mode](./public/images/screenshot-dark.webp)

**Mobile View**
![Mobile View](./public/images/screenshot-phone.webp)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [HeroUI](https://heroui.com/) - Beautiful React components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library for Tailwind CSS

## 🔗 Links

- **Live Demo**: [https://cosmic-cactus-65b8d8.netlify.app/en/](https://cosmic-cactus-65b8d8.netlify.app/en/)
- **Astro Theme**: [https://astro.build/themes/details/designphotographyportfolio/](https://astro.build/themes/details/designphotographyportfolio/)
- **Example Site**: [Tutu Designer](https://rabbitit.fun)
