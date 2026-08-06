const GOATCOUNTER_ENDPOINT = "https://zarkade.goatcounter.com/count";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname === "/count") {
      const current = parseInt((await env.VISITOR_COUNTER.get("total")) ?? "0", 10);
      await env.VISITOR_COUNTER.put("total", String(current + 1));

      const proxied = await fetch(`${GOATCOUNTER_ENDPOINT}${url.search}`, {
        method: request.method,
        headers: {
          "Content-Type": request.headers.get("Content-Type") ?? "text/plain",
        },
        body: request.method === "POST" ? await request.text() : undefined,
      });

      return new Response(proxied.body, {
        status: proxied.status,
        headers: corsHeaders(),
      });
    }

    if (url.pathname === "/total") {
      const current = (await env.VISITOR_COUNTER.get("total")) ?? "0";
      return new Response(JSON.stringify({ count: parseInt(current, 10) }), {
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}