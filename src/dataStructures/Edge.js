module.exports = class Edge {
  constructor(value, sourceNode, destinationNode, isDirected = true) {
    this.value = value;
    this.sourceNode = sourceNode;
    this.destinationNode = destinationNode;
    this.sourceNode.addEdge(this);
    this.destinationNode.addEdge(this);
    this.isDirected = isDirected;
  }
  navigateFrom(node) {
    if (node !== this.sourceNode && node !== this.destinationNode) {
      throw new Error("This node is not part of this edge");
    }
    if (!this.isDirected) {
      return this.sourceNode === node ? this.destinationNode : this.sourceNode;
    }
    if (node === this.sourceNode) {
      return this.destinationNode;
    }
    return null;
  }
};
