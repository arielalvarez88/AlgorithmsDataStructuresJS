const Stack = require("../../src/dataStructures/Stack");
const StackAndQueues = require("../../src/problems/StackAndQueues");
describe("StackAndQueues test suite", () => {
    describe("sortAscending method", () => {
        test("test 1", () => {
            const asc = new Stack();
            asc.data = [0, 10, 5, 1, 8];

            const expected = new Stack();
            expected.push(0);
            expected.push(1);
            expected.push(5);
            expected.push(8);
            expected.push(10);

            expect(StackAndQueues.sortStackWithAnotherStack(asc).data).toEqual(expected.data);
        });

    });

    describe("Hanoi tower", ()=>{
        describe("Given: I have a classic hannoi tower problem with 3 discs, all starting in stack A", ()=>{
            let stackA, stackB, stackC;
            beforeAll(()=>{

                stackA = new Stack();
                stackB = new Stack();
                stackC = new Stack();
                stackA.push("1");
                stackA.push("2");
                stackA.push("3");
            });
            describe("When: I call the algorithm", ()=>{
                beforeAll(()=>{

                   StackAndQueues.hannoiTower(3,stackA, stackC, stackB);
                });
                test("Then: All disks endup in stack C", ()=>{

                    expect(stackC.isEmpty()).toBe(false);
                    expect(stackA.isEmpty()).toBe(true);
                    expect(stackB.isEmpty()).toBe(true);
                    expect(stackC.data.length).toBe(3);
                    
                });
            });

        });
    });

    describe(`Write a program to sort a stack in ascending order (with biggest items on top). 
    You may use at most one additional stack to hold items, but you may not copy the elements into any other data 
    structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty. (Page 90).`,
        ()=>{
        test("normal input", ()=>{
            let stack = new Stack();
            stack.push(20);
            stack.push(1);
            stack.push(1000);
            stack.push(100);
            stack.push(10);
            let result = StackAndQueues.sortWithOneStack(stack);
            expect(result.pop()).toEqual(1000)
            expect(result.pop()).toEqual(100)
            expect(result.pop()).toEqual(120)
            expect(result.pop()).toEqual(10)
            expect(result.pop()).toEqual(1)
        });
    });
});
