
const traverseDepthFirst = ({node, callback})=>{
    if(!node){
        return;
    }

    if(node.left){
        traverseDepthFirst({node: node.left, callback});
    }
    if(node.right){
        traverseDepthFirst({node: node.right, callback});
    }

    callback(node);
};

describe("tree  tests", ()=>{
    test("normal inputs", ()=>{
        const tree = {
            left: {
                right: {
                    value: 'tacos'
                },
                value: 'salad'
            },
            right: {
                left: {
                    left: {
                        right: {
                            value: 'pizza'
                        },
                        value: 'salad'
                    },
                    value: 'tacos'
                },
                value: 'pizza'
            },
            value: 'tacos'
        };
        let counters = {};
        traverseDepthFirst({node: tree, callback:(node)=>{
                if(!(node.value in counters)){
                    counters[node.value] = 0;
                }
                counters[node.value]++;
            }});
        expect(counters.tacos).toEqual(3);
        expect(counters.salad).toEqual(2);
        expect(counters.pizza).toEqual(2);
    });
})