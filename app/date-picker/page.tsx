"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { DatePickerField, DateRangePickerField } from "@/components/ui/date-picker"
import type { DateRange } from "react-day-picker"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function DatePickerDemoPage() {
  const [single, setSingle] = React.useState<Date | undefined>()
  const [large, setLarge] = React.useState<Date | undefined>()
  const [preselected, setPreselected] = React.useState<Date | undefined>(new Date())
  const [errorDate, setErrorDate] = React.useState<Date | undefined>()
  const [constrained, setConstrained] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>()
  const [preRange, setPreRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const today = new Date()
  const maxDate = addDays(today, 90)

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">Date Picker</h1>
          <p className="mt-1 text-sm text-stone-700">
            Calendar-based date selection with single and range modes, constraints, and form field variants.
          </p>
        </div>

        <Section title="Single Date">
          <DatePickerField
            label="Start date"
            hintText="Select a date"
            placeholder="Pick a date"
            value={single}
            onValueChange={setSingle}
          />
        </Section>

        <Section title="Large Variant">
          <DatePickerField
            label="Event date"
            hintText="Large size for prominent forms"
            placeholder="Choose a date"
            inputSize="large"
            value={large}
            onValueChange={setLarge}
          />
        </Section>

        <Section title="Preselected">
          <DatePickerField
            label="Report date"
            hintText="Defaults to today"
            value={preselected}
            onValueChange={setPreselected}
          />
        </Section>

        <Section title="With Min/Max Constraints">
          <DatePickerField
            label="Appointment"
            hintText="Only dates in the next 90 days"
            placeholder="Select within range"
            fromDate={today}
            toDate={maxDate}
            value={constrained}
            onValueChange={setConstrained}
          />
        </Section>

        <Section title="Error State">
          <DatePickerField
            label="Due date"
            errorText="A due date is required"
            placeholder="Pick a date"
            value={errorDate}
            onValueChange={setErrorDate}
          />
        </Section>

        <Section title="Disabled">
          <DatePickerField
            label="Locked date"
            hintText="This date cannot be changed"
            disabled
            value={new Date()}
          />
        </Section>

        <Section title="Date Range">
          <DateRangePickerField
            label="Date range"
            hintText="Select a start and end date"
            placeholder="Pick a date range"
            value={range}
            onValueChange={setRange}
          />
        </Section>

        <Section title="Date Range (Preselected)">
          <DateRangePickerField
            label="Sprint duration"
            hintText="Defaults to this week"
            value={preRange}
            onValueChange={setPreRange}
          />
        </Section>
      </div>
    </div>
  )
}
