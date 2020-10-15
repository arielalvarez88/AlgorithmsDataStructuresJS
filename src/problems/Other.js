
function factorial(x){

    if(x <= 1){
        return x;
    }

    return x * factorial(x-1);
}

 const maxIncreaseKeepingSkyline = function(grid) {
        let maxRows = [];
        let maxCols = [];
        let col = 0;
        let allowedToIncreaseSum = 0;
        for(let i =0; i < grid.length; i++){
            let maxRow = Math.max.apply(Math, grid[i]);
            let colArr = [];
            for(let j = 0; j < grid.length; j++){
                colArr.push(grid[j][col]);
            }
            let maxCol = Math.max.apply(Math, colArr);
            maxRows.push(maxRow);
            maxCols.push(maxCol);
            col++;
        }
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j ++){
                let maxAllowed = Math.min(maxRows[i], maxCols[j])
                if(grid[i][j] < maxAllowed){
                    allowedToIncreaseSum += maxAllowed - grid[i][j];
                }
            }
        }
        return allowedToIncreaseSum;
};

module.exports = {factorial, maxIncreaseKeepingSkyline};