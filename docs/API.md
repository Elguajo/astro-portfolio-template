# 📚 API Documentation

This document provides comprehensive API documentation for all components, utilities, and configuration options in the Design Photography Portfolio project.

## 📋 Table of Contents

- [Components](#components)
  - [React Components](#react-components)
  - [Astro Components](#astro-components)
- [Utilities](#utilities)
- [Configuration](#configuration)
- [Types](#types)
- [Hooks](#hooks)

## 🧩 Components

### React Components

#### `Image.tsx`

A high-performance image component with lazy loading, error handling, and automatic format optimization.

**Location:** `src/components/common/Image.tsx`

**Props:**
```typescript
interface ImageProps {
  src: string;                    // Image source path (without extension)
  alt?: string;                   // Alt text for accessibility
  classNames?: {                  // Custom CSS classes
    skeleton?: string;
    img?: string;
  };
  onClick?: () => void;           // Click handler
  imageInfo: {                    // Image dimensions
    width: number;
    height: number;
  };
  workTitle?: string;             // Work title for alt text generation
  [key: string]: any;             // Additional props
}
```

**Features:**
- Automatic WebP/AVIF format selection
- Lazy loading with Intersection Observer
- Retry mechanism (up to 3 attempts)
- Skeleton loading state
- Error fallback UI
- Automatic alt text generation

**Usage:**
```tsx
<Image
  src="/images/works/portfolio/main"
  imageInfo={{ width: 800, height: 600 }}
  workTitle="My Portfolio"
  onClick={() => openModal()}
/>
```

#### `ErrorBoundary.tsx`

React Error Boundary component for graceful error handling.

**Location:** `src/components/common/ErrorBoundary.tsx`

**Props:**
```typescript
interface Props {
  children: ReactNode;            // Child components to wrap
  fallback?: ReactNode;           // Custom fallback UI
  onError?: (error: Error, errorInfo: ErrorInfo) => void; // Error handler
}
```

**Features:**
- Catches JavaScript errors in child components
- Displays fallback UI instead of crashing
- Logs errors with context
- Provides retry functionality

**Usage:**
```tsx
<ErrorBoundary
  fallback={<div>Something went wrong</div>}
  onError={(error, errorInfo) => {
    console.error('Component error:', error);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### `AllImageGrid.tsx`

Main portfolio grid component with masonry layout and refresh functionality.

**Location:** `src/components/index/AllImageGrid.tsx`

**Props:**
```typescript
interface AppProps {
  members: Member[];              // Array of portfolio items
}

interface Member {
  name: string;                   // Image name/path
  width: number;                  // Image width
  height: number;                 // Image height
}
```

**Features:**
- Masonry grid layout
- Random image shuffling
- Modal image viewer
- Responsive design
- Refresh button (configurable)

**Usage:**
```tsx
<AllImageGrid 
  members={portfolioItems} 
  client:load 
/>
```

### Astro Components

#### `BaseLayout.astro`

Base layout component for all pages.

**Location:** `src/layouts/BaseLayout.astro`

**Props:**
```typescript
interface Props {
  title: string;                  // Page title
  description: string;            // Meta description
  author: string;                 // Author name
  email: string;                  // Author email
  local: string;                  // Locale
  ogImage: string;                // Open Graph image URL
}
```

**Features:**
- HTML document structure
- Meta tags and SEO
- Open Graph tags
- Theme configuration
- Font loading

**Usage:**
```astro
---
const props = {
  title: "Portfolio - John Doe",
  description: "Professional portfolio",
  author: "John Doe",
  email: "john@example.com",
  local: "en",
  ogImage: "/og-image.png"
};
---

<BaseLayout {...props}>
  <!-- Page content -->
</BaseLayout>
```

#### `PageLayout.astro`

Page-specific layout with navigation and footer.

**Location:** `src/layouts/PageLayout.astro`

**Props:**
```typescript
interface Props {
  title: string;                  // Page title
  description: string;            // Meta description
  author: string;                 // Author name
  email: string;                  // Author email
  local: string;                  // Locale
  ogImage: string;                // Open Graph image URL
}
```

**Features:**
- Header with navigation
- Main content area
- Footer
- Responsive design
- Theme toggle

#### `Header.astro`

Site header with navigation and theme toggle.

**Location:** `src/components/common/Header.astro`

**Features:**
- Responsive navigation
- Theme toggle button
- Language switcher
- Mobile menu
- Logo/brand display

#### `CustomFloatBtns.astro`

Floating action buttons for navigation.

**Location:** `src/components/common/CustomFloatBtns.astro`

**Props:**
```typescript
interface Button {
  type: 'top' | 'link';           // Button type
  href?: string;                  // Link URL (for link type)
  icon?: string;                  // Icon class
  label: string;                  // Button label
}

interface Props {
  btns: Button[];                 // Array of buttons
}
```

**Usage:**
```astro
<CustomFloatBtns
  btns={[
    {
      type: 'link',
      href: '/previous-work',
      icon: 'icon-[ooui--arrow-previous-ltr]',
      label: 'Previous'
    },
    {
      type: 'top',
      label: 'Back to Top'
    }
  ]}
/>
```

## 🛠️ Utilities

### `getWorks.ts`

Utility function for fetching and processing portfolio data.

**Location:** `src/lib/getWorks.ts`

**Function:**
```typescript
export const getWorks = async (): Promise<Work[]>
```

**Returns:**
```typescript
interface Work {
  id: string;                     // Work ID
  data: {
    base: string;                 // Base name
    members: ImageData;           // Image data
  };
  body?: string;                  // Markdown content
  collection: string;             // Collection name
  rendered?: RenderedContent;     // Rendered content
  filePath?: string;              // File path
}
```

**Features:**
- Fetches from Astro content collections
- Combines image info with work data
- Error handling with fallbacks
- Type-safe data processing

**Usage:**
```typescript
const works = await getWorks();
```

### `errorHandler.ts`

Centralized error handling utilities.

**Location:** `src/lib/errorHandler.ts`

**Classes:**
```typescript
class AppError extends Error {
  code: string;                   // Error code
  statusCode: number;             // HTTP status code
  isOperational: boolean;         // Operational error flag
}
```

**Functions:**
```typescript
// Create structured error
function createError(
  message: string,
  code: keyof typeof errorCodes,
  statusCode?: number
): AppError

// Log error with context
function logError(
  error: Error | AppError,
  context?: Record<string, unknown>
): void

// Handle async errors with fallback
function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  fallbackValue: T,
  errorMessage?: string
): Promise<T>

// Handle sync errors with fallback
function handleSyncError<T>(
  syncFn: () => T,
  fallbackValue: T,
  errorMessage?: string
): T
```

**Error Codes:**
```typescript
const errorCodes = {
  CONTENT_NOT_FOUND: 'CONTENT_NOT_FOUND',
  INVALID_CONTENT_FORMAT: 'INVALID_CONTENT_FORMAT',
  IMAGE_LOAD_FAILED: 'IMAGE_LOAD_FAILED',
  IMAGE_NOT_FOUND: 'IMAGE_NOT_FOUND',
  CONFIG_MISSING: 'CONFIG_MISSING',
  INVALID_CONFIG: 'INVALID_CONFIG',
  BUILD_FAILED: 'BUILD_FAILED',
  DEPLOYMENT_FAILED: 'DEPLOYMENT_FAILED',
} as const;
```

### `getScreenType.ts`

Utility for detecting screen size type.

**Location:** `src/lib/getScreenType.ts`

**Function:**
```typescript
export default function getScreenType(): string
```

**Returns:** Screen type identifier (`'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'unknown'`)

**Usage:**
```typescript
const screenType = getScreenType();
```

## ⚙️ Configuration

### Site Configuration

**Location:** `src/site.config.ts`

```typescript
export const siteConfig = {
  title: string;                  // Site title
  author: string;                 // Author name
  description: string;            // Site description
  email: string;                  // Contact email
  lang: string;                   // Default language
  site: string;                   // Site URL
  themes: {                       // Theme configuration
    dark: string;                 // Dark theme name
    light: string;                // Light theme name
  };
  langs: string[];                // Supported languages
};
```

### Content Configuration

**Location:** `src/content.config.ts`

```typescript
// Works collection
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/works' }),
  schema: z.object({
    base: z.string(),             // Base name
  }),
});

// Image info collection
const imageInfo = defineCollection({
  loader: file('src/data/imageInfo.json'),
});

// Pages collection
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/pages' }),
  schema: z.object({
    name: z.string(),             // Page name
  }),
});
```

### Astro Configuration

**Location:** `astro.config.mjs`

**Key Options:**
```javascript
export default defineConfig({
  site: string,                   // Site URL
  i18n: {                         // Internationalization
    locales: string[],            // Supported locales
    defaultLocale: string,        // Default locale
    routing: {                    // Routing configuration
      prefixDefaultLocale: boolean,
    },
  },
  vite: {                         // Vite configuration
    optimizeDeps: {               // Dependency optimization
      exclude: string[],          // Excluded dependencies
      include: string[],          // Included dependencies
    },
    build: {                      // Build configuration
      target: string,             // Build target
      minify: string,             // Minification method
      rollupOptions: {            // Rollup options
        output: {
          manualChunks: object,   // Manual chunk configuration
        },
      },
    },
  },
});
```

## 📝 Types

### Core Types

```typescript
// Image data structure
interface ImageData {
  [key: string]: [number, number]; // [width, height] pairs
}

// Portfolio member
interface Member {
  name: string;                   // Image name
  width: number;                  // Image width
  height: number;                 // Image height
}

// Work data
interface Work {
  id: string;                     // Work ID
  data: {
    base: string;                 // Base name
    members: ImageData;           // Image data
  };
  body?: string;                  // Markdown content
  collection: string;             // Collection name
  rendered?: RenderedContent;     // Rendered content
  filePath?: string;              // File path
}

// Error information
interface ErrorInfo {
  message: string;                // Error message
  stack?: string;                 // Stack trace
  componentStack?: string;        // Component stack
  timestamp: string;              // Error timestamp
  userAgent?: string;             // User agent
  url?: string;                   // Current URL
}
```

## 🎣 Hooks

### Custom Hooks

The project uses React hooks for state management and side effects:

```typescript
// Image loading state
const [isLoad, setIsLoad] = useState(false);
const [hasError, setHasError] = useState(false);
const [retryCount, setRetryCount] = useState(0);

// Component mounting
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

// Image error handling with retry
useEffect(() => {
  setHasError(false);
  setIsLoad(false);
  setRetryCount(0);
}, [src]);
```

## 🔧 Build Scripts

### Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:debug        # Start with debugging

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript check

# Utilities
npm run compress-images  # Compress images
npm run analyze          # Analyze bundle size
npm run auto-deploy-website # Deploy to GitHub Pages
```

## 📊 Performance Considerations

### Image Optimization

- Automatic WebP/AVIF conversion
- Lazy loading with Intersection Observer
- Retry mechanism for failed loads
- Skeleton loading states

### Bundle Optimization

- Manual chunk splitting
- Tree shaking
- Terser minification
- Console.log removal in production

### Caching Strategy

- Static asset caching
- Service worker for PWA
- CDN optimization
- Browser caching headers

---

This API documentation provides a comprehensive reference for all components, utilities, and configuration options in the Design Photography Portfolio project.
