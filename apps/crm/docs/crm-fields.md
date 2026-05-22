# CRM Table View Fields — Companies, People, Discover

Source of truth: Notion PRD "Core Model and Workflows" + meeting-2-key-insights.md
Last updated: 2026-05-21

Sources key: Manual = user-entered. Gmail = auto from email sync. Calls = call log. DB = Keychain DB / ZoomInfo. Computed = derived from multiple sources.

---

## Companies (in-network Accounts)

| Field | Type | Cell display | Source |
|---|---|---|---|
| Company | Text + image | Logo (32px) + company name, bold | Manual / DB |
| Company type | Single select | Pill: Brand / Manufacturer / Retailer / Distributor / Broker / Other | Manual / DB |
| Status | Single select | Pill: Prospect / Customer / Churned | Manual / auto |
| Relationship strength | Computed select | Visual indicator (TBD in design): Warm / Fading / Cold / Uncontacted | Computed |
| Owner | User | Avatar (24px) + name | Manual |
| Industry | Single select | Food & Bev / Health & Wellness / Beverages / Supplements / Other | Manual / DB |
| Open deals | Number | Count chip | Computed |
| Open leads | Number | Count chip | Computed |
| First email | Date | "MMM D, YYYY" | Gmail |
| Last email | Date | Relative: "3 days ago" | Gmail |
| # Emails | Number | Integer | Gmail |
| First call | Date | "MMM D, YYYY" | Calls |
| Last call | Date | Relative: "3 days ago" | Calls |
| # Calls | Number | Integer | Calls |
| Last interaction | Date | Relative: "3 days ago" — across all types | Computed |
| # Interactions (90d) | Number | Integer — emails + calls + all activity types | Computed |
| Source | Single select | Prospecting / Manual / Opportunity / Gmail | Manual / auto |
| Website | URL | Clickable domain, truncated | Manual / DB |
| Added | Date | "MMM D, YYYY" | Auto |

**Enriched from Keychain DB (Brands):** revenue, growth rate, products in market, categories, parent brand
**Enriched from Keychain DB (Manufacturers):** facility addresses, certifications, capabilities
**Enriched from OS (when linked):** payment terms, historical orders, customer status

**Default visible columns:**
Company → Status → Relationship strength → Owner → Last interaction → # Interactions (90d) → Open deals

---

## People (in-network Contacts)

| Field | Type | Cell display | Source |
|---|---|---|---|
| Name | Text + image | Avatar initials (32px) + full name, bold | Manual / Gmail |
| Company | Relation | Logo (24px) + company name — linked to Company record | Manual / Gmail |
| Title | Text | Plain text | Manual / DB (ZoomInfo) |
| Seniority | Single select | Pill: Executive / VP+Sr. Director / Director+Manager / Lead+Sr. IC / IC / Unknown | Manual / DB |
| Relationship strength | Computed select | Visual indicator (TBD in design): Warm / Fading / Cold / Uncontacted | Computed |
| Email | Email | Truncated, clickable | Manual / Gmail |
| Phone | Phone | Formatted number | Manual |
| Owner | User | Avatar (24px) + name | Manual |
| Source | Single select | Prospecting / Keychain Outreach / Newsletter / KeychainOS / Manual | Manual / auto |
| Role on deals | Multi select | Decision maker / Procurement / Technical evaluator / Operations / Other | Manual |
| First email | Date | "MMM D, YYYY" | Gmail |
| Last email | Date | Relative: "3 days ago" | Gmail |
| # Emails | Number | Integer | Gmail |
| First call | Date | "MMM D, YYYY" | Calls |
| Last call | Date | Relative: "3 days ago" | Calls |
| # Calls | Number | Integer | Calls |
| Last interaction | Date | Relative: "3 days ago" — across all types | Computed |
| # Interactions (90d) | Number | Integer | Computed |
| Open deals | Number | Count chip | Computed |
| LinkedIn | URL | LinkedIn icon, clickable | Manual / DB |
| Added | Date | "MMM D, YYYY" | Auto |

**Default visible columns:**
Name → Company → Title → Seniority → Relationship strength → Last interaction → # Interactions (90d) → Owner

---

## Discover (out-of-network Companies — Keychain DB)

Discover is a browsable directory of brands/manufacturers NOT yet in the user's network. All data is read-only from Keychain DB. The only user action is "Add to network."

| Field | Type | Cell display | Source |
|---|---|---|---|
| Company | Text + image | Logo (32px) + company name, bold | DB |
| Company type | Single select | Pill: Brand / Manufacturer / Retailer / Distributor | DB |
| Industry | Single select | Food & Bev / Health & Wellness / Beverages / Supplements / Other | DB |
| Categories | Multi select | CPG category chips: Snacks, Beverages, Supplements… | DB |
| Products | Number | "X products" — count of SKUs in Keychain | DB |
| Revenue | Revenue range | "$10M–$50M" — banded, not exact | DB |
| Employees | Employee range | "50–200" | DB |
| Growth rate | Text | "↑ 22% YoY" — for Brand-type only | DB |
| Certifications | Multi select | Chips: Organic / Kosher / Non-GMO / SQF… — for Manufacturer-type | DB |
| Keychain member | Boolean | "Member" badge if on Keychain platform | DB |
| Website | URL | Clickable domain | DB |
| Add to network | Action | "＋ Add" button — creates as Prospect Account | Action |

**Default visible columns:**
Company → Company type → Industry → Categories → Products → Revenue → Keychain member → Add to network
