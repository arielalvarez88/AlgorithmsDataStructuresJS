const {minAreaFreeRect} = require("../../src/problems/Other");
const {factorial, maxIncreaseKeepingSkyline} = require("../../src/problems/Other");
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

    })
});