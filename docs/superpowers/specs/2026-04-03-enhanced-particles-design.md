# Enhanced Home Page Particles

## Context

The home page has 6 small CSS floating particles (3-5px, low opacity 0.3-0.5) with a single `particle-drift` animation. The user likes the effect but wants it more pronounced and visible. We'll enhance by adding more particles with greater variety while keeping the pure CSS approach.

## Changes

### 1. Expand from 6 to ~15 particles in `index.css`

Add 9 new `.particle-N` classes (particle-7 through particle-15) with:
- **Sizes**: range from 2px to 7px (currently 3-5px)
- **Colors**: add amber (`rgba(251,191,36,*)`), rose (`rgba(244,63,94,*)`), emerald (`rgba(52,211,153,*)`) alongside existing indigo/violet
- **Opacity**: raise to 0.4-0.7 range (currently 0.3-0.5)
- **Positions**: distributed across viewport to fill gaps (currently clustered in top-left and right areas)
- **Animation delays**: varied from -0.5s to -7s for staggered timing

### 2. Add `particle-shimmer` keyframe in `index.css`

New keyframe animation that adds a subtle scale pulse (1.0 -> 1.5 -> 1.0) combined with opacity fade. Apply to roughly half the particles for variety, while the other half keep the existing `particle-drift`.

### 3. Vary animation durations

- Some particles at 4s (faster, more energetic)
- Some at 6s (current speed)
- Some at 8s (slower, more ambient)

### 4. Add particle divs in `HomeScreen.tsx`

Add 9 new `<div className="particle particle-N" />` elements (7-15) alongside the existing 6.

## Files to modify

- [index.css](src/index.css) — new particle classes, new keyframe, varied durations
- [HomeScreen.tsx](src/screens/HomeScreen.tsx) — add particle divs 7-15

## Verification

1. Run `npm run dev` and open the home page
2. Confirm ~15 visible particles with varied sizes, colors, speeds
3. Confirm shimmer effect visible on some particles
4. Check performance — no jank on mobile (CSS animations are GPU-accelerated)
5. Ensure particles don't overlap or obscure UI elements (pointer-events: none already set)
