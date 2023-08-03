const { toBinaryString, zeros } = require("../utils");

function factorial(x) {
  if (x <= 1) {
    return x;
  }

  return x * factorial(x - 1);
}

function updateReponse({
  deltaXSide1,
  deltaYSide1,
  delta,
  minArea,
  rectanglePoints,
  pair1,
  pair2,
}) {
  let size1 = Math.sqrt(deltaXSide1 * deltaXSide1 + deltaYSide1 * deltaYSide1);
  let deltasOtherSide = delta
    .split(", ")
    .map((deltaInString) => Number(deltaInString));
  let size2 = Math.sqrt(
    deltasOtherSide[0] * deltasOtherSide[0] +
      deltasOtherSide[1] * deltasOtherSide[1]
  );
  let areaOfRectangle = size1 * size2;

  if (!minArea || areaOfRectangle < minArea) {
    return {
      newMinArea: areaOfRectangle,
      newRectanglePoints: [...pair1, ...pair2],
    };
  }
  return { newMinArea: minArea, newRectanglePoints: rectanglePoints };
}

function checkIfFormRectangle(pair1, pair2) {
  let m = null;

  let deltaX = pair1[1][0] - pair1[0][0];
  let deltaY = pair1[1][1] - pair1[0][1];
  let isRectangle;

  let deltaXSide1 = pair2[0][0] - pair1[0][0];
  let deltaYSide1 = pair2[0][1] - pair1[0][1];

  let deltaXSide2 = pair2[1][0] - pair1[1][0];
  let deltaYSide2 = pair2[1][1] - pair1[1][1];

  if (deltaX === 0) {
    if (deltaYSide1 === 0 && deltaYSide2 === 0) {
      isRectangle = true;
    }
    isRectangle = false;
  } else {
    m = deltaY / deltaX;
    if (m === 0 && deltaXSide1 === 0 && deltaXSide2 === 0) {
      isRectangle = true;
    } else if (deltaXSide1 === 0 || deltaXSide2 === 0) {
      isRectangle = false;
    } else {
      let m1 = deltaYSide1 / deltaXSide1;
      let m2 = deltaYSide2 / deltaXSide2;
      isRectangle = -1 * m * m1 === 1 && -1 * m * m2 === 1;
    }
  }

  return { deltaXSide1, deltaYSide1, isRectangle };
}

function minAreaFreeRect(points) {
  points = points.sort((point1, point2) => {
    if (point1[0] < point2[0]) {
      return -1;
    } else if (point1[0] > point2[0]) {
      return 1;
    } else if (point1[1] > point2[1]) {
      return 1;
    } else if (point1[1] < point2[1]) {
      return -1;
    }
    return 0;
  });

  let deltasToPairOfPoints = {};
  let minArea = 0;
  let rectanglePoints = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      p1 = points[i];
      p2 = points[j];
      deltaX = p2[0] - p1[0];
      deltaY = p2[1] - p1[1];
      const key = `${deltaX}, ${deltaY}`;
      if (!(key in deltasToPairOfPoints)) {
        deltasToPairOfPoints[key] = [];
      }
      deltasToPairOfPoints[key].push([p1, p2]);
    }
  }

  for (let [delta, pairs] of Object.entries(deltasToPairOfPoints)) {
    for (let i = 0; i < pairs.length; i++) {
      let pair1 = pairs[i];
      for (let j = i + 1; j < pairs.length; j++) {
        let pair2 = pairs[j];

        let { deltaXSide1, deltaYSide1, isRectangle } = checkIfFormRectangle(
          pair1,
          pair2
        );
        if (isRectangle) {
          const { newMinArea, newReactanglePoints } = updateReponse({
            deltaXSide1,
            deltaYSide1,
            delta,
            minArea,
            rectanglePoints,
            pair1,
            pair2,
          });
          minArea = newMinArea;
          rectanglePoints = newReactanglePoints;
        }
      }
    }
  }
  console.log("Points: ", rectanglePoints);
  return minArea;
}

const maxIncreaseKeepingSkyline = function (grid) {
  let maxRows = [];
  let maxCols = [];
  let col = 0;
  let allowedToIncreaseSum = 0;
  for (let i = 0; i < grid.length; i++) {
    let maxRow = Math.max.apply(Math, grid[i]);
    let colArr = [];
    for (let j = 0; j < grid.length; j++) {
      colArr.push(grid[j][col]);
    }
    let maxCol = Math.max.apply(Math, colArr);
    maxRows.push(maxRow);
    maxCols.push(maxCol);
    col++;
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let maxAllowed = Math.min(maxRows[i], maxCols[j]);
      if (grid[i][j] < maxAllowed) {
        allowedToIncreaseSum += maxAllowed - grid[i][j];
      }
    }
  }
  return allowedToIncreaseSum;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) {
  for (let i = 0; i < nums.length - k + 1; i++) {
    // k+2 times
    for (let j = nums.length - 1; j > i; j--) {
      // k+1 (n-k) times
      if (nums[j] < nums[j - 1]) {
        let swap = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = swap;
      }
    }
  }

  return nums[nums.length - k];
};

const countInversionMergeSort = function (arr) {
  let count = 0;
  function merge(arr, i, j, middle) {
    const newArr = [];
    let inversions = 0;
    let i1 = i,
      j1 = middle + 1;
    for (let pointer = 0; pointer < j - i + 1; pointer++) {
      if (i1 <= middle && (j1 > j || arr[i1] <= arr[j1])) {
        newArr.push(arr[i1]);
        i1++;
      } else {
        newArr.push(arr[j1]);
        j1++;
        inversions += middle - i1 + 1;
      }
    }
    arr.splice(i, j - i + 1, ...newArr);
    return inversions;
  }

  function mergeSort(arr, i, j) {
    if (j - i <= 0) {
      return arr;
    }
    let middle = i + Math.floor((j - i) / 2);
    mergeSort(arr, i, middle);
    mergeSort(arr, middle + 1, j);
    const inversions = merge(arr, i, j, middle);
    count += inversions;
  }

  mergeSort(arr, 0, arr.length - 1);
  return { sorted: arr, inversions: count };
};

/**
 * @param {number[]} deck
 * @return {number[]}
 */
const deckRevealedIncreasing = function (deck) {
  const { sorted } = countInversionMergeSort(deck);

  function interleave(arr, p, q, r) {
    if (r - p <= 0) {
      return;
    }
    let result = [];
    let i = p,
      j = q + 1;

    for (let k = 0; k < r - p + 1; k++) {
      if (k % 2 === 0) {
        result.push(arr[i]);
        i++;
      } else {
        result.push(arr[j]);
        j++;
      }
    }
    arr.splice(p, r - p + 1, ...result);
    return arr;
  }

  function divideAndInterleave(arr, p, r) {
    if (r - p <= 0) {
      return arr;
    }
    const q = p + Math.floor((r - p) / 2);
    const oddNumber = (r - p + 1) % 2 !== 0;
    divideAndInterleave(arr, oddNumber ? q : q + 1, r);
    return interleave(arr, p, q, r);
  }
  return divideAndInterleave(sorted, 0, deck.length - 1);
};

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start) {
  let visited = new Map();
  function dfs(i, result) {
    if (i + arr[i] === i) {
      return true;
    }

    visited.set(i);

    if (!result && i + arr[i] < arr.length && !visited.has(i + arr[i])) {
      result = result || dfs(i + arr[i], result);
    }

    if (!result && i - arr[i] >= 0 && !visited.has(i - arr[i])) {
      result = result || dfs(i - arr[i], result);
      1;
    }

    return result;
  }

  return dfs(start, false);
};

/**
 *
 * @param {BinaryTreeNode} root
 * @param {BinaryTreeNode} newNode
 * @returns {boolean}
 */
function placeInBinarySearchTree(root, newNode) {
  if (!root || !newNode) {
    return false;
  }
  function dfs(n) {
    let nextNode = n.value < newNode.value ? "right" : "left";
    if (!n[nextNode]) {
      n[nextNode] = newNode;
      return;
    } else {
      return dfs(n[nextNode]);
    }
  }
  dfs(root);
  return true;
}

function packAnagrams(strings) {
  if (!strings || strings.length == 0) {
    return [];
  }

  let sortedStrings = [];
  let anagramIndices = [];
  function getIndicesThatAreAnagrams(strings) {
    for (let i = 0; i < strings.length; i++) {
      sortedStrings.push(
        [...strings[i]].sort((a, b) => {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })
      );
    }
    for (let i = 0; i < sortedStrings.length; i++) {
      for (let j = i + 1; j < sortedStrings.length; j++) {
        if (sortedStrings[i].join("") === sortedStrings[j].join("")) {
          anagramIndices.push(i, j);
        }
      }
    }
    return anagramIndices;
  }

  function packAnagrams(strings, anagramIndices) {
    let i = 0;

    while (anagramIndices.length > 0) {
      let swap = strings[i];
      strings[i] = strings[anagramIndices[0]];
      strings[anagramIndices[0]] = swap;
      anagramIndices.shift();
      i++;
    }
  }

  anagramIndices = getIndicesThatAreAnagrams(strings);
  return packAnagrams(strings, anagramIndices);
}

function editDistance(word1, word2) {
  const distances = [];
  for (let i = 0; i <= word1.length; i++) {
    if (!(i in distances)) {
      distances[i] = [];
    }
    distances[i][0] = i;
  }

  for (let j = 0; j <= word2.length; j++) {
    if (!(j in distances[0])) {
      distances[0][j] = [];
    }
    distances[0][j] = j;
  }

  for (let i = 1; i <= word1.length; i++) {
    distances[0][i] = i;
    for (let j = 1; j <= word2.length; j++) {
      const distanceInLetter = word1[i] === word2[j] ? 0 : 1;
      distances[i][j] = Math.min(
        1 + distances[i - 1][j], // Will add a letter
        1 + distances[i][j - 1], // Will remove a letter
        distanceInLetter + distances[i - 1][j - 1]
      );
    }
  }
  return distances[word1.length][word2.length];
}

function knapsackWithRepetition(weights, values, capacity) {
  let capacityToMaxValue = { 0: 0 };

  function calculateMaxValue(weights, values, capacity) {
    const allVals = [0];
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] === 0) {
        throw new Error("Item weight cannot be 0");
      }
      const newCapacity = capacity - weights[i];
      if (newCapacity < 0) {
        continue;
      }
      if (!(newCapacity in capacityToMaxValue)) {
        capacityToMaxValue[newCapacity] = calculateMaxValue(
          weights,
          values,
          newCapacity
        );
      }
      allVals.push(capacityToMaxValue[newCapacity] + values[i]);
    }
    return Math.max(...allVals);
  }

  return calculateMaxValue(weights, values, capacity);
}

function knapsackWithoutRepetition(weights, values, capacity) {
  if (!weights || !values || typeof capacity !== "number") {
    throw new Error(
      "Invalid input, weights and values must be arrays of numbers, and capacity must be a number"
    );
  }
  if (weights.length !== values.length) {
    throw new Error("Weights and values must be the same length");
  }
  const k = [];
  k[0] = [];
  for (let i = 0; i <= weights.length; i++) {
    k[0].push(0);
  }
  for (let w = 1; w <= capacity; w++) {
    k[w] = [0];
  }

  function calculateMaxVal(maxCapacity, j) {
    if (maxCapacity in k && j in k[maxCapacity]) {
      return k[maxCapacity][j];
    }
    for (let w = 1; w <= maxCapacity; w++) {
      for (let item = 1; item <= j; item++) {
        if (weights[item - 1] > w) {
          k[w][item] = calculateMaxVal(w, item - 1);
          continue;
        }
        k[w][j] = Math.max(
          calculateMaxVal(w, item - 1),
          calculateMaxVal(w - weights[item - 1], item - 1) + values[item - 1]
        );
      }
    }
    return k[maxCapacity][j];
  }

  return calculateMaxVal(capacity, weights.length);
}

function knapsackWithRepetition2(weights, values, capacity) {
  const weightToMaxValue = { 0: 0 };
  const getMaxValueOfCapacity = (w) => {
    const setOfMaxVals = [0];
    for (let i = 0; i < weights.length; i++) {
      const newCapacity = w - weights[i];
      if (newCapacity < 0) {
        continue;
      }
      // if (!(newCapacity in weightToMaxValue)) {
      //   weightToMaxValue[newCapacity] = getMaxValueOfCapacity(w);
      // }
      setOfMaxVals.push(weightToMaxValue[newCapacity] + values[i]);
    }
    return Math.max(...setOfMaxVals);
  };
  for (let w = 1; w <= capacity; w++) {
    weightToMaxValue[w] = getMaxValueOfCapacity(w);
  }
  return weightToMaxValue[capacity];
}

function getChainMultiplicationMinCost(...matrices) {
  const n = matrices.length;
  const C = zeros([n, n], Number.MAX_SAFE_INTEGER);
  for (let i = 1; i <= n; i++) {
    C[i - 1][i - 1] = 0;
  }
  function costsWithValuesOfK(C, i, j) {
    const costs = [Number.MAX_SAFE_INTEGER];
    for (let k = i; k < j; k++) {
      costs.push(
        C[i - 1][k - 1] +
          C[k + 1 - 1][j - 1] +
          matrices[i - 1].dimensions[0] *
            matrices[k - 1].dimensions[1] *
            matrices[j - 1].dimensions[1]
      );
    }
    return costs;
  }

  for (let s = 1; s <= n - 1; s++) {
    for (let i = 1; i <= n - s; i++) {
      j = i + s;
      C[i - 1][j - 1] = Math.min(...costsWithValuesOfK(C, i, j));
    }
  }
  return C[1 - 1][n - 1];
}

module.exports = {
  factorial,
  maxIncreaseKeepingSkyline,
  minAreaFreeRect,
  findKthLargest,
  countInversionMergeSort,
  deckRevealedIncreasing,
  canReach,
  placeInBinarySearchTree,
  packAnagrams,
  editDistance,
  knapsackWithRepetition,
  knapsackWithRepetition2,
  knapsackWithoutRepetition,
  getChainMultiplicationMinCost,
};
