import { notFound } from "next/navigation";
import { CompanySidePanel, type CompanySidePanelData } from "@/components/company-detail/side-panel";
import { CompanyOverview } from "@/components/company-detail/overview";
import { suppliers } from "@/data/discover.data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DiscoverDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supplier = suppliers.find((s) => s.id === id);
  if (!supplier) notFound();

  const status = supplier.keychainMember === "Member" ? "Keychain member" : "Not in network";

  const data: CompanySidePanelData = {
    name: supplier.name,
    status,
    isDiscover: true,
    extraKeyDetails: [
      { label: "Company type", value: supplier.companyType },
      { label: "Capability match", value: supplier.capabilityMatch },
      { label: "Growth rate", value: supplier.growthRate },
      { label: "Revenue", value: supplier.revenue },
      { label: "Employees", value: supplier.employees },
      { label: "Categories", value: supplier.categories },
    ],
    keyDetails: {
      accountName: supplier.name,
      accountType: supplier.companyType,
      website: supplier.website,
      phone: "(917) 555-0101",
      industry: supplier.industry,
      owner: "—",
      description: `${supplier.name} is a ${supplier.industry.toLowerCase()} brand currently in a ${status.toLowerCase()} stage.`,
    },
    timestamps: {
      createdAt: supplier.lastPlatformActivity,
      lastActivity: supplier.lastPlatformActivity,
      statusLastChangedAt: supplier.lastPlatformActivity,
    },
    primaryContact: { initials: "", name: "", title: "" },
    parentAccount: { name: supplier.name, website: supplier.website, status },
    childAccounts: [],
    primaryAddresses: [
      {
        lines: ["117 Hudson St, Fl 12", "New York, NY, 10013, United States"],
        type: "Billing",
      },
    ],
  };

  return (
    <div className="flex h-full min-h-0">
      <CompanySidePanel data={data} />
      <div className="flex-1 overflow-auto bg-surface-page">
        <CompanyOverview
          company={{ name: supplier.name, industry: supplier.industry, owner: "—", status }}
          isDiscover
        />
      </div>
    </div>
  );
}
