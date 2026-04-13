"use client"

import * as React from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import {
  PageHeader,
  PageHeaderBreadcrumb,
  PageHeaderRow,
  PageHeaderTitle,
} from "@level/ui/components/patterns/page-header"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import { AvatarGroup } from "@level/ui/components/ui/avatar-group"
import { Badge } from "@level/ui/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@level/ui/components/ui/breadcrumb"
import { Button } from "@level/ui/components/ui/button"
import { Card } from "@level/ui/components/ui/card"
import { Checkbox } from "@level/ui/components/ui/checkbox"
import { InputField } from "@level/ui/components/ui/input-field"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@level/ui/components/ui/modal"
import { Sheet, SheetBody, SheetContent, SheetHeader } from "@level/ui/components/ui/sheet"
import { Spinner } from "@level/ui/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@level/ui/components/ui/table"
import { Tabs, VerticalTabsList, VerticalTabsTrigger } from "@level/ui/components/ui/tabs"
import {
  CheckCircle,
  ChevronDown,
  InfoCircle,
  SearchMd,
  Stars02,
} from "@level/ui/components/icons"
import { cn } from "@level/ui/lib/utils"

type ImprovementStatus = "none" | "analysis" | "ready"

type AffectedConversation = {
  id: string
  autoQaAnswer: string
  correctAnswer: string
  evidence: string
}

type QuestionSuggestion = {
  potentialAccuracy: number
  diagnosis: string
  removedLine: string
  addedLine: string
  affectedConversations: AffectedConversation[]
}

type QuestionRow = {
  id: string
  question: string
  accuracy: number
  reportName: string
  datasetName: string
  reviewers: string[]
  inProgressTestName?: string
  improvementStatus: ImprovementStatus
  suggestion?: QuestionSuggestion
}

type InProgressTest = {
  id: string
  name: string
  startedBy: string
  reviewedCount: string
}

type ReportQuestionRow = {
  id: string
  question: string
  accuracy: number
  sourceQuestionId?: string
}

const settingsItems = [
  { value: "users", label: "Users" },
  { value: "teams", label: "Teams" },
  { value: "report-sharing", label: "Report sharing" },
  { value: "custom-fields", label: "Custom fields" },
  { value: "qa-case-assignment", label: "QA case assignment" },
  { value: "notifications", label: "Notifications" },
  { value: "audit-logs", label: "Audit logs" },
  { value: "scripting-engine", label: "Scripting engine" },
  { value: "scenarios", label: "Scenarios" },
  { value: "conversation-tags", label: "Conversation tags" },
  { value: "metric-tags", label: "Metric tags" },
  { value: "categories", label: "Categories" },
  { value: "rubric-builder", label: "Rubric builder" },
] as const

const inProgressTests: InProgressTest[] = [
  {
    id: "progress-1",
    name: "Accuracy test - Dec 26, 3:01 PM",
    startedBy: "John Doe",
    reviewedCount: "5/1,000 conversations reviewed",
  },
  {
    id: "progress-2",
    name: "Accuracy test - Dec 23, 11:00 AM",
    startedBy: "John Doe",
    reviewedCount: "52/1,000 conversations reviewed",
  },
]

const questionRows: QuestionRow[] = [
  {
    id: "repeat-themselves",
    question: "Did the agent ask the customer to repeat themselves?",
    accuracy: 49,
    reportName: "Accuracy test - Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    inProgressTestName: "Accuracy test - Dec 26, 3:01 PM",
    improvementStatus: "ready",
    suggestion: {
      potentialAccuracy: 71,
      diagnosis:
        "AutoQA is missing cases where customers repeat information using informal phrasing. The prompt does not capture indirect repetition cues.",
      removedLine: "(3) The agent addressed needs respectfully.",
      addedLine:
        "(3) The agent addressed needs respectfully, including when customers use informal or indirect phrasing.",
      affectedConversations: [
        {
          id: "Conversation #1042",
          autoQaAnswer: "Yes",
          correctAnswer: "No",
          evidence:
            "Agent asked for details again but did not explicitly request repetition from the customer.",
        },
        {
          id: "Conversation #891",
          autoQaAnswer: "Yes",
          correctAnswer: "No",
          evidence:
            "Customer rephrased context without being prompted; AutoQA interpreted that as a direct ask.",
        },
        {
          id: "Conversation #672",
          autoQaAnswer: "No",
          correctAnswer: "Yes",
          evidence:
            "Agent said 'could you walk me through that one more time' which should count as repetition.",
        },
      ],
    },
  },
  {
    id: "reduce-effort",
    question: "Did the agent proactively reduce the customer's effort?",
    accuracy: 55,
    reportName: "Accuracy test - Dec 21, 11 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Karan Shah"],
    inProgressTestName: "Accuracy test - Dec 23, 11:00 AM",
    improvementStatus: "analysis",
  },
  {
    id: "willingness",
    question: "Did the agent express willingness to assist during the conversation?",
    accuracy: 61,
    reportName: "Accuracy test - Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    inProgressTestName: "Accuracy test - Dec 26, 3:01 PM",
    improvementStatus: "none",
  },
  {
    id: "greet-customer",
    question: "Did the agent greet the customer?",
    accuracy: 73,
    reportName: "Accuracy test - Dec 21, 11 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Karan Shah"],
    improvementStatus: "none",
  },
  {
    id: "profane-language",
    question:
      "Did the agent use any profane language or was rude towards the customer during the conversation?",
    accuracy: 77,
    reportName: "Accuracy test - Nov 27, 9 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    improvementStatus: "none",
  },
  {
    id: "greet-customer-second",
    question: "Did the agent greet the customer?",
    accuracy: 79,
    reportName: "Accuracy test - Nov 27, 9 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    improvementStatus: "none",
  },
]

const reportQuestionRows: ReportQuestionRow[] = [
  {
    id: "report-repeat-themselves",
    question: "Did the agent ask the customer to repeat themselves?",
    accuracy: 49,
    sourceQuestionId: "repeat-themselves",
  },
  {
    id: "report-reduce-effort",
    question: "Did the agent proactively reduce the customer's effort?",
    accuracy: 55,
    sourceQuestionId: "reduce-effort",
  },
  {
    id: "report-willingness",
    question: "Did the agent express willingness to assist during the conversation?",
    accuracy: 61,
  },
  {
    id: "report-greet-1",
    question: "Did the agent greet the customer?",
    accuracy: 73,
  },
  {
    id: "report-profane-language",
    question:
      "Did the agent use any profane language or was rude towards the customer during the conversation?",
    accuracy: 77,
  },
  {
    id: "report-greet-2",
    question: "Did the agent greet the customer?",
    accuracy: 79,
  },
  {
    id: "report-reduced-effort-second",
    question: "Did the agent proactively reduced the customer's effort?",
    accuracy: 85,
  },
  {
    id: "report-empathize",
    question:
      "Did the agent empathize with the angry customer to de-escalate the issue?",
    accuracy: 89,
  },
]

const liveAnalysisSteps = [
  "Clustering low-scoring mismatch patterns",
  "Extracting evidence from affected conversations",
  "Generating prompt improvement suggestions",
] as const

const liveAnalysisMessages = [
  "Grouping repeated failure patterns in low-scoring questions.",
  "Linking mismatch evidence to specific prompt gaps.",
  "Estimating potential lift for each generated suggestion.",
] as const

function getAccuracyTextColor(accuracy: number) {
  if (accuracy >= 85) {
    return "text-text-success"
  }

  if (accuracy >= 70) {
    return "text-text-warning"
  }

  return "text-text-error"
}

export default function Page() {
  const [activeSettingsTab, setActiveSettingsTab] = React.useState("rubric-builder")
  const [selectedQuestionIds, setSelectedQuestionIds] = React.useState<string[]>([])
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false)
  const [appliedQuestionIds, setAppliedQuestionIds] = React.useState<string[]>([])
  const [activeSuggestionId, setActiveSuggestionId] = React.useState<string | null>(null)
  const [showAffectedConversations, setShowAffectedConversations] = React.useState(false)
  const [isApplyingSuggestion, setIsApplyingSuggestion] = React.useState(false)
  const [showApplySuccessState, setShowApplySuccessState] = React.useState(false)
  const [analysisTick, setAnalysisTick] = React.useState(0)
  const applyTimerRef = React.useRef<number | null>(null)

  const selectableQuestionIds = questionRows.map((row) => row.id)
  const selectedCount = selectedQuestionIds.length
  const isAllSelected =
    selectableQuestionIds.length > 0 && selectedCount === selectableQuestionIds.length
  const selectAllCheckboxState: boolean | "indeterminate" = isAllSelected
    ? true
    : selectedCount > 0
      ? "indeterminate"
      : false

  const activeQuestion = questionRows.find((row) => row.id === activeSuggestionId)
  const activeSuggestion = activeQuestion?.suggestion

  React.useEffect(() => {
    return () => {
      if (applyTimerRef.current != null) {
        window.clearTimeout(applyTimerRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!isReportModalOpen) {
      return
    }

    const timer = window.setInterval(() => {
      setAnalysisTick((previousTick) => previousTick + 1)
    }, 1200)

    return () => window.clearInterval(timer)
  }, [isReportModalOpen])

  const handleToggleAllQuestions = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedQuestionIds(selectableQuestionIds)
      return
    }

    setSelectedQuestionIds([])
  }

  const handleToggleSingleQuestion = (
    questionId: string,
    checked: boolean | "indeterminate",
  ) => {
    if (checked === true) {
      setSelectedQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]))
      return
    }

    setSelectedQuestionIds((prev) => prev.filter((selectedId) => selectedId !== questionId))
  }

  const closeSuggestionSheet = React.useCallback(() => {
    if (applyTimerRef.current != null) {
      window.clearTimeout(applyTimerRef.current)
      applyTimerRef.current = null
    }

    setActiveSuggestionId(null)
    setShowAffectedConversations(false)
    setIsApplyingSuggestion(false)
    setShowApplySuccessState(false)
  }, [])

  const openSuggestionSheet = (questionId: string) => {
    setActiveSuggestionId(questionId)
    setShowAffectedConversations(false)
    setIsApplyingSuggestion(false)
    setShowApplySuccessState(false)
  }

  const handleOpenImproveFromReport = (questionId: string) => {
    setIsReportModalOpen(false)
    openSuggestionSheet(questionId)
  }

  const handleApplySuggestion = () => {
    const questionId = activeSuggestionId
    if (!questionId) {
      return
    }

    setIsApplyingSuggestion(true)

    if (applyTimerRef.current != null) {
      window.clearTimeout(applyTimerRef.current)
      applyTimerRef.current = null
    }

    applyTimerRef.current = window.setTimeout(() => {
      setIsApplyingSuggestion(false)
      setShowApplySuccessState(true)
      setAppliedQuestionIds((prev) =>
        prev.includes(questionId) ? prev : [...prev, questionId],
      )
      applyTimerRef.current = null
    }, 900)
  }

  const analysisStepIndex = Math.min(
    Math.floor((analysisTick % (liveAnalysisSteps.length * 3)) / 3),
    liveAnalysisSteps.length - 1,
  )
  const analysisConversationProgress = 24 + ((analysisTick % 16) * 3)
  const activeLiveMessage =
    liveAnalysisMessages[analysisTick % liveAnalysisMessages.length] ??
    liveAnalysisMessages[0]

  return (
    <div className="flex h-screen">
      <MainNav activeItem="Settings" />
      <div className="flex flex-1 flex-col bg-surface-page">
        <TopBar avatarInitial="M" />
        <main className="flex-1 overflow-auto p-24">
          <div className="flex min-h-full gap-24">
            <Card className="h-fit w-240 shrink-0 border-border-default bg-surface-card">
              <div className="border-b border-border-subtle px-16 py-12">
                <p className="text-14 font-medium text-text-secondary">
                  Organizational unit mgmt.
                </p>
              </div>
              <Tabs
                value={activeSettingsTab}
                onValueChange={setActiveSettingsTab}
                className="w-full"
              >
                <VerticalTabsList className="p-8">
                  {settingsItems.map((item) => (
                    <VerticalTabsTrigger key={item.value} value={item.value}>
                      {item.label}
                    </VerticalTabsTrigger>
                  ))}
                </VerticalTabsList>
              </Tabs>
            </Card>

            <div className="flex min-w-0 flex-1 flex-col gap-16">
              <PageHeader withBorder={false} className="gap-12 bg-transparent px-0 py-0">
                <PageHeaderRow className="justify-start">
                  <PageHeaderBreadcrumb>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>Manual rubrics</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>Debt management</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Accuracy</BreadcrumbPage>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </PageHeaderBreadcrumb>
                </PageHeaderRow>
                <PageHeaderRow className="justify-start">
                  <PageHeaderTitle size="2xl">Accuracy</PageHeaderTitle>
                </PageHeaderRow>
                <PageHeaderRow className="items-center gap-16">
                  <div className="min-w-0 flex-1">
                    <InputField
                      placeholder="Search question title"
                      aria-label="Search question title"
                      iconLeft={<SearchMd size={16} />}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-8">
                    <Button variant="secondary" onClick={() => setIsReportModalOpen(true)}>
                      Finish and generate report
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon-lg"
                      aria-label="Accuracy information"
                    >
                      <InfoCircle size={16} />
                    </Button>
                    <Button disabled={selectedCount === 0}>
                      Test accuracy ({selectedCount} selected)
                    </Button>
                  </div>
                </PageHeaderRow>
              </PageHeader>

              <div className="flex flex-col gap-8">
                {inProgressTests.map((test) => (
                  <Card
                    key={test.id}
                    className="border-border-subtle bg-surface-warning-subtle"
                  >
                    <div className="flex items-center justify-between gap-16 p-16">
                      <div className="flex min-w-0 flex-col gap-4">
                        <div className="flex items-center gap-8">
                          <p className="text-20 font-semibold text-text-primary">{test.name}</p>
                          <Badge color="warning" size="sm">
                            In-progress
                          </Badge>
                        </div>
                        <p className="text-14 font-medium text-text-secondary">
                          Started by {test.startedBy} · {test.reviewedCount}
                        </p>
                      </div>
                      <div className="flex items-center gap-8">
                        <Button variant="secondary">Delete</Button>
                        <Button>Resume</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="border-border-default bg-surface-card">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-surface-card">
                      <TableHead>
                        <div className="flex items-center gap-12">
                          <Checkbox
                            aria-label="Select all questions"
                            checked={selectAllCheckboxState}
                            onCheckedChange={handleToggleAllQuestions}
                          />
                          <span>Auto-QA question</span>
                        </div>
                      </TableHead>
                      <TableHead sortable sorted sortDirection="asc">
                        Latest accuracy
                      </TableHead>
                      <TableHead sortable>Latest accuracy report</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questionRows.map((row) => {
                      const isApplied = appliedQuestionIds.includes(row.id)
                      const canShowImprove =
                        row.improvementStatus === "ready" && !!row.suggestion && !isApplied
                      const canShowAnalysis = row.improvementStatus === "analysis" && !isApplied

                      return (
                        <TableRow key={row.id}>
                          <TableCell className="align-top">
                            <div className="flex items-start gap-12">
                              <Checkbox
                                aria-label={`Select ${row.question}`}
                                checked={selectedQuestionIds.includes(row.id)}
                                onCheckedChange={(checked) =>
                                  handleToggleSingleQuestion(row.id, checked)
                                }
                              />
                              <div className="flex min-w-0 flex-col gap-8">
                                <p className="text-14 font-semibold text-text-primary">{row.question}</p>
                                {row.inProgressTestName ? (
                                  <Badge color="gray" size="sm">
                                    {row.inProgressTestName}
                                  </Badge>
                                ) : null}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex items-center gap-8">
                              <span
                                className={cn(
                                  "text-24 font-bold",
                                  getAccuracyTextColor(row.accuracy),
                                )}
                              >
                                {row.accuracy}%
                              </span>

                              {canShowAnalysis ? (
                                <span className="inline-flex items-center gap-6 text-12 font-medium text-text-secondary">
                                  <Spinner size="sm" className="text-icon-secondary" />
                                  Analyzing
                                </span>
                              ) : null}

                              {canShowImprove ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-text-brand hover:bg-surface-brand-subtle"
                                  iconLeft={<Stars02 size={14} />}
                                  onClick={() => openSuggestionSheet(row.id)}
                                >
                                  Improve
                                </Button>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex items-start justify-between gap-16">
                              <div className="flex min-w-0 flex-col gap-4">
                                <p className="text-14 font-semibold text-text-primary underline">
                                  {row.reportName}
                                </p>
                                <p className="text-12 font-medium text-text-secondary">
                                  {row.datasetName}
                                </p>
                                <AvatarGroup names={row.reviewers} size="xs" max={3} />
                              </div>
                              <Button variant="secondary">View history</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Sheet
        open={activeSuggestionId !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeSuggestionSheet()
          }
        }}
      >
        <SheetContent size="md">
          <SheetHeader>{activeQuestion?.question ?? "Accuracy improvement"}</SheetHeader>
          <SheetBody className="flex flex-col gap-24">
            {activeSuggestion && activeQuestion ? (
              showApplySuccessState ? (
                <div className="flex flex-col gap-16">
                  <div className="flex items-center gap-8">
                    <CheckCircle size={20} className="text-icon-success" />
                    <p className="text-18 font-semibold text-text-primary">
                      Suggestion applied
                    </p>
                  </div>
                  <p className="text-14 font-medium text-text-secondary">
                    The prompt has been updated. To find out if accuracy actually improved,
                    test on a new dataset. The previous dataset was used to generate this
                    suggestion and cannot provide an unbiased result.
                  </p>
                  <div className="flex flex-col gap-8">
                    <Button>Create new testing dataset</Button>
                    <Button variant="secondary" onClick={closeSuggestionSheet}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-lg border border-border-success bg-surface-success-subtle p-16">
                    <div className="flex items-center gap-8">
                      <Stars02 size={16} className="text-icon-success" />
                      <p className="text-14 font-semibold text-text-primary">
                        Accuracy improvement found
                      </p>
                    </div>
                    <p className="mt-8 text-16 font-semibold text-text-primary">
                      Current: <span className={getAccuracyTextColor(activeQuestion.accuracy)}>{activeQuestion.accuracy}%</span>
                      <span className="text-text-secondary"> -&gt; </span>
                      Potential: <span className="text-text-success">{activeSuggestion.potentialAccuracy}%</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-8">
                    <p className="text-12 font-semibold text-text-secondary">
                      WHY IT&apos;S FAILING
                    </p>
                    <p className="text-14 font-medium text-text-primary">
                      {activeSuggestion.diagnosis}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-32 justify-start px-0 text-text-brand hover:bg-surface-card"
                      iconRight={
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform",
                            showAffectedConversations ? "rotate-180" : undefined,
                          )}
                        />
                      }
                      onClick={() =>
                        setShowAffectedConversations((previousValue) => !previousValue)
                      }
                    >
                      See affected conversations
                    </Button>

                    {showAffectedConversations ? (
                      <div className="flex flex-col gap-8">
                        {activeSuggestion.affectedConversations.map((conversation) => (
                          <Card
                            key={conversation.id}
                            className="border-border-subtle bg-surface-card"
                          >
                            <div className="flex flex-col gap-6 p-12">
                              <div className="flex items-center justify-between gap-8">
                                <p className="text-12 font-semibold text-text-primary">
                                  {conversation.id}
                                </p>
                                <Badge color="error" size="sm">
                                  Mismatch
                                </Badge>
                              </div>
                              <p className="text-12 font-medium text-text-secondary">
                                Auto-QA: {conversation.autoQaAnswer} | Correct: {conversation.correctAnswer}
                              </p>
                              <p className="text-12 font-medium text-text-primary">
                                {conversation.evidence}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-8">
                    <p className="text-12 font-semibold text-text-secondary">SUGGESTED CHANGE</p>
                    <Card className="border-border-default bg-surface-card">
                      <div className="flex flex-col gap-8 p-16 text-14 font-medium text-text-primary">
                        <p>Was the agent courteous during the call, based on any of the following?</p>
                        <p>(1) The agent used polite language.</p>
                        <p>(2) The agent thanked the customer.</p>
                        <p className="text-text-error line-through">{activeSuggestion.removedLine}</p>
                        <p className="text-text-success">{activeSuggestion.addedLine}</p>
                      </div>
                    </Card>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleApplySuggestion}
                      disabled={isApplyingSuggestion}
                      iconLeft={
                        isApplyingSuggestion ? (
                          <Spinner size="sm" className="text-text-inverse" />
                        ) : undefined
                      }
                    >
                      {isApplyingSuggestion ? "Applying suggestion..." : "Apply suggestion"}
                    </Button>
                  </div>
                </>
              )
            ) : (
              <p className="text-14 font-medium text-text-secondary">
                No suggestion is available for this question.
              </p>
            )}
          </SheetBody>
        </SheetContent>
      </Sheet>

      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent size="xl">
          <DialogHeader>Accuracy test - Nov 27, 9 AM</DialogHeader>
          <DialogBody className="flex flex-col gap-16">
            <div className="flex items-center justify-between gap-16">
              <p className="text-14 font-medium text-text-secondary">
                Physical alteration dataset
              </p>
              <AvatarGroup names={["Anaya Kumar", "Karan Shah"]} size="xs" max={3} />
            </div>

            <Card className="border-secondary-blue-100 bg-secondary-blue-50">
              <div className="flex flex-col gap-12 p-16">
                <div className="flex items-center justify-between gap-16">
                  <div className="flex items-center gap-8">
                    <Spinner size="sm" className="text-icon-brand" />
                    <p className="text-14 font-semibold text-text-primary">
                      Analyzing accuracy patterns for low-scoring questions.
                    </p>
                  </div>
                  <Badge color="blue" size="sm">
                    Running live
                  </Badge>
                </div>

                <p className="text-12 font-medium text-text-secondary">
                  {activeLiveMessage}
                </p>

                <div className="flex items-center gap-8 text-12 font-medium text-text-secondary">
                  <span className="inline-flex h-8 w-8 rounded-full bg-icon-brand animate-pulse" />
                  {analysisConversationProgress} conversations analyzed in this run
                </div>

                <div className="flex flex-col gap-6">
                  {liveAnalysisSteps.map((step, index) => {
                    const isCompleted = index < analysisStepIndex
                    const isActive = index === analysisStepIndex
                    return (
                      <div key={step} className="flex items-center gap-8">
                        {isCompleted ? (
                          <CheckCircle size={14} className="text-icon-success" />
                        ) : isActive ? (
                          <Spinner size="sm" className="text-icon-brand" />
                        ) : (
                          <span className="inline-flex h-14 w-14 rounded-full border border-border-subtle bg-surface-card" />
                        )}
                        <span
                          className={cn(
                            "text-12 font-medium",
                            isCompleted
                              ? "text-text-success"
                              : isActive
                                ? "text-text-primary"
                                : "text-text-secondary",
                          )}
                        >
                          {step}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <p className="text-12 font-medium text-text-secondary">
                  We&apos;ll email you when improvement suggestions are ready. You don&apos;t
                  need to stay on this page.
                </p>
              </div>
            </Card>

            <Card className="border-border-default bg-surface-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-surface-card">
                    <TableHead>Auto-QA question</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportQuestionRows.map((row) => {
                    const sourceQuestion = row.sourceQuestionId
                      ? questionRows.find((question) => question.id === row.sourceQuestionId)
                      : undefined
                    const isSourceApplied = sourceQuestion
                      ? appliedQuestionIds.includes(sourceQuestion.id)
                      : false
                    const canImproveFromReport =
                      sourceQuestion?.improvementStatus === "ready" &&
                      !!sourceQuestion.suggestion &&
                      !isSourceApplied
                    const isImproveAnalysisRunning =
                      sourceQuestion?.improvementStatus === "analysis" && !isSourceApplied

                    return (
                      <TableRow key={row.id}>
                        <TableCell className="text-14 font-medium text-text-primary">
                          {row.question}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-16 font-semibold",
                            getAccuracyTextColor(row.accuracy),
                          )}
                        >
                          {row.accuracy}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-8">
                            {isImproveAnalysisRunning ? (
                              <span className="inline-flex items-center gap-6 text-12 font-medium text-text-secondary">
                                <Spinner size="sm" className="text-icon-secondary" />
                                Analyzing
                              </span>
                            ) : null}
                            {canImproveFromReport && sourceQuestion ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-text-brand hover:bg-surface-brand-subtle"
                                iconLeft={<Stars02 size={14} />}
                                onClick={() =>
                                  handleOpenImproveFromReport(sourceQuestion.id)
                                }
                              >
                                Improve
                              </Button>
                            ) : null}
                            <Button variant="secondary" size="sm">
                              View details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
