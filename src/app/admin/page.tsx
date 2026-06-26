import Link from "next/link";
import { supabase } from "@/lib/supabase";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-red-400">Error: {error.message}</p>
      </main>
    );
  }

  const totalOrders = orders?.length ?? 0;

  const inProgress =
    orders?.filter((o) =>
      ["Work Started", "Testing", "In Queue", "Packing"].includes(
        o.current_status
      )
    ).length ?? 0;

  const completed =
    orders?.filter((o) => o.current_status === "Order Completed").length ?? 0;

  const warrantyActive =
    orders?.filter((o) => o.current_status === "Testing Warranty Active")
      .length ?? 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">KeebForge Admin</h1>
            <p className="mt-2 text-zinc-400">Manage customer orders and production.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700"
            >
              + Create New Order
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Orders" value={totalOrders} />
          <DashboardCard title="In Progress" value={inProgress} />
          <DashboardCard title="Completed" value={completed} />
          <DashboardCard title="Warranty Active" value={warrantyActive} />
        </div>

        {/* Orders Table */}
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="border-b border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
          </div>

          {orders && orders.length > 0 ? (
            <table className="w-full">
              <thead className="bg-zinc-800 text-left">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-zinc-800 hover:bg-zinc-800/40"
                  >
                    <td className="p-4 font-mono font-semibold">
                      {order.order_number}
                    </td>
                    <td className="p-4">{order.customer_name}</td>
                    <td className="p-4">{order.service_type}</td>
                    <td className="p-4">
                      <StatusBadge status={order.current_status} />
                    </td>
                    <td className="p-4 text-zinc-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/orders/${order.order_number}`}
                        className="font-semibold text-purple-400 hover:text-purple-300"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-zinc-400">No orders yet.</div>
          )}
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-wide text-zinc-400">{title}</p>
      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    "Order Received": "bg-blue-500/20 text-blue-400",
    "Order Confirmed": "bg-blue-500/20 text-blue-400",
    "Payment Pending": "bg-yellow-500/20 text-yellow-400",
    "Payment Received": "bg-green-500/20 text-green-400",
    "In Queue": "bg-purple-500/20 text-purple-400",
    "Work Started": "bg-orange-500/20 text-orange-400",
    "Testing": "bg-cyan-500/20 text-cyan-400",
    "Completed": "bg-emerald-500/20 text-emerald-400",
    "In Transit": "bg-sky-500/20 text-sky-400",
    "Delivered": "bg-emerald-500/20 text-emerald-400",
    "Testing Warranty Active": "bg-lime-500/20 text-lime-400",
    "Order Completed": "bg-emerald-600/20 text-emerald-300",
  };

  const color = colorMap[status] ?? "bg-zinc-700 text-zinc-300";

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${color}`}>
      {status}
    </span>
  );
}