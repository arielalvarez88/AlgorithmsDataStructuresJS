module.exports = class Graph {
  headNode;
  nodes;
  edges;
  isDirected;
  constructor({ nodes = new Set(), edges = new Set(), isDirected = false }) {
    this.nodes = nodes;
    this.edges = edges;
    this.isDirected = isDirected;
  }
  add(sourceNode, destinationNode, edge) {
    if (!this.nodes.has(sourceNode) && !this.nodes.has(destinationNode)) {
      throw new Error(
        "Either the source or the destination node must be in the graph"
      );
    }
    if (edge.isDirected !== this.isDirected) {
      throw new Error(
        "If the graph is directed, the edge must be directed. If the graph is undirected, the edge must be undirected too."
      );
    }

    this.edges.add(edge);

    this.nodes.add(destinationNode);
    this.nodes.add(sourceNode);
  }
  remove(node) {
    this.nodes = this.nodes.filter((n) => n !== node);
    this.edges = this.edges.filter(
      (e) => e.sourceNode !== node && e.destinationNode !== node
    );
    let nodesWithEdges = [];
    this.edges.forEach((e) => {
      nodesWithEdges.push(e.sourceNode);
      nodesWithEdges.push(e.destinationNode);
    });
    //Exclude orphan nodes
    this.nodes = this.nodes.filter((n) => nodesWithEdges.includes(n));
  }
  getAdjacentNodes(node) {
    return this.edges
      .filter((e) => e.sourceNode === node || e.destinationNode === node)
      .reduce((acc, e) => {
        if (e.navigateFrom(node) !== null) acc.push(e.navigateFrom(node));
        return acc;
      }, []);
  }

  inverse() {
    if (!this.isDirected) {
      return this;
    }
    const inverseEdges = this.edges.map(
      (e) => new Edge(e.value, e.destinationNode, e.sourceNode, this.isDirected)
    );
    return new Graph(this.nodes, inverseEdges, this.isDirected);
  }
};
