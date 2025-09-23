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
className="hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0"
```

**Должно стать (видимо):**
```tsx
className="bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0"
```

### Как снова скрыть кнопку

Добавьте класс `hidden` в начало строки с `className`:

```tsx
className="hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0"
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
}
```

2. Импортируйте и используйте в компоненте:
```tsx
import { siteConfig } from '@/site.config';

// В JSX:
{!isOpen && siteConfig.showRefreshButton && <Button ... />}
```

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
