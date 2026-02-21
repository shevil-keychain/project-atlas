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
