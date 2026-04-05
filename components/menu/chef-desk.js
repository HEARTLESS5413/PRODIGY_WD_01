"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { MenuItemFields } from "@/components/menu/menu-item-fields";
import { Button } from "@/components/ui/button";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  category: "Starters",
  image_url: "",
  rating: "4.8",
  is_available: true
};

export function ChefDesk() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formState, setFormState] = useState(defaultForm);

  function updateField(key, value) {
    setFormState((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);

    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formState,
        price: Number(formState.price),
        rating: Number(formState.rating)
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error || "Unable to add the new dish.");
      setIsPending(false);
      return;
    }

    toast.success("Dish added to the menu.");
    setFormState(defaultForm);
    setIsOpen(false);
    router.refresh();
    setIsPending(false);
  }

  return (
    <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent-mint">Chef desk</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Add a new signature dish</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">
            Admin-only menu publishing keeps the dining experience fresh without leaving the app.
          </p>
        </div>
        <Button onClick={() => setIsOpen((current) => !current)} variant="secondary">
          <PlusCircle className="h-4 w-4" />
          {isOpen ? "Hide form" : "Add dish"}
        </Button>
      </div>

      {isOpen ? (
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <MenuItemFields formState={formState} idPrefix="create-dish" updateField={updateField} />

          <div className="md:col-span-2">
            <Button disabled={isPending} size="lg" type="submit">
              {isPending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish dish"
              )}
            </Button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
