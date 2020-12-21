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
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
function validateCred(credNumber) { // Validates CC number using Luhn algorithm
  var credNumberSum = 0;
  var notMultiply = true; // Define if needs to be multiplied or not 
  for (let index = credNumber.length - 1; index >= 0; index--) { // Loops through CC number reversed
    if (notMultiply) {
      credNumberSum += credNumber[index]; // Sum number
      notMultiply = !notMultiply; // Set true to multiply next number
    } else {
      let credNumberMultiply = (credNumber[index] > 4) ? // Verify if the multiplied number is bigger than 4 
        credNumber[index] * 2 - 9 : credNumber[index] * 2;  // Sum the multiplied or multiplied and subtracted
      credNumberSum += credNumberMultiply; // Sum number
      notMultiply = !notMultiply; // Set false to multiply next number
    }
  }
  let span = document.getElementById('result');
  if (credNumberSum % 10 === 0) { // Check if it's valid by Luhn algorithm 
    span.innerHTML = "CC number: " + credNumber.join('') + " is valid!";
    return true;
  } else {
    span.innerHTML = "CC number: " + credNumber.join('') + " isn't valid!";
    return false;
  }
}

function findInvalidCards(cards) { // Finds invalid CC numbers in nested array of CC numbers
  var invalidCards = [];
  cards.forEach(card => {
    if (!validateCred(card)) // Check if it's invalid
      invalidCards.push(card);
  });
  return invalidCards;
}

function idInvalidCardCompanies(cards) {
  var companies = [];
  cards.forEach(card => { // Check the invalid card company
    switch (card[0]) {
      case 3:
        companies.push('Amex (American Express)');
        break;    
      case 4:
        companies.push('Visa');
        break;
      case 5:
        companies.push('Mastercard');
        break;
      case 6:
        companies.push('Discover');
        break;
      default:
        companies.push('Company not found');
        break;
    }
  });
  companies = [...new Set(companies)];
  companies.filter((item, index) => companies.indexOf(item) === index);
  companies.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
  return companies
}

function strToArr(cardNumber) {
  let cardNumberArr = cardNumber.split(""); // Transform CC number string into an array
  var cardNumberArrInt = [];
  cardNumberArr.forEach(num => {
    cardNumberArrInt.push(parseInt(num)); // Transform string array into integer array
  });
  return cardNumberArrInt;
}

let cardNumbers = '';
batch.forEach(arr => {
  cardNumbers += '<li>' + arr.join("") + '<button onclick="validateCred(['+arr+'])">Validate</button></li>';  
});
document.getElementById('valid').innerHTML = cardNumbers;


