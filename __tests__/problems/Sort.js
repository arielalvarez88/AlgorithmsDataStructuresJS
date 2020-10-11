const {mergeSort2, insertionSort2} = require("../../src/problems/Sorts");
const {quickSort} = require("../../src/problems/Sorts");

describe("Search problem test suite",()=>{
    describe("binarySearch", ()=>{
        test("test 1",()=>{
            const arr = [20,5,10,8,12];
            const sorted = quickSort(arr,100);
            expect(sorted).toEqual([5,8,10,12,20]);
        })
    });

    describe("Sorts", ()=>{
        describe("edge cases", ()=>{
            describe("1 length array",()=>{
                let a;
                beforeEach(()=>{
                    a = [3];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(a);
                });
            });
            describe("0 length array",()=>{
                let a;
                beforeEach(()=>{
                    a = [];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(a);
                });
            });
            describe("2 length array",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [3,2];
                    result = [2,3];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(result);
                });
            });
            describe("All the same",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [2,2,2];
                    result = [a];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(result);
                });
            });

        });
        describe("normal cases", ()=>{
            describe("already sorted",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [10,11,12,20,100];
                    result = a;
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(a);
                });
            });
            describe("input: [100,1,3,2,30]",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [100,1,3,2,30];
                    result = [1,2,3,30,100];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(result);
                });
                test("mergeSort2 function", ()=>{

                    expect(mergeSort2(a)).toEqual(result);
                })
            });
            describe("input: [100, 200, 10, 1000, 2000]",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [100, 200, 10, 1000, 2000];
                    result = [10, 100, 200, 1000, 2000];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(result);
                });
            });

            describe("Repeating values: [200, 100, 1000, 100, 2000]",()=>{
                let a, result;
                beforeEach(()=>{
                    a = [200, 100, 1000, 100, 2000];
                    result = [100, 100, 200, 1000, 2000];
                });
                test("insertionSort2 function", ()=>{
                    expect(insertionSort2(a)).toEqual(result);
                });
            });

        });
    })

    describe("merge sort", ()=>{
        test("test", ()=>{
            let a = [3,10,1,20,11];

            expect(mergeSort2(a)).toEqual([1,3,10,11,20]);
        })
    })
});
