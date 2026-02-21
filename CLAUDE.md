# Level AI Design System — Claude Code Instructions

Turborepo monorepo with a shared UI package and independent app workspaces (prototypes, demos). Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

---

## Mandatory First Step

Before writing or modifying any UI code, read these files in full:

1. `COMPONENTS.md` — complete component API reference (imports, props, variants, usage)
2. `README.md` — design tokens (colors, spacing, typography, radius, shadows)

Do not skip this step.

## Monorepo Structure

```
packages/
  ui/                 # @level/ui — the shared design system package
    components/
      ui/             # Base UI components (Button, Input, Badge, etc.)
      patterns/       # Composite patterns (MainNav, TopBar, PageHeader)
      icons/          # 974 custom SVG icons
    hooks/            # Shared hooks (useToast)
    lib/utils.ts      # cn() helper
    globals.css       # All design tokens (@theme)

apps/
  docs/               # @level/docs — component browser & demo pages
  <prototype>/        # Each prototype is an independent Next.js app
```

## Creating a New Prototype App

1. Copy the boilerplate:
```bash
cp -r apps/docs apps/<prototype-name>
```

2. Update `apps/<prototype-name>/package.json`:
```json
{
  "name": "@level/<prototype-name>",
  "dependencies": {
    "@level/ui": "workspace:*"
  }
}
```

3. Update the port in the dev script to avoid conflicts:
```json
"dev": "next dev --port 3001"
```

4. Import the design system CSS in your layout:
```tsx
import "@level/ui/globals.css";
```

5. Import components from the package:
```tsx
import { Button } from "@level/ui/components/ui/button"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { AlertCircle } from "@level/ui/components/icons"
import { cn } from "@level/ui/lib/utils"
```

6. Install dependencies from the root:
```bash
pnpm install
```

## Rules

### Source of Truth

- `Rules/` is the source of truth for all rules
- `.cursor/rules/` contains symlinks only — never edit files there directly
- After adding, removing, or renaming a rule, run: `bash scripts/sync-symlinks.sh`

### Component Adherence

1. **Use existing components** — if `packages/ui/components/ui/` or `packages/ui/components/patterns/` has what you need, use it. Do not recreate.
2. **Use design tokens** — all colors, spacing, font sizes, radii, and shadows come from `packages/ui/globals.css`. Never hardcode raw values.
3. **Use `cn()` for conditional classes** — import from `@level/ui/lib/utils`.
4. **Follow import conventions** — always import from `@level/ui/`.
5. **Build incrementally** — layout shell first, then page header, then individual sections. Never scaffold an entire page in one pass.
6. **Check demo pages** — each component has a demo at `apps/docs/app/[component-name]/page.tsx` with full examples.

### Extending the System

Only create new components when no existing one can be composed or extended. New components must:
- Live in `packages/ui/components/ui/` (base) or `packages/ui/components/patterns/` (composite)
- Use design tokens exclusively
- Follow existing prop patterns (variant, size, className)
- Use `cn()` for class merging and CVA for variant definitions

## Commands

```bash
pnpm dev              # Start all apps in parallel
pnpm dev:docs         # Start docs app only
pnpm build            # Build all apps
pnpm install          # Install all workspace dependencies
```

## Tech Stack

- Turborepo (monorepo orchestration)
- pnpm workspaces
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4 (CSS `@theme` tokens, no JS config)
- shadcn/ui + Radix UI primitives
- class-variance-authority (component variants)
- clsx + tailwind-merge (className utilities)
- Tiptap (rich text editor)
- Lucide React + 974 custom icons
- Manrope typeface
