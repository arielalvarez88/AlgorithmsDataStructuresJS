const {allSubsets} = require("../../src/problems/RecursionProblems");
describe("RecursionProblems test suite", ()=>{
   describe("Cracking the code interview 9.4: Print all sub sets", ()=>{
      describe("Normal input", ()=>{
         let input, results;
         describe(" [1,2,3]", ()=>{
            beforeAll(()=>{
               input = [1,2,3];
               results = [[1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]];
            });
            test("allSubsets function",()=>{
               expect(allSubsets(input)).toEqual(expect.arrayContaining(results));
            });

         });

      });
   });
});