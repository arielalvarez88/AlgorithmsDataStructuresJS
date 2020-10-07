
function factorial(x){

    if(x <= 1){
        return x;
    }

    return x * factorial(x-1);
}

module.exports = {factorial};