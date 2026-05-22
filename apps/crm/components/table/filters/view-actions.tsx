"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@level/ui/components/ui/modal";
import { Button } from "@level/ui/components/ui/button";
import { Input } from "@level/ui/components/ui/input";

type Props = {
  onReset: () => void;
  onSaveAsNew: (name: string) => void;
};

export function ViewActions({ onReset, onSaveAsNew }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function commit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSaveAsNew(trimmed);
    setName("");
    setOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-8">
        <Button size="sm" onClick={() => setOpen(true)}>
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setName("");
        }}
      >
        <DialogContent size="sm">
          <DialogHeader description="Save the current filters as a new view.">
            Save view
          </DialogHeader>
          <DialogBody>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="View name"
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
              }}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setOpen(false);
                setName("");
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={commit} disabled={!name.trim()}>
              Save view
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
