const {mergeSort2, insertionSort2, mergeWithIndexes} = require("../../src/problems/Sorts");
const {quickSort} = require("../../src/problems/Sorts");

describe("Search problem test suite",()=>{
    describe("binarySearch", ()=>{
        test("test 1",()=>{
            const arr = [20,5,10,8,12];
            const sorted = quickSort(arr,100);
            expect(sorted).toEqual([5,8,10,12,20]);
        })
    });

    describe(`MIT Intro to algo: 2.3-2 Rewrite the MERGE procedure so that it does not use sentinels, instead 
        stopping once either array L or R has had all its elements copied back to A and then copying the remainder of 
        the other array back into A.`, ()=>{

        describe("Edge cases", ()=>{
            describe("1 elem array", ()=>{
                let arr, solution, startFirst, endFirst, endSec;
                beforeEach(()=>{
                    arr = [1];
                    startFirst = 0;
                    endFirst = 0;
                    endSec = 0;
                    solution = [1];
                });
               test("mergeWithIndexes function in Sorts module", ()=>{
                  expect(mergeWithIndexes(arr, startFirst, endFirst, endSec)).toEqual(solution);
               });
            });
            describe("0 elem array", ()=>{
                let arr, solution, startFirst, endFirst, endSec;
                beforeEach(()=>{
                    arr = [];
                    solution = [];
                });
                test("mergeWithIndexes function in Sorts module", ()=>{
                    expect(mergeWithIndexes(arr, startFirst, endFirst, endSec)).toEqual(solution);
                });
            });
        });

        describe("Middle range inputs", ()=>{
            describe("Pair number of elements array, with repetitive numbers", ()=>{
                let arr, solution, startFirst, endFirst, endSec;
                beforeEach(()=>{
                    arr = [3, 25, 100, 100, 1, 4];
                    startFirst = 0;
                    endFirst = 3;
                    endSec = arr.length - 1;
                    solution = [1,3,4,25, 100, 100]
                });
                test("mergeWithIndexes function in Sorts module", ()=>{
                    expect(mergeWithIndexes(arr, startFirst, endFirst, endSec)).toEqual(solution);
                });
            });

            describe("Odd number of elements array, with repetitive numbers", ()=>{
                let arr, solution, startFirst, endFirst, endSec;
                beforeEach(()=>{
                    arr = [3, 100, 100, 110, 1, 4, 25];
                    startFirst = 0;
                    endFirst = 3;
                    endSec =  arr.length -1;
                    solution = [1, 3, 4, 25, 100, 100, 110]
                });
                test("mergeWithIndexes function in Sorts module", ()=>{
                    expect(mergeWithIndexes(arr, startFirst, endFirst, endSec)).toEqual(solution);
                });
            });

        });


    });

    describe(`2.3-4 We can express insertion sort as a recursive procedure as follows. In order to sort A[1..n], 
        we recursively sort A[1..n-1] and then insert A[n] into the sorted array A[1 : n-1]. Write a recurrence for 
        the running time of this recursive version of insertion sort.`, ()=>{

        describe("Recursive insertion sort", ()=>{
           describe("", ()=>{

           });
        });
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
