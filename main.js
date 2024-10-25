// function to validate a credit card:
const validateCred = cardArray => {
    let arrayCopy = cardArray.slice().reverse(); // making a copy; reversing the array to access from the left side 
    let sumCheck = 0; // this is needed to check whether the sum modulo 10 is 0

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

    return sumCheck % 10 === 0;
}

// function to identify the card company for a single card:

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
        let arrayCopy = cardArr.slice().reverse(); 

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

        arrayCopy = arrayCopy.reverse(); // reversing the array again

        if (validateCred(arrayCopy) === true) {
            return arrayCopy;
        }
    } else { // if a card is valid, it won't be changed
        if (validateCred(cardArr) === true) { // but still checked again if it's valid
            return cardArr;
        }
    }
}

// testing cards from this site: https://www.freeformatter.com/credit-card-number-generator-validator.html

// function to generate randomness (to be applied within specific card company functions):
function generateRandomness(card) {
    if (Math.floor(Math.random() * 2)) {
        card = turnInvalidCardValid(card);
    }
    return card;
} 

//JCB: begins with 3528-3589; length: 16-19
function generateJcbCard(){
    let randomCard = [3, 5];

    for (let i=2; i < Math.floor(Math.random() * 4) + 16 ; i++) { // length 16-19 
        if (i === 2) { // third digit needs to be 2-8
            randomCard.push(Math.floor(Math.random() * 7) + 2);
        } else if (i === 3 && randomCard[2] === 2) { // if 3rd digit is 2, then 4th should be 8-9
            randomCard.push(Math.floor(Math.random() * 2) + 8); 
        } else {
            randomCard.push(Math.floor(Math.random() * 10));
        }
    }
    randomCard = generateRandomness(randomCard);
    return randomCard; 
};

// Diners Club - North America: begins with 54; length 16 digits
function generateDcNaCard() {
    let randomCard = [5, 4];

    for (let i = 2; i < 16; i++) {
        randomCard.push(Math.floor(Math.random() * 10));
    }
    randomCard = generateRandomness(randomCard);
    return randomCard; 
}

const dcNa1 = [5, 4, 4, 6, 6, 2, 8, 0, 5, 8, 7, 7, 8, 7, 5, 2]
for (let i=0; i < 13; i++) {
    dcNa1.push(Math.floor(Math.random() * 10));
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


// function to create buttons: 
function createNewButton(id, text, bgColor, textColor) {
    let button = document.createElement('button');
    button.id = id;
    button.innerHTML = text;
    button.style.backgroundColor = bgColor;
    button.style.color = textColor;
    return button;
}

let generateCardButton = document.getElementById('cardButton');
generateCardButton.style.marginBottom = '2rem';

let validateCardButton = createNewButton('validateButton', 'Validate the card', 'blue', 'white');
let turnValidButton = createNewButton('turnValidButton', 'Turn the card valid', 'blue', 'white');
let validateAgainButton = createNewButton('validateAgainButton', 'Validate again', 'blue', 'white');


// function to remove elements:
function removeElementById(id) {
    let element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function generateNewCard() {
    // clearing out the previous message:
    removeElementById('cardMessage');
    removeElementById('validatingMessage');
    removeElementById('turnValidMessage');
    removeElementById('validateAgainMessage');

    document.getElementById('turn-valid-heading').innerHTML = '';
    document.getElementById('validate-again-heading').innerHTML = '';
    removeElementById('turnValidButton');
    removeElementById('validateAgainButton');

    // generating a card number:
    const arraysOfCards = [
        generateJcbCard(),
        generateDcNaCard()
    ]
    let randomCard = arraysOfCards[Math.floor(Math.random() * arraysOfCards.length)]; // to generate a JCB card
    let cardCo = getCardCompany(randomCard); // shows which company issued the card

    // creating the message:
    let newCardMessage = document.createElement('p');
    let cardNumber = randomCard.join('');
    let phrase = `The card number is:<br><br><span>${cardNumber} | ${cardCo}</span>`;
    newCardMessage.innerHTML = phrase;
    newCardMessage.id = 'cardMessage';

    // appending the new card message below the generate button:
    document.getElementById('generate-new-card-section').appendChild(newCardMessage); 

    // changing the red button in step 1 to blue:
    generateCardButton.innerHTML = 'Generate again'; 
    generateCardButton.style.backgroundColor = 'blue';
    generateCardButton.style.color = 'white';

    // second section gets added automatically:
    document.getElementById('validate-card-heading').innerHTML = 'Step 2. Validate the card number.'; // Step 2: validate card heading
    document.getElementById('validate-card-section').appendChild(validateCardButton); // adding the validate card button

    // validating a card:
    function validateCard() {
        removeElementById('validatingMessage');
        removeElementById('turnValidMessage');
        removeElementById('validateAgainMessage');

        // Generating a step 2 message to render to the DOM:
        let validatingMessage = document.createElement('p');
        validatingMessage.id = 'validatingMessage';
        validatingMessage.style.marginTop = '2rem';
        validatingMessage.style.fontWeight = 'bold';

        removeElementById('validateButton'); // TESTING

        if (validateCred(randomCard) === true) {
            validatingMessage.innerHTML = 'This card number is valid.';
            validatingMessage.style.color = 'green';
            document.getElementById('turn-valid-heading').innerHTML = ''; // TESTING
            removeElementById('turnValidButton'); // TESTING
            document.getElementById('validate-again-heading').innerHTML = ''; // TESTING
        } else if (validateCred(randomCard) === false) {
            validatingMessage.innerHTML = 'This card number is invalid.';
            validatingMessage.style.color = 'red';

            // step 3 section gets added in case it's a faulty card:
            document.getElementById('turn-valid-heading').innerHTML = '(Optional: Step 3.) Turn an invalid card valid.';
            document.getElementById('turn-valid-section').appendChild(turnValidButton);

            // generating a new valid number:
            function turnValidFunction() {
                removeElementById('turnValidMessage');
                removeElementById('validateAgainMessage');
                
                let correctedCard = turnInvalidCardValid(randomCard);
                let fixedCard = document.createElement('p');
                let cardNumber = correctedCard.join('');
                let newMessage = `The corrected card number is:<br><br><span>${cardNumber} | ${cardCo}</span>`;
                fixedCard.innerHTML = newMessage;
                fixedCard.id = 'turnValidMessage';
                fixedCard.style.marginTop = '2rem';
                document.getElementById('turn-valid-section').appendChild(fixedCard);

                removeElementById('turnValidButton'); // TESTING

                document.getElementById('validate-again-heading').innerHTML = '(Optional: Step 4.) Validate the card again.';
                document.getElementById('validate-again-section').appendChild(validateAgainButton);

                function validateAgain() {
                    removeElementById('validateAgainMessage');

                    let validateAgainMessage = document.createElement('p');
                    validateAgainMessage.id = 'validateAgainMessage';
                    validateAgainMessage.style.marginTop = '2rem';
                    validateAgainMessage.style.fontWeight = 'bold';

                    removeElementById('validateAgainButton');

                    if (validateCred(correctedCard) === true) {
                        validateAgainMessage.innerHTML = 'The card number is now definitely valid.';
                        validateAgainMessage.style.color = 'green';
                    } else {
                        validateAgainMessage.innerHTML = 'This did not work as expected. The new card is also invalid.';
                        validateAgainMessage.style.color = 'red';
                    }
                    document.getElementById('validate-again-section').appendChild(validateAgainMessage);
                }
                validateAgainButton.addEventListener('click', validateAgain);
            }
            turnValidButton.addEventListener('click', turnValidFunction);
        }
        document.getElementById('validate-card-section').appendChild(validatingMessage);
        turnValidButton.addEventListener('click', turnValidFunction);
    }
    validateCardButton.addEventListener('click', validateCard);
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
Done: If invalid, click on a button to turn the card valid. Turns invalid card array to valid. Returns the valid string. 

(On top of a correctly formatted card)

*/