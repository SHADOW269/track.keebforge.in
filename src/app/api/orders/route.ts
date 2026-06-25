import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

console.log(
  "Using service role key:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith("sb_secret_")
);

export async function POST(request: Request) {
  console.log("🚀 POST /api/orders called");

  try {
    const body = await request.json();

    const { count, error: countError } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json(
        { success: false, error: countError.message },
        { status: 500 }
      );
    }

    const orderNumber = `KF${String((count ?? 0) + 1).padStart(6, "0")}`;

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,

        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        discord_username: body.discord_username,

        service_type: body.service_type,
        current_status: body.current_status,

        order_summary: body.order_summary,
        estimated_total: body.estimated_total,

        keyboard_pcb_model: body.keyboard_pcb_model,
        switch_details: body.switch_details,

        street_address: body.street_address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,

        courier: body.courier,
        tracking_number: body.tracking_number,
        estimated_delivery: body.estimated_delivery,

        notes: body.notes,
      })
      .select()
      .single();

    console.log("Supabase error:", error);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}