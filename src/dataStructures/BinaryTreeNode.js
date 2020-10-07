module.exports = class BinaryTreeNode {
    constructor(value){
      this.value = value;
      this._left = null;
      this._right = null;
      this._parent = null;
      this.visited = false;
    }

    setLeft(left){
        this.left = left;
    }
    setRight(right){
        this.right = right;
    }

    set left(left) {
        this._left = left;
        if(left){
            left.parent = this;
        }

    }

    set right(right) {
        this._right = right;
        if(right){
            right.parent = this;
        }

    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }
};
