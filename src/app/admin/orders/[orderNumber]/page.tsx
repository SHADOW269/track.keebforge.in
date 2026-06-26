"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ORDER_STATUSES, SERVICE_TYPES } from "@/constants/order-statuses";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  discord_username: string;
  service_type: string;
  current_status: string;
  order_summary: string;
  estimated_total: string | number;
  keyboard_pcb_model: string;
  switch_details: string;
  street_address: string;
  city: string;
  state: string;
  pincode: string;
  courier: string;
  tracking_number: string;
  estimated_delivery: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface TimelineItem {
  id: string;
  order_id: string;
  status: string;
  note: string;
  created_at: string;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderNumber = params.orderNumber as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [originalOrder, setOriginalOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newTimelineStatus, setNewTimelineStatus] = useState(ORDER_STATUSES[0]);
  const [newTimelineNote, setNewTimelineNote] = useState("");
  const [insertingTimeline, setInsertingTimeline] = useState(false);

  useEffect(() => {
    if (!orderNumber) return;

    async function fetchOrderData() {
      setLoading(true);
      setGlobalError(null);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber.toUpperCase())
        .single();

      if (orderError || !orderData) {
        setGlobalError("Order not found.");
        setLoading(false);
        return;
      }

      setOrder(orderData as Order);
      setOriginalOrder(orderData as Order);
      setNewTimelineStatus(orderData.current_status);

      const { data: timelineData, error: timelineError } = await supabase
        .from("order_updates")
        .select("*")
        .eq("order_id", orderData.id)
        .order("created_at", { ascending: false });

      if (!timelineError && timelineData) {
        setTimeline(timelineData as TimelineItem[]);
      }

      setLoading(false);
    }

    fetchOrderData();
  }, [orderNumber]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setOrder((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleAddTimelineUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setInsertingTimeline(true);
    const { data, error } = await supabase
      .from("order_updates")
      .insert([{ order_id: order.id, status: newTimelineStatus, note: newTimelineNote }])
      .select()
      .single();

    if (error) {
      alert("Failed to add update.");
    } else if (data) {
      setTimeline((prev) => [data as TimelineItem, ...prev]);
      setNewTimelineNote("");
      setOrder((prev) =>
        prev ? { ...prev, current_status: newTimelineStatus } : null
      );
    }
    setInsertingTimeline(false);
  };

  const handleSaveChanges = async () => {
    if (!order || !originalOrder) return;

    setSaving(true);
    setGlobalError(null);
    setSuccessMessage(null);

    const modifiedFields: Partial<Order> = {};
    (Object.keys(order) as (keyof Order)[]).forEach((key) => {
      if (order[key] !== originalOrder[key]) {
        (modifiedFields as any)[key] = order[key];
      }
    });

    if (Object.keys(modifiedFields).length === 0) {
      setSuccessMessage("No changes to save.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedFields),
      });

      const result = await response.json();

      if (!response.ok) {
        setGlobalError(result.error || "Failed to save changes.");
        return;
      }

      setSuccessMessage("Order saved successfully.");
      setOriginalOrder(order);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setGlobalError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!order) return;

    const confirmed = confirm(
      "Archive this order? It will be hidden but not permanently deleted."
    );
    if (!confirmed) return;

    const response = await fetch(`/api/orders/${order.id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to archive order.");
      return;
    }

    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-purple-500" />
        <p className="text-zinc-500 font-mono text-xs tracking-wider">
          Loading order...
        </p>
      </div>
    );
  }

  if (globalError && !order) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-xl p-5 text-center">
          <p className="text-red-400 font-medium text-sm mb-4">{globalError}</p>
          <button
            onClick={() => router.push("/admin")}
            className="text-xs text-purple-400 font-bold hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-32">

      {/* Toast banners */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-black text-xs font-bold tracking-wide px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          ✓ {successMessage}
        </div>
      )}
      {globalError && order && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white text-xs font-bold tracking-wide px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
          ⚠ {globalError}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="h-8 w-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            ←
          </button>
          <div>
            <h1 className="text-sm font-bold font-mono text-white">
              Order {order?.order_number}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">{order?.service_type}</p>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerCard form={order!} onChange={handleInputChange} />
          <StatusCard form={order!} onChange={handleInputChange} />
          <KeyboardCard form={order!} onChange={handleInputChange} />
          <ShippingCard form={order!} onChange={handleInputChange} />
          <NotesCard form={order!} onChange={handleInputChange} />
          <TimelineCard
            timeline={timeline}
            newStatus={newTimelineStatus}
            newNote={newTimelineNote}
            inserting={insertingTimeline}
            onStatusChange={setNewTimelineStatus}
            onNoteChange={setNewTimelineNote}
            onSubmit={handleAddTimelineUpdate}
          />
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2.5">
              Order Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block mb-0.5">Order ID</span>
                <span className="font-mono text-zinc-300 select-all text-[10px]">
                  {order?.id}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5">Order Number</span>
                <span className="font-mono text-zinc-300">{order?.order_number}</span>
              </div>
              <div className="col-span-2">
                <span className="text-zinc-500 block mb-1">Status</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  {order?.current_status}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-zinc-500 block mb-0.5">Email</span>
                <span className="text-zinc-300 block truncate">
                  {order?.customer_email || "—"}
                </span>
              </div>
              <div className="col-span-2 border-t border-zinc-800/60 pt-3">
                <span className="text-zinc-500 block mb-0.5">
                  Estimated Total
                </span>
                <span className="text-base font-bold text-zinc-200">
                  ₹{Number(order?.estimated_total || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="col-span-2 border-t border-zinc-800/60 pt-3 space-y-1 text-[11px] text-zinc-500">
                <div>
                  Created:{" "}
                  <span className="text-zinc-400 font-mono">
                    {order ? new Date(order.created_at).toLocaleString() : ""}
                  </span>
                </div>
                <div>
                  Updated:{" "}
                  <span className="text-zinc-400 font-mono">
                    {order ? new Date(order.updated_at).toLocaleString() : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Save bar */}
      <SaveBar
        saving={saving}
        orderNumber={order?.order_number ?? ""}
        onCancel={() => router.push("/admin")}
        onSave={handleSaveChanges}
        onDelete={handleDeleteOrder}
      />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputClass =
  "w-full text-sm rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-white focus:outline-none focus:border-purple-500/60 transition";
const selectClass =
  "w-full text-sm rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-white focus:outline-none focus:border-purple-500/60 transition appearance-none";
const textareaClass =
  "w-full text-sm rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-white focus:outline-none focus:border-purple-500/60 transition resize-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-zinc-400">{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-md">
      <h2 className="text-base font-semibold text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

function CustomerCard({ form, onChange }: { form: Order; onChange: any }) {
  return (
    <SectionCard title="Customer">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="customer_name" value={form.customer_name || ""} onChange={onChange} className={inputClass} />
        </Field>
        <Field label="Discord">
          <input name="discord_username" value={form.discord_username || ""} onChange={onChange} className={`${inputClass} font-mono`} placeholder="@username" />
        </Field>
        <Field label="Email">
          <input type="email" name="customer_email" value={form.customer_email || ""} onChange={onChange} className={inputClass} />
        </Field>
        <Field label="Phone / WhatsApp">
          <input name="customer_phone" value={form.customer_phone || ""} onChange={onChange} className={inputClass} />
        </Field>
      </div>
    </SectionCard>
  );
}

function StatusCard({ form, onChange }: { form: Order; onChange: any }) {
  return (
    <SectionCard title="Service & Status">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Service Type">
          <select name="service_type" value={form.service_type} onChange={onChange} className={selectClass}>
            {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Current Status">
          <select name="current_status" value={form.current_status} onChange={onChange} className={selectClass}>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Estimated Total">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-xs text-zinc-500 select-none">₹</span>
            <input type="number" name="estimated_total" value={form.estimated_total || ""} onChange={onChange} className={`${inputClass} pl-7 font-mono`} />
          </div>
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Order Summary">
          <textarea name="order_summary" value={form.order_summary || ""} onChange={onChange} rows={3} className={textareaClass} />
        </Field>
      </div>
    </SectionCard>
  );
}

function KeyboardCard({ form, onChange }: { form: Order; onChange: any }) {
  return (
    <SectionCard title="Hardware">
      <div className="space-y-4">
        <Field label="Keyboard / PCB Model">
          <input name="keyboard_pcb_model" value={form.keyboard_pcb_model || ""} onChange={onChange} className={inputClass} placeholder="e.g. Mode Sonnet, Tiger80 Lite" />
        </Field>
        <Field label="Switch & Build Details">
          <textarea name="switch_details" value={form.switch_details || ""} onChange={onChange} rows={3} className={textareaClass} />
        </Field>
      </div>
    </SectionCard>
  );
}

function ShippingCard({ form, onChange }: { form: Order; onChange: any }) {
  return (
    <SectionCard title="Shipping">
      <div className="space-y-4">
        <Field label="Street Address">
          <input name="street_address" value={form.street_address || ""} onChange={onChange} className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="City">
            <input name="city" value={form.city || ""} onChange={onChange} className={inputClass} />
          </Field>
          <Field label="State">
            <input name="state" value={form.state || ""} onChange={onChange} className={inputClass} />
          </Field>
          <Field label="Pincode">
            <input name="pincode" value={form.pincode || ""} onChange={onChange} className={`${inputClass} font-mono`} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 border-t border-zinc-800/60 pt-4">
          <Field label="Courier">
            <input name="courier" value={form.courier || ""} onChange={onChange} className={inputClass} placeholder="e.g. Delhivery" />
          </Field>
          <Field label="Tracking Number">
            <input name="tracking_number" value={form.tracking_number || ""} onChange={onChange} className={`${inputClass} font-mono`} placeholder="AWB number" />
          </Field>
          <Field label="Estimated Delivery">
            <input name="estimated_delivery" value={form.estimated_delivery || ""} onChange={onChange} className={inputClass} />
          </Field>
        </div>
      </div>
    </SectionCard>
  );
}

function NotesCard({ form, onChange }: { form: Order; onChange: any }) {
  return (
    <SectionCard title="Internal Notes">
      <textarea name="notes" value={form.notes || ""} onChange={onChange} rows={5} className={`${textareaClass} resize-y`} placeholder="Private build notes..." />
    </SectionCard>
  );
}

interface TimelineCardProps {
  timeline: TimelineItem[];
  newStatus: string;
  newNote: string;
  inserting: boolean;
  onStatusChange: (val: string) => void;
  onNoteChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function TimelineCard({
  timeline, newStatus, newNote, inserting, onStatusChange, onNoteChange, onSubmit,
}: TimelineCardProps) {
  return (
    <SectionCard title="Update Log">
      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
        {timeline.length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-2">No updates yet.</p>
        ) : (
          timeline.map((item) => (
            <div key={item.id} className="relative pl-5 border-l border-zinc-800 text-xs py-1">
              <div className="absolute left-[-4.5px] top-2 h-2 w-2 rounded-full bg-purple-500 border border-zinc-900" />
              <div className="flex items-center justify-between gap-4 font-mono">
                <span className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {item.status}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
              {item.note && (
                <p className="text-zinc-400 mt-1.5 leading-relaxed">{item.note}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-zinc-800/80 pt-5 mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
          Add Update
        </p>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-3 items-start">
          <div>
            <select
              value={newStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full text-xs rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 h-[38px] text-white focus:outline-none focus:border-purple-500/60"
            >
              {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <input
              value={newNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Note (optional)"
              className="flex-1 text-xs rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 h-[38px] text-white focus:outline-none focus:border-purple-500/60"
            />
            <button
              type="submit"
              disabled={inserting}
              className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition text-white px-4 rounded-lg text-xs font-bold whitespace-nowrap disabled:opacity-40 h-[38px]"
            >
              {inserting ? "..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </SectionCard>
  );
}

function SaveBar({
  saving, orderNumber, onCancel, onSave, onDelete,
}: {
  saving: boolean;
  orderNumber: string;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md z-40 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <button
          onClick={() => window.open(`/track/${orderNumber}`, "_blank")}
          disabled={!orderNumber}
          className="text-xs text-zinc-400 hover:text-purple-400 transition disabled:opacity-40"
        >
          View tracking page ↗
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold hover:bg-red-700 transition"
          >
            Archive
          </button>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-zinc-400 border border-zinc-800 bg-zinc-950/40 px-4 py-2.5 rounded-lg hover:bg-zinc-800 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="text-xs font-bold bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 min-w-[100px]"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}