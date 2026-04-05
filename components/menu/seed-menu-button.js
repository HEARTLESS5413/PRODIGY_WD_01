"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SeedMenuButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSeed() {
    setIsPending(true);

    const response = await fetch("/api/menu/bootstrap", {
      method: "POST"
    });
    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error || "Unable to load the starter menu.");
      setIsPending(false);
      return;
    }

    toast.success(payload.message || "Sample menu loaded.");
    router.refresh();
    setIsPending(false);
  }

  return (
    <Button disabled={isPending} onClick={handleSeed}>
      {isPending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading menu...
        </>
      ) : (
        "Load chef-curated sample menu"
      )}
    </Button>
  );
}

