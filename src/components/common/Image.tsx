import React, { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { Skeleton } from '@heroui/react';
import { logError, createError, errorCodes } from '@/lib/errorHandler';
import { useImageLazyLoading } from '@/lib/useIntersectionObserver';
import { preloadImageFormats } from '@/lib/imagePreloader';

interface ImageProps {
  src: string;
  alt?: string;
  classNames?: {
    skeleton?: string;
    img?: string;
  };
  onClick?: () => void;
  imageInfo: {
    width: number;
    height: number;
  };
  workTitle?: string;
  lazy?: boolean; // Enable/disable lazy loading
  preloadOnHover?: boolean; // Enable preload on hover
  [key: string]: any;
}

export default React.memo(function ({
  src,
  alt,
  classNames = {},
  onClick,
  imageInfo,
  workTitle,
  lazy = true,
  preloadOnHover = false,
  ...props
}: ImageProps) {
  const [isLoad, setIsLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Lazy loading with Intersection Observer
  const { ref, hasIntersected } = useImageLazyLoading({
    skip: !lazy,
  });
  
  useEffect(() => setMounted(true), []);
  
  // Memoize aspect ratio calculation
  const radio = useMemo(() => 
    Math.round((imageInfo.width / imageInfo.height) * 100) / 100,
    [imageInfo.width, imageInfo.height]
  );

  // Memoize alt text generation
  const altText = useMemo(() => {
    if (alt) return alt;

    const imageName = src.split('/').pop();
    const workName = workTitle || src.split('/').slice(-2, -1)[0];

    if (imageName === 'main') {
      return `${workName} - Main portfolio image`;
    }

    return `${workName} - Portfolio work image ${imageName}`;
  }, [alt, src, workTitle]);

  // Preload on hover
  const handleMouseEnter = useCallback(() => {
    if (preloadOnHover && !isLoad) {
      preloadImageFormats(src, { priority: 'high' });
    }
  }, [preloadOnHover, src, isLoad]);

  // Memoize event handlers
  const handleImageLoad = useCallback(() => {
    setIsLoad(true);
    setHasError(false);
  }, []);

  // Handle image load error with retry mechanism
  const handleImageError = useCallback(() => {
    const error = createError(
      `Failed to load image: ${src}`,
      'IMAGE_LOAD_FAILED',
      404
    );
    
    logError(error, {
      src,
      retryCount,
      workTitle,
      imageInfo,
    });
    
    setHasError(true);
    setIsLoad(false);
    
    // Retry up to 3 times with exponential backoff
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasError(false);
        // Force re-render by updating the key
      }, delay);
    }
  }, [src, retryCount, workTitle, imageInfo]);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
    setIsLoad(false);
    setRetryCount(0);
  }, [src]);
  // Show error state after all retries failed
  if (hasError && retryCount >= 3) {
    return (
      <div
        className={clsx(
          'w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600',
          classNames.skeleton
        )}
        style={{ aspectRatio: radio }}
      >
        <div className="text-center p-4">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Image unavailable
          </p>
        </div>
      </div>
    );
  }

  // Determine if we should render the image
  const shouldRenderImage = !lazy || hasIntersected;

  return (
    <Skeleton
      ref={ref}
      classNames={{
        base: clsx([
          'w-full text-white/0',
          !isLoad &&
            'animate-[pulse_1s_ease-in-out_infinite] bg-[#f6f9f0] dark:bg-[#222] transform-gpu',
          !isLoad && !radio && 'h-[40dvh]',
          classNames.skeleton,
        ]),
      }}
      isLoaded={isLoad}
      style={{ aspectRatio: radio }}
      onMouseEnter={handleMouseEnter}
    >
      {mounted && shouldRenderImage && (
        <picture className="">
          <source srcSet={`${src}.avif`} type="image/avif" />
          <source srcSet={`${src}.webp`} type="image/webp" />
          <img
            onContextMenu={e => e.preventDefault()}
            key={`${src}-${retryCount}`} // Force re-render on retry
            loading={lazy ? "lazy" : "eager"}
            className={clsx('w-full', classNames.img)}
            onClick={onClick}
            src={`${src}.webp`}
            alt={altText}
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...props}
          />
        </picture>
      )}
    </Skeleton>
  );
});
