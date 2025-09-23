# 🎨 Design Photography Portfolio

**Современный Astro-шаблон для создания портфолио дизайнеров и фотографов**

[![Astro](https://img.shields.io/badge/Astro-5.13.9-FF5D01?logo=astro)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## ✨ Особенности

- 🎨 **Современный дизайн** с поддержкой светлой/темной темы
- ⚡ **Высокая производительность** - статическая генерация с Astro
- 📱 **Адаптивный дизайн** для всех устройств
- 🌍 **Мультиязычность** (EN/RU)
- 🖼️ **Автоматическая оптимизация изображений** (WebP/AVIF)
- 🔍 **SEO-оптимизация** с мета-тегами и sitemap
- 📊 **PWA поддержка** для установки на устройство
- 🎭 **Интерактивные компоненты** на React
- 🎯 **Lazy loading** и preloading изображений
- 🛡️ **Обработка ошибок** с Error Boundaries

## 🚀 Быстрый старт

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/DesignPhotographyPortfolio.git
cd DesignPhotographyPortfolio

# Установить зависимости
npm install

# Запустить сервер разработки
npm run dev
```

Откройте [http://localhost:4321](http://localhost:4321) в браузере.

### Добавление портфолио

1. **Поместите изображения** в папку `./source-image/`
2. **Создайте папку** с названием проекта (например, `my-project/`)
3. **Добавьте файлы:**
   - `main.jpg` - главное изображение проекта
   - `1.jpg`, `2.jpg`, ... - дополнительные изображения
   - `main.md` - описание проекта

```bash
# Сжать и оптимизировать изображения
npm run compress-images
```

## 📋 Основные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера разработки |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Предварительный просмотр сборки |
| `npm run compress-images` | Сжатие и оптимизация изображений |
| `npm run lint` | Проверка качества кода |
| `npm run format` | Форматирование кода |
| `npm run analyze` | Анализ размера бандла |

## 🏗️ Структура проекта

```
DesignPhotographyPortfolio/
├── public/                 # Статические файлы
│   ├── favicon/           # Иконки сайта
│   └── images/            # Оптимизированные изображения
├── src/
│   ├── components/        # React и Astro компоненты
│   ├── data/             # Данные портфолио (Markdown)
│   ├── layouts/          # Макеты страниц
│   ├── pages/            # Страницы сайта
│   ├── lib/              # Утилиты и хелперы
│   └── styles/           # Глобальные стили
├── docs/                 # Документация
└── scripts/              # Скрипты сборки
```

## 🎯 Навигация по сайту

### Главная страница ("All")
- **Назначение**: Визуальная демонстрация всех работ
- **Особенности**: Случайный порядок, модальный просмотр, эффекты

### Портфолио ("Works")
- **Назначение**: Структурированный каталог проектов
- **Особенности**: Главные изображения, названия проектов

### О проекте ("About")
- **Назначение**: Информация о дизайнере
- **Особенности**: Мультиязычность, Markdown контент

### Контакты ("Contact")
- **Назначение**: Прямая связь по email
- **Особенности**: mailto ссылка

## 🛠️ Технологический стек

### Основные технологии
- **[Astro 5.13.9](https://astro.build/)** - Статический генератор сайтов
- **[React 19.1.0](https://reactjs.org/)** - Интерактивные компоненты
- **[TypeScript 5.0+](https://www.typescriptlang.org/)** - Типизация

### Стилизация и UI
- **[Tailwind CSS 4.1.3](https://tailwindcss.com/)** - Utility-first CSS
- **[DaisyUI 5.0.50](https://daisyui.com/)** - Компоненты для Tailwind
- **[HeroUI 2.7.9](https://heroui.com/)** - Современная библиотека React
- **[Framer Motion 12.19.1](https://www.framer.com/motion/)** - Анимации

### Инструменты разработки
- **[ESLint 9.36.0](https://eslint.org/)** - Линтинг кода
- **[Prettier 3.6.2](https://prettier.io/)** - Форматирование
- **[Husky 9.0.11](https://typicode.github.io/husky/)** - Git хуки

## 📚 Документация

### Для разработчиков
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Полное руководство по разработке
  - Настройка окружения
  - Workflow разработки
  - Правила контрибуции
  - Качество кода и тестирование
  - Деплой

### Справочная информация
- **[REFERENCE.md](./REFERENCE.md)** - Техническая документация
  - Архитектура системы
  - API компонентов
  - Интеграция с CMS
  - Оптимизации производительности
  - Продвинутые настройки

## 🎨 Кастомизация

### Темы
Проект поддерживает светлую и темную темы:
- **Светлая тема**: `silk` (по умолчанию)
- **Темная тема**: `business`

### Цветовая схема
Настройки тем находятся в `src/styles/global.css`:
```css
@plugin "daisyui" {
  themes: silk --default, business --prefersdark;
}
```

### Шрифты
Используется шрифт Handjet для заголовков:
```css
@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@200;300&display=swap');
```

## 🚀 Деплой

### GitHub Pages
```bash
npm run auto-deploy-website
```

### Netlify
1. Подключите репозиторий к Netlify
2. Настройте команду сборки: `npm run build`
3. Укажите папку публикации: `dist`

### Vercel
1. Подключите репозиторий к Vercel
2. Настройки по умолчанию подойдут автоматически

## 📊 Производительность

Проект оптимизирован для максимальной производительности:

- **Core Web Vitals**: LCP < 1.5s, FID < 50ms, CLS < 0.05
- **Bundle Size**: < 150KB initial bundle
- **Image Optimization**: WebP/AVIF форматы
- **Lazy Loading**: Intersection Observer API
- **Service Worker**: Интеллектуальное кэширование

## 🤝 Поддержка

- **Issues**: [GitHub Issues](https://github.com/your-username/DesignPhotographyPortfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/DesignPhotographyPortfolio/discussions)
- **Email**: elguajo.96@gmail.com

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](../LICENSE) для подробностей.

## 🙏 Благодарности

- [Astro](https://astro.build/) - за отличный фреймворк
- [Tailwind CSS](https://tailwindcss.com/) - за utility-first подход
- [HeroUI](https://heroui.com/) - за красивые компоненты
- [DaisyUI](https://daisyui.com/) - за темы и компоненты

---

**Создано с ❤️ для дизайнеров и фотографов**
