# Page Transitions Guide

This document explains how to customize and configure page transitions in the DesignPhotographyPortfolio project.

## Current Implementation

The project uses Astro's built-in View Transitions API with custom animations for smooth page transitions.

### Default Configuration

- **Current animation**: Slide transition (0.4s duration)
- **Easing**: ease-in-out
- **Direction**: Left to right

## Available Animation Types

### 1. **Slide Animations**
```typescript
{
  type: 'slide',
  duration: '0.4s',
  direction: 'left' | 'right' | 'up' | 'down',
  easing: 'ease-in-out'
}
```

**Directions:**
- `left`: Slides from right to left (default)
- `right`: Slides from left to right
- `up`: Slides from bottom to top
- `down`: Slides from top to bottom

### 2. **Fade Animations**
```typescript
{
  type: 'fade',
  duration: '0.3s',
  easing: 'ease-out'
}
```

**Best for:**
- Home page transitions
- Mobile devices
- Subtle, professional feel

### 3. **Scale Animations**
```typescript
{
  type: 'scale',
  duration: '0.5s',
  easing: 'ease-out'
}
```

**Best for:**
- About pages
- Modal-like transitions
- Focused content

### 4. **Flip Animations**
```typescript
{
  type: 'flip',
  duration: '0.6s',
  easing: 'ease-in-out'
}
```

**Best for:**
- Portfolio work pages
- Dramatic transitions
- 3D effect

### 5. **Rotate Animations**
```typescript
{
  type: 'rotate',
  duration: '0.4s',
  easing: 'ease-in-out'
}
```

**Best for:**
- Creative transitions
- Playful interactions

### 6. **Bounce Animations**
```typescript
{
  type: 'bounce',
  duration: '0.6s',
  easing: 'ease-out'
}
```

**Best for:**
- Fun, engaging transitions
- Call-to-action pages

## Page-Specific Configurations

The project includes different animations for different page types:

```typescript
pages: {
  '/': {
    type: 'fade',
    duration: '0.3s',
    easing: 'ease-out',
  },
  '/works/': {
    type: 'slide',
    duration: '0.4s',
    direction: 'right',
    easing: 'ease-in-out',
  },
  '/about/': {
    type: 'scale',
    duration: '0.5s',
    easing: 'ease-out',
  },
  '/[work_id]': {
    type: 'flip',
    duration: '0.6s',
    easing: 'ease-in-out',
  },
}
```

## How to Change Animations

### Method 1: Update Configuration File

Edit `src/config/animations.ts`:

```typescript
export const animationConfigs: PageTransitionConfig = {
  default: {
    type: 'fade', // Change from 'slide' to 'fade'
    duration: '0.3s', // Change duration
    easing: 'ease-out', // Change easing
  },
  // ... rest of config
};
```

### Method 2: Change Specific Page Animation

```typescript
pages: {
  '/works/': {
    type: 'bounce', // Change to bounce animation
    duration: '0.6s',
    easing: 'ease-out',
  },
}
```

### Method 3: Use Animation Presets

```typescript
import { animationPresets } from '@/config/animations';

// Use predefined presets
const smoothConfig = animationPresets.smooth;
const dynamicConfig = animationPresets.dynamic;
const playfulConfig = animationPresets.playful;
```

## Animation Presets

### Smooth (Professional)
```typescript
{
  type: 'fade',
  duration: '0.3s',
  easing: 'ease-out'
}
```

### Dynamic (Engaging)
```typescript
{
  type: 'slide',
  duration: '0.4s',
  direction: 'left',
  easing: 'ease-in-out'
}
```

### Playful (Fun)
```typescript
{
  type: 'bounce',
  duration: '0.6s',
  easing: 'ease-out'
}
```

### Minimal (Clean)
```typescript
{
  type: 'fade',
  duration: '0.2s',
  easing: 'linear'
}
```

### Dramatic (Bold)
```typescript
{
  type: 'flip',
  duration: '0.8s',
  easing: 'ease-in-out'
}
```

## Responsive Behavior

### Mobile Devices
```typescript
mobile: {
  type: 'fade',
  duration: '0.3s',
  easing: 'ease-out'
}
```

### Reduced Motion
```typescript
reducedMotion: {
  type: 'fade',
  duration: '0.1s',
  easing: 'linear'
}
```

## Performance Considerations

### Duration Guidelines
- **Fast**: 0.2s - 0.3s (minimal, professional)
- **Medium**: 0.4s - 0.5s (balanced, default)
- **Slow**: 0.6s - 0.8s (dramatic, engaging)

### Easing Functions
- **ease-out**: Best for entrances (feels natural)
- **ease-in-out**: Best for balanced transitions
- **ease-in**: Best for exits
- **linear**: Best for reduced motion

### Performance Tips
1. **Keep durations under 0.5s** for most transitions
2. **Use fade for mobile** devices (better performance)
3. **Respect reduced motion** preferences
4. **Test on slower devices** to ensure smoothness

## Custom Animations

### Creating Custom Keyframes

Add to `src/styles/animate.css`:

```css
@keyframes custom-animation {
  from {
    opacity: 0;
    transform: translateX(100px) rotate(5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
}

--animate-custom: custom-animation 0.4s ease-in-out forwards;
```

### Using Custom Animations

```typescript
{
  type: 'custom',
  duration: '0.4s',
  easing: 'ease-in-out'
}
```

## Testing Animations

### Browser DevTools
1. Open DevTools → Performance tab
2. Record page transitions
3. Check for frame drops or jank

### User Testing
1. Test on different devices
2. Check with slow network connections
3. Verify reduced motion support

## Accessibility

### Reduced Motion Support
The project automatically detects `prefers-reduced-motion` and uses minimal animations:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Best Practices
1. **Always provide reduced motion alternatives**
2. **Keep animations under 0.5s**
3. **Avoid flashing or strobing effects**
4. **Test with screen readers**

## Troubleshooting

### Common Issues

**Animation not working:**
- Check if View Transitions are enabled
- Verify CSS classes are applied
- Check browser console for errors

**Performance issues:**
- Reduce animation duration
- Use simpler animations (fade instead of complex transforms)
- Check for conflicting CSS

**Mobile issues:**
- Use fade animations for mobile
- Reduce duration for slower devices
- Test on actual devices

### Debug Mode

Enable debug mode in `src/config/animations.ts`:

```typescript
const DEBUG_ANIMATIONS = true;

if (DEBUG_ANIMATIONS) {
  console.log('Animation config:', animationConfig);
}
```

## Examples

### Quick Changes

**Change all animations to fade:**
```typescript
default: {
  type: 'fade',
  duration: '0.3s',
  easing: 'ease-out'
}
```

**Make works page more dramatic:**
```typescript
'/works/': {
  type: 'flip',
  duration: '0.8s',
  easing: 'ease-in-out'
}
```

**Speed up all transitions:**
```typescript
// Change all durations to 0.2s
duration: '0.2s'
```

## Conclusion

The page transition system provides:
- ✅ **Flexible configuration** for different page types
- ✅ **Performance optimization** with responsive behavior
- ✅ **Accessibility support** with reduced motion
- ✅ **Easy customization** through configuration files
- ✅ **Professional animations** with smooth transitions

Choose animations that match your brand personality and provide the best user experience for your portfolio.
