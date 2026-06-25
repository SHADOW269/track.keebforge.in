import { supabase } from "@/lib/supabase";
import OrderTimeline from "@/components/OrderTimeline";

interface CopyButtonProps {
  text: string;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  // Query database records using uppercase strict values
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber.toUpperCase())
    .single();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 max-w-[1100px] mx-auto">
      {/* HEADER SECTION */}
      <header className="mb-12">
        <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--acc)] mb-2.5" style={{ fontFamily: "var(--ff-d)" }}>
          Status Centre
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--t1)] mb-2" style={{ fontFamily: "var(--ff-d)" }}>
          Order Tracking
        </h1>
        <p className="text-sm text-[var(--t2)] max-w-md">
          Live build diagnostics for custom mechanical keyboard commissions at KeebForge.
        </p>
      </header>

      {error || !order ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm font-medium text-red-400 flex items-center gap-3">
          <span>⚠️</span>
          <span>No build matrix discovered for ID "{orderNumber}". Verify your alphanumeric code.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT PANEL: Order Identity card & Progression Line */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[24px] border border-[var(--bdr)] bg-[var(--surf)] shadow-2xl overflow-hidden">
              {/* Internal Frame Top Header */}
              <div className="bg-[var(--bg2)] border-b border-[var(--bdr)] p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-black tracking-wider text-[var(--t1)]" style={{ fontFamily: "var(--ff-d)" }}>
                      {order.order_number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--acc-dim)] text-[var(--acc)] border border-[var(--bdr)]" style={{ fontFamily: "var(--ff-d)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-[var(--t2)]">{order.service_type || "Custom Bench Build"}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm font-bold text-[var(--t1)]" style={{ fontFamily: "var(--ff-d)" }}>{order.customer_name}</p>
                  <p className="text-[11px] text-[var(--t3)] mt-0.5">Active Tracking Record</p>
                </div>
              </div>

              {/* Internal Frame Timeline Body */}
              <div className="p-6 md:p-7">
                <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-5 border-b border-[var(--bdr)] pb-2.5" style={{ fontFamily: "var(--ff-d)" }}>
                  Build Progression Pipeline
                </div>
                <OrderTimeline currentStatus={order.current_status} />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Specifications, Courier Logistics & Diagnostics */}
          <div className="space-y-6">
            <div className="rounded-[24px] border border-[var(--bdr)] bg-[var(--surf)] p-6 md:p-7 space-y-6 shadow-2xl">
              
              {/* Build Meta specifications block */}
              <div>
                <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-4 border-b border-[var(--bdr)] pb-2" style={{ fontFamily: "var(--ff-d)" }}>
                  Timeline Targets
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--t3)]" style={{ fontFamily: "var(--ff-d)" }}>
                    Est. Completion
                  </span>
                  <p className="text-sm text-[var(--t1)] font-medium">{order.estimated_delivery || "TBD / In Queue"}</p>
                </div>
              </div>

              {/* Courier tracking system breakdown */}
              {order.tracking_number && (
                <div>
                  <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-3" style={{ fontFamily: "var(--ff-d)" }}>
                    Fulfillment & Logistics
                  </div>
                  <div className="rounded-lg border border-[var(--acc-dim)] bg-gradient-to-br from-[var(--acc-glow2)] to-transparent p-4 flex items-center justify-between gap-4">
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-[var(--t1)] block font-mono truncate">{order.tracking_number}</span>
                      <span className="text-[10px] text-[var(--t3)] uppercase tracking-wider block mt-0.5" style={{ fontFamily: "var(--ff-d)" }}>
                        via {order.courier || "Courier Partner"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Workbench Notes */}
              <div>
                <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-3" style={{ fontFamily: "var(--ff-d)" }}>
                  Workbench Notes
                </div>
                <div className="rounded-lg border border-[var(--bdr)] bg-[var(--bg3)] p-4 text-xs text-[var(--t2)] leading-relaxed">
                  {order.notes || "No notes appended to this workflow snapshot yet."}
                </div>
              </div>

              {/* Communication Links */}
              <div className="pt-2 border-t border-[var(--bdr)] text-xs text-[var(--t2)] leading-relaxed">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--t3)] block mb-1" style={{ fontFamily: "var(--ff-d)" }}>
                  Need Assistance?
                </span>
                Ping our workbench on Discord at{" "}
                <a href="https://discord.com/users/hardy_022" target="_blank" rel="noopener noreferrer" className="text-[var(--acc)] font-bold transition-all hover:underline" style={{ fontFamily: "var(--ff-d)" }}>
                  @hardy_022
                </a>
              </div>

            </div>
          </div>

        </div>
      )}
    </main>
  );
}