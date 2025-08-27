import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const appIdsUrl =
  "https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json";

const appDataUrl =
  "https://store.steampowered.com/api/appdetails?appids="; /* + appId */

export async function GET() {
  const upstream = await fetch(appIdsUrl, { cache: "no-store" });
  if (!upstream.ok) {
    return new Response("Upstream error", { status: upstream.status });
  }
  return new Response(upstream.body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const url = appDataUrl + id;

  console.log(url);

  const upstream = await fetch(url, { cache: "no-store" });
  if (!upstream.ok) {
    return new Response("Upstream error", { status: upstream.status });
  }
  // Stream the bytes straight through (no JSON parsing on the server)
  return new Response(upstream.body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    },
  });
}
