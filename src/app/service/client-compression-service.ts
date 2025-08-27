"use client";

import { strToU8, compressSync, decompressSync, strFromU8 } from "fflate";

export const clientGzip = {
  compress(str: string): Uint8Array<ArrayBufferLike> {
    return compressSync(strToU8(str), { level: 9, mem: 8 });
  },
  decompress(data: Uint8Array<ArrayBufferLike>): string {
    return strFromU8(decompressSync(data));
  },
};
