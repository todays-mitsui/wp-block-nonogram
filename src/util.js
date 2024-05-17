const BASE64_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * @param {boolean[]} bits
 * @returns {string}
 */
function bitsToString(bits) {
  let str = '';
  for (const b6 of chunks(bits, 6)) {
    const index = (b6[0] ? 0b100000 : 0b000000) +
      (b6[1] ? 0b010000 : 0b000000) +
      (b6[2] ? 0b001000 : 0b000000) +
      (b6[3] ? 0b000100 : 0b000000) +
      (b6[4] ? 0b000010 : 0b000000) +
      (b6[5] ? 0b000001 : 0b000000);
    str += BASE64_CHARACTERS.charAt(index);
  }

  return str;
}
exports.bitsToString = bitsToString;

/**
 * @param {string} str
 * @returns {boolean[]}
 */
function stringToBits(str) {
  const charToIndex = new Map();
  BASE64_CHARACTERS.split("").forEach((c, i) => charToIndex.set(c, i));

  const bits = str.split("").flatMap((c) => {
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

  return bits;
}
exports.stringToBits = stringToBits;

/**
 * @template T
 * @param {T[]} array
 * @param {number} size
 * @returns {Generator<T[]>}
 */
function* chunks(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

/**
 * @param {number[]} serials
 */
function encode(serials) {
  /** @type string */
  let code = '';

  for (const chunk of chunks(serials, 3)) {
    const index = (chunk[0] << 4) + (chunk[1] << 2) + (chunk[2] << 0);
    code += BASE64_CHARACTERS.charAt(index);
  }

  return code;
}
exports.encode = encode;

/**
 * @param {string} code
 * @returns {number[]}
 */
function decode(code) {
  /** @type number[] */
  const serials = [];

  code.split("").forEach((c) => {
    const index = BASE64_CHARACTERS.indexOf(c);

    if (index === -1) {
      throw new Error("Invalid character");
    }

    serials.push(
      (index & 0b110000) >> 4,
      (index & 0b001100) >> 2,
      index & 0b000011
    );
  });

  return serials;
}
exports.decode = decode;
