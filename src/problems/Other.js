const {toBinaryString} = require("../utils");

function factorial(x){

    if(x <= 1){
        return x;
    }

    return x * factorial(x-1);
}


function updateReponse({deltaXSide1, deltaYSide1, delta, minArea, rectanglePoints, pair1, pair2}) {
    let size1 = Math.sqrt((deltaXSide1 * deltaXSide1) + (deltaYSide1 * deltaYSide1));
    let deltasOtherSide = delta.split(", ").map((deltaInString) => (Number(deltaInString)));
    let size2 = Math.sqrt((deltasOtherSide[0] * deltasOtherSide[0]) + (deltasOtherSide[1] * deltasOtherSide[1]));
    let areaOfRectangle = size1 * size2;

    if (!minArea || areaOfRectangle < minArea) {
        return {newMinArea: areaOfRectangle, newRectanglePoints: [...pair1, ...pair2]};
    }
    return {newMinArea: minArea, newRectanglePoints: rectanglePoints};

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

    if(deltaX === 0){
        if(deltaYSide1 === 0 && deltaYSide2 === 0){
            isRectangle = true;
        }
        isRectangle= false;
    }else{
        m = deltaY/deltaX;
        if(m === 0 && (deltaXSide1 === 0 && deltaXSide2 === 0)){
            isRectangle = true;
        }
        else if(deltaXSide1 === 0 || deltaXSide2 === 0){
            isRectangle= false;
        }else{
            let m1 = deltaYSide1/deltaXSide1;
            let m2 = deltaYSide2/deltaXSide2;
            isRectangle = (-1 * m * m1)  === 1 && (-1 * m * m2 === 1);
        }
    }

    return {deltaXSide1, deltaYSide1, isRectangle};
}

function minAreaFreeRect(points)
{
    points = points.sort((point1, point2)=>{
       if(point1[0] < point2[0]){
           return -1;
       }else if(point1[0] > point2[0]){
           return 1;
       }else if( point1[1] > point2[1]){
           return 1;
       }else if( point1[1] < point2[1]){
            return -1;
       }
       return 0;
    });

    let deltasToPairOfPoints = {};
    let minArea = 0;
    let rectanglePoints = [];


    for(let i = 0; i < points.length ; i++){
        for(let j = i+1; j < points.length; j++){
            p1 = points[i];
            p2 = points[j];
            deltaX = p2[0] - p1[0]
            deltaY = p2[1] - p1[1]
            const key = `${deltaX}, ${deltaY}`;
            if(!(key in deltasToPairOfPoints)){
                deltasToPairOfPoints[key] = []
            }
            deltasToPairOfPoints[key].push([p1,p2])
        }
    }

    for(let [delta, pairs] of Object.entries(deltasToPairOfPoints)){
        for(let i = 0; i < pairs.length; i++){
            let pair1 = pairs[i];
            for(let j = i+1; j < pairs.length; j++){
                let pair2 = pairs[j];

                let {deltaXSide1, deltaYSide1, isRectangle} = checkIfFormRectangle(pair1, pair2);
                if(isRectangle){
                    const {newMinArea, newReactanglePoints } = updateReponse({deltaXSide1, deltaYSide1, delta, minArea, rectanglePoints, pair1, pair2});
                    minArea = newMinArea;
                    rectanglePoints = newReactanglePoints;
                }
            }
        }
    }
    console.log("Points: ", rectanglePoints);
    return minArea;
};


 const maxIncreaseKeepingSkyline = function(grid) {
        let maxRows = [];
        let maxCols = [];
        let col = 0;
        let allowedToIncreaseSum = 0;
        for(let i =0; i < grid.length; i++){
            let maxRow = Math.max.apply(Math, grid[i]);
            let colArr = [];
            for(let j = 0; j < grid.length; j++){
                colArr.push(grid[j][col]);
            }
            let maxCol = Math.max.apply(Math, colArr);
            maxRows.push(maxRow);
            maxCols.push(maxCol);
            col++;
        }
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j ++){
                let maxAllowed = Math.min(maxRows[i], maxCols[j])
                if(grid[i][j] < maxAllowed){
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
const findKthLargest = function(nums, k) {
    for(let i =0; i < (nums.length - k + 1); i++){ // k+2 times
        for(let j = nums.length-1; j > i; j--){ // k+1 (n-k) times
            if(nums[j] < nums[j-1]){
                let swap = nums[j];
                nums[j] = nums[j-1];
                nums[j-1] = swap;
            }
        }
    }

    return nums[nums.length - k];
};

const countInversionMergeSort = function(arr){
    let count = 0;
   function merge(arr, i, j, middle){
       const newArr = [];
        let inversions = 0;
        let i1 = i , j1 = middle+1;
        for(let pointer =0; pointer < (j-i+1); pointer++){
            if(i1 <= middle && ( j1 > j  || arr[i1] <= arr[j1]) ){
                newArr.push(arr[i1]);
                i1++;
            }else{
                newArr.push(arr[j1]);
                j1++;
                inversions += middle - i1 + 1;
            }
        }
        arr.splice(i, j-i+1, ...newArr);
        return inversions;
   }


   function mergeSort(arr, i, j){
       if(j-i <= 0){
           return arr;
       }
        let middle = i + Math.floor((j - i) / 2)
        mergeSort(arr, i, middle);
        mergeSort(arr, middle+1, j);
        const inversions = merge(arr, i, j, middle);
        count += inversions;
   }


   mergeSort(arr, 0 , arr.length-1);
   return {sorted: arr, inversions: count};
};

/**
 * @param {number[]} deck
 * @return {number[]}
 */
const deckRevealedIncreasing = function(deck) {
    const {sorted}  = countInversionMergeSort(deck);

    function interleave(arr, p, q, r){
        if(r-p <= 0){
           return;
        }
        let result = [];
        let i = p, j=q+1;

        for(let k = 0; k < (r-p+1); k++){
            if(k % 2 === 0){
             result.push(arr[i]);
             i++;
            }else{
              result.push(arr[j]);
              j++;
            }
        }
        arr.splice(p, r-p+1, ...result);
        return arr;
    }

    function divideAndInterleave(arr, p, r){

        if(r - p <= 0){
            return arr;
        }
        const q =  p + Math.floor ((r - p)/2);
        const oddNumber = (r-p+1) % 2 !== 0;
        divideAndInterleave(arr, oddNumber? q : q+1, r);
        return interleave(arr, p, q, r);
    };
    return divideAndInterleave(sorted, 0, deck.length-1);
};

module.exports = {factorial, maxIncreaseKeepingSkyline, minAreaFreeRect, findKthLargest, countInversionMergeSort, deckRevealedIncreasing};