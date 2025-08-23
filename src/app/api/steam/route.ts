export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const appIdsUrl =
  'https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json';

export async function GET() {
  const upstream = await fetch(appIdsUrl, { cache: 'no-store' });
  if (!upstream.ok) {
    return new Response('Upstream error', { status: upstream.status });
  }
  // Stream the bytes straight through (no JSON parsing on the server)
  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}