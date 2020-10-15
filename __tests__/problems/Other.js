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
});