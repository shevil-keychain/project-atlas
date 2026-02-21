# Level AI — Component Reference

This is the definitive reference for every component in the Level AI design system. **Read this file before writing any UI code.** Use only these components and tokens. Do not create custom replacements when an existing component covers the need.

For design tokens (colors, spacing, typography, radius, shadows), see `README.md`.
For raw CSS variables, see `packages/ui/globals.css`.

All imports below use `@level/ui/` — the shared package. In your app's layout, import the CSS first:
```tsx
import "@level/ui/globals.css";
```

---

## Page Layout

Every page follows this shell:

```tsx
export default function Page() {
  return (
    <div className="flex h-screen">
      <MainNav activeItem="Analytics" />
      <div className="flex flex-1 flex-col">
        <TopBar organizationName="Acme Corp" />
        <main className="flex-1 overflow-auto p-24">
          {/* page content */}
        </main>
      </div>
    </div>
  )
}
```

Build one component or section at a time. Never build an entire page in one pass.

---

## Patterns (`components/patterns/`)

### MainNav

```tsx
import { MainNav } from "@level/ui/components/patterns/main-nav"

<MainNav activeItem="Home" onItemClick={setActive} />
```

72px dark sidebar with gradient bg. Items: Home, Analytics, VoC, Convs., Coaching, Calibration, AI workers, Settings.

### TopBar

```tsx
import { TopBar } from "@level/ui/components/patterns/top-bar"

<TopBar organizationName="Acme Corp" avatarInitial="J" avatarColor="#E0593E" />
```

White header bar with org switcher, help, notifications, avatar.

### PageHeader

```tsx
import {
  PageHeader, PageHeaderRow, PageHeaderBackButton, PageHeaderBreadcrumb,
  PageHeaderTitle, PageHeaderDescription, PageHeaderMeta, PageHeaderActions,
  PageHeaderNav, PageHeaderStatus,
} from "@level/ui/components/patterns/page-header"

<PageHeader variant="default|subtle" withBorder>
  <PageHeaderRow>
    <div className="flex items-center gap-16">
      <PageHeaderBackButton onClick={() => router.back()} />
      <PageHeaderTitle size="xl|2xl">Page title</PageHeaderTitle>
    </div>
    <PageHeaderActions>
      <Button>Primary action</Button>
    </PageHeaderActions>
  </PageHeaderRow>
</PageHeader>
```

**Slots:** BackButton (bordered 40px icon button), Breadcrumb, Title (size `xl` 20px or `2xl` 24px), Description, Meta (auto pipe separators between children), Actions, Nav (prev/next with brand color), Status (Badge slot). `variant="subtle"` for gray bg.

```tsx
<PageHeaderMeta>
  <span>Marcus Baptista</span>
  <span>Acme Inc</span>
  <span>42 mins</span>
</PageHeaderMeta>

<PageHeaderNav onPrev={fn} onNext={fn} prevLabel="Prev" nextLabel="Next" />
```

---

## Core UI (`components/ui/`)

### Button

```tsx
import { Button } from "@level/ui/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="linkPrimary">Link</Button>
<Button variant="linkSecondary">Link</Button>
<Button size="sm|default|lg|icon|icon-sm|icon-lg">...</Button>
<Button iconLeft={<Icon />} iconRight={<Icon />}>With Icons</Button>
<Button shortcut="⌘+B">Toggle sidebar</Button>
```

**Variants:** `default` (orange primary), `destructive` (red), `secondary` (outlined), `ghost`, `linkPrimary`, `linkSecondary`
**Sizes:** `sm` (h-32), `default` (h-40), `lg` (h-48), `icon` (size-36), `icon-sm` (size-32), `icon-lg` (size-40)

### Checkbox

```tsx
import { Checkbox } from "@level/ui/components/ui/checkbox"
import { CheckboxWithLabel } from "@level/ui/components/ui/checkbox-with-label"
import { CheckboxCard } from "@level/ui/components/ui/checkbox-card"

<Checkbox />
<Checkbox checked={true} />
<Checkbox checked="indeterminate" />
<CheckboxWithLabel label="Option" subtext="Description" labelPosition="right|left" />
<CheckboxCard label="Card Option" subtext="Description" icon={<Icon />} checked={true} />
```

### Radio Group

```tsx
import { RadioGroup, RadioGroupItem } from "@level/ui/components/ui/radio-group"
import { RadioWithLabel } from "@level/ui/components/ui/radio-with-label"

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="a" />
  <RadioWithLabel value="b" label="Option B" subtext="Description" />
</RadioGroup>
```

### Toggle Switch

```tsx
import { ToggleSwitch } from "@level/ui/components/ui/toggle-switch"
import { ToggleWithLabel } from "@level/ui/components/ui/toggle-with-label"
import { ToggleCard } from "@level/ui/components/ui/toggle-card"

<ToggleSwitch />
<ToggleSwitch checked={true} onCheckedChange={setChecked} />
<ToggleSwitch disabled />
<ToggleWithLabel label="Enable feature" subtext="Description" labelPosition="right|left" />
<ToggleCard label="Feature" subtext="Description" icon={<Icon />} checked={true} />
```

28×16px pill switch using Radix Switch. Same composition pattern as Checkbox (base, with-label, card).

### Badge

```tsx
import { Badge } from "@level/ui/components/ui/badge"

<Badge color="gray|primary|warning|error|blue|purple">Label</Badge>
<Badge size="sm|md">Label</Badge>
<Badge outline>Outlined</Badge>
<Badge icon={<CheckCircle />}>With Icon</Badge>
```

Pill-shaped colored labels. 6 colors, 2 sizes, optional outline border, optional leading icon.

### Tag

```tsx
import { Tag } from "@level/ui/components/ui/tag"

<Tag variant="default|brand|error|success" size="sm|md">Label</Tag>
<Tag onRemove={() => {}}>Removable</Tag>
<Tag icon={<CheckCircle2 />}>With icon</Tag>
```

Pill chip with optional close button and leading icon. Variants: default (stone), brand, error, success. Sizes: sm, md.

### Tabs

```tsx
import {
  Tabs, TabsContent,
  NeutralTabsList, NeutralTabsTrigger,
  BrandTabsList, BrandTabsTrigger,
  UnderlinedTabsList, UnderlinedTabsTrigger,
  VerticalTabsList, VerticalTabsTrigger,
} from "@level/ui/components/ui/tabs"

<Tabs defaultValue="tab1">
  <NeutralTabsList>
    <NeutralTabsTrigger value="tab1">Tab 1</NeutralTabsTrigger>
    <NeutralTabsTrigger value="tab2" icon={<Icon />}>Tab 2</NeutralTabsTrigger>
    <NeutralTabsTrigger value="tab3" badge={<Badge>3</Badge>}>Tab 3</NeutralTabsTrigger>
  </NeutralTabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
</Tabs>
```

4 styles: Neutral (pill/segment), Brand (orange tint), Underlined (bottom border), Vertical. All triggers accept `icon`, `badge`, `subtext` props.

### Breadcrumb

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator,
  BreadcrumbPage, BreadcrumbEllipsis,
} from "@level/ui/components/ui/breadcrumb"

<Breadcrumb separator="/">
  <BreadcrumbList>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbPage>Profile</BreadcrumbPage>
  </BreadcrumbList>
</Breadcrumb>
```

Separators: `/` or `chevron`. BreadcrumbItem uses Next.js `Link` when `href` is set.

### Steps

```tsx
import { Steps } from "@level/ui/components/ui/steps"

const steps = [
  { label: "Name and type" },
  { label: "Customer behavior" },
  { label: "Agent behavior" },
  { label: "Settings", disabled: true },
]
<Steps steps={steps} currentStep={1} onStepClick={(i) => setStep(i)} />
```

Pill-based horizontal step indicator. Props: `steps: { label: string; disabled?: boolean }[]`, `currentStep` (0-indexed), optional `onStepClick(index)`. States: completed, active (brand-colored), upcoming, disabled.

### Avatar

```tsx
import { Avatar } from "@level/ui/components/ui/avatar"
import { AvatarGroup } from "@level/ui/components/ui/avatar-group"

<Avatar name="John Doe" size="xs|sm|md|lg" />
<Avatar name="Jane" color="#9062CB" />
<Avatar name="User" src="/photo.jpg" />
<AvatarGroup names={["Alice", "Bob", "Carol", "Dave"]} max={3} size="sm" />
```

Colored circles with 2-letter initials. 14 auto-assigned colors (hash-based). 4 sizes (24/32/40/48px). AvatarGroup shows overlapping avatars with "+N" overflow.

### Alert / Toast

```tsx
import { AlertToast } from "@level/ui/components/ui/alert-toast"
import { ToastContainer } from "@level/ui/components/ui/toast-container"
import { toast, dismissToast, useToast } from "@level/ui/hooks/use-toast"

<AlertToast title="Saved" description="Changes saved" actionLabel="Undo" onAction={fn} onClose={fn} />

toast({ title: "Saved!", description: "Optional detail", duration: 5000 })
toast({ title: "Action needed", actionLabel: "Undo", onAction: () => {} })

// Mount container in layout
<ToastContainer position="top-center|top-right|bottom-center|bottom-right" />
```

Dark notification bars (`bg-stone-800`). Imperative `toast()` API with auto-dismiss.

### Inline Alert

```tsx
import { InlineAlert } from "@level/ui/components/ui/inline-alert"

<InlineAlert variant="info|success|warning|error" title="Title" description="Optional detail." />
<InlineAlert variant="warning" title="Warning" action={{ label: "Fix", onClick: fn }} onDismiss={fn} />
```

Persistent alert bar. Variants: info (blue), success, warning (yellow), error. Optional title, description, action button, dismiss.

### Tooltip

```tsx
import {
  TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, SimpleTooltip,
} from "@level/ui/components/ui/tooltip"

<TooltipProvider delayDuration={200}>
  <SimpleTooltip content="Tooltip text" side="top" theme="dark|light">
    <button>Hover me</button>
  </SimpleTooltip>

  <SimpleTooltip title="Title" description="Detail text" theme="light">
    <button>Detailed tooltip</button>
  </SimpleTooltip>
</TooltipProvider>
```

Two themes: dark (`bg-[#1B2432]`) and light (white with border). 8 positions via `side` + `align`.

### Label

```tsx
import { Label } from "@level/ui/components/ui/label"

<Label>Email</Label>
<Label required>Password</Label>
<Label optional>Nickname</Label>
<Label disabled>Archived</Label>
<Label error>Invalid field</Label>
```

### Input

```tsx
import { Input } from "@level/ui/components/ui/input"
import { InputField } from "@level/ui/components/ui/input-field"

<Input placeholder="Enter email..." />
<Input inputSize="large" />
<Input error />

<InputField label="Email" hintText="We'll never share your email." placeholder="you@example.com" />
<InputField label="Search" iconLeft={<Search />} placeholder="Search..." />
<InputField label="Category" iconRight={<ChevronDown />} />
<InputField label="Email" errorText="Invalid email address." required />
<InputField label="Name" inputSize="large" optional />
```

Two sizes: `default` (40px) and `large` (48px). States: default, hover, focus (orange ring), error (red ring), disabled. InputField composes Label + Input + hint/error text + icon slots.

### Textarea

```tsx
import { Textarea } from "@level/ui/components/ui/textarea"
import { TextareaField } from "@level/ui/components/ui/textarea-field"

<Textarea placeholder="Enter description..." />
<TextareaField label="Description" hintText="Max 500 characters." showCount maxLength={500} />
<TextareaField label="Notes" errorText="Required field." required />
```

TextareaField adds label, hint/error text, and optional character count with over-limit warning.

### Rich Text Editor

```tsx
import { RichTextEditor } from "@level/ui/components/ui/rich-text-editor"

<RichTextEditor label="Content" placeholder="Start writing..." hintText="Supports formatting." />
<RichTextEditor label="Response" errorText="Content required." required />
<RichTextEditor value={html} onChange={setHtml} />
```

Tiptap-based editor with toolbar: Bold, Italic, Strikethrough, Bullet list, Ordered list, Undo, Redo. Same border/focus/error states as Input.

### Select

```tsx
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  SelectGroup, SelectLabel, SelectSeparator, SelectField,
} from "@level/ui/components/ui/select"

<SelectField label="Country" placeholder="Select a country" hintText="Choose your country.">
  <SelectItem value="us">United States</SelectItem>
  <SelectItem value="uk">United Kingdom</SelectItem>
  <SelectItem value="ca" icon={<Flag />}>Canada</SelectItem>
</SelectField>

<SelectField label="Plan" errorText="Selection required." required>
  <SelectItem value="free">Free</SelectItem>
  <SelectItem value="pro">Pro</SelectItem>
</SelectField>

<Select value={val} onValueChange={setVal}>
  <SelectTrigger inputSize="large"><SelectValue placeholder="Pick one" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>
```

Dropdown select built on Radix. Trigger styled like Input (same sizes, border states). Menu items with hover highlight, selected state (orange bg + checkmark), optional leading icon.

### Combobox

```tsx
import { Combobox } from "@level/ui/components/ui/combobox"
```

Searchable dropdown with type-ahead filtering. See the demo page at `/combobox` for full usage.

### Multiselect

```tsx
import { Multiselect } from "@level/ui/components/ui/multiselect"
```

Multi-value select using Tag chips for selected items. See the demo page at `/multiselect` for full usage.

### Pagination

```tsx
import { Pagination } from "@level/ui/components/ui/pagination"

<Pagination
  currentPage={1}
  totalPages={23}
  totalItems={225}
  pageSize={10}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>

<Pagination
  currentPage={1}
  totalPages={48}
  totalItems={475}
  pageSize={10}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  showPageNumbers={false}
/>
```

Table pagination bar. Two modes: `showPageNumbers` (numbered page buttons with ellipsis truncation) and no-numbers (first/prev/next/last chevrons). Active page: brand orange bg. "Results per page" dropdown uses design system Select.

### Table

```tsx
import {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
} from "@level/ui/components/ui/table"
```

Styled HTML table primitives. See the demo page at `/table` for full usage.

### Data Table

```tsx
import { DataTable } from "@level/ui/components/ui/data-table"
```

Full-featured table with sorting, filtering, and selection. See the demo page at `/data-table` for full usage.

### Modal

```tsx
import { Modal } from "@level/ui/components/ui/modal"
```

Dialog overlay with backdrop. See the demo page at `/modal` for full usage.

### Sheet

```tsx
import { Sheet } from "@level/ui/components/ui/sheet"
```

Slide-over panel from any edge. See the demo page at `/sheet` for full usage.

### Accordion

```tsx
import { Accordion } from "@level/ui/components/ui/accordion"
```

Collapsible content sections. See the demo page at `/accordion` for full usage.

### Dropdown Menu

```tsx
import { DropdownMenu } from "@level/ui/components/ui/dropdown-menu"
```

Context/action menu with items, separators, and sub-menus. See the demo page at `/dropdown-menu` for full usage.

### Card

```tsx
import { Card } from "@level/ui/components/ui/card"
```

Content container with border and padding. See the demo page at `/card` for full usage.

### Skeleton

```tsx
import { Skeleton } from "@level/ui/components/ui/skeleton"
```

Loading placeholder with pulse animation. See the demo page at `/skeleton` for full usage.

### Spinner

```tsx
import { Spinner } from "@level/ui/components/ui/spinner"
```

Animated loading indicator. See the demo page at `/spinner` for full usage.

### Slider

```tsx
import { Slider } from "@level/ui/components/ui/slider"
```

Range input. See the demo page at `/slider` for full usage.

### Calendar / Date Picker

```tsx
import { Calendar } from "@level/ui/components/ui/calendar"
import { DatePicker } from "@level/ui/components/ui/date-picker"
```

Date selection components. See the demo pages at `/calendar` and `/date-picker` for full usage.

### File Upload

```tsx
import { FileUpload } from "@level/ui/components/ui/file-upload"
```

Drag-and-drop file upload zone. See the demo page at `/file-upload` for full usage.

### Back Button

```tsx
import { BackButton } from "@level/ui/components/ui/back-button"
```

Navigation back button. See the demo page at `/back-button` for full usage.

---

## Icons (974 custom SVGs)

```tsx
import { AlertCircle, Bell01, BarChart01 } from "@level/ui/components/icons"

<AlertCircle size={18} color="currentColor" className="..." />
```

All icons accept: `size` (default 24), `color` (default "currentColor"), `className`.

### Categories

| Category | Count | Examples |
|----------|-------|---------|
| alerts | 26 | AlertCircle, AlertTriangle, Bell01–04, Announcement01–03 |
| arrows | 94 | ArrowUp/Down/Left/Right, ChevronUp/Down, SortOrderAscending |
| charts | 49 | BarChart01–10, LineChart01–05, PieChart01–04 |
| development | 59 | Code01–02, Terminal, Database01–03, Server01–06 |
| files | 57 | File01–07, Folder, Clipboard, Attachment01–02 |
| finance | 79 | CreditCard01–02, CurrencyDollar, Bank, Receipt |
| general | 195 | Activity, Bookmark, Calendar, Clock, Edit, Eye, Filter, Globe, Heart, Home, Link, Lock, Mail, Pin, Search, Settings, Share, Star, Tag, Trash, Zap |
| layout | 64 | Grid01–03, Columns01–03, Rows01–03, Table |
| media | 109 | Camera01–03, Image01–05, Microphone01–02, Video, Volume |
| security | 36 | Lock01–04, Key01–02, Shield01–03, Fingerprint |
| users | 41 | User01–03, UserPlus, Users01–03, UserCircle |
| weather | 52 | Sun, Moon, Cloud01–03, Droplets01–03, Lightning01–02 |

Lucide React icons are also available (`lucide-react` is installed).

---

## Utility: `cn()`

```tsx
import { cn } from "@level/ui/lib/utils"

className={cn("base-classes", conditional && "applied-if-true", className)}
```

Merges Tailwind classes with conflict resolution via `clsx` + `tailwind-merge`.
