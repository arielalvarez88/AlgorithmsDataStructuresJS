module.exports = class StringProblems {
    static compressStrInPlace(s){
        let compressed = "", mem = null;
        if(typeof s !== "string"){
            throw new TypeError("Parameter should be a string");
        }
        let counter = 0;
        for(let c of s){
            if(!mem){
                mem = c;
            }
            if(mem !== c){
                compressed += mem + counter;
                mem = c;
                counter = 0;
            }
            counter++;
        }
        if(s.length > 0){
            compressed += mem + counter;
        }
        return s.length <= compressed.length? s : compressed;

    }
    static compress(str){

        for(let c of str){
            let regex = new RegExp(`(${c}+)`,'g');
            let results = str.match(regex);
            let a = 0;
        }
       /* if(typeof str !== "string"){
            throw new TypeError("")
        }
        let charOfCount = "";
        let count = 0;
        let result = "";
        for(let i  = 0; i < str.length; i++){
            let c = str[i];

            if(!charOfCount || charOfCount !== c || i === str.length-1){
                if(i === str.length-1 && charOfCount === c){
                    count++;
                }
                result += charOfCount;
                if(count > 1){
                    result += count;
                }
                count = 0;
                charOfCount = c;
            }
            count++;
        }
        return result;*/
    }

    static hasUniqueChars(str) {
        const charToPresent = {};
        for (let char of str) {
            if (char in charToPresent) {
                return false;
            }
            charToPresent[char] = true;
        }
        return true;
    }

    static isPermutation(str1, str2) {
        if (str1.length !== str2.length) {
            return false;
        }
        const letterToCount = (str) => {
            let count = {};
            for (let char of str) {
                if (char in count) {
                    count[char] += 1;
                } else {
                    count[char] = 0;
                }
            }
            return count;
        };
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        let count1, count2;
        count1 = letterToCount(str1);
        count2 = letterToCount(str2);
        for (let letter in count1) {
            if (!(letter in count2)) {
                return false;
            }
            let countInCount1 = count1[letter];
            let countInCount2 = count2[letter];
            if (countInCount1 !== countInCount2) {
                return false;
            }
        }
        return true;
    }

};
