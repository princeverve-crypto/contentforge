# ContentForge Design System

**Version:** 1.0  
**Last Updated:** 2024-04-19  
**Platform:** Web (Next.js 16 + React 19)  
**Status:** Active

## Visual Identity

### Mood & Purpose
Premium SaaS content creation platform combining modern, energetic aesthetics with professional clarity. Target: creators, marketers, agencies seeking cutting-edge tools. Visual language: gradient-forward with subtle glassmorphism, neon glow effects, and fluid animations.

### Pattern
Newsletter/Content-First with SaaS dashboard focus. Hero-centric landing with social proof, feature showcase, pricing comparison, testimonials, FAQ, and footer CTA.

---

## Color System

### Core Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Primary** | Purple | `#a855f7` | CTAs, gradients, active states, hover effects |
| **Primary Dark** | Dark Purple | `#9333ea` | Gradient anchors, emphasis |
| **Secondary** | Pink | `#ec4899` | Gradient accents, secondary emphasis |
| **Accent** | Cyan | `#00d4ff` | Highlights, neon effects, glow |
| **Background** | Slate Dark | `#0f172a` | Dark mode default surface |
| **Background Light** | Slate Light | `#f8f9fa` | Light mode default surface |
| **Foreground** | White | `#ffffff` | Text on dark, primary interactive elements |
| **Muted Text** | Gray 400 | `#9ca3af` | Secondary text, disabled states |
| **Muted Dark** | Gray 600 | `#4b5563` | Tertiary text, borders |
| **Border** | Purple Transparent | `rgba(168, 85, 247, 0.1)` | Subtle dividers, card borders |
| **Error** | Red | `#dc2626` | Error states, validation |
| **Success** | Green | `#22c55e` | Success states, completion |

### Gradients

| Name | Definition | Use Case |
|------|-----------|----------|
| **Hero Gradient** | `linear-gradient(to right, #c084fc, #f472b6, #c084fc)` | Main headings, hero text fill |
| **Button Gradient** | `linear-gradient(to right, #9333ea, #ec4899)` | Primary CTA buttons, badges |
| **Card Gradient** | `linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.2))` | Card backgrounds, section emphasis |
| **Chart Gradient** | `linear-gradient(to top, #9333ea, #ec4899)` | Data visualization, analytics bars |
| **Background Gradient** | `linear-gradient(to bottom right, #0f172a, #2d1b4e, #0f172a)` | Page background (dark) |

### Dark/Light Mode

**Dark Mode (Default)**
- Background: `#0f172a` (slate-900)
- Surface: `rgba(168, 85, 247, 0.05)` to `rgba(168, 85, 247, 0.15)`
- Text: `#ffffff` (primary), `#9ca3af` (secondary)
- Borders: `rgba(168, 85, 247, 0.1)` to `rgba(168, 85, 247, 0.2)`

**Light Mode**
- Background: `#f8f9fa` (slate-50)
- Surface: `rgba(168, 85, 247, 0.1)` to `rgba(168, 85, 247, 0.15)`
- Text: `#1f2937` (primary), `#6b7280` (secondary)
- Borders: `rgba(168, 85, 247, 0.2)` to `rgba(168, 85, 247, 0.3)`

---

## Typography

### Font Stack
- **Family:** System default (Geist Sans)
- **Google Font (Optional):** Plus Jakarta Sans (SaaS standard) or Geist

### Type Scale

| Level | Font Size | Font Weight | Line Height | Use Case |
|-------|-----------|------------|-------------|----------|
| **Display** | `clamp(2rem, 5vw, 3.75rem)` | 900 | 1.2 | Main hero headline |
| **H1** | `48px` | 900 | 1.2 | Section heading |
| **H2** | `36px` | 700 | 1.2 | Subheading |
| **H3** | `32px` / `24px` | 700 | 1.2 | Feature title |
| **Body** | `16px` | 400 | 1.6 | Standard paragraph text |
| **Body Small** | `14px` | 400 | 1.6 | Secondary text, description |
| **Caption** | `12px` | 500 | 1.5 | Labels, badges, metadata |
| **Button** | `16px` | 600 | 1.5 | CTA text |

### Font Weight Scale
- **300:** Light (not used in primary interface)
- **400:** Regular (body text, labels)
- **500:** Medium (secondary headings, labels)
- **600:** Semibold (button text, small headings)
- **700:** Bold (section headings)
- **900:** Black (hero headlines, emphasis)

---

## Spacing & Layout

### Spacing Scale (8dp base)
```
4px  → xs
8px  → sm
12px → sm-md
16px → md
24px → lg
32px → xl
48px → 2xl
64px → 3xl
80px → 4xl
120px → 5xl
```

### Layout
- **Max-width:** `1280px` (xl container)
- **Padding (horizontal):** `24px` (mobile/tablet), `32px+` (desktop)
- **Gap (grid):** `32px` (features), `64px` (sections)
- **Section padding (vertical):** `80px` – `120px`

### Responsive Breakpoints
- **Mobile:** 375px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+
- **Wide:** 1440px+

---

## Components & Patterns

### Navigation
- **Style:** Sticky, glassmorphic
- **Background:** `rgba(15, 23, 42, 0.3)` with `backdrop-filter: blur(12px)`
- **Border:** `1px solid rgba(168, 85, 247, 0.1)`
- **Height:** ~64px
- **Theme Toggle:** Sun/Moon emoji (☀️/🌙) button

### Buttons

**Primary CTA**
- Background: `linear-gradient(to right, #9333ea, #ec4899)`
- Padding: `12px 32px` (normal), `14px 48px` (hero)
- Border Radius: `8px`
- Font Weight: `600` / `700`
- Box Shadow: `0 0 40px rgba(168, 85, 247, 0.4)`
- Hover: Shadow → `0 0 60px rgba(168, 85, 247, 0.6)`, Transform → `translateY(-2px)`

**Secondary / Outline**
- Background: `transparent` (hover: `rgba(168, 85, 247, 0.1)`)
- Border: `1px solid rgba(168, 85, 247, 0.5)`
- Color: `#d8b4fe` (dark) / `#9333ea` (light)
- Padding: `12px 32px`
- Border Radius: `8px`

**Disabled State**
- Opacity: `0.5`
- Cursor: `not-allowed`
- Pointer Events: `none`

### Cards & Surfaces

**Feature Card**
- Background: `rgba(168, 85, 247, 0.05)` (dark) / `rgba(168, 85, 247, 0.1)` (light)
- Border: `1px solid rgba(168, 85, 247, 0.2)` (dark) / `rgba(168, 85, 247, 0.3)` (light)
- Border Radius: `12px` / `16px`
- Padding: `24px` / `32px`
- Hover: Border → `#a855f7`, Background → lighter variant, Transform → `translateY(-4px)`
- Transition: `all 0.3s`

**Pricing Card**
- Border Radius: `16px`
- Padding: `48px 32px`
- Highlight (Popular): `2px solid #a855f7`, badge at `top: -16px`
- Hover: Transform → `translateY(-8px)`, Box Shadow → `0 20px 40px rgba(168, 85, 247, 0.2)`

**Testimonial Card**
- Similar to Feature Card, with italic quote styling
- Avatar emoji (32px) + name + role

### Forms

**Input Field**
- Background: `rgba(168, 85, 247, 0.05)` (dark) / `rgba(168, 85, 247, 0.1)` (light)
- Border: `1px solid rgba(168, 85, 247, 0.3)` (dark) / `rgba(168, 85, 247, 0.4)` (light)
- Border Radius: `8px`
- Padding: `12px 16px`
- Focus: Border Color → `#a855f7`, Box Shadow → `0 0 0 3px rgba(168, 85, 247, 0.1)`
- Outline: `none`

**FAQ Accordion**
- Background (collapsed): `rgba(168, 85, 247, 0.05)` (dark) / `rgba(168, 85, 247, 0.08)` (light)
- Background (expanded): `rgba(168, 85, 247, 0.1)` (dark) / `rgba(168, 85, 247, 0.15)` (light)
- Border: `1px solid rgba(168, 85, 247, 0.2)` (dark) / `rgba(168, 85, 247, 0.3)` (light)
- Toggle icon: `▼` (chevron, rotates 180° on expand)
- Padding: `24px`
- Hover (question): Color → `#a855f7`

### Effects

**Glassmorphism**
- Backdrop Filter: `blur(12px)`
- Background: Semi-transparent with alpha
- Border: Thin, transparent border for edge definition

**Glow & Shadow**
- Box Shadow: `0 0 20px rgba(168, 85, 247, 0.3)` (default)
- Hover: `0 0 40px rgba(168, 85, 247, 0.5)` or higher
- Never: Hard shadows, large drop shadows (keep glow-based)

**Particle Animation**
- Canvas-based 2D particles with radial gradients
- Colors: Purple → Cyan fade
- Opacity: Fades from 1 to 0 over lifetime
- Density: 50 active particles max
- Blend Mode: `screen` (additive)

---

## Animation & Motion

### Timing
- **Micro-interaction:** 150-300ms
- **Entrance:** 0.3-0.6s
- **Exit:** 0.2-0.4s
- **Hover:** 0.3s
- **Stagger (list):** 30-50ms per item

### Easing
- **Entrance:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (power3.out equivalent)
- **Hover:** `ease-in-out` (default)
- **Exit:** `ease-in`
- **Spring-like:** Natural deceleration for engagement

### Patterns

**Button Hover**
- Duration: `0.3s`
- Properties: Box Shadow (glow increase), Transform (Y: -2px)
- Easing: `ease-in-out`

**Card Hover**
- Duration: `0.3s`
- Properties: Border Color, Background, Transform (Y: -4px)
- Easing: `ease-in-out`

**Element Entrance (staggered)**
- Offset: `0.1-0.3s` from scene start
- Duration: `0.5-0.7s`
- Properties: Y offset (30-50px down), Opacity (0 → 1)
- Easing: Power3 or Power2 out

**Scroll-triggered:** None (keep page lightweight; use CSS scroll-behavior)

**Theme Toggle:** Instant swap with page background transition (`0.3s`)

---

## Accessibility

### Contrast
- **Normal text:** ≥4.5:1 (WCAG AA)
- **Large text (24px+):** ≥3:1 (WCAG AA)
- **UI components:** ≥3:1

### Focus States
- **Outline:** Visible 2-4px ring (`#a855f7`)
- **Applied to:** All buttons, links, form inputs, interactive elements
- **Keyboard nav:** Tab order matches visual left-to-right, top-to-bottom

### Motion
- **Reduced Motion:** Respect `prefers-reduced-motion: reduce`
  - Disable animations → snap transitions or fade
  - Keep essential feedback (color change, opacity shift)

### Images & Icons
- **Icons:** SVG (Lucide/Heroicons) or emoji for decorative context
- **Alt text:** Meaningful descriptions for functional images
- **Dark mode:** All icons visible in both themes

### Form Labels
- **Association:** `<label for="id">` for all inputs
- **Required:** Marked with asterisk or `aria-required="true"`
- **Error messages:** Placed below field, linked via `aria-describedby`

---

## What NOT to Do

1. **Don't use pure black (#000000)** — Use slate-900 or theme-aware dark variant
2. **Don't mix rounded and sharp edges** — Stick to `8px` or `12px` radius (cards) / `4px` (buttons) consistently
3. **Don't use emojis as primary icons** — Use SVG icons for professional appearance
4. **Don't animate width/height** — Use transform/scale only
5. **Don't skip focus states** — Every interactive element needs keyboard navigation
6. **Don't disable text selection** — Users should be able to copy text
7. **Don't use hard shadows on dark mode** — Prefer glow or subtle elevation
8. **Don't create layout-shifting animations** — Reserve space for dynamic content
9. **Don't forget dark mode parity** — Design light & dark themes together, test contrast separately
10. **Don't trap users in modals** — Always provide escape/close affordance
11. **Don't use color alone to convey meaning** — Pair with icons or text
12. **Don't disable zoom on mobile** — `initial-scale=1` only, never `user-scalable=no`
13. **Don't nest interactive elements** — No buttons inside links, links inside buttons
14. **Don't use auto-playing media without user consent** — Muted video allowed
15. **Don't rely on hover for critical info** — Mobile users can't hover

---

## Implementation Files

- **Main Component:** `/app/components/WorldClassHero.tsx`
- **Styles:** Inline styles (no external CSS framework)
- **Fonts:** System default (Geist family from Next.js)
- **Icons:** Emoji with semantic meaning + SVG fallback (Lucide recommended for future)
- **Canvas Animation:** 2D particle system in `WorldClassHero.tsx` useEffect

---

## Future Enhancements

- [ ] Extract color tokens to CSS variables for easier theme switching
- [ ] Convert inline styles to Tailwind or styled-components for maintainability
- [ ] Add SVG icon set (Lucide/Heroicons) to replace emoji icons
- [ ] Implement page transitions and route-level animations
- [ ] Add storybook for component library documentation
- [ ] Create mobile-specific layout optimizations (currently responsive via max-width + padding)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-04-19 | Initial design system documentation. Covers colors, typography, components, animations, accessibility, and anti-patterns. |
