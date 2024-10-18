// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4] // prints false
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3] // prints false
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3] // prints false
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

const test1 = [7, 0, 0, 3, 5, 0, 0, 0, 6, 3, 0, 7, 2, 5, 2, 3] // an invalid card by an "unknown company"

// An array of all the arrays above
const batch = [
    valid1, valid2, valid3, valid4, valid5, 
    invalid1, invalid2, invalid3, invalid4, invalid5, 
    mystery1, mystery2, mystery3, mystery4, mystery5, 
    test1
]


// function to validate a credit card:
const validateCred = array => {
    let arrayCopy = array.slice(); // making a copy in order not to mutate the original array
    arrayCopy = arrayCopy.toReversed(); // reversing the array to access from the left side 

    let mutatedArray = []; // this array will contain the digits which have been operated on
    let sumCheck = 0; // this is needed to check whether the sum modulo 10 is 0

    for (let i = 0; i < arrayCopy.length; i++) {
        let digit = arrayCopy[i];
        if (i % 2 === 1) {
            digit *= 2;
        };
        if (digit > 9) {
            digit -= 9;
        };
        mutatedArray.push(digit);
        sumCheck += digit;
    };
    // console.log(mutatedArray); 
    // console.log(sumCheck);
    if (sumCheck % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

/* testing all the credit cards: 

console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));

console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));
*/

// function to iterate through a nested array of credit cards numbers, and return all the invalid cards. 
const findInvalidCards = nestedArr => {
    let invalidCards = [];
    for (let i = 0; i < nestedArr.length; i++) {
        let card = nestedArr[i];
        if (validateCred(card) === false) {
            invalidCards.push(card);
        }
    }
    return invalidCards;
}

// testing the previous function
let fakeCards = findInvalidCards(batch);
console.log(fakeCards);

// function to identify the credit card companies that have issued faulty numbers:
const idInvalidCardCompanies = invalidArr => {
    let invalidCardCompanies = [];
    for (card of invalidArr) {
        if (card[0] === 3) {
            if (invalidCardCompanies.findIndex(invalidCard => { // this is needed to make sure there are no duplicates
                return invalidCard === 'Amex (American Express)';
            }) === -1) {
                invalidCardCompanies.push('Amex (American Express)');
            }
        } else if (card[0] === 4) {
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Visa';
            }) === -1) {
                invalidCardCompanies.push('Visa');
            }
        } else if (card[0] === 5) {
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Mastercard';
            }) === -1) {
                invalidCardCompanies.push('Mastercard');
            }
        } else if (card[0] === 6) {
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Discover';
            }) === -1) {
                invalidCardCompanies.push('Discover');
            }
        } else {
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Unknown company';
            }) === -1) {
                invalidCardCompanies.push('Unknown company');
            }
        }
    }  
    return invalidCardCompanies;
}

// testing the previous function:
let fakeCardCompanies = idInvalidCardCompanies(fakeCards);
console.log(fakeCardCompanies);

