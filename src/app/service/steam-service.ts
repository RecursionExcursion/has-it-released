"use server";

const appIdsUrl =
  "https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json";
const appDataUrl =
  "https://store.steampowered.com/api/appdetails?appids="; /* + appId */

export async function fetchGames() {
    return fetch(appIdsUrl)
}
