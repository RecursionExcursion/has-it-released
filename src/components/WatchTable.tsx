"use client";

import { useState } from "react";
import { App } from "../app/types/app";
import { fmtDate } from "../util";

type WatchTableProps = {
  watched: App[];
  removeApp: (id: number) => void;
};

export default function WatchTable(props: WatchTableProps) {
  const { watched, removeApp } = props;

  const [showReleased, setShowReleased] = useState(true);

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-2xl border border-white/5 bg-zinc-950/40 p-4 backdrop-blur-md shadow-[0_0_30px_rgba(14,165,233,0.12)]">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-zinc-200">
            Watched games
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs">
            <button
              // onClick={() => setSortAsc((s) => !s)}
              className="rounded-lg border border-white/10 px-2 py-1 text-zinc-300 hover:bg-white/5"
              title="Toggle sort order"
            >
              {true ? "↑ Date" : "↓ Date"}
              {/* {sortAsc ? "↑ Date" : "↓ Date"} */}
            </button>
            <label className="flex items-center gap-2 text-zinc-400">
              <input
                type="checkbox"
                checked={showReleased}
                onChange={(e) => setShowReleased(e.target.checked)}
                className="h-3.5 w-3.5 accent-fuchsia-500"
              />
              <span>Show released</span>
            </label>
          </div>
        </div>

        <div className="mt-3 divide-y divide-white/5 rounded-xl border border-white/5 bg-zinc-950/60 min-h-[260px]">
          {watched.length === 0 && (
            <div className="p-6 text-center text-sm text-zinc-400">
              No watched games yet. Add some from the left.
            </div>
          )}
          {watched.map((g, i) => (
            <div
              key={g.steam_appid + i}
              className="flex items-center gap-3 p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="truncate font-medium text-zinc-100">
                    {g.name}
                  </div>
                  <span className="text-[10px] rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-violet-200">
                    {fmtDate(g.release_date.date)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-zinc-400 truncate">
                  {g.is_free ? "Free" : g.price_overview?.final_formatted}
                  {/* {g.platforms?.join(" • ") || "Platforms TBA"} */}
                </div>
              </div>
              <button
                onClick={() => removeApp(g.steam_appid)}
                className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-xs text-rose-200 hover:bg-rose-500/20 hover:border-rose-500/60"
              >
                Remove ×
              </button>
            </div>
          ))}
        </div>

        {/* Sticky footer CTA */}
        <div className="mt-3 text-[11px] text-zinc-400">
          Tip: click <span className="text-emerald-300">Add +</span> on a result
          to start tracking.
        </div>
      </div>
    </aside>
  );
}
