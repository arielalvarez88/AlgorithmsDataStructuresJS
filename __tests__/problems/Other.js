const {factorial} = require("../../src/problems/Other");
describe("Other problems", ()=>{

    describe("Write a function to calculate the factorial of a number", ()=>{

            test("Normal use case", ()=>{
                expect(factorial(5)).toBe(120);
            })
    })
});