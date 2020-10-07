const MyQueue = require("../../src/dataStructures/MyQueue");
const BinaryTreeNode = require("../../src/dataStructures/BinaryTreeNode");
describe("Implement a MyQueue.js class which implements a queue using two stacks.  (Page 90).",()=>{

    test("test 1 ", ()=>{
        let a = new BinaryTreeNode(1);
        let b = new BinaryTreeNode(2);
        let c = new BinaryTreeNode(3);
        let d = new BinaryTreeNode(4);
        let queue = new MyQueue();
        queue.enqueue(a);
        queue.enqueue(b);
        queue.enqueue(c);

        expect(queue.dequeue()).toEqual(a);
        queue.enqueue(d);
        expect(queue.dequeue()).toEqual(b);
        expect(queue.dequeue()).toEqual(c);
        expect(queue.dequeue()).toEqual(d);



    })

});

