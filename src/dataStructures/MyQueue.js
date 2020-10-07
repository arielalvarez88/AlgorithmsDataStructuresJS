const Stack = require("./Stack");
module.exports = class MyQueue{

    constructor(){
        this.inOrderStack = new Stack();
        this.reversedStack = new Stack();

    }

    enqueue(node){
        if(this.inOrderStack.isEmpty()){
            this.switchContent(this.reversedStack,this.inOrderStack);
        }
        this.inOrderStack.push(node);
    }


    switchContent(from,to){
        while(!from.isEmpty()){
            to.push(from.pop());
        }
    }

    dequeue(){
        if(this.reversedStack.isEmpty()){
            this.switchContent(this.inOrderStack,this.reversedStack);
        }
        return this.reversedStack.pop();
    }


};
