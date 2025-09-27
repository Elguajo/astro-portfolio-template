#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting performance and quality checks...\n');

// Check if dist directory exists
const distPath = path.resolve('./dist');
if (!fs.existsSync(distPath)) {
  console.log('📦 Building project first...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Performance checks
console.log('📊 Running performance checks...');

// 1. Bundle size analysis
console.log('📦 Analyzing bundle size...');
try {
  execSync('npx vite-bundle-analyzer dist --mode static', { stdio: 'inherit' });
  console.log('✅ Bundle analysis completed');
} catch (_error) {
  console.warn('⚠️ Bundle analysis failed:', _error.message);
}

// 2. Lighthouse audit (if server is running)
console.log('🔍 Running Lighthouse audit...');
try {
  // Check if localhost:4321 is accessible
  execSync('curl -s http://localhost:4321 > /dev/null', { stdio: 'pipe' });
  execSync(
    'npx lighthouse http://localhost:4321 --output=html --output-path=./lighthouse-report.html --quiet',
    { stdio: 'inherit' }
  );
  console.log(
    '✅ Lighthouse audit completed - report saved to lighthouse-report.html'
  );
} catch (_error) {
  console.warn(
    '⚠️ Lighthouse audit skipped - make sure to run "npm run preview" first'
  );
}

// 3. Security audit
console.log('🔒 Running security audit...');
try {
  execSync('npm audit --audit-level=moderate', { stdio: 'inherit' });
  console.log('✅ Security audit completed');
} catch (_error) {
  console.warn('⚠️ Security issues found - run "npm audit fix" to resolve');
}

// 4. Type checking
console.log('🔍 Running TypeScript checks...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ TypeScript checks passed');
} catch (_error) {
  console.error('❌ TypeScript errors found');
}

// 5. Linting
console.log('🧹 Running ESLint...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ ESLint checks passed');
} catch (_error) {
  console.warn('⚠️ ESLint issues found - run "npm run lint:fix" to auto-fix');
}

// 6. Formatting check
console.log('💅 Checking code formatting...');
try {
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('✅ Code formatting is correct');
} catch (_error) {
  console.warn('⚠️ Formatting issues found - run "npm run format" to fix');
}

// 7. File size analysis
console.log('📏 Analyzing file sizes...');
const analyzeFileSizes = (dir, maxSize = 1024 * 1024) => {
  // 1MB default
  const files = fs.readdirSync(dir);
  let totalSize = 0;
  const largeFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const subAnalysis = analyzeFileSizes(filePath, maxSize);
      totalSize += subAnalysis.totalSize;
      largeFiles.push(...subAnalysis.largeFiles);
    } else {
      totalSize += stat.size;
      if (stat.size > maxSize) {
        largeFiles.push({
          path: filePath.replace(process.cwd(), '.'),
          size: (stat.size / 1024 / 1024).toFixed(2) + ' MB',
        });
      }
    }
  });

  return { totalSize, largeFiles };
};

const analysis = analyzeFileSizes(distPath);
console.log(
  `📊 Total build size: ${(analysis.totalSize / 1024 / 1024).toFixed(2)} MB`
);

if (analysis.largeFiles.length > 0) {
  console.log('⚠️ Large files detected:');
  analysis.largeFiles.forEach(file => {
    console.log(`  - ${file.path}: ${file.size}`);
  });
} else {
  console.log('✅ No excessively large files found');
}

// 8. Image optimization check
console.log('🖼️ Checking image optimization...');
const imageExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
];
const checkImages = dir => {
  const files = fs.readdirSync(dir);
  const unoptimizedImages = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      unoptimizedImages.push(...checkImages(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (
        imageExtensions.includes(ext) &&
        !file.includes('.webp') &&
        !file.includes('.avif')
      ) {
        unoptimizedImages.push(filePath.replace(process.cwd(), '.'));
      }
    }
  });

  return unoptimizedImages;
};

const unoptimizedImages = checkImages(distPath);
if (unoptimizedImages.length > 0) {
  console.log('⚠️ Unoptimized images found:');
  unoptimizedImages.forEach(image => {
    console.log(`  - ${image}`);
  });
  console.log(
    '💡 Consider running "npm run compress-images" to optimize images'
  );
} else {
  console.log('✅ All images appear to be optimized');
}

console.log('\n🎉 Performance and quality checks completed!');
console.log('\n📋 Summary:');
console.log('  - Run "npm run check-all" for comprehensive checks');
console.log('  - Run "npm run fix-all" to auto-fix issues');
console.log(
  '  - Check lighthouse-report.html for detailed performance metrics'
);
console.log('  - Monitor bundle sizes and optimize large files');
