"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./page-header";
import { TableControls } from "./table-controls";
import { DataTable } from "./data-table";
import { Pagination } from "./pagination";
import { BulkActionBar } from "./bulk-action-bar";
import { ComposeEmailModal } from "@/components/company-detail/compose-email-modal";
import { FilterChips } from "./filters/filter-chips";
import { ViewActions } from "./filters/view-actions";
import { applyFilters } from "./filters/apply-filters";
import {
  filtersEqual,
  loadViews,
  makeId,
  saveViews,
  seedViewsFromSchema,
  viewsStorageKey,
} from "./filters/views";
import type { Filter, View } from "./filters/types";
import type { TableSchema } from "./types";

const PAGE_SIZE = 15;

type Props = {
  // The shell intentionally accepts schemas from several row shapes.
  // It only needs column keys at runtime after each page casts rows to records.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: TableSchema<any>;
  data: Record<string, unknown>[];
  selectable?: boolean;
};

export function TableShell({ schema, data, selectable = false }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [composeOpen, setComposeOpen] = useState(false);

  const selectedNames = useMemo(
    () =>
      data
        .filter((r) => typeof r.id === "string" && selectedIds.has(r.id as string))
        .map((r) => (typeof r.name === "string" ? r.name : String(r.id))),
    [data, selectedIds],
  );

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll(ids: string[], checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) ids.forEach((id) => next.add(id));
      else ids.forEach((id) => next.delete(id));
      return next;
    });
  }

  const seedViews = useMemo(() => seedViewsFromSchema(schema), [schema]);
  const storageKey = viewsStorageKey(schema.title);

  const [views, setViews] = useState<View[]>(seedViews);
  const [activeViewId, setActiveViewId] = useState<string>(seedViews[0]?.id ?? "");
  const [draftFilters, setDraftFilters] = useState<Filter[]>(seedViews[0]?.filters ?? []);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadViews(storageKey, seedViews);
    setViews(loaded);
    const first = loaded[0];
    if (first) {
      setActiveViewId(first.id);
      setDraftFilters(first.filters);
    }
    setHydrated(true);
  }, [storageKey, seedViews]);

  useEffect(() => {
    if (!hydrated) return;
    saveViews(storageKey, views);
  }, [views, storageKey, hydrated]);

  const activeView = views.find((v) => v.id === activeViewId) ?? views[0];
  const isDirty = activeView ? !filtersEqual(draftFilters, activeView.filters) : false;

  function selectView(id: string) {
    const next = views.find((v) => v.id === id);
    if (!next) return;
    setActiveViewId(id);
    setDraftFilters(next.filters);
    setPage(1);
  }

  function resetCurrent() {
    if (!activeView) return;
    setDraftFilters(activeView.filters);
    setPage(1);
  }

  function saveAsNewView(label: string) {
    const view: View = { id: makeId(), label, filters: draftFilters, isSeed: false };
    setViews((prev) => [...prev, view]);
    setActiveViewId(view.id);
    setPage(1);
  }

  const afterFilters = useMemo(
    () => applyFilters(data, draftFilters, schema.columns),
    [data, draftFilters, schema.columns]
  );

  const afterSearch = useMemo(() => {
    if (!search.trim()) return afterFilters;

    const query = search.toLowerCase();
    return afterFilters.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [afterFilters, search]);

  const totalPages = Math.max(1, Math.ceil(afterSearch.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = afterSearch.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-20 bg-surface-page">
        <PageHeader
          title={schema.title}
          addLabel={schema.addLabel}
          views={views}
          activeViewId={activeViewId}
          isDirty={isDirty}
          showImportExport={schema.title !== "Discover"}
          onSelectView={selectView}
        />
        <div className="flex flex-col gap-24 px-24 pt-24 pb-16 bg-surface-page">
          <TableControls
            searchPlaceholder={`Search ${schema.title.toLowerCase()}`}
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            columns={schema.columns}
            filters={draftFilters}
            onAddFilter={(filter) => {
              setDraftFilters((prev) => [...prev, filter]);
              setPage(1);
            }}
          />
          {(draftFilters.length > 0 || isDirty) && (
            <div className="flex items-center justify-between gap-16 flex-wrap">
              <FilterChips
                filters={draftFilters}
                columns={schema.columns}
                onRemove={(id) => {
                  setDraftFilters((prev) => prev.filter((f) => f.id !== id));
                  setPage(1);
                }}
                onClearAll={() => {
                  setDraftFilters([]);
                  setPage(1);
                }}
              />
              {isDirty && (
                <ViewActions
                  onReset={resetCurrent}
                  onSaveAsNew={saveAsNewView}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-24 pb-24 flex-1">
        <div className="bg-surface-card border border-border-strong rounded-lg shadow-sm overflow-hidden w-full">
          <DataTable
            columns={schema.columns}
            rows={pageRows}
            defaultSort={schema.defaultSort}
            selectable={selectable}
            selectedIds={selectedIds}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
          />
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
      {selectable && (
        <BulkActionBar
          count={selectedIds.size}
          onClear={() => setSelectedIds(new Set())}
          onSendEmail={() => setComposeOpen(true)}
        />
      )}
      <ComposeEmailModal
        open={composeOpen}
        onOpenChange={setComposeOpen}
        recipients={selectedNames}
        bulk
      />
    </div>
  );
}
