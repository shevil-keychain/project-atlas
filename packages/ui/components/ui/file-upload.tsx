"use client"

import * as React from "react"
import { Upload, File, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FileInfo = {
  file: File
  id: string
  error?: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type FileUploadProps = {
  value?: FileInfo[]
  onValueChange?: (files: FileInfo[]) => void
  accept?: string
  multiple?: boolean
  maxFileSize?: number
  disabled?: boolean
  error?: boolean
  variant?: "dropzone" | "compact"
  className?: string
}

function FileUpload({
  value = [],
  onValueChange,
  accept,
  multiple = false,
  maxFileSize,
  disabled,
  error,
  variant = "dropzone",
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function processFiles(fileList: FileList | null) {
    if (!fileList || disabled) return
    const newFiles: FileInfo[] = Array.from(fileList).map((file) => {
      const info: FileInfo = { file, id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}` }
      if (maxFileSize && file.size > maxFileSize) {
        info.error = `File exceeds ${formatFileSize(maxFileSize)} limit`
      }
      return info
    })
    onValueChange?.(multiple ? [...value, ...newFiles] : newFiles.slice(0, 1))
  }

  function removeFile(id: string) {
    if (disabled) return
    onValueChange?.(value.filter((f) => f.id !== id))
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all",
            "hover:border-stone-600 hover:bg-stone-50",
            "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
            error ? "border-error-500 text-error-500" : "border-stone-500 text-foreground"
          )}
        >
          <Upload className="size-4" />
          {multiple ? "Choose files" : "Choose file"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => processFiles(e.target.files)}
          className="hidden"
        />
        {value.length > 0 && <FileList files={value} onRemove={removeFile} disabled={disabled} />}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer text-center",
          "hover:border-stone-600 hover:bg-stone-50",
          "disabled:bg-stone-200 disabled:border-stone-500 disabled:cursor-not-allowed disabled:text-stone-600",
          isDragging && "border-primary-brand-500 bg-primary-brand-25",
          error
            ? "border-error-500"
            : isDragging
              ? "border-primary-brand-500"
              : "border-stone-500"
        )}
      >
        <div className={cn(
          "flex items-center justify-center size-10 rounded-full",
          isDragging ? "bg-primary-brand-100 text-primary-brand-600" : "bg-stone-200 text-stone-700"
        )}>
          <Upload className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-stone-600 mt-0.5">
            {accept ? accept.split(",").join(", ") : "Any file type"}
            {maxFileSize && ` · Max ${formatFileSize(maxFileSize)}`}
          </p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          processFiles(e.target.files)
          e.target.value = ""
        }}
        className="hidden"
      />
      {value.length > 0 && <FileList files={value} onRemove={removeFile} disabled={disabled} />}
    </div>
  )
}

function FileList({
  files,
  onRemove,
  disabled,
}: {
  files: FileInfo[]
  onRemove: (id: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {files.map((f) => (
        <div
          key={f.id}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm",
            f.error ? "border-error-200 bg-error-50" : "border-stone-400 bg-white"
          )}
        >
          {f.error ? (
            <AlertCircle className="size-4 shrink-0 text-error-500" />
          ) : (
            <File className="size-4 shrink-0 text-stone-600" />
          )}
          <div className="flex-1 min-w-0">
            <p className={cn("font-medium truncate", f.error ? "text-error-700" : "text-foreground")}>
              {f.file.name}
            </p>
            <p className={cn("text-xs", f.error ? "text-error-500" : "text-stone-600")}>
              {f.error || formatFileSize(f.file.size)}
            </p>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(f.id)}
              className="rounded-sm p-1 hover:bg-stone-100 transition-colors shrink-0"
            >
              <X className="size-4 text-stone-600" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

type FileUploadFieldProps = FileUploadProps & {
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
}

function FileUploadField({
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  className,
  ...props
}: FileUploadFieldProps) {
  const generatedId = React.useId()
  const hasError = !!errorText

  return (
    <div data-slot="file-upload-field" className={cn("flex flex-col gap-1", className)}>
      {label && (
        <Label
          htmlFor={generatedId}
          required={required}
          optional={optional}
          disabled={disabled}
          error={hasError}
        >
          {label}
        </Label>
      )}

      <div className={cn(label && "mt-1")}>
        <FileUpload error={hasError} disabled={disabled} {...props} />
      </div>

      {errorText ? (
        <p className="mt-1 text-xs font-medium text-error-500">{errorText}</p>
      ) : hintText ? (
        <p className="mt-1 text-xs font-medium text-stone-700">{hintText}</p>
      ) : null}
    </div>
  )
}

export { FileUpload, FileUploadField }
export type { FileUploadProps, FileUploadFieldProps, FileInfo }
