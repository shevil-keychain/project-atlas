import { companies } from "./companies.data";

export type AccountContact = {
  name: string;
  title: string;
  status: "Primary" | "Buying team" | "Finance";
  email: string;
  phone: string;
};

export type AccountActivity = {
  type: "Email" | "Call" | "Note" | "Meeting";
  title: string;
  date: string;
  description: string;
};

export type AccountDetail = {
  id: string;
  summary: string;
  stage: string;
  headquarters: string;
  employees: string;
  annualRevenue: string;
  nextStep: string;
  nextStepDate: string;
  contacts: AccountContact[];
  activity: AccountActivity[];
};

const stageByStatus = {
  Customer: "Active customer",
  Prospect: "Discovery",
  Churned: "Lost",
} as const;

const hqs = [
  "Brooklyn, NY",
  "Austin, TX",
  "Boulder, CO",
  "Portland, OR",
  "Los Angeles, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Miami, FL",
];

const employeeBands = ["11-50", "51-200", "201-500", "501-1k"];
const revenueBands = ["$2M", "$8M", "$24M", "$60M", "$120M"];

const contactSeeds: Array<Omit<AccountContact, "email" | "phone">> = [
  { name: "Avery Chen", title: "VP of Sales", status: "Primary" },
  { name: "Jordan Patel", title: "Head of Procurement", status: "Buying team" },
  { name: "Sasha Lin", title: "Finance Director", status: "Finance" },
];

function detailFor(company: (typeof companies)[number], index: number): AccountDetail {
  const hq = hqs[index % hqs.length];
  const employees = employeeBands[index % employeeBands.length];
  const annualRevenue = revenueBands[index % revenueBands.length];
  const slug = company.website.replace(/\..+$/, "");

  return {
    id: company.id,
    summary: `${company.name} is a ${company.industry.toLowerCase()} brand currently in a ${company.relationshipStrength.toLowerCase()} relationship with our team. ${company.owner} owns the account.`,
    stage: stageByStatus[company.status],
    headquarters: hq,
    employees,
    annualRevenue,
    nextStep: company.status === "Customer" ? "Schedule QBR" : "Send tailored proposal",
    nextStepDate: "May 28, 2026",
    contacts: contactSeeds.map((seed, contactIndex) => ({
      ...seed,
      email: `${seed.name.split(" ")[0].toLowerCase()}@${slug}.com`,
      phone: `+1 (555) 0${(index % 9) + 1}${contactIndex}-${1200 + index}`,
    })),
    activity: [
      {
        type: "Email",
        title: `Followed up on ${company.name} pricing`,
        date: company.lastEmail,
        description: `${company.owner} sent the latest deck and pricing options.`,
      },
      {
        type: "Call",
        title: "Discovery call",
        date: company.lastCall,
        description: "Reviewed current workflow and pain points around fulfillment.",
      },
      {
        type: "Meeting",
        title: "On-site visit",
        date: company.lastInteraction,
        description: "Walked their warehouse team through implementation timeline.",
      },
      {
        type: "Note",
        title: "Account note",
        date: company.added,
        description: `Sourced via ${company.source}. ${company.openLeads} open leads in motion.`,
      },
    ],
  };
}

export const accountDetails: AccountDetail[] = companies.map(detailFor);
