"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

        <h1 className="text-6xl font-black">
          KeebForge
        </h1>

        <p className="mt-6 text-2xl text-zinc-400">
          Admin Control Center
        </p>

        <p className="mt-10 max-w-lg text-zinc-500 leading-8">
          Internal administration portal used to manage
          customer orders, production workflow,
          shipping updates and warranty tracking.
        </p>

      </div>

      {/* Login Card */}

      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
        >

          <h2 className="text-3xl font-bold">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Authorized personnel only.
          </p>

          <div className="mt-8">

            <label className="text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-purple-500"
            />

          </div>

          <div className="mt-6">

            <label className="text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-purple-500"
            />

          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-400">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-purple-600 py-3 font-semibold hover:bg-purple-700 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="mt-8 text-center text-xs text-zinc-500">
            Unauthorized access is prohibited.
          </p>

        </form>

      </div>

    </main>
  );
}