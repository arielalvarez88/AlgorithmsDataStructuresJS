const LinkedList = require("../dataStructures/LinkedList");
const ListNode = require("../dataStructures/ListNode");

module.exports = class ListProblems {

    static isLinkedListPalindrome(l1){
        const s = [];

        for(let nodeValue of l1){
            s.push(nodeValue);
        }

        for(let item of l1){
            if(item !== s.pop()){
                return false;
            }
        }

        return true;
    }

    static addLinkedListNumbers(a, b){
        let aArr = a.toArray();
        let bArr = b.toArray();
        let numA = 0;
        let numB = 0;
        for(let i =0 ; i< aArr.length; i++){
            numA += aArr[i] * Math.pow(10,i);
        }
        for(let i =0 ; i< bArr.length; i++){
            numB += bArr[i] * Math.pow(10,i);
        }
        let result = numA + numB;
        let listResult = new LinkedList();
        while(result % 10 !== 0){
            let digit = result % 10;
            result = parseInt(result/10);
            listResult.appendToTail(new ListNode(digit));
        }
        return listResult;
    }

    static removeNodeWithouthAccessToPrevious(listNode){
        if(!listNode.next){
            return;
        }

        listNode.value = listNode.next.value;
        listNode.next = listNode.next.next;

    }


};
