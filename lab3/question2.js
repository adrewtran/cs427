"use strict";

let user = { name: "John", years: 30 };

let { name, years: age, isAdmin = false } = user;

console.log(name);
console.log(age);
console.log(isAdmin);

// Example with isAdmin present:
let anotherUser = { name: "Jane", years: 25, isAdmin: true };
let { name: anotherName, years: anotherAge, isAdmin: anotherIsAdmin = false } = anotherUser;

console.log(anotherName);
console.log(anotherAge);
console.log(anotherIsAdmin);
