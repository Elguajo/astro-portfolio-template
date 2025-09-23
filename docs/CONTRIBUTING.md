# 🤝 Contributing Guide

Thank you for your interest in contributing to the Design Photography Portfolio project! This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. Please:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **npm or yarn** - Package manager
- **Code editor** - VS Code recommended with extensions:
  - Astro
  - TypeScript
  - ESLint
  - Prettier

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/DesignPhotographyPortfolio.git
   cd DesignPhotographyPortfolio
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/DesignPhotographyPortfolio.git
   ```

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Git Hooks

```bash
npm run prepare
```

This sets up pre-commit hooks for code quality checks.

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see the site.

### 4. Verify Setup

Run the following commands to ensure everything is working:

```bash
# Check code quality
npm run lint

# Check TypeScript types
npm run type-check

# Format code
npm run format

# Build the project
npm run build
```

## 🔄 Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

**Branch naming conventions:**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions

### 2. Make Your Changes

Follow the [coding standards](#coding-standards) and make your changes.

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Fix any linting issues
npm run lint:fix

# Check types
npm run type-check

# Format code
npm run format

# Build to ensure no errors
npm run build

# Preview the build
npm run preview
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new portfolio filtering feature"
```

**Commit message format:**
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `build` - Build system changes

**Examples:**
```bash
feat(components): add image lazy loading
fix(images): resolve WebP conversion issue
docs(readme): update installation instructions
refactor(utils): improve error handling
```

## 📤 Pull Request Process

### 1. Update Your Branch

Before submitting a PR, make sure your branch is up to date:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout your-branch
git rebase main
```

### 2. Push Your Changes

```bash
git push origin your-branch
```

### 3. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Fill out the PR template
4. Request review from maintainers

### 4. PR Requirements

Your PR should:

- ✅ Pass all CI checks
- ✅ Have a clear description
- ✅ Include tests if applicable
- ✅ Update documentation if needed
- ✅ Follow coding standards
- ✅ Be focused on a single change

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details**:
   - OS and version
   - Node.js version
   - Browser and version
5. **Screenshots** if applicable
6. **Error messages** or console logs

### Requesting Features

For feature requests, please include:

1. **Clear description** of the feature
2. **Use case** and motivation
3. **Proposed solution** (if you have one)
4. **Alternatives considered**
5. **Additional context**

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict type checking

```typescript
// Good
interface UserProps {
  name: string;
  email: string;
  age?: number;
}

// Bad
const user: any = { name: "John" };
```

### React Components

- Use functional components with hooks
- Define proper prop types
- Use meaningful component names
- Keep components focused and small

```typescript
// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Astro Components

- Use Astro for static content and layouts
- Keep client-side JavaScript minimal
- Use proper hydration directives

```astro
---
// Component script
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="card">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### CSS and Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic class names
- Avoid custom CSS when possible

```html
<!-- Good -->
<div class="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-gray-900">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Title</h1>
</div>

<!-- Bad -->
<div class="my-custom-container">
  <h1 class="my-custom-title">Title</h1>
</div>
```

### File Organization

- Use kebab-case for file names
- Group related files in directories
- Use index files for clean imports
- Keep components under 200 lines

```
components/
├── common/
│   ├── Button.tsx
│   ├── Image.tsx
│   └── index.ts
├── portfolio/
│   ├── PortfolioGrid.tsx
│   └── PortfolioItem.tsx
└── layout/
    ├── Header.astro
    └── Footer.astro
```

## 🧪 Testing

### Manual Testing

Before submitting changes, manually test:

1. **Responsive design** on different screen sizes
2. **Dark/light theme** switching
3. **Image loading** and optimization
4. **Navigation** between pages
5. **Performance** with browser dev tools

### Automated Testing

```bash
# Run linting
npm run lint

# Check types
npm run type-check

# Format check
npm run format:check

# Build test
npm run build
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props and usage
- Include examples in component documentation

```typescript
/**
 * Optimizes and processes portfolio images
 * @param images - Array of image objects
 * @param options - Processing options
 * @returns Promise resolving to optimized images
 */
export async function optimizeImages(
  images: ImageData[],
  options: OptimizationOptions
): Promise<OptimizedImage[]> {
  // Implementation
}
```

### README Updates

When adding features, update relevant documentation:

- Main README.md
- Component-specific documentation
- API documentation
- Architecture documentation

## 🔍 Code Review Process

### For Contributors

- Respond to review feedback promptly
- Make requested changes in new commits
- Keep PRs focused and small
- Test changes thoroughly

### For Reviewers

- Be constructive and helpful
- Focus on code quality and maintainability
- Check for security issues
- Ensure tests are adequate

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

If you need help:

1. Check existing [issues](https://github.com/ORIGINAL_OWNER/DesignPhotographyPortfolio/issues)
2. Read the [documentation](./README.md)
3. Join our community discussions
4. Create a new issue with the "question" label

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the Design Photography Portfolio project! 🎨✨
