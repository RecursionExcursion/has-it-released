import { clientGzip } from "../app/service/client-compression-service";
import { iDb } from "../app/service/indexedDb-service";
import { AppDTO } from "../app/types/app";

const DATA_KEY = "appData";

export async function loadAppDataFromIDb(): Promise<AppDTO[] | undefined> {
  const d = await iDb.loadU8(DATA_KEY);
  if (!d) return;
  const decomp = clientGzip.decompress(d);
  const apps = JSON.parse(decomp);
  return apps;
}

export async function saveAppDataToIDb(appData: AppDTO[]) {
  const comp = clientGzip.compress(JSON.stringify(appData));
  await iDb.saveU8(DATA_KEY, comp);
}
