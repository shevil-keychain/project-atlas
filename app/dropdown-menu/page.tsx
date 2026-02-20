"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  Copy,
  Pencil,
  Trash2,
  Share,
  MoreHorizontal,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function DropdownMenuDemoPage() {
  const [showStatus, setShowStatus] = React.useState(true)
  const [showPriority, setShowPriority] = React.useState(false)
  const [showDueDate, setShowDueDate] = React.useState(true)
  const [sortOrder, setSortOrder] = React.useState("name")

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Dropdown Menu</h1>
          <p className="mt-1 text-sm text-stone-700">
            Action menus with icons, separators, checkbox items, radio groups, sub-menus, and destructive actions.
          </p>
        </div>

        <Section title="Basic Menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem destructive>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="With Icons">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share /> Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="With Labels & Separators">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Team</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserPlus /> Invite
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>
                <LogOut /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Checkbox Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">View</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Columns</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showStatus}
                onCheckedChange={setShowStatus}
              >
                Status
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPriority}
                onCheckedChange={setShowPriority}
              >
                Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showDueDate}
                onCheckedChange={setShowDueDate}
              >
                Due Date
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Radio Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="date-created">Date created</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="last-modified">Last modified</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="With Sub-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>New tab</DropdownMenuItem>
              <DropdownMenuItem>New window</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail /> Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare /> Message
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Disabled Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">File</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <PlusCircle /> New
              </DropdownMenuItem>
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Save</DropdownMenuItem>
              <DropdownMenuItem disabled>Save As</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>
      </div>
    </div>
  )
}
