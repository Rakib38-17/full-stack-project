"use client";

import { useState } from "react";
import { PackagePlus, Pencil, Trash } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Destination } from "@/lib/destination";
import { redirect } from "next/navigation";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "Luxury",
  "Honeymoon",
  "Mountain",
  "Family",
];


const inputClasses =
  "h-10 rounded-md border-transparent bg-[#f7f9fb] text-sm placeholder:text-zinc-400";

const EditDestinationPage = ({ destination }: { destination: Destination }) => {
  const [form, setForm] = useState<Destination>(destination);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function setField<K extends keyof Destination>(field: K, value: Destination[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const resetForm = () => {
    setForm(destination);
    setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {id, ...updatedData} = form;

    if (!form.name.trim() || !form.country.trim() || Number(form.price) <= 0) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/destination/${destination.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });   
      const data = await res.json();
      console.log(data);
      setStatus("success");
      redirect("/destination-detail");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <Dialog >
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-md border-zinc-300 px-3 text-xs text-zinc-700">
          <Pencil className="size-3.5" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl  h-full max-h-[90vh] overflow-y-auto rounded-md border border-zinc-200 bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Destination </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 w-full max-w-md border border-zinc-200 bg-white p-7 shadow-sm">
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
                    className="mb-2 block text-[13px] font-semibold text-zinc-900">
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
                      className="mb-2 block text-[13px] font-semibold text-zinc-900">
                      Country
                    </label>
                    <Input
                      id="country"
                      value={form.country}
                      onChange={(event) =>
                        setField("country", event.target.value)
                      }
                      placeholder="Indonesia"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-[13px] font-semibold text-zinc-900">
                      Category
                    </label>
                    <Select
                      value={form.category || null}
                      onValueChange={(value) =>
                        setField("category", value ?? "")
                      }>
                      <SelectTrigger
                        id="category"
                        className={`w-full justify-between rounded-md border-transparent bg-[#f7f9fb] text-sm ${form.category ? "" : "text-zinc-400"}`}>
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
                      className="mb-2 block text-[13px] font-semibold text-zinc-900">
                      Price (USD)
                    </label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(event) =>
                        setField("price", Number(event.target.value))
                      }
                      placeholder="e.g., 1299"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="duration"
                      className="mb-2 block text-[13px] font-semibold text-zinc-900">
                      Duration
                    </label>
                    <Input
                      id="duration"
                      value={form.duration}
                      onChange={(event) =>
                        setField("duration", event.target.value)
                      }
                      placeholder="e.g., 7 Days/6 Nights"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="departureDate"
                    className="mb-2 block text-[13px] font-semibold text-zinc-900">
                    Departure Date
                  </label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={form.departureDate}
                    onChange={(event) =>
                      setField("departureDate", event.target.value)
                    }
                    className={`${inputClasses} text-zinc-400`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="mb-2 block text-[13px] font-semibold text-zinc-900">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={(event) =>
                      setField("imageUrl", event.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-[13px] font-semibold text-zinc-900">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(event) =>
                      setField("description", event.target.value)
                    }
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
                  className="h-10 rounded-md border-red-300 px-4 text-red-600 hover:bg-red-50 hover:text-red-600">
                  <Trash />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-md bg-brand px-4 text-white hover:bg-brand/90">
                  <PackagePlus />
                  Edit Travel Package
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};


export default EditDestinationPage ;
