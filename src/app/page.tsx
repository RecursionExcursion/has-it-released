"use client";

const DATA_KEY = "appData";

import { ChangeEvent, useEffect, useState } from "react";
import { AppDTO } from "./types/app";
import SearchTable from "../components/SearchTable";
import { clientGzip } from "./service/client-compression-service";
import { iDb } from "./service/indexedDb-service";

export default function Home() {
  const [allGames, setAllGames] = useState<AppDTO[]>([]);
  const [searchableGames, setSearchableGames] = useState<AppDTO[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // fetchAppDataFromSteamApi().then((d) => console.log(d));
  }, []);

  // useEffect(() => {
  //   if (query === "") {
  //     setSearchableGames([]);
  //     return;
  //   }
  //   setSearchableGames(
  //     allGames.filter((g) =>
  //       g.name.toLowerCase().startsWith(query.toLowerCase())
  //     )
  //   );
  // }, [query, allGames]);

  async function fetchAppDataFromSteamApi(): Promise<AppDTO[]> {
    const res = await fetch("/api/steam");
    const data = await res.json();
    return data.applist.apps;
  }

  async function loadAppDataFromIDb(): Promise<AppDTO[] | undefined> {
    const d = await iDb.loadU8(DATA_KEY);
    if (!d) return;
    const decomp = clientGzip.decompress(d);
    const apps = JSON.parse(decomp);
    return apps;
  }

  async function saveAppDataToIDb(appData: AppDTO[]) {
    const comp = clientGzip.compress(JSON.stringify(appData));
    await iDb.saveU8(DATA_KEY, comp);
  }

  function search(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div>
      {/* Search list */}
      <div>
        <input
          className="border border-white bg-blue-300"
          value={query}
          type="text"
          onChange={search}
        ></input>
        <SearchTable apps={allGames.slice(0, 10)} />
        {/* {searchableGames.map((sg) => (
          <div key={sg.appid}>{sg.name}</div>
        ))} */}
      </div>
      {/* watch list */}

      <div></div>
    </div>
  );
}
