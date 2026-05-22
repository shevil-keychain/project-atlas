import { notFound } from "next/navigation";
import { CompanySidePanel, type CompanySidePanelData } from "@/components/company-detail/side-panel";
import { CompanyOverview } from "@/components/company-detail/overview";
import { companies } from "@/data/companies.data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const company = companies.find((c) => c.id === id);
  if (!company) notFound();

  const data: CompanySidePanelData = {
    name: company.name,
    status: company.status,
    keyDetails: {
      accountName: company.name,
      accountType: company.companyType,
      website: company.website,
      phone: "(917) 555-0101",
      industry: company.industry,
      owner: company.owner,
      description: `${company.name} is a ${company.industry.toLowerCase()} brand currently in a ${company.status.toLowerCase()} stage.`,
    },
    timestamps: {
      createdAt: company.added,
      lastActivity: company.lastInteraction,
      statusLastChangedAt: company.added,
    },
    primaryContact: {
      initials: "ES",
      name: "Elliot Shifrin",
      title: "Chief Commercial Officer",
    },
    parentAccount: {
      name: company.name,
      website: company.website,
      status: company.status,
    },
    childAccounts: [
      { name: company.name, website: company.website, status: company.status },
      { name: company.name, website: company.website, status: company.status },
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

  return (
    <div className="flex h-full min-h-0">
      <CompanySidePanel data={data} />
      <div className="flex-1 overflow-auto bg-surface-page">
        <CompanyOverview company={{ name: company.name, industry: company.industry, owner: company.owner, status: company.status }} />
      </div>
    </div>
  );
}
