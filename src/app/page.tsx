"use client";

import { useEffect, useState } from "react";
import { App, AppDTO } from "./types/app";
import { loadAppDataFromIDb } from "../lib/idb";
import { fetchSteamApps } from "../service/steam-service";
import SearchTable from "../components/SearchTable";
import WatchTable from "../components/WatchTable";



export default function NeonTracker() {
  const [watched, setWatched] = useState<App[]>([]);
  const [allGames, setAllGames] = useState<AppDTO[]>([]);

  useEffect(() => {
    loadAppDataFromIDb().then(async (apps) => {
      if (!apps) {
        apps = await fetchSteamApps();
        if (!apps) {
          throw Error("Apps could not be retrieved");
        }
      }

      setAllGames(apps);
    });
  }, []);

  function removeApp(id: number) {
    const copy = [...watched];
    const i = copy.findIndex((app) => app.steam_appid === id);
    if (i === -1) {
      return;
    }
    copy.splice(i, 1);
    setWatched(copy);
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0b0b14] to-[#0e0e17] text-zinc-100">
      {/* Neon blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl bg-fuchsia-600/25" />
        <div className="absolute top-1/3 -left-16 h-72 w-72 rounded-full blur-3xl bg-sky-500/25" />
      </div>

      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-sky-500 shadow-[0_0_30px_#22d3ee]" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            Upcoming Games Tracker
          </h1>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Search Steam titles and keep a glowing watchlist of release dates.
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Search & Results */}
        <SearchTable setWatched={setWatched} allGames={allGames} />

        {/* Right: Watched */}
        <WatchTable watched={watched} removeApp={removeApp} />
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-zinc-500">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-400">
          Dark Neon
        </span>{" "}
        UI • Tailwind only
      </footer>
    </div>
  );
}
