import { supabase } from "@/app/supabase";

export async function GET() {
  const { error } = await supabase
    .from("inventory")
    .select("id")
    .limit(1);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
