"use client"

import * as React from "react"
import { MainNav } from "@level/ui/components/patterns/main-nav"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderRow,
  PageHeaderTitle,
} from "@level/ui/components/patterns/page-header"
import { TopBar } from "@level/ui/components/patterns/top-bar"
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@level/ui/components/ui/card"
import { InlineAlert } from "@level/ui/components/ui/inline-alert"

export default function PrototypeThreePlaceholder() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <MainNav activeItem="Settings" />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopBar avatarInitial="A" avatarColor="var(--color-primary-lime-700)" />

          <main className="flex-1 overflow-y-auto bg-stone-50">
            <PageHeader>
              <PageHeaderRow>
                <div className="flex flex-col gap-4">
                  <PageHeaderTitle>QA case assignment</PageHeaderTitle>
                  <PageHeaderDescription>
                    Prototype 3 has been reserved inside the shared QA prototype app but has
                    not been built yet.
                  </PageHeaderDescription>
                </div>
              </PageHeaderRow>
            </PageHeader>

            <div className="flex flex-col gap-24 px-24 py-24">
              <InlineAlert
                title="Prototype 3 is not available yet"
                description="Build the next QA iteration in this slot so every version stays under the same production app."
              />

              <Card>
                <CardHeader>
                  <CardTitle>Reserved slot for the next QA iteration</CardTitle>
                  <CardDescription>
                    The selector is already wired to this version. When the new prototype is
                    ready, replace this placeholder with the real workflow.
                  </CardDescription>
                </CardHeader>

                <CardBody className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <p className="text-14 font-semibold text-text-primary">Current structure</p>
                    <p className="text-14 font-medium text-text-secondary">
                      The canonical QA app now holds the original case assignment prototype, the
                      rule run visibility iteration, and this scaffold for the next version.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="text-14 font-semibold text-text-primary">Next build step</p>
                    <p className="text-14 font-medium text-text-secondary">
                      Implement the third prototype as another version module in this app so the
                      production link stays stable while the internal selector switches between
                      iterations.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
