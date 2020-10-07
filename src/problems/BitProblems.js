module.exports = class BitProblems{
    static drawHorizontalLine(screen, width, x1, x2, y){
        const resultScreen = [...screen];
        const height = screen.length / width;
        const byteOfX1 = Math.floor(x1 / 8);
        const byteOfX2 = Math.floor(x2 / 8);
        const X1sInitialBit = x1 % 8;
        const X2sFinalBit = x2 % 8;
        const indexOfY  = y * width;
        for(let i = indexOfY  + byteOfX1; i <= indexOfY + byteOfX2; i ++){
            const initialBit = i === byteOfX1? X1sInitialBit : 0;
            const endBit = i === byteOfX2? X2sFinalBit : 7;
            let newByteVal = [];
            for(let j = 0; j < 8; j++){
                newByteVal[j] = j >= initialBit && j <= endBit ? 1 : 0;
            }
            resultScreen[i] = newByteVal;
        }
        return resultScreen;
    }
    static multiply(x,y){
        let n = x > y ? x : y;
        if(n===1){
            return x*y;
        }
        n = this.determineN(n);

        let xL = (0xffffffff << Math.ceil(n/2)) & x;
        let xR = (0xFFFFFFFF >>> (32-n/2)) & x;
        let yL = (0xffffffff << Math.ceil(n/2)) & y;
        let yR = (0xFFFFFFFF >>> (32-n/2)) & y;

        let p1 = this.multiply(xL, yL);
        let p2 = this.multiply(xR, yR);
        let p3 = this.multiply(xL + xR, yL + yR);
        return p1 * Math.pow(2,n ) + (p3-p1-p2) * Math.pow(2, n/2) + p2;
    }

    static determineN(x){
        let mask = Math.pow(2,31);
        let i = 0;
        while((mask & x) === 0 && mask !== 0){
            i++;
            mask = mask >>> 1;
        }
        return 32-i;
    }
    static printNextOnes(n){

        function getNumberOfOnes(num){
            let mask=true;
            let count =0;
            while(mask <= num){
                if((mask & num) !== 0){
                    count ++;
                }
                mask = mask << 1;
            }
            return count;
        }
        let onesInN = getNumberOfOnes(n);
        let onesInNext =0;
        let onesInPrev = 0;
        let next = n;
        let prev = n;
        while(onesInNext !== onesInN){
            next ++ ;
            onesInNext = getNumberOfOnes(next);

        }

        if(next !==n){
            console.log(`next is ${next}`);
        }
        while(onesInPrev !== onesInN && prev > 0){
            prev --;
            onesInPrev = getNumberOfOnes(prev);
        }
        if(prev !== n){
            console.log(`prev is: ${prev}`);
        }
    }
};
