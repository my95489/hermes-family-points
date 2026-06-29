/**
 * Hermes Family Points — Cloudflare Pages Functions API
 * 
 * GET  /api/points   → 从 KV 读取全部数据
 * PUT  /api/points   → 写入全部数据到 KV
 *
 * 需要绑定 KV Namespace，绑定名: FAMILY_POINTS
 */

export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === 'GET') {
    const data = await env.FAMILY_POINTS.get('family_points_data', 'json');
    return new Response(JSON.stringify(data || null), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  if (request.method === 'PUT') {
    try {
      const data = await request.json();
      await env.FAMILY_POINTS.put('family_points_data', JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
