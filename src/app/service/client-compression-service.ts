"use client";

import { strToU8, compressSync, decompressSync, strFromU8 } from "fflate";

export const clientGzip = {
  compress(str: string): Uint8Array<ArrayBufferLike> {
    return compressSync(strToU8(str), { level: 9, mem: 8 });
    // return u8ToB64(compressed);
  },
  decompress(data: Uint8Array<ArrayBufferLike>): string {
    return strFromU8(decompressSync(data));
  },
};

// /* Helpers */
// function u8ToB64(u8: Uint8Array): string {
//   let bin = "";
//   for (let i = 0; i < u8.length; i += 0x8000) {
//     bin += String.fromCharCode(...u8.subarray(i, i + 0x8000));
//   }
//   return btoa(bin);
// }
// function b64ToU8(b64: string): Uint8Array {
//   const bin = atob(b64);
//   const out = new Uint8Array(bin.length);
//   for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
//   return out;
// }
