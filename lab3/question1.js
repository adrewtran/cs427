"use strict";

// a) computeSumOfSquares using a function expression and functional programming
const computeSumOfSquares = function(numbers) {
  if (!Array.isArray(numbers)) {
    console.error("Input must be an array.");
    return NaN;
  }
  return numbers
    .map(number => number * number)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

// b) printOddNumbersOnly using an arrow function
const printOddNumbersOnly = (numbers) => {
  if (!Array.isArray(numbers)) {
    console.error("Input must be an array.");
    return;
  }
  numbers.filter(number => number % 2 !== 0)
         .forEach(oddNumber => console.log(oddNumber));
};

// c) printFibo using a regular function declaration
function printFibo(n, a, b) {
  if (typeof n !== 'number' || n < 1 || typeof a !== 'number' || typeof b !== 'number') {
    console.error("Invalid input: n must be a positive number, a and b must be numbers.");
    return;
  }

  let sequence = [];
  let currentA = a;
  let currentB = b;

  if (n >= 1) {
    sequence.push(currentA);
  }
  if (n >= 2) {
    sequence.push(currentB);
  }

  for (let i = 2; i < n; i++) {
    let next = currentA + currentB;
    sequence.push(next);
    currentA = currentB;
    currentB = next;
  }

  console.log(sequence.join(", "));
}
