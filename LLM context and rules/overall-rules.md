# Overall Rules

These rules apply to all agent work in this design system. Follow them without exception.

---

## Rule 1: No CSS Outside of Tokens

Never use any styling that falls outside the design token system. This means:

- No raw hex colors (`#ff7b00`, `#333`, etc.) — use semantic color tokens.
- No arbitrary Tailwind values (`text-[14px]`, `p-[13px]`, `rounded-[10px]`, `bg-[#ff0000]`) — use token-based classes.
- No hardcoded font sizes, spacing, radii, or shadows — every value must map to a token defined in `packages/ui/globals.css`.
- No inline `style` attributes for colors, spacing, or typography.
- No custom CSS classes that define colors, spacing, or typography outside the token system.

If a value you need does not exist in the token system, ask the user before inventing one.

---

## Rule 2: No Components Outside the Design System

Use only components from `@level/ui` (documented in `COMPONENTS.md` and `LLM context and rules/components-usage.md`). This means:

- Do not create custom Button, Input, Modal, Card, Table, Badge, or any other component that already exists in the design system.
- Do not use raw HTML elements (`<button>`, `<input>`, `<table>`, `<dialog>`) with custom styling when a design system component exists.
- Do not install or use third-party component libraries (e.g., Material UI, Chakra, Ant Design) — the design system is the single source.

**If a component you need does not exist**, do not build it from scratch. Instead, ask the user what to do. The options are:
1. Use the closest existing component and compose/adapt it.
2. Add a new component to the design system first (in `packages/ui/components/ui/` or `packages/ui/components/patterns/`), following existing patterns (CVA variants, `cn()` for class merging, design tokens only).

---

## Rule 3: Assemble, Do Not Invent

Your job is not to write components from scratch. It is to **assemble existing components into views** based on the user's input.

- Take the user's requirements and compose pages/views from the existing component library.
- Prefer composition over creation — combine existing components (PageHeader + Tabs + DataTable + Pagination, etc.) rather than building new ones.
- Build incrementally: layout shell first (MainNav + TopBar), then PageHeader, then individual sections. Never scaffold an entire page in one pass.
- Use `cn()` from `@level/ui/lib/utils` for conditional class merging.

---

## Rule 4: MainNav and TopBar on Every Page

MainNav and TopBar are the outermost shell components. They are mandatory on every page.

**Layout hierarchy:**
1. **MainNav** — fixed to the **left edge** of the viewport. 72px wide. Highest precedence in the layout. Does not scroll.
2. **TopBar** — fixed to the **top** of the viewport, to the right of MainNav. Spans the remaining horizontal width. Does not scroll.
3. **Page content** — the scrollable area below TopBar and to the right of MainNav.

**Required shell structure:**
```tsx
<div className="flex h-screen">
  <MainNav activeItem="..." />
  <div className="flex flex-1 flex-col">
    <TopBar organizationName="..." />
    <main className="flex-1 overflow-auto p-24">
      {/* page content goes here */}
    </main>
  </div>
</div>
```

Do not omit MainNav or TopBar from any page. Do not replace them with custom alternatives. Do not put them inside the scrollable area.

---

## Rule 5: Page-Level Containers Must Be Edge-to-Edge

The first content container inside `<main>` must be edge-to-edge relative to the shell area (between MainNav and viewport right edge, and between TopBar and viewport bottom).

- Do not add an outer rounded corner on this first container.
- Do not add an outer border on this first container.
- Do not add page-level inset padding that creates a framed card look around the full page content.
- Apply borders/radius only to inner components (tables, cards, panels), not to the full-page wrapper.

## Rule 6: Use Sentence Case for UI Copy

All product UI copy should use sentence case by default.

- Use sentence case for button labels, tabs, inline alerts, helper text, empty states, card headings, and other interface copy.
- Do not use Title Case for UI copy unless the text is a proper noun, brand name, feature name, acronym, or another intentional exception.
- Preserve exact capitalization for names like "QA", "AI", organization names, and any user-provided proper nouns.

---

## Rule 7: Default Text Size Is 14px

All body and UI text defaults to `text-14`. Only deviate downward (to `text-12` or `text-10`) when there is a deliberate, justified hierarchy reason — captions, timestamps, badge labels, fine print. Never use a smaller size just to fit more content.

- Default to `text-14` for labels, descriptions, row content, helper text, and any text that isn't explicitly a caption or micro-label.
- Use `text-12` only for metadata, timestamps, badge text, and secondary captions that are intentionally de-emphasized.
- Use `text-10` only for the smallest micro-labels (e.g. two-letter abbreviations, tight pill text).

---

## Rule 8: No Tertiary Text Color

Do not use `text-text-tertiary` in any UI. It is too low-contrast and creates visual hierarchy noise.

- Use `text-text-secondary` wherever you would reach for tertiary — for de-emphasized content, metadata, helper text, and subtitles.
- Reserve `text-text-primary` for headings, labels, and primary content.
- The only permitted text color exceptions are semantic states: `text-text-brand`, `text-text-error`, `text-text-success`, `text-text-warning`, `text-text-inverse` (on dark/brand surfaces), and `text-text-disabled` (disabled controls).
