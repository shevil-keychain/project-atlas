"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------------------*/

export type BreadcrumbSeparatorKind = "/"

export interface BreadcrumbContextValue {
  separator: BreadcrumbSeparatorKind
}

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: BreadcrumbSeparatorKind
}

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"span"> {
  href?: string
}

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"span">

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">

export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span">

/* -------------------------------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  separator: "/",
})

function useBreadcrumb() {
  return React.useContext(BreadcrumbContext)
}

/* -------------------------------------------------------------------------------------------------
 * Root
 * -------------------------------------------------------------------------------------------------*/

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: BreadcrumbSeparatorKind
  }
>(({ className, separator = "/", children, ...props }, ref) => (
  <nav
    ref={ref as React.Ref<HTMLElement>}
    data-slot="breadcrumb"
    aria-label="Breadcrumb"
    className={cn(className)}
    {...props}
  >
    <BreadcrumbContext.Provider value={{ separator }}>
      {children}
    </BreadcrumbContext.Provider>
  </nav>
))
Breadcrumb.displayName = "Breadcrumb"

/* -------------------------------------------------------------------------------------------------
 * List
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, separator, children, ...props }, ref) => {
    const ctx = useBreadcrumb()
    const value = separator ?? ctx.separator
    return (
      <BreadcrumbContext.Provider value={{ separator: value }}>
        <ol
          ref={ref}
          data-slot="breadcrumb-list"
          className={cn("flex items-center gap-2", className)}
          {...props}
        >
          {children}
        </ol>
      </BreadcrumbContext.Provider>
    )
  },
)
BreadcrumbList.displayName = "BreadcrumbList"

/* -------------------------------------------------------------------------------------------------
 * Item (link segment)
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbItem = React.forwardRef<
  HTMLSpanElement | HTMLAnchorElement,
  BreadcrumbItemProps
>(({ className, href, children, ...rest }, ref) => {
  const itemClasses =
    "text-xs font-medium text-stone-800 px-2 py-1 rounded-md hover:bg-stone-100 cursor-pointer"
  if (href != null) {
    return (
      <li data-slot="breadcrumb-item">
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(itemClasses, className)}
          {...(rest as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
        >
          {children}
        </Link>
      </li>
    )
  }
  return (
    <li data-slot="breadcrumb-item">
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(itemClasses, className)}
        {...rest}
      >
        {children}
      </span>
    </li>
  )
})
BreadcrumbItem.displayName = "BreadcrumbItem"

/* -------------------------------------------------------------------------------------------------
 * Separator
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <li data-slot="breadcrumb-separator" aria-hidden>
      <span
        ref={ref}
        role="presentation"
        data-slot="breadcrumb-separator"
        className={cn("text-stone-600 text-xs", className)}
        {...props}
      >
        /
      </span>
    </li>
  )
})
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/* -------------------------------------------------------------------------------------------------
 * Page (current, not clickable)
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => (
    <li data-slot="breadcrumb-page">
      <span
        ref={ref}
        data-slot="breadcrumb-page"
        aria-current="page"
        className={cn(
          "text-foreground font-semibold text-xs px-2 py-1",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    </li>
  ),
)
BreadcrumbPage.displayName = "BreadcrumbPage"

/* -------------------------------------------------------------------------------------------------
 * Ellipsis
 * -------------------------------------------------------------------------------------------------*/

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <li data-slot="breadcrumb-ellipsis" aria-hidden>
    <span
      ref={ref}
      role="presentation"
      data-slot="breadcrumb-ellipsis"
      className={cn("text-stone-600 text-xs", className)}
      {...props}
    >
      …
    </span>
  </li>
))
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------------------------------*/

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
}
