// Auto-generated from apps/qa-case-assignment/mock-db/qa_case_assignment_mock.sqlite
// Run: node apps/qa-case-assignment/mock-db/scripts/export-activity-data.mjs

export const mockDbOrderedActivityTabs = [
  "week_1",
  "week_2",
  "week_3",
  "week_4",
  "week_5",
  "week_6",
  "week_7",
  "week_8",
  "week_9",
  "week_10",
  "week_11",
  "week_12",
  "week_13",
  "week_14",
  "week_15",
  "week_16",
  "week_17",
  "week_18",
  "week_19",
  "week_20",
  "week_21",
  "week_22",
  "week_23"
] as const

export const mockDbActivityByTab = {
  "week_1": {
    "tabLabel": "Mar 2-8",
    "tabQualifier": "Upcoming week",
    "summary": {
      "agentsWithoutAssignment": 10,
      "evaluatorsWithoutWorkload": 6
    },
    "rules": [
      {
        "id": "rule-23-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "84/84",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "92%",
        "assignments": "84/91",
        "note": "2 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "2 agents: insufficient matching conversations",
          "3 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-23-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "84/84",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "95%",
        "assignments": "86/91",
        "note": "3 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "3 agents: evaluators' workload limit reached",
          "2 agents: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-23-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-23-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_2": {
    "tabLabel": "Feb 23-Mar 1",
    "tabQualifier": "Current week",
    "summary": {
      "agentsWithoutAssignment": 3,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-22-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "71/71",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-22-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "90%",
        "assignments": "70/78",
        "note": "1 agent: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "1 agent: evaluators' workload limit reached",
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-22-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "85/85",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-22-4",
        "name": "Savings Product - QA Rotation",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/92",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-22-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-22-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "96%",
        "assignments": "68/71",
        "note": "1 agent: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "1 agent: evaluators' workload limit reached",
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-22-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "78/78",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-22-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "85/85",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-22-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "92/92",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_3": {
    "tabLabel": "Feb 16-22",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 6
    },
    "rules": [
      {
        "id": "rule-21-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "65/65",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "89%",
        "assignments": "64/72",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "79/79",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/86",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-21-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "95%",
        "assignments": "62/65",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-21-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "72/72",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-21-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "79/79",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_4": {
    "tabLabel": "Feb 9-15",
    "summary": {
      "agentsWithoutAssignment": 8,
      "evaluatorsWithoutWorkload": 4
    },
    "rules": [
      {
        "id": "rule-20-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "80/80",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-20-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "87/87",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-20-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "59/59",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-20-4",
        "name": "Savings Product - QA Rotation",
        "status": "partial",
        "metric": "88%",
        "assignments": "58/66",
        "note": "3 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "3 agents: insufficient matching conversations",
          "1 agent: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-20-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "73/73",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-20-6",
        "name": "Claims Exception Queue",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/80",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-20-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "87/87",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-20-8",
        "name": "Card Disputes QA",
        "status": "partial",
        "metric": "95%",
        "assignments": "56/59",
        "note": "2 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "2 agents: insufficient matching conversations",
          "2 agents: evaluators' workload limit reached",
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-20-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "66/66",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_5": {
    "tabLabel": "Feb 2-8",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 4
    },
    "rules": [
      {
        "id": "rule-19-1",
        "name": "Legacy Escalation QA",
        "status": "partial",
        "metric": "94%",
        "assignments": "63/67",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "74/74",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "81/81",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "88/88",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "partial",
        "metric": "87%",
        "assignments": "52/60",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "67/67",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-7",
        "name": "Billing QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/74",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-19-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "81/81",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-19-9",
        "name": "Onboarding Calls QA",
        "status": "partial",
        "metric": "97%",
        "assignments": "85/88",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      }
    ]
  },
  "week_6": {
    "tabLabel": "Jan 26-Feb 1",
    "summary": {
      "agentsWithoutAssignment": 3,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-18-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "89/89",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-18-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "93%",
        "assignments": "57/61",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-18-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "68/68",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-18-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "75/75",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-18-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "82/82",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-18-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "91%",
        "assignments": "81/89",
        "note": "1 agent: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "1 agent: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-18-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "61/61",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-18-8",
        "name": "Card Disputes QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/68",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-18-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "75/75",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_7": {
    "tabLabel": "Jan 19-25",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-17-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "83/83",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "96%",
        "assignments": "86/90",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "62/62",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "69/69",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "90%",
        "assignments": "75/83",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "90/90",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-17-9",
        "name": "Onboarding Calls QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/62",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      }
    ]
  },
  "week_8": {
    "tabLabel": "Jan 12-18",
    "summary": {
      "agentsWithoutAssignment": 6,
      "evaluatorsWithoutWorkload": 1
    },
    "rules": [
      {
        "id": "rule-16-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-4",
        "name": "Savings Product - QA Rotation",
        "status": "partial",
        "metric": "95%",
        "assignments": "80/84",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations",
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-16-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "91/91",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-16-8",
        "name": "Card Disputes QA",
        "status": "partial",
        "metric": "90%",
        "assignments": "69/77",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations",
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-16-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "84/84",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_9": {
    "tabLabel": "Jan 5-11",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 1
    },
    "rules": [
      {
        "id": "rule-15-1",
        "name": "Legacy Escalation QA",
        "status": "partial",
        "metric": "89%",
        "assignments": "76/85",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "92/92",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "71/71",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "partial",
        "metric": "95%",
        "assignments": "74/78",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "85/85",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "92/92",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-15-9",
        "name": "Onboarding Calls QA",
        "status": "partial",
        "metric": "89%",
        "assignments": "63/71",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_10": {
    "tabLabel": "Dec 29-Jan 4",
    "summary": {
      "agentsWithoutAssignment": 4,
      "evaluatorsWithoutWorkload": 0
    },
    "rules": [
      {
        "id": "rule-14-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "72/72",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "89%",
        "assignments": "70/79",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-14-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "86/86",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "65/65",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "94%",
        "assignments": "68/72",
        "note": "1 agent: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "1 agent: evaluators' workload limit reached",
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-14-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "79/79",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "86/86",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-14-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_11": {
    "tabLabel": "Dec 22-28",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 0
    },
    "rules": [
      {
        "id": "rule-13-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "59/59",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "66/66",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "88%",
        "assignments": "64/73",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "80/80",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "87/87",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "59/59",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "94%",
        "assignments": "62/66",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "73/73",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-13-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "80/80",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_12": {
    "tabLabel": "Dec 15-21",
    "summary": {
      "agentsWithoutAssignment": 3,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-12-1",
        "name": "Legacy Escalation QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/81",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-12-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "88/88",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-12-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "60/60",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-12-4",
        "name": "Savings Product - QA Rotation",
        "status": "partial",
        "metric": "87%",
        "assignments": "58/67",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations",
          "1 agent: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-12-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "74/74",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-12-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "81/81",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-12-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "88/88",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-12-8",
        "name": "Card Disputes QA",
        "status": "partial",
        "metric": "93%",
        "assignments": "56/60",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-12-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "67/67",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_13": {
    "tabLabel": "Dec 8-14",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 6
    },
    "rules": [
      {
        "id": "rule-11-1",
        "name": "Legacy Escalation QA",
        "status": "partial",
        "metric": "93%",
        "assignments": "63/68",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-2",
        "name": "Mortgage Queue",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/75",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-11-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "82/82",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "89/89",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "partial",
        "metric": "85%",
        "assignments": "52/61",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "68/68",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "75/75",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "82/82",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-11-9",
        "name": "Onboarding Calls QA",
        "status": "partial",
        "metric": "96%",
        "assignments": "85/89",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_14": {
    "tabLabel": "Dec 1-7",
    "summary": {
      "agentsWithoutAssignment": 8,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-10-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "90/90",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-10-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "92%",
        "assignments": "57/62",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached",
          "2 agents: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-10-3",
        "name": "Renewals - TL Review Batch",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/69",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-10-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-10-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "83/83",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-10-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "90%",
        "assignments": "81/90",
        "note": "2 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "2 agents: insufficient matching conversations",
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-10-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "62/62",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-10-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "69/69",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-10-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_15": {
    "tabLabel": "Nov 24-30",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 4
    },
    "rules": [
      {
        "id": "rule-9-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "84/84",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "95%",
        "assignments": "86/91",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-4",
        "name": "Savings Product - QA Rotation",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/63",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-9-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "89%",
        "assignments": "75/84",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "91/91",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-9-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_16": {
    "tabLabel": "Nov 17-23",
    "summary": {
      "agentsWithoutAssignment": 3,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-8-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-8-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "71/71",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-8-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "78/78",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-8-4",
        "name": "Savings Product - QA Rotation",
        "status": "partial",
        "metric": "94%",
        "assignments": "80/85",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations",
          "1 agent: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-8-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/92",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-8-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-8-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "71/71",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-8-8",
        "name": "Card Disputes QA",
        "status": "partial",
        "metric": "89%",
        "assignments": "69/78",
        "note": "1 agent: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-8-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "85/85",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_17": {
    "tabLabel": "Nov 10-16",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-7-1",
        "name": "Legacy Escalation QA",
        "status": "partial",
        "metric": "88%",
        "assignments": "76/86",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "65/65",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "72/72",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "partial",
        "metric": "94%",
        "assignments": "74/79",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-6",
        "name": "Claims Exception Queue",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/86",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-7-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "58/58",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "65/65",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-7-9",
        "name": "Onboarding Calls QA",
        "status": "partial",
        "metric": "88%",
        "assignments": "63/72",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_18": {
    "tabLabel": "Nov 3-9",
    "summary": {
      "agentsWithoutAssignment": 6,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-6-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "73/73",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-6-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "88%",
        "assignments": "70/80",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached",
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-6-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "87/87",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-6-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "59/59",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-6-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "66/66",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-6-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "93%",
        "assignments": "68/73",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached",
          "1 agent: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-6-7",
        "name": "Billing QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/80",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-6-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "87/87",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-6-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "59/59",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_19": {
    "tabLabel": "Oct 27-Nov 2",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 6
    },
    "rules": [
      {
        "id": "rule-5-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "60/60",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "67/67",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "87%",
        "assignments": "64/74",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "81/81",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "88/88",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "60/60",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "93%",
        "assignments": "62/67",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-5-8",
        "name": "Card Disputes QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/74",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      },
      {
        "id": "rule-5-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "81/81",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_20": {
    "tabLabel": "Oct 20-26",
    "summary": {
      "agentsWithoutAssignment": 4,
      "evaluatorsWithoutWorkload": 5
    },
    "rules": [
      {
        "id": "rule-4-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "82/82",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "89/89",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "61/61",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-4",
        "name": "Savings Product - QA Rotation",
        "status": "partial",
        "metric": "85%",
        "assignments": "58/68",
        "note": "2 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "2 agents: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-4-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "75/75",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "82/82",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "89/89",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-4-8",
        "name": "Card Disputes QA",
        "status": "partial",
        "metric": "92%",
        "assignments": "56/61",
        "note": "2 agents: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "2 agents: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-4-9",
        "name": "Onboarding Calls QA",
        "status": "failed",
        "metric": "0%",
        "assignments": "0/68",
        "note": "Rule execution failed",
        "issueCodeLabel": "Rule execution failed",
        "mainPageReasonLines": [
          "Rule execution failed"
        ]
      }
    ]
  },
  "week_21": {
    "tabLabel": "Oct 13-19",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 0
    },
    "rules": [
      {
        "id": "rule-3-1",
        "name": "Legacy Escalation QA",
        "status": "partial",
        "metric": "91%",
        "assignments": "63/69",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "83/83",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "90/90",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "partial",
        "metric": "84%",
        "assignments": "52/62",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "69/69",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "76/76",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "83/83",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-3-9",
        "name": "Onboarding Calls QA",
        "status": "partial",
        "metric": "94%",
        "assignments": "85/90",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_22": {
    "tabLabel": "Oct 6-12",
    "summary": {
      "agentsWithoutAssignment": 3,
      "evaluatorsWithoutWorkload": 0
    },
    "rules": [
      {
        "id": "rule-2-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "91/91",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-2",
        "name": "Mortgage Queue",
        "status": "partial",
        "metric": "91%",
        "assignments": "57/63",
        "note": "2 agents: insufficient matching conversations",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": [
          "2 agents: insufficient matching conversations"
        ]
      },
      {
        "id": "rule-2-3",
        "name": "Renewals - TL Review Batch",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "84/84",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-6",
        "name": "Claims Exception Queue",
        "status": "partial",
        "metric": "89%",
        "assignments": "81/91",
        "note": "1 agent: evaluators' workload limit reached",
        "issueCodeLabel": "Evaluators' workload limit reached",
        "mainPageReasonLines": [
          "1 agent: evaluators' workload limit reached"
        ]
      },
      {
        "id": "rule-2-7",
        "name": "Billing QA",
        "status": "success",
        "metric": "100%",
        "assignments": "63/63",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "70/70",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-2-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "77/77",
        "mainPageReasonLines": []
      }
    ]
  },
  "week_23": {
    "tabLabel": "Sep 29-Oct 5",
    "summary": {
      "agentsWithoutAssignment": 0,
      "evaluatorsWithoutWorkload": 1
    },
    "rules": [
      {
        "id": "rule-1-1",
        "name": "Legacy Escalation QA",
        "status": "success",
        "metric": "100%",
        "assignments": "78/78",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-2",
        "name": "Mortgage Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "85/85",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-3",
        "name": "Renewals - TL Review Batch",
        "status": "partial",
        "metric": "94%",
        "assignments": "86/92",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-4",
        "name": "Savings Product - QA Rotation",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-5",
        "name": "Escalation Sweep - Weekend Priority",
        "status": "success",
        "metric": "100%",
        "assignments": "71/71",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-6",
        "name": "Claims Exception Queue",
        "status": "success",
        "metric": "100%",
        "assignments": "78/78",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-7",
        "name": "Billing QA",
        "status": "partial",
        "metric": "88%",
        "assignments": "75/85",
        "issueCodeLabel": "Insufficient matching conversations",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-8",
        "name": "Card Disputes QA",
        "status": "success",
        "metric": "100%",
        "assignments": "92/92",
        "mainPageReasonLines": []
      },
      {
        "id": "rule-1-9",
        "name": "Onboarding Calls QA",
        "status": "success",
        "metric": "100%",
        "assignments": "64/64",
        "mainPageReasonLines": []
      }
    ]
  }
} as const

export const mockDbRuleSheetByRuleRowId = {
  "rule-23-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (84/84)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-04 09:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-203-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-203-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-203-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-203-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-203-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "16/22"
      },
      {
        "id": "active-evaluator-203-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "16/23"
      },
      {
        "id": "active-evaluator-203-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "16/24"
      }
    ]
  },
  "rule-23-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "92% (84/91)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-05 10:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "7"
      }
    ],
    "reasonSummary": "2 agents: insufficient matching conversations · 3 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-204-1",
        "name": "Agent 011",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-204-2",
        "name": "Agent 022",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-204-3",
        "name": "Agent 033",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-204-4",
        "name": "Agent 044",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-204-5",
        "name": "Agent 055",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-204-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-204-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-204-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-204-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-204-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-204-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-204-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "19/23"
      },
      {
        "id": "active-evaluator-204-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "19/24"
      },
      {
        "id": "active-evaluator-204-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "19/25"
      },
      {
        "id": "active-evaluator-204-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-204-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "16/24"
      }
    ]
  },
  "rule-23-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-06 11:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-206-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-206-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-206-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-206-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-206-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-206-1",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-206-2",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "16/20"
      },
      {
        "id": "active-evaluator-206-3",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "16/21"
      }
    ]
  },
  "rule-23-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-07 12:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-207-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-207-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-207-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-207-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-207-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-207-3",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-23-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-02 13:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-202-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-202-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-202-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-202-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-202-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-202-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-202-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "15/21"
      },
      {
        "id": "active-evaluator-202-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "15/22"
      },
      {
        "id": "active-evaluator-202-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "15/23"
      },
      {
        "id": "active-evaluator-202-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "20/25"
      }
    ]
  },
  "rule-23-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (84/84)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-03 14:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-201-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-201-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-201-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-201-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-201-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-201-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-201-2",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "18/23"
      },
      {
        "id": "active-evaluator-201-3",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "18/24"
      }
    ]
  },
  "rule-23-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (86/91)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-04 15:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "reasonSummary": "3 agents: evaluators' workload limit reached · 2 agents: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-199-1",
        "name": "Agent 007",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-199-2",
        "name": "Agent 018",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-199-3",
        "name": "Agent 029",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-199-4",
        "name": "Agent 040",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-199-5",
        "name": "Agent 051",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-199-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-199-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-199-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-199-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-199-1",
        "name": "Evaluator 26",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Time off for 3 days in the week.",
        "issueCodeLabel": "Time off for 3 days in the week"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-199-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "14/22"
      },
      {
        "id": "active-evaluator-199-2",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-199-3",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "21/25"
      }
    ]
  },
  "rule-23-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-05 08:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-200-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-200-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-200-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-200-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-200-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-200-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-200-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-200-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "17/25"
      }
    ]
  },
  "rule-23-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Scheduled",
        "value": "2026-03-06 09:00"
      },
      {
        "label": "Sampled",
        "value": "Mar 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-205-1",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-205-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-205-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-205-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-205-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-205-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "20/24"
      },
      {
        "id": "active-evaluator-205-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "20/25"
      },
      {
        "id": "active-evaluator-205-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "14/20"
      }
    ]
  },
  "rule-22-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (71/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-26 09:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "71"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-194-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-194-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-194-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-194-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-194-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-194-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-194-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-194-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-22-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "90% (70/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-27 10:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "reasonSummary": "1 agent: evaluators' workload limit reached · 1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-195-1",
        "name": "Agent 005",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-195-2",
        "name": "Agent 016",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-195-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-195-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-195-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-195-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-195-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-195-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-195-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "20/24"
      },
      {
        "id": "active-evaluator-195-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "20/25"
      },
      {
        "id": "active-evaluator-195-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "14/20"
      },
      {
        "id": "active-evaluator-195-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "17/24"
      }
    ]
  },
  "rule-22-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (85/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-23 11:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-197-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-197-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-197-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-197-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-197-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-197-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-197-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-197-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-197-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-22-4": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-24 12:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "92"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-22-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-25 13:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-193-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-193-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-193-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-193-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-193-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-193-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-193-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-193-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-193-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-193-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-22-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "96% (68/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-26 14:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "68"
      },
      {
        "label": "Missed",
        "value": "3"
      }
    ],
    "reasonSummary": "1 agent: evaluators' workload limit reached · Rule execution failed",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-192-1",
        "name": "Agent 004",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-192-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-192-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-192-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-192-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-192-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-192-1",
        "name": "Evaluator 23",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-192-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-192-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-192-3",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "19/24"
      }
    ]
  },
  "rule-22-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (78/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-27 15:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "78"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-190-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-190-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-190-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-190-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-190-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-190-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-190-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-190-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-190-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-22-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (85/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-23 16:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-191-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-191-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-191-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-191-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-191-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-191-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-191-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-191-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-191-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-191-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "22/23"
      }
    ]
  },
  "rule-22-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (92/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-24 08:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 23-Mar 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "92"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-196-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-196-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-196-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-196-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-196-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-196-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-196-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-196-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-196-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-21-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-18 09:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-185-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-185-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-185-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-185-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-185-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-185-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-185-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-185-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-21-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (65/65)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-19 10:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "65 assignments"
      },
      {
        "label": "Made",
        "value": "65"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-186-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-186-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-186-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-186-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-186-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-186-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-186-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-186-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-186-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-186-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-21-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (64/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-20 11:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-188-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-188-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-188-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-188-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-188-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-188-2",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-188-3",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-21-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (79/79)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-16 12:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "79 assignments"
      },
      {
        "label": "Made",
        "value": "79"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-189-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-189-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-189-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-189-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-189-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-189-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-189-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-189-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "21/22"
      }
    ]
  },
  "rule-21-5": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/86)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-17 13:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "86 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "86"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-21-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-18 14:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-183-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-183-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-183-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-183-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-183-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-183-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-183-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-183-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-183-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-21-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (62/65)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-19 15:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "65 assignments"
      },
      {
        "label": "Made",
        "value": "62"
      },
      {
        "label": "Missed",
        "value": "3"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-181-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-181-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-181-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-181-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-181-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-181-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "16/22"
      },
      {
        "id": "active-evaluator-181-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "16/23"
      },
      {
        "id": "active-evaluator-181-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "16/24"
      },
      {
        "id": "active-evaluator-181-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-21-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (72/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-20 16:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "72"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-182-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-182-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-182-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-182-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-182-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-182-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-182-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-182-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-182-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-182-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "23/23"
      }
    ]
  },
  "rule-21-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (79/79)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-16 08:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 16-22"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "79 assignments"
      },
      {
        "label": "Made",
        "value": "79"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-187-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-187-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-187-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-187-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-187-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-187-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-187-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-187-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-187-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "20/21"
      }
    ]
  },
  "rule-20-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (80/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-10 09:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "80"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-176-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-176-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-176-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-176-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-176-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-176-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-176-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-176-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-20-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (87/87)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-11 10:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "87 assignments"
      },
      {
        "label": "Made",
        "value": "87"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-177-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-177-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-177-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-177-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-177-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-177-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-177-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-177-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-177-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-177-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-20-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (59/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-12 11:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "59"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-179-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-179-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-179-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-179-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-179-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-179-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-179-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-179-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-179-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-20-4": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (58/66)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-13 12:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "66 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "reasonSummary": "3 agents: insufficient matching conversations · 1 agent: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-180-1",
        "name": "Agent 009",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-180-2",
        "name": "Agent 020",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-180-3",
        "name": "Agent 031",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-180-4",
        "name": "Agent 042",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-180-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-180-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-180-1",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-180-fallback",
        "name": "Evaluator 13",
        "status": "warning",
        "loadText": "0/25",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-180-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "21/25"
      },
      {
        "id": "active-evaluator-180-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-180-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "15/21"
      },
      {
        "id": "active-evaluator-180-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "15/22"
      }
    ]
  },
  "rule-20-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (73/73)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-09 13:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "73 assignments"
      },
      {
        "label": "Made",
        "value": "73"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-175-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-175-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-175-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-175-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-175-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-175-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-175-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-175-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-175-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-175-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-20-6": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-10 14:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "80"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-20-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (87/87)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-11 15:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "87 assignments"
      },
      {
        "label": "Made",
        "value": "87"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-172-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-172-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-172-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-172-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-172-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-172-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-172-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-172-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-172-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-20-8": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (56/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-12 16:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "56"
      },
      {
        "label": "Missed",
        "value": "3"
      }
    ],
    "reasonSummary": "2 agents: insufficient matching conversations · 2 agents: evaluators' workload limit reached · Rule execution failed",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-173-1",
        "name": "Agent 008",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-173-2",
        "name": "Agent 019",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-173-3",
        "name": "Agent 030",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-173-4",
        "name": "Agent 041",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-173-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-173-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-173-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-173-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-173-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-173-fallback",
        "name": "Evaluator 29",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-173-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-173-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "20/24"
      },
      {
        "id": "active-evaluator-173-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "20/25"
      },
      {
        "id": "active-evaluator-173-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "14/20"
      },
      {
        "id": "active-evaluator-173-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "17/23"
      }
    ]
  },
  "rule-20-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (66/66)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-13 08:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 9-15"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "66 assignments"
      },
      {
        "label": "Made",
        "value": "66"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-178-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-178-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-178-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-178-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-178-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-178-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-178-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-178-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-178-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-19-1": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (63/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-02 09:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-167-1",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-167-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-167-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-167-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-167-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-167-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-167-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "20/24"
      },
      {
        "id": "active-evaluator-167-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "20/25"
      }
    ]
  },
  "rule-19-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (74/74)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-03 10:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "74 assignments"
      },
      {
        "label": "Made",
        "value": "74"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-168-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-168-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-168-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-168-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-168-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-168-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-168-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-168-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-168-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-168-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-19-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (81/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-04 11:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-170-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-170-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-170-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-170-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-170-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-170-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-170-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-170-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-170-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-19-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (88/88)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-05 12:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "88 assignments"
      },
      {
        "label": "Made",
        "value": "88"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-171-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-171-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-171-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-171-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-171-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-171-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-171-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-171-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-19-5": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "87% (52/60)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-06 13:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "60 assignments"
      },
      {
        "label": "Made",
        "value": "52"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-166-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-166-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-166-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-166-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-166-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-166-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-166-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-166-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-166-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "19/23"
      },
      {
        "id": "active-evaluator-166-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "17/25"
      }
    ]
  },
  "rule-19-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (67/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-02 14:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "67"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-165-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-165-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-165-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-165-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-165-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-165-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-165-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-165-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-165-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-19-7": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/74)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-03 15:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "74 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "74"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-19-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (81/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-04 16:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-164-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-164-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-164-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-164-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-164-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-164-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-164-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-164-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-164-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-164-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-19-9": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "97% (85/88)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-02-05 08:00"
      },
      {
        "label": "Sampled",
        "value": "Feb 2-8"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "88 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "3"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-169-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-169-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-169-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-169-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-169-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-169-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-169-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "17/25"
      },
      {
        "id": "active-evaluator-169-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-169-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-18-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (89/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-30 09:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "89"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-158-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-158-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-158-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-158-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-158-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-158-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-158-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-158-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-18-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "93% (57/61)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-26 10:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "61 assignments"
      },
      {
        "label": "Made",
        "value": "57"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-159-1",
        "name": "Agent 003",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-159-2",
        "name": "Agent 014",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-159-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-159-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-159-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-159-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-159-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-159-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-159-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-159-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-159-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "17/25"
      },
      {
        "id": "active-evaluator-159-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-159-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-18-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (68/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-27 11:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "68"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-161-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-161-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-161-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-161-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-161-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-161-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-161-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-161-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-161-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-18-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (75/75)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-28 12:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "75 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-162-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-162-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-162-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-162-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-162-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-162-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-162-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-162-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-18-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (82/82)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-29 13:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "82 assignments"
      },
      {
        "label": "Made",
        "value": "82"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-157-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-157-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-157-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-157-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-157-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-157-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-157-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-157-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-157-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-157-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-18-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "91% (81/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-30 14:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "reasonSummary": "1 agent: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-156-1",
        "name": "Agent 002",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-156-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-156-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-156-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-156-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-156-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-156-fallback",
        "name": "Evaluator 21",
        "status": "warning",
        "loadText": "0/21",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-156-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "16/21"
      },
      {
        "id": "active-evaluator-156-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "16/22"
      },
      {
        "id": "active-evaluator-156-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "16/23"
      },
      {
        "id": "active-evaluator-156-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "16/24"
      }
    ]
  },
  "rule-18-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (61/61)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-26 15:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "61 assignments"
      },
      {
        "label": "Made",
        "value": "61"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-154-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-154-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-154-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-154-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-154-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-154-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-154-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-154-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-154-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-18-8": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-27 16:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "68"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-18-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (75/75)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-28 08:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 26-Feb 1"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "75 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-160-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-160-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-160-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-160-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-160-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-160-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-160-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-160-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-160-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-17-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-22 09:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-149-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-149-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-149-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-149-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-149-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-149-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-149-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-149-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-17-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (83/83)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-23 10:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "83 assignments"
      },
      {
        "label": "Made",
        "value": "83"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-150-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-150-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-150-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-150-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-150-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-150-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-150-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-150-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-150-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-150-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-17-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "96% (86/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-19 11:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-152-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-152-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-152-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-152-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-152-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-152-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "21/25"
      },
      {
        "id": "active-evaluator-152-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-152-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "15/21"
      }
    ]
  },
  "rule-17-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (62/62)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-20 12:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "62 assignments"
      },
      {
        "label": "Made",
        "value": "62"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-153-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-153-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-153-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-153-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-153-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-153-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-153-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-153-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "21/22"
      }
    ]
  },
  "rule-17-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (69/69)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-21 13:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "69 assignments"
      },
      {
        "label": "Made",
        "value": "69"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-148-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-148-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-148-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-148-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-148-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-148-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-148-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-148-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-148-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-148-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-17-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-22 14:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-147-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-147-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-147-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-147-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-147-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-147-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-147-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-147-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-147-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-17-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "90% (75/83)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-23 15:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "83 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-145-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-145-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-145-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-145-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-145-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-145-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-145-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-145-3",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "20/25"
      }
    ]
  },
  "rule-17-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (90/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-19 16:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "90"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-146-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-146-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-146-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-146-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-146-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-146-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-146-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-146-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-146-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-146-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "23/23"
      }
    ]
  },
  "rule-17-9": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/62)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-20 08:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 19-25"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "62 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "62"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-16-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-14 09:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-140-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-140-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-140-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-140-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-140-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-140-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-140-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-140-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-16-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-15 10:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-141-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-141-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-141-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-141-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-141-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-141-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-141-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-141-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-141-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-141-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-16-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-16 11:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-143-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-143-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-143-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-143-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-143-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-143-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-143-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-143-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-143-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-16-4": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (80/84)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-12 12:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "80"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations · 2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-144-1",
        "name": "Agent 007",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-144-2",
        "name": "Agent 018",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-144-3",
        "name": "Agent 029",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-144-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-144-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-144-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-144-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-144-1",
        "name": "Evaluator 14",
        "status": "warning",
        "loadText": "0/20",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-144-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-144-2",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-144-3",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-16-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (91/91)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-13 13:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "91"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-139-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-139-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-139-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-139-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-139-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-139-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-139-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-139-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-139-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-139-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-16-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-14 14:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-138-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-138-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-138-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-138-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-138-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-138-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-138-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-138-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-138-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-16-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-15 15:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-136-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-136-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-136-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-136-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-136-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-136-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-136-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-136-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-136-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-16-8": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "90% (69/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-16 16:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "69"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations · 2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-137-1",
        "name": "Agent 006",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-137-2",
        "name": "Agent 017",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-137-3",
        "name": "Agent 028",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-137-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-137-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-137-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-137-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-137-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-137-fallback",
        "name": "Evaluator 29",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-137-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-137-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-137-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "17/25"
      },
      {
        "id": "active-evaluator-137-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-137-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-16-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (84/84)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-12 08:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 12-18"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-142-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-142-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-142-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-142-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-142-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-142-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-142-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-142-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-142-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-15-1": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (76/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-06 09:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-131-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-131-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-131-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-131-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-131-1",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-131-2",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-131-3",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "17/25"
      }
    ]
  },
  "rule-15-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (92/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-07 10:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "92"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-132-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-132-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-132-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-132-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-132-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-132-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-132-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-132-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-132-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-132-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-15-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-08 11:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-134-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-134-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-134-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-134-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-134-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-134-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-134-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-134-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-134-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-15-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (71/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-09 12:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "71"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-135-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-135-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-135-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-135-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-135-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-135-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-135-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-135-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-15-5": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (74/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-05 13:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "74"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-130-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-130-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-130-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-130-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-130-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "16/20"
      },
      {
        "id": "active-evaluator-130-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "16/21"
      },
      {
        "id": "active-evaluator-130-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "16/22"
      },
      {
        "id": "active-evaluator-130-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "16/23"
      },
      {
        "id": "active-evaluator-130-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "21/25"
      }
    ]
  },
  "rule-15-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (85/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-06 14:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-129-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-129-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-129-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-129-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-129-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-129-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-129-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-129-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-129-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-15-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (92/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-07 15:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "92"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-127-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-127-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-127-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-127-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-127-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-127-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-127-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-127-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-127-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-15-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-08 16:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-128-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-128-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-128-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-128-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-128-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-128-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-128-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-128-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-128-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-128-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-15-9": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (63/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-09 08:00"
      },
      {
        "label": "Sampled",
        "value": "Jan 5-11"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "8"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-133-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-133-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-133-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-133-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-133-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-133-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-133-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "21/25"
      },
      {
        "id": "active-evaluator-133-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-133-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "15/21"
      }
    ]
  },
  "rule-14-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (72/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-29 09:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "72"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-122-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-122-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-122-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-122-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-122-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-122-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-122-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-122-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-14-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (70/79)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-30 10:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "79 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-123-1",
        "name": "Agent 001",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-123-2",
        "name": "Agent 012",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-123-1",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-123-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-123-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-123-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-123-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-123-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-123-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-123-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-123-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "21/25"
      },
      {
        "id": "active-evaluator-123-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-123-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "18/24"
      }
    ]
  },
  "rule-14-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (86/86)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-31 11:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "86 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-125-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-125-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-125-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-125-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-125-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-125-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-125-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-125-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-125-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-14-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-01 12:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-126-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-126-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-126-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-126-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-126-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-126-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-126-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-126-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-14-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (65/65)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-02 13:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "65 assignments"
      },
      {
        "label": "Made",
        "value": "65"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-121-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-121-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-121-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-121-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-121-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-121-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-121-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-121-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-121-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-121-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-14-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (68/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-29 14:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "68"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "reasonSummary": "1 agent: evaluators' workload limit reached · 1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-120-1",
        "name": "Agent 011",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-120-2",
        "name": "Agent 022",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-120-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-120-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-120-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-120-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-120-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-120-fallback",
        "name": "Evaluator 21",
        "status": "warning",
        "loadText": "0/21",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-120-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "13/21"
      },
      {
        "id": "active-evaluator-120-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-120-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-120-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "20/24"
      }
    ]
  },
  "rule-14-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (79/79)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-30 15:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "79 assignments"
      },
      {
        "label": "Made",
        "value": "79"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-118-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-118-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-118-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-118-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-118-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-118-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-118-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-118-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-118-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-14-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (86/86)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-31 16:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "86 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-119-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-119-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-119-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-119-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-119-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-119-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-119-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-119-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-119-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-119-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "22/23"
      }
    ]
  },
  "rule-14-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2026-01-01 08:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 29-Jan 4"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-124-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-124-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-124-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-124-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-124-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-124-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-124-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-124-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-124-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-13-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (59/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-26 09:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "59"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-113-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-113-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-113-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-113-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-113-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-113-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-113-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-113-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-13-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (66/66)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-22 10:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "66 assignments"
      },
      {
        "label": "Made",
        "value": "66"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-114-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-114-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-114-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-114-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-114-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-114-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-114-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-114-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-114-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-114-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-13-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (64/73)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-23 11:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "73 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-116-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-116-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-116-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-116-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-116-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-116-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-116-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-116-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-116-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-13-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (80/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-24 12:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "80"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-117-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-117-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-117-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-117-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-117-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-117-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-117-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-117-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "21/22"
      }
    ]
  },
  "rule-13-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (87/87)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-25 13:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "87 assignments"
      },
      {
        "label": "Made",
        "value": "87"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-112-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-112-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-112-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-112-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-112-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-112-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-112-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-112-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-112-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-112-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-13-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (59/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-26 14:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "59"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-111-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-111-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-111-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-111-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-111-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-111-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-111-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-111-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-111-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-13-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (62/66)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-22 15:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "66 assignments"
      },
      {
        "label": "Made",
        "value": "62"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-109-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-109-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-109-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-109-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-109-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-109-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "17/22"
      },
      {
        "id": "active-evaluator-109-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-109-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "17/24"
      },
      {
        "id": "active-evaluator-109-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "17/25"
      }
    ]
  },
  "rule-13-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (73/73)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-23 16:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "73 assignments"
      },
      {
        "label": "Made",
        "value": "73"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-110-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-110-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-110-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-110-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-110-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-110-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-110-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-110-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-110-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-110-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "23/23"
      }
    ]
  },
  "rule-13-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (80/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-24 08:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 22-28"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "80"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-115-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-115-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-115-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-115-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-115-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-115-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-115-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-115-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-115-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "20/21"
      }
    ]
  },
  "rule-12-1": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-18 09:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "81"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-12-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (88/88)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-19 10:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "88 assignments"
      },
      {
        "label": "Made",
        "value": "88"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-105-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-105-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-105-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-105-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-105-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-105-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-105-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-105-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-105-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-105-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-12-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (60/60)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-15 11:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "60 assignments"
      },
      {
        "label": "Made",
        "value": "60"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-107-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-107-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-107-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-107-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-107-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-107-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-107-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-107-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-107-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-12-4": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "87% (58/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-16 12:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations · 1 agent: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-108-1",
        "name": "Agent 005",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-108-2",
        "name": "Agent 016",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-108-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-108-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-108-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-108-fallback",
        "name": "Evaluator 13",
        "status": "warning",
        "loadText": "0/25",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-108-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-108-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "16/20"
      },
      {
        "id": "active-evaluator-108-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "16/21"
      },
      {
        "id": "active-evaluator-108-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "16/22"
      }
    ]
  },
  "rule-12-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (74/74)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-17 13:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "74 assignments"
      },
      {
        "label": "Made",
        "value": "74"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-103-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-103-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-103-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-103-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-103-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-103-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-103-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-103-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-103-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-103-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-12-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (81/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-18 14:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-102-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-102-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-102-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-102-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-102-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-102-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-102-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-102-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-102-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-12-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (88/88)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-19 15:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "88 assignments"
      },
      {
        "label": "Made",
        "value": "88"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-100-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-100-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-100-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-100-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-100-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-100-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-100-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-100-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-100-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-12-8": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "93% (56/60)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-15 16:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "60 assignments"
      },
      {
        "label": "Made",
        "value": "56"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-101-1",
        "name": "Agent 004",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-101-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-101-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-101-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-101-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-101-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-101-1",
        "name": "Evaluator 31",
        "status": "warning",
        "loadText": "0/25",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-101-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-101-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-101-3",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "15/20"
      },
      {
        "id": "active-evaluator-101-4",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "18/23"
      }
    ]
  },
  "rule-12-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (67/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-16 08:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 15-21"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "67"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-106-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-106-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-106-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-106-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-106-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-106-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-106-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-106-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-106-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-11-1": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "93% (63/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-10 09:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-95-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-95-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-95-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-95-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-95-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "14/22"
      },
      {
        "id": "active-evaluator-95-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-95-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-95-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "21/25"
      }
    ]
  },
  "rule-11-2": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/75)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-11 10:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "75 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "75"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-11-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (82/82)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-12 11:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "82 assignments"
      },
      {
        "label": "Made",
        "value": "82"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-98-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-98-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-98-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-98-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-98-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-98-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-98-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-98-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-98-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-11-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (89/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-08 12:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "89"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-99-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-99-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-99-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-99-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-99-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-99-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-99-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-99-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-11-5": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "85% (52/61)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-09 13:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "61 assignments"
      },
      {
        "label": "Made",
        "value": "52"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-94-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-94-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-94-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-94-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-94-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-94-2",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-94-3",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-94-4",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "18/25"
      }
    ]
  },
  "rule-11-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (68/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-10 14:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "68"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-93-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-93-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-93-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-93-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-93-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-93-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-93-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-93-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-93-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-11-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (75/75)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-11 15:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "75 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-91-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-91-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-91-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-91-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-91-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-91-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-91-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-91-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-91-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-11-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (82/82)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-12 16:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "82 assignments"
      },
      {
        "label": "Made",
        "value": "82"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-92-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-92-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-92-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-92-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-92-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-92-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-92-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-92-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-92-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-92-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-11-9": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "96% (85/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-08 08:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 8-14"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "4"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-97-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-97-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-97-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-97-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-97-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-97-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-97-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-97-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-97-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-10-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (90/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-02 09:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "90"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-86-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-86-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-86-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-86-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-86-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-86-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-86-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-86-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-10-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "92% (57/62)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-03 10:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "62 assignments"
      },
      {
        "label": "Made",
        "value": "57"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached · 2 agents: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-87-1",
        "name": "Agent 010",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-87-2",
        "name": "Agent 021",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-87-3",
        "name": "Agent 032",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-87-4",
        "name": "Agent 043",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-87-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-87-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-87-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-87-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-87-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-87-1",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-87-1",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-87-2",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-87-3",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-87-4",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-10-3": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/69)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-04 11:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "69 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "69"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-10-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-05 12:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-90-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-90-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-90-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-90-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-90-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-90-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-90-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-90-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-10-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (83/83)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-01 13:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "83 assignments"
      },
      {
        "label": "Made",
        "value": "83"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-85-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-85-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-85-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-85-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-85-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-85-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-85-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-85-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-85-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-85-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-10-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "90% (81/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-02 14:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "reasonSummary": "2 agents: insufficient matching conversations · 2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-84-1",
        "name": "Agent 009",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-84-2",
        "name": "Agent 020",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-84-3",
        "name": "Agent 031",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-84-4",
        "name": "Agent 042",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-84-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-84-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-84-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-84-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-84-fallback",
        "name": "Evaluator 21",
        "status": "warning",
        "loadText": "0/21",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-84-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "17/21"
      },
      {
        "id": "active-evaluator-84-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "17/22"
      },
      {
        "id": "active-evaluator-84-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-84-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "17/24"
      }
    ]
  },
  "rule-10-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (62/62)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-03 15:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "62 assignments"
      },
      {
        "label": "Made",
        "value": "62"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-82-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-82-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-82-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-82-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-82-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-82-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-82-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-82-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-82-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-10-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (69/69)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-04 16:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "69 assignments"
      },
      {
        "label": "Made",
        "value": "69"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-83-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-83-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-83-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-83-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-83-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-83-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-83-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-83-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-83-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-83-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "22/23"
      }
    ]
  },
  "rule-10-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-12-05 08:00"
      },
      {
        "label": "Sampled",
        "value": "Dec 1-7"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-88-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-88-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-88-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-88-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-88-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-88-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-88-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-88-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-88-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-9-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-24 09:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-77-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-77-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-77-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-77-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-77-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-77-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-77-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-77-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-9-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (84/84)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-25 10:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-78-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-78-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-78-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-78-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-78-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-78-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-78-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-78-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-78-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-78-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-9-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "95% (86/91)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-26 11:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-80-1",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-80-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-80-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-80-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-80-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-80-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-80-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-80-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "16/20"
      },
      {
        "id": "active-evaluator-80-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "16/21"
      }
    ]
  },
  "rule-9-4": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-27 12:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "63"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-9-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-28 13:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-76-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-76-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-76-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-76-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-76-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-76-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-76-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-76-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-76-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-76-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-9-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-24 14:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-75-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-75-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-75-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-75-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-75-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-75-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-75-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-75-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-75-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-9-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (75/84)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-25 15:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-73-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-73-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-73-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-73-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-73-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-73-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "14/22"
      },
      {
        "id": "active-evaluator-73-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-73-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-73-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "21/25"
      }
    ]
  },
  "rule-9-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (91/91)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-26 16:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "91"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-74-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-74-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-74-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-74-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-74-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-74-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-74-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-74-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-74-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-74-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "23/23"
      }
    ]
  },
  "rule-9-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-27 08:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 24-30"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-79-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-79-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-79-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-79-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-79-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-79-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-79-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-79-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-79-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "20/21"
      }
    ]
  },
  "rule-8-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-21 09:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-68-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-68-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-68-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-68-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-68-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-68-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-68-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-68-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-8-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (71/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-17 10:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "71"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-69-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-69-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-69-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-69-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-69-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-69-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-69-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-69-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-69-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-69-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-8-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (78/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-18 11:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "78"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-71-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-71-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-71-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-71-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-71-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-71-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-71-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-71-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-71-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-8-4": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (80/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-19 12:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "80"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations · 1 agent: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-72-1",
        "name": "Agent 003",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-72-2",
        "name": "Agent 014",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-72-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-72-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-72-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-72-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-72-fallback",
        "name": "Evaluator 13",
        "status": "warning",
        "loadText": "0/25",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-72-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "19/25"
      },
      {
        "id": "active-evaluator-72-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-72-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "13/21"
      },
      {
        "id": "active-evaluator-72-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-8-5": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-20 13:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "92"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-8-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-21 14:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-66-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-66-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-66-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-66-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-66-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-66-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-66-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-66-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-66-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-8-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (71/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-17 15:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "71"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-64-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-64-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-64-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-64-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-64-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-64-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-64-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-64-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-64-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-8-8": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (69/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-18 16:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "69"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "reasonSummary": "1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-65-1",
        "name": "Agent 002",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-65-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-65-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-65-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-65-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-65-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-65-fallback",
        "name": "Evaluator 29",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-65-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "18/23"
      },
      {
        "id": "active-evaluator-65-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-65-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "18/25"
      },
      {
        "id": "active-evaluator-65-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "12/20"
      },
      {
        "id": "active-evaluator-65-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "15/23"
      }
    ]
  },
  "rule-8-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (85/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-19 08:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 17-23"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-70-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-70-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-70-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-70-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-70-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-70-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-70-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-70-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-70-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-7-1": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (76/86)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-13 09:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "86 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-59-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-59-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-59-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-59-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-59-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "18/22"
      },
      {
        "id": "active-evaluator-59-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "18/23"
      },
      {
        "id": "active-evaluator-59-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-59-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "18/25"
      }
    ]
  },
  "rule-7-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-14 10:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-60-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-60-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-60-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-60-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-60-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-60-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-60-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-60-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-60-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-60-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-7-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (65/65)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-10 11:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "65 assignments"
      },
      {
        "label": "Made",
        "value": "65"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-62-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-62-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-62-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-62-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-62-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-62-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-62-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-62-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-62-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-7-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (72/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-11 12:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "72"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-63-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-63-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-63-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-63-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-63-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-63-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-63-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-63-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-7-5": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (74/79)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-12 13:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "79 assignments"
      },
      {
        "label": "Made",
        "value": "74"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-58-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-58-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-58-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-58-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-58-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-58-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "17/21"
      },
      {
        "id": "active-evaluator-58-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "17/22"
      },
      {
        "id": "active-evaluator-58-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "17/23"
      },
      {
        "id": "active-evaluator-58-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-7-6": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/86)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-13 14:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "86 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "86"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-7-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (58/58)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-14 15:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "58 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-55-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-55-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-55-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-55-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-55-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-55-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-55-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-55-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-55-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-7-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (65/65)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-10 16:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "65 assignments"
      },
      {
        "label": "Made",
        "value": "65"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-56-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-56-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-56-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-56-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-56-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-56-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-56-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-56-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-56-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-56-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-7-9": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (63/72)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-11 08:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 10-16"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "72 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "9"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-61-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-61-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-61-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-61-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-61-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-61-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-61-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-61-3",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "16/21"
      }
    ]
  },
  "rule-6-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (73/73)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-05 09:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "73 assignments"
      },
      {
        "label": "Made",
        "value": "73"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-50-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-50-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-50-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-50-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-50-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-50-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-50-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-50-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-6-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (70/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-06 10:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached · 1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-51-1",
        "name": "Agent 008",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-51-2",
        "name": "Agent 019",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-51-3",
        "name": "Agent 030",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-51-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-51-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-51-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-51-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-51-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-51-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-51-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "15/23"
      },
      {
        "id": "active-evaluator-51-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-51-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-51-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "16/20"
      },
      {
        "id": "active-evaluator-51-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "19/24"
      }
    ]
  },
  "rule-6-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (87/87)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-07 11:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "87 assignments"
      },
      {
        "label": "Made",
        "value": "87"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-53-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-53-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-53-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-53-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-53-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-53-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-53-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-53-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-53-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-6-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (59/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-03 12:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "59"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-54-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-54-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-54-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-54-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-54-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-54-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-54-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-54-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-6-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (66/66)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-04 13:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "66 assignments"
      },
      {
        "label": "Made",
        "value": "66"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-49-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-49-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-49-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-49-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-49-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-49-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-49-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-49-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-49-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-49-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-6-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "93% (68/73)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-05 14:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "73 assignments"
      },
      {
        "label": "Made",
        "value": "68"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached · 1 agent: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-48-1",
        "name": "Agent 007",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-48-2",
        "name": "Agent 018",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-48-3",
        "name": "Agent 029",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-48-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-48-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-48-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-48-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-48-1",
        "name": "Evaluator 22",
        "status": "warning",
        "loadText": "0/22",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-48-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "14/21"
      },
      {
        "id": "active-evaluator-48-2",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-48-3",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-6-7": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/80)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-06 15:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "80 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "80"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-6-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (87/87)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-07 16:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "87 assignments"
      },
      {
        "label": "Made",
        "value": "87"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-47-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-47-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-47-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-47-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-47-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-47-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-47-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-47-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-47-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-47-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "22/23"
      }
    ]
  },
  "rule-6-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (59/59)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-11-03 08:00"
      },
      {
        "label": "Sampled",
        "value": "Nov 3-9"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "59 assignments"
      },
      {
        "label": "Made",
        "value": "59"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-52-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-52-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-52-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-52-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-52-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-52-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-52-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-52-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-52-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-5-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (60/60)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-28 09:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "60 assignments"
      },
      {
        "label": "Made",
        "value": "60"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-41-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-41-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-41-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-41-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-41-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-41-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-41-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-41-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-5-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (67/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-29 10:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "67"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-42-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-42-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-42-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-42-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-42-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-42-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-42-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-42-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-42-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-42-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-5-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "87% (64/74)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-30 11:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "74 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-44-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-44-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-44-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-44-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-44-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-44-1",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "19/25"
      },
      {
        "id": "active-evaluator-44-2",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-44-3",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "13/21"
      }
    ]
  },
  "rule-5-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (81/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-31 12:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-45-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-45-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-45-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-45-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-45-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-45-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-45-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-45-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "21/22"
      }
    ]
  },
  "rule-5-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (88/88)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-27 13:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "88 assignments"
      },
      {
        "label": "Made",
        "value": "88"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-40-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-40-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-40-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-40-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-40-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-40-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-40-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-40-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-40-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-40-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-5-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (60/60)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-28 14:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "60 assignments"
      },
      {
        "label": "Made",
        "value": "60"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-39-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-39-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-39-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-39-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-39-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-39-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-39-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-39-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-39-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-5-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "93% (62/67)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-29 15:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "67 assignments"
      },
      {
        "label": "Made",
        "value": "62"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-37-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-37-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-37-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-37-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-37-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "18/22"
      },
      {
        "id": "active-evaluator-37-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "18/23"
      },
      {
        "id": "active-evaluator-37-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "18/24"
      },
      {
        "id": "active-evaluator-37-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "18/25"
      }
    ]
  },
  "rule-5-8": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/74)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-30 16:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "74 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "74"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-5-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (81/81)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-31 08:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 27-Nov 2"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "81 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-43-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-43-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-43-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-43-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-43-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-43-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-43-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-43-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-43-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "20/21"
      }
    ]
  },
  "rule-4-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (82/82)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-20 09:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "82 assignments"
      },
      {
        "label": "Made",
        "value": "82"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-32-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-32-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-32-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-32-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-32-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-32-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-32-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-32-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-4-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (89/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-21 10:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "89"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-33-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-33-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-33-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-33-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-33-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-33-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-33-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-33-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-33-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-33-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-4-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (61/61)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-22 11:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "61 assignments"
      },
      {
        "label": "Made",
        "value": "61"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-35-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-35-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-35-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-35-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-35-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-35-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-35-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-35-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-35-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "21/21"
      }
    ]
  },
  "rule-4-4": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "85% (58/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-23 12:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "58"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "reasonSummary": "2 agents: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-36-1",
        "name": "Agent 001",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-36-2",
        "name": "Agent 012",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-36-1",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-36-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-36-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-36-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-36-fallback",
        "name": "Evaluator 13",
        "status": "warning",
        "loadText": "0/25",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-36-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-36-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-36-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "17/21"
      },
      {
        "id": "active-evaluator-36-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "17/22"
      }
    ]
  },
  "rule-4-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (75/75)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-24 13:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "75 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-31-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-31-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-31-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-31-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-31-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-31-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-31-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-31-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-31-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-31-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-4-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (82/82)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-20 14:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "82 assignments"
      },
      {
        "label": "Made",
        "value": "82"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-30-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-30-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-30-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-30-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-30-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-30-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-30-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-30-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-30-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-4-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (89/89)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-21 15:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "89 assignments"
      },
      {
        "label": "Made",
        "value": "89"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-28-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-28-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-28-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-28-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-28-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-28-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-28-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-28-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-28-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-4-8": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "92% (56/61)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-22 16:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "61 assignments"
      },
      {
        "label": "Made",
        "value": "56"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "reasonSummary": "2 agents: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-29-1",
        "name": "Agent 011",
        "status": "warning",
        "warningReason": "evaluator_unavailable",
        "assignmentText": "0/2 assigned",
        "detailText": "Evaluator availability blocked assignment in this run.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      },
      {
        "id": "warning-agent-29-2",
        "name": "Agent 022",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-29-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-29-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-29-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-29-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-29-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-29-1",
        "name": "Evaluator 39",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-29-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "15/23"
      },
      {
        "id": "active-evaluator-29-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-29-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-29-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "16/20"
      }
    ]
  },
  "rule-4-9": {
    "status": "failed",
    "statusLabel": "Failed",
    "progressLabel": "0% (0/68)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-23 08:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 20-26"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "68 assignments"
      },
      {
        "label": "Made",
        "value": "0"
      },
      {
        "label": "Missed",
        "value": "68"
      }
    ],
    "reasonSummary": "Rule execution failed",
    "agentsWithoutQa": [],
    "coveredAgents": [],
    "quotaMetElsewhere": [],
    "evaluatorsWithIssues": [],
    "activeEvaluators": []
  },
  "rule-3-1": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "91% (63/69)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-17 09:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "69 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "6"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-23-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-23-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-23-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-23-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-23-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "15/22"
      },
      {
        "id": "active-evaluator-23-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "15/23"
      },
      {
        "id": "active-evaluator-23-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-23-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-3-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-13 10:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-24-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-24-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-24-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-24-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-24-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-24-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-24-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-24-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-24-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-24-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "24/24"
      }
    ]
  },
  "rule-3-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (83/83)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-14 11:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "83 assignments"
      },
      {
        "label": "Made",
        "value": "83"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-26-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-26-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-26-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-26-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-26-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-26-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-26-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-26-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-26-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "18/21"
      }
    ]
  },
  "rule-3-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (90/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-15 12:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "90"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-27-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-27-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-27-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-27-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-27-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-27-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-27-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-27-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "19/22"
      }
    ]
  },
  "rule-3-5": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "84% (52/62)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-16 13:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "62 assignments"
      },
      {
        "label": "Made",
        "value": "52"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-22-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-22-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-22-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-22-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-22-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-22-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "14/20"
      },
      {
        "id": "active-evaluator-22-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "14/21"
      },
      {
        "id": "active-evaluator-22-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "14/22"
      },
      {
        "id": "active-evaluator-22-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-22-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "19/25"
      }
    ]
  },
  "rule-3-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (69/69)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-17 14:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "69 assignments"
      },
      {
        "label": "Made",
        "value": "69"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-21-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-21-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-21-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-21-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-21-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-21-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-21-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-21-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-21-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "21/24"
      }
    ]
  },
  "rule-3-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (76/76)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-13 15:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "76 assignments"
      },
      {
        "label": "Made",
        "value": "76"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-19-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-19-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-19-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-19-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-19-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-19-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-19-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-19-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-19-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-3-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (83/83)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-14 16:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "83 assignments"
      },
      {
        "label": "Made",
        "value": "83"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-20-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-20-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-20-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-20-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-20-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-20-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-20-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-20-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-20-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-20-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "21/23"
      }
    ]
  },
  "rule-3-9": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (85/90)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-15 08:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 13-19"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "90 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "5"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-25-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-2",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-3",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-4",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-25-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-25-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-25-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-25-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-25-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "19/24"
      },
      {
        "id": "active-evaluator-25-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "19/25"
      },
      {
        "id": "active-evaluator-25-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-25-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "13/21"
      }
    ]
  },
  "rule-2-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (91/91)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-09 09:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "91"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-14-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-14-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-14-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-14-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-14-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-14-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-14-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-14-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-2-2": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "91% (57/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-10 10:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "57"
      },
      {
        "label": "Missed",
        "value": "6"
      }
    ],
    "reasonSummary": "2 agents: insufficient matching conversations",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-15-1",
        "name": "Agent 006",
        "status": "warning",
        "warningReason": "no_conversations_in_period",
        "assignmentText": "0/2 assigned",
        "detailText": "Agent had no conversations in the sampling window.",
        "issueCodeLabel": "Insufficient matching conversations"
      },
      {
        "id": "warning-agent-15-2",
        "name": "Agent 017",
        "status": "warning",
        "warningReason": "no_matching_conversations",
        "assignmentText": "0/2 assigned",
        "detailText": "Conversations existed but did not match rule filters.",
        "issueCodeLabel": "Insufficient matching conversations"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-15-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-15-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-15-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-15-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-15-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-15-fallback",
        "name": "Evaluator 05",
        "status": "warning",
        "loadText": "0/23",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-15-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "19/23"
      },
      {
        "id": "active-evaluator-15-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "19/24"
      },
      {
        "id": "active-evaluator-15-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "19/25"
      },
      {
        "id": "active-evaluator-15-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "13/20"
      },
      {
        "id": "active-evaluator-15-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "16/24"
      }
    ]
  },
  "rule-2-3": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-06 11:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-17-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-17-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-17-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-17-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-17-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-17-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-17-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-17-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-17-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-2-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-07 12:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-18-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-18-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-18-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-18-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-18-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-18-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-18-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "20/21"
      },
      {
        "id": "active-evaluator-18-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "20/22"
      }
    ]
  },
  "rule-2-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (84/84)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-08 13:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "84 assignments"
      },
      {
        "label": "Made",
        "value": "84"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-13-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-13-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-13-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-13-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-13-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-13-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-13-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-13-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "21/22"
      },
      {
        "id": "active-evaluator-13-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-13-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "25/25"
      }
    ]
  },
  "rule-2-6": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "89% (81/91)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-09 14:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "91 assignments"
      },
      {
        "label": "Made",
        "value": "81"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "reasonSummary": "1 agent: evaluators' workload limit reached",
    "agentsWithoutQa": [
      {
        "id": "warning-agent-12-1",
        "name": "Agent 005",
        "status": "warning",
        "warningReason": "all_evaluators_capacity",
        "assignmentText": "0/2 assigned",
        "detailText": "Eligible conversations could not be assigned due to evaluator workload limits.",
        "issueCodeLabel": "Evaluators' workload limit reached"
      }
    ],
    "coveredAgents": [
      {
        "id": "covered-agent-12-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-5",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-6",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-12-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-12-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-12-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [
      {
        "id": "warning-evaluator-12-fallback",
        "name": "Evaluator 21",
        "status": "warning",
        "loadText": "0/21",
        "detailText": "Workload limit reached for this evaluator in this rule run.",
        "issueCodeLabel": "Workload limit reached"
      }
    ],
    "activeEvaluators": [
      {
        "id": "active-evaluator-12-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-12-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "18/22"
      },
      {
        "id": "active-evaluator-12-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "18/23"
      },
      {
        "id": "active-evaluator-12-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "18/24"
      }
    ]
  },
  "rule-2-7": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (63/63)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-10 15:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "63 assignments"
      },
      {
        "label": "Made",
        "value": "63"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-10-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-10-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-10-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-10-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-10-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-10-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-10-2",
        "name": "Evaluator 26",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-10-3",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "23/24"
      },
      {
        "id": "active-evaluator-10-4",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "23/25"
      }
    ]
  },
  "rule-2-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (70/70)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-06 16:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "70 assignments"
      },
      {
        "label": "Made",
        "value": "70"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-11-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-11-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-11-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-11-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-11-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-11-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-11-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-11-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "24/25"
      },
      {
        "id": "active-evaluator-11-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-11-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "22/23"
      }
    ]
  },
  "rule-2-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (77/77)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-07 08:00"
      },
      {
        "label": "Sampled",
        "value": "Oct 6-12"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "77 assignments"
      },
      {
        "label": "Made",
        "value": "77"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-16-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-16-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-16-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-16-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-16-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-16-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-16-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-16-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-16-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "19/21"
      }
    ]
  },
  "rule-1-1": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (78/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-01 09:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "78"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-5-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-5-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-5-1",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-5-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-5-1",
        "name": "Evaluator 01",
        "status": "success",
        "loadText": "20/22"
      },
      {
        "id": "active-evaluator-5-2",
        "name": "Evaluator 02",
        "status": "success",
        "loadText": "20/23"
      },
      {
        "id": "active-evaluator-5-3",
        "name": "Evaluator 03",
        "status": "success",
        "loadText": "24/24"
      },
      {
        "id": "active-evaluator-5-4",
        "name": "Evaluator 04",
        "status": "success",
        "loadText": "24/25"
      }
    ]
  },
  "rule-1-2": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (85/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-02 10:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "85"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-6-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-6-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-6-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-6-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-6-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-6-1",
        "name": "Evaluator 05",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-6-2",
        "name": "Evaluator 06",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-6-3",
        "name": "Evaluator 07",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-6-4",
        "name": "Evaluator 08",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-6-5",
        "name": "Evaluator 37",
        "status": "success",
        "loadText": "22/24"
      }
    ]
  },
  "rule-1-3": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "94% (86/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-03 11:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "86"
      },
      {
        "label": "Missed",
        "value": "6"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-8-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-8-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-8-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-8-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-8-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-8-1",
        "name": "Evaluator 09",
        "status": "success",
        "loadText": "16/24"
      },
      {
        "id": "active-evaluator-8-2",
        "name": "Evaluator 10",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-8-3",
        "name": "Evaluator 11",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-8-4",
        "name": "Evaluator 12",
        "status": "success",
        "loadText": "17/21"
      }
    ]
  },
  "rule-1-4": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-09-29 12:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-9-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-9-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-9-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-9-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-9-1",
        "name": "Evaluator 13",
        "status": "success",
        "loadText": "23/25"
      },
      {
        "id": "active-evaluator-9-2",
        "name": "Evaluator 14",
        "status": "success",
        "loadText": "17/20"
      },
      {
        "id": "active-evaluator-9-3",
        "name": "Evaluator 15",
        "status": "success",
        "loadText": "21/21"
      },
      {
        "id": "active-evaluator-9-4",
        "name": "Evaluator 16",
        "status": "success",
        "loadText": "21/22"
      }
    ]
  },
  "rule-1-5": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (71/71)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-09-30 13:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "71 assignments"
      },
      {
        "label": "Made",
        "value": "71"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-4-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-4-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-4-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-4-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-4-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-4-1",
        "name": "Evaluator 17",
        "status": "success",
        "loadText": "18/20"
      },
      {
        "id": "active-evaluator-4-2",
        "name": "Evaluator 18",
        "status": "success",
        "loadText": "18/21"
      },
      {
        "id": "active-evaluator-4-3",
        "name": "Evaluator 19",
        "status": "success",
        "loadText": "22/22"
      },
      {
        "id": "active-evaluator-4-4",
        "name": "Evaluator 20",
        "status": "success",
        "loadText": "22/23"
      },
      {
        "id": "active-evaluator-4-5",
        "name": "Evaluator 38",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-1-6": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (78/78)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-01 14:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "78 assignments"
      },
      {
        "label": "Made",
        "value": "78"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-3-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-3-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-3-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-3-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-3-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-3-1",
        "name": "Evaluator 21",
        "status": "success",
        "loadText": "19/21"
      },
      {
        "id": "active-evaluator-3-2",
        "name": "Evaluator 22",
        "status": "success",
        "loadText": "19/22"
      },
      {
        "id": "active-evaluator-3-3",
        "name": "Evaluator 23",
        "status": "success",
        "loadText": "23/23"
      },
      {
        "id": "active-evaluator-3-4",
        "name": "Evaluator 24",
        "status": "success",
        "loadText": "23/24"
      }
    ]
  },
  "rule-1-7": {
    "status": "partial",
    "statusLabel": "Partial",
    "progressLabel": "88% (75/85)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-02 15:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "85 assignments"
      },
      {
        "label": "Made",
        "value": "75"
      },
      {
        "label": "Missed",
        "value": "10"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-1-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-7",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-8",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-9",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-1-10",
        "name": "Agent 011",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-1-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-1-2",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-1-1",
        "name": "Evaluator 25",
        "status": "success",
        "loadText": "15/22"
      },
      {
        "id": "active-evaluator-1-2",
        "name": "Evaluator 27",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-1-3",
        "name": "Evaluator 28",
        "status": "success",
        "loadText": "22/25"
      }
    ]
  },
  "rule-1-8": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (92/92)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-10-03 16:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "92 assignments"
      },
      {
        "label": "Made",
        "value": "92"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-2-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-2-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-2-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-2-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-2-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-2-1",
        "name": "Evaluator 29",
        "status": "success",
        "loadText": "21/23"
      },
      {
        "id": "active-evaluator-2-2",
        "name": "Evaluator 30",
        "status": "success",
        "loadText": "21/24"
      },
      {
        "id": "active-evaluator-2-3",
        "name": "Evaluator 31",
        "status": "success",
        "loadText": "25/25"
      },
      {
        "id": "active-evaluator-2-4",
        "name": "Evaluator 32",
        "status": "success",
        "loadText": "19/20"
      },
      {
        "id": "active-evaluator-2-5",
        "name": "Evaluator 39",
        "status": "success",
        "loadText": "23/23"
      }
    ]
  },
  "rule-1-9": {
    "status": "success",
    "statusLabel": "Success",
    "progressLabel": "100% (64/64)",
    "metadata": [
      {
        "label": "Ran",
        "value": "2025-09-29 08:00"
      },
      {
        "label": "Sampled",
        "value": "Sep 29-Oct 5"
      },
      {
        "label": "Mode",
        "value": "Agent evaluation"
      },
      {
        "label": "Expected",
        "value": "64 assignments"
      },
      {
        "label": "Made",
        "value": "64"
      },
      {
        "label": "Missed",
        "value": "0"
      }
    ],
    "agentsWithoutQa": [],
    "coveredAgents": [
      {
        "id": "covered-agent-7-1",
        "name": "Agent 001",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-2",
        "name": "Agent 002",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-3",
        "name": "Agent 003",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-4",
        "name": "Agent 004",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-5",
        "name": "Agent 005",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-6",
        "name": "Agent 006",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-7",
        "name": "Agent 007",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-8",
        "name": "Agent 008",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-9",
        "name": "Agent 009",
        "status": "success",
        "assignmentText": "2/2 assigned"
      },
      {
        "id": "covered-agent-7-10",
        "name": "Agent 010",
        "status": "success",
        "assignmentText": "2/2 assigned"
      }
    ],
    "quotaMetElsewhere": [
      {
        "id": "quota-agent-7-1",
        "name": "Agent 053",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-7-2",
        "name": "Agent 106",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      },
      {
        "id": "quota-agent-7-3",
        "name": "Agent 159",
        "status": "fyi",
        "assignmentText": "2/2 via another rule",
        "viaRuleName": "Another rule",
        "detailText": "Coverage requirement already met by another rule in the same period.",
        "issueCodeLabel": "Quota met by another rule"
      }
    ],
    "evaluatorsWithIssues": [],
    "activeEvaluators": [
      {
        "id": "active-evaluator-7-1",
        "name": "Evaluator 33",
        "status": "success",
        "loadText": "22/24"
      },
      {
        "id": "active-evaluator-7-2",
        "name": "Evaluator 34",
        "status": "success",
        "loadText": "22/25"
      },
      {
        "id": "active-evaluator-7-3",
        "name": "Evaluator 35",
        "status": "success",
        "loadText": "20/20"
      },
      {
        "id": "active-evaluator-7-4",
        "name": "Evaluator 36",
        "status": "success",
        "loadText": "20/21"
      }
    ]
  }
} as const
