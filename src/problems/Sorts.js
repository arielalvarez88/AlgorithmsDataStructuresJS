//Insertion sort. Memory = O(1), Performance O(n^2)
//TODO test
function insertionSort(arr){
    for(let i = 0; i<arr.length; i++){
        for(let j =i; j > 0; j--){
            if(arr[j-1] > arr[j]){
                let swap = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = swap;
            }
        }
    }
    return arr;
}

/**
 *
 * @param {Array} arr
 * @param {Number} target
 * @returns {Number} index where the target is within the array arr. If targe is not present returns -1.
 */
function binarySearch(arr, target){
    if(!Array.isArray(arr) || typeof target !== 'number' ){
        throw new TypeError("First parameter should be an array and second param should be a number.");
    }
    if(arr.length <= 0){
        return -1;
    }

    if(arr.length > 0){

    }

    function _binarySearch (subArr, minIndex){
        const middle = Math.ceil((subArr.length - 1 )/ 2);
        if(subArr[middle] === target){
            return minIndex + middle;
        }
        if(subArr.length <= 1){
            return -1;
        }
        const leftSideResult = _binarySearch(subArr.slice(0, middle-1), 0);
        const rightSideResult = _binarySearch(subArr.slice(middle+1), minIndex + middle + 1);
        return leftSideResult >= 0? leftSideResult : rightSideResult;
    };

    return _binarySearch(arr, 0);
}

function bubbleSort(arr){
    let initalDone = false;
    for(let i =0; i<arr.length-1; i++){
        if(arr[i] > arr[i+1]){
            let swap = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = swap;
            if(initialDone){
                i = -1;
            }
        }
        if(i+1 === arr.length -1 && !initialDone){
            initialDone = true;
            i = -1;
        }
    }
}

function mergeSort(arr, i = 0, j = arr.length - 1){
    if(i==j){//1,5,6,7,
        return [arr[i]];//7,
    }
    if(j-i == 1){//5,6,
        let newArr = [];//5,6,
        newArr.push(arr[j] > arr[i] ? arr[i] : arr[j]); //6,
        newArr.push(arr[j] > arr[i] ? arr[j] : arr[i]);//6,
        return newArr;//6,
    }
    let middle = Math.floor((j-i)/2) + i;//5,
    let leftHalf = mergeSort(arr, i , middle);//1,5,
    let rightHalf = mergeSort(arr, middle+1, j);//1,5,1+
    let newArr = [];//5,1+
    let finalLength = leftHalf.length + rightHalf.length;//5,1+
    let k = 0;//5,1+
    let z = 0;//5,1+
    for(let a =0; a < finalLength; a++){//2,2,2,5,5,5,5,1+,1+,1+,1+,1+,1+,1+
        if(z >= rightHalf.length || (k < leftHalf.length && leftHalf[k] < rightHalf[z])){//2,2,2,5,5,5,1+,1+,1+,1+,1+,1+
            newArr.push(leftHalf[k]);//2,2,5,5,1+,1+,1+,
            k++;//2,2,5,5,1+,1+,1+,1+
        }else{//2,2,2,
            newArr[a] = rightHalf[z];//2,2,2,5,1+,1+
            z++;//2,2,2,5,1+,1+,
        }
    }
    return newArr;
}

function quickSort(arr){

    function partition(arr, low, high){
        let pivot = high;
        for(let i = low; i<= pivot; i++){
            if(arr[i] > arr[pivot]){
                const bigger = arr[i];
                arr.splice(i,1);
                arr.splice(pivot,0,bigger);
                i=low;
                pivot--;
            }

        }
        return pivot;
    }

    function _quickSort(arr,low,high){
        if(high-low < 1){
            return arr;
        }
        let pivot = partition(arr, low, high);
        _quickSort(arr,low, pivot-1);
        _quickSort(arr,pivot+1, high);
        return arr;
    }

    return _quickSort(arr,0,arr.length-1);
}

let mergeSort2 = (x)=>{
    if(x.length === 1){
        return x;
    }
    if(x.length === 2){
        let first = x[0] <= x[1] ? x[0] : x[1];
        let second = first === x[0] ? x[1] : x[0];
        return [first, second];
    }
    let middle = Math.ceil(x.length/2);
    let sortedFirstHalf = mergeSort2(x.slice(0,middle));
    let sortedSecondHalf = mergeSort2(x.slice(middle,x.length));
    return merge(sortedFirstHalf, sortedSecondHalf)
};

let merge = (firstHalf, secondHalf)=>{
    let max = firstHalf.length > secondHalf.length? firstHalf.length : secondHalf.length;
    let i=0, j=0;
    let finalArr = [];
    for(let h=0; h < max; h++){
        let firstElem = i < firstHalf.length? firstHalf[i] : null;
        let secondElem = j < secondHalf.length? secondHalf[j] : null;
        if(!secondElem || firstElem < secondElem){
                finalArr.push(firstElem);
                i++;
        }
        if(!firstElem || secondElem < firstElem){
            finalArr.push(secondElem);
            j++;
        }

    }
    return finalArr;
};

/**
 *
 * @param {Array} Arr
 * @param {Number} startFirst
 * @param {Number} endFirst
 * @param {Number} endSec
 * @returns {Array}
 */
const mergeWithIndexes = function (Arr, startFirst, endFirst, endSec){
    if(!Array.isArray(Arr)){
        throw TypeError("Arr para needs to be an instance of Array");
    }
    if( Arr.length <= 0 || Arr.length === 1){
        return Arr;
    }

    let i = 0, j = 0;
    const firstSub = Arr.slice(startFirst, endFirst+1);
    const secondSub = Arr.slice(endFirst+1, endSec+1);
    for(let k = startFirst; k <= endSec; k++){
        if(j >= secondSub.length || i < firstSub.length && firstSub[i] <= secondSub[j]){
            Arr[k] = firstSub[i];
            i++;
        }else{
            Arr[k] = secondSub[j];
            j++;
        }
    }
    return Arr;
};

/**
 *
 * Merge 2 contiguos and ordered sub-arrays into 1 ordered array and substitute in place the two sub-arrays by the final
 * ordered array (sub array 1 starts at p, and the last index is at q. Sub array 2 starts at q+1 and ends at r index inclusive).
 *
 * @param {Array} A
 * @param {Number} p - lower index of the first sub-array
 * @param {Number} q - last index of first sub-array
 * @param {Number} r - last index of second sub-array
 * @returns {Array} sorted array
 */
const merge2 =  function (A,p,q,r){
    let left = A.slice(p, q+1);
    left.push(Number.MAX_SAFE_INTEGER);
    let right = A.slice(q+1, r+1);
    right.push(Number.MAX_SAFE_INTEGER);
    let response = [];
    for (i = 0; i < r-p +1; i++){
        if(left[0] <= right[0]){
            A.splice(p+i, 1, left.shift());
        }else{
            A.splice(p+i, 1, right.shift());
        }
    }

    return A;
};



const insertionSort2 = (arr)=>{
    for(let i = 0; i < arr.length; i++){
        const current = arr[i];
        let j = i;
        while(j > 0 && current < arr[j - 1]){
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = current;
    }
    return arr;
};


module.exports={
    quickSort,
    mergeSort2,
    mergeWithIndexes,
    insertionSort2,
    binarySearch,
};
