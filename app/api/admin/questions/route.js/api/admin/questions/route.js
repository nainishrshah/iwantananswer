import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return Response.json(data ?? []);
  } catch (err) {
    console.error("API crash:", err);
    return new Response(
      JSON.stringify({ error: "Server crashed" }),
      { status: 500 }
    );
  }
}
