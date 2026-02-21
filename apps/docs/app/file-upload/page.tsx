"use client"

import * as React from "react"
import { FileUploadField, type FileInfo } from "@/components/ui/file-upload"
import { BackButton } from "@/components/ui/back-button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}

export default function FileUploadDemoPage() {
  const [basic, setBasic] = React.useState<FileInfo[]>([])
  const [multi, setMulti] = React.useState<FileInfo[]>([])
  const [images, setImages] = React.useState<FileInfo[]>([])
  const [limited, setLimited] = React.useState<FileInfo[]>([])
  const [compact, setCompact] = React.useState<FileInfo[]>([])
  const [errorFiles, setErrorFiles] = React.useState<FileInfo[]>([])

  return (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">File Upload</h1>
          <p className="mt-1 text-sm text-stone-700">
            Drag-and-drop upload with file list, size limits, type filters, and compact button variant.
          </p>
        </div>

        <Section title="Default Drop Zone">
          <FileUploadField
            label="Attachment"
            hintText="Upload a file to attach"
            value={basic}
            onValueChange={setBasic}
          />
        </Section>

        <Section title="Multiple Files">
          <FileUploadField
            label="Documents"
            hintText="Upload one or more files"
            multiple
            value={multi}
            onValueChange={setMulti}
          />
        </Section>

        <Section title="Images Only">
          <FileUploadField
            label="Profile photo"
            hintText="JPG, PNG, or GIF"
            accept="image/jpeg,image/png,image/gif"
            value={images}
            onValueChange={setImages}
          />
        </Section>

        <Section title="With Size Limit (2 MB)">
          <FileUploadField
            label="Resume"
            hintText="PDF up to 2 MB"
            accept=".pdf"
            maxFileSize={2 * 1024 * 1024}
            value={limited}
            onValueChange={setLimited}
          />
        </Section>

        <Section title="Error State">
          <FileUploadField
            label="Required file"
            errorText="A file is required to continue"
            value={errorFiles}
            onValueChange={setErrorFiles}
          />
        </Section>

        <Section title="Disabled">
          <FileUploadField
            label="Locked upload"
            hintText="Uploads are not allowed"
            disabled
          />
        </Section>

        <Section title="Compact Button Style">
          <FileUploadField
            label="Quick upload"
            hintText="Button-style file picker"
            variant="compact"
            multiple
            value={compact}
            onValueChange={setCompact}
          />
        </Section>
      </div>
    </div>
  )
}
