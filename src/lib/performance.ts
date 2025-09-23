// Performance monitoring utilities
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Web Vitals measurement
export function measureWebVitals(onPerfEntry?: (metrics: PerformanceMetrics) => void) {
  if (typeof window === 'undefined' || !onPerfEntry) {
    return;
  }

  // Import web-vitals dynamically to avoid bundle bloat
  import('web-vitals').then((webVitals: any) => {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }).catch((error) => {
    console.warn('Failed to load web-vitals:', error);
  });
}

// Performance observer for custom metrics
export function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Observe navigation timing
  const navObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        console.log('Navigation timing:', {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
        });
      }
    }
  });

  try {
    navObserver.observe({ entryTypes: ['navigation'] });
  } catch (error) {
    console.warn('Performance observer not supported:', error);
  }

  // Observe resource timing
  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        // Log slow resources (>1s)
        if (resourceEntry.duration > 1000) {
          console.warn('Slow resource detected:', {
            name: resourceEntry.name,
            duration: resourceEntry.duration,
            size: resourceEntry.transferSize,
          });
        }
      }
    }
  });

  try {
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Resource observer not supported:', error);
  }
}

// Image loading performance
export function measureImageLoadTime(src: string): Promise<number> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    
    img.onerror = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    
    img.src = src;
  });
}

// Lazy loading performance tracking
export function trackLazyLoading() {
  if (typeof window === 'undefined') return;

  // Track Intersection Observer usage
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log('Lazy loading metric:', {
          name: entry.name,
          duration: entry.duration,
        });
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['measure'] });
  } catch (error) {
    console.warn('Performance observer for lazy loading not supported:', error);
  }

  // Track image loading performance
  const imageObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource' && entry.name.includes('.webp')) {
        console.log('Image load performance:', {
          name: entry.name,
          duration: entry.duration,
          size: (entry as PerformanceResourceTiming).transferSize,
          startTime: entry.startTime,
        });
      }
    }
  });

  try {
    imageObserver.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Image performance observer not supported:', error);
  }
}

// Bundle size monitoring
export function logBundleSize() {
  if (typeof window === 'undefined') return;

  // Log total JS size
  const scripts = document.querySelectorAll('script[src]');
  let totalJSSize = 0;
  
  scripts.forEach((script) => {
    const src = (script as HTMLScriptElement).src;
    if (src && src.includes('assets/')) {
      // This is a rough estimate - actual size would need to be fetched
      console.log('JS bundle detected:', src);
    }
  });

  // Log total CSS size
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((link) => {
    const href = (link as HTMLLinkElement).href;
    if (href && href.includes('assets/')) {
      console.log('CSS bundle detected:', href);
    }
  });
}

// Memory usage monitoring (development only)
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return;
  }

  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB',
    });
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Measure Web Vitals
  measureWebVitals((metrics) => {
    console.log('Web Vitals:', metrics);
    
    // Send to analytics service if needed
    // analytics.track('web-vitals', metrics);
  });

  // Observe performance
  observePerformance();

  // Track lazy loading performance
  trackLazyLoading();

  // Log bundle sizes
  logBundleSize();

  // Monitor memory usage in development
  monitorMemoryUsage();

  // Log performance summary after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('Performance summary:', {
        readyState: document.readyState,
        loadTime: performance.now(),
        resources: performance.getEntriesByType('resource').length,
      });
    }, 1000);
  });
}
