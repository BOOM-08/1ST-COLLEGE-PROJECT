---
name: Saira Dark High-Contrast
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e1bfb7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#a88a83'
  outline-variant: '#59413b'
  surface-tint: '#ffb4a2'
  primary: '#ffb4a2'
  on-primary: '#621100'
  primary-container: '#ff6b47'
  on-primary-container: '#651200'
  inverse-primary: '#ae3112'
  secondary: '#c6c4df'
  on-secondary: '#2f2e43'
  secondary-container: '#47475d'
  on-secondary-container: '#b8b6d0'
  tertiary: '#c7c5d5'
  on-tertiary: '#302f3b'
  tertiary-container: '#9a98a7'
  on-tertiary-container: '#31313d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a2'
  on-primary-fixed: '#3c0700'
  on-primary-fixed-variant: '#8a1c00'
  secondary-fixed: '#e2e0fc'
  secondary-fixed-dim: '#c6c4df'
  on-secondary-fixed: '#1a1a2e'
  on-secondary-fixed-variant: '#45455b'
  tertiary-fixed: '#e3e0f1'
  tertiary-fixed-dim: '#c7c5d5'
  on-tertiary-fixed: '#1b1a26'
  on-tertiary-fixed-variant: '#464552'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-padding: 100px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built for a professional, high-impact creative portfolio and personal brand. It utilizes a **Corporate / Modern** style mixed with **High-Contrast** elements to create a sense of premium authority and technical precision. 

The aesthetic is anchored by a deep, monochromatic background that allows vibrant accent colors to guide the user's attention. The emotional response is one of confidence, expertise, and modern sophistication. White whitespace is used deliberately to separate content blocks, ensuring that even with a dark theme, the interface feels expansive rather than cramped.

## Colors

The palette is defined by extreme tonal contrast. 

- **Primary:** A vibrant, high-saturation orange used exclusively for calls to action, progress indicators, and critical highlights.
- **Background Tiers:** The base background is a near-black navy (`#0F0F1A`). Secondary surfaces and cards use a slightly lighter, desaturated navy (`#1A1A2E`) to create depth without relying on heavy shadows.
- **Typography:** Primary text is pure white or high-purity off-white to ensure maximum readability against the dark backdrop. Secondary text uses a mid-tone grey-blue to establish visual hierarchy.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels to maintain a friendly yet professional geometric appearance. 

Headlines are characterized by heavy weights (700-800) and tight letter spacing to create a "blocky," high-impact look suitable for a creative portfolio. Body text remains legible with generous line heights (1.6x) and lighter weights. Captions and small labels use increased letter spacing and uppercase styling to provide structural contrast against the organic flow of the body copy.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1200px for desktop. 

- **Vertical Rhythm:** Sections are separated by significant vertical padding (100px+) to allow the content to breathe and signify transitions between different types of information.
- **Card Grids:** Content is primarily organized into 2, 3, or 4-column grids. On mobile devices, these collapse into a single-column stack with 20px side margins.
- **Gaps:** Use a standard 24px gutter between card elements to maintain a clean, organized appearance.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**. 

Instead of traditional drop shadows, depth is achieved by placing cards (`#1A1A2E`) on top of the base background (`#0F0F1A`). To further define these edges, use a 1px border with very low opacity (10-15% white). This creates a "ghost border" effect that feels precise and architectural. 

Shadows, if used at all, should be limited to interactive elements like primary buttons, using a subtle orange-tinted glow to reinforce the brand's primary accent.

## Shapes

The shape language is dominated by high-radius curves and **Pill-shaped** containers. 

Buttons, tags, and accent containers (like the "About Me" badge) should always utilize a fully rounded (pill) border-radius. This softness balances the high-contrast color palette and sharp typography, making the interface feel approachable. Rectangular cards should utilize a `rounded-lg` (1rem) or `rounded-xl` (1.5rem) radius to maintain consistency with the rounded theme.

## Components

### Buttons
Primary buttons are pill-shaped with a solid orange fill and white/black text. Secondary buttons utilize the "ghost" style: a pill-shaped outline with a 1px border and no fill.

### Cards
Cards are the primary container for skills, services, and testimonials. They should feature a slightly lighter background than the page floor and a subtle 1px border. For service cards, incorporate an "arrow-up-right" icon button in the corner to indicate interactivity.

### Progress Bars
Skill levels are represented by horizontal bars. The track should be a dark neutral, while the progress indicator uses the primary orange accent, terminating in rounded caps.

### Input Fields
Forms should use the secondary background color with a soft border. Labels stay persistent above the field or use high-contrast placeholder text.

### Chips / Tags
Small, pill-shaped badges used for categories or status indicators. These should use a semi-transparent version of the primary color or a dark neutral fill to remain secondary to main buttons.