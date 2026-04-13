# Components Usage

Use only the components from `@level/ui`. Do not create custom replacements when an existing component covers the need. If a component does not exist for your use case, ask the user how to proceed — do not build from scratch.

Source of truth: `COMPONENTS.md` and `packages/ui/components/`.

All imports use `@level/ui/` — the shared package. In your app's layout, import the CSS first:
```tsx
import "@level/ui/globals.css";
```

---

## Page Shell (Required on Every Page)

Every page must use this shell. MainNav and TopBar are fixed to the viewport and do not scroll.

```tsx
import { MainNav } from "@level/ui/components/patterns/main-nav"
import { TopBar } from "@level/ui/components/patterns/top-bar"

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

MainNav takes highest precedence — it sits at the left edge of the viewport. TopBar sits at the top, to the right of MainNav. Neither scrolls. Page content lives in the scrollable `<main>` area.

---

## Layout Patterns

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **MainNav** | 72px dark sidebar with gradient background. Nav items: Home, Analytics, VoC, Convs., Coaching, Calibration, AI workers, Settings. | `import { MainNav } from "@level/ui/components/patterns/main-nav"` | `activeItem`, `onItemClick` | Every page — fixed to the left edge of the viewport. Part of the mandatory page shell. | Do not replace with a custom sidebar or nav. |
| **TopBar** | White header bar with org switcher, help, notifications, and avatar. | `import { TopBar } from "@level/ui/components/patterns/top-bar"` | `organizationName`, `avatarInitial`, `avatarColor` | Every page — fixed at the top, to the right of MainNav. Part of the mandatory page shell. | Do not replace with a custom header bar. |
| **PageHeader** | Composable page-level header with title, back button, breadcrumb, description, meta, actions, nav, and status slots. | `import { PageHeader, PageHeaderRow, PageHeaderTitle, PageHeaderActions, ... } from "@level/ui/components/patterns/page-header"` | `variant` ("default" or "subtle"), `withBorder`; Title: `size` ("xl" or "2xl") | Page-level titles and action bars below TopBar. | Do not build a custom page header from raw divs. |

### PageHeader Sub-components

| Sub-component | Purpose | Notes |
|--------------|---------|-------|
| `PageHeaderRow` | Horizontal row container | Use for layout within the header |
| `PageHeaderBackButton` | Bordered 40px icon button | `onClick` handler for navigation |
| `PageHeaderBreadcrumb` | Breadcrumb slot | Wraps the Breadcrumb component |
| `PageHeaderTitle` | Page title | `size="xl"` (20px) or `size="2xl"` (24px) |
| `PageHeaderDescription` | Subtitle/description text | Below the title |
| `PageHeaderMeta` | Metadata with auto pipe separators | Each child `<span>` is separated by a pipe |
| `PageHeaderActions` | Action buttons slot | Right-aligned buttons |
| `PageHeaderNav` | Previous/Next navigation | `onPrev`, `onNext`, `prevLabel`, `nextLabel` — brand colored |
| `PageHeaderStatus` | Badge slot for status | Accepts a Badge component |

---

## Buttons

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **Button** | Multi-variant button with icon and shortcut support. | `import { Button } from "@level/ui/components/ui/button"` | `variant`: "default" (orange primary), "destructive" (red), "secondary" (outlined), "ghost", "linkPrimary", "linkSecondary". `size`: "sm" (h-32), "default" (h-40), "lg" (h-48), "icon" (36px), "icon-sm" (32px), "icon-lg" (40px). `iconLeft`, `iconRight`, `shortcut`. | CTAs, form submissions, actions, navigation triggers. | Do not use raw `<button>` with custom styles. Do not recreate button variants. |

---

## Form Controls

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **Input** | Text input field (bare). | `import { Input } from "@level/ui/components/ui/input"` | `inputSize` ("default" 40px or "large" 48px), `error`, `placeholder`, `disabled` | When you need just the input element without label/hint. | Do not style raw `<input>` elements. |
| **InputField** | Input with label, hint text, error text, and icon slots. | `import { InputField } from "@level/ui/components/ui/input-field"` | `label`, `hintText`, `errorText`, `iconLeft`, `iconRight`, `inputSize`, `required`, `optional` | Forms, search fields — any input that needs a label or validation message. | Do not manually compose Label + Input. |
| **Textarea** | Multi-line text input (bare). | `import { Textarea } from "@level/ui/components/ui/textarea"` | `placeholder`, `disabled` | When you need just the textarea element. | Do not style raw `<textarea>`. |
| **TextareaField** | Textarea with label, hint text, error text, and character count. | `import { TextareaField } from "@level/ui/components/ui/textarea-field"` | `label`, `hintText`, `errorText`, `showCount`, `maxLength`, `required` | Multi-line form fields with validation. | Do not manually compose Label + Textarea. |
| **RichTextEditor** | Tiptap-based rich text editor with formatting toolbar. | `import { RichTextEditor } from "@level/ui/components/ui/rich-text-editor"` | `label`, `placeholder`, `hintText`, `errorText`, `value`, `onChange`, `required` | Rich text content entry (bold, italic, lists). | Not for plain text inputs. |
| **Checkbox** | Single checkbox (bare). | `import { Checkbox } from "@level/ui/components/ui/checkbox"` | `checked` (true, false, "indeterminate"), `onCheckedChange` | Standalone binary toggle. | Not when you need a label — use CheckboxWithLabel. |
| **CheckboxWithLabel** | Checkbox with label and optional subtext. | `import { CheckboxWithLabel } from "@level/ui/components/ui/checkbox-with-label"` | `label`, `subtext`, `labelPosition` ("right" or "left"), `checked`, `onCheckedChange` | Form checkboxes with labels. | Not for card-style selections — use CheckboxCard. |
| **CheckboxCard** | Card-style checkbox with icon, label, and subtext. | `import { CheckboxCard } from "@level/ui/components/ui/checkbox-card"` | `label`, `subtext`, `icon`, `checked`, `onCheckedChange` | Feature selection, settings cards. | Not for simple form lists. |
| **RadioGroup / RadioGroupItem** | Radio button group. | `import { RadioGroup, RadioGroupItem } from "@level/ui/components/ui/radio-group"` | `value`, `onValueChange` | Single-selection from a list. | Not for multi-select — use checkboxes. |
| **RadioWithLabel** | Radio item with label and subtext. | `import { RadioWithLabel } from "@level/ui/components/ui/radio-with-label"` | `value`, `label`, `subtext` | Radio options with descriptions. | N/A |
| **ToggleSwitch** | Pill-shaped on/off switch (28x16px). | `import { ToggleSwitch } from "@level/ui/components/ui/toggle-switch"` | `checked`, `onCheckedChange`, `disabled` | Boolean on/off settings. | Not for multi-state controls. |
| **ToggleWithLabel** | Toggle switch with label and subtext. | `import { ToggleWithLabel } from "@level/ui/components/ui/toggle-with-label"` | `label`, `subtext`, `labelPosition`, `checked`, `onCheckedChange` | Settings with labels. | N/A |
| **ToggleCard** | Card-style toggle with icon, label, and subtext. | `import { ToggleCard } from "@level/ui/components/ui/toggle-card"` | `label`, `subtext`, `icon`, `checked`, `onCheckedChange` | Feature toggles in card layout. | Not for simple form lists. |
| **Select / SelectField** | Dropdown select built on Radix. | `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectField } from "@level/ui/components/ui/select"` | `SelectField`: `label`, `placeholder`, `hintText`, `errorText`, `required`. `SelectItem`: `value`, `icon`. `inputSize` ("default" or "large"). | Single-value selection from a dropdown. | Not for multi-select — use Multiselect. Not for searchable — use Combobox. |
| **Combobox** | Searchable dropdown with type-ahead filtering. | `import { Combobox } from "@level/ui/components/ui/combobox"` | See demo at `/combobox`. | Searchable single-value selection. | Not for multi-select. |
| **Multiselect** | Multi-value select with Tag chips. | `import { Multiselect } from "@level/ui/components/ui/multiselect"` | See demo at `/multiselect`. | Multi-value selection. | Not for single-value — use Select or Combobox. |
| **Label** | Form field label. | `import { Label } from "@level/ui/components/ui/label"` | `required`, `optional`, `disabled`, `error` | Labeling form fields when not using InputField/SelectField. | Prefer using InputField/SelectField which include labels. |
| **Slider** | Range input. | `import { Slider } from "@level/ui/components/ui/slider"` | See demo at `/slider`. | Numeric range selection. | Not for text input. |
| **Calendar** | Date selection calendar. | `import { Calendar } from "@level/ui/components/ui/calendar"` | See demo at `/calendar`. | Inline date picking. | Not for date input fields — use DatePicker. |
| **DatePicker** | Date input with calendar popover. | `import { DatePicker } from "@level/ui/components/ui/date-picker"` | See demo at `/date-picker`. | Date selection in forms. | Not for always-visible calendars — use Calendar. |
| **FileUpload** | Drag-and-drop file upload zone. | `import { FileUpload } from "@level/ui/components/ui/file-upload"` | See demo at `/file-upload`. | File upload interactions. | N/A |

---

## Data Display

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **Badge** | Pill-shaped colored label. | `import { Badge } from "@level/ui/components/ui/badge"` | `color`: "gray", "primary", "warning", "error", "blue", "purple". `size`: "sm", "md". `outline`, `icon`. | Status labels, counts, category tags. | Not for removable items — use Tag. |
| **Tag** | Pill chip with optional close button and icon. | `import { Tag } from "@level/ui/components/ui/tag"` | `variant`: "default", "brand", "error", "success". `size`: "sm", "md". `onRemove`, `icon`. | Removable chips, filter tags, selected items. | Not for static labels — use Badge. |
| **Avatar** | Colored circle with 2-letter initials or image. | `import { Avatar } from "@level/ui/components/ui/avatar"` | `name`, `size` ("xs" 24px, "sm" 32px, "md" 40px, "lg" 48px), `color`, `src`. | User/entity representation. | N/A |
| **AvatarGroup** | Overlapping avatar stack with "+N" overflow. | `import { AvatarGroup } from "@level/ui/components/ui/avatar-group"` | `names`, `max`, `size`. | Showing multiple users compactly. | Not for single users — use Avatar. |
| **Table** | Styled HTML table primitives. | `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, ... } from "@level/ui/components/ui/table"` | Standard table sub-components. | Simple data tables. | Not for sortable/filterable tables — use DataTable. |
| **DataTable** | Full-featured table with sorting, filtering, and selection. | `import { DataTable } from "@level/ui/components/ui/data-table"` | See demo at `/data-table`. | Complex data tables with interactions. | Not for simple static tables. |
| **Pagination** | Table pagination bar with page size selector. | `import { Pagination } from "@level/ui/components/ui/pagination"` | `currentPage`, `totalPages`, `totalItems`, `pageSize`, `onPageChange`, `onPageSizeChange`, `showPageNumbers`. | Paginated data sets. | Not for infinite scroll. |
| **Skeleton** | Loading placeholder with pulse animation. | `import { Skeleton } from "@level/ui/components/ui/skeleton"` | See demo at `/skeleton`. | Content loading states. | Not for spinner-style loading — use Spinner. |
| **Spinner** | Animated loading indicator. | `import { Spinner } from "@level/ui/components/ui/spinner"` | See demo at `/spinner`. | Action/operation loading state. | Not for content placeholders — use Skeleton. |

---

## Navigation

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **Breadcrumb** | Path breadcrumb navigation. | `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbEllipsis } from "@level/ui/components/ui/breadcrumb"` | `separator` ("/" or "chevron"). `BreadcrumbItem`: `href`. | Hierarchical page navigation. | Not for step indicators — use Steps. |
| **Steps** | Pill-based horizontal step indicator. | `import { Steps } from "@level/ui/components/ui/steps"` | `steps` (array of `{ label, disabled? }`), `currentStep` (0-indexed), `onStepClick`. | Multi-step wizards/flows. | Not for page navigation — use Breadcrumb. |
| **Tabs** | Tabbed content with multiple visual styles. | `import { Tabs, TabsContent, NeutralTabsList, NeutralTabsTrigger, BrandTabsList, BrandTabsTrigger, UnderlinedTabsList, UnderlinedTabsTrigger, VerticalTabsList, VerticalTabsTrigger } from "@level/ui/components/ui/tabs"` | `defaultValue`/`value`, `onValueChange`. Triggers: `icon`, `badge`, `subtext`. | Content organized into switchable views. 4 styles: Neutral (pill/segment), Brand (orange tint), Underlined (bottom border), Vertical. | Do not build custom tab UI. |
| **BackButton** | Navigation back button. | `import { BackButton } from "@level/ui/components/ui/back-button"` | See demo at `/back-button`. | Going back to previous page. | Not for in-page actions. |

---

## Feedback & Overlays

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **AlertToast / toast()** | Dark notification bar with auto-dismiss. | `import { toast } from "@level/ui/hooks/use-toast"` and `import { ToastContainer } from "@level/ui/components/ui/toast-container"` | `toast({ title, description, duration, actionLabel, onAction })`. `ToastContainer`: `position`. | Ephemeral success/info notifications. Mount `<ToastContainer />` in layout. | Not for persistent alerts — use InlineAlert. |
| **InlineAlert** | Persistent in-page alert bar. | `import { InlineAlert } from "@level/ui/components/ui/inline-alert"` | `variant`: "info", "success", "warning", "error". `title`, `description`, `action` ({ label, onClick }), `onDismiss`. | Persistent warnings, errors, or info within a page section. | Not for ephemeral notifications — use toast(). |
| **Tooltip / SimpleTooltip** | Hover tooltip with dark or light theme. | `import { TooltipProvider, SimpleTooltip } from "@level/ui/components/ui/tooltip"` | `content`, `title`, `description`, `side`, `theme` ("dark" or "light"). Wrap app in `<TooltipProvider>`. | Supplementary info on hover. | Not for complex content — use Popover or Sheet. |
| **Modal** | Dialog overlay with backdrop. | `import { Modal } from "@level/ui/components/ui/modal"` | See demo at `/modal`. | Confirmation dialogs, forms requiring focus. | Not for side panels — use Sheet. |
| **Sheet** | Slide-over panel from any edge. | `import { Sheet } from "@level/ui/components/ui/sheet"` | See demo at `/sheet`. | Detail panels, settings panels, secondary content. | Not for simple confirmations — use Modal. |
| **DropdownMenu** | Context/action menu with items, separators, sub-menus. | `import { DropdownMenu } from "@level/ui/components/ui/dropdown-menu"` | See demo at `/dropdown-menu`. | Action menus, context menus. | Not for form selection — use Select. |

InlineAlert usage note:
- Use the component's built-in icon sizing and variant color treatment for standard info, success, warning, and error alerts.
- Do not pass a custom icon or wrap `title` / `description` in custom text-color classes unless the user explicitly asks for a non-standard treatment.
- Prefer plain `title` and `description` strings so the alert keeps the design system's default typography and emphasis.

---

## Content Containers

| Component | What it is | Import | Key props | When to use | When NOT to use |
|-----------|-----------|--------|-----------|-------------|-----------------|
| **Card** | Content container with border and padding. | `import { Card } from "@level/ui/components/ui/card"` | See demo at `/card`. | Grouping related content, data cards, stat cards. | Not for full page layouts. |
| **Accordion** | Collapsible content sections. | `import { Accordion } from "@level/ui/components/ui/accordion"` | See demo at `/accordion`. | Expandable FAQ, settings sections. | Not for tabs — use Tabs. |

---

## Icons (974 custom SVGs + Lucide)

```tsx
import { AlertCircle, Bell01, BarChart01 } from "@level/ui/components/icons"

<AlertCircle size={18} color="currentColor" className="..." />
```

All icons accept: `size` (default 24), `color` (default "currentColor"), `className`.

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

## Utility

| Utility | Import | Purpose |
|---------|--------|---------|
| `cn()` | `import { cn } from "@level/ui/lib/utils"` | Merges Tailwind classes with conflict resolution (clsx + tailwind-merge). Use for conditional classes. |
