module.exports = class LinkedList{
  constructor(){
      this.head;
      this.tail;
      this.size = 0;
  }

  appendEnd = (node)=>{
      if(this.tail){
          this.tail.next = node;
      }

      this.tail = node;
      if(!this.head){
          this.head = node;
      }
  };

  addBegging = (node)=>{
    this.head = node;
    if(!this.tail){
        this.tail = node;
    }
  }

  insertAfter = (node)=>{

  }

  deleteAt = ()=>{

  }

  deleteAfter = ()=>{

  }

  insertAt = ()=>{

  }

  getSize = ()=>{
    return this.size;
  }



};
