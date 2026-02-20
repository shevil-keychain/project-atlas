"use client"

import * as React from "react"
import { MoreVertical, Sparkles, Share2, ListPlus } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import {
  PageHeader,
  PageHeaderRow,
  PageHeaderBackButton,
  PageHeaderBreadcrumb,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderActions,
  PageHeaderNav,
  PageHeaderStatus,
} from "@/components/patterns/page-header"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-stone-300/80 bg-white/90 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
      <div className="border-b border-stone-200 px-6 py-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function PageHeaderDemoPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_420px_at_0%_-10%,#FFF5EB,transparent),radial-gradient(900px_360px_at_100%_0%,#F5FCFF,transparent)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <BackButton />
        <header className="rounded-2xl border border-stone-300/80 bg-white/90 p-6 shadow-[0_8px_24px_rgba(40,38,36,0.05)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            Pattern Demo
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Page Header
          </h1>
          <p className="mt-2 text-sm text-stone-700">
            Composable page header with back button, breadcrumb, title,
            description, metadata, actions, prev/next navigation, and status
            badges. Covers 5 layout variants from the product.
          </p>
        </header>

        {/* Variant 1: Conversation tags — back + title + badge + menu + buttons */}
        <Section title="1 — Back + title + badge + actions (Conversation tags)">
          <PageHeader>
            <PageHeaderRow>
              <div className="flex items-center gap-4">
                <PageHeaderBackButton onClick={() => {}} />
                <PageHeaderTitle>New conversation tag</PageHeaderTitle>
              </div>
              <PageHeaderActions>
                <Badge color="gray" size="sm">
                  Unsaved changes
                </Badge>
                <button
                  type="button"
                  className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-stone-100"
                  aria-label="More options"
                >
                  <MoreVertical className="size-5 text-stone-600" />
                </button>
                <Button variant="secondary">Save</Button>
                <Button disabled>Activate</Button>
              </PageHeaderActions>
            </PageHeaderRow>
          </PageHeader>
        </Section>

        {/* Variant 2: VOC detail — back + breadcrumb + title + Ask AI */}
        <Section title="2 — Back + breadcrumb + title + action (VOC detail)">
          <PageHeader>
            <PageHeaderRow>
              <div className="flex items-center gap-4">
                <PageHeaderBackButton onClick={() => {}} />
                <div className="flex flex-col gap-1">
                  <PageHeaderBreadcrumb>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem href="#">
                          Delivery and Shipping Issues
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem href="#">
                          Delayed Deliveries
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </BreadcrumbList>
                    </Breadcrumb>
                  </PageHeaderBreadcrumb>
                  <PageHeaderTitle size="2xl">
                    Production delays affecting order delivery
                  </PageHeaderTitle>
                </div>
              </div>
              <PageHeaderActions>
                <Button variant="secondary" iconLeft={<Sparkles className="size-4" />}>
                  Ask AI
                </Button>
              </PageHeaderActions>
            </PageHeaderRow>
          </PageHeader>
        </Section>

        {/* Variant 3: QA calibration — breadcrumb + title + badges + meta + prev/next + action */}
        <Section title="3 — Breadcrumb + title + badges + metadata + prev/next (QA calibration)">
          <PageHeader variant="subtle">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <PageHeaderBreadcrumb>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem href="#">
                        Private calibrations
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </BreadcrumbList>
                  </Breadcrumb>
                </PageHeaderBreadcrumb>
                <div className="flex flex-wrap items-baseline gap-3">
                  <PageHeaderTitle>
                    John Doe (Original evaluator)
                  </PageHeaderTitle>
                  <PageHeaderStatus>
                    <Badge color="gray" size="sm">
                      Private calibration
                    </Badge>
                    <Badge color="primary" size="sm">
                      Completed
                    </Badge>
                  </PageHeaderStatus>
                </div>
                <PageHeaderMeta>
                  <span>
                    <span className="text-stone-600">Calibration date</span>{" "}
                    <span className="font-bold text-stone-600">
                      May 09, 2024, 09:30 PM
                    </span>
                  </span>
                  <span>
                    <span className="text-stone-600">Moderator</span>{" "}
                    <span className="font-bold text-stone-600">Marian Tan</span>
                  </span>
                  <span>
                    <span className="text-stone-600">Conversation ID</span>{" "}
                    <span className="font-bold text-stone-600">1071852</span>
                  </span>
                  <span>
                    <span className="text-stone-600">Original eval. date</span>{" "}
                    <span className="font-bold text-stone-600">
                      May 14, 2024
                    </span>
                  </span>
                  <PageHeaderNav
                    onPrev={() => {}}
                    onNext={() => {}}
                  />
                </PageHeaderMeta>
              </div>
              <PageHeaderActions>
                <Button variant="secondary">Delete</Button>
              </PageHeaderActions>
            </div>
          </PageHeader>
        </Section>

        {/* Variant 4: QA preferences — title + description */}
        <Section title="4 — Title + description (QA preferences)">
          <PageHeader>
            <PageHeaderRow>
              <div className="flex flex-col gap-1">
                <PageHeaderTitle>QA preferences</PageHeaderTitle>
                <PageHeaderDescription>
                  Configure default thresholds, sampling, and review rules for
                  your QA workflows.
                </PageHeaderDescription>
              </div>
            </PageHeaderRow>
          </PageHeader>
        </Section>

        {/* Variant 5: Account 360 — back + title + prev/next + meta + avatars + actions */}
        <Section title="5 — Back + title + prev/next + metadata + avatars + actions (Account 360)">
          <PageHeader>
            <PageHeaderRow>
              <div className="flex items-center gap-4">
                <PageHeaderBackButton onClick={() => {}} />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-6">
                    <PageHeaderTitle size="2xl">
                      Understanding Integration issues
                    </PageHeaderTitle>
                    <PageHeaderNav
                      onPrev={() => {}}
                      onNext={() => {}}
                      prevLabel="Prev"
                      nextLabel="Next"
                    />
                  </div>
                  <PageHeaderMeta>
                    <span>Marcus Baptista</span>
                    <span>Acme Inc</span>
                    <span>Feb 27, 1:00 PM</span>
                    <span>42 mins</span>
                    <AvatarGroup
                      names={[
                        "Alice Nguyen",
                        "Bob Chen",
                        "Carol Davis",
                        "Dave Park",
                      ]}
                      max={4}
                      size="xs"
                    />
                  </PageHeaderMeta>
                </div>
              </div>
              <PageHeaderActions>
                <Button
                  variant="secondary"
                  iconLeft={<ListPlus className="size-5" />}
                >
                  Add to
                </Button>
                <Button
                  variant="secondary"
                  iconLeft={<Share2 className="size-5" />}
                >
                  Share
                </Button>
                <Button
                  variant="secondary"
                  iconLeft={<Sparkles className="size-4" />}
                >
                  Ask AI
                </Button>
              </PageHeaderActions>
            </PageHeaderRow>
          </PageHeader>
        </Section>
      </div>
    </div>
  )
}
