import Link from "next/link";

const components = [
  { name: "Button", href: "/button" },
  { name: "Checkbox", href: "/checkbox" },
  { name: "Radio", href: "/radio" },
  { name: "Toggle", href: "/toggle" },
  { name: "Badge", href: "/badge" },
  { name: "Tabs", href: "/tabs" },
  { name: "Avatar", href: "/avatar" },
  { name: "Alert / Toast", href: "/alert" },
  { name: "Tooltip", href: "/tooltip" },
  { name: "Label", href: "/label" },
  { name: "Input", href: "/input" },
  { name: "Textarea & Rich Text Editor", href: "/textarea" },
  { name: "Select", href: "/select" },
  { name: "Combobox", href: "/combobox" },
  { name: "Multiselect", href: "/multiselect" },
  { name: "Date Picker", href: "/date-picker" },
  { name: "Slider", href: "/slider" },
  { name: "File Upload", href: "/file-upload" },
  { name: "Modal", href: "/modal" },
  { name: "Sheet", href: "/sheet" },
  { name: "Dropdown Menu", href: "/dropdown-menu" },
  { name: "Accordion", href: "/accordion" },
  { name: "Breadcrumb", href: "/breadcrumb" },
  { name: "Steps", href: "/steps" },
  { name: "Inline Alert", href: "/inline-alert" },
  { name: "Tag", href: "/tag" },
  { name: "Page Header", href: "/page-header" },
  { name: "Main Nav", href: "/main-nav" },
  { name: "Top Bar", href: "/top-bar" },
  { name: "Table", href: "/table" },
  { name: "Pagination", href: "/pagination" },
  { name: "Data Table", href: "/data-table" },
  { name: "Card", href: "/card" },
  { name: "Skeleton", href: "/skeleton" },
  { name: "Spinner", href: "/spinner" },
];

export default function Home() {
  return (
    <div className="min-h-screen p-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Level AI Design System
        </h1>
        <p className="text-stone-700 mb-8">
          Component library for prototyping Level AI interfaces.
        </p>
        <div className="grid gap-3">
          {components.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-lg border border-stone-300 px-4 py-3 text-sm font-semibold hover:border-primary-brand-400 hover:bg-primary-brand-25 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
