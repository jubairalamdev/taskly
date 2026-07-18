# Taskly — Design System

## Philosophy
Modern, sleek, minimalist. Airy layouts, generous whitespace, subtle color accents. No clutter.

## Color Palette

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--primary` | `#60A5FA` | `blue-400` | Buttons, links, active elements |
| `--primary-dark` | `#3B82F6` | `blue-500` | Hover states, focus rings |
| `--primary-light` | `#EFF6FF` | `blue-50` | Subtle backgrounds, hover fills |
| `--accent` | `#FED7AA` | `orange-200` | Decorative accents, badges, highlights |
| `--accent-light` | `#FFF7ED` | `orange-50` | Subtle warm backgrounds |
| `--bg` | `#FFFFFF` | `white` | Page background |
| `--surface` | `#F8FAFC` | `slate-50` | Card backgrounds, sections |
| `--text` | `#0F172A` | `slate-900` | Primary text |
| `--text-muted` | `#64748B` | `slate-500` | Secondary text, placeholders |
| `--border` | `#E2E8F0` | `slate-200` | Dividers, borders |

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | Geist Sans | 600–700 | `text-2xl` to `text-5xl` |
| Body | Geist Sans | 400 | `text-base` |
| Small / meta | Geist Sans | 400 | `text-sm` |
| Monospace | Geist Mono | 400 | `text-sm` |

## Spacing
- Use Tailwind spacing scale. Preferred gaps: `gap-4`, `gap-6`, `gap-8`, `gap-12`
- Section padding: `py-16` to `py-24`
- Card padding: `p-6`

## Component Styles

### Buttons
- **Primary:** filled `--primary` bg, white text, rounded-xl, px-6 py-2.5
- **Ghost:** no bg, `--text-muted` text, hover `--primary-light` bg
- No outlines or borders except on ghost variants.

### Cards
- White bg, rounded-2xl, subtle shadow (`shadow-sm`), `p-6`
- No borders unless grouped (then `divide-y`)

### Inputs (Hero UI default)
- Clean underline or bordered variant. No heavy outlines.

### Modals (Hero UI default)
- Centered, rounded-2xl, overlay with backdrop blur.

## Layout

### Header
- Fixed/sticky top, white bg with faint bottom border (`border-b border-slate-100`)
- Max-width container (`max-w-6xl mx-auto`), flex between logo + nav links
- Logo: bold "Taskly" in `--primary`
- Nav links: ghost-style, active state with `--primary-light` bg

### Footer
- Center-aligned, `text-sm`, `--text-muted`
- Simple copyright line. Minimal — no link clutter.

### Page Shell
- Full-height flex column: `<Header />` → `<main className="flex-1">{children}</main>` → `<Footer />`
- Consistent max-width container on content pages.

## Responsive
- Mobile-first. Header collapses to hamburger on small screens (future enhancement).
- Single-column layouts by default. Two-column only where needed (forms, dashboard).
