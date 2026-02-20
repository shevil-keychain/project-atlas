# Level Design System Playbook

This file is the source of truth for how to build and update pages/components in this repository.

## 1) Naming

- Use `Component` for reusable UI building blocks (example: `Button`, `SelectField`, `DataTable`).
- Use `Pattern` for layout-level reusable structures (example: `MainNav`, `TopBar`, `DemoPageShell`).
- Use `Page` for route files under `app/**/page.tsx`.

Recommended naming for the shared boilerplate:
- `DemoPageShell` (already implemented in `components/patterns/demo-page-shell.tsx`).

## 2) Required Page Boilerplate

All pages should render inside the same shell:
- Left rail: `MainNav`
- Top header: `TopBar`
- Main content background: `stone-100`

This is applied globally in:
- `app/layout.tsx` via `<DemoPageShell>{children}</DemoPageShell>`

Do not manually add `MainNav`/`TopBar` per page unless you are intentionally building a standalone preview.

## 3) Global Styling Rules

Global tokens and shared styling are defined in:
- `app/globals.css`

Rules:
- Prefer design tokens/classes already defined there.
- Do not hardcode ad-hoc colors unless there is no token for the requirement.
- Keep typography and spacing consistent with existing components.

## 4) Component Structure Rules

When creating/updating a component:
- Place component in `components/ui/*` for primitive UI.
- Place layout patterns in `components/patterns/*`.
- Keep props typed and explicit.
- Keep visual states in className logic (`default`, `hover`, `active`, `disabled`, `error`, etc.).
- Reuse existing shared components before creating parallel implementations.

## 5) Table/Data Table Consistency Rule

- `DataTable` must use shared table primitives from `components/ui/table.tsx`.
- Any styling/behavior changes made in `Table` should naturally reflect in `DataTable`.
- Cell-level custom renderers (for example avatar size) must align with current table design decisions.

## 6) Demo Page Rule

Each demo page should:
- Focus on component examples only.
- Avoid duplicating app chrome (`MainNav`/`TopBar`) because shell provides it.
- Use the shared page background inherited from shell (`stone-100`).

## 7) Update Workflow (for agents)

Before coding:
1. Read this file.
2. Read `app/globals.css`.
3. Reuse existing primitives/patterns instead of duplicating UI.

After coding:
1. Run lint on touched files.
2. Run typecheck (`tsc --noEmit`).
3. Ensure shell consistency remains intact.

