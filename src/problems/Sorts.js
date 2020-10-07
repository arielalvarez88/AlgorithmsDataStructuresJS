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


module.exports={
    quickSort,
    mergeSort,
    mergeSort2,
};
