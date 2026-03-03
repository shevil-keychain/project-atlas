"use client"

import * as React from "react"
import Link from "next/link"
import { Inbox } from "lucide-react"
import {
  ChevronDown,
  ChevronUp,
  LinkExternal01,
  RefreshCw01,
} from "@level/ui/components/icons"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderRow,
  PageHeaderTitle,
} from "@level/ui/components/patterns/page-header"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { Button } from "@level/ui/components/ui/button"
import { Card, CardBody, CardHeader } from "@level/ui/components/ui/card"
import { Checkbox } from "@level/ui/components/ui/checkbox"
import { EmptyState } from "@level/ui/components/ui/empty-state"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@level/ui/components/ui/modal"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"
import { Skeleton } from "@level/ui/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@level/ui/components/ui/table"
import { ToggleSwitch } from "@level/ui/components/ui/toggle-switch"
import { cn } from "@level/ui/lib/utils"

type SettingsSection = {
  heading: string
  items: Array<{
    label: string
    active?: boolean
  }>
}

type PreferenceKey =
  | "manualEvaluations"
  | "instascoreEvaluations"
  | "hideAgentNames"
  | "weightedCalibrationScores"

type PreferenceItem = {
  key: PreferenceKey
  label: string
  description: string
  disabled?: boolean
}

type Rubric = {
  id: string
  name: string
}

type PreviewGroup = {
  id: string
  percent: number
  conversationCount: number
  rubricIds: string[]
}

type ModalMode = "setup" | "enable" | "edit"

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
      { label: "QA preferences", active: true },
      { label: "Rubric builder" },
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

const preferenceSections: Array<{
  title: string
  items: PreferenceItem[]
}> = [
  {
    title: "Evaluation",
    items: [
      {
        key: "manualEvaluations",
        label: "Allow multiple 'Manual' evaluations",
        description: "One conversation can be manually evaluated more than once.",
        disabled: true,
      },
      {
        key: "instascoreEvaluations",
        label: "Allow multiple 'Instascore' evaluations",
        description:
          "One conversation can be automatically evaluated by multiple rubrics.",
      },
    ],
  },
  {
    title: "Calibration",
    items: [
      {
        key: "hideAgentNames",
        label: "Hide agent names",
        description:
          "Hide agent names from calibration sessions to avoid any bias in the calibration process.",
        disabled: true,
      },
      {
        key: "weightedCalibrationScores",
        label: "Enable weighted calibration scores",
        description: "Calculate calibration based on question points, not just match count.",
        disabled: true,
      },
    ],
  },
]

const instascoreRubrics: Rubric[] = [
  { id: "debt-management-qa", name: "Debt management QA rubric" },
  { id: "debt-management-compliance", name: "Debt management compliance rubric" },
  { id: "credit-management-qa", name: "Credit management QA rubric" },
  { id: "credit-management-compliance", name: "Credit management compliance rubric" },
  { id: "mortgage-servicing-qa", name: "Mortgage servicing QA rubric" },
  { id: "mortgage-servicing-compliance", name: "Mortgage servicing compliance rubric" },
  { id: "renewals-qa", name: "Renewals QA rubric" },
  { id: "renewals-compliance", name: "Renewals compliance rubric" },
]

const defaultOptInRubricIds: string[] = []

const previewGroups: PreviewGroup[] = [
  {
    id: "debt-qa-only",
    percent: 18,
    conversationCount: 18000,
    rubricIds: ["debt-management-qa"],
  },
  {
    id: "debt-shared",
    percent: 12,
    conversationCount: 12000,
    rubricIds: ["debt-management-compliance", "debt-management-qa"],
  },
  {
    id: "credit-qa-only",
    percent: 14,
    conversationCount: 14000,
    rubricIds: ["credit-management-qa"],
  },
  {
    id: "credit-shared",
    percent: 10,
    conversationCount: 10000,
    rubricIds: ["credit-management-compliance", "credit-management-qa"],
  },
  {
    id: "mortgage-qa-only",
    percent: 11,
    conversationCount: 11000,
    rubricIds: ["mortgage-servicing-qa"],
  },
  {
    id: "mortgage-shared",
    percent: 9,
    conversationCount: 9000,
    rubricIds: ["mortgage-servicing-compliance", "mortgage-servicing-qa"],
  },
  {
    id: "renewals-qa-only",
    percent: 8,
    conversationCount: 8000,
    rubricIds: ["renewals-qa"],
  },
  {
    id: "renewals-compliance-only",
    percent: 6,
    conversationCount: 6000,
    rubricIds: ["renewals-compliance"],
  },
  {
    id: "no-match",
    percent: 12,
    conversationCount: 12000,
    rubricIds: [],
  },
]

const rubricNameById = new Map(instascoreRubrics.map((rubric) => [rubric.id, rubric.name]))
const rubricRecencyById = new Map(
  instascoreRubrics.map((rubric, index) => [rubric.id, index])
)
const numberFormatter = new Intl.NumberFormat("en-US")
const previewLoadingDurationMs = 300

function getRubricSettingsHref(rubricId: string) {
  return `/rubric-builder/${rubricId}`
}

function getPreviewRows(selectedRubricIds: string[]) {
  const multipleEvaluationRubricIds = new Set(selectedRubricIds)

  return [...previewGroups]
    .map((group) => {
      const matchingRubricIds = [...group.rubricIds].sort((leftRubricId, rightRubricId) => {
        return (
          (rubricRecencyById.get(leftRubricId) ?? Number.POSITIVE_INFINITY) -
          (rubricRecencyById.get(rightRubricId) ?? Number.POSITIVE_INFINITY)
        )
      })
      const multipleEvaluationMatches = matchingRubricIds.filter((rubricId) =>
        multipleEvaluationRubricIds.has(rubricId)
      )

      let evaluatedRubricIds: string[] = []

      if (multipleEvaluationMatches.length > 0) {
        evaluatedRubricIds = multipleEvaluationMatches
      } else if (matchingRubricIds.length === 1) {
        evaluatedRubricIds = matchingRubricIds
      } else if (matchingRubricIds.length > 1) {
        evaluatedRubricIds = [matchingRubricIds[0]]
      }

      return {
        key: group.id,
        percent: group.percent,
        conversationCount: group.conversationCount,
        rubricIds: evaluatedRubricIds,
      }
    })
    .sort((left, right) => right.percent - left.percent)
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

function InstascoreSummary({
  onEdit,
}: {
  onEdit: () => void
}) {
  return (
    <div className="mt-12">
      <Button type="button" variant="secondary" onClick={onEdit}>
        Open configuration
      </Button>
    </div>
  )
}

function PreferenceRow({
  checked,
  children,
  description,
  disabled,
  label,
  onCheckedChange,
}: PreferenceItem & {
  checked: boolean
  children?: React.ReactNode
  onCheckedChange: (checked: boolean) => void
}) {
  const labelId = React.useId()
  const descriptionId = React.useId()

  return (
    <div className="flex items-start gap-12 py-20">
      <ToggleSwitch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className="mt-2"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <p id={labelId} className="text-14 font-semibold text-text-primary">
          {label}
        </p>

        <div
          id={descriptionId}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-12 font-medium text-text-secondary"
        >
          <span>{description}</span>
          <Button
            type="button"
            variant="linkSecondary"
            className="h-auto px-0 text-12 font-medium text-text-secondary"
          >
            Learn more
          </Button>
        </div>

        {children}
      </div>
    </div>
  )
}

function PreferenceCard({
  title,
  items,
  preferences,
  onPreferenceChange,
  renderPreferenceExtra,
}: {
  title: string
  items: PreferenceItem[]
  preferences: Record<PreferenceKey, boolean>
  onPreferenceChange: (key: PreferenceKey, checked: boolean) => void
  renderPreferenceExtra?: (item: PreferenceItem) => React.ReactNode
}) {
  return (
    <Card className="border-border-subtle shadow-none">
      <CardHeader className="gap-0 border-b border-border-subtle px-20 py-16">
        <p className="text-12 font-bold text-text-primary">{title}</p>
      </CardHeader>

      <CardBody className="px-20 py-0">
        <div className="divide-y divide-border-subtle">
          {items.map((item) => (
            <PreferenceRow
              key={item.key}
              label={item.label}
              description={item.description}
              disabled={item.disabled}
              checked={preferences[item.key]}
              onCheckedChange={(checked) => onPreferenceChange(item.key, checked)}
            >
              {renderPreferenceExtra?.(item)}
            </PreferenceRow>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

function RubricColumn({
  description,
  emptyDescription,
  emptyTitle,
  rubrics,
  title,
  selected,
  onSelectionChange,
}: {
  description: string
  emptyDescription: string
  emptyTitle: string
  rubrics: Rubric[]
  title: string
  selected: boolean
  onSelectionChange: (rubricId: string, checked: boolean) => void
}) {
  return (
    <Card className="h-full border-border-subtle shadow-none">
      <CardBody className="flex h-full flex-col gap-16 px-16 py-16">
        <div className="space-y-8">
          <p className="text-16 font-bold text-text-primary">{title}</p>
          <p className="text-12 font-medium text-text-secondary">{description}</p>
        </div>

        {rubrics.length > 0 ? (
          <div className="space-y-8">
            {rubrics.map((rubric) => {
              const checkboxId = `instascore-rubric-${selected ? "multiple" : "single"}-${rubric.id}`

              return (
                <div key={rubric.id} className="py-2">
                  <div className="flex items-start gap-12">
                    <label
                      htmlFor={checkboxId}
                      className="flex min-w-0 flex-1 cursor-pointer items-start gap-12"
                    >
                      <Checkbox
                        id={checkboxId}
                        checked={selected}
                        onCheckedChange={(checked) => onSelectionChange(rubric.id, checked === true)}
                        className="mt-2"
                      />
                      <span className="min-w-0 flex-1 text-14 font-medium text-text-primary">
                        {rubric.name}
                      </span>
                    </label>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      asChild
                      aria-label={`Open ${rubric.name} in a new tab`}
                    >
                      <Link
                        href={getRubricSettingsHref(rubric.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkExternal01 size={16} className="text-icon-secondary" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-1 items-center">
            <EmptyState
              className="py-56"
              icon={<Inbox />}
              title={emptyTitle}
              description={emptyDescription}
            />
          </div>
        )}
      </CardBody>
    </Card>
  )
}

function RubricSelectionList({
  selectedRubricIds,
  onSelectionChange,
}: {
  selectedRubricIds: string[]
  onSelectionChange: (rubricId: string, checked: boolean) => void
}) {
  const singleEvaluationRubrics = instascoreRubrics.filter(
    (rubric) => !selectedRubricIds.includes(rubric.id)
  )
  const multipleEvaluationRubrics = instascoreRubrics.filter((rubric) =>
    selectedRubricIds.includes(rubric.id)
  )

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <RubricColumn
        title="Single evaluation rubrics"
        description="Evaluates when it's the only rubric matching a conversation. Skipped when other rubrics also match."
        emptyTitle="No single evaluation rubrics"
        emptyDescription="All active rubrics are currently opted into multiple evaluation."
        rubrics={singleEvaluationRubrics}
        selected={false}
        onSelectionChange={onSelectionChange}
      />
      <RubricColumn
        title="Multiple evaluation rubrics"
        description="Always evaluates its matched conversations, even when other rubrics also match."
        emptyTitle="No multiple evaluation rubrics"
        emptyDescription="Select rubrics from the single evaluation list to move them here."
        rubrics={multipleEvaluationRubrics}
        selected
        onSelectionChange={onSelectionChange}
      />
    </div>
  )
}

function PreviewCard({
  isOpen,
  onToggle,
  selectedRubricIds,
}: {
  isOpen: boolean
  onToggle: () => void
  selectedRubricIds: string[]
}) {
  const [isPreviewLoading, setIsPreviewLoading] = React.useState(false)
  const hasMountedRef = React.useRef(false)
  const previewRows = React.useMemo(() => getPreviewRows(selectedRubricIds), [selectedRubricIds])
  const selectedRubricIdsKey = React.useMemo(
    () => [...selectedRubricIds].sort().join("|"),
    [selectedRubricIds]
  )

  React.useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    setIsPreviewLoading(true)

    const timeoutId = window.setTimeout(() => {
      setIsPreviewLoading(false)
    }, previewLoadingDurationMs)

    return () => window.clearTimeout(timeoutId)
  }, [selectedRubricIdsKey])

  return (
    <Card className="border-border-subtle bg-surface-muted shadow-none">
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full justify-between rounded-none border-b border-border-subtle px-16 py-12 hover:bg-surface-muted"
        aria-label={isOpen ? "Collapse preview" : "Expand preview"}
        onClick={onToggle}
      >
        <span className="text-12 font-bold text-text-primary">Rubric assignment preview</span>

        <span className="flex items-center gap-16">
          <span className="text-12 font-medium text-text-secondary">Based on data from last 7 days</span>
          <RefreshCw01 size={16} className="text-icon-secondary" />
          {isOpen ? (
            <ChevronUp size={16} className="text-icon-secondary" />
          ) : (
            <ChevronDown size={16} className="text-icon-secondary" />
          )}
        </span>
      </Button>

      {isOpen ? (
        <div className="space-y-16 px-16 pb-16">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border-subtle hover:bg-surface-muted">
                <TableHead className="px-0 py-16 text-10 uppercase text-text-secondary">
                  Conversations
                </TableHead>
                <TableHead className="px-0 py-16 text-right text-10 uppercase text-text-secondary">
                  Matching rubrics
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isPreviewLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={`preview-loading-${index}`} className="border-b-0 hover:bg-surface-muted">
                      <TableCell className="px-0 py-12 align-top">
                        <div className="flex flex-col gap-6">
                          <Skeleton className="h-16 w-40" />
                          <Skeleton className="h-16 w-128" />
                        </div>
                      </TableCell>

                      <TableCell className="px-0 py-12 text-right align-top">
                        <div className="flex flex-col items-end gap-6">
                          <Skeleton className="h-16 w-240" />
                          <Skeleton className="h-16 w-128" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : previewRows.map((row, index) => (
                    <TableRow
                      key={row.key}
                      className={cn(
                        "border-b-0 hover:bg-surface-muted",
                        index === previewRows.length - 1 && "border-b-0"
                      )}
                    >
                      <TableCell className="px-0 py-12 align-top">
                        <div className="flex flex-col gap-2">
                          <span className="text-12 font-semibold text-text-primary">{row.percent}%</span>
                          <span className="text-12 font-medium text-text-secondary">
                            {numberFormatter.format(row.conversationCount)} conversations
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="px-0 py-12 text-right align-top">
                        {row.rubricIds.length > 0 ? (
                          <div className="flex flex-col items-end gap-4">
                            {row.rubricIds.map((rubricId) => (
                              <div key={rubricId} className="flex items-center gap-4">
                                <span className="text-12 font-medium text-text-secondary">
                                  {rubricNameById.get(rubricId)}
                                </span>
                                <Link
                                  href={getRubricSettingsHref(rubricId)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Open ${rubricNameById.get(rubricId)} in a new tab`}
                                  className="text-icon-secondary"
                                >
                                  <LinkExternal01 size={14} className="text-icon-secondary" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-12 font-medium text-text-secondary">No rubric</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          <InlineAlert
            variant="warning"
            className="py-8 [&>span:first-child>svg]:size-16"
            description={
              <>
                <span>Adjust rubrics&apos; assignment rules to remove unintended overlaps. </span>
                <Button
                  variant="linkSecondary"
                  className="h-auto px-0 text-12 font-medium text-current"
                >
                  Learn more
                </Button>
              </>
            }
          />
        </div>
      ) : null}
    </Card>
  )
}

export default function Page() {
  const [preferences, setPreferences] = React.useState<Record<PreferenceKey, boolean>>({
    manualEvaluations: false,
    instascoreEvaluations: false,
    hideAgentNames: false,
    weightedCalibrationScores: false,
  })
  const [savedOptInRubricIds, setSavedOptInRubricIds] = React.useState<string[]>([])
  const [draftOptInRubricIds, setDraftOptInRubricIds] =
    React.useState<string[]>(defaultOptInRubricIds)
  const [isInstascoreModalOpen, setIsInstascoreModalOpen] = React.useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<ModalMode>("setup")

  const openInstascoreModal = React.useCallback((mode: ModalMode, rubricIds: string[]) => {
    setModalMode(mode)
    setDraftOptInRubricIds(rubricIds)
    setIsPreviewOpen(false)
    setIsInstascoreModalOpen(true)
  }, [])

  const handleInstascoreModalCancel = React.useCallback(() => {
    setDraftOptInRubricIds(savedOptInRubricIds.length > 0 ? savedOptInRubricIds : defaultOptInRubricIds)
    setIsInstascoreModalOpen(false)
    setIsPreviewOpen(false)

    if (modalMode !== "edit") {
      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        instascoreEvaluations: false,
      }))
    }
  }, [modalMode, savedOptInRubricIds])

  const handleInstascoreModalSave = React.useCallback(() => {
    setSavedOptInRubricIds(draftOptInRubricIds)
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      instascoreEvaluations: true,
    }))
    setIsInstascoreModalOpen(false)
  }, [draftOptInRubricIds])

  const handlePreferenceChange = React.useCallback(
    (key: PreferenceKey, checked: boolean) => {
      if (key !== "instascoreEvaluations") {
        return
      }

      if (checked) {
        setPreferences((currentPreferences) => ({
          ...currentPreferences,
          instascoreEvaluations: true,
        }))

        openInstascoreModal(
          savedOptInRubricIds.length > 0 ? "enable" : "setup",
          savedOptInRubricIds.length > 0 ? savedOptInRubricIds : defaultOptInRubricIds
        )

        return
      }

      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        instascoreEvaluations: false,
      }))
    },
    [openInstascoreModal, savedOptInRubricIds]
  )

  const handleRubricSelectionChange = React.useCallback((rubricId: string, checked: boolean) => {
    setDraftOptInRubricIds((currentRubricIds) => {
      if (checked) {
        return currentRubricIds.includes(rubricId) ? currentRubricIds : [...currentRubricIds, rubricId]
      }

      return currentRubricIds.filter((currentRubricId) => currentRubricId !== rubricId)
    })
  }, [])

  const handleEditInstascore = React.useCallback(() => {
    openInstascoreModal("edit", savedOptInRubricIds)
  }, [openInstascoreModal, savedOptInRubricIds])

  return (
    <Dialog
      open={isInstascoreModalOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleInstascoreModalCancel()
        }
      }}
    >
      <div className="flex h-screen bg-surface-subtle">
        <MainNav activeItem="Settings" />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar avatarInitial="M" />

          <main className="flex-1 overflow-hidden bg-surface-subtle">
            <div className="flex h-full min-w-0 flex-col lg:flex-row">
              <SettingsSidebar />

              <section className="flex min-w-0 flex-1 flex-col overflow-auto bg-surface-subtle px-24 py-24 lg:px-32">
                <PageHeader withBorder={false} className="gap-4 bg-transparent px-0 py-0">
                  <PageHeaderRow className="justify-start">
                    <div className="flex flex-col gap-4">
                      <PageHeaderTitle size="2xl">QA preferences</PageHeaderTitle>
                      <PageHeaderDescription className="text-text-secondary">
                        Manage evaluation and calibration preferences of your organization
                      </PageHeaderDescription>
                    </div>
                  </PageHeaderRow>
                </PageHeader>

                <div className="mt-32 flex w-full max-w-720 flex-col gap-24 self-center">
                  {preferenceSections.map((section) => (
                    <PreferenceCard
                      key={section.title}
                      title={section.title}
                      items={section.items}
                      preferences={preferences}
                      onPreferenceChange={handlePreferenceChange}
                      renderPreferenceExtra={(item) =>
                        item.key === "instascoreEvaluations" &&
                        preferences.instascoreEvaluations &&
                        savedOptInRubricIds.length > 0 ? (
                          <InstascoreSummary
                            onEdit={handleEditInstascore}
                          />
                        ) : null
                      }
                    />
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      <DialogContent size="xl" className="top-1/2 -translate-y-1/2">
        <DialogHeader className="border-b border-border-subtle">
          Opt in rubrics for multiple Instascore evaluations
        </DialogHeader>

        <DialogBody className="space-y-20 bg-surface-subtle px-24 pt-24 pb-24">
          <RubricSelectionList
            selectedRubricIds={draftOptInRubricIds}
            onSelectionChange={handleRubricSelectionChange}
          />

          <PreviewCard
            isOpen={isPreviewOpen}
            onToggle={() => setIsPreviewOpen((currentValue) => !currentValue)}
            selectedRubricIds={draftOptInRubricIds}
          />
        </DialogBody>

        <DialogFooter className="border-t border-border-subtle">
          <Button variant="secondary" onClick={handleInstascoreModalCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleInstascoreModalSave}
            disabled={draftOptInRubricIds.length === 0}
          >
            {modalMode === "edit" ? "Save" : "Enable"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
