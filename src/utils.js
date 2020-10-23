/**
 *
 * @param {Number} n
 * @returns {{binary: *, ones: *}}
 */
const toBinaryString = function (n){

    let numberOfBits = Math.floor(Math.log2(n)) + 1;
    let binaryRepresentation = [];
    let sum = 0;
    let ones = [];
    for(let i = numberOfBits -1; i >= 0; i--) {
        if ((sum + Math.pow(2, i)) <= n) {
            binaryRepresentation.push(1);
            sum = sum + Math.pow(2, i);
            ones.push(i);

        } else {
            binaryRepresentation.push(0);
        }
    }
    return {ones, binary: binaryRepresentation.join('')};
};

module.exports = {
    toBinaryString
};
