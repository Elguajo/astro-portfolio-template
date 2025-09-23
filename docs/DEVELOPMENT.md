# Development Guide

## Управление кнопкой обновления

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

## Полезные команды

```bash
# Проверка линтера
npm run lint

# Форматирование кода
npm run format

# Проверка типов TypeScript
npm run type-check
```
