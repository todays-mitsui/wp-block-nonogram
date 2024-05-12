/**
 * 与えられた行列を転置した新しい行列を返す
 */
export function transpose<T>(matrix: T[][]): T[][] {
  const numColumns = Math.max(0, ...matrix.map((row) => row.length));
  return Array.from(
    { length: numColumns },
    (_, i) => matrix.map((row) => row[i]),
  );
}

export function* chunks<T>(array: T[], size: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const BASE64_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function bitsToString(bits: boolean[]): string {
  let str = "";
  for (const b6 of chunks(bits, 6)) {
    const index = (b6[0] ? 0b100000 : 0b000000) +
      (b6[1] ? 0b010000 : 0b000000) +
      (b6[2] ? 0b001000 : 0b000000) +
      (b6[3] ? 0b000100 : 0b000000) +
      (b6[4] ? 0b000010 : 0b000000) +
      (b6[5] ? 0b000001 : 0b000000);
    str += BASE64_CHARACTERS.charAt(index);
  }

  return `${bits.length}:${str}`;
}

export function stringToBits(str: string): boolean[] {
  const charToIndex = new Map<string, number>();
  BASE64_CHARACTERS.split("").forEach((c, i) => charToIndex.set(c, i));

  const [length, data] = str.split(":");
  const bits = data.split("").flatMap((c) => {
    const index = charToIndex.get(c);

    if (index == null) {
      throw new Error("Invalid character");
    }

    return [
      !!(index & 0b100000),
      !!(index & 0b010000),
      !!(index & 0b001000),
      !!(index & 0b000100),
      !!(index & 0b000010),
      !!(index & 0b000001),
    ];
  });

  return bits.slice(0, Number(length));
}
