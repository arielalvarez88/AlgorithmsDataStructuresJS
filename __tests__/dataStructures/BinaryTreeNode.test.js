const BinaryTreeNodeTest = require("../../src/dataStructures/BinaryTreeNode");
const GraphProblems = require("../problems/GraphProblems.test");
describe("Binary Tree Node", ()=>{

    test("basic interface",()=>{
        const rootNode = new BinaryTreeNodeTest(5);
        const leftNode = new BinaryTreeNodeTest(3);
        const rightNode = new BinaryTreeNodeTest(10);
        rootNode.left = leftNode;
        rootNode.right = rightNode;
        expect(leftNode.parent).toBe(rootNode);
        expect(rightNode.parent).toBe(rootNode);
        expect(rootNode.left).toBe(leftNode);
        expect(rootNode.right).toBe(rightNode);
    });

    describe("Breadth first traversal",()=>{
        test("algorithm 1", ()=>{
            const rootNode = new BinaryTreeNodeTest(5);
            const left1Node = new BinaryTreeNodeTest(3);
            const right1Node = new BinaryTreeNodeTest(10);
            rootNode.left = left1Node;
            rootNode.right = right1Node;

            const leftLeftNode = new BinaryTreeNodeTest(3);
            const leftRightNode = new BinaryTreeNodeTest(10);

            left1Node.left = leftLeftNode;
            left1Node.right = leftRightNode;

            const leftLeftLeftNode = new BinaryTreeNodeTest(3);
            leftLeftNode.left = leftLeftLeftNode;



            const nodes = [rootNode];

            for(let node of nodes){
                if(!node.visited){
                    if(node.left)
                        nodes.push(node.left);
                    if(node.right)
                        nodes.push(node.right);
                }
                node.visited = true;
            }
            debugger;
        });
        test("algorithm 2", ()=>{
            const rootNode = new BinaryTreeNodeTest(5);
            const left1Node = new BinaryTreeNodeTest(3);
            const right1Node = new BinaryTreeNodeTest(10);
            rootNode.left = left1Node;
            rootNode.right = right1Node;

            const leftLeftNode = new BinaryTreeNodeTest(3);
            const leftRightNode = new BinaryTreeNodeTest(10);

            left1Node.left = leftLeftNode;
            left1Node.right = leftRightNode;

            const leftLeftLeftNode = new BinaryTreeNodeTest(3);
            leftLeftNode.left = leftLeftLeftNode;



            const visitedNodes = [rootNode, left1Node, right1Node, leftLeftNode, leftRightNode, leftLeftLeftNode];
            GraphProblems.breadthFirst2(rootNode);
            for(let node of visitedNodes){
                expect(node.visited).toEqual(true);
                if(!node.visited){
                    jest.fail("boom");
                }
            }

        });
    });


});
