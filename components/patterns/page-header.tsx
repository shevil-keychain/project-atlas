"use client"

import * as React from "react"
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * PageHeader (root container)
 * -------------------------------------------------------------------------------------------------*/

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<"header"> {
  withBorder?: boolean
  variant?: "default" | "subtle"
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, withBorder = true, variant = "default", children, ...props }, ref) => (
    <header
      ref={ref as React.Ref<HTMLElement>}
      data-slot="page-header"
      className={cn(
        "flex w-full flex-col gap-2 px-6 py-4",
        variant === "default" ? "bg-white" : "bg-stone-100",
        withBorder && "border-b border-stone-300",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
)
PageHeader.displayName = "PageHeader"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderRow — horizontal container for left/right alignment
 * -------------------------------------------------------------------------------------------------*/

const PageHeaderRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-header-row"
    className={cn("flex items-center justify-between gap-4", className)}
    {...props}
  />
))
PageHeaderRow.displayName = "PageHeaderRow"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderBackButton — bordered icon button with chevron-left
 * -------------------------------------------------------------------------------------------------*/

export interface PageHeaderBackButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {}

const PageHeaderBackButton = React.forwardRef<
  HTMLButtonElement,
  PageHeaderBackButtonProps
>(({ className, onClick, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    data-slot="page-header-back"
    className={cn(
      "flex size-10 shrink-0 items-center justify-center rounded-lg border border-stone-500 bg-white transition-colors hover:border-stone-600 hover:bg-stone-100",
      className
    )}
    onClick={onClick}
    aria-label="Go back"
    {...props}
  >
    {children ?? <ChevronLeft className="size-5 text-stone-700" />}
  </button>
))
PageHeaderBackButton.displayName = "PageHeaderBackButton"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderBreadcrumb — wrapper slot for Breadcrumb component
 * -------------------------------------------------------------------------------------------------*/

const PageHeaderBreadcrumb = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-header-breadcrumb"
    className={cn(className)}
    {...props}
  >
    {children}
  </div>
))
PageHeaderBreadcrumb.displayName = "PageHeaderBreadcrumb"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderTitle — heading with size variants
 * -------------------------------------------------------------------------------------------------*/

export interface PageHeaderTitleProps
  extends React.ComponentPropsWithoutRef<"h1"> {
  size?: "xl" | "2xl"
}

const PageHeaderTitle = React.forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ className, size = "xl", ...props }, ref) => (
    <h1
      ref={ref}
      data-slot="page-header-title"
      className={cn(
        "font-bold text-foreground tracking-tight",
        size === "2xl" ? "text-2xl tracking-[-0.4px]" : "text-xl tracking-[-0.2px]",
        className
      )}
      {...props}
    />
  )
)
PageHeaderTitle.displayName = "PageHeaderTitle"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderDescription — subtitle / subheading
 * -------------------------------------------------------------------------------------------------*/

const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="page-header-description"
    className={cn("text-sm font-medium text-stone-700", className)}
    {...props}
  />
))
PageHeaderDescription.displayName = "PageHeaderDescription"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderMeta — metadata row with auto pipe separators between children
 * -------------------------------------------------------------------------------------------------*/

export interface PageHeaderMetaProps extends React.ComponentPropsWithoutRef<"div"> {
  separator?: boolean
}

const PageHeaderMeta = React.forwardRef<HTMLDivElement, PageHeaderMetaProps>(
  ({ className, separator = true, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(Boolean)

    return (
      <div
        ref={ref}
        data-slot="page-header-meta"
        className={cn(
          "flex flex-wrap items-center gap-2 text-xs font-medium text-foreground",
          className
        )}
        {...props}
      >
        {separator
          ? items.map((child, i) => (
              <React.Fragment key={i}>
                {child}
                {i < items.length - 1 && (
                  <span
                    data-slot="page-header-meta-separator"
                    className="h-3 w-px shrink-0 bg-stone-800"
                    aria-hidden
                  />
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    )
  }
)
PageHeaderMeta.displayName = "PageHeaderMeta"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderActions — right-aligned actions container
 * -------------------------------------------------------------------------------------------------*/

const PageHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-header-actions"
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
PageHeaderActions.displayName = "PageHeaderActions"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderNav — Prev/Next navigation with brand-colored text buttons
 * -------------------------------------------------------------------------------------------------*/

export interface PageHeaderNavProps extends React.ComponentPropsWithoutRef<"div"> {
  onPrev?: () => void
  onNext?: () => void
  prevLabel?: string
  nextLabel?: string
}

const PageHeaderNav = React.forwardRef<HTMLDivElement, PageHeaderNavProps>(
  (
    {
      className,
      onPrev,
      onNext,
      prevLabel = "Prev",
      nextLabel = "Next",
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="page-header-nav"
      className={cn(
        "flex items-center gap-3 text-xs font-semibold text-primary-brand-700",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {onPrev && (
            <button
              type="button"
              className="flex items-center gap-1 transition-colors hover:text-primary-brand-500"
              onClick={onPrev}
            >
              <ArrowLeft className="size-4" />
              {prevLabel}
            </button>
          )}
          {onNext && (
            <button
              type="button"
              className="flex items-center gap-1 transition-colors hover:text-primary-brand-500"
              onClick={onNext}
            >
              {nextLabel}
              <ArrowRight className="size-4" />
            </button>
          )}
        </>
      )}
    </div>
  )
)
PageHeaderNav.displayName = "PageHeaderNav"

/* -------------------------------------------------------------------------------------------------
 * PageHeaderStatus — slot for Badge components
 * -------------------------------------------------------------------------------------------------*/

const PageHeaderStatus = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="page-header-status"
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
))
PageHeaderStatus.displayName = "PageHeaderStatus"

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
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
}
