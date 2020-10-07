module.exports = class LinkedList{


    constructor(){
        this._index = 0;
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirst(node){
     if(this.head){
         node.next = this.head;
         node.previous = null;
     }
     this.head = node;
     this.size++;
    }

    toArray(){
        let arr = [];
        for(let val of this){
            arr.push(val);
        }
        return arr;
    }

    getAt(idx){
        let arr = this.toArray();
        return arr[idx];
    }

    appendToTail(node){
        if(this.tail){
            this.tail.next = node;
        }
        if(!this.head){
            this.head = node;
        }
        node.previous = null;
        node.next = null;
        this.tail = node;
        this.size++;
    }

    insertAfter(existing, newOne){
        newOne.next = existing.next;
        existing.next = newOne;
        this.size++;
    }

    getSize(){
        return this.size;
    }

    *iterateNodes(){
        let current = this.head;
        while(current){
            yield current;
            current = current.next;
        }
    }

    [Symbol.iterator](){
        let current = this.head;
        return {
            next: ()=>{
                const iteratorNext =  {value: current? current.value : undefined, done: Boolean(!current)};
                current = current? current.next : null;
                return iteratorNext;
            }
        }
    }
};
