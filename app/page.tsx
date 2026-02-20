import Link from "next/link";

const components = [
  { name: "Button", href: "/button" },
  { name: "Checkbox", href: "/checkbox" },
  { name: "Radio", href: "/radio" },
  { name: "Main Nav", href: "/main-nav" },
  { name: "Top Bar", href: "/top-bar" },
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
