"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { categories } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  category: "Starters",
  image_url: "",
  rating: "4.8"
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
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="dish-name">
              Dish name
            </label>
            <Input
              id="dish-name"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Smoked lamb ragu"
              required
              value={formState.name}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="dish-image">
              Image URL
            </label>
            <Input
              id="dish-image"
              onChange={(event) => updateField("image_url", event.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
              type="url"
              value={formState.image_url}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/70" htmlFor="dish-description">
              Description
            </label>
            <textarea
              className="min-h-28 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-accent-gold/50 focus:bg-white/8"
              id="dish-description"
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="House-made pasta, slow-braised lamb shoulder, confit tomato..."
              required
              value={formState.description}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="dish-price">
              Price
            </label>
            <Input
              id="dish-price"
              min="1"
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="28"
              required
              step="0.01"
              type="number"
              value={formState.price}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="dish-rating">
              Rating
            </label>
            <Input
              id="dish-rating"
              max="5"
              min="1"
              onChange={(event) => updateField("rating", event.target.value)}
              required
              step="0.1"
              type="number"
              value={formState.rating}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/70" htmlFor="dish-category">
              Category
            </label>
            <select
              className="h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-accent-gold/50 focus:bg-white/8"
              id="dish-category"
              onChange={(event) => updateField("category", event.target.value)}
              value={formState.category}
            >
              {categories.filter((item) => item !== "All").map((category) => (
                <option className="bg-base-900 text-white" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

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

