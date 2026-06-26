"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUSES, SERVICE_TYPES } from "@/constants/order-statuses";

const INITIAL_FORM = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  discord_username: "",
  service_type: SERVICE_TYPES[0],
  current_status: ORDER_STATUSES[0],
  order_summary: "",
  estimated_total: "",
  keyboard_pcb_model: "",
  switch_details: "",
  street_address: "",
  city: "",
  state: "",
  pincode: "",
  courier: "",
  tracking_number: "",
  estimated_delivery: "",
  notes: "",
};

export default function NewOrderPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to create order.");
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.error("[NewOrderPage]", err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-4xl font-bold mb-8 font-mono tracking-tight">
          Create New Order<span className="text-[#d4f700]">.</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Customer Information */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Customer Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Customer Name">
                <input
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Discord Username">
                <input
                  name="discord_username"
                  value={form.discord_username}
                  onChange={handleChange}
                  placeholder="@username"
                  className={inputClass}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  name="customer_phone"
                  value={form.customer_phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Service & Status */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Service & Status
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Service Type">
                <select
                  name="service_type"
                  value={form.service_type}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Current Status">
                <select
                  name="current_status"
                  value={form.current_status}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Estimated Total">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-400 select-none">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="estimated_total"
                    value={form.estimated_total}
                    onChange={handleChange}
                    placeholder="0"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Order Summary">
                <textarea
                  name="order_summary"
                  value={form.order_summary}
                  onChange={handleChange}
                  rows={4}
                  className={textareaClass}
                />
              </Field>
            </div>
          </section>

          {/* Keyboard */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Keyboard Information
            </h2>
            <div className="space-y-4">
              <Field label="Keyboard / PCB Model">
                <input
                  name="keyboard_pcb_model"
                  value={form.keyboard_pcb_model}
                  onChange={handleChange}
                  placeholder="e.g. Mode Sonnet, Tiger80 Lite"
                  className={inputClass}
                />
              </Field>
              <Field label="Switch & Build Details">
                <textarea
                  name="switch_details"
                  value={form.switch_details}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Switches, spring weights, lubricant used..."
                  className={textareaClass}
                />
              </Field>
            </div>
          </section>

          {/* Shipping */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <input
                name="street_address"
                value={form.street_address}
                onChange={handleChange}
                placeholder="Street Address"
                className={inputClass}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                />
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={inputClass}
                />
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>
          </section>

          {/* Logistics */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Logistics{" "}
              <span className="text-zinc-500 font-normal text-sm">
                (optional)
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Courier Partner">
                <input
                  name="courier"
                  value={form.courier}
                  onChange={handleChange}
                  placeholder="e.g. Delhivery, Bluedart"
                  className={inputClass}
                />
              </Field>
              <Field label="Tracking Number">
                <input
                  name="tracking_number"
                  value={form.tracking_number}
                  onChange={handleChange}
                  placeholder="AWB Number"
                  className={`${inputClass} font-mono`}
                />
              </Field>
              <Field label="Estimated Delivery">
                <input
                  type="date"
                  name="estimated_delivery"
                  value={form.estimated_delivery}
                  onChange={handleChange}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </Field>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold text-zinc-200">
              Internal Notes
            </h2>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              placeholder="Private build notes, reminders..."
              className={textareaClass}
            />
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="rounded-lg border border-zinc-700 px-6 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#d4f700] text-black px-6 py-3 font-bold transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-[#d4f700]/60 transition";

const selectClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-[#d4f700]/60 transition appearance-none";

const textareaClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-[#d4f700]/60 transition resize-none";