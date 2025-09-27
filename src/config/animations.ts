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
      return `animate-page-slide-${direction ?? 'left'}`;
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
type AnimationEasing = AnimationConfig['easing'];
type TransitionDirection = NonNullable<AnimationConfig['direction']>;

const SLIDE_ANIMATION_MAP: Record<TransitionDirection, { out: string; in: string }> = {
  left: { out: 'astro-slide-left-out', in: 'astro-slide-left-in' },
  right: { out: 'astro-slide-right-out', in: 'astro-slide-right-in' },
  up: { out: 'astro-slide-up-out', in: 'astro-slide-up-in' },
  down: { out: 'astro-slide-down-out', in: 'astro-slide-down-in' },
};

function createAnimationPair(
  outName: string,
  inName: string,
  duration: string,
  easing: AnimationEasing
) {
  return {
    old: [
      {
        name: outName,
        duration,
        easing,
        fillMode: 'both',
      },
    ],
    new: [
      {
        name: inName,
        duration,
        easing,
        fillMode: 'both',
      },
    ],
  };
}

function createDirectionalTransition(
  outName: string,
  inName: string,
  duration: string,
  easing: AnimationEasing
): TransitionDirectionalAnimations {
  return {
    forwards: createAnimationPair(outName, inName, duration, easing),
    backwards: createAnimationPair(inName, outName, duration, easing),
  };
}

type TransitionAnimation = {
  name: string;
  delay?: number | string;
  duration?: number | string;
  easing?: string;
  fillMode?: string;
  direction?: string;
};

type TransitionAnimationPair = {
  old: TransitionAnimation | TransitionAnimation[];
  new: TransitionAnimation | TransitionAnimation[];
};

export type TransitionDirectionalAnimations = {
  forwards: TransitionAnimationPair;
  backwards: TransitionAnimationPair;
};

export function getTransitionConfig(config: AnimationConfig): TransitionDirectionalAnimations {
  const { type, duration, direction = 'left', easing } = config;

  switch (type) {
    case 'slide': {
      const { out, in: inName } = SLIDE_ANIMATION_MAP[direction] ?? SLIDE_ANIMATION_MAP.left;
      return createDirectionalTransition(out, inName, duration, easing);
    }
    case 'scale':
      return createDirectionalTransition('astro-scale-out', 'astro-scale-in', duration, easing);
    case 'flip':
      return createDirectionalTransition('astro-flip-out', 'astro-flip-in', duration, easing);
    case 'rotate':
      return createDirectionalTransition('astro-rotate-out', 'astro-rotate-in', duration, easing);
    case 'bounce':
      return createDirectionalTransition('astro-bounce-out', 'astro-bounce-in', duration, easing);
    case 'custom':
      return createDirectionalTransition('astro-custom-out', 'astro-custom-in', duration, easing);
    case 'fade':
    default:
      return createDirectionalTransition('astro-fade-out', 'astro-fade-in', duration, easing);
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
