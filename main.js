// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// function to validate a credit card:
const validateCred = array => {
    let arrayCopy = array.slice(); // making a copy in order not to mutate the original array
    arrayCopy = arrayCopy.toReversed(); // reversing the array to access from the left side 

    // let mutatedArray = []; // this array will contain the digits which have been operated on
    let sumCheck = 0; // this is needed to check whether the sum modulo 10 is 0

    for (let i = 0; i < arrayCopy.length; i++) {
        let digit = arrayCopy[i];
        if (i % 2 === 1) {
            digit *= 2;
        };
        if (digit > 9) {
            digit -= 9;
        };
        // mutatedArray.push(digit);
        sumCheck += digit;
    };

    if (sumCheck % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

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

// function to identify the credit card companies that have issued faulty numbers:
const idInvalidCardCompanies = invalidArr => {
    let invalidCardCompanies = [];

    for (card of invalidArr) {
        if ((card[0] === 3 && card[1] === 4) || (card[0] === 3 && card[1] === 7)) { // Amex begins with 34 or 37
            if (invalidCardCompanies.findIndex(invalidCard => { // this is needed to make sure there are no duplicates
                return invalidCard === 'Amex (American Express)';
            }) === -1) {
                invalidCardCompanies.push('Amex (American Express)');
            }
        } else if (card[0] === 3 && card[1] === 5 ){  // JCB range is actually 3528–3589
            if (invalidCardCompanies.findIndex(invalidCard => {  
                return invalidCard === 'JCB';
            }) === -1) {
                invalidCardCompanies.push('JCB');
            }
        } else if ((card[0] === 3 && card[1] === 0 && card[2] === 0) || // Diners Club – Carte Blanche begins with 300, 301, 302, 303, 304, 305
                   (card[0] === 3 && card[1] === 0 && card[2] === 1) || 
                   (card[0] === 3 && card[1] === 0 && card[2] === 2) || 
                   (card[0] === 3 && card[1] === 0 && card[2] === 3) || 
                   (card[0] === 3 && card[1] === 0 && card[2] === 4) || 
                   (card[0] === 3 && card[1] === 0 && card[2] === 5)) { 
            if (invalidCardCompanies.findIndex(invalidCard => {  
                return invalidCard === 'Diners Club – Carte Blanche';
            }) === -1) {
                invalidCardCompanies.push('Diners Club – Carte Blanche');
            }
        } else if (card[0] === 3 && card[1] === 6) { // Diners Club – International begins with 36
            if (invalidCardCompanies.findIndex(invalidCard => {  
                return invalidCard === 'Diners Club – International';
            }) === -1) {
                invalidCardCompanies.push('Diners Club – International');
            }
        } else if (card[0] === 5 && card[1] === 4) { // Diners Club – USA & Canada begins with 54
            if (invalidCardCompanies.findIndex(invalidCard => {  
                return invalidCard === 'Diners Club – USA & Canada';
            }) === -1) {
                invalidCardCompanies.push('Diners Club – USA & Canada');
            }
        } else if ((card[0] === 4 && card[1] === 0 && card[2] === 3 && card[3] === 6) || // Visa Electron begins with 4026, 417500, 4508, 4844, 4913, 4917
                   (card[0] === 4 && card[1] === 1 && card[2] === 7 && card[4] === 5 && card[5] === 0 && card[6] === 0) || 
                   (card[0] === 4 && card[1] === 5 && card[2] === 0 && card[3] === 8) || 
                   (card[0] === 4 && card[1] === 8 && card[2] === 4 && card[3] === 4) || 
                   (card[0] === 4 && card[1] === 9 && card[2] === 1 && card[3] === 3) || 
                   (card[0] === 4 && card[1] === 9 && card[2] === 1 && card[3] === 7)){ 
            if (invalidCardCompanies.findIndex(invalidCard => {  
                return invalidCard === 'Visa Electron';
            }) === -1) {
                invalidCardCompanies.push('Visa Electron');
            }
        } else if (card[0] === 4) { // Visa begins with 4
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Visa';
            }) === -1) {
                invalidCardCompanies.push('Visa');
            }
        } else if ((card[0] === 5 && card[1] === 1) || // Mastercard begins with 51, 52, 53, 54, 55, 222100-272099
                   (card[0] === 5 && card[1] === 2) ||
                   (card[0] === 5 && card[1] === 3) ||
                   (card[0] === 5 && card[1] === 4) ||
                   (card[0] === 5 && card[1] === 5) ||
                   (card[0] === 2 && card[1] === 2) || // actually it's a range from 222100-272099
                   (card[0] === 2 && card[1] === 3) ||
                   (card[0] === 2 && card[1] === 4) ||
                   (card[0] === 2 && card[1] === 5) ||
                   (card[0] === 2 && card[1] === 6) ||
                   (card[0] === 2 && card[1] === 7)){
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Mastercard';
            }) === -1) {
                invalidCardCompanies.push('Mastercard');
            }
        } else if ((card[0] === 5 && card[1] === 0 && card[2] === 1 && card[3] === 8) || // Maestro begins with 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763
                   (card[0] === 5 && card[1] === 0 && card[2] === 2 && card[3] === 0) || 
                   (card[0] === 5 && card[1] === 0 && card[2] === 3 && card[3] === 8) || 
                   (card[0] === 5 && card[1] === 8 && card[2] === 9 && card[3] === 3) || 
                   (card[0] === 6 && card[1] === 3 && card[2] === 0 && card[3] === 4) || 
                   (card[0] === 6 && card[1] === 7 && card[2] === 5 && card[3] === 9) || 
                   (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 1) || 
                   (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 2) || 
                   (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 3)){
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Maestro';
            }) === -1) {
                invalidCardCompanies.push('Maestro');
            }
        } else if ((card[0] === 6 && card[1] === 0 && card[2] === 1 && card[3] === 1) || // Discover begins with 6011, 622126-622925, 644, 645, 647, 648, 649, 65
                   (card[0] === 6 && card[1] === 4 && card[2] === 4) || // actually it's a range: 622126-622925
                   (card[0] === 6 && card[1] === 4 && card[2] === 5) ||
                   (card[0] === 6 && card[1] === 4 && card[2] === 7) ||
                   (card[0] === 6 && card[1] === 4 && card[2] === 8) ||
                   (card[0] === 6 && card[1] === 4 && card[2] === 9) ||
                   (card[0] === 6 && card[1] === 5)){
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'Discover';
            }) === -1) {
                invalidCardCompanies.push('Discover');
            }
        }  else if ((card[0] === 6 && card[1] === 3 && card[2] === 7) || // InstaPayment begins with 637, 638, 639
                    (card[0] === 6 && card[1] === 3 && card[2] === 8) || 
                    (card[0] === 6 && card[1] === 3 && card[2] === 9)){
            if (invalidCardCompanies.findIndex(invalidCard => {
                return invalidCard === 'InstaPayment';
            }) === -1) {
                invalidCardCompanies.push('InstaPayment');
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

// function to create an array from a string of number:

const arrayFromString = string => {
    let stringArr = string.split('');

    let numberArr = stringArr.map(string => {
        return parseInt(string);
    });
    return numberArr;
}

/* Testing turning a string of a long number into an array of numbers: 
let testString1 = '4556913208160220';
let testStringArray = arrayFromString(testString1);

console.log(testStringArray);
console.log(validateCred(testStringArray));
console.log(turnInvalidCardValid(testStringArray));
*/

// function to turn invalid cards to valid. By adding a number, which makes the sumCheck % 10 = 0. 

const turnInvalidCardValid = cardArr => {
    if (validateCred(cardArr) === false) {
        let arrayCopy = cardArr.slice(); // making a copy in order not to mutate the original array
        arrayCopy = arrayCopy.toReversed(); // reversing the array to access from the left side 

        let sumCheck = 0;
        for (let i = 0; i < arrayCopy.length; i++) {
            let digit = arrayCopy[i];
            if (i % 2 === 1) {
                digit *= 2;
            };
            if (digit > 9) {
                digit -= 9;
            };
            sumCheck += digit;
        };
        let remainder = sumCheck % 10;
        if (arrayCopy[0] >= remainder) {
            arrayCopy[0] -= remainder;
        } else if (arrayCopy[0] < remainder) {
            arrayCopy[0] += (10-remainder);
        }

        arrayCopy = arrayCopy.toReversed(); // reversing the array again

        if (validateCred(arrayCopy) === true) {
            return arrayCopy;
        }
    } else { // if a card is valid, it won't be changed
        return cardArr;
    }
}

/* testing turning invalid cards to valid: 
let invalid1ToValid = turnInvalidCardValid(invalid1);
let invalid2ToValid = turnInvalidCardValid(invalid2);
let invalid3ToValid = turnInvalidCardValid(invalid3);
let invalid4ToValid = turnInvalidCardValid(invalid4);
let invalid5ToValid = turnInvalidCardValid(invalid5);

console.log(invalid1ToValid);
console.log(invalid2ToValid);
console.log(invalid3ToValid);
console.log(invalid4ToValid);
console.log(invalid5ToValid);

console.log(validateCred(invalid1ToValid));
console.log(validateCred(invalid2ToValid));
console.log(validateCred(invalid3ToValid));
console.log(validateCred(invalid4ToValid));
console.log(validateCred(invalid5ToValid));
*/ 

/* testing turning mystery cards to valid, without mutating correct cards:
console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));

let mystery1ToValid = turnInvalidCardValid(mystery1);
let mystery2ToValid = turnInvalidCardValid(mystery2);
let mystery3ToValid = turnInvalidCardValid(mystery3);
let mystery4ToValid = turnInvalidCardValid(mystery4);
let mystery5ToValid = turnInvalidCardValid(mystery5);

console.log(mystery1ToValid);
console.log(mystery2ToValid);
console.log(mystery3ToValid);
console.log(mystery4ToValid);
console.log(mystery5ToValid);

console.log(validateCred(mystery1ToValid));
console.log(validateCred(mystery2ToValid));
console.log(validateCred(mystery3ToValid));
console.log(validateCred(mystery4ToValid));
console.log(validateCred(mystery5ToValid));
*/

// testing cards from this site: https://www.freeformatter.com/credit-card-number-generator-validator.html

//JCB: begins with 3528-3589
const jcb1 = [3, 5, 4, 2, 5, 1, 0, 7, 7, 9, 8, 8, 9, 4, 8, 5]
const jcb2 = [3, 5, 2, 8, 1, 0, 0, 6, 5, 7, 1, 5, 0, 4, 1, 8]
const jcb3 = [3, 5, 3, 9, 6, 7, 2, 4, 0, 4, 5, 0, 3, 6, 1, 8, 4, 8, 5]
const jcb4 = [3, 5, 5, 4]; 
for (let i=0; i < 14 ; i++) { // generating random card numbers
    jcb4.push(Math.floor(Math.random() * 10))
};

// Diners Club - North America: begins with 54
const dcNa1 = [5, 4, 4, 6, 6, 2, 8, 0, 5, 8, 7, 7, 8, 7, 5, 2]
const dcNa2 = [5, 4, 9, 7, 5, 3, 3, 5, 0, 7, 2, 4, 3, 7, 1]
// Diners Club - Carte Blanche: begins with 300-305
const dcCb1 = [3, 0, 3, 1, 9, 2, 7, 9, 4, 8, 8, 0, 0, 9]
const dcCb2 = [3, 0, 2, 2, 8, 5, 1, 8, 2, 1, 3, 6, 4, 1]
const dcCb3 = [3, 0, 3, 7, 5, 0, 0, 8, 9, 2, 6, 2, 6, 8]
// Diners Club - International: begins with 36
const dcI1 = [3, 6, 8, 9, 6, 4, 8, 9, 9, 4, 7, 9, 9, 3]
const dcI2 = [3, 6, 3, 9, 3, 0, 9, 6, 2, 5, 7, 4, 4, 6]
const dcI3 = [3, 6, 0, 4, 7, 0, 0, 0, 7, 7, 5, 4, 5]
// Maestro: begins with 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763
const mae1 = [6, 7, 6, 2, 5, 8, 1, 2, 6, 8, 2, 0, 3, 7, 4, 6]
const mae2 = [6, 7, 6, 3, 2, 6, 0, 0, 7, 5, 0, 3, 1, 1, 1, 8]
const mae3 = [5, 0, 3, 8, 8, 0, 4, 1, 4, 4, 9, 9, 3, 8, 1, 3]
// Visa Electron: begins with 4026, 417500, 4508, 4844, 4913, 4917
const visaEl1 = [4, 0, 4, 4, 8, 6, 4, 0, 7, 6, 9, 3, 8, 0, 0, 1]
const visaEl2 = [4, 8, 4, 4, 2, 0, 4, 0, 6, 2, 9, 2, 5, 8, 7, 0]
const visaEl3 = [4, 9, 1, 3, 8, 7, 4, 7, 3, 9, 1, 0, 4, 9, 3, 3]
// InstaPayment: begins with 637, 638, 639	
const instaPay1 = [6, 3, 7, 3, 7, 6, 5, 0, 7, 6, 0, 3, 8, 1, 0, 2]
const instaPay2 = [6, 3, 9, 4, 7, 9, 4, 5, 4, 7, 8, 4, 2, 7, 6, 6]
const instaPay3 = [6, 3, 8, 8, 7, 5, 3, 4, 4, 8, 5, 8, 6, 1, 0, 0]
// Discover : begins with 6011, 622126 to 622925, 644, 645, 646, 647, 648, 649, 65
const discover1 = [6, 0, 1, 1, 2, 4, 3, 0, 2, 6, 1, 0, 0, 1, 4, 2]
const discover2 = [6, 4, 4, 5, 1, 5, 2, 1, 7, 5, 5, 4, 8, 0, 2, 2]
const discover3 = [6, 4, 7, 1, 0, 7, 1, 0, 0, 6, 9, 0, 8, 1, 0, 0]
// American Express: begins with 34, 37:
const amex1 = [3, 4, 6, 7, 8, 1, 1, 7, 5, 7, 1, 6, 3, 4, 7]
const amex2 = [3, 7, 2, 1, 4, 7, 1, 8, 2, 1, 7, 6, 0, 5, 0]
// MasterCard: begins with 51, 52, 53, 54, 55, 222100-272099:
const masterC1 = [2, 7, 2, 0, 9, 9, 4, 0, 0, 4, 0, 5, 8, 5, 0, 6]
const masterC2 = [5, 4, 8, 4, 9, 3, 9, 4, 2, 3, 2, 8, 2, 2, 2, 0]

const newBatch = [
    jcb1, jcb2, jcb3, jcb4,
    dcNa1, dcNa2, 
    dcCb1, dcCb2, dcCb3,
    dcI1, dcI2, dcI3,
    mae1, mae2, mae3,
    visaEl1, visaEl2, visaEl3,
    instaPay1, instaPay2, instaPay3,
    discover1, discover2, discover3,
    amex1, amex2,
    masterC1, masterC2
]

// tests
/*
let fakeNewCards = findInvalidCards(newBatch);
console.log(fakeNewCards);

let newFakeCardCompanies = idInvalidCardCompanies(fakeNewCards);
console.log(newFakeCardCompanies);
*/





/* order of creating a website flow: 

Flow A: user inserts a card number: a string
1. function to create an array from a string of number:

const arrayFromString = string => {
    let stringArr = string.split('');

    let numberArr = stringArr.map(string => {
        return parseInt(string);
    });
    return numberArr;
}

2. Validate that card: 

const validateCred = array => {
    let arrayCopy = array.slice(); // making a copy in order not to mutate the original array
    arrayCopy = arrayCopy.toReversed(); // reversing the array to access from the left side 

    // let mutatedArray = []; // this array will contain the digits which have been operated on
    let sumCheck = 0; // this is needed to check whether the sum modulo 10 is 0

    for (let i = 0; i < arrayCopy.length; i++) {
        let digit = arrayCopy[i];
        if (i % 2 === 1) {
            digit *= 2;
        };
        if (digit > 9) {
            digit -= 9;
        };
        // mutatedArray.push(digit);
        sumCheck += digit;
    };

    if (sumCheck % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

3. Turn that card into a valid card:

const turnInvalidCardValid = cardArr => {
    if (validateCred(cardArr) === false) {
        let arrayCopy = cardArr.slice(); // making a copy in order not to mutate the original array
        arrayCopy = arrayCopy.toReversed(); // reversing the array to access from the left side 

        let sumCheck = 0;
        for (let i = 0; i < arrayCopy.length; i++) {
            let digit = arrayCopy[i];
            if (i % 2 === 1) {
                digit *= 2;
            };
            if (digit > 9) {
                digit -= 9;
            };
            sumCheck += digit;
        };
        let remainder = sumCheck % 10;
        if (arrayCopy[0] >= remainder) {
            arrayCopy[0] -= remainder;
        } else if (arrayCopy[0] < remainder) {
            arrayCopy[0] += (10-remainder);
        }

        arrayCopy = arrayCopy.toReversed(); // reversing the array again

        if (validateCred(arrayCopy) === true) {
            return arrayCopy;
        }
    } else { // if a card is valid, it won't be changed
        return cardArr;
    }
}


Flow B: user chooses to generate a credit card number of a certain company

Click on a particular card company logo: 

Generates a card number: 

Click on a button to validate the card.

Turns the card string to array. 

Validates the card. 

Tells the user.

If invalid, click on a button to turn the card valid. 

Turns invalid card array to valid.

Returns the valid string. 

(On top of a correctly formatted card)

*/