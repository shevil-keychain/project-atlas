import { CompanySidePanel, type CompanySidePanelData } from "@/components/company-detail/side-panel";
import { CompanyOverview } from "@/components/company-detail/overview";

const dummyCompany: CompanySidePanelData = {
  name: "Magic Spoon",
  status: "Prospect",
  keyDetails: {
    accountName: "Magic Spoon",
    accountType: "Brand",
    website: "magicspoon.com",
    phone: "(917) 555-0101",
    industry: "Food & Beverage",
    owner: "Ben Cohen",
    description: "Fresh produce marketplace and distribution.",
  },
  timestamps: {
    createdAt: "Jan 12, 2026",
    lastActivity: "6 days ago",
    statusLastChangedAt: "Mar 3, 2026",
  },
  primaryContact: {
    initials: "ES",
    name: "Elliot Shifrin",
    title: "Chief Commercial Officer",
  },
  parentAccount: {
    name: "Magic Spoon",
    website: "magicspoon.com",
    status: "Prospect",
  },
  childAccounts: [
    { name: "Magic Spoon", website: "magicspoon.com", status: "Prospect" },
    { name: "Magic Spoon", website: "magicspoon.com", status: "Prospect" },
  ],
  primaryAddresses: [
    {
      lines: ["117 Hudson St, Fl 12", "New York, NY, 10013, United States"],
      type: "Billing",
    },
    {
      lines: ["238 Commercial Blvd, Unit 8", "Trenton, NJ, 18766, United States"],
      type: "Shipping",
    },
  ],
};

export default function CompanyDetailPage() {
  return (
    <div className="flex h-full min-h-0">
      <CompanySidePanel data={dummyCompany} />
      <div className="flex-1 overflow-auto bg-surface-page">
        <CompanyOverview />
      </div>
    </div>
  );
}
