
// function to validate a credit card:
const validateCred = cardArray => {
    let arrayCopy = cardArray.slice().reverse(); // working on a copy; accessing from the left side 
    let sumCheck = 0; // to check whether the sum modulo 10 is 0

    for (let i = 0; i < arrayCopy.length; i++) {
        let digit = arrayCopy[i];
        if (i % 2 === 1) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sumCheck += digit;
    }

    return sumCheck % 10 === 0; // if % 10 === 0 returns true, else false
}


// Export the function using CommonJS
module.exports = {validateCred};