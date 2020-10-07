const {mergeSort2} = require("../../src/problems/Sorts");
const {quickSort} = require("../../src/problems/Sorts");

describe("Search problem test suite",()=>{
    describe("binarySearch", ()=>{
        test("test 1",()=>{
            const arr = [20,5,10,8,12];
            const sorted = quickSort(arr,100);
            expect(sorted).toEqual([5,8,10,12,20]);
        })
    });

    describe("merge sort", ()=>{
        test("test", ()=>{
            let a = [3,10,1,20,11];

            expect(mergeSort2(a)).toEqual([1,3,10,11,20]);
        })
    })
});
