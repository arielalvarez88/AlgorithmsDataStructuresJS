const {binarySearch, binarySearch2} = require("../../src/problems/Search");

describe("Search problem test suite",()=>{
    describe("BinarySearch tests", ()=>{
        test("Normal values: test 1",()=>{
            const arr = [5,8,10,12,20];
            const index = binarySearch(arr,100);
            expect(index).toEqual(null);
        });

        test("Normal values: test 2 with different implementaiton", ()=>{
            let sortedArray = [1,20,34,50,65,70,80];
            let idx = binarySearch2(sortedArray, 80);
            expect(idx).toEqual(sortedArray.length-1);
        });
    });

});
