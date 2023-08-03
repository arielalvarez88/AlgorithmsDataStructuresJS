const LinkedList = require("../dataStructures/LinkedList");
const Queue = require("../dataStructures/Queue");
const GraphNode = require("../dataStructures/GraphNode");
const Edge = require("../dataStructures/Edge");
const { zeros } = require("../utils");
module.exports = class GraphProblems {
  static isComplete(rootNode, minHeightDistance = 1) {
    let info = { leafToDepth: [], depth: 0, isLeftFirst: true };
    GraphProblems.depthFirstTraversal(
      rootNode,
      1,
      (node, level, info) => {
        const isLeaf = !node.left && !node.right;
        if (isLeaf) {
          info.leafToDepth.push(level);
          return;
        }

        if (node.right && !node.left) {
          info.isLeftFirst = false;
        }
      },
      info
    );
    let leafDifLessThanMin = true;

    for (let i = 0; i < info.leafToDepth.length; i++) {
      for (let j = i + 1; j < info.leafToDepth.length; j++) {
        const differenceInHeight = Math.abs(
          info.leafToDepth[i] - info.leafToDepth[j]
        );
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
    let info = { height: 0 };
    this.depthFirstTraversal(
      node,
      1,
      (visitingNode, level, info) => {
        if (!visitingNode) {
          return;
        }
        const isLeaf = !visitingNode.left && !visitingNode.right;
        if (isLeaf && info.height < level) {
          info.height = level;
        }
      },
      info
    );
    return info.height;
  }

  /**
   * Returns true if tree is balanced with a maxDistance configured by the param with that name. False otherwise.
   * @param {BinaryTreeNode} node
   * @param {Number} maxDistance
   * @returns {boolean}
   */
  static isTreeBalanced2(node, maxDistance) {
    this.breadthFirstTraversal(node, (node) => {
      this.clearVisitedBinaryTree(node);
    });
    let isUnbalanced = false;
    function dfs(node, level = 1) {
      if (!node || node.visited) {
        return;
      }
      node.visited = true;

      let currentNodeIsLeaf = !node.left && !node.right;

      if (currentNodeIsLeaf) {
        return 1;
      }

      let leftHeight = 0,
        rightHeight = 0,
        currentNodeHeight;

      if (!isUnbalanced && node.left && !node.left.visited) {
        leftHeight = dfs(node.left, level + 1);
      }
      if (!isUnbalanced && node.right && !node.right.visited) {
        rightHeight = dfs(node.right, level + 1);
      }

      if (isUnbalanced) {
        return;
      }

      if (!leftHeight && !rightHeight && !isUnbalanced) {
        throw new Error("Circular reference in tree");
      }

      currentNodeHeight =
        leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;

      if (Math.abs(leftHeight - rightHeight) > maxDistance) {
        isUnbalanced = true;
      }
      return currentNodeHeight;
    }

    if (!node.left && !node.right) {
      return true;
    }
    dfs(node);
    return !isUnbalanced;
  }

  static isTreeBalanced(node) {
    let info = { isBalanced: true };
    this.breadthFirstTraversal(
      node,
      (node, info) => {
        this.clearVisitedBinaryTree(node);
        let nodeIsBalanced = this.isNodeBalanced(node);

        info.isBalanced = info.isBalanced && nodeIsBalanced;
      },
      info
    );

    return info.isBalanced;
  }

  static breadthFirstTraversal(rootNode, callback, info) {
    const nodes = [rootNode];
    for (let node of nodes) {
      if (!node.visited) {
        if (node.left) {
          nodes.push(node.left);
        }
        if (node.right) {
          nodes.push(node.right);
        }
      }
      node.visited = true;
      const continueTraversing = callback(node, info);
      if (continueTraversing === false) {
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
      GraphProblems.depthFirstTraversal(
        rootNode.left,
        level + 1,
        callback,
        info
      );
    }
    if (rootNode.right && !rootNode.right.visited) {
      GraphProblems.depthFirstTraversal(
        rootNode.right,
        level + 1,
        callback,
        info
      );
    }
  }

  static clearVisitedBinaryTree(rootNode) {
    const visited = new Set();
    const nodes = [rootNode];
    for (let node of nodes) {
      if (!visited.has(node)) {
        if (node.left) {
          nodes.push(node.left);
        }
        if (node.right) {
          nodes.push(node.right);
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
    if (typeof callback === "function") {
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

  static linkedListPerLevel(rootBinaryNode) {
    const linkedLists = [];
    this.depthFirstTraversal(rootBinaryNode, 1, (node, level) => {
      if (!linkedLists[level]) {
        linkedLists[level] = new LinkedList();
      }
      const linkedList = linkedLists[level];
      linkedList.appendToTail(node);
    });
    return linkedLists;
  }

  static isSearchTree(rootBinaryNode) {
    const linkedLists = [];
    let isSearchTree = true;
    this.breadthFirstTraversal(rootBinaryNode, (node, level) => {
      if (node.left) {
        isSearchTree = isSearchTree && node.left.value <= node.value;
      }
      if (node.right) {
        isSearchTree = isSearchTree && node.right.value > node.value;
      }
      return isSearchTree;
    });
    return isSearchTree;
  }

  static breadthFirst2({ node, callback }) {
    node.visited = true;
    let queue = [];

    callback(node);
    queue.push(node);

    for (let n of queue) {
      if (n.right && !n.right.visited) {
        queue.push(n.right);
      }
      if (n.left && !n.right.visited) {
        queue.push(n.left);
      }
      if (!n.visited) {
        n.visited = true;
        callback(n);
      }
    }
    return;
  }

  static findSuccessor(v, node) {
    let successor = null;
    function traverse(c) {
      if (!c || c.visited) {
        return;
      }
      c.visited = true;
      if (c.value > v && (!successor || c.value < successor)) {
        successor = c.value;
      }
      if (!successor || c.value < successor) {
        return traverse(c.right);
      }
      if (c.value >= successor) {
        return traverse(c.left);
      }
    }
    traverse(node);
    return successor;
  }

  static depthFirstTraversal2(node, callback, level = 1, visited = new Set()) {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);

    if (node.left) {
      this.depthFirstTraversal2(node.left, callback, level + 1, visited);
    }

    if (node.right) {
      this.depthFirstTraversal2(node.right, callback, level + 1, visited);
    }

    callback(node, level);
  }

  static printPathsWithSum(node, num) {
    function searchPaths(current, paths, sum) {
      const newSum = sum + current.value;
      if (newSum === num && paths.length > 0) {
        console.log([...paths, current.value]);
      }
      if (current.left) {
        searchPaths(current.left, [...paths, current.value], newSum);
        if (paths.length > 0)
          searchPaths(current.left, [current.value], current.value);
      }
      if (current.right) {
        searchPaths(current.right, [...paths, current.value], newSum);
        if (paths.length > 0)
          searchPaths(current.right, [current.value], current.value);
      }
    }
    searchPaths(node, [], 0);
  }

  static printPathsWithSumBest(node, num) {
    function printPath(level, i, paths) {
      const pathWithSum = [];
      for (i; i <= level; i++) {
        pathWithSum.push(paths[i]);
      }
      console.log(pathWithSum);
    }

    function searchPaths(current, paths, level) {
      if (current === null) {
        return;
      }
      let count = 0;
      paths[level] = current.value;

      for (let i = level; i >= 0; i--) {
        count = count + paths[i];
        if (count === num) {
          printPath(level, i, paths);
        }
      }

      searchPaths(current.left, paths, level + 1);
      searchPaths(current.right, paths, level + 1);
    }
    searchPaths(node, [], 0);
  }

  static distanceK(root, target, K) {
    if (!root.left && !root.right && K > 0) {
      return [];
    }
    let valuesOfPathTarget = new Set();
    let valuesToLevels = new Map();
    let nodesWithDistanceK = [];

    function depthFirstPreOrderSearch(n, visit, level, valuesOfPath) {
      const valuesOfPathCurrent = new Set([...valuesOfPath]);
      valuesOfPathCurrent.add(n.value);
      valuesToLevels.set(n.value, level);

      let stop = visit(n, level, valuesOfPathCurrent);
      if (!stop && n.left) {
        stop = depthFirstPreOrderSearch(
          n.left,
          visit,
          level + 1,
          valuesOfPathCurrent
        );
      }
      if (!stop && n.right) {
        stop = depthFirstPreOrderSearch(
          n.right,
          visit,
          level + 1,
          valuesOfPathCurrent
        );
      }
      return stop;
    }

    function findTarget(n, level, valuesOfPathCurrent) {
      if (n.value === target.value) {
        valuesOfPathTarget = valuesOfPathCurrent;
        return target;
      }
      return false;
    }

    function checkDistance(n, level, valuesOfPathCurrent) {
      let commonParent = [...valuesOfPathCurrent].filter((val) =>
        valuesOfPathTarget.has(val)
      );
      if (commonParent.length <= 0) {
        return;
      }
      commonParent = commonParent.length > 1 ? target.value : commonParent[0];
      const distanceCommonParentAndCurrent =
        valuesToLevels.get(commonParent) - valuesToLevels.get(n.value);
      const distanceCommonAndTarget =
        valuesToLevels.get(commonParent) - valuesToLevels.get(target.value);
      if (
        Math.abs(distanceCommonParentAndCurrent) +
          Math.abs(distanceCommonAndTarget) ===
        K
      ) {
        nodesWithDistanceK.push(n.value);
      }
      return false;
    }

    depthFirstPreOrderSearch(root, findTarget, 1, new Set());
    depthFirstPreOrderSearch(root, checkDistance, 1, new Set());
    return nodesWithDistanceK;
  }

  static distanceKBest(root, target, K) {
    const parents = new Map();
    const rememberParents = (node, parent) => {
      if (node !== null) {
        parents.set(node, parent);
        rememberParents(node.left, node);
        rememberParents(node.right, node);
      }
    };
    const response = [];
    const bds = (root) => {
      const q = new Queue();
      q.enqueue(null);
      q.enqueue(target);
      let node,
        distance = 0,
        visited = new Map();
      visited.set(target, null);
      visited.set(null, null);
      while (!q.isEmpty()) {
        node = q.dequeue();

        if (node == null) {
          if (distance === K) {
            for (let leftNode of q) {
              response.push(leftNode.value);
            }
            return response;
          }
          distance++;
          q.enqueue(null);
        } else {
          if (node.left && !visited.has(node.left)) {
            q.enqueue(node.left);
            visited.set(node.left, true);
          }
          if (node.right && !visited.has(node.right)) {
            q.enqueue(node.right);
            visited.set(node.right, true);
          }
          const parent = parents.get(node);
          if (!visited.has(parent)) {
            q.enqueue(parent);
            visited.set(parent, true);
          }
        }
      }
    };

    rememberParents(root, null);
    return bds(root);
  }
  static longestIncreasingSubsequence(sequence) {
    const linearizedGraph = this.getLinearizedGraph(sequence);
    const longestPath = this.longestPath(linearizedGraph);
    return longestPath.map((node) => node.value);
  }

  static longestPath(linearizedGraph) {
    // Map values are of type {[node: GraphNode]: {  length: number, previousNode: GraphNode}}
    const memoizeTable = new Map();
    for (let i = 0; i < linearizedGraph.length; i++) {
      const node = linearizedGraph[i];
      this.getMaxLengthToNode(node, memoizeTable);
    }
    return this.reconstructLongestPath(memoizeTable);
  }

  static reconstructLongestPath(memoizeTable) {
    let nodeWithLongestPath;
    for (let [node, info] of memoizeTable.entries()) {
      if (!nodeWithLongestPath) {
        nodeWithLongestPath = node;
        continue;
      }
      if (info.length > memoizeTable.get(nodeWithLongestPath).length) {
        nodeWithLongestPath = node;
      }
    }
    let path = [];
    while (nodeWithLongestPath) {
      path.push(nodeWithLongestPath);
      nodeWithLongestPath = memoizeTable.get(nodeWithLongestPath).previousNode;
    }
    return path.reverse();
  }

  static getLinearizedGraph(sequence) {
    let result = [];
    for (let i = 0; i < sequence.length; i++) {
      const nodeI = new GraphNode(sequence[i]);
      result.push(nodeI);
    }
    for (let i = 0; i < sequence.length; i++) {
      const nodeI = result[i];
      for (let j = i + 1; j < sequence.length; j++) {
        const nodeJ = result[j];
        if (nodeJ.value > nodeI.value) {
          new Edge(1, nodeI, nodeJ);
        }
      }
    }

    return result;
  }

  static getMaxLengthToNode(node, memoizeTable) {
    if (memoizeTable.has(node)) {
      return memoizeTable.get(node);
    }
    const prevNodes = [...node.edges].reduce((acc, edge) => {
      if (edge.destinationNode === node) {
        acc.push(edge.sourceNode);
      }
      return acc;
    }, []);
    let prevNodeWithMaxLength = { node: null, length: 0 };
    for (let prevNode of prevNodes) {
      const prevNodeLengthInfo = this.getMaxLengthToNode(
        prevNode,
        memoizeTable
      );
      if (
        prevNodeWithMaxLength.node === null ||
        prevNodeWithMaxLength.length < prevNodeLengthInfo.length
      ) {
        prevNodeWithMaxLength.node = prevNode;
        prevNodeWithMaxLength.length = prevNodeLengthInfo.length;
      }
    }
    const maxDistanceToNode = 1 + prevNodeWithMaxLength.length;
    memoizeTable.set(node, {
      previousNode: prevNodeWithMaxLength.node,
      length: maxDistanceToNode,
    });
    return maxDistanceToNode;
  }

  static findShortestsPaths(graph, nodeToIndex = null) {
    const nodes = graph.getNodesInArray();
    if (nodeToIndex) {
      nodes.sort((a, b) => nodeToIndex.get(a.value) - nodeToIndex.get(b.value));
    }
    const n = nodes.length;
    const dist = zeros([n, n, n], Number.POSITIVE_INFINITY);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          dist[i][j] = Array(n).fill(0);
          continue;
        }
        const nodeI = nodes[i];
        const nodeJ = nodes[j];
        const iEdges = nodeI.edges;
        const edgesFromIToJ = iEdges.filter((edge) => {
          if (edge.isDirected) {
            return edge.destinationNode === nodeJ;
          }
          return edge.sourceNode === nodeJ || edge.destinationNode === nodeJ;
        });
        const edgesLength = edgesFromIToJ.map((edge) => edge.value);
        dist[i][j][0] = Math.min(...edgesLength);
      }
    }
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const nodesUsable = k - 1 < 0 ? 0 : k - 1;
          dist[i][j][k] = Math.min(
            dist[i][k][nodesUsable] + dist[k][j][nodesUsable],
            dist[i][j][nodesUsable]
          );
        }
      }
    }

    return { dist, nodes };
  }
};
