# 🛠️ Development Guide

Полное руководство по разработке, настройке окружения, правилам контрибуции и деплою проекта Design Photography Portfolio.

## 📋 Содержание

- [Настройка окружения](#настройка-окружения)
- [Workflow разработки](#workflow-разработки)
- [Правила контрибуции](#правила-контрибуции)
- [Качество кода](#качество-кода)
- [Тестирование](#тестирование)
- [Деплой](#деплой)
- [Troubleshooting](#troubleshooting)

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
className =
  'hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
```

**Должно стать (видимо):**

```tsx
className =
  'bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0';
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

### Структура проекта

```
src/
├── components/           # Компоненты
│   ├── common/          # Общие компоненты
│   │   ├── Image.tsx    # Компонент изображения
│   │   ├── Header.astro # Шапка сайта
│   │   └── ErrorBoundary.tsx # Обработка ошибок
│   ├── index/           # Компоненты главной страницы
│   │   └── AllImageGrid.tsx # Сетка всех изображений
│   ├── pages/           # Компоненты страниц
│   └── works/           # Компоненты портфолио
├── data/                # Данные
│   ├── pages/           # Markdown страницы
│   └── works/           # Данные портфолио
├── i18n/                # Интернационализация
├── layouts/             # Макеты страниц
├── lib/                 # Утилиты
│   ├── errorHandler.ts  # Обработка ошибок
│   ├── getWorks.ts      # Получение данных работ
│   ├── performance.ts   # Мониторинг производительности
│   ├── useIntersectionObserver.ts # Lazy loading
│   └── imagePreloader.ts # Preloading изображений
├── pages/               # Страницы Astro
│   ├── en/              # Английские страницы
│   ├── ru/              # Русские страницы
│   └── [work_id].astro  # Динамические страницы работ
└── styles/              # Стили
    ├── global.css       # Глобальные стили
    └── animate.css      # Анимации
```

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

### Шаблон Pull Request

```markdown
## Описание

Краткое описание изменений

## Тип изменений

- [ ] Исправление бага
- [ ] Новая функциональность
- [ ] Breaking change
- [ ] Обновление документации

## Чеклист

- [ ] Код соответствует стандартам проекта
- [ ] Добавлены тесты для новой функциональности
- [ ] Обновлена документация
- [ ] Все тесты проходят
- [ ] Проверено на разных браузерах

## Скриншоты (если применимо)

Добавьте скриншоты для визуальных изменений

## Дополнительная информация

Любая дополнительная информация для ревьюеров
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

## 📊 Мониторинг

### Мониторинг производительности

- **Core Web Vitals** - Мониторинг LCP, FID, CLS
- **Bundle Size** - Отслеживание изменений размера бандла
- **Image Optimization** - Мониторинг производительности загрузки изображений

### Мониторинг ошибок

- **Error Boundaries** - Перехват ошибок React компонентов
- **Global Error Handler** - Логирование ошибок приложения
- **Image Load Errors** - Отслеживание неудачных загрузок изображений

## 🔧 Troubleshooting

### Частые проблемы

#### Ошибки сборки

```bash
# Очистить кэш и переустановить
rm -rf node_modules package-lock.json
npm install
```

#### Ошибки TypeScript

```bash
# Проверить типы
npm run type-check

# Перезапустить TypeScript сервер в VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### Проблемы с обработкой изображений

```bash
# Пересжать изображения
npm run compress-images
```

#### Проблемы с линтингом

```bash
# Автоисправление проблем линтинга
npm run lint:fix
```

### Полезные команды

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
```

## 📚 Дополнительные ресурсы

- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://reactjs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)

---

**Удачной разработки! 🚀**
