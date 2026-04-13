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
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader } from "@level/ui/components/ui/sheet"
import { Label } from "@level/ui/components/ui/label"
import { Spinner } from "@level/ui/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@level/ui/components/ui/table"
import {
  Tabs,
  TabsContent,
  NeutralTabsList,
  NeutralTabsTrigger,
} from "@level/ui/components/ui/tabs"
import {
  ArrowRight,
  Check,
  ChevronDown,
  InfoCircle,
  LinkExternal02,
  SearchMd,
} from "@level/ui/components/icons"
import { cn } from "@level/ui/lib/utils"

function CallIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="13" height="13" rx="2.6" fill="#20ABE6"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.25777 3.21043C4.53446 3.07048 4.86121 3.07048 5.1379 3.21043C5.27849 3.28154 5.40054 3.40391 5.54174 3.54546C5.552 3.55575 5.56237 3.56614 5.57285 3.57662L5.63618 3.63996C5.64308 3.64686 5.64992 3.65369 5.6567 3.66045C5.74986 3.75346 5.83011 3.83357 5.88642 3.92017C6.09653 4.24333 6.09653 4.65994 5.88642 4.9831C5.83011 5.06969 5.74986 5.14981 5.6567 5.24282C5.64992 5.24958 5.64308 5.25641 5.63618 5.26331C5.61746 5.28204 5.6079 5.29164 5.60125 5.29868L5.6009 5.30042C5.60078 5.30113 5.60063 5.30237 5.60063 5.30237C5.6017 5.30475 5.60315 5.30789 5.60515 5.31213C5.60828 5.31877 5.61195 5.32642 5.61696 5.33687C5.8275 5.77538 6.11464 6.1867 6.47886 6.55092C6.84308 6.91514 7.2544 7.20228 7.69291 7.41282C7.70336 7.41784 7.71101 7.42151 7.71765 7.42463C7.72189 7.42663 7.72504 7.42808 7.72741 7.42915C7.72741 7.42915 7.72865 7.429 7.72936 7.42888L7.73111 7.42853C7.73814 7.42188 7.74775 7.41232 7.76647 7.3936C7.77338 7.3867 7.78021 7.37985 7.78697 7.37308C7.87997 7.27992 7.96009 7.19967 8.04668 7.14336C8.36984 6.93325 8.78645 6.93325 9.10961 7.14336C9.19621 7.19967 9.27632 7.27992 9.36933 7.37308C9.37609 7.37985 9.38292 7.3867 9.38983 7.3936L9.45316 7.45694C9.46364 7.46742 9.47403 7.47778 9.48432 7.48804C9.62587 7.62924 9.74824 7.75129 9.81935 7.89189C9.9593 8.16857 9.9593 8.49533 9.81935 8.77201C9.74824 8.91261 9.62587 9.03466 9.48432 9.17586C9.47403 9.18612 9.46364 9.19648 9.45316 9.20696L9.40193 9.25819C9.39451 9.26561 9.38718 9.27295 9.37993 9.28021C9.22872 9.43157 9.11276 9.54765 8.95609 9.63566C8.77736 9.73606 8.52053 9.80285 8.31553 9.80224C8.13617 9.80171 8.00536 9.76453 7.83669 9.71659C7.83064 9.71487 7.82453 9.71314 7.81838 9.71139C6.78058 9.41683 5.80138 8.86097 4.9851 8.04469C4.16881 7.2284 3.61295 6.2492 3.31839 5.2114C3.31665 5.20525 3.31491 5.19915 3.31319 5.1931C3.26525 5.02442 3.22808 4.89362 3.22754 4.71425C3.22693 4.50925 3.29372 4.25243 3.39412 4.07369C3.48213 3.91702 3.59821 3.80106 3.74957 3.64986C3.75683 3.64261 3.76417 3.63527 3.77159 3.62785L3.82282 3.57662C3.8333 3.56614 3.84367 3.55575 3.85393 3.54546C3.99512 3.40391 4.11718 3.28154 4.25777 3.21043Z" fill="white"/>
    </svg>
  )
}

function ChatIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="12" rx="2.4" fill="#AD79EF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6C9 7.65685 7.65685 9 6 9C5.6015 9 5.22045 8.92214 4.87176 8.78053C4.84027 8.76774 4.82209 8.76039 4.80866 8.75534C4.80707 8.75475 4.80569 8.75424 4.80451 8.75381L4.80309 8.754C4.79202 8.7555 4.77693 8.75798 4.74811 8.76279L3.68075 8.94068C3.6779 8.94116 3.67503 8.94164 3.67213 8.94212C3.62394 8.95017 3.57003 8.95917 3.52321 8.9627C3.47216 8.96656 3.39094 8.9679 3.3051 8.93108C3.19899 8.88557 3.11443 8.80101 3.06892 8.6949C3.0321 8.60906 3.03344 8.52784 3.0373 8.47679C3.04083 8.42997 3.04984 8.37605 3.05788 8.32787C3.05837 8.32497 3.05885 8.3221 3.05932 8.31925L3.23721 7.25189C3.24202 7.22307 3.2445 7.20798 3.246 7.19691L3.24619 7.19548C3.24576 7.1943 3.24525 7.19293 3.24466 7.19134C3.23962 7.17791 3.23226 7.15973 3.21947 7.12824C3.07786 6.77955 3 6.3985 3 6Z" fill="#F9F8F8"/>
    </svg>
  )
}

type ConversationFeedback = {
  id: string
  channel: "call" | "chat"
  autoQaAnswer: string
  autoQaReasoning: string
  humanReviewer: string
  humanAnswer: string
  humanReasoning: string
}

type SetupMethod = "prompt" | "agent-tag" | "dynamic-tag" | "metric-tag" | "metadata" | "advanced"

type TagPhrase = {
  text: string
  matchType: "Intent match" | "Exact match"
}

type TagBehavior = {
  name: string
  description: string
  examplePhrases: TagPhrase[]
  exclusionPhrases?: TagPhrase[]
}

type TagSetup = {
  tagName: string
  tagCategory: string
  behaviors: TagBehavior[]
  logic: string[]
}

type MetricThreshold = {
  channel: string
  operator: string
  value: string
}

type MetricTagSetup = {
  questionName: string
  metricName: string
  thresholds: MetricThreshold[]
}

type MetadataCondition = {
  field: string
  operator: string
  value: string
}

type MetadataSetup = {
  conditions: MetadataCondition[]
}

type ConditionData = {
  promptText?: string
  tagSetup?: TagSetup
  metricTagSetup?: MetricTagSetup
  metadataSetup?: MetadataSetup
}

type AdvancedConditionPair = {
  id: string
  type: "prompt" | "conversation-tag" | "metric-tag" | "metadata"
  label: string
  current: ConditionData
  suggested?: ConditionData | null
}

type QuestionSuggestion = {
  potentialAccuracy: number
  diagnosis: string
  setupMethod: SetupMethod
  removedLine: string
  addedLine: string
  currentTagSetup?: TagSetup
  suggestedTagSetup?: TagSetup
  advancedConditions?: AdvancedConditionPair[]
  conversationFeedback: ConversationFeedback[]
}

type QuestionRow = {
  id: string
  question: string
  accuracy: number
  reportName: string
  datasetName: string
  reviewers: string[]
  reviewerColors?: string[]
  hasImprove?: boolean
  suggestion?: QuestionSuggestion
}

const settingsNavGroups = [
  {
    label: "Organizational unit mgmt.",
    items: [
      "Users",
      "Teams",
      "Report sharing",
      "Custom fields",
      "QA case assignment",
      "Notifications",
      "Audit logs",
    ],
  },
  {
    label: "Scripting engine",
    items: [
      "Scenarios",
      "Conversation tags",
      "Metric tags",
      "Categories",
      "Rubric builder",
    ],
  },
  {
    label: "Knowledge center",
    items: ["FAQs", "Resources", "Integrations"],
  },
]

const questionRows: QuestionRow[] = [
  {
    id: "q1",
    question: "Did the agent ask the customer to repeat themselves?",
    accuracy: 49,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
    hasImprove: true,
    suggestion: {
      potentialAccuracy: 85,
      diagnosis:
        "AutoQA only catches explicit repetition requests like 'please repeat that.' It misses indirect phrases where the agent asks the customer to go over something again — e.g. 'could you walk me through that one more time' or 'can you run that by me again.'",
      setupMethod: "prompt",
      removedLine:
        "Answer 'Yes' if the agent explicitly asked the customer to repeat information they already provided.",
      addedLine:
        "Answer 'Yes' if the agent explicitly or indirectly asked the customer to repeat information — including phrases like 'one more time,' 'walk me through that again,' 'can you say that again,' or any request that forces the customer to re-state something.",
      conversationFeedback: [
        {
          id: "135824",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning:
            "The agent did not explicitly ask the customer to repeat any information during the conversation.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning:
            "Agent typed 'could you go over the issue one more time for me?' at 3:12 — this is an indirect request to repeat. AutoQA missed it because it wasn't a literal 'please repeat' phrase.",
        },
        {
          id: "128907",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning:
            "The agent did not ask the customer to repeat any previously shared information. The agent said:\n0:48  Let me make sure I understand — can you run that by me again?",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning:
            "The agent said 'can you run that by me again?' which is clearly asking the customer to repeat. AutoQA should have flagged this as indirect repetition.",
        },
        {
          id: "141562",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning:
            "The agent did not use explicit repetition language during the chat session.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning:
            "Agent wrote 'sorry I missed that, would you mind walking me through the steps again?' — this forces the customer to re-state what they already explained.",
        },
        {
          id: "149201",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning:
            "The agent did not request the customer to repeat any information during the call.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning:
            "At 1:35 the agent said 'I didn't quite catch the order number, could you say that one more time?' — phrased politely but still a repetition request that AutoQA missed.",
        },
        {
          id: "152387",
          channel: "call",
          autoQaAnswer: "Yes",
          autoQaReasoning:
            "The agent asked the customer to repeat themselves. The agent said:\n0:22  Let me pull up your account — can you confirm the details?",
          humanReviewer: "Sarah Chen",
          humanAnswer: "No",
          humanReasoning:
            "Asking to 'confirm details' when pulling up an account is standard verification, not asking the customer to repeat themselves. AutoQA incorrectly flagged this as repetition.",
        },
      ],
    },
  },
  {
    id: "q2",
    question: "Did the agent proactively reduce the customer's effort?",
    accuracy: 55,
    reportName: "Accuracy test -  Dec 21, 11 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Karan Shah"],
    reviewerColors: ["#1A89B8"],
  },
  {
    id: "q3",
    question:
      "Did the agent express willingness to assist during the conversation?",
    accuracy: 61,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
  },
  {
    id: "q4",
    question: "Did the agent greet the customer?",
    accuracy: 73,
    reportName: "Accuracy test -  Dec 21, 11 AM",
    datasetName: "Physical alteration dataset",
    reviewers: ["Karan Shah"],
    reviewerColors: ["#1A89B8"],
  },
  {
    id: "q5",
    question:
      "Did the agent use any profane language or was rude towards the customer during the conversation?",
    accuracy: 77,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
  },
  {
    id: "q6",
    question: "Did the agent greet the customer?",
    accuracy: 79,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
  },
  {
    id: "q7",
    question: "Did the agent proactively reduced the customer's effort?",
    accuracy: 85,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
  },
  {
    id: "q8",
    question:
      "Did the agent empathize with the angry customer to de-escalate the issue?",
    accuracy: 89,
    reportName: "Accuracy test -  Nov 27, 9 AM",
    datasetName: "Level AI default dataset",
    reviewers: ["Anaya Kumar", "Karan Shah"],
    reviewerColors: ["#9062CB", "#1A89B8"],
  },
]

const setupMethodLabels: Record<SetupMethod, string> = {
  prompt: "PROMPT",
  "agent-tag": "CONVERSATION TAG",
  "dynamic-tag": "CONVERSATION TAG",
  "metric-tag": "METRIC TAG",
  metadata: "METADATA",
  advanced: "ADVANCED SETUP",
}

const stateOptions = [
  { value: "prompt", label: "Prompt" },
  { value: "agent-tag", label: "Agent tag" },
  { value: "dynamic-tag", label: "Dynamic tag" },
  { value: "advanced", label: "Advanced setup" },
  { value: "loading", label: "Loading" },
] as const

const suggestionsByState: Record<string, { question: string; accuracy: number; suggestion: QuestionSuggestion }> = {
  prompt: {
    question: "Did the agent ask the customer to repeat themselves?",
    accuracy: 49,
    suggestion: {
      potentialAccuracy: 85,
      diagnosis:
        "AutoQA only catches explicit repetition requests like 'please repeat that.' It misses indirect phrases where the agent asks the customer to go over something again — e.g. 'could you walk me through that one more time' or 'can you run that by me again.'",
      setupMethod: "prompt",
      removedLine:
        "Answer 'Yes' if the agent explicitly asked the customer to repeat information they already provided.",
      addedLine:
        "Answer 'Yes' if the agent explicitly or indirectly asked the customer to repeat information — including phrases like 'one more time,' 'walk me through that again,' 'can you say that again,' or any request that forces the customer to re-state something.",
      conversationFeedback: [
        {
          id: "135824",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "The agent did not explicitly ask the customer to repeat any information during the conversation.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent typed 'could you go over the issue one more time for me?' at 3:12 — this is an indirect request to repeat. AutoQA missed it because it wasn't a literal 'please repeat' phrase.",
        },
        {
          id: "128907",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "The agent did not ask the customer to repeat any previously shared information. The agent said:\n0:48  Let me make sure I understand — can you run that by me again?",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "The agent said 'can you run that by me again?' which is clearly asking the customer to repeat. AutoQA should have flagged this as indirect repetition.",
        },
        {
          id: "141562",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "The agent did not use explicit repetition language during the chat session.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent wrote 'sorry I missed that, would you mind walking me through the steps again?' — this forces the customer to re-state what they already explained.",
        },
        {
          id: "149201",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "The agent did not request the customer to repeat any information during the call.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "At 1:35 the agent said 'I didn't quite catch the order number, could you say that one more time?' — phrased politely but still a repetition request that AutoQA missed.",
        },
        {
          id: "152387",
          channel: "call",
          autoQaAnswer: "Yes",
          autoQaReasoning: "The agent asked the customer to repeat themselves. The agent said:\n0:22  Let me pull up your account — can you confirm the details?",
          humanReviewer: "Sarah Chen",
          humanAnswer: "No",
          humanReasoning: "Asking to 'confirm details' when pulling up an account is standard verification, not asking the customer to repeat themselves. AutoQA incorrectly flagged this as repetition.",
        },
      ],
    },
  },
  "agent-tag": {
    question: "Did the agent maintain professionalism throughout the call?",
    accuracy: 58,
    suggestion: {
      potentialAccuracy: 84,
      diagnosis:
        "The conversation tag 'Professionalism' only catches a narrow set of polite phrases. It misses common professional behaviors like proactive reassurance, ownership language, and composed responses to difficult customers.",
      setupMethod: "agent-tag",
      removedLine: "",
      addedLine: "",
      currentTagSetup: {
        tagName: "Professionalism",
        tagCategory: "Agent behavior",
        behaviors: [
          {
            name: "Agent behavior",
            description: "Agent maintained professionalism throughout the call",
            examplePhrases: [
              { text: "I completely understand your concern, let me look into this right away for you", matchType: "Intent match" },
              { text: "I appreciate you bringing this up", matchType: "Intent match" },
              { text: "I want to ensure you feel comfortable with the next steps before we proceed", matchType: "Intent match" },
            ],
            exclusionPhrases: [
              { text: "Thanks for waiting", matchType: "Intent match" },
            ],
          },
        ],
        logic: [
          "If agent behavior is captured anytime in the conversation",
          "Then trigger the tag as followed otherwise don't trigger",
        ],
      },
      suggestedTagSetup: {
        tagName: "Professionalism",
        tagCategory: "Agent behavior",
        behaviors: [
          {
            name: "Agent behavior",
            description: "Agent maintained professionalism throughout the call",
            examplePhrases: [
              { text: "I completely understand your concern, let me look into this right away for you", matchType: "Intent match" },
              { text: "I appreciate you bringing this up", matchType: "Intent match" },
              { text: "I want to ensure you feel comfortable with the next steps before we proceed", matchType: "Intent match" },
              { text: "I take full responsibility and I'll make sure this gets resolved", matchType: "Intent match" },
              { text: "I understand this is frustrating, let me see what I can do", matchType: "Intent match" },
            ],
            exclusionPhrases: [
              { text: "Thanks for waiting", matchType: "Intent match" },
              { text: "That's not my department", matchType: "Intent match" },
            ],
          },
        ],
        logic: [
          "If agent behavior is captured anytime in the conversation",
          "Then trigger the tag as followed otherwise don't trigger",
        ],
      },
      conversationFeedback: [
        {
          id: "172341",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "The conversation tag 'Professionalism' was not detected — no configured example phrases matched.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "At 2:10 the agent said 'I take full responsibility for the confusion and I'll make sure we get this sorted out today.' This is clearly professional behavior — the tag just doesn't have ownership-style phrases configured.",
        },
        {
          id: "178502",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "No match found for the configured professionalism phrases in the call transcript.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "Agent said 'I understand this is frustrating, let me see what options we have to make this right' at 1:45. This is composed and professional — it's just not in the current phrase list.",
        },
        {
          id: "181294",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "The conversation tag 'Professionalism' was not triggered during this chat session.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent typed 'I hear you, and I want to make sure we resolve this properly — let me escalate this to the right team.' Professional and proactive, but the tag missed it.",
        },
        {
          id: "185730",
          channel: "call",
          autoQaAnswer: "Yes",
          autoQaReasoning: "The conversation tag 'Professionalism' was triggered — matched 'I appreciate you bringing this up' at 0:30.",
          humanReviewer: "James Park",
          humanAnswer: "No",
          humanReasoning: "The agent said 'I appreciate you bringing this up' but then immediately dismissed the customer's concern with 'but there's nothing we can do about it.' The phrase matched but the overall tone was dismissive, not professional.",
        },
        {
          id: "189043",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "No professionalism tag match found in this chat transcript.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent wrote 'I completely understand how inconvenient this must be — let me personally follow up on this and get back to you within the hour.' Very professional, but the tag only covers a narrow set of phrases.",
        },
      ],
    },
  },
  "dynamic-tag": {
    question: "Did the agent apologize when the customer complained?",
    accuracy: 51,
    suggestion: {
      potentialAccuracy: 81,
      diagnosis:
        "The conversation tag 'Agent Apology on Customer Complaint' misses many customer complaint variations and only catches a few apology phrases. Customers express frustration in many ways beyond the configured phrases, and agents often acknowledge without using the word 'apologize.'",
      setupMethod: "dynamic-tag",
      removedLine: "",
      addedLine: "",
      currentTagSetup: {
        tagName: "Agent apology on customer complaint",
        tagCategory: "Agent response on customer behavior",
        behaviors: [
          {
            name: "Customer behavior",
            description: "Capture instances of customer complaints",
            examplePhrases: [
              { text: "Your representative was rude to me during the call", matchType: "Intent match" },
              { text: "There should be an option to filter by price", matchType: "Intent match" },
              { text: "I want a refund", matchType: "Exact match" },
              { text: "This product isn't working as expected, and I'm really frustrated", matchType: "Intent match" },
              { text: "Why does it take so long to get a simple issue fixed?", matchType: "Intent match" },
            ],
          },
          {
            name: "Agent behavior",
            description: "Capture instances of agent apology or acknowledgment",
            examplePhrases: [
              { text: "I sincerely apologize for the inconvenience", matchType: "Intent match" },
              { text: "I'm sorry to hear that", matchType: "Exact match" },
              { text: "I understand your frustration", matchType: "Intent match" },
              { text: "I apologize for the trouble", matchType: "Intent match" },
              { text: "I'm sorry you had to deal with this", matchType: "Intent match" },
            ],
          },
        ],
        logic: [
          "If customer behavior is captured anytime in the conversation",
          "And agent behavior is captured anytime after customer behavior",
          "Then trigger the tag as followed otherwise don't trigger",
        ],
      },
      suggestedTagSetup: {
        tagName: "Agent apology on customer complaint",
        tagCategory: "Agent response on customer behavior",
        behaviors: [
          {
            name: "Customer behavior",
            description: "Capture instances of customer complaints",
            examplePhrases: [
              { text: "Your representative was rude to me during the call", matchType: "Intent match" },
              { text: "There should be an option to filter by price", matchType: "Intent match" },
              { text: "I want a refund", matchType: "Exact match" },
              { text: "This product isn't working as expected, and I'm really frustrated", matchType: "Intent match" },
              { text: "Why does it take so long to get a simple issue fixed?", matchType: "Intent match" },
              { text: "I've been waiting forever and no one is helping me", matchType: "Intent match" },
              { text: "This is completely unacceptable", matchType: "Intent match" },
            ],
          },
          {
            name: "Agent behavior",
            description: "Capture instances of agent apology or acknowledgment",
            examplePhrases: [
              { text: "I sincerely apologize for the inconvenience", matchType: "Intent match" },
              { text: "I'm sorry to hear that", matchType: "Exact match" },
              { text: "I understand your frustration", matchType: "Intent match" },
              { text: "I apologize for the trouble", matchType: "Intent match" },
              { text: "I'm sorry you had to deal with this", matchType: "Intent match" },
              { text: "I completely understand your frustration and I want to help", matchType: "Intent match" },
              { text: "Let me make this right for you", matchType: "Intent match" },
            ],
          },
        ],
        logic: [
          "If customer behavior is captured anytime in the conversation",
          "And agent behavior is captured anytime after customer behavior",
          "Then trigger the tag as followed otherwise don't trigger",
        ],
      },
      conversationFeedback: [
        {
          id: "192041",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "Customer behavior tag was not triggered — no configured complaint phrases matched.\nAgent behavior tag was not evaluated.\nResult: No.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "Customer said 'I've been on hold for 45 minutes and nobody seems to care' at 0:15 — this is a clear complaint but doesn't match the configured phrases. Agent responded 'I completely understand your frustration and I want to make sure we resolve this today.' Both behaviors were present.",
        },
        {
          id: "195823",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "Customer behavior: no match found.\nAgent behavior: not evaluated.\nResult: No.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Customer typed 'this is completely unacceptable — I was promised a callback that never happened.' Agent replied 'I sincerely apologize for the missed callback, that should not have happened.' The tag missed the complaint because 'completely unacceptable' isn't in the phrase list.",
        },
        {
          id: "198307",
          channel: "call",
          autoQaAnswer: "Yes",
          autoQaReasoning: "Customer behavior: matched 'This product isn't working as expected' at 0:30.\nAgent behavior: matched 'I appreciate you bringing this up' at 0:45.\nResult: Both conditions met → Yes.",
          humanReviewer: "James Park",
          humanAnswer: "No",
          humanReasoning: "The customer described a product issue calmly ('it's not working as expected, can you help me troubleshoot?') — this was a support request, not a complaint. The agent acknowledged but never apologized because no apology was needed. The tag shouldn't have fired.",
        },
        {
          id: "201456",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "Customer behavior: no configured phrases matched.\nAgent behavior: not evaluated.\nResult: No.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Customer said 'I'm really disappointed with the level of service I've received' — a clear complaint. Agent said 'let me make this right for you, I apologize for the experience.' Both behaviors occurred but the tag's phrase list is too narrow.",
        },
        {
          id: "204789",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "Customer behavior: no match detected.\nAgent behavior: not evaluated.\nResult: No.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "Customer wrote 'every time I call I get a different answer, this is so frustrating.' Agent responded 'I understand how confusing that must be, and I take full responsibility for getting you the right answer now.' Both complaint and apology happened — just not with the configured phrases.",
        },
      ],
    },
  },
  advanced: {
    question: "Did the agent verify the customer's identity before making account changes?",
    accuracy: 54,
    suggestion: {
      potentialAccuracy: 82,
      diagnosis:
        "This question uses an advanced setup with 4 conditions — a prompt, a conversation tag, a metric tag, and a metadata filter. The main issue is in Condition A (Prompt): it only checks whether the agent asked for an account number, missing other valid verification methods like security questions or date of birth. The other 3 conditions don't need changes.",
      setupMethod: "advanced",
      removedLine: "",
      addedLine: "",
      advancedConditions: [
        {
          id: "c1",
          type: "prompt",
          label: "A",
          current: {
            promptText: "Answer 'Yes' if the agent asked for the customer's account number before making any changes.",
          },
          suggested: {
            promptText: "Answer 'Yes' if the agent verified the customer's identity through account number, security questions, or date of birth before making any changes.",
          },
        },
        {
          id: "c2",
          type: "conversation-tag",
          label: "B",
          current: {
            tagSetup: {
              tagName: "Account Change Requested",
              tagCategory: "Customer behavior",
              behaviors: [
                {
                  name: "Customer behavior",
                  description: "Capture instances where the customer requests an account modification",
                  examplePhrases: [
                    { text: "I need to update my billing address", matchType: "Intent match" },
                    { text: "Can you change my plan", matchType: "Intent match" },
                    { text: "I want to cancel my subscription", matchType: "Exact match" },
                  ],
                },
              ],
              logic: [
                "If customer behavior is captured anytime in the conversation",
                "Then trigger the tag as followed otherwise don't trigger",
              ],
            },
          },
        },
        {
          id: "c3",
          type: "metric-tag",
          label: "C",
          current: {
            metricTagSetup: {
              questionName: "Did the agent avoid rushing through verification",
              metricName: "Verification duration",
              thresholds: [
                { channel: "Call", operator: "Greater than or equals to", value: "30 second(s)" },
                { channel: "Chat", operator: "Greater than or equals to", value: "45 second(s)" },
              ],
            },
          },
        },
        {
          id: "c4",
          type: "metadata",
          label: "D",
          current: {
            metadataSetup: {
              conditions: [
                { field: "Channel", operator: "Equals", value: "Call" },
                { field: "Team", operator: "Does not equal", value: "AI Virtual Agent" },
              ],
            },
          },
        },
      ],
      conversationFeedback: [
        {
          id: "201453",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "Condition A: Agent did not ask for account number.\nCondition B: 'Account Change Requested' tag not detected.\nCondition C: Verification duration was 12s (below 30s threshold).\nCondition D: Channel = Call, Team = Support → passed.\nResult: A, B, C failed → No.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "The agent verified identity through security questions ('Can you confirm the last four digits of your SSN and your date of birth?') and the customer said 'I need to update my billing address.' The prompt only checks for account number, not security questions. The tag missed the paraphrased change request.",
        },
        {
          id: "205891",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "Condition A: No account number request detected.\nCondition B: 'Account Change Requested' tag not matched.\nCondition C: Verification duration was 38s (below 45s threshold for chat).\nCondition D: Channel = Chat → failed (metadata only allows Call).\nResult: No.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent asked 'for security, can you confirm your date of birth and the email on file?' then the customer asked to 'modify my plan to the premium tier.' All conditions were actually met — the setup is too narrow across every dimension.",
        },
        {
          id: "210274",
          channel: "call",
          autoQaAnswer: "Yes",
          autoQaReasoning: "Condition A: Agent asked for account number at 0:35.\nCondition B: 'Account Change Requested' tag detected at 1:10.\nCondition C: Verification duration was 45s.\nCondition D: Channel = Call, Team = Support → passed.\nResult: All conditions met → Yes.",
          humanReviewer: "James Park",
          humanAnswer: "No",
          humanReasoning: "The agent asked for the account number, but the customer declined to provide it and the agent proceeded to make changes anyway using the phone number lookup. Identity was not properly verified — just asking isn't enough, they need to actually confirm it.",
        },
        {
          id: "214603",
          channel: "call",
          autoQaAnswer: "No",
          autoQaReasoning: "Condition A: No account number verification detected.\nCondition B: Tag not matched.\nCondition C: Duration was 20s (below threshold).\nCondition D: Passed.\nResult: No.",
          humanReviewer: "Sarah Chen",
          humanAnswer: "Yes",
          humanReasoning: "Agent verified via security questions and customer asked to 'change my shipping address.' The prompt and tag conditions are both too narrow to detect the paraphrased versions.",
        },
        {
          id: "218937",
          channel: "chat",
          autoQaAnswer: "No",
          autoQaReasoning: "Condition A: Agent did not request account number.\nCondition B: Tag not detected.\nCondition C: Duration was 25s (below 45s chat threshold).\nCondition D: Channel = Chat → failed.\nResult: No.",
          humanReviewer: "James Park",
          humanAnswer: "Yes",
          humanReasoning: "Agent asked 'please verify your identity by confirming the last 4 digits of the card on file' and customer said 'I want to update my contact info.' The setup is too rigid across all four conditions.",
        },
      ],
    },
  },
}

function TagSetupBox({ tagSetup, variant }: { tagSetup: TagSetup; variant: "current" | "suggested" }) {
  const bg = variant === "current" ? "bg-[#fdf3f1]" : "bg-[#f4fdf8]"
  return (
    <div className={cn("flex flex-col gap-20 rounded-lg px-16 py-16", bg)}>
      <span className="text-[10px] font-medium tracking-[0.4px] text-text-secondary">
        CONVERSATION TAG
      </span>

      {/* Tag name card */}
      <div className="flex items-center justify-between rounded-lg border border-border-default bg-surface-primary px-12 py-12">
        <div className="flex flex-col gap-2">
          <span className="text-14 font-bold text-text-primary">{tagSetup.tagName}</span>
          <span className="text-12 font-medium text-text-secondary">{tagSetup.tagCategory}</span>
        </div>
        <LinkExternal02 size={16} className="text-text-secondary" />
      </div>

      {/* Behaviors */}
      {tagSetup.behaviors.map((behavior, i) => (
        <div key={i} className="flex flex-col gap-12">
          <p className="text-14 font-bold text-text-primary">{behavior.name}</p>

          <div className="flex flex-col gap-4">
            <p className="text-12 font-medium text-text-secondary">Description</p>
            <p className="text-14 font-medium text-text-primary">{behavior.description}</p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-12 font-medium text-text-secondary">Example phrases</p>
            <ul className="flex flex-col gap-4 pl-4">
              {behavior.examplePhrases.map((phrase, j) => (
                <li key={j} className="flex items-start gap-6 text-14 font-medium text-text-primary">
                  <span className="mt-[9px] size-[4px] shrink-0 rounded-full bg-text-primary" />
                  <span>{phrase.text} ({phrase.matchType})</span>
                </li>
              ))}
            </ul>
          </div>

          {behavior.exclusionPhrases && behavior.exclusionPhrases.length > 0 && (
            <div className="flex flex-col gap-6">
              <p className="text-12 font-medium text-text-secondary">Exclusion phrases</p>
              <ul className="flex flex-col gap-4 pl-4">
                {behavior.exclusionPhrases.map((phrase, j) => (
                  <li key={j} className="flex items-start gap-6 text-14 font-medium text-text-primary">
                    <span className="mt-[9px] size-[4px] shrink-0 rounded-full bg-text-primary" />
                    <span>{phrase.text} ({phrase.matchType})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Logic */}
      <div className="flex flex-col gap-6">
        <p className="text-14 font-bold text-text-primary">Logic</p>
        <ul className="flex flex-col gap-4 pl-4">
          {tagSetup.logic.map((rule, i) => (
            <li key={i} className="flex items-start gap-6 text-14 font-medium text-text-primary">
              <span className="mt-[9px] size-[4px] shrink-0 rounded-full bg-text-primary" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const conditionTypeLabels: Record<AdvancedConditionPair["type"], string> = {
  prompt: "PROMPT",
  "conversation-tag": "CONVERSATION TAG",
  "metric-tag": "METRIC TAG",
  metadata: "METADATA",
}

const conditionBadgeColors: Record<string, string> = {
  A: "bg-[#46a680]",
  B: "bg-[#3a91b4]",
  C: "bg-[#f07400]",
  D: "bg-[#9062cb]",
}

function ConditionBadge({ letter }: { letter: string }) {
  return (
    <span className={cn(
      "flex size-24 items-center justify-center rounded-[8px] text-14 font-semibold leading-[24px] text-[#fcfcfb]",
      conditionBadgeColors[letter] ?? "bg-[#46a680]"
    )}>
      {letter}
    </span>
  )
}

function ConditionDataContent({ data, type }: { data: ConditionData; type: AdvancedConditionPair["type"] }) {
  if (type === "prompt" && data.promptText) {
    return (
      <p className="text-14 font-medium leading-[24px] text-text-primary">
        {data.promptText}
      </p>
    )
  }

  if (type === "conversation-tag" && data.tagSetup) {
    const tag = data.tagSetup
    return (
      <div className="flex flex-col gap-16">
        <div className="flex items-center justify-between rounded-lg border border-border-default bg-surface-primary px-12 py-12">
          <div className="flex flex-col gap-2">
            <span className="text-14 font-bold text-text-primary">{tag.tagName}</span>
            <span className="text-12 font-medium text-text-secondary">{tag.tagCategory}</span>
          </div>
          <LinkExternal02 size={16} className="text-text-secondary" />
        </div>
        {tag.behaviors.map((behavior, i) => (
          <div key={i} className="flex flex-col gap-12">
            <p className="text-14 font-bold text-text-primary">{behavior.name}</p>
            <div className="flex flex-col gap-4">
              <p className="text-12 font-medium text-text-secondary">Description</p>
              <p className="text-14 font-medium text-text-primary">{behavior.description}</p>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-12 font-medium text-text-secondary">Example phrases</p>
              <ul className="flex flex-col gap-4 pl-4">
                {behavior.examplePhrases.map((phrase, j) => (
                  <li key={j} className="flex items-start gap-6 text-14 font-medium text-text-primary">
                    <span className="mt-[9px] size-[4px] shrink-0 rounded-full bg-text-primary" />
                    <span>{phrase.text} ({phrase.matchType})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-6">
          <p className="text-14 font-bold text-text-primary">Logic</p>
          <ul className="flex flex-col gap-4 pl-4">
            {tag.logic.map((rule, i2) => (
              <li key={i2} className="flex items-start gap-6 text-14 font-medium text-text-primary">
                <span className="mt-[9px] size-[4px] shrink-0 rounded-full bg-text-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (type === "metric-tag" && data.metricTagSetup) {
    const setup = data.metricTagSetup
    return (
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between rounded-lg border border-border-default bg-surface-primary px-12 py-12">
          <span className="text-14 font-bold text-text-primary">{setup.questionName}</span>
          <LinkExternal02 size={16} className="text-text-secondary" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-12 font-medium text-text-secondary">Metric</p>
          <p className="text-14 font-medium text-text-primary">{setup.metricName}</p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-12 font-medium text-text-secondary">Threshold</p>
          <div className="flex flex-col gap-4">
            {setup.thresholds.map((t, i) => (
              <div key={i} className="flex items-baseline gap-12 text-14 font-medium text-text-primary">
                <span className="w-[48px] font-bold">{t.channel}</span>
                <span>{t.operator} {t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === "metadata" && data.metadataSetup) {
    const setup = data.metadataSetup
    return (
      <div className="flex flex-col gap-10">
        {setup.conditions.map((cond, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className="flex items-center">
                <span className="rounded border border-border-default bg-surface-primary px-8 py-2 text-12 font-bold text-text-primary">
                  AND
                </span>
              </div>
            )}
            <div className="flex items-center gap-8">
              <div className="flex-1 rounded-lg border border-border-default bg-surface-primary px-12 py-10">
                <span className="text-12 font-medium text-text-secondary">{cond.field}</span>
              </div>
              <div className="flex-1 rounded-lg border border-border-default bg-surface-primary px-12 py-10 text-center">
                <span className="text-14 font-medium text-text-primary">{cond.operator}</span>
              </div>
              <div className="flex-1 rounded-lg border border-border-default bg-surface-primary px-12 py-10 text-right">
                <span className="text-14 font-medium text-text-primary">{cond.value}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }

  return null
}

function SetupBlock({ variant, children }: { variant: "current" | "suggested"; children: React.ReactNode }) {
  const bg = variant === "current" ? "bg-[#fdf3f1]" : "bg-[#f4fdf8]"
  return (
    <div className={cn("rounded-lg px-16 py-14", bg)}>
      {children}
    </div>
  )
}

function AdvancedConditionSection({
  pair,
  isExpanded,
  onToggle,
}: {
  pair: AdvancedConditionPair
  isExpanded: boolean
  onToggle: () => void
}) {
  const hasSuggestion = !!pair.suggested
  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-16 py-12"
      >
        <ConditionBadge letter={pair.label} />
        <ChevronDown
          size={14}
          className={cn(
            "text-text-secondary transition-transform duration-150",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-20 px-16 pb-16">
          <div className="flex flex-col gap-[9px]">
            <p className="text-14 font-bold text-text-primary">Current setup</p>
            <SetupBlock variant="current">
              <span className="text-[10px] font-medium tracking-[0.4px] text-text-secondary">
                {conditionTypeLabels[pair.type]}
              </span>
              <div className="mt-8">
                <ConditionDataContent data={pair.current} type={pair.type} />
              </div>
            </SetupBlock>
          </div>

          <div className="flex flex-col gap-[9px]">
            <p className="text-14 font-bold text-text-primary">Suggested setup</p>
            {hasSuggestion ? (
              <SetupBlock variant="suggested">
                <span className="text-[10px] font-medium tracking-[0.4px] text-text-secondary">
                  {conditionTypeLabels[pair.type]}
                </span>
                <div className="mt-8">
                  <ConditionDataContent data={pair.suggested!} type={pair.type} />
                </div>
              </SetupBlock>
            ) : (
              <p className="py-4 text-13 font-medium text-text-tertiary">
                No suggested changes
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

function AdvancedSetupSection({ conditions }: { conditions: AdvancedConditionPair[] }) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => {
    const first = conditions.find((c) => !!c.suggested)
    return new Set(first ? [first.id] : [conditions[0]?.id])
  })
  const [onlySuggestions, setOnlySuggestions] = React.useState(true)

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const visible = onlySuggestions ? conditions.filter((c) => !!c.suggested) : conditions

  return (
    <div className="flex flex-col gap-12">
      <div className="group flex items-center gap-8 cursor-pointer pb-8">
        <Checkbox
          id="show-suggestions-only"
          checked={onlySuggestions}
          onCheckedChange={(v) => setOnlySuggestions(v === true)}
        />
        <Label htmlFor="show-suggestions-only">
          Only show conditions with suggestions
        </Label>
      </div>

      {visible.map((pair) => (
        <AdvancedConditionSection
          key={pair.id}
          pair={pair}
          isExpanded={expandedIds.has(pair.id)}
          onToggle={() => toggle(pair.id)}
        />
      ))}
    </div>
  )
}

function getAccuracyColor(accuracy: number) {
  if (accuracy >= 85) return "text-[#308060]"
  if (accuracy >= 70) return "text-[#c9671d]"
  return "text-[#b72d0e]"
}

function getAccuracyTextColor(accuracy: number) {
  if (accuracy >= 85) return "text-text-success"
  if (accuracy >= 70) return "text-text-warning"
  return "text-text-error"
}

export default function Page() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [activeSuggestionId, setActiveSuggestionId] = React.useState<string | null>(null)
  const [isApplying, setIsApplying] = React.useState(false)
  const [showApplySuccess, setShowApplySuccess] = React.useState(false)
  const [appliedByState, setAppliedByState] = React.useState<Record<string, string[]>>({})
  const [activeState, setActiveState] = React.useState("prompt")

  const stateData = suggestionsByState[activeState]

  const questionRowsForState: QuestionRow[] = React.useMemo(() => {
    const rows = [...questionRows]
    if (activeState === "loading") {
      rows[0] = {
        ...rows[0],
        hasImprove: false,
        suggestion: undefined,
      }
    } else if (stateData) {
      rows[0] = {
        ...rows[0],
        question: stateData.question,
        accuracy: stateData.accuracy,
        suggestion: stateData.suggestion,
      }
    }
    return rows
  }, [stateData, activeState])

  const allIds = questionRowsForState.map((r) => r.id)
  const isAllSelected = allIds.length > 0 && selectedIds.length === allIds.length
  const selectAllState: boolean | "indeterminate" = isAllSelected
    ? true
    : selectedIds.length > 0
      ? "indeterminate"
      : false

  const activeQuestion = questionRowsForState.find((r) => r.id === activeSuggestionId)
  const activeSuggestion = activeQuestion?.suggestion

  const [activeSheetTab, setActiveSheetTab] = React.useState("suggestion")

  const closeSuggestionSheet = React.useCallback(() => {
    setActiveSuggestionId(null)
    setIsApplying(false)
    setShowApplySuccess(false)
    setActiveSheetTab("suggestion")
  }, [])

  const handleApply = () => {
    if (!activeSuggestionId) return
    setIsApplying(true)
    const qId = activeSuggestionId
    setTimeout(() => {
      setIsApplying(false)
      setShowApplySuccess(true)
      setAppliedByState((prev) => {
        const current = prev[activeState] ?? []
        return current.includes(qId) ? prev : { ...prev, [activeState]: [...current, qId] }
      })
    }, 900)
  }

  return (
    <div className="flex h-screen">
      <div className="pointer-events-none fixed inset-x-0 top-12 z-50 flex justify-center px-16">
        <Card className="pointer-events-auto border-border-default bg-text-primary p-12 shadow-sm">
          <Tabs value={activeState} onValueChange={(v) => { setActiveState(v); closeSuggestionSheet(); }}>
            <NeutralTabsList aria-label="Setup method states">
              {stateOptions.map((opt) => (
                <NeutralTabsTrigger key={opt.value} value={opt.value}>
                  {opt.label}
                </NeutralTabsTrigger>
              ))}
            </NeutralTabsList>
          </Tabs>
        </Card>
      </div>
      <MainNav activeItem="Settings" />
      <div className="flex flex-1 flex-col bg-[#fcfcfb]">
        <TopBar avatarInitial="M" avatarColor="#46a680" />
        <div className="flex flex-1 overflow-hidden">
          {/* Settings sub-navigation */}
          <div className="flex w-[204px] shrink-0 flex-col gap-[32px] overflow-y-auto border-r border-stone-200 bg-white px-[12px] py-[16px]">
            {settingsNavGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-[8px]">
                <div className="px-[12px] py-[8px]">
                  <p className="text-[12px] font-medium leading-[1.5] tracking-[0.12px] text-[#7c7972]">
                    {group.label}
                  </p>
                </div>
                {group.items.map((item) => {
                  const isActive = item === "Rubric builder"
                  return (
                    <div
                      key={item}
                      className={cn(
                        "flex items-center overflow-hidden rounded-[6px] px-[12px] py-[8px]",
                        isActive && "bg-[#fbf3ef]"
                      )}
                    >
                      <p
                        className={cn(
                          "text-[14px] font-semibold leading-[24px] whitespace-nowrap",
                          isActive
                            ? "font-bold text-[#c9671d]"
                            : "text-[#35312d]"
                        )}
                      >
                        {item}
                      </p>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Main content area */}
          <main className="flex flex-1 flex-col gap-[16px] overflow-auto px-[24px] py-[16px]">
            <PageHeader withBorder={false} className="gap-[16px] bg-transparent px-0 py-0">
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
            </PageHeader>

            <div className="flex items-center justify-between">
              <div className="w-[400px]">
                <InputField
                  placeholder="Search question title"
                  aria-label="Search question title"
                  iconLeft={<SearchMd size={16} />}
                />
              </div>
              <Button
                variant="secondary"
                size="icon-lg"
                aria-label="Accuracy information"
              >
                <InfoCircle size={16} />
              </Button>
            </div>

            {/* Accuracy table */}
            <Card className="border-stone-300 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-white">
                    <TableHead className="w-[480px]">
                      <div className="flex items-center gap-[12px]">
                        <Checkbox
                          aria-label="Select all questions"
                          checked={selectAllState}
                          onCheckedChange={(checked) => {
                            if (checked === true) setSelectedIds(allIds)
                            else setSelectedIds([])
                          }}
                        />
                        <span>Auto-QA question</span>
                      </div>
                    </TableHead>
                    <TableHead className="w-[192px]" sortable sorted sortDirection="asc">
                      Latest accuracy
                    </TableHead>
                    <TableHead sortable>Latest accuracy report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questionRowsForState.map((row) => {
                    const isApplied = (appliedByState[activeState] ?? []).includes(row.id)
                    const showImprove = row.hasImprove && !isApplied

                    return (
                      <TableRow key={row.id}>
                        <TableCell className="align-middle">
                          <div className="flex items-center gap-[12px]">
                            <Checkbox
                              aria-label={`Select ${row.question}`}
                              checked={selectedIds.includes(row.id)}
                              onCheckedChange={(checked) => {
                                if (checked === true)
                                  setSelectedIds((prev) =>
                                    prev.includes(row.id) ? prev : [...prev, row.id]
                                  )
                                else
                                  setSelectedIds((prev) =>
                                    prev.filter((id) => id !== row.id)
                                  )
                              }}
                            />
                            <p className="text-[14px] font-semibold leading-[24px] text-[#282624]">
                              {row.question}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="align-middle">
                          <div className="flex items-center gap-[12px]">
                            <span
                              className={cn(
                                "text-[16px] font-bold leading-[28px]",
                                getAccuracyColor(row.accuracy)
                              )}
                            >
                              {row.accuracy}%
                            </span>
                            {activeState === "loading" && row.id === "q1" ? (
                              <span className="inline-flex items-center gap-[6px]">
                                <Spinner size="sm" className="text-text-secondary" />
                                <span className="text-12 text-text-secondary">Generating suggestions…</span>
                              </span>
                            ) : showImprove ? (
                              <button
                                className="inline-flex items-center justify-center rounded-[8px] bg-[#f07400] px-[16px] py-[4px] text-[14px] font-semibold leading-[24px] text-white hover:bg-[#d96900] transition-colors"
                                onClick={() => {
                                  setActiveSuggestionId(row.id)
                                  setIsApplying(false)
                                  setShowApplySuccess(false)
                                  setActiveSheetTab("suggestion")
                                }}
                              >
                                Improve
                              </button>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="align-middle">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-[4px]">
                              <p className="text-[14px] font-semibold leading-[24px] text-[#282624] underline">
                                {row.reportName}
                              </p>
                              <p className="text-[12px] font-medium leading-[20px] text-[#7c7972]">
                                {row.datasetName}
                              </p>
                              <AvatarGroup
                                names={row.reviewers}
                                size="xs"
                                max={3}
                              />
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
          </main>
        </div>
      </div>

      {/* Improvement side sheet */}
      <Sheet
        open={activeSuggestionId !== null}
        onOpenChange={(open) => {
          if (!open) closeSuggestionSheet()
        }}
      >
        <SheetContent size="lg">
          <SheetHeader description="Accuracy improvement">
            {activeQuestion?.question ?? "Suggestion"}
          </SheetHeader>

          <SheetBody className="flex flex-col">
            {activeSuggestion && activeQuestion ? (
              showApplySuccess ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-16 px-32 text-center">
                  <div className="flex size-48 items-center justify-center rounded-full bg-[#308060]">
                    <Check size={24} color="white" />
                  </div>
                  <p className="text-18 font-bold text-text-primary">
                    Suggestion applied
                  </p>
                  <p className="max-w-[400px] text-14 font-medium leading-relaxed text-text-secondary">
                    The setup has been updated. To verify the improvement,
                    run a new accuracy test with a fresh dataset.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {/* Score bar */}
                  <div className="-mx-24 flex items-center justify-center gap-48 py-12">
                    <div className="flex flex-col items-center">
                      <span className={cn(
                        "text-[24px] font-bold leading-[32px]",
                        getAccuracyColor(activeQuestion.accuracy)
                      )}>
                        {activeQuestion.accuracy}%
                      </span>
                      <span className="text-12 font-medium text-text-primary">
                        Current
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-text-primary" />
                    <div className="flex flex-col items-center">
                      <span className="text-[24px] font-bold leading-[32px] text-text-success">
                        {activeSuggestion.potentialAccuracy}%
                      </span>
                      <span className="text-12 font-medium text-text-primary">
                        Potential
                      </span>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs value={activeSheetTab} onValueChange={setActiveSheetTab} className="pt-16">
                    <NeutralTabsList className="w-full">
                      <NeutralTabsTrigger value="suggestion" className="flex-1">
                        Suggestion
                      </NeutralTabsTrigger>
                      <NeutralTabsTrigger value="feedback" className="flex-1">
                        Feedback
                      </NeutralTabsTrigger>
                    </NeutralTabsList>

                    {/* Tab 1: Suggestion */}
                    <TabsContent value="suggestion">
                      <div className="flex flex-col gap-32">
                        <div className="flex flex-col gap-[9px]">
                          <p className="text-14 font-bold text-text-primary">
                            Summary
                          </p>
                          <p className="text-14 font-medium leading-[24px] text-text-primary">
                            {activeSuggestion.diagnosis}
                          </p>
                        </div>

                        {activeSuggestion.advancedConditions ? (
                          <AdvancedSetupSection conditions={activeSuggestion.advancedConditions} />
                        ) : (
                          <>
                            <div className="flex flex-col gap-[9px]">
                              <p className="text-14 font-bold text-text-primary">
                                Current setup
                              </p>
                              {activeSuggestion.currentTagSetup ? (
                                <TagSetupBox tagSetup={activeSuggestion.currentTagSetup} variant="current" />
                              ) : (
                                <div className="flex flex-col gap-4 rounded-lg bg-[#fdf3f1] px-16 py-14">
                                  <span className="text-[10px] font-medium tracking-[0.4px] text-text-secondary">
                                    {setupMethodLabels[activeSuggestion.setupMethod]}
                                  </span>
                                  <p className="text-14 font-medium leading-[24px] text-text-primary">
                                    {activeSuggestion.removedLine}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-[9px]">
                              <p className="text-14 font-bold text-text-primary">
                                Suggested setup
                              </p>
                              {activeSuggestion.suggestedTagSetup ? (
                                <TagSetupBox tagSetup={activeSuggestion.suggestedTagSetup} variant="suggested" />
                              ) : (
                                <div className="flex flex-col gap-4 rounded-lg bg-[#f4fdf8] px-16 py-14">
                                  <span className="text-[10px] font-medium tracking-[0.4px] text-text-secondary">
                                    {setupMethodLabels[activeSuggestion.setupMethod]}
                                  </span>
                                  <p className="text-14 font-medium leading-[24px] text-text-primary">
                                    {activeSuggestion.addedLine}
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>

                    {/* Tab 2: Feedback (incorrect answers only) */}
                    <TabsContent value="feedback" className="mt-0">
                      <div className="flex flex-col">
                        {activeSuggestion.conversationFeedback.map((conv) => (
                          <div
                            key={conv.id}
                            className="flex flex-col gap-[13px] border-b border-border-subtle py-24"
                          >
                            {/* Row header: channel icon + ID + badge */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-8">
                                {conv.channel === "call" ? (
                                  <CallIcon size={13} />
                                ) : (
                                  <ChatIcon size={12} />
                                )}
                                <span className="text-12 font-semibold text-text-primary underline">
                                  {conv.id}
                                </span>
                              </div>
                              <span className="rounded-full bg-[#fef3f2] px-8 py-[2px] text-12 font-medium text-[#b42318]">
                                Incorrect
                              </span>
                            </div>

                            {/* Auto-QA answer + reasoning */}
                            <div className="flex flex-col gap-4">
                              <p className="text-12 font-semibold text-text-primary">
                                Auto-QA answered &apos;{conv.autoQaAnswer}&apos;
                              </p>
                              <p className="whitespace-pre-wrap text-12 font-medium leading-[20px] text-text-secondary">
                                {conv.autoQaReasoning}
                              </p>
                            </div>

                            {/* Human reviewer answer + reasoning */}
                            <div className="flex flex-col gap-4">
                              <p className="text-12 font-semibold text-text-primary">
                                {conv.humanReviewer} answered &apos;{conv.humanAnswer}&apos;
                              </p>
                              <p className="text-12 font-medium leading-[20px] text-text-secondary">
                                {conv.humanReasoning}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )
            ) : (
              <p className="text-14 font-medium text-text-secondary">
                No suggestion is available for this question.
              </p>
            )}
          </SheetBody>

          {activeSuggestion && activeQuestion && (
            <SheetFooter className={cn(showApplySuccess && "flex-col gap-8")}>
              {showApplySuccess ? (
                <>
                  <Button className="w-full">Create new testing dataset</Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    iconRight={<LinkExternal02 size={16} />}
                  >
                    Open setup
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    iconRight={<LinkExternal02 size={16} />}
                  >
                    Open setup
                  </Button>
                  <Button
                    onClick={handleApply}
                    disabled={isApplying}
                    iconLeft={
                      isApplying ? (
                        <Spinner size="sm" className="text-text-inverse" />
                      ) : undefined
                    }
                  >
                    {isApplying ? "Applying..." : "Apply suggestion"}
                  </Button>
                </>
              )}
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
