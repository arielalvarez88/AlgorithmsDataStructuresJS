 function binarySearch(arr, a, initial=0){
    if(!arr || !(arr instanceof Array) || arr.length <= 0 || typeof a !== 'number')
        return null;

    const middle = Math.floor(arr.length / 2);

    if(arr[middle] === a)
        return initial + middle;
    if(arr[middle] > a)
        return binarySearch(arr.slice(0,middle), a, initial);
    else
        return binarySearch(arr.slice(middle+1, arr.length), a, initial + middle + 1);

}

 function binarySearch2(arr, val, initial=0){
    if(arr.length === 0){
        return null;
    }

   let middle = Math.ceil(arr.length/2);
   if(arr[middle] === val){
       return initial + middle;
   }

   if(val < arr[middle]){
       return binarySearch2(arr.slice(0,middle),val,0);
   }
   else{
       return binarySearch2(arr.slice(middle+1,arr.length), val, middle+1)
   }

   return null;
 }

 module.exports = {
    binarySearch,
     binarySearch2
 };
