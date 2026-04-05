"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, PencilLine, Power, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MenuItemFields } from "@/components/menu/menu-item-fields";
import { Button } from "@/components/ui/button";

function createFormState(item) {
  return {
    name: item.name,
    description: item.description,
    price: String(item.price),
    category: item.category,
    image_url: item.image_url,
    rating: String(item.rating),
    is_available: item.is_available
  };
}

export function AdminDishControls({ item }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [formState, setFormState] = useState(createFormState(item));

  useEffect(() => {
    setFormState(createFormState(item));
  }, [item]);

  function updateField(key, value) {
    setFormState((current) => ({
      ...current,
      [key]: value
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setPendingAction("save");

    const response = await fetch(`/api/menu/${item.id}`, {
      method: "PATCH",
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
      toast.error(payload.error || "Unable to update this dish.");
      setPendingAction("");
      return;
    }

    toast.success(payload.message || "Dish updated.");
    setIsEditing(false);
    setPendingAction("");
    router.refresh();
  }

  async function handleAvailabilityToggle() {
    setPendingAction("availability");

    const response = await fetch(`/api/menu/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        is_available: !item.is_available
      })
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error || "Unable to change dish availability.");
      setPendingAction("");
      return;
    }

    toast.success(
      !item.is_available ? "Dish marked as available." : "Dish marked as unavailable."
    );
    setPendingAction("");
    router.refresh();
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${item.name}" from the menu?`);

    if (!confirmed) {
      return;
    }

    setPendingAction("delete");

    const response = await fetch(`/api/menu/${item.id}`, {
      method: "DELETE"
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error || "Unable to delete this dish.");
      setPendingAction("");
      return;
    }

    toast.success(payload.message || "Dish deleted.");
    setPendingAction("");
    router.refresh();
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-3">
      <div className="grid gap-2 sm:grid-cols-3">
        <Button
          className="justify-center rounded-2xl"
          disabled={pendingAction.length > 0}
          onClick={() => setIsEditing((current) => !current)}
          size="sm"
          variant="ghost"
        >
          <PencilLine className="h-4 w-4" />
          {isEditing ? "Close editor" : "Edit"}
        </Button>
        <Button
          className="justify-center rounded-2xl"
          disabled={pendingAction.length > 0}
          onClick={handleAvailabilityToggle}
          size="sm"
          variant="secondary"
        >
          {pendingAction === "availability" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Power className="h-4 w-4" />
          )}
          {item.is_available ? "Mark unavailable" : "Mark available"}
        </Button>
        <Button
          className="justify-center rounded-2xl"
          disabled={pendingAction.length > 0}
          onClick={handleDelete}
          size="sm"
          variant="danger"
        >
          {pendingAction === "delete" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          Delete
        </Button>
      </div>

      {isEditing ? (
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
          <MenuItemFields
            formState={formState}
            idPrefix={`edit-${item.id}`}
            updateField={updateField}
          />
          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
            <Button disabled={pendingAction.length > 0} size="sm" type="submit">
              {pendingAction === "save" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
            <Button
              disabled={pendingAction.length > 0}
              onClick={() => {
                setFormState(createFormState(item));
                setIsEditing(false);
              }}
              size="sm"
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
