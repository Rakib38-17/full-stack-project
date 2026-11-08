"use client";

import { useState } from "react";
import { PackagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "Luxury",
  "Honeymoon",
  "Mountain",
  "Family",
];

const emptyForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputClasses =
  "h-10 rounded-md border-transparent bg-[#f7f9fb] text-sm placeholder:text-zinc-400";

export default function AddDestinationPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function setField<K extends keyof typeof emptyForm>(
    field: K,
    value: string,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  function resetForm() {
    setForm(emptyForm);
    setStatus("idle");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.country.trim() || !form.price) {
      setStatus("error");
      return;
    }

    const stored = localStorage.getItem("packages");
    const packages: unknown[] = stored ? JSON.parse(stored) : [];
    packages.push({
      id: Date.now(),
      name: form.name.trim(),
      country: form.country.trim(),
      category: form.category,
      price: Number(form.price),
      duration: form.duration.trim(),
      departureDate: form.departureDate,
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim(),
    });
    localStorage.setItem("packages", JSON.stringify(packages));

    setStatus("success");
    setForm(emptyForm);

    const res = await fetch('http://localhost:5000/add-destination',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const data = await res.json();
    console.log(data);

   
  }

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <h1 className="text-4xl font-normal text-zinc-900">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 w-full max-w-md border border-zinc-200 bg-white p-7 shadow-sm"
      >
        {status === "success" && (
          <p className="mb-5 bg-green-50 px-3 py-2 text-sm text-green-700">
            Travel package added successfully.
          </p>
        )}
        {status === "error" && (
          <p className="mb-5 bg-red-50 px-3 py-2 text-sm text-destructive">
            Destination name, country and price are required.
          </p>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] font-semibold text-zinc-900"
            >
              Destination Name
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              placeholder="Bali Paradise"
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="mb-2 block text-[13px] font-semibold text-zinc-900"
              >
                Country
              </label>
              <Input
                id="country"
                value={form.country}
                onChange={(event) => setField("country", event.target.value)}
                placeholder="Indonesia"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-[13px] font-semibold text-zinc-900"
              >
                Category
              </label>
              <Select
                value={form.category || null}
                onValueChange={(value) => setField("category", value ?? "")}
              >
                <SelectTrigger
                  id="category"
                  className={`w-full justify-between rounded-md border-transparent bg-[#f7f9fb] text-sm ${form.category ? "" : "text-zinc-400"}`}
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-[13px] font-semibold text-zinc-900"
              >
                Price (USD)
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => setField("price", event.target.value)}
                placeholder="e.g., 1299"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="mb-2 block text-[13px] font-semibold text-zinc-900"
              >
                Duration
              </label>
              <Input
                id="duration"
                value={form.duration}
                onChange={(event) => setField("duration", event.target.value)}
                placeholder="e.g., 7 Days/6 Nights"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="departureDate"
              className="mb-2 block text-[13px] font-semibold text-zinc-900"
            >
              Departure Date
            </label>
            <Input
              id="departureDate"
              type="date"
              value={form.departureDate}
              onChange={(event) => setField("departureDate", event.target.value)}
              className={`${inputClasses} text-zinc-400`}
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-[13px] font-semibold text-zinc-900"
            >
              Image URL
            </label>
            <Input
              id="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={(event) => setField("imageUrl", event.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-[13px] font-semibold text-zinc-900"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="Describe the travel experience..."
              className="min-h-32 rounded-md border-transparent bg-[#f7f9fb] px-3 py-2.5 text-sm placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className="h-10 rounded-md border-red-300 px-4 text-red-600 hover:bg-red-50 hover:text-red-600"
          >
            <Trash />
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-10 rounded-md bg-brand px-4 text-white hover:bg-brand/90"
          >
            <PackagePlus />
            Add Travel Package
          </Button>
        </div>
      </form>
    </div>
  );
}
