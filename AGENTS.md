# Level AI Design System — Agent Instructions

Turborepo monorepo with a shared UI package and independent app workspaces (prototypes, demos). Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

---

## Mandatory First Step

Before writing or modifying any UI code — regardless of the user's query — read every file in the folder `LLM context and rules` at the repository root:

1. `LLM context and rules/tokens-usage.md` — design token reference (colors, spacing, typography, radius, shadows)
2. `LLM context and rules/components-usage.md` — component API reference (imports, props, usage)
3. `LLM context and rules/overall-rules.md` — strict rules for token-only CSS, component-only UI, assembly-first workflow, and mandatory page shell
4. `LLM context and rules/project-setup.md` — monorepo structure, prototype creation steps, component adherence, tech stack

Do not skip this step.

## Rules Source of Truth

- `Rules/` is the source of truth for all rules
- `.cursor/rules/` contains symlinks only — never edit files there directly
- After adding, removing, or renaming a rule, run: `bash scripts/sync-symlinks.sh`
