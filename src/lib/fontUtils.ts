/**
 * Font utilities for optimized Google Fonts loading
 */

export interface FontConfig {
  family: string;
  weights: number[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

export interface GoogleFontsConfig {
  fonts: FontConfig[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

/**
 * Generate optimized Google Fonts URL
 */
export function generateGoogleFontsUrl(config: GoogleFontsConfig): string {
  const { fonts, display = 'swap' } = config;
  
  const fontParams = fonts.map(font => {
    const weights = font.weights.join(';');
    return `family=${font.family}:wght@${weights}`;
  }).join('&');
  
  return `https://fonts.googleapis.com/css2?${fontParams}&display=${display}`;
}

/**
 * Generate preload URLs for critical font files
 */
export function generateFontPreloadUrls(config: GoogleFontsConfig): string[] {
  const { fonts } = config;
  const urls: string[] = [];
  
  fonts.forEach(font => {
    if (font.preload !== false) {
      // For critical fonts, preload the most common weights
      const criticalWeights = font.weights.slice(0, 2); // Preload first 2 weights
      
      criticalWeights.forEach(weight => {
        const familySlug = font.family.toLowerCase().replace(/\s+/g, '');
        urls.push(`https://fonts.gstatic.com/s/${familySlug}/v${Date.now()}/subset-${weight}.woff2`);
      });
    }
  });
  
  return urls;
}

/**
 * Check if fonts are loaded
 */
export function checkFontsLoaded(fontFamilies: string[]): Promise<boolean> {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }
  
  return new Promise((resolve) => {
    if (!('fonts' in document)) {
      resolve(false);
      return;
    }
    
    const fontPromises = fontFamilies.map(family => 
      (document as any).fonts.load(`16px "${family}"`)
    );
    
    Promise.all(fontPromises).then(() => {
      resolve(true);
    }).catch(() => {
      resolve(false);
    });
  });
}

/**
 * Preload critical fonts with performance monitoring
 */
export async function preloadCriticalFonts(config: GoogleFontsConfig): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }
  
  const startTime = performance.now();
  const preloadUrls = generateFontPreloadUrls(config);
  
  try {
    const preloadPromises = preloadUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to preload font: ${url}`));
        
        document.head.appendChild(link);
      });
    });
    
    await Promise.all(preloadPromises);
    
    const loadTime = performance.now() - startTime;
    console.log(`Fonts preloaded in ${loadTime.toFixed(2)}ms`);
    
  } catch (error) {
    console.warn('Font preloading failed:', error);
  }
}

/**
 * Default font configuration for the portfolio
 */
export const defaultFontConfig: GoogleFontsConfig = {
  fonts: [
    {
      family: 'Inter',
      weights: [300, 400, 500, 600, 700],
      display: 'swap',
      preload: true,
    },
    {
      family: 'Handjet',
      weights: [200, 300],
      display: 'swap',
      preload: true,
    },
  ],
  display: 'swap',
  preload: true,
};

/**
 * Generate CSS custom properties for fonts
 */
export function generateFontCSSVariables(config: GoogleFontsConfig): string {
  const { fonts } = config;
  
  return fonts.map(font => {
    const cssVar = `--font-${font.family.toLowerCase().replace(/\s+/g, '-')}`;
    const fallback = font.family === 'Inter' 
      ? 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      : 'monospace';
    
    return `${cssVar}: "${font.family}", ${fallback};`;
  }).join('\n  ');
}
