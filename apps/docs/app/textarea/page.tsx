"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { TextareaField } from "@/components/ui/textarea-field"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
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

export default function TextareaDemoPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-xxl font-bold text-foreground">Textarea</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Multiline text input with label, character count, and error states.
          </p>
        </div>

        <Section title="Default Textarea">
          <TextareaField
            label="Description"
            hintText="Provide a brief description of the issue."
            placeholder="Enter your description..."
          />
        </Section>

        <Section title="With Character Count">
          <TextareaField
            label="Bio"
            hintText="Tell us about yourself."
            placeholder="Write a short bio..."
            showCount
            maxLength={200}
          />
        </Section>

        <Section title="Error State">
          <TextareaField
            label="Feedback"
            errorText="This field is required."
            placeholder="What went wrong?"
          />
        </Section>

        <Section title="Required & Optional">
          <div className="space-y-6">
            <TextareaField
              label="Summary"
              required
              placeholder="Required field..."
            />
            <TextareaField
              label="Additional Notes"
              optional
              placeholder="Optional field..."
            />
          </div>
        </Section>

        <Section title="Disabled">
          <TextareaField
            label="Read-only Notes"
            disabled
            defaultValue="This textarea is disabled and cannot be edited by the user."
            hintText="Contact an admin to modify this field."
          />
        </Section>

        <Section title="Custom Rows">
          <TextareaField
            label="Detailed Response"
            rows={6}
            placeholder="This textarea has 6 rows for longer content..."
            hintText="Use this for longer-form responses."
          />
        </Section>

        <div className="border-t border-stone-300 pt-12">
          <h1 className="text-xxl font-bold text-foreground">Rich Text Editor</h1>
          <p className="mt-1 text-default text-stone-700 font-medium">
            Tiptap-based editor with formatting toolbar.
          </p>
        </div>

        <Section title="Default RTE">
          <RichTextEditor
            label="Content"
            placeholder="Start writing your content..."
            hintText="Supports bold, italic, strikethrough, and lists."
          />
        </Section>

        <Section title="RTE with Error">
          <RichTextEditor
            label="Response"
            placeholder="Write your response..."
            errorText="Content is required."
            required
          />
        </Section>

        <Section title="Disabled RTE">
          <RichTextEditor
            label="Read-only Content"
            value="<p>This editor is <strong>disabled</strong> and cannot be edited.</p>"
            disabled
            hintText="Contact an admin to modify."
          />
        </Section>
      </div>
    </div>
  )
}
