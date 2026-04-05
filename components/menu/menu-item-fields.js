import { categories } from "@/lib/constants";
import { Input } from "@/components/ui/input";

export function MenuItemFields({
  formState,
  updateField,
  includeAvailability = true,
  idPrefix = "dish"
}) {
  const fieldId = (suffix) => `${idPrefix}-${suffix}`;

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm text-white/70" htmlFor={fieldId("name")}>
          Dish name
        </label>
        <Input
          id={fieldId("name")}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Smoked lamb ragu"
          required
          value={formState.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/70" htmlFor={fieldId("image")}>
          Image URL
        </label>
        <Input
          id={fieldId("image")}
          onChange={(event) => updateField("image_url", event.target.value)}
          placeholder="https://images.unsplash.com/..."
          required
          type="url"
          value={formState.image_url}
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm text-white/70" htmlFor={fieldId("description")}>
          Description
        </label>
        <textarea
          className="min-h-28 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-accent-gold/50 focus:bg-white/8"
          id={fieldId("description")}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="House-made pasta, slow-braised lamb shoulder, confit tomato..."
          required
          value={formState.description}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/70" htmlFor={fieldId("price")}>
          Price
        </label>
        <Input
          id={fieldId("price")}
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
        <label className="text-sm text-white/70" htmlFor={fieldId("rating")}>
          Rating
        </label>
        <Input
          id={fieldId("rating")}
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
        <label className="text-sm text-white/70" htmlFor={fieldId("category")}>
          Category
        </label>
        <select
          className="h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-accent-gold/50 focus:bg-white/8"
          id={fieldId("category")}
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

      {includeAvailability ? (
        <label className="md:col-span-2 flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4">
          <div>
            <p className="text-sm font-medium text-white">Availability</p>
            <p className="mt-1 text-xs text-white/55">
              Turn this off when the dish is temporarily unavailable.
            </p>
          </div>
          <button
            aria-label="Toggle dish availability"
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
              formState.is_available ? "bg-accent-mint/70" : "bg-white/15"
            }`}
            onClick={() => updateField("is_available", !formState.is_available)}
            type="button"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white transition ${
                formState.is_available ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
        </label>
      ) : null}
    </>
  );
}
