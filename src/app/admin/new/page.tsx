"use client";

import { useState } from "react";

export default function NewOrderPage() {
  // Synchronized exactly with database columns
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    discord_username: "",

    service_type: "Complete Switch Mod",
    current_status: "Order Received",

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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      alert(result.error || "Failed to create order.");
      return;
    }

    alert("Order created successfully!");

    console.log(result.order);

    // Later we'll redirect here
    // router.push(`/admin/orders/${result.order.order_number}`);
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="text-4xl font-bold mb-8">Create New Order</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Customer Information */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Customer Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Customer Name</label>
                <input
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Discord Username</label>
                <input
                  name="discord_username"
                  value={form.discord_username}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Phone / WhatsApp</label>
                <input
                  name="customer_phone"
                  value={form.customer_phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Service & Status */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Service & Status Information</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Service Type</label>
                <select
                  name="service_type"
                  value={form.service_type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Complete Switch Mod">Complete Switch Mod</option>
                  <option value="Switch Lubing">Switch Lubing</option>
                  <option value="Stabilizer Tuning">Stabilizer Tuning</option>
                  <option value="Build Service">Build Service</option>
                  <option value="Repair">Repair</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Current Status</label>
                <select
                  name="current_status"
                  value={form.current_status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Order Received">Order Received</option>
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Payment Pending">Payment Pending</option>
                  <option value="Payment Received">Payment Received</option>
                  <option value="Parts Booked">Parts Booked</option>
                  <option value="Parts Shipped">Parts Shipped</option>
                  <option value="Parts Received">Parts Received</option>
                  <option value="In Queue">In Queue</option>
                  <option value="Work Started">Work Started</option>
                  <option value="Testing">Testing</option>
                  <option value="Completed">Completed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipment Booked">Shipment Booked</option>
                  <option value="Shipment Picked Up">Shipment Picked Up</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Warranty Active">Warranty Active</option>
                  <option value="Warranty Closed">Warranty Closed</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Estimated Total</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-zinc-400 select-none">₹</span>
                  <input
                    type="number"
                    name="estimated_total"
                    value={form.estimated_total}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 pl-9 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm text-zinc-400">Order Summary</label>
              <textarea
                name="order_summary"
                value={form.order_summary}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </section>

          {/* Keyboard */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Keyboard Information</h2>
            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Keyboard / PCB Model</label>
                <input
                  name="keyboard_pcb_model"
                  value={form.keyboard_pcb_model}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Switch Details</label>
                <textarea
                  name="switch_details"
                  value={form.switch_details}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Shipping Address</h2>
            <div className="grid gap-4">
              <input
                name="street_address"
                value={form.street_address}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Logistics Details */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Logistics Details (Optional)</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Courier Partner</label>
                <input
                  name="courier"
                  value={form.courier}
                  onChange={handleChange}
                  placeholder="e.g., Delhivery, Bluedart"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Tracking Number</label>
                <input
                  name="tracking_number"
                  value={form.tracking_number}
                  onChange={handleChange}
                  placeholder="Tracking ID"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Estimated Delivery</label>
                <input
                  type="date"
                  name="estimated_delivery"
                  value={form.estimated_delivery}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Additional Notes</h2>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </section>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              Create Order
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}