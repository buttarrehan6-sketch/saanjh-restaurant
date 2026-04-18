# Design Brief: Saanjh Restaurant 3D Website

## Aesthetic
Premium Pakistani restaurant with warm luxury. Dark mode with warm red/orange/gold accents. 3D geometric hero. Smooth 60 FPS animations.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.62 0.22 25 | Warm red accent, CTAs, interactive elements |
| Secondary | 0.58 0.18 35 | Orange accent, secondary highlights |
| Accent | 0.68 0.24 40 | Gold highlight, hover states |
| Background | 0.12 0 0 | Deep charcoal dark |
| Foreground | 0.95 0 0 | Cream text |
| Card | 0.16 0 0 | Elevated surface |
| Border | 0.22 0 0 | Subtle dividers |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | Bricolage Grotesque | Hero titles, menu headers |
| Body | DM Sans | Content, descriptions, menu items |
| Mono | Geist Mono | Code, prices (technical precision) |

## Elevation & Depth

- Hero: Full-screen 3D canvas with rotating geometric shapes (red/orange/gold)
- Primary surfaces: Cards at 0.16 lightness with warm shadow (0.2 opacity)
- Elevated: z-index layering for modals, sticky nav
- Depth cues: Box-shadow warm/elevated, backdrop-filter blur

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Hero | Fullscreen canvas, 3D shapes | Immersive entry, geometric warmth |
| Navigation | Sticky, dark card, warm accents | Fixed access to Order/Call CTAs |
| Menu sections | Animated grid, glow on hover | Interactive discovery |
| Info | Card-based, rating badge | Trust, location, hours |
| Footer | Border-top, subtle muted | Contact, links |

## Spacing & Rhythm

- Base unit: 12px
- Density: Comfortable (24px gaps between sections)
- Menu grid: 3 cols (desktop), 2 cols (tablet), 1 col (mobile)

## Motion Choreography

- Entrance: Fade-in + scale-in (0.3s ease-out)
- Hover: Scale up 1.05, glow intensifies, color shift to accent
- Scroll: Smooth scroll-snap for menu sections
- 3D: Continuous rotation in hero (requestAnimationFrame)

## Component Patterns

- Buttons: Warm gradient background, text-glow on hover, shadow-elevated
- Cards: Card background with warm shadow, scale-in animation
- Modals: Backdrop-glow (blur + overlay), fade-in content
- Badge: Accent background, border-radius-full

## Constraints

- No generic blues, purples, or greys — warm palette only
- All animations 60 FPS capable (60 FPS canvas, GPU-accelerated CSS)
- Mobile-first responsive (sm/md/lg breakpoints)
- Accessibility: AA+ contrast on all text (cream on dark works)
- 3D: Canvas optimized, no heavy effects during scroll

