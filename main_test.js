let assert = require('assert');
let { validateCred } = require('./main.js');  // Using CommonJS to require the function

describe('checking the validity of the credit card', () => {
    it('should return true for a valid credit card number', () => {
        // setup
        const testArray = [3,4,9,5,9,9,5,4,0,4,9,8,3,1,9];
        const expected = true;

        // exercise
        const result = validateCred(testArray);
        // verify
        assert.equal(result, expected);
    });
    it('should return false for an invalid credit card number', () => {
        // setup
        const testArray = [3,4,9,5,9,9,5,4,0,4,9,8,3,1,6];
        const expected = false;

        // exercise
        const result = validateCred(testArray);
        // verify
        assert.equal(result, expected);
    });
});