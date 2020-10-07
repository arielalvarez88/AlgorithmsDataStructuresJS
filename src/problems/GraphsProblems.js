const LinkedList = require("../dataStructures/LinkedList");
module.exports = class GraphProblems {

    static isComplete(rootNode, minHeightDistance = 1) {
        let info = {leafToDepth: [], depth: 0, isLeftFirst: true};
        GraphProblems.depthFirstTraversal(rootNode, 1, (node, level, info) => {
            const isLeaf = !node.left && !node.right;
            if (isLeaf) {
                info.leafToDepth.push(level);
                return;
            }

            if (node.right && !node.left) {
                info.isLeftFirst = false;
            }


        }, info);
        let leafDifLessThanMin = true;


        for (let i = 0; i < info.leafToDepth.length; i++) {
            for (let j = i + 1; j < info.leafToDepth.length; j++) {
                const differenceInHeight = Math.abs(info.leafToDepth[i] - info.leafToDepth[j]);
                if (differenceInHeight > minHeightDistance) {
                    return false;
                }
            }
        }


        return info.isLeftFirst && leafDifLessThanMin;

    }

    static isNodeBalanced(rootNode) {
        if (!rootNode) {
            return true;
        }
        const isLeaf = !rootNode.left && !rootNode.right;
        if (isLeaf) {
            return true;
        }


        let leftSubTreeHeight = GraphProblems.getHeight(rootNode.left);

        let rightSubTreeHeight = GraphProblems.getHeight(rootNode.right);

        return Math.abs(leftSubTreeHeight - rightSubTreeHeight) <= 1;
    }

    static getHeight(node) {
        let info = {height: 0};
        this.depthFirstTraversal(node, 1, (visitingNode, level, info) => {
            if (!visitingNode) {
                return;
            }
            const isLeaf = !visitingNode.left && !visitingNode.right;
            if (isLeaf && info.height < level) {
                info.height = level;
            }
        }, info);
        return info.height;

    }

    static isTreeBalanced(node) {
        let info = {isBalanced: true};
        this.breadthFirstTraversal(node, (node, info) => {
            this.clearVisitedBinaryTree(node);
            let nodeIsBalanced = this.isNodeBalanced(node);

            info.isBalanced = info.isBalanced && nodeIsBalanced;
        }, info);

        return info.isBalanced;

    }

    static breadthFirstTraversal(rootNode, callback, info) {

        const nodes = [rootNode];
        for (let node of nodes) {

            if (!node.visited) {
                if (node.left) {
                    nodes.push(node.left)
                }
                if (node.right) {
                    nodes.push(node.right)
                }

            }
            node.visited = true;
            const continueTraversing = callback(node, info);
            if(continueTraversing === false){
                return;
            }
        }

    }

    static depthFirstTraversal(rootNode, level = 1, callback, info) {
        if (!rootNode) {
            return;
        }
        const isLeaf = !rootNode.left && !rootNode.right;
        rootNode.visited = true;
        callback(rootNode, level, info);
        if (isLeaf) {
            return;
        }

        if (rootNode.left && !rootNode.left.visited) {
            GraphProblems.depthFirstTraversal(rootNode.left, level + 1, callback, info);
        }
        if (rootNode.right && !rootNode.right.visited) {
            GraphProblems.depthFirstTraversal(rootNode.right, level + 1, callback, info);
        }

    }

    static clearVisitedBinaryTree(rootNode) {

        const visited = new Set();
        const nodes = [rootNode];
        for (let node of nodes) {

            if (!visited.has(node)) {
                if (node.left) {
                    nodes.push(node.left)
                }
                if (node.right) {
                    nodes.push(node.right)
                }
                visited.add(node);
            }
            node.visited = false;
        }

    }

    static clearVisited(nodeA) {
        this.breadthFirst(nodeA, (node) => {
            node.visited = false;
        });
    }


    static breadthFirst(nodeA, callback) {
        let queue = [];
        nodeA.visited = true;
        if (typeof callback === 'function') {
            callback(nodeA);
        }
        queue.push(nodeA);
        const visited = new Set();
        while (queue.length > 0) {
            const node = queue.shift();
            const adjacents = node.getAdjacents();
            for (let adjacent of adjacents) {
                if (!visited.has(adjacent)) {
                    adjacent.visited = true;
                    if (typeof callback === "function") {
                        callback(adjacent);
                    }
                    visited.add(adjacent);
                    queue = queue.concat(adjacent.getAdjacents());
                }
            }
        }
    }

    static routeExists(nodeA, nodeB) {
        this.breadthFirst(nodeA);
        let result = nodeB.visited;
        this.clearVisited(nodeA);
        if (result) {
            return true;
        }

        this.breadthFirst(nodeB);
        result = nodeA.visited;
        this.clearVisited(nodeB);
        return result;

    }

    static linkedListPerLevel(rootBinaryNode){
        const linkedLists = [];
        this.depthFirstTraversal(rootBinaryNode, 1,(node, level)=>{
            if(!linkedLists[level]){
                linkedLists[level] = new LinkedList();
            }
            const linkedList = linkedLists[level];
            linkedList.appendToTail(node);
        });
        return linkedLists;
    }

    static isSearchTree(rootBinaryNode){
        const linkedLists = [];
        let isSearchTree = true;
        this.breadthFirstTraversal(rootBinaryNode,(node, level)=>{
            if(node.left){
                isSearchTree = isSearchTree && node.left.value <= node.value;
            }
            if(node.right){
                isSearchTree = isSearchTree && node.right.value > node.value;
            }
            return isSearchTree;
        });
        return isSearchTree;
    }

    static breadthFirst2({node, callback}){
        node.visited = true;
        let queue = [];

        callback(node);
        queue.push(node);

        for(let n of queue){
            if(n.right && !n.right.visited){
                queue.push(n.right);
            }
            if(n.left && !n.right.visited){
                queue.push(n.left);
            }
            if(!n.visited){
                n.visited = true;
                callback(n);
            }
        }
        return;
    }

    static findSuccessor(v, node){
        let successor = null;
        function traverse(c){
            if(!c || c.visited){
                return;
            }
            c.visited = true;
            if(c.value > v && (!successor || c.value < successor)){
                successor = c.value;
            }
            if(!successor || c.value < successor){
                return traverse(c.right);
            }
            if(c.value >= successor){
                return traverse(c.left);
            }
        }
        traverse(node);
        return successor;
    }

    static depthFirstTraversal2(node, callback, level = 1, visited = new Set()){

        if(visited.has(node)){
            return;
        }

        visited.add(node);

        if(node.left){
           this.depthFirstTraversal2(node.left, callback,level + 1, visited);
        }

        if(node.right){
            this.depthFirstTraversal2(node.right, callback, level + 1, visited);
        }

        callback(node, level);
    }
};
