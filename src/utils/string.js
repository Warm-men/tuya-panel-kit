import CoreUtils from './core';


/**
 * 等同于原来的 hexToBytes
 * @example
 * hexStringToNumber('AD03')
 * // [173, 3]
 * @param {String} bits, bits is a hex string
 * @returns {Array} a array of number which converts from `bits` based on 16
 */
const hexStringToNumber = bits => {
  return CoreUtils.partition(bits, 2).map(item => parseInt(item, 16));
};


/**
 * @example
 * hexStringToBinString('A7B9')
 * // '1010011110111001'
 * @example
 * hexStringToBinString('0709')
 * // '0000011100001001'
 * @param {String} hexString, hexString is a hex string, such as 'A7B9'
 * @returns {String} a string which converts from the hexString
 */
const hexStringToBinString = hexString => {
  return CoreUtils.partition(hexString, 2)
    .map(x => parseInt(x, 16).toString(2))
    .map(x => CoreUtils.toFixed(x, 8))
    .join('');
};


/**
 * @example
 * strToHexString('ababba0102hghg0011100')
 * // str.match(/[01]{4}/g) ['0011']
 * // '3'
 * @example
 * strToHexString('ababba0102hghg001110011000111')
 * // str.match(/[01]{4}/g)  ["0011", "1001", "1000"]
 * // '398'
 * @param {String} str, str is a string, which contains '0' '1', and can contains other char
 * @returns {String} a string which converts from the `str`, which every char is a hex char
 */
const strToHexString = str => {
  const binList = str.match(/[01]{4}/g) || [];
  return binList.map(x => parseInt(x, 2).toString(16)).join('');
};


// const binsToHexString = bins => {

// };


const camelize = str => {
  if (CoreUtils.isNumerical(str)) {
    return `${str}`;
  }

  const ret = str.replace(
    /[-_\s]+(.)?/g,
    (match, chr) => (chr ? chr.toUpperCase() : ''),
  );
  // Ensure 1st char is always lowercase
  return ret.substr(0, 1).toLowerCase() + ret.substr(1);
};


const StringUtil = {
  hexStringToNumber,
  hexStringToBinString,
  strToHexString,
  camelize,
  // Diprecated 其实就是 bytes.join('');
  // bytesToInt(bytes) {
  //   const int = [];
  //   for (let i = 0; i < bytes.length; i++) {
  //     int.push(bytes[i].toString());
  //   }
  //   return int.join('');
  // },

};

export default StringUtil;
