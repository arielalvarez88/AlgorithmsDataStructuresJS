module.exports = class GraphNode {

    constructor(value) {
        this._value = value;
        this.visited = false;
        this.edges = new Set();
    }

    set value(val){
        this._value = val;
    }

    get value(){
        return this._value;
    }

    addEdge(e) {
        this.edges.add(e);
    }
    getAdjacents(){
        const adjacents = [];
        for(let edge of this.edges){
            if(edge.nodeA === this && (!edge.direction || edge.direction === "AtoB") ){
                adjacents.push(edge.nodeB);
            }
            if(edge.nodeB === this && (!edge.direction || edge.direction === "BtoA") ){
                adjacents.push(edge.nodeA);
            }
        }
        return adjacents;
    }

};
