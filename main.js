
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

function getCardCompany(cardArray) {
    // Convert the array of digits into a string
    const cleanedNumber = cardArray.join('');

    // Define the card issuers with their respective IIN ranges and lengths
    const cardIssuers = [
        { name: "American Express", prefixes: ["34", "37"], lengths: [15] },
        { name: "Diners Club - Carte Blanche", prefixes: ["300", "301", "302", "303", "304", "305"], lengths: [14] },
        { name: "Diners Club - International", prefixes: ["36"], lengths: [14] },
        { name: "Diners Club - USA & Canada", prefixes: ["54"], lengths: [16] },
        { name: "Discover", prefixes: ["6011", "622126", "622925", "644", "645", "646", "647", "648", "649", "65"], lengths: [16, 17, 18, 19] },
        { name: "InstaPayment", prefixes: ["637", "638", "639"], lengths: [16] },
        { name: "JCB", prefixes: ["3528", "3529", "353", "354", "355", "356", "357", "358"], lengths: [16, 17, 18, 19] },
        { name: "Maestro", prefixes: ["5018", "5020", "5038", "5893", "6304", "6759", "6761", "6762", "6763"], lengths: [16, 17, 18, 19] },
        { name: "MasterCard", prefixes: ["51", "52", "53", "54", "55", "222100", "222101", "222102", "222103", "222104", "222105", "222106", "222107", "222108", "222109", "222110", "272099"], lengths: [16] },
        { name: "Visa", prefixes: ["4"], lengths: [13, 16, 19] },
        { name: "Visa Electron", prefixes: ["4026", "417500", "4508", "4844", "4913", "4917"], lengths: [16] }
    ];

    // Check each card issuer
    for (const issuer of cardIssuers) {
        const matchesPrefix = issuer.prefixes.some(prefix => cleanedNumber.startsWith(prefix));
        const matchesLength = issuer.lengths.includes(cleanedNumber.length);

        if (matchesPrefix && matchesLength) {
            return `${issuer.name}`;
        }
    }

    return "Unknown credit card issuer";
}


/*
const getCardCompany = card => {
    if ((card[0] === 3 && card[1] === 4) || (card[0] === 3 && card[1] === 7)) { // Amex begins with 34 or 37
        return'American Express';
    } else if (card[0] === 3 && card[1] === 5 ){  // JCB range is actually 3528–3589
        return 'JCB';
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
    } else if ((card[0] === 3 && card[1] === 0 && card[2] === 0) || // Diners Club – Carte Blanche begins with 300, 301, 302, 303, 304, 305
               (card[0] === 3 && card[1] === 0 && card[2] === 1) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 2) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 3) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 4) || 
               (card[0] === 3 && card[1] === 0 && card[2] === 5)) { 
        return 'Diners Club – Carte Blanche';
    } else if (card[0] === 3 && card[1] === 6) { // Diners Club – International begins with 36
        return 'Diners Club – International';
    } else if (card[0] === 5 && card[1] === 4) { // Diners Club – USA & Canada begins with 54 (length 16)
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
    }  else if ((card[0] === 6 && card[1] === 0 && card[2] === 1 && card[3] === 1) || // Discover begins with 6011, 622126-622925, 644, 645, 647, 648, 649, 65
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
*/

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

// getting details about the cards from this site: https://www.freeformatter.com/credit-card-number-generator-validator.html

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

// Diners Club - Carte Blanche: begins with 300, 301, 302, 303, 304, 305. Length: 14
function generateDcCbCard() {
    let randomCard = [3, 0];

    for (let i=2; i < 14; i++) {
        if (i === 2) { // third digit needsd to be 0-5
            randomCard.push(Math.floor(Math.random() * 6));
        } else {
            randomCard.push(Math.floor(Math.random() * 10));
        }
    }
    randomCard = generateRandomness(randomCard);
    return randomCard; 
}

// Diners Club - International: begins with 36; length: 14
function generateDcIntCard() {
    let randomCard = [3, 6];

    for (let i = 2; i < 14; i++) {
        randomCard.push(Math.floor(Math.random() * 10));
    }
    randomCard = generateRandomness(randomCard);
    return randomCard; 
}

// Maestro: begins with 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763; length: 16-19
function generateMaestroCard() {
    let randomCard = [];
    let beginnings = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763];
    randomCard.push(beginnings[Math.floor(Math.random() * beginnings.length)]);

    for (let i=4; i < Math.floor(Math.random() * 4) + 16 ; i++) { // length 16-19 
        randomCard.push(Math.floor(Math.random() * 10));
    }
    randomCard = generateRandomness(randomCard);
    return randomCard;
}

// Visa Electron: begins with 4026, 417500, 4508, 4844, 4913, 4917; length 16
function generateVisaElCard() {
    let randomCard = [];
    let beginnings = [4026, 417500, 4508, 4844, 4913, 4917];
    randomCard.push(beginnings[Math.floor(Math.random() * beginnings.length)]);
    if (randomCard[2] === 7) {
        randomCard.push(0);
        randomCard.push(0);
        for (let i = 6; i < 16; i++) {
            randomCard.push(Math.floor(Math.random() * 10));
        }
    } else {
        for (let i=4; i< 16; i++) {
            randomCard.push(Math.floor(Math.random() * 10));
        }
    }
    randomCard = generateRandomness(randomCard);
    return randomCard;
}

// InstaPayment: begins with 637, 638, 639; length: 16
function generateInstaPayCard() {
    let randomCard = [];
    let beginnings = [637, 638, 639];
    randomCard.push(beginnings[Math.floor(Math.random() * beginnings.length)]);

    for (let i=4; i < 16 ; i++) { 
        randomCard.push(Math.floor(Math.random() * 10));
    }
    randomCard = generateRandomness(randomCard);
    return randomCard;
}

// American Express: begins with 34, 37; length: 15:
function generateAmexCard() {
    let randomCard = [3];
    if (Math.floor(Math.random() *2) === 1) {
        randomCard.push(4);
    } else {
        randomCard.push(7);
    }
    for (i=2; i<15; i++) {
        randomCard.push(Math.floor(Math.random() * 10));
    }
    randomCard = generateRandomness(randomCard);
    return randomCard;
}


// MasterCard: begins with 51-55, 222100-272099; length 16
function generateMasterCard() {
    let card = [5]; // Initialize the card with the first digit

    // Determine if it's a `5` or `2` prefix-based Mastercard
    if (card[0] === 5) {
        card.push(Math.floor(Math.random() * 5) + 1); // Ensures the range [51-55]
    } else {
        // This case will only run if the first element is `2`, signifying a BIN in the 222100-272099 range
        card = [2, 2]; // Start with `22` for BIN range 222100 - 272099

        // Define the third and fourth digits based on Mastercard's BIN rules
        let thirdDigit = Math.floor(Math.random() * 5) + 2; // Range for third digit is 2-6
        let fourthDigit = thirdDigit === 2 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 10);
        card.push(thirdDigit, fourthDigit);
    }

    // Fill in the remaining digits to reach 16 digits total
    while (card.length < 16) {
        card.push(Math.floor(Math.random() * 10));
    }

    return card;
}

// Discover : begins with 6011, 622126-622925, 644-649, 65; length: 16-19
function generateDiscoverCard() {
    let randomCard = [];
    // Starting digits for Discover cards
    const beginnings = [6011, 622126, 622925, 644, 645, 646, 647, 648, 649, 65];
    
    // Randomly select a beginning
    const start = beginnings[Math.floor(Math.random() * beginnings.length)];
    randomCard.push(...start.toString().split('').map(Number)); // Spread the digits into the array

    // Fill remaining digits to make it a total of 16 digits
    while (randomCard.length < 16) {
        randomCard.push(Math.floor(Math.random() * 10));
    }

    return randomCard;
}

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
        generateDcNaCard(),
        generateDcCbCard(),
        generateDcIntCard(),
        generateAmexCard(),
        generateMaestroCard(),
        generateVisaElCard(),
        generateInstaPayCard(),
        generateMasterCard(),
        generateDiscoverCard()
    ]
    let randomCard = arraysOfCards[Math.floor(Math.random() * arraysOfCards.length)]; // to generate a card
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