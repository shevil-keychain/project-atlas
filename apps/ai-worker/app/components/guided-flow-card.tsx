"use client"

import { useState } from "react"
import { Button } from "@level/ui/components/ui/button"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@level/ui/components/ui/card"
import { Checkbox } from "@level/ui/components/ui/checkbox"
import { CheckboxWithLabel } from "@level/ui/components/ui/checkbox-with-label"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"
import { Input } from "@level/ui/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@level/ui/components/ui/radio-group"
import { RadioWithLabel } from "@level/ui/components/ui/radio-with-label"
import { ChevronDown, ChevronUp, ClipboardCheck, HelpCircle } from "@level/ui/components/icons"
import { cn } from "@level/ui/lib/utils"
import {
  type GuidedFlowPayload,
  type GuidedFlowQuestion,
  type GuidedFlowSubmission,
  type StepAnswer,
  getGuidedFlowAnswerSummary,
} from "../lib/guided-flow"

type GuidedFlowCardProps = {
  payload: GuidedFlowPayload
  submission?: GuidedFlowSubmission | null
  cancelled?: boolean
  disabled?: boolean
  onCancel: () => void
  onSubmit: (submission: GuidedFlowSubmission) => void
}

const createEmptyAnswers = (payload: GuidedFlowPayload) =>
  payload.questions.reduce<Record<string, StepAnswer>>((accumulator, question) => {
    accumulator[question.id] = { selectedIds: [] }
    return accumulator
  }, {})

const createExpandedOtherState = (payload: GuidedFlowPayload, submission?: GuidedFlowSubmission | null) =>
  payload.questions.reduce<Record<string, boolean>>((accumulator, question) => {
    accumulator[question.id] = Boolean(submission?.answers[question.id]?.freeText?.trim())
    return accumulator
  }, {})

const isAnswerComplete = (answer: StepAnswer | undefined) =>
  Boolean(answer && (answer.selectedIds.length > 0 || answer.freeText?.trim()))

const OTHER_OPTION_VALUE = "__guided-flow-other__"

const getOptionRowClassName = ({
  hasBorder = true,
  isSelected,
}: {
  hasBorder?: boolean
  isSelected: boolean
}) => {
  return cn(
    "w-full rounded-none px-20 py-16",
    hasBorder && "border-b border-border-default",
    isSelected ? "bg-surface-brand-subtle hover:bg-surface-brand-subtle" : "bg-surface-page hover:bg-interactive-secondary"
  )
}

export function GuidedFlowCard({
  payload,
  submission,
  cancelled = false,
  disabled = false,
  onCancel,
  onSubmit,
}: GuidedFlowCardProps) {
  const totalQuestions = payload.questions.length
  const [currentStep, setCurrentStep] = useState(0)
  const [furthestStep, setFurthestStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, StepAnswer>>(() => createEmptyAnswers(payload))
  const [expandedOtherState, setExpandedOtherState] = useState<Record<string, boolean>>(() =>
    createExpandedOtherState(payload)
  )

  if (cancelled) {
    return (
      <InlineAlert
        variant="info"
        title="Clarification skipped"
        description="Continue in chat if you want to add more context manually."
      />
    )
  }

  if (submission) {
    return (
      <Card className="rounded-lg border-border-default shadow-none">
        <CardHeader className="px-20 pb-0 pt-20">
          <div className="flex items-center gap-8">
            <span className="flex shrink-0 items-center justify-center text-icon-primary">
              <ClipboardCheck size={16} />
            </span>
            <CardTitle className="text-14 font-semibold">Answers</CardTitle>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-16 px-20 pb-20 pt-16">
          {payload.questions.map((question) => (
            <div key={question.id} className="flex flex-col gap-4">
              <p className="text-12 text-text-secondary">{question.question}</p>
              <p className="text-14 text-text-primary">
                {getGuidedFlowAnswerSummary(question, submission.answers[question.id]) || "Skipped"}
              </p>
            </div>
          ))}

          {submission.additionalContext?.trim() ? (
            <div className="flex flex-col gap-4">
              <p className="text-12 text-text-secondary">Additional context</p>
              <p className="whitespace-pre-wrap text-14 text-text-primary">
                {submission.additionalContext.trim()}
              </p>
            </div>
          ) : null}
        </CardBody>
      </Card>
    )
  }

  const currentQuestion = payload.questions[currentStep]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? { selectedIds: [] } : undefined
  const isLastStep = currentStep === totalQuestions - 1
  const isOtherSelected = Boolean(
    currentQuestion &&
      (expandedOtherState[currentQuestion.id] || currentAnswer?.freeText?.trim())
  )
  const currentRadioValue =
    currentAnswer?.selectedIds[0] ?? (isOtherSelected ? OTHER_OPTION_VALUE : "")
  const canGoToPreviousStep = currentStep > 0
  const canGoToNextStep =
    !isLastStep && (currentStep < furthestStep || isAnswerComplete(currentAnswer))

  const submitAnswers = (submissionAnswers: Record<string, StepAnswer>) => {
    onSubmit({
      answers: submissionAnswers,
    })
  }

  const moveToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalQuestions - 1)))
  }

  const unlockAndMoveToNextStep = () => {
    if (isLastStep) {
      return
    }

    const nextStep = Math.min(currentStep + 1, totalQuestions - 1)
    setFurthestStep((currentFurthestStep) => Math.max(currentFurthestStep, nextStep))
    moveToStep(nextStep)
  }

  const handleGoToPreviousStep = () => {
    if (!canGoToPreviousStep) {
      return
    }

    moveToStep(currentStep - 1)
  }

  const handleGoToNextStep = () => {
    if (!canGoToNextStep) {
      return
    }

    if (currentStep < furthestStep) {
      moveToStep(currentStep + 1)
      return
    }

    unlockAndMoveToNextStep()
  }

  const handleSelectSingleOption = (questionId: string, optionId: string) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: {
        freeText: "",
        selectedIds: [optionId],
      },
    }))
    setExpandedOtherState((currentExpandedState) => ({
      ...currentExpandedState,
      [questionId]: false,
    }))

    if (!isLastStep) {
      unlockAndMoveToNextStep()
    }
  }

  const handleToggleMultiOption = (questionId: string, optionId: string) => {
    setAnswers((currentAnswers) => {
      const currentAnswerValue = currentAnswers[questionId] ?? { selectedIds: [] }
      const selectedIds = currentAnswerValue.selectedIds.includes(optionId)
        ? currentAnswerValue.selectedIds.filter((selectedId) => selectedId !== optionId)
        : [...currentAnswerValue.selectedIds, optionId]

      return {
        ...currentAnswers,
        [questionId]: {
          ...currentAnswerValue,
          selectedIds,
        },
      }
    })
  }

  const handleExpandOther = (question: GuidedFlowQuestion) => {
    setAnswers((currentAnswers) => {
      const currentAnswerValue = currentAnswers[question.id] ?? { selectedIds: [] }

      return {
        ...currentAnswers,
        [question.id]: {
          freeText: currentAnswerValue.freeText ?? "",
          selectedIds: question.multiSelect ? currentAnswerValue.selectedIds : [],
        },
      }
    })
    setExpandedOtherState((currentExpandedState) => ({
      ...currentExpandedState,
      [question.id]: true,
    }))
  }

  const handleOtherChange = (question: GuidedFlowQuestion, value: string) => {
    setAnswers((currentAnswers) => {
      const currentAnswerValue = currentAnswers[question.id] ?? { selectedIds: [] }
      return {
        ...currentAnswers,
        [question.id]: {
          freeText: value,
          selectedIds: question.multiSelect ? currentAnswerValue.selectedIds : [],
        },
      }
    })
  }

  const handleSkip = () => {
    if (!currentQuestion) {
      return
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: { selectedIds: [] },
    }

    setAnswers(nextAnswers)
    setExpandedOtherState((currentExpandedState) => ({
      ...currentExpandedState,
      [currentQuestion.id]: false,
    }))

    if (isLastStep) {
      submitAnswers(nextAnswers)
      return
    }

    unlockAndMoveToNextStep()
  }

  const handleAdvance = () => {
    if (!isAnswerComplete(currentAnswer)) {
      return
    }

    if (isLastStep) {
      submitAnswers(answers)
      return
    }

    unlockAndMoveToNextStep()
  }

  return (
    <Card className="rounded-lg border-border-default shadow-none">
      <CardHeader className="px-20 pb-0 pt-20">
        <div className="flex items-start justify-between gap-12">
          <div className="min-w-0">
            <p className="text-16 font-semibold text-text-primary">{currentQuestion?.question}</p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-icon-secondary hover:text-icon-primary"
              onClick={handleGoToPreviousStep}
              disabled={disabled || !canGoToPreviousStep}
              aria-label="Go to previous question"
            >
              <ChevronUp size={16} />
            </Button>
            <div className="min-w-56 text-center text-14 font-semibold text-text-secondary">
              {`${currentStep + 1} of ${totalQuestions}`}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-icon-secondary hover:text-icon-primary"
              onClick={handleGoToNextStep}
              disabled={disabled || !canGoToNextStep}
              aria-label="Go to next question"
            >
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="flex flex-col gap-16 px-20 py-16">
        {currentQuestion ? (
          <div className="overflow-hidden rounded-lg border border-border-default bg-surface-page">
            {currentQuestion.multiSelect ? (
              <>
                {currentQuestion.options.map((option) => (
                  <CheckboxWithLabel
                    key={option.id}
                    checked={currentAnswer?.selectedIds.includes(option.id) ?? false}
                    onCheckedChange={() => handleToggleMultiOption(currentQuestion.id, option.id)}
                    label={option.label}
                    subtext={option.description}
                    disabled={disabled}
                    className={cn(
                      getOptionRowClassName({
                        isSelected: currentAnswer?.selectedIds.includes(option.id) ?? false,
                      }),
                      !option.description && "items-center"
                    )}
                  />
                ))}

                {!expandedOtherState[currentQuestion.id] && !currentAnswer?.freeText?.trim() ? (
                  <CheckboxWithLabel
                    checked={isOtherSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleExpandOther(currentQuestion)
                      }
                    }}
                    label="Type something else..."
                    disabled={disabled}
                    className={cn(
                      "h-56 items-center",
                      getOptionRowClassName({
                        hasBorder: false,
                        isSelected: isOtherSelected,
                      })
                    )}
                  />
                ) : (
                  <div className="flex h-56 items-center gap-12 bg-surface-brand-subtle px-20">
                    <Checkbox
                      checked={isOtherSelected}
                      className="pointer-events-none shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <Input
                        value={currentAnswer?.freeText ?? ""}
                        onChange={(event) => handleOtherChange(currentQuestion, event.target.value)}
                        placeholder="Type something else..."
                        disabled={disabled}
                        className="h-20 appearance-none border-0 bg-transparent px-0 py-0 text-14 text-text-primary placeholder:text-text-secondary hover:border-0 focus:border-0 focus:shadow-none"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <RadioGroup
                key={currentQuestion.id}
                value={currentRadioValue}
                onValueChange={(value) => {
                  if (value === OTHER_OPTION_VALUE) {
                    handleExpandOther(currentQuestion)
                    return
                  }

                  handleSelectSingleOption(currentQuestion.id, value)
                }}
                className="gap-0"
              >
                {currentQuestion.options.map((option) => (
                  <RadioWithLabel
                    key={option.id}
                    value={option.id}
                    label={option.label}
                    subtext={option.description}
                    disabled={disabled}
                    className={cn(
                      getOptionRowClassName({
                        isSelected: currentAnswer?.selectedIds.includes(option.id) ?? false,
                      }),
                      !option.description && "items-center"
                    )}
                  />
                ))}

                {!expandedOtherState[currentQuestion.id] && !currentAnswer?.freeText?.trim() ? (
                  <RadioWithLabel
                    value={OTHER_OPTION_VALUE}
                    label="Type something else..."
                    disabled={disabled}
                    className={cn(
                      "h-56 items-center",
                      getOptionRowClassName({
                        hasBorder: false,
                        isSelected: isOtherSelected,
                      })
                    )}
                  />
                ) : (
                  <div className="flex h-56 items-center gap-12 bg-surface-brand-subtle px-20">
                    <RadioGroupItem
                      value={OTHER_OPTION_VALUE}
                      className="pointer-events-none shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <Input
                        value={currentAnswer?.freeText ?? ""}
                        onChange={(event) => handleOtherChange(currentQuestion, event.target.value)}
                        placeholder="Type something else..."
                        disabled={disabled}
                        className="h-20 appearance-none border-0 bg-transparent px-0 py-0 text-14 text-text-primary placeholder:text-text-secondary hover:border-0 focus:border-0 focus:shadow-none"
                      />
                    </div>
                  </div>
                )}
              </RadioGroup>
            )}
          </div>
        ) : null}
      </CardBody>

      <CardFooter className="gap-12 px-24 pb-24 pt-0">
        <Button type="button" variant="secondary" size="default" onClick={handleSkip}>
          Skip
        </Button>
        <Button
          type="button"
          variant="default"
          size="default"
          onClick={handleAdvance}
          disabled={!isAnswerComplete(currentAnswer) || disabled}
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}
