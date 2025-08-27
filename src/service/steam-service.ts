import { App, AppDTO } from "../app/types/app";

export async function fetchSteamApps(): Promise<AppDTO[]> {
  const res = await fetch("/api/steam");
  const data = await res.json();
  return data.applist.apps;
}

export async function fetchSteamGame(id: number): Promise<App | null> {
  console.log({ bod: JSON.stringify({ id: id.toFixed() }) });

  const res = await fetch("/api/steam", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  const payload = await res.json();
  console.log({ payload });
  const app = payload[id];
  if (!app.success) {
    console.log("fail");
    return null;
  }

  return app.data;
}
