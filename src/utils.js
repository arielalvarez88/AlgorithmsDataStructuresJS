/**
 *
 * @param {Number} n
 * @returns {{binary: *, ones: *}}
 */
const toBinaryString = function (n) {
  let numberOfBits = Math.floor(Math.log2(n)) + 1;
  let binaryRepresentation = [];
  let sum = 0;
  let ones = [];
  for (let i = numberOfBits - 1; i >= 0; i--) {
    if (sum + Math.pow(2, i) <= n) {
      binaryRepresentation.push(1);
      sum = sum + Math.pow(2, i);
      ones.push(i);
    } else {
      binaryRepresentation.push(0);
    }
  }
  return { ones, binary: binaryRepresentation.join("") };
};

let zeros = (dimensions, v = 0) => {
  let results = null;
  function returnArray(dimension, remaningDimensions) {
    if (remaningDimensions.length === 0) {
      return Array(dimension).fill(v);
    }
    return Array.from(new Array(dimension), () =>
      returnArray(remaningDimensions[0], remaningDimensions.slice(1))
    );
  }
  return returnArray(dimensions[0], dimensions.slice(1));
};

module.exports = {
  toBinaryString,
  zeros,
};
