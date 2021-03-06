module.exports = class Stack {
    constructor() {
        this.data = [];
    }

    push(item) {
        this.data.push(item);
    }

    isEmpty() {
        return this.data.length <= 0;
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }
};
