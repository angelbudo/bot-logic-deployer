// One-shot migration runner. TEMPORARY - delete after migrations applied.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

Deno.serve(async (req) => {
  const dbUrl = Deno.env.get("SUPABASE_DB_URL");
  if (!dbUrl) return new Response("No DB URL", { status: 500 });

  const body = await req.json().catch(() => ({}));
  const sql: string = body.sql ?? "";
  if (!sql) return new Response(JSON.stringify({ error: "no sql" }), { status: 400 });

  const client = new Client(dbUrl);
  try {
    await client.connect();
    await client.queryArray(sql);
    return new Response(JSON.stringify({ ok: true, length: sql.length }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err), message: (err as Error).message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  } finally {
    try { await client.end(); } catch {}
  }
});
