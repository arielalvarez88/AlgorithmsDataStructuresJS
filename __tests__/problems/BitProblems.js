const BitProblems  = require( "../../src/problems/BitProblems");

describe("Bit problems", ()=>{

    describe(`drawHorizontal line: A monochrome screen is stored as a single array of bytes, allowing eight consecutive pixels to be stored in one byte.The screen has width w, where w is divisible by 8 (that is, no byte will be split across rows).The height of the screen, of course, can be derived from the length of the array and the width. Implement a function drawHorizontall_ine(byte[] screen, int width, int xl, int x2, int y) which draws a horizontal line from (xl, y)to(x2, y).  (Page 101).`,()=>{
        test("Given: We have a screen with a width divisible with 8 bytes", ()=>{
           const width = 800;
           const height = 600;
           const x1 = 2;
           const x2 = 20;
           const bytesInRow = width / 8;
           const emptyScreen = [];

           for(let j = 0; j < bytesInRow * height; j++){
               emptyScreen.push([0,0,0,0,0,0,0,0]);
           }
           const newScreenVals = BitProblems.drawHorizontalLine(emptyScreen, width, x1, x2, 0);
           const expectedResult = [...emptyScreen];

            expectedResult[0] = [0,0,1,1,1,1,1,1];
            expectedResult[1] = [1,1,1,1,1,1,1,1];
            expectedResult[2] = [1, 1, 1, 1, 1, 0, 0, 0];

           expect(newScreenVals).toEqual(expectedResult);
        });
    });

    describe(`Given a positive integer, print the next smallest and the next largest number that have the same number of 1 bits in their binary representation`,()=>{
        test("test 1", ()=>{
            const n = 3;
            let spy = jest.spyOn(console,"log");
            BitProblems.printNextOnes(n);
            expect(spy).toBeCalledWith("next is 5");

        });
    });

    describe(`Fast multiplication recursive algorithm`,()=>{
        test("test 1", ()=>{
            const x = 3;
            const y = 2;

            let result = BitProblems.multiply(x,y);
            expect(result).toBe(6);

        });
    });


    describe(`Leetcode 868  - Binary Gap: https://leetcode.com/problems/binary-gap/`,()=>{
        describe("Example Input 1 from Leetcode",()=>{
            let n, result;
            beforeAll(()=>{
                n = 22;
                result = 2;

            });
            test("maxDistanceBetween1s function", ()=>{
                expect(BitProblems.maxDistanceBetween1s(n)).toEqual(result);
            });
        });

        describe("Example Input 2 from Leetcode",()=>{
            let n, result;
            beforeAll(()=>{
                n = 5;
                result = 2;

            });
            test("maxDistanceBetween1s function", ()=>{
                expect(BitProblems.maxDistanceBetween1s(n)).toEqual(result);
            });
        });

        describe("Example Input 3 from Leetcode",()=>{
            let n, result;
            beforeAll(()=>{
                n = 6;
                result = 1;

            });
            test("maxDistanceBetween1s function", ()=>{
                expect(BitProblems.maxDistanceBetween1s(n)).toEqual(result);
            });
        });

        describe("Example Input 4 from Leetcode",()=>{
            let n, result;
            beforeAll(()=>{
                n = 8;
                result = 0;

            });
            test("BitProblems.maxDistanceBetween1s function", ()=>{
                expect(BitProblems.maxDistanceBetween1s(n)).toEqual(result);
            });
        });


    });
});
