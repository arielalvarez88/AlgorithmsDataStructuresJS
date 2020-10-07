const ListNode = require("../../src/dataStructures/ListNode");
const LinkedList = require("../../src/dataStructures/LinkedList");
const ListProblems = require("../../src/problems/ListProblems");
describe("LinkedList test suite", () => {

    describe("Given a circular linked list, implement an algorithm which returns the node at the beginning of the loop. DEFINITION Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list. EXAMPLE Input: A ->B->C->D->E- > C [the same C as earlier] Output: C", ()=>{
       describe("Recursive way", ()=>{
           describe("ListProblems.findFirstInLoop", ()=>{
               test("When there is a loop in the list", ()=>{
                const linkedList = new LinkedList();
                   const n1 = new ListNode("a");
                   const n2 = new ListNode("d");
                   const n3 = new ListNode("d");

                   linkedList.insertFirst(n1);
                   linkedList.insertAfter(n1, n2);
                   linkedList.insertAfter(n2, n3);
                   n3.next = n2;
                   const result = ListProblems.findFirstInLoop(linkedList);
                   expect(result).toEqual(n2);
               });
               test("When there is loop in the list", ()=>{
                   const linkedList = new LinkedList();
                   const n1 = new ListNode("a");
                   const n2 = new ListNode("d");
                   const n3 = new ListNode("d");

                   linkedList.insertFirst(n1);
                   linkedList.insertAfter(n1, n2);
                   linkedList.insertAfter(n2, n3);

                   const result = ListProblems.findFirstInLoop(linkedList);
                   expect(result).toEqual(false);
               });
           });
       });
    });
    describe("Implement a function to check if a linked list is a palindrome.", () => {
        test("ListProblems.isLinkedListPalindrome", ()=>{
            const a = new LinkedList();
            const n1 = new ListNode("a");
            const n2 = new ListNode("d");
            const n3 = new ListNode("a");
            a.insertFirst(n1);
            a.insertAfter(n1, n2);
            a.insertAfter(n2, n3);
            expect(ListProblems.isLinkedListPalindrome(a)).toBe(true);
        });
    });


    describe(`You have two numbers represented by a linked list, where each node contains a single digit. 
    The digits are stored in reverse order, such that the Ts digit is at the head of the list. 
    Write a function that adds the two numbers and returns the sum as a linked list. 
    EXAMPLE Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is, 617 + 295. Output: 2 -> 1 -> 9.That is, 912. `, () => {
        test("test1", ()=>{
            let a = new LinkedList();
            a.insertFirst(new ListNode(6));
            a.insertFirst(new ListNode(1));
            a.insertFirst(new ListNode(7));
            let b = new LinkedList();
            b.insertFirst(new ListNode(2));
            b.insertFirst(new ListNode(9));
            b.insertFirst(new ListNode(5));

            let result = ListProblems.addLinkedListNumbers(a,b);
            let arrResult =[];
            for(let node of result){
                arrResult.push(node);
            }
            expect(arrResult[0]).toEqual(2);
            expect(arrResult[1]).toEqual(1);
            expect(arrResult[2]).toEqual(9);

        });
    });

    describe("Implement an algorithm to delete a node in the middle of a singly linked list, given only access to that node. EXAMPLE Input: the node c from the linked list a->b->c->d->e Result: nothing is returned, but the new linked list looks like a- >b- >d->e", ()=>{
        test("test 1", ()=>{
            let a = new LinkedList();
            a.appendToTail(new ListNode(1));
            a.appendToTail(new ListNode(2));
            let nodeAt2 = new ListNode(3);
            a.appendToTail(nodeAt2);
            a.appendToTail(new ListNode(4));
            ListProblems.removeNodeWithouthAccessToPrevious(nodeAt2);
            expect(a.getAt(2)).toEqual(4);
        });
    });





});
