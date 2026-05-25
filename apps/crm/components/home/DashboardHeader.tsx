"use client";

import { useEffect, useState } from "react";
import { Button } from "@level/ui/components/ui/button";
import { Sliders02 } from "@level/ui/components/icons";

interface DashboardHeaderProps {
  userName: string;
  onCustomizeClick: () => void;
}

function useGreeting(name: string) {
  const [greeting, setGreeting] = useState(`Good morning, ${name}`);

  useEffect(() => {
    const h = new Date().getHours();
    const salutation = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    setGreeting(`${salutation}, ${name}`);
  }, [name]);

  return greeting;
}

export function DashboardHeader({ userName, onCustomizeClick }: DashboardHeaderProps) {
  const greeting = useGreeting(userName);

  return (
    <header className="flex items-center justify-between pb-24">
      <h1 className="text-30 font-bold text-text-primary">{greeting}</h1>
      <Button
        variant="secondary"
        size="sm"
        iconLeft={<Sliders02 size={14} />}
        onClick={onCustomizeClick}
      >
        Customize
      </Button>
    </header>
  );
}
