function allSubsets(set){
    set = [...set];
    let result = [];

    function recursiveNav(i, previousElements){
        if(i >= set.length){
            return;
        }
        let withMe = [...previousElements, set[i]];
        result.push(withMe);

        recursiveNav(i+1, withMe);
        recursiveNav(i+1, previousElements);
    }

    recursiveNav(0, []);
    return result;
}

module.exports = {
    allSubsets
};