import { supabase } from "@/lib/supabase";

export default async function AdminDashboard() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*");

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-red-400">
          Error: {error.message}
        </p>
      </main>
    );
  }

  const totalOrders = orders.length;

  const inProgress = orders.filter((order) =>
    [
      "Work Started",
      "Testing",
      "In Queue",
      "Packing",
    ].includes(order.current_status)
  ).length;

  const completed = orders.filter(
    (order) => order.current_status === "Completed"
  ).length;

  const warrantyActive = orders.filter(
    (order) => order.current_status === "Warranty Active"
  ).length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        KeebForge Admin
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Orders" value={totalOrders} />
        <DashboardCard title="In Progress" value={inProgress} />
        <DashboardCard title="Completed" value={completed} />
        <DashboardCard title="Warranty Active" value={warrantyActive} />
      </div>
    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}