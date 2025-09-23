import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

/**
 * Custom hook for Intersection Observer API
 * Provides lazy loading capabilities for images and other elements
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  skip = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (skip || !ref.current) return;

    const element = ref.current;
    let observer: IntersectionObserver | null = null;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const isElementIntersecting = entry.isIntersecting;
          setIsIntersecting(isElementIntersecting);

          if (isElementIntersecting && !hasIntersected) {
            setHasIntersected(true);
            
            // Disconnect observer if triggerOnce is true
            if (triggerOnce && observer) {
              observer.disconnect();
            }
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
    } else {
      // Fallback for browsers without IntersectionObserver support
      setIsIntersecting(true);
      setHasIntersected(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, skip, hasIntersected]);

  return {
    ref,
    isIntersecting,
    hasIntersected,
  };
}

/**
 * Hook specifically for image lazy loading
 * Provides optimized settings for images
 */
export function useImageLazyLoading(options: {
  skip?: boolean;
  rootMargin?: string;
} = {}) {
  return useIntersectionObserver({
    threshold: 0.01, // Load as soon as 1% of image is visible
    rootMargin: options.rootMargin || '100px', // Start loading 100px before image enters viewport
    triggerOnce: true,
    skip: options.skip,
  });
}

/**
 * Hook for preloading images on hover
 * Uses Intersection Observer to detect when element is near viewport
 */
export function useHoverPreload(options: {
  skip?: boolean;
  rootMargin?: string;
} = {}) {
  return useIntersectionObserver({
    threshold: 0.1,
    rootMargin: options.rootMargin || '200px', // Start preloading 200px before element enters viewport
    triggerOnce: false, // Keep observing for hover events
    skip: options.skip,
  });
}
