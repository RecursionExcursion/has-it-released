import { get, set } from "idb-keyval";

export const iDb = {
  saveU8: async (key: string, compressed: Uint8Array) => {
    await set(key, compressed);
  },
  loadU8: async (key: string): Promise<Uint8Array | undefined> => {
    return await get<Uint8Array>(key);
  },
};
