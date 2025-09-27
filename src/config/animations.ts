/**
 * Animation configuration for page transitions
 */

export interface AnimationConfig {
  type: 'slide' | 'fade' | 'scale' | 'flip' | 'rotate' | 'bounce' | 'custom';
  duration: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier';
  delay?: string;
}

export interface PageTransitionConfig {
  default: AnimationConfig;
  pages: {
    [key: string]: AnimationConfig;
  };
  mobile: AnimationConfig;
  reducedMotion: AnimationConfig;
}

/**
 * Default animation configurations
 */
export const animationConfigs: PageTransitionConfig = {
  default: {
    type: 'fade',
    duration: '0.3s',
    easing: 'ease-out',
  },
  pages: {
    // Home page - smooth fade
    '/': {
      type: 'fade',
      duration: '0.3s',
      easing: 'ease-out',
    },
    // Works page - fade
    '/works/': {
      type: 'fade',
      duration: '0.3s',
      easing: 'ease-out',
    },
    // About page - fade
    '/about/': {
      type: 'fade',
      duration: '0.3s',
      easing: 'ease-out',
    },
    // Individual work pages - fade
    '/[work_id]': {
      type: 'fade',
      duration: '0.3s',
      easing: 'ease-out',
    },
    // Blog pages - fade
    '/blog': {
      type: 'fade',
      duration: '0.3s',
      easing: 'ease-out',
    },
  },
  mobile: {
    type: 'fade',
    duration: '0.3s',
    easing: 'ease-out',
  },
  reducedMotion: {
    type: 'fade',
    duration: '0.1s',
    easing: 'linear',
  },
};

/**
 * Get animation config for a specific page
 */
export function getAnimationConfig(pathname: string, isMobile: boolean = false, prefersReducedMotion: boolean = false): AnimationConfig {
  // Check for reduced motion preference
  if (prefersReducedMotion) {
    return animationConfigs.reducedMotion;
  }

  // Check for mobile
  if (isMobile) {
    return animationConfigs.mobile;
  }

  // Check for specific page configs
  for (const [pattern, config] of Object.entries(animationConfigs.pages)) {
    if (pattern === pathname || (pattern.includes('[') && new RegExp(pattern.replace(/\[.*?\]/g, '[^/]+')).test(pathname))) {
      return config;
    }
  }

  // Return default config
  return animationConfigs.default;
}

/**
 * Generate CSS class for animation
 */
export function getAnimationClass(config: AnimationConfig): string {
  const { type, direction } = config;
  
  switch (type) {
    case 'slide':
      return `animate-page-slide-${direction || 'left'}`;
    case 'fade':
      return 'animate-page-fade-in';
    case 'scale':
      return 'animate-page-scale';
    case 'flip':
      return 'animate-page-flip';
    case 'rotate':
      return 'animate-page-rotate';
    case 'bounce':
      return 'animate-page-bounce';
    default:
      return 'animate-page-fade-in';
  }
}

/**
 * Generate transition object for Astro
 */
export function getTransitionConfig(config: AnimationConfig) {
  const { type, duration, direction, easing } = config;
  
  switch (type) {
    case 'slide':
      return {
        name: 'astro-slide',
        duration: duration,
        easing: easing,
        old: {
          name: 'astro-slide-out',
          duration: duration,
          easing: easing,
        },
        new: {
          name: 'astro-slide-in',
          duration: duration,
          easing: easing,
        },
      };
    case 'fade':
      return {
        name: 'astro-fade',
        duration: duration,
        easing: easing,
        old: {
          name: 'astro-fade-out',
          duration: duration,
          easing: easing,
        },
        new: {
          name: 'astro-fade-in',
          duration: duration,
          easing: easing,
        },
      };
    case 'scale':
      return {
        name: 'astro-scale',
        duration: duration,
        easing: easing,
        old: {
          name: 'astro-scale-out',
          duration: duration,
          easing: easing,
        },
        new: {
          name: 'astro-scale-in',
          duration: duration,
          easing: easing,
        },
      };
    default:
      return {
        name: 'astro-fade',
        duration: '0.4s',
        easing: 'ease-in-out',
      };
  }
}

/**
 * Animation presets for quick setup
 */
export const animationPresets = {
  // Smooth and professional
  smooth: {
    type: 'fade' as const,
    duration: '0.3s',
    easing: 'ease-out' as const,
  },
  
  // Dynamic and engaging
  dynamic: {
    type: 'slide' as const,
    duration: '0.4s',
    direction: 'left' as const,
    easing: 'ease-in-out' as const,
  },
  
  // Playful and fun
  playful: {
    type: 'bounce' as const,
    duration: '0.6s',
    easing: 'ease-out' as const,
  },
  
  // Minimal and clean
  minimal: {
    type: 'fade' as const,
    duration: '0.2s',
    easing: 'linear' as const,
  },
  
  // Dramatic and bold
  dramatic: {
    type: 'flip' as const,
    duration: '0.8s',
    easing: 'ease-in-out' as const,
  },
} as const;
