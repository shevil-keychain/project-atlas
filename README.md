# Level Design System

A Turborepo monorepo with a shared component library (`@level/ui`) and independent app workspaces for prototypes and demos. Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui, using Manrope as the primary typeface.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the component demos.

### Creating a new prototype

```bash
cp -r apps/docs apps/my-prototype
```

Then update `apps/my-prototype/package.json` (change the name and port), run `pnpm install`, and start building. Your prototype automatically uses every component and token from `@level/ui`.

---

## Project Structure

```
packages/
  ui/                     # @level/ui — shared design system package
    components/
      ui/                 # Base UI components (Button, Input, Badge, etc.)
      patterns/           # Composite patterns (MainNav, TopBar, PageHeader)
      icons/              # 974 custom SVG icons
    hooks/                # Shared hooks (useToast)
    lib/utils.ts          # cn() helper (clsx + tailwind-merge)
    globals.css           # All design tokens defined here via @theme

apps/
  docs/                   # Component browser & demo pages
  <prototype>/            # Each prototype is an independent Next.js app
```

---

## Token-First Development

> **Critical rule:** Never hardcode raw values (pixels, hex colors, named CSS colors). Always use the tokens defined in `packages/ui/globals.css`. This keeps the system consistent and easy to update.

When implementing any design change, look up the closest token before reaching for an arbitrary value. The sections below map common requests to their correct tokens.

---

## Typography Tokens

### Font Size

| Request | Token class | Value |
|---|---|---|
| "Make the text 12px" | `text-xs` | 12px |
| "Make the text 14px" | `text-sm` | 14px |
| "Make the text 16px" | `text-base` | 16px |
| "Make the text 18px" | `text-lg` | 18px |
| "Make the text 20px" | `text-xl` | 20px |
| "Make the text 24px" | `text-2xl` | 24px |
| "Make the text 30px" | `text-3xl` | 30px |
| "Make the text 36px" | `text-4xl` | 36px |
| "Make the text 48px" | `text-5xl` | 48px |

**Do this:**
```tsx
<p className="text-sm">Label</p>   // 14px via token
```
**Not this:**
```tsx
<p className="text-[14px]">Label</p>   // hardcoded — avoid
```

### Font Weight

| Request | Token class | Value |
|---|---|---|
| "Regular / normal weight" | `font-medium` | 500 (system default — see note below) |
| "Medium weight" | `font-medium` | 500 |
| "Semibold / semi-bold" | `font-semibold` | 600 |
| "Bold" | `font-bold` | 700 |

> **Note:** This design system overrides `font-normal` to render as `font-medium` (500) at the global level. The minimum effective weight is 500. Prefer `font-medium` and `font-semibold` for all UI text.

### Font Family

The entire app uses **Manrope** (`font-sans`) by default. There is no need to set it explicitly unless overriding a monospace context.

| Use case | Token class |
|---|---|
| Body / UI text | `font-sans` (default) |
| Code / monospace | `font-mono` |

---

## Color Tokens

All colors are CSS variables defined in `packages/ui/globals.css`. Use the Tailwind utility classes below — never use raw hex values.

### Semantic Tokens (use these first)

These are the preferred tokens for component styling. They have meaningful names and can be themed.

| Token class | Resolves to | Use for |
|---|---|---|
| `bg-background` / `text-background` | #FFFFFF | Page/surface background |
| `text-foreground` | #282624 | Primary body text |
| `bg-primary` | #F07400 | Primary actions, CTAs |
| `text-primary-foreground` | #FFFFFF | Text on primary bg |
| `bg-secondary` | stone-100 | Secondary surfaces |
| `text-secondary-foreground` | #282624 | Text on secondary bg |
| `bg-muted` | stone-200 | Disabled / subdued bg |
| `text-muted-foreground` | stone-600 | Placeholder / helper text |
| `border-border` | stone-400 | Default borders |
| `bg-destructive` | #E53811 | Errors, danger actions |
| `text-destructive-foreground` | #FFFFFF | Text on destructive bg |
| `ring-ring` | stone-600 | Focus rings |
| `bg-accent` | stone-100 | Hover highlight surfaces |

### Stone (Neutral / Grayscale)

| Token class | Hex |
|---|---|
| `stone-50` | #FCFCFB |
| `stone-100` | #F9F8F8 |
| `stone-200` | #F3F2F0 |
| `stone-300` | #EDEBE9 |
| `stone-400` | #E7E5E1 |
| `stone-500` | #E1DEDA |
| `stone-600` | #B5B1AD |
| `stone-700` | #7C7972 |
| `stone-800` | #35312D |
| `stone-900` | #282624 |

Prefix with `bg-`, `text-`, or `border-` as needed (e.g. `bg-stone-100`, `text-stone-700`).

### Primary Brand (Orange)

| Token class | Hex |
|---|---|
| `primary-brand-25` | #FFFAF5 |
| `primary-brand-50` | #FFF5EB |
| `primary-brand-100` | #FFE5CD |
| `primary-brand-200` | #FFCB9B |
| `primary-brand-300` | #FFB168 |
| `primary-brand-400` | #FF7B00 |
| `primary-brand-500` | #F07400 (main brand) |
| `primary-brand-600` | #E06F06 |
| `primary-brand-700` | #C9671D |
| `primary-brand-800` | #663202 |
| `primary-brand-900` | #331901 |

### Primary Lime (Green accent)

`primary-lime-{50–900}` — #F1FEF8 (lightest) → #104832 (darkest)

### Primary Sky (Blue accent)

`primary-sky-{50–900}` — #F5FCFF (lightest) → #034C69 (darkest)

### Secondary Palettes

| Palette | Token prefix |
|---|---|
| Purple | `secondary-purple-{50–900}` |
| Blue | `secondary-blue-{50–900}` |
| Yellow | `secondary-yellow-{50–900}` |
| Red | `secondary-red-{50–900}` |

### System Status Colors

| State | Token prefix | Example usage |
|---|---|---|
| Error | `error-{50–900}` | `text-error-500`, `bg-error-50` |
| Success | `success-{50–900}` | `text-success-600`, `bg-success-50` |
| Warning | `warning-{50–900}` | `text-warning-700`, `bg-warning-100` |

**Do this:**
```tsx
<span className="text-error-500">Something went wrong</span>
```
**Not this:**
```tsx
<span style={{ color: '#E53811' }}>Something went wrong</span>
```

---

## Spacing Tokens

Tailwind uses a base-4 spacing scale. `1` unit = `4px`.

| Request | Token | Value |
|---|---|---|
| "4px spacing" | `p-1` / `m-1` / `gap-1` | 4px |
| "8px spacing" | `p-2` / `m-2` / `gap-2` | 8px |
| "12px spacing" | `p-3` / `m-3` / `gap-3` | 12px |
| "16px spacing" | `p-4` / `m-4` / `gap-4` | 16px |
| "20px spacing" | `p-5` / `m-5` / `gap-5` | 20px |
| "24px spacing" | `p-6` / `m-6` / `gap-6` | 24px |
| "28px spacing" | `p-7` / `m-7` / `gap-7` | 28px |
| "32px spacing" | `p-8` / `m-8` / `gap-8` | 32px |
| "40px spacing" | `p-10` / `m-10` / `gap-10` | 40px |
| "48px spacing" | `p-12` / `m-12` / `gap-12` | 48px |
| "64px spacing" | `p-16` / `m-16` / `gap-16` | 64px |

Use directional variants as needed: `px-*` (horizontal), `py-*` (vertical), `pt-*`, `pb-*`, `pl-*`, `pr-*`.

**Do this:**
```tsx
<div className="px-4 py-2">...</div>   // 16px / 8px via tokens
```
**Not this:**
```tsx
<div style={{ padding: '8px 16px' }}>...</div>
```

---

## Border Radius Tokens

| Request | Token class | Value |
|---|---|---|
| "No radius / sharp corners" | `rounded-none` | 0px |
| "4px radius" | `rounded-sm` | 4px |
| "6px radius" | `rounded-md` | 6px |
| "8px radius" | `rounded-lg` | 8px |
| "12px radius" | `rounded-xl` | 12px |
| "16px radius" | `rounded-2xl` | 16px |
| "24px radius" | `rounded-3xl` | 24px |
| "32px radius" | `rounded-4xl` | 32px |
| "Pill / fully rounded" | `rounded-full` | 500px |

**Do this:**
```tsx
<button className="rounded-lg">Click me</button>   // 8px via token
```
**Not this:**
```tsx
<button style={{ borderRadius: '8px' }}>Click me</button>
```

---

## Sizing Tokens (Width / Height)

| Request | Token | Value |
|---|---|---|
| "Height 32px" | `h-8` | 32px |
| "Height 36px" | `h-9` | 36px |
| "Height 40px" | `h-10` | 40px |
| "Height 44px" | `h-11` | 44px |
| "Height 48px" | `h-12` | 48px |
| "Width 100%" | `w-full` | 100% |
| "Width auto" | `w-auto` | auto |

---

## Shadow & Focus Ring Tokens

Prefer ring utilities for focus states rather than custom box-shadows with hardcoded colors.

```tsx
// Focus ring using token
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

For custom shadows that require a specific token color, reference the CSS variable — not a raw hex:

```tsx
// OK — references a CSS variable, not a raw hex
className="shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]"
```

---

## Quick Reference: Common Requests → Tokens

| You say... | Use this |
|---|---|
| "Make the text 14px" | `text-sm` |
| "Make the text orange / brand color" | `text-primary-brand-500` or `text-primary` |
| "Make the background light gray" | `bg-stone-100` or `bg-secondary` |
| "Add 16px padding" | `p-4` |
| "Add 24px gap between items" | `gap-6` |
| "Make it 8px rounded" | `rounded-lg` |
| "Make it fully rounded / pill shape" | `rounded-full` |
| "Use the error red" | `text-error-500` / `bg-error-50` |
| "Use the success green" | `text-success-600` / `bg-success-50` |
| "Use the warning orange" | `text-warning-600` / `bg-warning-100` |
| "Make the text semibold" | `font-semibold` |
| "Use the border color" | `border-border` |
| "Make the text muted / secondary" | `text-muted-foreground` |
| "Disabled state background" | `bg-muted` |
| "Height 40px" | `h-10` |

---

## Adding New Tokens

If a value is used more than once and doesn't map to any existing token, add it to the `@theme` block in `packages/ui/globals.css` — never introduce one-off values inline.

```css
/* packages/ui/globals.css */
@theme {
  --color-my-new-token: #AABBCC;
}
```

Then use it as a Tailwind class: `bg-my-new-token`, `text-my-new-token`.

---

## Tech Stack

- [Turborepo](https://turbo.build/) — Monorepo orchestration
- [pnpm](https://pnpm.io/) — Package manager with workspaces
- [Next.js 16](https://nextjs.org/) — App Router
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS with `@theme` token system
- [shadcn/ui](https://ui.shadcn.com/) — Accessible component primitives
- [Radix UI](https://www.radix-ui.com/) — Headless UI primitives
- [class-variance-authority](https://cva.style/) — Type-safe component variants
- [Lucide React](https://lucide.dev/) — Icon library
- [Manrope](https://fonts.google.com/specimen/Manrope) — Primary typeface
