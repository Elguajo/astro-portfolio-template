# 🛠️ Development Guide

This guide covers development setup, component management, and best practices for the Design Photography Portfolio project.

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Component Management](#component-management)
- [Error Handling](#error-handling)
- [Code Quality](#code-quality)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Deployment](#deployment)

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-username/DesignPhotographyPortfolio.git
cd DesignPhotographyPortfolio

# Install dependencies
npm install

# Initialize git hooks
npm run prepare

# Start development server
npm run dev
```

### VS Code Extensions

Recommended extensions for optimal development experience:

- **Astro** - Astro language support
- **TypeScript** - TypeScript support
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Auto Rename Tag** - HTML tag management
- **Bracket Pair Colorizer** - Code readability

### Environment Configuration

Create a `.env` file for local development:

```env
# Development settings
NODE_ENV=development
VITE_SHOW_REFRESH_BUTTON=true

# Analytics (optional)
VITE_GA_ID=your-google-analytics-id

# Comments (optional)
VITE_GISCUS_REPO=your-repo
VITE_GISCUS_REPO_ID=your-repo-id
VITE_GISCUS_CATEGORY_ID=your-category-id
```

## 🧩 Component Management

### Управление кнопкой обновления

### Текущее состояние

Кнопка обновления на главной странице портфолио **скрыта** по умолчанию.

### Как включить кнопку обновления

1. Откройте файл `src/components/index/AllImageGrid.tsx`
2. Найдите строку 34 с классом `className`
3. Удалите класс `hidden` из строки:

**Было (скрыто):**

```tsx
className =
  'hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

**Должно стать (видимо):**

```tsx
className =
  'bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

### Как снова скрыть кнопку

Добавьте класс `hidden` в начало строки с `className`:

```tsx
className =
  'hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

### Функциональность кнопки

- **Расположение**: Фиксированная кнопка внизу экрана по центру
- **Функция**: Перемешивает порядок изображений в портфолио
- **Анимация**: Поворачивается на 720° при нажатии
- **Видимость**: Скрывается при открытии модального окна с изображением

### Альтернативные способы управления

#### Через переменную окружения (рекомендуется для продакшена)

1. Добавьте в `.env` файл:

```
VITE_SHOW_REFRESH_BUTTON=false
```

2. Измените код в `AllImageGrid.tsx`:

```tsx
const showRefreshButton = import.meta.env.VITE_SHOW_REFRESH_BUTTON !== 'false';

// В JSX:
{!isOpen && showRefreshButton && <Button ... />}
```

#### Через конфигурационный файл

1. Добавьте в `src/site.config.ts`:

```ts
export const siteConfig = {
  // ... существующие настройки
  showRefreshButton: false, // изменить на true для включения
};
```

2. Импортируйте и используйте в компоненте:

```tsx
import { siteConfig } from '@/site.config';

// В JSX:
{!isOpen && siteConfig.showRefreshButton && <Button ... />}
```

## Доступность (Accessibility)

### Alt-тексты для изображений

Все изображения в проекте теперь имеют alt-тексты для улучшения доступности:

- **Автоматическая генерация**: Компонент `Image.tsx` автоматически генерирует осмысленные alt-тексты
- **Ручное указание**: Можно передать кастомный alt-текст через пропс `alt`
- **Контекстная информация**: Alt-тексты включают название работы и тип изображения

**Примеры alt-текстов:**

- `"6d-k - Main portfolio image"` - для главного изображения работы
- `"by702 - Portfolio work image 3"` - для дополнительных изображений
- `"HDUD Logo"` - для логотипа в шапке

### Улучшения доступности

- ✅ Alt-тексты для всех изображений
- ✅ Семантическая HTML разметка
- ✅ Поддержка клавиатурной навигации
- ✅ Контрастные цвета для текста

## Обработка ошибок

### Error Boundaries

Проект использует React Error Boundaries для graceful обработки ошибок:

**Компоненты:**
- `ErrorBoundary.tsx` - основной класс-компонент для обработки ошибок
- `ErrorBoundaryWrapper.tsx` - функциональная обертка для удобства использования

**Функциональность:**
- Автоматическое перехватывание ошибок в React компонентах
- Показ fallback UI вместо белого экрана
- Логирование ошибок в консоль (в режиме разработки)
- Кнопка "Try again" для восстановления

### Обработка ошибок изображений

**Компонент Image.tsx:**
- Автоматический retry механизм (до 3 попыток)
- Exponential backoff (1s, 2s, 4s задержки)
- Fallback UI для недоступных изображений
- Логирование ошибок загрузки

**Обработка ошибок данных:**
- Graceful обработка отсутствующих работ
- Возврат пустого массива вместо crash
- Предупреждения в консоль для отладки

### Примеры использования

```tsx
// Оборачивание компонента в ErrorBoundary
<ErrorBoundaryWrapper
  fallback={<div>Custom error message</div>}
  onError={(error, errorInfo) => {
    // Custom error handling
    console.error('Custom error:', error);
  }}
>
  <YourComponent />
</ErrorBoundaryWrapper>
```

## Качество кода

### ESLint и Prettier

Проект настроен с ESLint и Prettier для поддержания высокого качества кода:

**ESLint правила:**
- TypeScript поддержка
- Astro файлы поддержка
- Предотвращение неиспользуемых переменных
- Запрет console.log в продакшене
- Строгие правила для TypeScript

**Prettier настройки:**
- Автоматическое форматирование кода
- Поддержка Astro файлов
- Единообразный стиль кода

**Команды:**
```bash
# Проверка кода на ошибки
npm run lint

# Автоматическое исправление ошибок ESLint
npm run lint:fix

# Форматирование кода
npm run format

# Проверка форматирования
npm run format:check

# Проверка типов TypeScript
npm run type-check
```

**Игнорируемые файлы:**
- `dist/` - собранные файлы
- `node_modules/` - зависимости
- `.astro/` - временные файлы Astro
- `public/` - статические файлы

## Другие настройки разработки

### Сжатие изображений

```bash
npm run compress-images
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр сборки

```bash
npm run preview
```

## Структура проекта

- `src/components/index/AllImageGrid.tsx` - Главная сетка портфолио с кнопкой обновления
- `src/components/common/Image.tsx` - Компонент изображения с ленивой загрузкой
- `src/data/works/` - Данные о работах в формате Markdown
- `public/images/works/` - Изображения портфолио (сжатые)
- `src/i18n/` - Файлы интернационализации

## 🛡️ Error Handling

### Error Boundary System

The project uses a comprehensive error handling system:

```typescript
// Wrap components in ErrorBoundary
<ErrorBoundaryWrapper
  fallback={<div>Custom error message</div>}
  onError={(error, errorInfo) => {
    console.error('Custom error:', error);
  }}
>
  <YourComponent />
</ErrorBoundaryWrapper>
```

### Global Error Handler

```typescript
// Use centralized error handling
import { handleAsyncError, createError } from '@/lib/errorHandler';

const data = await handleAsyncError(
  async () => {
    // Your async operation
    return await fetchData();
  },
  [], // fallback value
  'Failed to fetch data'
);
```

### Image Error Handling

The `Image` component includes:
- Automatic retry mechanism (up to 3 attempts)
- Exponential backoff delays
- Fallback UI for failed loads
- Structured error logging

## 🧪 Code Quality

### ESLint Configuration

The project uses strict ESLint rules:

```javascript
// Key rules
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/prefer-nullish-coalescing': 'error',
'@typescript-eslint/prefer-optional-chain': 'error',
'no-console': 'error', // In production
'no-debugger': 'error',
'prefer-const': 'error',
'no-var': 'error',
```

### Pre-commit Hooks

Automated code quality checks:

```json
{
  "lint-staged": {
    "*.{js,ts,tsx,astro}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

### TypeScript Configuration

Strict TypeScript settings:

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

## ⚡ Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Check bundle composition
npm run size-check
```

### Image Optimization

```bash
# Compress and optimize images
npm run compress-images
```

This script:
- Converts images to WebP and AVIF formats
- Generates multiple sizes for responsive design
- Creates blur placeholders
- Updates image metadata

### Build Optimizations

The build process includes:
- Manual chunk splitting for better caching
- Terser minification with console.log removal
- Tree shaking for unused code elimination
- Asset optimization

## 🧪 Testing

### Manual Testing Checklist

Before deploying, test:

- [ ] **Responsive Design**
  - [ ] Mobile (320px - 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (1024px+)

- [ ] **Theme Switching**
  - [ ] Light mode functionality
  - [ ] Dark mode functionality
  - [ ] Theme persistence

- [ ] **Image Loading**
  - [ ] Lazy loading works
  - [ ] Error handling for failed loads
  - [ ] Retry mechanism functions

- [ ] **Navigation**
  - [ ] All internal links work
  - [ ] Back/forward navigation
  - [ ] Mobile menu functionality

- [ ] **Performance**
  - [ ] Core Web Vitals scores
  - [ ] Image optimization
  - [ ] Bundle size within limits

### Automated Testing

```bash
# Run all quality checks
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run format:check  # Prettier
npm run build         # Build test
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Automated Deployment

```bash
# Build and deploy to GitHub Pages
npm run auto-deploy-website
```

### Environment Variables

Set these in your deployment platform:

```env
# Required
NODE_ENV=production

# Optional
VITE_SHOW_REFRESH_BUTTON=false
VITE_GA_ID=your-analytics-id
```

## 📊 Monitoring

### Performance Monitoring

- **Core Web Vitals** - Monitor LCP, FID, CLS
- **Bundle Size** - Track bundle size changes
- **Image Optimization** - Monitor image loading performance

### Error Monitoring

- **Error Boundaries** - Catch React component errors
- **Global Error Handler** - Log application errors
- **Image Load Errors** - Track failed image loads

## 🔧 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**
```bash
# Check types
npm run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**Image Processing Issues:**
```bash
# Recompress images
npm run compress-images
```

**Linting Issues:**
```bash
# Auto-fix linting issues
npm run lint:fix
```

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:debug        # Start with debugging

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript check

# Building
npm run build            # Build for production
npm run preview          # Preview build
npm run analyze          # Analyze bundle size

# Utilities
npm run compress-images  # Compress images
npm run auto-deploy-website # Deploy to GitHub Pages
```

## 🔗 Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)
