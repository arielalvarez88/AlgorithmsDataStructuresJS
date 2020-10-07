module.exports = class Edge{

    constructor(value, nodeA, nodeB, direction){
        this.value  = value;
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.nodeA.addEdge(this);
        this.nodeB.addEdge(this);
        this.direction = direction;
    }
};
