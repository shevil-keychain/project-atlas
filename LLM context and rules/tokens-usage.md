# Design Tokens Usage

All styling must use the design tokens defined in `packages/ui/globals.css`. No CSS outside of tokens is permitted — no raw hex colors, no arbitrary spacing values, no hardcoded font sizes, no custom shadows or radii.

Source of truth: `packages/ui/globals.css` (`@theme`, `@theme inline`, `:root` blocks).

---

## Color Tokens

### Semantic Text Colors

Use these for all text. In TSX: `text-text-primary`, `text-text-secondary`, etc. In CSS: `var(--color-text-*)`.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `text-primary` | `text-text-primary` | Primary body text | Headings, labels, body copy, any prominent text | Not for secondary/helper text |
| `text-secondary` | `text-text-secondary` | Secondary text | Descriptions, helper text, metadata | Not for primary headings or labels |
| `text-tertiary` | `text-text-tertiary` | Tertiary text | Placeholders, timestamps, low-priority metadata | Not for body copy or labels |
| `text-disabled` | `text-text-disabled` | Disabled text | Inactive controls, disabled labels | Not for active/enabled elements |
| `text-inverse` | `text-text-inverse` | Inverse text | Text on dark or brand-colored backgrounds | Not on white/light backgrounds |
| `text-brand` | `text-text-brand` | Brand text | Links, brand-colored labels, active nav items | Not for general body text |
| `text-error` | `text-text-error` | Error text | Error messages, invalid field labels | Not for warnings or general text |
| `text-success` | `text-text-success` | Success text | Success messages, confirmation text | Not for general text |
| `text-warning` | `text-text-warning` | Warning text | Warning messages | Not for errors or general text |

### Semantic Surface / Background Colors

Use these for all backgrounds. In TSX: `bg-surface-page`, `bg-surface-card`, etc. In CSS: `var(--color-surface-*)`.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `surface-page` | `bg-surface-page` | Page canvas | Main page background | Not for elevated containers |
| `surface-card` | `bg-surface-card` | Card/panel background | Cards, modals, sheets, popovers, elevated containers | Not for the page canvas itself |
| `surface-subtle` | `bg-surface-subtle` | Subtle background | Secondary panels, table headers, sidebar areas, hover rows | Not for primary content areas |
| `surface-sunken` | `bg-surface-sunken` | Sunken background | Inset areas, code blocks, input wells, badge backgrounds | Not for elevated/primary surfaces |
| `surface-muted` | `bg-surface-muted` | Muted background | Disabled inputs, skeleton loaders, placeholder areas | Not for active/interactive areas |
| `surface-brand` | `bg-surface-brand` | Brand background | Primary CTA buttons, active brand indicators | Not for general page areas |
| `surface-brand-subtle` | `bg-surface-brand-subtle` | Brand subtle background | Active breadcrumb, brand-tinted chips, soft highlights | Not for strong brand emphasis |
| `surface-error` | `bg-surface-error` | Error background | Error state fills (strong) | Not for subtle error hints |
| `surface-error-subtle` | `bg-surface-error-subtle` | Error subtle background | Error banners, inline alerts (error) | Not for strong error states |
| `surface-success` | `bg-surface-success` | Success background | Success state fills (strong) | Not for subtle success hints |
| `surface-success-subtle` | `bg-surface-success-subtle` | Success subtle background | Success banners, inline alerts (success) | Not for strong success states |
| `surface-warning` | `bg-surface-warning` | Warning background | Warning state fills (strong) | Not for subtle warning hints |
| `surface-warning-subtle` | `bg-surface-warning-subtle` | Warning subtle background | Warning banners, inline alerts (warning) | Not for strong warning states |
| `surface-overlay` | CSS only: `var(--color-surface-overlay)` | Overlay backdrop | Modal/sheet backdrops | Not for content areas |

### Semantic Border Colors

Use these for all borders. In TSX: `border-border-default`, etc. In CSS: `var(--color-border-*)`.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `border-default` | `border-border-default` | Default border | Card borders, dividers, general borders | Not for inputs (use strong) or focus states |
| `border-subtle` | `border-border-subtle` | Subtle border | Inner dividers, less prominent separators, disabled inputs | Not for primary dividers or emphasis |
| `border-strong` | `border-border-strong` | Strong border | Input resting borders, emphasized dividers | Not for subtle/secondary dividers |
| `border-focus` | `border-border-focus` | Focus border | Focused inputs, active selection outlines | Only on focus state, not resting |
| `border-error` | `border-border-error` | Error border | Invalid inputs, error state borders | Not for non-error states |
| `border-success` | `border-border-success` | Success border | Valid inputs, success state borders | Not for non-success states |

### Interactive Colors

Use these for interactive element states. In TSX: `bg-interactive-primary`, `hover:bg-interactive-primary-hover`, etc.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `interactive-primary` | `bg-interactive-primary` | Primary action | Main CTA button background | Not for secondary/ghost buttons |
| `interactive-primary-hover` | `hover:bg-interactive-primary-hover` | Primary hover | CTA button hover state | Not as resting state |
| `interactive-primary-active` | `active:bg-interactive-primary-active` | Primary active | CTA button pressed state | Not as resting or hover state |
| `interactive-secondary` | `bg-interactive-secondary` | Secondary action | Ghost/secondary button background | Not for primary CTAs |
| `interactive-secondary-hover` | `hover:bg-interactive-secondary-hover` | Secondary hover | Ghost/secondary button hover | Not as resting state |
| `interactive-destructive` | `bg-interactive-destructive` | Destructive action | Delete/remove button background | Not for non-destructive actions |
| `interactive-destructive-hover` | `hover:bg-interactive-destructive-hover` | Destructive hover | Delete/remove hover state | Not as resting state |

### Icon Colors

In TSX: `text-icon-primary`, `text-icon-brand`, etc.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `icon-primary` | `text-icon-primary` | Primary icon | Default icon color for most icons | Not for decorative/brand icons |
| `icon-secondary` | `text-icon-secondary` | Secondary icon | Less prominent icons, metadata icons | Not for primary action icons |
| `icon-tertiary` | `text-icon-tertiary` | Tertiary icon | Lowest-prominence icons | Not for actionable icons |
| `icon-brand` | `text-icon-brand` | Brand icon | Brand-colored icons, active state indicators | Not for all icons |
| `icon-error` | `text-icon-error` | Error icon | Error state icons | Only in error context |
| `icon-success` | `text-icon-success` | Success icon | Success state icons | Only in success context |
| `icon-warning` | `text-icon-warning` | Warning icon | Warning state icons | Only in warning context |

### Primitive Color Palettes (DO NOT use directly)

These exist only to define the semantic tokens above. Never reference them in application or component code.

| Palette | Range | Notes |
|---------|-------|-------|
| `stone` | 50–900 | Grayscale palette |
| `primary-brand` | 25–900 | Orange brand palette |
| `primary-lime` | 50–900 | Lime/green palette |
| `primary-sky` | 50–900 | Sky/light blue palette |
| `secondary-purple` | 50–900 | Purple palette |
| `secondary-blue` | 50–900 | Blue palette |
| `secondary-yellow` | 50–900 | Yellow palette |
| `secondary-red` | 50–900 | Red palette |
| `error` | 50–900 | System error (red) |
| `success` | 50–900 | System success (green) |
| `warning` | 50–900 | System warning (amber) |

---

## Spacing Tokens

All spacing uses pixel-based tokens. In TSX use Tailwind: `p-24`, `gap-16`, `m-8`, `w-40`, `h-32`, etc. No arbitrary values like `p-[13px]`.

### Available Spacing Values

| Token | Value | Common usage |
|-------|-------|-------------|
| `0` | 0px | Reset spacing |
| `1` | 1px | Hairline borders |
| `2` | 2px | Micro spacing |
| `4` | 4px | Tight internal padding |
| `6` | 6px | Small icon gaps |
| `8` | 8px | Compact padding, small gaps |
| `10` | 10px | Small element spacing |
| `12` | 12px | Input horizontal padding |
| `14` | 14px | Between tight elements |
| `16` | 16px | Standard gap, section padding |
| `20` | 20px | Medium internal padding |
| `22` | 22px | Specific component needs |
| `24` | 24px | Page content padding, card padding |
| `28` | 28px | Between components |
| `32` | 32px | Major section gaps |
| `36` | 36px | Icon button size |
| `40` | 40px | Default button/input height |
| `44` | 44px | Touch target minimum |
| `48` | 48px | Large button/input height |
| `56` | 56px | Large element spacing |
| `64` | 64px | Section separation |
| `72` | 72px | MainNav width |
| `80` | 80px | Large container padding |
| `88` | 88px | Extra-large spacing |
| `96` | 96px | Major layout spacing |
| `128` | 128px | Large layout gaps |
| `240` | 240px | Large fixed widths |
| `256` | 256px | Large fixed widths |
| `1020` | 1020px | Extra-wide modal widths |

### Semantic Spacing Aliases (CSS only)

These are available via `var(--space-*)` in CSS files. In TSX, use the Tailwind spacing classes directly.

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-component-padding-sm` | 8px | Small buttons, compact items |
| `--space-component-padding-md` | 12px | Input horizontal padding |
| `--space-component-padding-lg` | 16px | Default button padding, card compact |
| `--space-component-padding-xl` | 24px | Card standard padding, page content |
| `--space-component-gap-sm` | 8px | Gap within tight groups |
| `--space-component-gap-md` | 16px | Gap within sections |
| `--space-component-gap-lg` | 24px | Gap between sections |
| `--space-component-gap-xl` | 32px | Gap between major page areas |

---

## Typography Tokens

Font family is Manrope (set globally, no need to specify). In TSX: `text-14`, `text-20`, `font-semibold`, etc. No arbitrary font sizes like `text-[15px]`.

### Font Sizes

| Token | Value | Line height | Common usage |
|-------|-------|-------------|-------------|
| `text-10` | 10px | 16px | Micro labels, fine print |
| `text-12` | 12px | 16px | Captions, badges, metadata |
| `text-14` | 14px | 20px | Body text, labels, buttons |
| `text-16` | 16px | 24px | Larger body text |
| `text-18` / `text-lg` | 18px | 28px | Section headings |
| `text-20` / `text-xl` | 20px | 28px | PageHeader title (xl) |
| `text-24` | 24px | 32px | Page headings |
| `text-30` | 30px | 36px | Large display headings |

### Font Weights

| Token | Tailwind class | Value | Common usage |
|-------|---------------|-------|-------------|
| `font-weight-medium` | `font-medium` | 500 | Body text (default for all text) |
| `font-weight-semibold` | `font-semibold` | 600 | Headings, labels, emphasis |
| `font-weight-bold` | `font-bold` | 700 | Strong emphasis (use sparingly) |

Note: The design system overrides `font-normal` to render as `font-medium` (500). All text defaults to medium weight.

### Semantic Typography Roles (CSS only)

| Token | Size | Weight | Purpose |
|-------|------|--------|---------|
| `--text-heading-page-size` | 24px | semibold | Page-level headings |
| `--text-heading-section-size` | 18px | semibold | Section headings |
| `--text-body-size` | 14px | medium | Body copy |
| `--text-caption-size` | 12px | medium | Captions, helper text |
| `--text-label-size` | 14px | semibold | Form labels |

---

## Radius Tokens

In TSX: `rounded-lg`, `rounded-xl`, etc. No arbitrary radii like `rounded-[10px]`.

### Base Radius Scale

| Token | Value | Tailwind | Common usage |
|-------|-------|----------|-------------|
| `radius-0` | 0px | `rounded-none` | No rounding |
| `radius-4` / `radius-sm` | 4px | `rounded-sm` | Small elements, tooltips |
| `radius-8` / `radius-lg` | 8px | `rounded-lg` | Buttons, inputs |
| `radius-12` / `radius-xl` | 12px | `rounded-xl` | Cards, modals |
| `radius-16` / `radius-2xl` | 16px | `rounded-2xl` | Large panels |
| `radius-24` / `radius-3xl` | 24px | `rounded-3xl` | Extra-large panels |
| `radius-32` / `radius-4xl` | 32px | `rounded-4xl` | Very large panels |
| `radius-round` | 500px | `rounded-full` | Badges, avatars, pills |

### Semantic Radius Aliases (CSS only)

| Token | Value | Used by |
|-------|-------|---------|
| `--radius-button` | 8px (lg) | Buttons |
| `--radius-input` | 8px (lg) | Input fields |
| `--radius-card` | 12px (xl) | Cards, panels |
| `--radius-badge` | 500px (round) | Badges, tags |
| `--radius-modal` | 12px (xl) | Modals, sheets |
| `--radius-tooltip` | 6px (md) | Tooltips |

---

## Shadow Tokens

In TSX: `shadow-sm`, `shadow-md`, etc. No custom `box-shadow` values. For focus rings, use `var(--shadow-focus-ring)` in CSS.

| Token | Tailwind class | Purpose | When to use | When NOT to use |
|-------|---------------|---------|-------------|-----------------|
| `shadow-sm` | `shadow-sm` | Subtle shadow | Slight elevation, cards at rest | Not for floating elements |
| `shadow` | `shadow` | Default shadow | Light elevation | Not for high-prominence elements |
| `shadow-md` | `shadow-md` | Medium shadow | Dropdowns, popovers | Not for flat elements |
| `shadow-lg` | `shadow-lg` | Large shadow | Modals, floating panels | Not for inline elements |
| `shadow-xl` | `shadow-xl` | Extra-large shadow | High-prominence overlays | Sparingly |
| `shadow-2xl` | `shadow-2xl` | Maximum shadow | Rare, very high elevation | Avoid unless truly needed |
| `shadow-none` | `shadow-none` | No shadow | Remove shadow explicitly | N/A |
| `shadow-focus-ring` | CSS: `var(--shadow-focus-ring)` | Focus ring | All focusable interactive elements (brand orange ring) | Not for non-interactive elements |
| `shadow-focus-ring-error` | CSS: `var(--shadow-focus-ring-error)` | Error focus ring | Inputs/controls in error state when focused | Not for non-error states |

---

## Transition Tokens

Available via CSS only: `var(--transition-*)`. Use for hover, focus, enter, and leave animations.

| Token | Duration | Purpose |
|-------|----------|---------|
| `--transition-fast` | 150ms ease | Quick micro-interactions (color changes, opacity) |
| `--transition-normal` | 200ms ease | Standard transitions (most hover/focus effects) |
| `--transition-slow` | 300ms ease | Deliberate transitions (panel slides, expand/collapse) |

---

## Rules Summary

1. **Always use semantic tokens** — never reference primitive palette values in app/component code.
2. **No arbitrary Tailwind values** — do not use bracket syntax like `text-[14px]`, `p-[13px]`, `rounded-[10px]`, `bg-[#ff0000]`.
3. **No raw hex colors** — every color must come from the token system.
4. **No custom CSS properties** — all spacing, typography, color, radius, and shadow values must map to existing tokens.
