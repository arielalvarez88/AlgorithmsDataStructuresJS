const StringProblems = require("../../src/problems/StringProblems");

describe("StringProblems test suite", () => {
    test("hasUniqueChars", () => {

        let result = StringProblems.hasUniqueChars("ariel");
        expect(result).toBe(true);

        result = StringProblems.hasUniqueChars("coco");
        expect(result).toBe(false);

        result = StringProblems.hasUniqueChars("COco");
        expect(result).toBe(true);
    });

    test("isPermutation", () => {

        let result;
        result = StringProblems.isPermutation("ariel", "leira");
        expect(result).toBe(true);

        result = StringProblems.isPermutation("coco", "coco");
        expect(result).toBe(true);

        result = StringProblems.isPermutation("COco", "coCo");
        expect(result).toBe(true);

        result = StringProblems.isPermutation("car", "RAC");
        expect(result).toBe(true);

        result = StringProblems.isPermutation("pierre", "erpie");
        expect(result).toBe(false);

        result = StringProblems.isPermutation("apple", "plae");
        expect(result).toBe(false);

        result = StringProblems.isPermutation("apple", "plpae");
        expect(result).toBe(true);


    });

    describe("Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2blc5a3. If the \"compressed\" string would not become smaller than the original string, your method should return the original string.", ()=>{
        describe("In place solutions",()=>{
            describe("testing method StringProblems.compressStrInPlace",()=>{
                test("No compression multiple character input", ()=>{
                    let str = "ab";
                    expect(StringProblems.compressStrInPlace(str)).toEqual("ab");
                });
                test("Usual input without compression multiple character case", ()=>{
                    let str = "abbcddd";
                    expect(StringProblems.compressStrInPlace(str)).toEqual("abbcddd");
                });

                test("String with compression", ()=>{
                    let str = "aaaaaadbb";
                    expect(StringProblems.compressStrInPlace(str)).toEqual("a6d1b2");
                });
            });

        });
    });
});
