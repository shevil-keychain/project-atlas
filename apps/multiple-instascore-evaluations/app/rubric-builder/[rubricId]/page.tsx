"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronUp,
  Percent02,
  Plus,
  SearchMd,
  X,
} from "@level/ui/components/icons"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderRow,
  PageHeaderTitle,
} from "@level/ui/components/patterns/page-header"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Badge } from "@level/ui/components/ui/badge"
import { Button } from "@level/ui/components/ui/button"
import { Card, CardBody, CardHeader } from "@level/ui/components/ui/card"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@level/ui/components/ui/modal"
import { Input } from "@level/ui/components/ui/input"
import { InputField } from "@level/ui/components/ui/input-field"
import { RadioGroup } from "@level/ui/components/ui/radio-group"
import { RadioWithLabel } from "@level/ui/components/ui/radio-with-label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@level/ui/components/ui/select"
import { ToggleSwitch } from "@level/ui/components/ui/toggle-switch"
import { cn } from "@level/ui/lib/utils"

type SettingsSection = {
  heading: string
  items: Array<{
    label: string
    active?: boolean
  }>
}

type RubricRecord = {
  id: string
  name: string
  description: string
  previewLines: string[]
}

type CategoryRow = {
  id: string
  name: string
  weight: string
}

const settingsSections: SettingsSection[] = [
  {
    heading: "Organization",
    items: [
      { label: "Users" },
      { label: "Teams" },
      { label: "Roles and permissions" },
      { label: "Audit logs" },
      { label: "Business week" },
      { label: "Notifications" },
      { label: "Report sharing" },
      { label: "Analytics alerts" },
    ],
  },
  {
    heading: "QA",
    items: [
      { label: "QA preferences" },
      { label: "Rubric builder", active: true },
      { label: "Case assignment" },
      { label: "Coaching templates" },
    ],
  },
  {
    heading: "Voice of the customer",
    items: [{ label: "Topics" }],
  },
  {
    heading: "Agent assist",
    items: [{ label: "Real-time alerts" }],
  },
  {
    heading: "Data enrichment",
    items: [
      { label: "Conversation tags" },
      { label: "Metric tags" },
      { label: "AI summary" },
    ],
  },
  {
    heading: "Data ingestion",
    items: [
      { label: "Integrations" },
      { label: "Custom fields" },
      { label: "Transcript tools" },
      { label: "Surveys" },
    ],
  },
]

const rubrics: RubricRecord[] = [
  {
    id: "debt-management-qa",
    name: "Debt management QA rubric",
    description: "Quality review scorecard for debt management specialists.",
    previewLines: [
      "Did the agent explain the next payment steps clearly?",
      "Was the hardship discussion documented correctly?",
    ],
  },
  {
    id: "debt-management-compliance",
    name: "Debt management compliance rubric",
    description: "Compliance review for debt management workflows.",
    previewLines: [
      "Did the agent disclose the required compliance language?",
      "Was consent captured before discussing account details?",
    ],
  },
  {
    id: "credit-management-qa",
    name: "Credit management QA rubric",
    description: "QA rubric for credit management customer interactions.",
    previewLines: [
      "Did the agent verify the customer correctly?",
      "Was the payment arrangement summarized before ending the call?",
    ],
  },
  {
    id: "credit-management-compliance",
    name: "Credit management compliance rubric",
    description: "Compliance rubric for credit management conversations.",
    previewLines: [
      "Did the agent avoid making unsupported credit promises?",
      "Were fee disclosures delivered in the approved format?",
    ],
  },
  {
    id: "mortgage-servicing-qa",
    name: "Mortgage servicing QA rubric",
    description: "Service quality rubric for mortgage servicing calls.",
    previewLines: [
      "Did the agent acknowledge the customer’s concern?",
      "Was the escrow explanation accurate and easy to follow?",
    ],
  },
  {
    id: "mortgage-servicing-compliance",
    name: "Mortgage servicing compliance rubric",
    description: "Compliance rubric for mortgage servicing requirements.",
    previewLines: [
      "Were hardship options positioned within policy?",
      "Did the agent avoid restricted legal guidance?",
    ],
  },
  {
    id: "renewals-qa",
    name: "Renewals QA rubric",
    description: "QA rubric for renewal conversations and retention handling.",
    previewLines: [
      "Did the agent explain the renewal offer clearly?",
      "Was the objection handling empathetic and complete?",
    ],
  },
  {
    id: "renewals-compliance",
    name: "Renewals compliance rubric",
    description: "Compliance rubric for renewals and pricing commitments.",
    previewLines: [
      "Did the agent avoid unsupported discount language?",
      "Were renewal terms confirmed before agreement?",
    ],
  },
]

const defaultCategories: CategoryRow[] = [
  { id: "professionalism", name: "Professionalism", weight: "33.34" },
  { id: "service-excellence", name: "Service excellence", weight: "33.33" },
  { id: "expertise", name: "Expertise", weight: "33.33" },
]

function formatRubricFormName(rubricName: string) {
  return rubricName.replace(/ rubric$/i, " scorecard")
}

function getRubricBuilderHref(rubricId: string) {
  return `/rubric-builder/${rubricId}`
}

function SettingsSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-border-subtle bg-surface-subtle px-8 py-16 lg:w-240 lg:border-r lg:border-b-0 lg:overflow-y-auto lg:px-8 lg:py-24">
      <div className="flex flex-col gap-20">
        {settingsSections.map((section) => (
          <div key={section.heading} className="space-y-8">
            <p className="px-12 text-12 font-medium text-text-tertiary">{section.heading}</p>

            <div className="space-y-4">
              {section.items.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start font-semibold",
                    item.active
                      ? "bg-surface-brand-subtle text-text-brand hover:bg-surface-brand-subtle hover:text-text-brand"
                      : "text-text-primary"
                  )}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

function RubricLibraryCard({
  rubric,
  active,
  onOpen,
}: {
  rubric: RubricRecord
  active: boolean
  onOpen: () => void
}) {
  return (
    <Card
      className={cn(
        "border-border-subtle shadow-none",
        active && "bg-surface-brand-subtle"
      )}
    >
      <CardHeader className="gap-8 px-20 py-16">
        <div className="flex items-start justify-between gap-12">
          <div className="space-y-4">
            <p className="text-16 font-bold text-text-primary">{rubric.name}</p>
            <p className="text-12 font-medium text-text-secondary">{rubric.description}</p>
          </div>
          {active ? <Badge size="sm">Open</Badge> : null}
        </div>
      </CardHeader>

      <CardBody className="space-y-12 px-20 py-16">
        <div className="space-y-8">
          {rubric.previewLines.map((line) => (
            <p key={line} className="rounded-lg border border-border-subtle bg-surface-card px-16 py-16 text-14 font-medium text-text-primary">
              {line}
            </p>
          ))}
        </div>

        <div className="flex justify-end">
          {active ? (
            <Button variant="secondary" onClick={onOpen}>
              Reopen settings
            </Button>
          ) : (
            <Button asChild>
              <Link href={getRubricBuilderHref(rubric.id)}>Open settings</Link>
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

function RubricSettingsSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-border-subtle shadow-none">
      <CardHeader className="border-b border-border-subtle px-32 py-16">
        <div className="flex items-start justify-between gap-16">
          <div className="space-y-4">
            <p className="text-16 font-bold text-text-primary">{title}</p>
            {description ? (
              <p className="text-12 font-medium text-text-secondary">{description}</p>
            ) : null}
          </div>
          <ChevronUp size={18} className="mt-4 text-icon-secondary" />
        </div>
      </CardHeader>

      <CardBody className="px-32 py-24">{children}</CardBody>
    </Card>
  )
}

export default function Page() {
  const params = useParams<{ rubricId: string }>()
  const routeRubricId = Array.isArray(params.rubricId) ? params.rubricId[0] : params.rubricId
  const rubric = rubrics.find((candidate) => candidate.id === routeRubricId) ?? rubrics[0]

  const [isRubricModalOpen, setIsRubricModalOpen] = React.useState(true)
  const [rubricName, setRubricName] = React.useState(() => formatRubricFormName(rubric.name))
  const [rubricDescription, setRubricDescription] = React.useState("")
  const [categories, setCategories] = React.useState<CategoryRow[]>(defaultCategories)
  const [naHandling, setNaHandling] = React.useState("remove")
  const [outcomeType, setOutcomeType] = React.useState("raw-score")
  const [multipleEvaluationEnabled, setMultipleEvaluationEnabled] = React.useState(true)
  const [dataAccessMode, setDataAccessMode] = React.useState("all-projects")

  React.useEffect(() => {
    setRubricName(formatRubricFormName(rubric.name))
    setRubricDescription("")
    setCategories(defaultCategories)
    setIsRubricModalOpen(true)
  }, [rubric])

  function handleCategoryChange(categoryId: string, field: "name" | "weight", value: string) {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === categoryId ? { ...category, [field]: value } : category
      )
    )
  }

  function handleAddCategory() {
    setCategories((currentCategories) => [
      ...currentCategories,
      {
        id: `category-${currentCategories.length + 1}`,
        name: `Category ${currentCategories.length + 1}`,
        weight: "0.00",
      },
    ])
  }

  function handleRemoveCategory(categoryId: string) {
    setCategories((currentCategories) => {
      if (currentCategories.length === 1) {
        return currentCategories
      }

      return currentCategories.filter((category) => category.id !== categoryId)
    })
  }

  return (
    <Dialog open={isRubricModalOpen} onOpenChange={() => {}}>
      <div className="flex h-screen bg-surface-subtle">
        <MainNav activeItem="Settings" />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar avatarInitial="L" />

          <main className="flex-1 overflow-hidden bg-surface-subtle">
            <div className="flex h-full min-w-0 flex-col lg:flex-row">
              <SettingsSidebar />

              <section className="flex min-w-0 flex-1 flex-col overflow-auto bg-surface-subtle px-24 py-24 lg:px-32">
                <PageHeader withBorder={false} className="gap-4 bg-transparent px-0 py-0">
                  <PageHeaderRow className="items-start justify-between gap-16">
                    <div className="flex flex-col gap-4">
                      <PageHeaderTitle size="2xl">Rubric builder</PageHeaderTitle>
                      <PageHeaderDescription className="text-text-secondary">
                        Create and manage Instascore rubrics for evaluation coverage.
                      </PageHeaderDescription>
                    </div>

                    <Button onClick={() => setIsRubricModalOpen(true)}>Create rubric</Button>
                  </PageHeaderRow>
                </PageHeader>

                <div className="mt-24 flex flex-col gap-24">
                  <Card className="border-border-subtle shadow-none">
                    <CardBody className="px-20 py-20">
                      <div className="relative">
                        <SearchMd
                          size={16}
                          className="pointer-events-none absolute top-12 left-12 text-icon-secondary"
                        />
                        <Input placeholder="Search rubrics" className="pl-40" />
                      </div>
                    </CardBody>
                  </Card>

                  <div className="grid grid-cols-1 gap-16 xl:grid-cols-2">
                    {rubrics.map((candidate) => (
                      <RubricLibraryCard
                        key={candidate.id}
                        rubric={candidate}
                        active={candidate.id === rubric.id}
                        onOpen={() => setIsRubricModalOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      <DialogContent
        size="full"
        className="top-1/2 w-1020 max-w-1020 -translate-y-1/2"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b border-border-subtle">Create rubric</DialogHeader>

        <DialogBody className="bg-surface-subtle px-24 py-24">
          <div className="flex flex-col gap-24">
            <RubricSettingsSection title="Name and description">
              <div className="flex flex-col gap-24">
                <InputField
                  label="Name"
                  value={rubricName}
                  onChange={(event) => setRubricName(event.target.value)}
                />
                <InputField
                  label="Description (Optional)"
                  value={rubricDescription}
                  onChange={(event) => setRubricDescription(event.target.value)}
                />
              </div>
            </RubricSettingsSection>

            <RubricSettingsSection
              title="Categories"
              description="Manage the categories and weighting."
            >
              <div className="flex flex-col gap-12">
                {categories.map((category) => (
                  <div key={category.id} className="flex flex-col gap-8 lg:flex-row">
                    <div className="min-w-0 flex-1">
                      <Input
                        value={category.name}
                        onChange={(event) =>
                          handleCategoryChange(category.id, "name", event.target.value)
                        }
                      />
                    </div>

                    <div className="relative w-full shrink-0 lg:w-128">
                      <Input
                        value={category.weight}
                        onChange={(event) =>
                          handleCategoryChange(category.id, "weight", event.target.value)
                        }
                        className="pr-40"
                      />
                      <Percent02
                        size={16}
                        className="pointer-events-none absolute top-12 right-12 text-icon-secondary"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveCategory(category.id)}
                      aria-label={`Remove ${category.name}`}
                    >
                      <X size={16} className="text-icon-secondary" />
                    </Button>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    variant="secondary"
                    iconLeft={<Plus size={16} />}
                    onClick={handleAddCategory}
                  >
                    Add category
                  </Button>
                </div>
              </div>
            </RubricSettingsSection>

            <RubricSettingsSection
              title="Results"
              description="Define how you would like results to be presented."
            >
              <div className="flex flex-col gap-32">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-wrap items-center gap-8">
                    <p className="text-14 font-semibold text-text-primary">N/A handling</p>
                    <Badge size="sm">Recommended</Badge>
                  </div>
                  <p className="text-12 font-medium text-text-secondary">
                    Choose how questions answered as N/A are scored.
                  </p>
                  <RadioGroup value={naHandling} onValueChange={setNaHandling} className="gap-12">
                    <RadioWithLabel
                      value="remove"
                      label="Question is removed from total score"
                    />
                    <RadioWithLabel
                      value="full-score"
                      label="Question is awarded full score"
                    />
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-12">
                  <p className="text-14 font-semibold text-text-primary">Outcomes</p>
                  <RadioGroup value={outcomeType} onValueChange={setOutcomeType} className="gap-12">
                    <RadioWithLabel value="raw-score" label="Raw score" />
                    <RadioWithLabel value="pass-fail" label="Pass/Fail" />
                    <RadioWithLabel value="buckets" label="Buckets" />
                  </RadioGroup>
                </div>
              </div>
            </RubricSettingsSection>

            <RubricSettingsSection
              title="Assignment rule"
              description="Select the set of interactions for which this rubric will be applicable."
            >
              <div className="rounded-lg border border-border-subtle bg-surface-muted p-16">
                <div className="mb-16 flex items-center gap-8">
                  <Badge size="sm">Or</Badge>
                  <Badge size="sm" className="bg-surface-brand-subtle text-text-brand">
                    And
                  </Badge>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-8 lg:flex-row">
                    <Select defaultValue="channel">
                      <SelectTrigger>
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="channel">Channel</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="queue">Queue</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="equals">
                      <SelectTrigger>
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="does-not-equal">Does not equal</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="call">
                      <SelectTrigger>
                        <SelectValue placeholder="Value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-8 lg:flex-row">
                    <Select defaultValue="team">
                      <SelectTrigger>
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="channel">Channel</SelectItem>
                        <SelectItem value="queue">Queue</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="does-not-equal">
                      <SelectTrigger>
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="does-not-equal">Does not equal</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex min-w-0 flex-1 gap-8">
                      <div className="min-w-0 flex-1">
                        <Select defaultValue="ai-virtual-agent">
                          <SelectTrigger>
                            <SelectValue placeholder="Value" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai-virtual-agent">AI virtual agent</SelectItem>
                            <SelectItem value="collections">Collections</SelectItem>
                            <SelectItem value="renewals">Renewals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Remove rule"
                      >
                        <X size={16} className="text-icon-secondary" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      iconLeft={<Plus size={16} />}
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      iconLeft={<Plus size={16} />}
                    >
                      Add group
                    </Button>
                  </div>
                </div>
              </div>
            </RubricSettingsSection>

            <Button
              type="button"
              variant="ghost"
              className="h-auto w-fit px-0 text-12 font-semibold text-text-primary"
            >
              Advanced settings
              <ChevronUp size={12} className="text-icon-secondary" />
            </Button>

            <Card className="border-border-subtle shadow-none">
              <CardBody className="px-32 py-24">
                <div className="flex items-start justify-between gap-16">
                  <div className="space-y-4">
                    <p className="text-16 font-bold text-text-primary">
                      Make this a multiple evaluation rubric
                    </p>
                    <p className="max-w-720 text-12 font-medium text-text-secondary">
                      When multiple rubrics match a conversation&apos;s assignment rule, all
                      rubrics with this setting enabled run and add a separate evaluation.
                    </p>
                  </div>

                  <ToggleSwitch
                    checked={multipleEvaluationEnabled}
                    onCheckedChange={setMultipleEvaluationEnabled}
                    aria-label="Toggle multiple evaluation rubric"
                  />
                </div>
              </CardBody>
            </Card>

            <RubricSettingsSection
              title="Restrict data access"
              description="Control which projects this rubric can access data from."
            >
              <RadioGroup
                value={dataAccessMode}
                onValueChange={setDataAccessMode}
                className="gap-12"
              >
                <RadioWithLabel value="all-projects" label="All projects" />
                <RadioWithLabel value="specific-project" label="Specific project" />
              </RadioGroup>
            </RubricSettingsSection>
          </div>
        </DialogBody>

        <DialogFooter className="border-t border-border-subtle">
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={() => {}}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
