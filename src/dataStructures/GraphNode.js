module.exports = class GraphNode {
  constructor(value) {
    this._value = value;
    this.visited = false;
    this.edges = new Set();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value;
  }

  addEdge(e) {
    this.edges.add(e);
  }
  getAdjacents() {
    const adjacents = [];
    for (let edge of this.edges) {
      if (edge.sourceNode === this) {
        adjacents.push(edge.destinationNode);
      }
    }
    return adjacents;
  }
};
