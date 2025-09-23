import React, { useEffect, useRef } from 'react';
import { useHoverPreload } from '@/lib/useIntersectionObserver';
import { preloadImageFormats } from '@/lib/imagePreloader';

interface ImagePreloaderProps {
  src: string;
  children: React.ReactNode;
  preloadDistance?: string;
  priority?: 'high' | 'low';
}

/**
 * Component that preloads images when they're about to enter viewport
 * Wraps children and triggers preload when element is near viewport
 */
export default function ImagePreloader({
  src,
  children,
  preloadDistance = '200px',
  priority = 'low',
}: ImagePreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useHoverPreload({
    rootMargin: preloadDistance,
  });

  useEffect(() => {
    if (hasIntersected && containerRef.current) {
      // Preload the image when element is near viewport
      preloadImageFormats(src, { priority });
    }
  }, [hasIntersected, src, priority]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}

/**
 * Hook for preloading images on hover
 */
export function useImageHoverPreload(src: string, priority: 'high' | 'low' = 'high') {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let isPreloaded = false;

    const handleMouseEnter = () => {
      if (!isPreloaded) {
        preloadImageFormats(src, { priority });
        isPreloaded = true;
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [src, priority]);

  return elementRef;
}
