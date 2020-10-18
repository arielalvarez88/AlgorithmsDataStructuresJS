const BinaryTreeNode = require("../../src/dataStructures/BinaryTreeNode");
const GraphsProblems = require("../../src/problems/GraphsProblems");
const GraphNode = require("../../src/dataStructures/GraphNode");
const Edge = require("../../src/dataStructures/Edge");

describe("GraphProblems test suite", () => {

    let n1, n2, n3, n4, n5, n6, n7;
    beforeEach(() => {
        n1 = new BinaryTreeNode(1, null, null);
        n2 = new BinaryTreeNode(2, null, null);
        n3 = new BinaryTreeNode(3, null, null);
        n4 = new BinaryTreeNode(4, null, null);
        n5 = new BinaryTreeNode(5, null, null);
        n6 = new BinaryTreeNode(6, null, null);
        n7 = new BinaryTreeNode(7, null, null);
    });

    describe("isBinaryTreeBalanced", () => {

        describe("Normal input", ()=>{
            describe("Balanced in 0: ", ()=>{
                let balanced = 1;
                test("GraphsProblems.isTreeBalanced function", ()=>{
                    n1.left = n2;
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(true);
                    n2.setLeft(n3);
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(false);
                    n1.setRight(n4);
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(true);
                    n4.setRight(n5);
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(true);
                    n5.setRight(n6);
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(false);
                    n4.setLeft(n7);
                    expect(GraphsProblems.isTreeBalanced(n1)).toBe(true);
                });

                test("GraphsProblems.isTreeBalanced2 balanced in 1", ()=>{
                    n1.left = n2;
                    expect(GraphsProblems.isTreeBalanced2(n1,1)).toBe(true);
                    n2.setLeft(n3);
                    expect(GraphsProblems.isTreeBalanced2(n1,1)).toBe(false);
                    n1.setRight(n4);
                    expect(GraphsProblems.isTreeBalanced2(n1, 1)).toBe(true);
                    n4.setRight(n5);
                    expect(GraphsProblems.isTreeBalanced2(n1, 1)).toBe(true);
                    n5.setRight(n6);
                    expect(GraphsProblems.isTreeBalanced2(n1, 1)).toBe(false);
                    n4.setLeft(n7);
                    expect(GraphsProblems.isTreeBalanced2(n1, 1)).toBe(true);

                });
            });
        });

        describe("Weird inputs: ", ()=>{

        });




    });

    describe("Cracking code Interview 4.9 - You are given a binary tree in which each node contains a value. Design an algorithm to print all paths which sum to a given value. The path does not need to start or end at the root or a leaf. (Page 95).",()=>{
       describe("Typical input", ()=>{

          describe("Tree with 3 paths", ()=>{
              let spy, nn1, nn2, nn3, nn4, nn5, nn6, expectedPrints = [[2,3], [3,2], [1,3,1]];
              beforeEach(()=>{
                  spy = jest.spyOn(console,"log");
                  nn1 = new BinaryTreeNode(1);
                  nn2 = new BinaryTreeNode(2);
                  nn3 = new BinaryTreeNode(3);
                  nn4 = new BinaryTreeNode(3);
                  nn5 = new BinaryTreeNode(2);
                  nn6 = new BinaryTreeNode(1);

                  nn1.setLeft(nn2);
                  nn2.setLeft(nn3);

                  nn1.setRight(nn4);
                  nn4.setLeft(nn5);
                  nn4.setRight(nn6);
              });
              afterEach(()=>{
                 jest.clearAllMocks();
              });
              test("GraphsProblems.printPathsWithSum method", ()=>{
                  GraphsProblems.printPathsWithSum(nn1,5);
                  expectedPrints.forEach((expectedPrint)=>{
                     expect(spy).toBeCalledWith(expectedPrint);
                  });

              });
              test("GraphsProblems.printPathsWithSumBest method", ()=>{
                  GraphsProblems.printPathsWithSumBest(nn1,5);
                  expectedPrints.forEach((expectedPrint)=>{
                      expect(spy).toBeCalledWith(expectedPrint);
                  });

              });

          });

       });
    });
    describe("Given a directed graph, design an algorithm to find out whether there is a route between two nodes.", () => {
        test("Test 1", () => {
            const n1 = new GraphNode(1);
            const n2 = new GraphNode(2);
            const edgeN1toN2Directional = new Edge(0, n1, n2, "AtoB");
            expect(GraphsProblems.routeExists(n1, n2)).toBe(true);
            const n3 = new GraphNode(3);
            expect(GraphsProblems.routeExists(n1, n3)).toBe(false);
            const edgeN1toN3Directional = new Edge(0, n1, n3, "AtoB");
            expect(GraphsProblems.routeExists(n1, n3)).toBe(true);
            expect(GraphsProblems.routeExists(n3, n2)).toBe(false);

        });
    });

    describe("Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists). (Page 95).", ()=>{
        test("Test 1 ", ()=>{
            n1.left = n2;
            n1.right = n3;
            n2.left = n4;
            n2.right = n5;
            n3.left = n6;
            n3.right = n7;
            const expectedSetOfNodesInLevel3 = new Set();
            expectedSetOfNodesInLevel3.add(n4);
            expectedSetOfNodesInLevel3.add(n5);
            expectedSetOfNodesInLevel3.add(n6);
            expectedSetOfNodesInLevel3.add(n7);
            const result = GraphsProblems.linkedListPerLevel(n1);
            const setOfNodesInLevel3 = new Set();
            for(let node of result[3].iterateNodes()){
                setOfNodesInLevel3.add(node);
            }
            expect(result[3].getSize()).toEqual(4);
            expect(setOfNodesInLevel3).toEqual(expectedSetOfNodesInLevel3);
        });
    })


    describe("Implement a function to check if a binary tree is a binary search tree. (Page 95).", ()=>{
        test("Test 1", ()=>{
            n5.left = n4;
            n4.left = n3;
            n3.left = n2;
            n2.left = n1;
            n5.right = n6;
            n6.right = n7;
            n7.left = n6;

            expect(GraphsProblems.isSearchTree(n5)).toEqual(true);
        });
    });

    describe("Write an algorithm to find the'next'node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.  (Page 95).", ()=>{
       test.todo("test 1", ()=>{

       });
    });

    describe("Breadth first traversal tests",()=>{
        describe("Normal use case", ()=>{
            describe("When: I send a BinaryTreeNode linked to other nodes", ()=>{
                test("Then: The algorithm should call the callback with each node in the and the level of each node", ()=>{
                    n1.left = n2;
                    n1.right = n3;
                    n2.left = n4;
                    let callback = jest.fn();
                    GraphsProblems.depthFirstTraversal2(n1, callback);
                    expect(callback).toBeCalledWith(n1, 1);
                    expect(callback).toBeCalledWith(n2, 2);
                    expect(callback).toBeCalledWith(n3, 2);
                    expect(callback).toBeCalledWith(n4, 3);
                    expect(callback.mock.calls[0][0]).toEqual(n4);
                });
            })
        });

        describe("Weird Values", ()=>{
            describe("When: I send a binary tree with circular paths", ()=>{
                test("Then: The algorithm should detect those and don't visit the same node twice", ()=>{
                    n1.left = n2;
                    n1.right = n3;
                    n2.left = n4;
                    n4.left = n2;
                    let callback = jest.fn();
                    GraphsProblems.depthFirstTraversal2(n1, callback);
                    expect(callback).toBeCalledWith(n1, 1);
                    expect(callback).toBeCalledWith(n2, 2);
                    expect(callback).toBeCalledWith(n3, 2);
                    expect(callback).toBeCalledWith(n4, 3);
                    expect(callback.mock.calls[0][0]).toEqual(n4);
                    expect(callback.mock.calls.length).toEqual(4);
                });
            })
        });

        describe("Weird values", ()=>{
            describe("When: I send a binary tree with just one node", ()=>{
                test.skip("Then: The algorithm should call those call in the callback only once with that node and level = 1", ()=>{

                })
            })
        });


        describe("Illegal values", ()=>{
            describe("When: I send a value that is not a BinaryTreeNode", ()=>{
                test.skip("Then: The algorithm should throw a TypeError.", ()=>{

                })
            })
        });



    });

    describe("LeetCode: 863. All Nodes Distance K in Binary Tree", ()=>{
       describe("Corner cases", ()=>{
          describe("Input: 1 node tree", ()=>{
              let nn1;
             beforeEach(()=>{
                nn1 = new BinaryTreeNode(1);
             });
             test("GraphsProblems.distanceK", ()=>{
                expect(GraphsProblems.distanceK(nn1, nn1, 2)).toEqual([]);
                 expect(GraphsProblems.distanceK(nn1, nn1, 0)).toEqual([1]);
             });
          });

       });

        describe("Normal cases", ()=>{
            describe("Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2", ()=>{
                let nod3, nod5, nod1, nod6, nod2, nod0, nod8, nod7, nod4, result, target, K;
                beforeEach(()=>{
                    result = [7,4,1];

                    K = 2;
                    nod3 = new BinaryTreeNode(3);
                    nod5 = new BinaryTreeNode(5);
                    nod1 = new BinaryTreeNode(1);

                    nod3.setLeft(nod5);
                    nod3.setRight(nod1);

                    nod6 = new BinaryTreeNode(6);
                    nod2 = new BinaryTreeNode(2);
                    nod0 = new BinaryTreeNode(0);
                    nod8 = new BinaryTreeNode(8);

                    nod5.setLeft(nod6);
                    nod5.setRight(nod2);

                    nod1.setLeft(nod0);
                    nod1.setRight(nod8);

                    nod7 = new BinaryTreeNode(7);
                    nod4 = new BinaryTreeNode(4);

                    nod2.setLeft(nod7);
                    nod2.setRight(nod4);
                    target = nod5;
                });

                test("GraphsProblems.distanceK", ()=>{
                    expect(GraphsProblems.distanceK(nod3, target, K)).toEqual(result);
                });
                test("GraphsProblems.distanceKBest", ()=>{
                    expect(GraphsProblems.distanceKBest(nod3, target, K)).toEqual(result);
                });
            });

        });
    });
});
