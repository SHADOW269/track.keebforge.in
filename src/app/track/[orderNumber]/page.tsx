import { supabase } from "@/lib/supabase";
import OrderTimeline from "@/components/OrderTimeline";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .eq("is_deleted", false)
    .single();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 max-w-[1100px] mx-auto">
      <header className="mb-12">
        <p
          className="text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--acc)] mb-2.5"
          style={{ fontFamily: "var(--ff-d)" }}
        >
          Status Centre
        </p>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--t1)] mb-2"
          style={{ fontFamily: "var(--ff-d)" }}
        >
          Order Tracking
        </h1>
        <p className="text-sm text-[var(--t2)] max-w-md">
          Live build progress for your KeebForge order.
        </p>
      </header>

      {error || !order ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm font-medium text-red-400 flex items-center gap-3">
          <span>⚠️</span>
          <span>
            No order found for <span className="font-mono">{orderNumber}</span>.
            Double-check the number from your confirmation email.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Timeline panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-[24px] border border-[var(--bdr)] bg-[var(--surf)] shadow-2xl overflow-hidden">
              <div className="bg-[var(--bg2)] border-b border-[var(--bdr)] p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-lg font-black tracking-wider text-[var(--t1)]"
                      style={{ fontFamily: "var(--ff-d)" }}
                    >
                      {order.order_number}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--acc-dim)] text-[var(--acc)] border border-[var(--bdr)]"
                      style={{ fontFamily: "var(--ff-d)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-[var(--t2)]">
                    {order.service_type || "Custom Bench Build"}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p
                    className="text-sm font-bold text-[var(--t1)]"
                    style={{ fontFamily: "var(--ff-d)" }}
                  >
                    {order.customer_name}
                  </p>
                  <p className="text-[11px] text-[var(--t3)] mt-0.5">
                    Active Tracking Record
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <div
                  className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-5 border-b border-[var(--bdr)] pb-2.5"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Build Progress
                </div>
                <OrderTimeline currentStatus={order.current_status} />
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="space-y-6">
            <div className="rounded-[24px] border border-[var(--bdr)] bg-[var(--surf)] p-6 md:p-7 space-y-6 shadow-2xl">

              <div>
                <div
                  className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-4 border-b border-[var(--bdr)] pb-2"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Timeline
                </div>
                <div className="space-y-1">
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase text-[var(--t3)]"
                    style={{ fontFamily: "var(--ff-d)" }}
                  >
                    Est. Completion
                  </span>
                  <p className="text-sm text-[var(--t1)] font-medium">
                    {order.estimated_delivery || "To be confirmed"}
                  </p>
                </div>
              </div>

              {order.tracking_number && (
                <div>
                  <div
                    className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-3"
                    style={{ fontFamily: "var(--ff-d)" }}
                  >
                    Shipment
                  </div>
                  <div className="rounded-lg border border-[var(--acc-dim)] bg-gradient-to-br from-[var(--acc-glow2)] to-transparent p-4 flex items-center justify-between gap-4">
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-[var(--t1)] block font-mono truncate">
                        {order.tracking_number}
                      </span>
                      <span
                        className="text-[10px] text-[var(--t3)] uppercase tracking-wider block mt-0.5"
                        style={{ fontFamily: "var(--ff-d)" }}
                      >
                        via {order.courier || "Courier Partner"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div
                  className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--t3)] mb-3"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Notes
                </div>
                <div className="rounded-lg border border-[var(--bdr)] bg-[var(--bg3)] p-4 text-xs text-[var(--t2)] leading-relaxed">
                  {order.notes || "No notes added yet."}
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--bdr)] text-xs text-[var(--t2)] leading-relaxed">
                <span
                  className="text-[10px] font-bold tracking-wider uppercase text-[var(--t3)] block mb-1"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Need help?
                </span>
                Message us on Discord:{" "}
                <a
                  href="https://discord.com/users/hardy_022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--acc)] font-bold hover:underline"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
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