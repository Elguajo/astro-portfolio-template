# 🛠️ Development & Technical Guide

Полное руководство по разработке, техническая документация, API, архитектура и деплой проекта Design Photography Portfolio.

## 📋 Содержание

### Разработка
- [Настройка окружения](#настройка-окружения)
- [Workflow разработки](#workflow-разработки)
- [Правила контрибуции](#правила-контрибуции)
- [Качество кода](#качество-кода)
- [Тестирование](#тестирование)
- [Деплой](#деплой)

### Техническая документация
- [Архитектура проекта](#архитектура-проекта)
- [API компонентов](#api-компонентов)
- [CMS интеграция](#cms-интеграция)
- [Оптимизации производительности](#оптимизации-производительности)
- [Конфигурация](#конфигурация)

### Troubleshooting
- [Частые проблемы](#частые-проблемы)
- [Полезные команды](#полезные-команды)

## 🚀 Настройка окружения

### Предварительные требования

- **Node.js 18+** - [Скачать](https://nodejs.org/)
- **npm или yarn** - Менеджер пакетов
- **Git** - [Скачать](https://git-scm.com/)
- **VS Code** (рекомендуется) с расширениями:
  - Astro
  - TypeScript
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

### Первоначальная настройка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/DesignPhotographyPortfolio.git
cd DesignPhotographyPortfolio

# Установить зависимости
npm install

# Инициализировать git хуки
npm run prepare

# Запустить сервер разработки
npm run dev
```

### Переменные окружения

Создайте файл `.env` для локальной разработки:

```env
# Настройки разработки
NODE_ENV=development
VITE_SHOW_REFRESH_BUTTON=true

# Аналитика (опционально)
VITE_GA_ID=your-google-analytics-id

# Комментарии (опционально)
VITE_GISCUS_REPO=your-repo
VITE_GISCUS_REPO_ID=your-repo-id
VITE_GISCUS_CATEGORY_ID=your-category-id

# CMS интеграция (опционально)
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-strapi-token
SANITY_PROJECT_ID=your-sanity-project-id
CONTENTFUL_SPACE_ID=your-contentful-space-id
```

## 🔄 Workflow разработки

### Основные команды

```bash
# Разработка
npm run dev              # Запуск dev сервера
npm run dev:debug        # Запуск с отладкой

# Качество кода
npm run lint             # Проверка ESLint
npm run lint:fix         # Автоисправление ESLint
npm run format           # Форматирование Prettier
npm run format:check     # Проверка форматирования
npm run type-check       # Проверка TypeScript

# Сборка
npm run build            # Сборка для продакшена
npm run preview          # Предварительный просмотр
npm run analyze          # Анализ размера бандла

# Утилиты
npm run compress-images  # Сжатие изображений
npm run auto-deploy-website # Деплой на GitHub Pages
```

### Управление кнопкой обновления

#### Текущее состояние

Кнопка обновления на главной странице **скрыта** по умолчанию.

#### Как включить кнопку обновления

1. Откройте `src/components/index/AllImageGrid.tsx`
2. Найдите строку с классом `className`
3. Удалите класс `hidden`:

**Было (скрыто):**
```tsx
className = 'hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

**Должно стать (видимо):**
```tsx
className = 'bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

#### Альтернативные способы управления

**Через переменную окружения:**
```env
VITE_SHOW_REFRESH_BUTTON=false
```

```tsx
const showRefreshButton = import.meta.env.VITE_SHOW_REFRESH_BUTTON !== 'false';
{!isOpen && showRefreshButton && <Button ... />}
```

**Через конфигурационный файл:**
```ts
// src/site.config.ts
export const siteConfig = {
  showRefreshButton: false, // изменить на true для включения
};
```

## 🏗️ Архитектура проекта

### Технологический стек

**Основные технологии**
- **[Astro 5.13.9](https://astro.build/)** - Статический генератор сайтов с component islands
- **[React 19.1.0](https://reactjs.org/)** - Интерактивные UI компоненты
- **[TypeScript 5.0+](https://www.typescriptlang.org/)** - Типизация и developer experience

**Стилизация и UI**
- **[Tailwind CSS 4.1.3](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI 5.0.50](https://daisyui.com/)** - Компоненты для Tailwind
- **[HeroUI 2.7.9](https://heroui.com/)** - Современная библиотека React
- **[Framer Motion 12.19.1](https://www.framer.com/motion/)** - Анимации

### Структура проекта

```
DesignPhotographyPortfolio/
├── public/                     # Статические файлы
│   ├── favicon/               # Иконки сайта
│   └── images/                # Оптимизированные изображения
├── src/
│   ├── components/            # Переиспользуемые компоненты
│   │   ├── common/           # Общие компоненты
│   │   ├── index/            # Компоненты главной страницы
│   │   ├── pages/            # Компоненты страниц
│   │   └── works/            # Компоненты портфолио
│   ├── data/                 # Контент и конфигурация
│   │   ├── pages/            # Markdown страницы
│   │   └── works/            # Данные портфолио
│   ├── i18n/                 # Интернационализация
│   ├── layouts/              # Макеты страниц
│   ├── lib/                  # Утилиты
│   ├── pages/                # Astro страницы (роутинг)
│   └── styles/               # Глобальные стили
├── scripts/                  # Скрипты сборки
└── docs/                     # Документация
```

### Архитектура компонентов

```
BaseLayout.astro
├── Header.astro
├── PageLayout.astro
│   ├── AllImageGrid.tsx (Homepage)
│   ├── MemberGrid.astro (Portfolio)
│   └── CustomFloatBtns.astro
└── ErrorBoundary.tsx (Wraps React components)
```

## 🧩 API компонентов

### React компоненты

#### `Image.tsx`

Высокопроизводительный компонент изображения с lazy loading, обработкой ошибок и автоматической оптимизацией форматов.

**Расположение:** `src/components/common/Image.tsx`

**Props:**
```typescript
interface ImageProps {
  src: string; // Путь к изображению (без расширения)
  alt?: string; // Alt текст для доступности
  classNames?: {
    // Кастомные CSS классы
    skeleton?: string;
    img?: string;
  };
  onClick?: () => void; // Обработчик клика
  imageInfo: {
    // Размеры изображения
    width: number;
    height: number;
  };
  workTitle?: string; // Название работы для генерации alt текста
  lazy?: boolean; // Включить/выключить lazy loading
  preloadOnHover?: boolean; // Включить preload при наведении
  [key: string]: any; // Дополнительные пропсы
}
```

**Возможности:**
- Автоматический выбор формата WebP/AVIF
- Lazy loading с Intersection Observer
- Механизм повторных попыток (до 3 раз)
- Skeleton состояние загрузки
- Fallback UI для ошибок
- Автоматическая генерация alt текста

**Использование:**
```tsx
<Image
  src="/images/works/portfolio/main"
  imageInfo={{ width: 800, height: 600 }}
  workTitle="My Portfolio"
  onClick={() => openModal()}
  lazy={true}
  preloadOnHover={true}
/>
```

#### `AllImageGrid.tsx`

Основной компонент сетки портфолио с masonry layout и функциональностью обновления.

**Расположение:** `src/components/index/AllImageGrid.tsx`

**Props:**
```typescript
interface AppProps {
  members: Member[];
}

interface Member {
  name: string;
  width: number;
  height: number;
}
```

**Возможности:**
- Masonry layout с адаптивными колонками
- Функциональность перемешивания с кнопкой обновления
- Модальный просмотр для детального осмотра изображений
- Эффект grayscale с цветом при наведении
- Навигация по галерее с preloading
- Мемоизированные оптимизации производительности

#### `ErrorBoundary.tsx`

React Error Boundary компонент для graceful обработки ошибок.

**Расположение:** `src/components/common/ErrorBoundary.tsx`

**Props:**
```typescript
interface Props {
  children: ReactNode; // Дочерние компоненты для обертывания
  fallback?: ReactNode; // Кастомный fallback UI
  onError?: (error: Error, errorInfo: ErrorInfo) => void; // Обработчик ошибок
}
```

### Astro компоненты

#### `BaseLayout.astro`

Основной layout компонент с оптимизациями производительности.

**Расположение:** `src/layouts/BaseLayout.astro`

**Возможности:**
- Preloading ресурсов
- Регистрация Service Worker
- Инициализация мониторинга производительности
- DNS prefetch для внешних доменов

#### `Header.astro`

Компонент навигационной шапки.

**Расположение:** `src/components/common/Header.astro`

**Возможности:**
- Адаптивная навигация
- Переключение тем
- Выбор языка
- Отображение логотипа

### Утилиты

#### `useIntersectionObserver.ts`

Кастомный хук для Intersection Observer API.

**Расположение:** `src/lib/useIntersectionObserver.ts`

**Хуки:**
```typescript
// Общий intersection observer
useIntersectionObserver(options);

// Lazy loading изображений
useImageLazyLoading(options);

// Hover preload
useHoverPreload(options);
```

#### `imagePreloader.ts`

Утилиты для preloading изображений.

**Расположение:** `src/lib/imagePreloader.ts`

**Функции:**
```typescript
// Preload одного изображения
preloadImage(src, options);

// Preload нескольких изображений
preloadImages(srcs, options);

// Preload с разными форматами
preloadImageFormats(baseSrc, options);

// Preload изображений галереи
preloadGalleryImages(currentIndex, images, options);
```

#### `performance.ts`

Утилиты мониторинга производительности.

**Расположение:** `src/lib/performance.ts`

**Функции:**
```typescript
// Измерение Web Vitals
measureWebVitals(onPerfEntry);

// Наблюдение за производительностью
observePerformance();

// Отслеживание lazy loading
trackLazyLoading();

// Инициализация мониторинга
initPerformanceMonitoring();
```

## 🔧 CMS интеграция

### Обзор

Этот шаблон портфолио может быть интегрирован с различными CMS решениями для предоставления возможностей управления контентом при сохранении преимуществ статической генерации сайтов.

### Рекомендуемые CMS решения

| CMS             | Тип              | Цена      | Лучше всего для              | Сложность |
| --------------- | ---------------- | --------- | ---------------------------- | --------- |
| **Strapi**      | Self-hosted      | Free/Paid | Полный контроль, кастомные поля | Средняя   |
| **Sanity**      | Cloud/Self-hosted| Free tier | Real-time collaboration      | Легкая    |
| **Contentful**  | Cloud            | Free tier | Enterprise функции           | Легкая    |
| **Netlify CMS** | Git-based        | Free      | Git workflow                 | Легкая    |
| **Forestry**    | Git-based        | Paid      | Jekyll/Hugo пользователи     | Легкая    |
| **Ghost**       | Self-hosted      | Free/Paid | Blog-focused                 | Средняя   |
| **WordPress**   | Self-hosted      | Free      | Существующие WP пользователи | Сложная   |

### Strapi интеграция

**Лучше всего для**: Полный контроль, кастомные типы контента, self-hosting

#### Установка
```bash
# Установить Strapi
npx create-strapi-app@latest portfolio-cms --quickstart

# Установить Astro Strapi интеграцию
npm install @astrojs/strapi
```

#### Конфигурация
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import strapi from '@astrojs/strapi';

export default defineConfig({
  integrations: [
    strapi({
      url: process.env.STRAPI_URL || 'http://localhost:1337',
      token: process.env.STRAPI_TOKEN,
    }),
  ],
});
```

### Sanity интеграция

**Лучше всего для**: Real-time collaboration, cloud hosting

#### Установка
```bash
# Установить Sanity CLI
npm install -g @sanity/cli

# Создать Sanity проект
sanity init --project-id your-project-id --dataset production

# Установить Astro Sanity интеграцию
npm install @sanity/astro
```

### Netlify CMS интеграция

**Лучше всего для**: Git workflow, бесплатный хостинг

#### Конфигурация
```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: 'public/images'
public_folder: '/images'

collections:
  - name: 'portfolio'
    label: 'Portfolio Items'
    folder: 'src/data/works'
    create: true
    slug: '{{slug}}'
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Description', name: 'description', widget: 'text' }
      - {
          label: 'Images',
          name: 'images',
          widget: 'list',
          field: { label: 'Image', name: 'image', widget: 'image' },
        }
```

## ⚡ Оптимизации производительности

### Service Worker кэширование

**Файл**: `public/sw.js`

**Возможности:**
- Cache-first стратегия для статических ресурсов (CSS, JS, шрифты)
- Cache-first стратегия для изображений
- Network-first стратегия для страниц
- Автоматическая очистка кэша и версионирование
- Возможности background sync

### Оптимизация бандла

**Файл**: `astro.config.mjs`

**Улучшения:**
- Детальные manual chunks для vendor библиотек
- Оптимизированное именование chunks с хешами
- Улучшенное Terser сжатие с множественными проходами
- Исправления совместимости Safari 10

**Manual Chunks:**
```javascript
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'ui-vendor': ['@heroui/react', '@heroicons/react'],
  'animation-vendor': ['framer-motion', 'keen-slider', 'canvas-confetti'],
  'utils-vendor': ['clsx', 'tailwind-merge', 'dayjs', 'lodash'],
  'icons-vendor': ['@iconify/react', 'lucide-react'],
  'image-vendor': ['sharp', '@resvg/resvg-js'],
  'i18n-vendor': ['i18next', 'astro-i18n'],
  'markdown-vendor': ['mdast-util-to-string', 'reading-time'],
  'misc-vendor': ['qrcode', 'satori', 'satori-html'],
}
```

### Preloading ресурсов

**Файл**: `src/layouts/BaseLayout.astro`

**Preloaded ресурсы:**
- Critical CSS с async загрузкой
- Логотип и favicon изображения
- DNS prefetch для внешних доменов
- Fallback для non-JS окружений

### Оптимизация шрифтов

**Файл**: `src/styles/global.css`

**Возможности:**
- `font-display: swap` для немедленного отображения текста
- Оптимизации сглаживания шрифтов
- Поддержка reduced motion
- Оптимизации рендеринга изображений

### Мемоизация React компонентов

**Файлы:**
- `src/components/index/AllImageGrid.tsx`
- `src/components/common/Image.tsx`

**Оптимизации:**
- `useMemo` для дорогих вычислений
- `useCallback` для обработчиков событий
- Предварительно вычисленные пути изображений и соотношения сторон
- Мемоизированная генерация alt текста

### Lazy Loading с Intersection Observer

**Файлы:**
- `src/lib/useIntersectionObserver.ts`
- `src/components/common/Image.tsx`

**Возможности:**
- Intersection Observer API для эффективного обнаружения viewport
- Настраиваемые пороги и root margins
- Fallback для неподдерживаемых браузеров
- Оптимизированные настройки для изображений (1% порог, 100px root margin)

### Preload изображений при наведении

**Файлы:**
- `src/lib/imagePreloader.ts`
- `src/components/common/ImagePreloader.tsx`

**Возможности:**
- Hover-triggered preloading
- Preloading навигации по галерее
- Поддержка множественных форматов (AVIF, WebP, fallback)
- Приоритетная загрузка
- Управление кэшем

### Мониторинг производительности

**Файл**: `src/lib/performance.ts`

**Возможности:**
- Измерение Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Анализ navigation timing
- Мониторинг resource timing
- Логирование размера бандла
- Мониторинг использования памяти
- Отслеживание производительности lazy loading

## 🤝 Правила контрибуции

### Code of Conduct

Этот проект следует принципам открытого и дружелюбного сообщества:

- Будьте уважительными и инклюзивными
- Используйте дружелюбный язык
- Принимайте конструктивную критику
- Фокусируйтесь на том, что лучше для сообщества
- Проявляйте эмпатию к другим участникам

### Процесс контрибуции

#### 1. Fork и Clone
```bash
# Fork репозитория на GitHub
git clone https://github.com/YOUR_USERNAME/DesignPhotographyPortfolio.git
cd DesignPhotographyPortfolio

# Добавить upstream remote
git remote add upstream https://github.com/original-owner/DesignPhotographyPortfolio.git
```

#### 2. Создание ветки
```bash
# Создать новую ветку для фичи
git checkout -b feature/your-feature-name

# Или для исправления бага
git checkout -b fix/your-bug-fix
```

#### 3. Внесение изменений
- Следуйте стандартам кодирования
- Добавляйте тесты для новой функциональности
- Обновляйте документацию при необходимости
- Проверяйте код перед коммитом

#### 4. Коммиты
```bash
# Добавить изменения
git add .

# Создать коммит с описательным сообщением
git commit -m "feat: add new image optimization feature"

# Push в вашу ветку
git push origin feature/your-feature-name
```

#### 5. Pull Request
1. Создайте Pull Request на GitHub
2. Заполните шаблон PR
3. Убедитесь, что все проверки пройдены
4. Дождитесь ревью от мейнтейнеров

### Типы коммитов

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: новая функциональность
fix: исправление бага
docs: изменения в документации
style: форматирование, отсутствующие точки с запятой и т.д.
refactor: рефакторинг кода
test: добавление тестов
chore: обновление задач сборки, конфигурации менеджера пакетов и т.д.
```

## 🧪 Качество кода

### ESLint и Prettier

Проект настроен с ESLint и Prettier для поддержания высокого качества кода:

#### ESLint правила
```javascript
// Основные правила
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/prefer-nullish-coalescing': 'error',
'@typescript-eslint/prefer-optional-chain': 'error',
'no-console': 'error', // В продакшене
'no-debugger': 'error',
'prefer-const': 'error',
'no-var': 'error',
```

#### Pre-commit хуки
```json
{
  "lint-staged": {
    "*.{js,ts,tsx,astro}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### TypeScript конфигурация

Строгие настройки TypeScript:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```

### Обработка ошибок

#### Error Boundaries
```tsx
// Оборачивание компонента в ErrorBoundary
<ErrorBoundaryWrapper
  fallback={<div>Custom error message</div>}
  onError={(error, errorInfo) => {
    console.error('Custom error:', error);
  }}
>
  <YourComponent />
</ErrorBoundaryWrapper>
```

#### Глобальная обработка ошибок
```typescript
// Использование централизованной обработки ошибок
import { handleAsyncError, createError } from '@/lib/errorHandler';

const data = await handleAsyncError(
  async () => {
    return await fetchData();
  },
  [], // fallback value
  'Failed to fetch data'
);
```

### Доступность (Accessibility)

#### Alt-тексты для изображений

Все изображения имеют alt-тексты для улучшения доступности:

- **Автоматическая генерация**: Компонент `Image.tsx` автоматически генерирует осмысленные alt-тексты
- **Ручное указание**: Можно передать кастомный alt-текст через пропс `alt`
- **Контекстная информация**: Alt-тексты включают название работы и тип изображения

**Примеры alt-текстов:**
- `"6d-k - Main portfolio image"` - для главного изображения работы
- `"by702 - Portfolio work image 3"` - для дополнительных изображений
- `"HDUD Logo"` - для логотипа в шапке

#### Улучшения доступности
- ✅ Alt-тексты для всех изображений
- ✅ Семантическая HTML разметка
- ✅ Поддержка клавиатурной навигации
- ✅ Контрастные цвета для текста

## 🧪 Тестирование

### Чеклист для ручного тестирования

Перед деплоем протестируйте:

#### Адаптивный дизайн
- [ ] **Мобильные устройства** (320px - 768px)
- [ ] **Планшеты** (768px - 1024px)
- [ ] **Десктоп** (1024px+)

#### Переключение тем
- [ ] Функциональность светлой темы
- [ ] Функциональность темной темы
- [ ] Сохранение выбранной темы

#### Загрузка изображений
- [ ] Lazy loading работает
- [ ] Обработка ошибок для неудачных загрузок
- [ ] Механизм повторных попыток функционирует

#### Навигация
- [ ] Все внутренние ссылки работают
- [ ] Навигация назад/вперед
- [ ] Функциональность мобильного меню

#### Производительность
- [ ] Core Web Vitals показатели
- [ ] Оптимизация изображений
- [ ] Размер бандла в пределах нормы

### Автоматизированное тестирование

```bash
# Запуск всех проверок качества
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run format:check  # Prettier
npm run build         # Тест сборки
```

## 🚀 Деплой

### Сборка для продакшена

```bash
# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

### Автоматизированный деплой

```bash
# Сборка и деплой на GitHub Pages
npm run auto-deploy-website
```

### Переменные окружения для продакшена

Установите эти переменные в вашей платформе деплоя:

```env
# Обязательные
NODE_ENV=production

# Опциональные
VITE_SHOW_REFRESH_BUTTON=false
VITE_GA_ID=your-analytics-id
```

### Платформы деплоя

#### GitHub Pages
```bash
npm run auto-deploy-website
```

#### Netlify
1. Подключите репозиторий к Netlify
2. Настройте команду сборки: `npm run build`
3. Укажите папку публикации: `dist`

#### Vercel
1. Подключите репозиторий к Vercel
2. Настройки по умолчанию подойдут автоматически

## ⚙️ Конфигурация

### Конфигурация сайта

**Файл**: `src/site.config.ts`

```typescript
export const siteConfig = {
  title: 'Khusan Turaev - Lead 2D & 3D Designer',
  author: 'Khusan Bakhityarovich Turaev',
  description: 'Lead 2D & 3D Graphic and Motion Designer with 8+ years of experience...',
  email: 'elguajo.96@gmail.com',
  lang: 'en-US',
  site: 'https://khusan-design.uz',
  themes: { dark: 'business', light: 'silk' },
  langs: ['en', 'ru'],
};
```

### Конфигурация меню

**Файл**: `src/config/menus.ts`

```typescript
export const getMenus = (textMap, locale) => {
  const target = locale === 'zh' ? '' : `/${locale}`;
  return [
    {
      label: textMap['all'],
      href: getHref('/'),
      isActive: path => ['/', ''].map(getHref).includes(path),
    },
    {
      label: textMap['works'],
      href: getHref('/works/'),
      isActive: checkActive('\/works\/?$'),
    },
    // ... другие пункты меню
  ];
};
```

### Конфигурация сборки

**Файл**: `astro.config.mjs`

Ключевые оптимизации:
- Terser минификация с удалением console.log
- Manual chunk splitting для лучшего кэширования
- Оптимизация изображений с Sharp
- Интеграция Service Worker
- Генерация PWA манифеста

## 📊 Мониторинг

### Мониторинг производительности
- **Core Web Vitals** - Мониторинг LCP, FID, CLS
- **Bundle Size** - Отслеживание изменений размера бандла
- **Image Optimization** - Мониторинг производительности загрузки изображений

### Мониторинг ошибок
- **Error Boundaries** - Перехват ошибок React компонентов
- **Global Error Handler** - Логирование ошибок приложения
- **Image Load Errors** - Отслеживание неудачных загрузок изображений

## 🔧 Частые проблемы

### Ошибки сборки
```bash
# Очистить кэш и переустановить
rm -rf node_modules package-lock.json
npm install
```

### Ошибки TypeScript
```bash
# Проверить типы
npm run type-check

# Перезапустить TypeScript сервер в VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Проблемы с обработкой изображений
```bash
# Пересжать изображения
npm run compress-images
```

### Проблемы с линтингом
```bash
# Автоисправление проблем линтинга
npm run lint:fix
```

## 📚 Полезные команды

```bash
# Разработка
npm run dev              # Запуск dev сервера
npm run dev:debug        # Запуск с отладкой

# Качество кода
npm run lint             # Запуск ESLint
npm run lint:fix         # Исправление ошибок ESLint
npm run format           # Форматирование с Prettier
npm run format:check     # Проверка форматирования
npm run type-check       # Проверка TypeScript

# Сборка
npm run build            # Сборка для продакшена
npm run preview          # Предварительный просмотр
npm run analyze          # Анализ размера бандла

# Утилиты
npm run compress-images  # Сжатие изображений
npm run auto-deploy-website # Деплой на GitHub Pages

# Мониторинг
npm run check-all        # Полная проверка качества
npm run performance      # Lighthouse аудит
npm run security         # Проверка безопасности
```

## 📚 Дополнительные ресурсы

### Документация
- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)

### Инструменты
- [Bundle Analyzer](https://www.npmjs.com/package/vite-bundle-analyzer)
- [Web Vitals](https://www.npmjs.com/package/web-vitals)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Удачной разработки! 🚀**