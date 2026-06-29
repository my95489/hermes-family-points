/**
 * Hermes Family Points — Cloudflare Worker
 *
 * API 路由: /api/points
 * 静态资源: 自动代理到 Git 仓库中的文件
 * KV 绑定: FAMILY_POINTS
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // API: GET /api/points — 从 KV 读取数据
    if (path === '/api/points' && request.method === 'GET') {
      const data = await env.FAMILY_POINTS.get('family_points_data', 'json');
      return new Response(JSON.stringify(data || null), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // API: PUT /api/points — 写入数据到 KV
    if (path === '/api/points' && request.method === 'PUT') {
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

    // 其他请求 → 交给 Cloudflare 静态资源处理
    return env.ASSETS.fetch(request);
  }
};
