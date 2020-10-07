const GraphNode = require("./GraphNode");

module.exports = class ListNode extends GraphNode{

    constructor(value) {
        super(value);
        this.next = null;
        this.previous = null;
    }

    addEdge(e) {

    }

   getNext(){
        return this.next;
   }
   setNext(next){
       this.next = next;
   }

   getPrevious(){
        return this.previous;
   }
   setPrevious(previous){
        return this.previous = previous;
   }

};
