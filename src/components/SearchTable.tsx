"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { App, AppDTO } from "../app/types/app";
import { fetchSteamGame } from "../service/steam-service";
import { fmtDate } from "../util";
import Link from "next/link";

type SearchTableProps = {
  allGames: AppDTO[];
  setWatched: Dispatch<SetStateAction<App[]>>;
};

const steamStore = "https://store.steampowered.com/app/";

export default function SearchTable(props: SearchTableProps) {
  const { allGames, setWatched } = props;

  const [query, setQuery] = useState("");
  const [queriedGames, setQueriedGames] = useState<AppDTO[]>([]);

  const [loading, setLoading] = useState(false);

  function filterGames(prefix: string) {
    if (prefix === "") {
      setQueriedGames([]);
      return;
    }

    setQueriedGames(
      allGames.filter((g) =>
        g.name.toLowerCase().startsWith(prefix.toLowerCase())
      )
    );
  }

  return (
    <section className="lg:col-span-2">
      <div className="rounded-2xl border border-white/5 bg-zinc-950/40 p-4 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-zinc-200">
            Search for games
          </div>
          <div className="ml-auto text-[10px] uppercase tracking-wider text-zinc-500">
            Powered by Steam
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-3 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterGames(query);
              }
            }}
            placeholder="Try: Hollow Knight, Baldur's Gate, ..."
            className="w-full rounded-xl border border-white/5 bg-zinc-900/60 px-4 py-3 text-sm outline-none ring-1 ring-white/5 shadow-[0_0_18px_rgba(139,92,246,0.12)] focus:ring-fuchsia-500/40"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                filterGames("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
            Live
          </div>
          <button
            onClick={() => filterGames(query)}
            className="rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 font-medium text-fuchsia-200 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/60"
          >
            Search
          </button>
        </div>

        {/* Results list */}
        <div className="mt-4 divide-y divide-white/5 rounded-xl border border-white/5 bg-zinc-950/60">
          {loading && (
            <div className="p-4 text-sm text-zinc-400 animate-pulse">
              Searching…
            </div>
          )}
          {!loading && queriedGames.length === 0 && (
            <div className="p-6 text-center text-sm text-zinc-400">
              No games found. Try a different title.
            </div>
          )}
          {!loading &&
            queriedGames.map((g) => (
              <div
                key={g.appid}
                className="flex items-center gap-3 p-3 hover:bg-white/5"
              >
                {/* TODO */}
                {/* <img
                      src={g.coverUrl!}
                      alt=""
                      className="h-16 w-12 rounded-md bg-zinc-800 object-cover"
                    /> */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-medium text-zinc-100">
                      {g.name}
                    </div>
                    <span className="text-[10px] rounded border border-fuchsia-500/30 bg-fuchsia-500/10 px-2 py-0.5 text-fuchsia-200">
                      {fmtDate(g.name)}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-400 truncate">
                    {/* {g.platforms?.join(" • ") || "Platforms TBA"} */}
                    {/* <Link onMouseOver={(e) => {}} >
                      Steam Page
                    </Link> */}
                    {g.appid}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={steamStore + g.appid}
                    target="_blank"
                    className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-xs text-sky-200 hover:bg-sky-500/20 hover:border-sky-500/60"
                  >
                    Store ↗
                  </a>
                  <button
                    onClick={async () => {
                      const app = await fetchSteamGame(g.appid);
                      if (app) {
                        setWatched((prev) => [...prev, app]);
                      }
                    }}
                    className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-500/60"
                  >
                    Add +
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
