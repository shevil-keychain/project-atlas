"use client"

import { ReasoningBlock } from "./reasoning"
import { WorkerCallCard } from "./worker-call-card"

type WorkerCall = {
  workerId: number
  worker: string
  question: string
  status: "pending" | "running" | "done"
  reasoning: string
  response: string
  durationSeconds?: number
}

type OrchestrationState = {
  workers: WorkerCall[]
  planningReasoning: string
  planningDone: boolean
  planningDurationSeconds?: number
}

type OrchestrationViewProps = {
  orchestration: OrchestrationState
  isStreaming: boolean
  reasoning: string
  reasoningDone?: boolean
  reasoningDurationSeconds?: number
}

export function OrchestrationView({
  orchestration,
  isStreaming,
  reasoning,
  reasoningDone,
  reasoningDurationSeconds,
}: OrchestrationViewProps) {
  const hasWorkers = orchestration.workers.length > 0
  const allDone = hasWorkers && orchestration.workers.every((w) => w.status === "done")
  const isPlanningPhase = isStreaming && !orchestration.planningDone && !hasWorkers
  const showSynthesisReasoning = allDone && (isStreaming || reasoning)

  return (
    <div className="mb-16 flex flex-col gap-16">
      {isPlanningPhase ? (
        <ReasoningBlock
          isStreaming={true}
          reasoning={orchestration.planningReasoning ?? ""}
        />
      ) : hasWorkers && orchestration.planningDone && (orchestration.planningReasoning || orchestration.planningDurationSeconds) ? (
        <ReasoningBlock
          isStreaming={false}
          reasoning={orchestration.planningReasoning ?? ""}
          durationSeconds={orchestration.planningDurationSeconds}
        />
      ) : null}

      {hasWorkers && (
        <div className="flex flex-col gap-8">
          {orchestration.workers.map((worker) => (
            <WorkerCallCard
              key={worker.workerId}
              worker={worker.worker}
              question={worker.question}
              status={worker.status}
              reasoning={worker.reasoning}
              response={worker.response}
              durationSeconds={worker.durationSeconds}
            />
          ))}
        </div>
      )}

      {/* Phase 3: Master synthesis reasoning (multi-worker only) */}
      {showSynthesisReasoning && (
        <ReasoningBlock
          isStreaming={isStreaming}
          reasoning={reasoning}
          reasoningDone={reasoningDone}
          durationSeconds={reasoningDurationSeconds}
        />
      )}
    </div>
  )
}
