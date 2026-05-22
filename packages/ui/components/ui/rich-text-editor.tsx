"use client"

import * as React from "react"
import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { Label } from "./label"

type RichTextEditorProps = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  label?: string
  hintText?: string
  errorText?: string
  required?: boolean
  optional?: boolean
  disabled?: boolean
  className?: string
}

function RichTextEditor({
  value,
  onChange,
  placeholder,
  label,
  hintText,
  errorText,
  required,
  optional,
  disabled,
  className,
}: RichTextEditorProps) {
  const id = React.useId()
  const hasError = !!errorText

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
    ],
    content: value || "",
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  React.useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled)
    }
  }, [disabled, editor])

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isStrike: editor?.isActive("strike") ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
      canUndo: editor?.can().undo() ?? false,
      canRedo: editor?.can().redo() ?? false,
    }),
  })

  const formattingState = editorState ?? {
    isBold: false,
    isItalic: false,
    isStrike: false,
    isBulletList: false,
    isOrderedList: false,
    canUndo: false,
    canRedo: false,
  }

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => editor?.chain().focus().toggleBold().run(),
      active: formattingState.isBold,
      label: "Bold",
    },
    {
      icon: Italic,
      action: () => editor?.chain().focus().toggleItalic().run(),
      active: formattingState.isItalic,
      label: "Italic",
    },
    {
      icon: Strikethrough,
      action: () => editor?.chain().focus().toggleStrike().run(),
      active: formattingState.isStrike,
      label: "Strikethrough",
    },
  ]

  const listButtons = [
    {
      icon: List,
      action: () => editor?.chain().focus().toggleBulletList().run(),
      active: formattingState.isBulletList,
      label: "Bullet list",
    },
    {
      icon: ListOrdered,
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      active: formattingState.isOrderedList,
      label: "Ordered list",
    },
  ]

  const historyButtons = [
    {
      icon: Undo,
      action: () => editor?.chain().focus().undo().run(),
      active: false,
      canExecute: formattingState.canUndo,
      label: "Undo",
    },
    {
      icon: Redo,
      action: () => editor?.chain().focus().redo().run(),
      active: false,
      canExecute: formattingState.canRedo,
      label: "Redo",
    },
  ]

  function ToolbarButton({
    icon: Icon,
    action,
    active,
    canExecute = true,
    label: ariaLabel,
  }: {
    icon: React.ComponentType<{ className?: string }>
    action: () => void
    active: boolean
    canExecute?: boolean
    label: string
  }) {
    const isDisabled = disabled || !editor || !canExecute
    return (
      <button
        type="button"
        onClick={action}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-pressed={active}
        className={cn(
          "size-32 rounded-md flex items-center justify-center transition-colors",
          isDisabled
            ? "text-stone-400 cursor-not-allowed"
            : active
              ? "bg-stone-200 text-black"
              : "text-black hover:bg-stone-200"
        )}
      >
        <Icon className="size-16" />
      </button>
    )
  }

  return (
    <div
      data-slot="rich-text-editor"
      className={cn("flex flex-col gap-4", className)}
    >
      {label && (
        <Label
          htmlFor={id}
          required={required}
          optional={optional}
          disabled={disabled}
          error={hasError}
        >
          {label}
        </Label>
      )}

      <div
        id={id}
        className={cn(
          label && "mt-4",
          "rounded-lg overflow-hidden border transition-all",
          disabled
            ? "bg-stone-200 border-stone-500"
            : hasError
              ? "border-error-500 focus-within:border-error-500 focus-within:shadow-[0px_0px_0px_4px_var(--color-error-100)]"
              : "border-stone-500 hover:border-stone-600 focus-within:border-primary-brand-500 focus-within:shadow-[0px_0px_0px_4px_var(--color-primary-brand-200)]"
        )}
      >
        <div className="flex gap-4 px-8 py-6 border-b border-stone-300 bg-white">
          {toolbarButtons.map((btn) => (
            <ToolbarButton key={btn.label} {...btn} />
          ))}
          <div className="w-px h-20 bg-stone-300 mx-4 self-center" />
          {listButtons.map((btn) => (
            <ToolbarButton key={btn.label} {...btn} />
          ))}
          <div className="w-px h-20 bg-stone-300 mx-4 self-center" />
          {historyButtons.map((btn) => (
            <ToolbarButton key={btn.label} {...btn} />
          ))}
        </div>

        <EditorContent
          editor={editor}
          className={cn(
            "px-12 py-8 min-h-[120px] text-14 font-medium text-foreground",
            "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px]",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-stone-600 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
            "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-24",
            "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-24",
            "[&_.ProseMirror_li]:my-4",
            "[&_.ProseMirror_strong]:font-bold",
            "[&_.ProseMirror_em]:italic",
            "[&_.ProseMirror_s]:line-through"
          )}
        />
      </div>

      {errorText ? (
        <p className="mt-4 text-12 font-medium text-error-500">{errorText}</p>
      ) : hintText ? (
        <p className="mt-4 text-12 font-medium text-stone-700">{hintText}</p>
      ) : null}
    </div>
  )
}

export { RichTextEditor }
export type { RichTextEditorProps }
