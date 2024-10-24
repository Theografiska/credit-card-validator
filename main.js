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

// function to get the card company for a single card:

const getCardCompany = card => {
    if ((card[0] === 3 && card[1] === 4) || (card[0] === 3 && card[1] === 7)) { // Amex begins with 34 or 37
        return'American Express';
    } else if (card[0] === 3 && card[1] === 5 ){  // JCB range is actually 3528–3589
        return 'JCB';
    } else if ((card[0] === 3 && card[1] === 0 && card[2] === 0) || // Diners Club – Carte Blanche begins with 300, 301, 302, 303, 304, 305
               (card[0] === 3 && card[1] === 0 && card[2] === 1) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 2) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 3) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 4) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 5)) { 
        return 'Diners Club – Carte Blanche';
    } else if (card[0] === 3 && card[1] === 6) { // Diners Club – International begins with 36
        return 'Diners Club – International';
    } else if (card[0] === 5 && card[1] === 4) { // Diners Club – USA & Canada begins with 54
        return 'Diners Club – USA & Canada';
    } else if ((card[0] === 4 && card[1] === 0 && card[2] === 3 && card[3] === 6) || // Visa Electron begins with 4026, 417500, 4508, 4844, 4913, 4917
               (card[0] === 4 && card[1] === 1 && card[2] === 7 && card[4] === 5 && card[5] === 0 && card[6] === 0) || 
               (card[0] === 4 && card[1] === 5 && card[2] === 0 && card[3] === 8) || 
               (card[0] === 4 && card[1] === 8 && card[2] === 4 && card[3] === 4) || 
               (card[0] === 4 && card[1] === 9 && card[2] === 1 && card[3] === 3) || 
               (card[0] === 4 && card[1] === 9 && card[2] === 1 && card[3] === 7)){ 
        return 'Visa Electron';
    } else if (card[0] === 4) { // Visa begins with 4
        return 'Visa';
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
        return 'Mastercard';
    } else if ((card[0] === 5 && card[1] === 0 && card[2] === 1 && card[3] === 8) || // Maestro begins with 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763
               (card[0] === 5 && card[1] === 0 && card[2] === 2 && card[3] === 0) || 
               (card[0] === 5 && card[1] === 0 && card[2] === 3 && card[3] === 8) || 
               (card[0] === 5 && card[1] === 8 && card[2] === 9 && card[3] === 3) || 
               (card[0] === 6 && card[1] === 3 && card[2] === 0 && card[3] === 4) || 
               (card[0] === 6 && card[1] === 7 && card[2] === 5 && card[3] === 9) || 
               (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 1) || 
               (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 2) || 
               (card[0] === 6 && card[1] === 7 && card[2] === 6 && card[3] === 3)){
        return 'Maestro';
    } else if ((card[0] === 6 && card[1] === 0 && card[2] === 1 && card[3] === 1) || // Discover begins with 6011, 622126-622925, 644, 645, 647, 648, 649, 65
               (card[0] === 6 && card[1] === 4 && card[2] === 4) || // actually it's a range: 622126-622925
               (card[0] === 6 && card[1] === 4 && card[2] === 5) ||
               (card[0] === 6 && card[1] === 4 && card[2] === 7) ||
               (card[0] === 6 && card[1] === 4 && card[2] === 8) ||
               (card[0] === 6 && card[1] === 4 && card[2] === 9) ||
               (card[0] === 6 && card[1] === 5)){
        return 'Discover';
    }  else if ((card[0] === 6 && card[1] === 3 && card[2] === 7) || // InstaPayment begins with 637, 638, 639
                (card[0] === 6 && card[1] === 3 && card[2] === 8) || 
                (card[0] === 6 && card[1] === 3 && card[2] === 9)){
        return 'InstaPayment';
    } else {
            return 'Unknown company';
    }
    }

// function to create an array from a string of number:

const arrayFromString = string => {
    let stringArr = string.split('');

    let numberArr = stringArr.map(string => {
        return parseInt(string);
    });
    return numberArr;
}

// function to turn invalid card to valid. By adding a number, which makes the sumCheck % 10 = 0. 

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


// testing cards from this site: https://www.freeformatter.com/credit-card-number-generator-validator.html

//JCB: begins with 3528-3589
const jcb1 = [3, 5, 4, 2, 5, 1, 0, 7, 7, 9, 8, 8, 9, 4, 8, 5]
const jcb2 = [3, 5, 2, 8, 1, 0, 0, 6, 5, 7, 1, 5, 0, 4, 1, 8]
const jcb3 = [3, 5, 3, 9, 6, 7, 2, 4, 0, 4, 5, 0, 3, 6, 1, 8, 4, 8, 5]
const jcb4 = [3, 5, 5, 4]; 
for (let i=0; i < 14 ; i++) { // generating random card numbers
    jcb4.push(Math.floor(Math.random() * 10));
};

// Diners Club - North America: begins with 54
const dcNa1 = [5, 4, 4, 6, 6, 2, 8, 0, 5, 8, 7, 7, 8, 7, 5, 2]
const dcNa2 = [5, 4, 9, 7, 5, 3, 3, 5, 0, 7, 2, 4, 3, 7, 1]
const dcNa3 = [5, 4]
for (let i=0; i < 13; i++) {
    dcNa3.push(Math.floor(Math.random() * 10));
}
// Diners Club - Carte Blanche: begins with 300-305
const dcCb1 = [3, 0, 3, 1, 9, 2, 7, 9, 4, 8, 8, 0, 0, 9]
const dcCb2 = [3, 0, 2, 2, 8, 5, 1, 8, 2, 1, 3, 6, 4, 1]
const dcCb3 = [3, 0, 3, 7, 5, 0, 0, 8, 9, 2, 6, 2, 6, 8]
const dcCb4 = [3, 0, 4]
for (let i=0; i < 13; i++) {
    dcCb4.push(Math.floor(Math.random() * 9));
}
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
    dcNa1, dcNa2, dcNa3,
    dcCb1, dcCb2, dcCb3, dcCb4,
    dcI1, dcI2, dcI3,
    mae1, mae2, mae3,
    visaEl1, visaEl2, visaEl3,
    instaPay1, instaPay2, instaPay3,
    discover1, discover2, discover3,
    amex1, amex2,
    masterC1, masterC2
]

// website interactivity:

document.getElementById('try-card').innerHTML = 'Step 1. Generate a new card number to try.';
let tryCardElement = document.getElementById('try-card');
tryCardElement.style.color = 'black';

// generate a card number button interactivity:

let generateCardButton = document.createElement('button');
generateCardButton.id = 'cardBox';
generateCardButton.innerHTML = 'Generate a card number';
document.getElementById('generate-a-new').appendChild(generateCardButton);
generateCardButton.style.marginBottom = '2rem';
generateCardButton.style.backgroundColor = 'red';


let validateCardButton = document.createElement('button');
validateCardButton.id = 'validateButton';
validateCardButton.innerHTML = 'Validate the card';
validateCardButton.style.backgroundColor = 'blue';
validateCardButton.style.color = 'white';

let turnInvalidValidButton = document.createElement('button');
turnInvalidValidButton.id = 'turnInvalidValidButton';
turnInvalidValidButton.innerHTML = 'Turn the card valid';
turnInvalidValidButton.style.backgroundColor = 'blue';
turnInvalidValidButton.style.color = 'white';


function generateNewCard() {
    function deletePreviousCard() { // clearing out the previous message;
        let previousCard = document.getElementById('cardMessage');
        if (previousCard) {
            previousCard.remove();
        }
        let validateDiv = document.getElementById('trueMessage');
        if (validateDiv) {
            validateDiv.remove();
        }
        let turnInvalidValidDiv = document.getElementById('fixed-card');
        if (turnInvalidValidDiv) {
            turnInvalidValidDiv.remove();
        }
    };
    deletePreviousCard(); 
    let randomCard = newBatch[Math.floor(Math.random() * newBatch.length)];
    let newNo = document.createElement('p');
    let cardCo = getCardCompany(randomCard);
    let cardMessage = "Your card number is: <br><br>" + randomCard.join('') + " | " + cardCo;
    newNo.innerHTML = cardMessage;
    newNo.id = 'cardMessage';
    document.getElementById('generate-a-new').appendChild(newNo);
    generateCardButton.innerHTML = 'Generate again';
    generateCardButton.style.backgroundColor = 'blue';
    generateCardButton.style.color = 'white';

    // validating the card:
    document.getElementById('validate-card').innerHTML = 'Step 2. Validate the card number.';
    document.getElementById('validate-div').appendChild(validateCardButton);

    function validateCard() {
        function deletePreviousValidation() { // clearing out the previous message;
            let validateDiv = document.getElementById('trueMessage');
            if (validateDiv) {
                validateDiv.remove();
            }
            let turnInvalidValidDiv = document.getElementById('fixed-card');
            if (turnInvalidValidDiv) {
            turnInvalidValidDiv.remove();
            }
        };
        deletePreviousValidation(); 
        let trueMessage = document.createElement('p');
        trueMessage.id = 'trueMessage';
        trueMessage.style.marginTop = '2rem';
        trueMessage.style.fontWeight = 'bold';
        if (validateCred(randomCard) === true) {
            trueMessage.innerHTML = 'Your card is valid.';
            trueMessage.style.color = 'green';
        } else {
            trueMessage.innerHTML = 'Your card is invalid.';
            trueMessage.style.color = 'red';
            document.getElementById('turn-valid-heading').innerHTML = '(Optional: Step 3.) Turn your invalid card valid.';
            document.getElementById('turn-valid').appendChild(turnInvalidValidButton);

            // generating a new valid number:
            function turnValidFunction() {
                function deletePreviousInvalidToValid() { // clearing out the previous message;
                    let fixedDiv = document.getElementById('fixed-card');
                    if (fixedDiv) {
                        fixedDiv.remove();
                    }
                };
                deletePreviousInvalidToValid(); 
                correctCard = turnInvalidCardValid(randomCard);
                let fixedCard = document.createElement('p');
                let newMessage = "The corrected card number is: <br><br>" + correctCard.join('') + " | " + cardCo;
                fixedCard.innerHTML = newMessage;
                fixedCard.id = 'fixed-card';
                fixedCard.style.marginTop = '2rem';
                document.getElementById('turn-valid').appendChild(fixedCard);
            }

            turnInvalidValidButton.addEventListener('click', turnValidFunction);
        }
        document.getElementById('validate-div').appendChild(trueMessage);
    }
    validateCardButton.addEventListener('click', validateCard);

    // turning an invalid card calid: 
    /*if (validateCred(randomCard) === false) {
    }*/
}

generateCardButton.addEventListener('click', generateNewCard);



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

Done: Generates a card number: 
Done: Click on a button to validate the card. Turns the card string to array. Validates the card. Tells the user.

If invalid, click on a button to turn the card valid. 

Turns invalid card array to valid.

Returns the valid string. 

(On top of a correctly formatted card)

*/