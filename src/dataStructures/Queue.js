const Stack = require("./Stack");
module.exports = class Queue{

    constructor(){
        this.data = [];
    }

    enqueue(node){
        this.data.push(node);
    }

    isEmpty(){
        return this.data.length <= 0;
    }

    dequeue(){
        return this.data.shift();
    }
    [Symbol.iterator](){
        let i = -1;
        return {
            next: ()=>{
                i++;
                return {value: this.data.length > i ? this.data[i] : undefined, done: i >= this.data.length? true : false }
            }
        }
    }


};
