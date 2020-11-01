const {canReach} = require("../../src/problems/Other");
const {deckRevealedIncreasing} = require("../../src/problems/Other");
const {countInversionMergeSort} = require("../../src/problems/Other");
const {factorial, maxIncreaseKeepingSkyline, findKthLargest,minAreaFreeRect} = require("../../src/problems/Other");
describe("Other problems", ()=>{

    describe("Write a function to calculate the factorial of a number", ()=>{

            test("Normal use case", ()=>{
                expect(factorial(5)).toBe(120);
            })
    })

    describe("Leetcode: 807. Max Increase to Keep City Skyline", ()=>{
       describe("Input provided", ()=>{
            let skyline, result;
            beforeEach(()=>{
                skyline = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]];
                result = 35;
            });
            test("My first solution: OtherProblems.maxIncreaseKeepingSkyline", ()=>{
                expect(maxIncreaseKeepingSkyline(skyline)).toEqual(result)
            });
       });
    });

    describe(`Interview with Raymundo: Write a function that given a number K and movie object 
        with structure { name: string, rating: number, similar movies: [{[string]: movie}]}, returns top K movies that 
        are similar to the given movie with the highest rating`, ()=>{
       describe(`Movie A -> Movie B (rating: 5), Movie C (rating: 8). Then Movie C -> Movie D (rating 10), Movie E 
           ( rating 1)`, ()=>{
           let movieGiven, solution, k;
           beforeAll(()=>{
               let movieB = {name: "movieB", rating: 5, similarMovies: []};
               let movieD = {name: "movieD", rating: 10, similarMovies: []};
               let movieE = {name: "movieE", rating: 1, similarMovies: []};
               let movieC = {name: "movieC", rating: 8, similarMovies: [movieD, movieE]};
               movieGiven =  {name: "movieA", rating: 1, similarMovies: [movieB, movieC]};
               k = 3;
               solution = [movieD, movieC, movieB];
           });
           test(`Solution 1: Get everything into an array, then sort the array with bubble sort to take advantage
            in bubble sort's property that everything to the left of the pointer is sorted. That way I don't have to sort
            the whole array`, ()=>{

               function getTopKMovies(givenMovie, k){
                   let visitedMovies = new Set();
                   function dfs(movie){
                       if(movie !== givenMovie){
                           visitedMovies.add(movie);
                       }

                        for(let similarMovie of movie.similarMovies){
                            if(!visitedMovies.has(similarMovie)){
                                dfs(similarMovie)
                            }
                        }
                   }
                   dfs(givenMovie);
                   visitedMovies = [...visitedMovies];
                   for(let i = 0; i < k; i++){
                       for(let j = visitedMovies.length - 1;  j > i; j--){
                           if(visitedMovies[j].rating > visitedMovies[j-1].rating){
                               let swap = visitedMovies[j];
                               visitedMovies[j] = visitedMovies[j-1];
                               visitedMovies[j-1] = swap;
                           }
                       }
                   }

                   return visitedMovies.slice(0,k);
               }

               let mySolution = getTopKMovies(movieGiven, k);
               expect(mySolution).toEqual(solution);


           })

       });
    });

    describe(`Leetcode 963 -  Minimum Area Rectangle II :  https://leetcode.com/problems/minimum-area-rectangle-ii/`, ()=>{
        test("Example Input 1 from Leetcode" , ()=>{
            let input = [[0,1],[2,1],[1,1],[1,0],[2,0]];
            expect(minAreaFreeRect(input)).toEqual(1.0);
        });

        test("Example Input 2 from Leetcode" , ()=>{
            let input = [[1,2],[2,1],[1,0],[0,1]];
            let epsilon = 0.000001;
            let min = 2.0 - epsilon;
            let max = 2.0 + epsilon;

            let result = minAreaFreeRect(input);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test("Example Input 3 from Leetcode" , ()=>{
            let input = [[0,3],[1,2],[3,1],[1,3],[2,1]];
            expect(minAreaFreeRect(input)).toEqual(0);
        });

        test("Example Input 4 from Leetcode" , ()=>{
            let input = [[3,1],[1,1],[0,1],[2,1],[3,3],[3,2],[0,2],[2,3]];
            expect(minAreaFreeRect(input)).toEqual(2.0);
        });

    });


    describe(`Leetcode 215 -  Kth Largest Element in an Array https://leetcode.com/problems/kth-largest-element-in-an-array/`, ()=>{
        test("Example Input 1 from Leetcode" , ()=>{
            let input = [3,2,1,5,6,4];
            expect(findKthLargest(input, 2)).toEqual(5);
        });

        test("Example Input 2 from Leetcode" , ()=>{
            let input = [3,2,3,1,2,4,5,5,6];
            expect(findKthLargest(input,4)).toEqual(4);
        });

    });


    describe(`MIT Intro to Algo 2-4d. Give an algorithm that determines the number of inversions in any permutation 
        on n elements in O(n lg n) worst-case time. (Hint: Modify merge sort.)`,  ()=>{
        describe("Typical inputs", ()=>{
            describe('input [2,3,8,6,1]', function () {
                let arr, response;
                beforeAll(()=>{
                    arr = [2,3,8,6,1];
                    response = 5;
                })
                test('countInversionMergeSort function', function () {
                    expect(countInversionMergeSort(arr)['inversions']).toEqual(response);
                });
            });

            describe('input [5,4,3,2,1]', function () {
                let arr, response;
                beforeAll(()=>{
                    arr = [5,4,3,2,1];
                    response = 10;
                })
                test('countInversionMergeSort function', function () {
                    expect(countInversionMergeSort(arr)['inversions']).toEqual(response);
                });
            });
        });
    });

    describe("Leetcode 950 - Reveal Cards In Increasing Order https://leetcode.com/problems/reveal-cards-in-increasing-order/",()=>{
        describe("Normal Input",()=>{

           describe("Input from example 1 in Leetcode: ", ()=>{
               let arr, result;
               beforeAll(()=>{
                   arr = [17,13,11,2,3,5,7];
                   result = [2,13,3,11,5,17,7];
               });

               test("deckRevealedIncreasing function", ()=>{
                   expect(deckRevealedIncreasing(arr)).toEqual(result);
               });

           });


            describe("Input from example 1 in Leetcode: ", ()=>{
                let arr, result;
                beforeAll(()=>{
                    arr = [17,13,11,2,3,5,7,10];
                    result= [
                        2,
                        10,
                        3,
                        13,
                        5,
                        11,
                        7,
                        17
                    ];
                });

                test("deckRevealedIncreasing function", ()=>{
                    expect(deckRevealedIncreasing(arr)).toEqual(result);
                });

            });
        });
    });

    describe("Leet 1306. Jump Game III - Reveal Cards In Increasing Order https://leetcode.com/problems/reveal-cards-in-increasing-order/",()=>{
        describe("Normal inputs", ()=>{
            describe("arr = [0, 1, 1, 1], start = 3, result = true", ()=>{
                let arr, start, result;
                beforeAll(()=>{
                    arr = [0, 1, 1, 1];
                    start = 3;
                    result = true;
                });
                test("canReach function", ()=>{
                    expect(canReach(arr, start)).toEqual(result);
                })
            });

            describe("arr = [1, 2, 3], start = 1, result = false", ()=>{
                let arr, start, result;
                beforeAll(()=>{
                    arr = [1, 2, 3];
                    start = 1;
                    result = false;
                });
                test("canReach function", ()=>{
                    expect(canReach(arr, start)).toEqual(result);
                })
            });

        });

        describe("Extreme cases", ()=>{
            describe("arr = [1], start = 0, result = false", ()=>{
                let arr, start, result;
                beforeAll(()=>{
                    arr = [1];
                    start = 0;
                    result = false;
                });
                test("canReach function", ()=>{
                    expect(canReach(arr, start)).toEqual(result);
                })
            });

            describe("arr = [0], start = 0, result = true", ()=>{
                let arr, start, result;
                beforeAll(()=>{
                    arr = [0];
                    start = 0;
                    result = true;
                });
                test("canReach function", ()=>{
                    expect(canReach(arr, start)).toEqual(result);
                })
            });

        });
    });

});