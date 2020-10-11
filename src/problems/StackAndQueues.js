const Stack = require("../dataStructures/Stack");
module.exports = class StackAndQueues{

    static hannoiTower(diskPosition, from, to, aux){
        debugger;
        if(diskPosition === 1){
            const disc = from.pop();
            to.push(disc);
        }else{
            this.hannoiTower(diskPosition-1, from, aux, to);
            const disc = from.pop();
            to.push(disc);
            this.hannoiTower(diskPosition-1, aux, to, from);
        }
    }

    static sortStackWithAnotherStack(stack1){
        let ordered = 0;
        let stack2 = new Stack();
        let stackSize = 0;
        let biggest = null;
        while(!stack1.isEmpty()){
            stack2.push(stack1.pop());
            stackSize++;
        }
        moveStack(stack2, stack1, stackSize - ordered, false);
        while(ordered < stackSize){
            biggest = moveStack(stack1,stack2, stackSize - ordered, true);
            stack1.push(biggest);
            ordered++;
            moveStack(stack2, stack1, stackSize - ordered, false);
        }
        return stack1;
    }

    static sortWithStacks(stack){
        function stackSize(s){
            let c, counter = 0;
            const n = new Stack();
            while(c = s.pop()){
                n.push(c);
                counter++;
            }
            while(c = n.pop()){
                s.push(c);
            }
            return counter;
        }
        function moveAll(from,to){
            let c = null;
            while(c=from.pop()){
                to.push(c);
            }
            return;
        }
        const size = stackSize(stack);
        function sSort(prim,secu,left){
            let smallest = null;
            for(let i =0; i < left; i++){
                let current = prim.pop();
                if(!smallest || current < smallest){
                    if(smallest)
                        secu.push(smallest);
                    smallest = current;
                }else{
                    secu.push(current);
                }
            }
            prim.push(smallest);
            moveAll(secu, prim);
            if(left <= 2)
                return prim;
            return sSort(prim,secu,--left);
        }
        const secu = new Stack();
        return sSort(stack, secu, size);
    }

    static sortWithStacksBest(stack){
        let c, s, sorted = new Stack();
        while(!stack.isEmpty()){
            c = stack.pop();
            while(!sorted.isEmpty() && sorted.peek() > c){
                stack.push(sorted.pop());
            }
            sorted.push(c);
        }
        return sorted;
    }

    static sortWithOneStack(original){
        let copy = new Stack();

        let source = original;
        let target = copy;
        let stackSize = null;
        let inOrderCount = 0;
        let min2 = null;
        let unorderedInOriginal = true;
        let swap  = (skipCount) =>{
            let result = moveStack(source, target, skipCount);
            unorderedInOriginal = !unorderedInOriginal;
            let swap = source;
            source = target;
            target = swap;
            return result;
        };
        while(!stackSize || inOrderCount < stackSize){

            let [min, moved] = swap(unorderedInOriginal? inOrderCount : 0);
            if(!stackSize){
                stackSize = moved;
            }

            if(!unorderedInOriginal){
                original.push(min);
                inOrderCount ++;
            }else{
                let [min2] = swap(unorderedInOriginal? inOrderCount : 0);
                original.push(min);
                original.push(min2);
                inOrderCount += 2;
            }
        }
        return original;
    }

};

function moveStack(from, to, remaining, popBiggest){
    let biggest = null;
    for(let i =0; i < remaining; i++){
        const value = from.peek();

        if(biggest === null){
            biggest = from.pop();
            if(!popBiggest){
                to.push(biggest);
            }
        }
        else if(biggest < value){
            if(popBiggest){
                to.push(biggest);
                biggest = from.pop();
            }else{
                biggest = from.pop();
                to.push(biggest);
            }

        }
        else{
            to.push(from.pop());
        }

    }
    return biggest;
}
