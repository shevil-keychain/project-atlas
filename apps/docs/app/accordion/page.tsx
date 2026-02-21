"use client"

import * as React from "react"
import { User, Bell, Shield, CreditCard } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { BackButton } from "@/components/ui/back-button"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function AccordionDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-3xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Accordion</h1>
          <p className="mt-1 text-sm text-stone-700">
            Collapsible card sections with single or multiple expansion, smooth
            height animation, and icon support.
          </p>
        </div>

        <Section title="Single Expand">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Level AI?</AccordionTrigger>
              <AccordionContent>
                Level AI is an enterprise AI platform that helps contact centers
                improve agent performance, customer satisfaction, and operational
                efficiency through real-time intelligence and automation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                The platform uses advanced NLP and machine learning to analyze
                customer conversations in real time, providing actionable
                insights, automated quality assurance, and intelligent coaching
                recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who is it for?</AccordionTrigger>
              <AccordionContent>
                Level AI is designed for contact centers of all sizes, from
                growing teams to large enterprises, who want to deliver
                exceptional customer experiences at scale.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Multiple Expand">
          <Accordion type="multiple">
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Real-time conversation intelligence and analytics</li>
                  <li>Automated quality assurance across 100% of interactions</li>
                  <li>AI-powered agent coaching and performance insights</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pricing">
              <AccordionTrigger>Pricing</AccordionTrigger>
              <AccordionContent>
                Contact us for enterprise pricing tailored to your organization's
                size, volume, and specific requirements. We offer flexible plans
                to match your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>Support</AccordionTrigger>
              <AccordionContent>
                We offer 24/7 support through email, chat, and phone. Enterprise
                customers also receive a dedicated customer success manager and
                priority response times.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="With Icons">
          <Accordion type="single" collapsible>
            <AccordionItem value="profile">
              <AccordionTrigger icon={<User className="size-4" />}>
                Profile
              </AccordionTrigger>
              <AccordionContent>
                Manage your profile settings including display name, avatar,
                email address, and timezone preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications">
              <AccordionTrigger icon={<Bell className="size-4" />}>
                Notifications
              </AccordionTrigger>
              <AccordionContent>
                Configure notification preferences for email alerts, in-app
                notifications, and mobile push notifications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger icon={<Shield className="size-4" />}>
                Security
              </AccordionTrigger>
              <AccordionContent>
                Update password and two-factor authentication settings to keep
                your account secure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing">
              <AccordionTrigger icon={<CreditCard className="size-4" />}>
                Billing
              </AccordionTrigger>
              <AccordionContent>
                View invoices and update payment methods, billing address, and
                subscription plan details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Default Open">
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Getting Started</AccordionTrigger>
              <AccordionContent>
                This item starts open by default. Follow the onboarding guide to
                connect your data sources, configure your first scorecard, and
                invite your team members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Advanced Setup</AccordionTrigger>
              <AccordionContent>
                Configure custom integrations, set up automated workflows, and
                fine-tune AI models to match your organization's unique needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Best Practices</AccordionTrigger>
              <AccordionContent>
                Learn proven strategies for maximizing ROI, driving agent
                adoption, and building a culture of continuous improvement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Nested Content">
          <Accordion type="single" collapsible>
            <AccordionItem value="account">
              <AccordionTrigger>Account Settings</AccordionTrigger>
              <AccordionContent>
                <p>
                  Your account settings control how you interact with the
                  platform. You can update your personal information, manage
                  connected integrations, and configure your workspace.
                </p>
                <p className="mt-3">
                  Changes to account settings take effect immediately. Some
                  settings, such as SSO configuration, may require admin
                  approval before they are applied.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="api">
              <AccordionTrigger>API Configuration</AccordionTrigger>
              <AccordionContent>
                <p>
                  Use the Level AI REST API to integrate conversation
                  intelligence into your existing tools and workflows.
                </p>
                <code className="block bg-stone-100 rounded p-3 text-xs font-mono mt-2">
                  {`curl -X GET https://api.level.ai/v1/conversations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </code>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Disabled Item">
          <Accordion type="single" collapsible>
            <AccordionItem value="active-1">
              <AccordionTrigger>Available Section</AccordionTrigger>
              <AccordionContent>
                This section is fully interactive and can be expanded or
                collapsed as expected.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="disabled-1" disabled>
              <AccordionTrigger>Locked Section</AccordionTrigger>
              <AccordionContent>
                This content is not accessible because the item is disabled.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="active-2">
              <AccordionTrigger>Another Available Section</AccordionTrigger>
              <AccordionContent>
                This section is also fully interactive and works as expected.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>
      </div>
    </div>
  )
}
