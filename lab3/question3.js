"use strict";

let libraryBooks = [
  { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
  { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
  { title: "The Road Ahead", author: "Bill Gates", ID: 4268 }, // Note: Duplicate ID with different title/author in original data
  { title: "Mockingjay: The Final Book of The Hunger Games", author: "Suzanne Collins", ID: 3257 }
];

/**
 * Adds a new book to the library if it doesn't already exist based on ID.
 * Uses a regular function declaration.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} ID - The unique ID of the book.
 * @returns {object | undefined} The newly created book object if added, or undefined if a book with the same ID already exists.
 */
function addBook(title, author, ID) {
  // Check if a book with the same ID already exists
  const existingBook = libraryBooks.find(book => book.ID === ID);

  if (existingBook) {
    console.log(`Book with ID ${ID} already exists.`);
    // Optionally return the existing book, or undefined as per requirement
    return undefined;
  }

  const newBook = { title, author, ID };
  libraryBooks.push(newBook);
  console.log(`Added book: "${title}" by ${author} (ID: ${ID})`);
  return newBook;
}

/**
 * Returns an array of all book titles, sorted alphabetically.
 * Uses an arrow function.
 *
 * @returns {string[]} An array of book titles sorted alphabetically.
 */
const getTitles = () => {
  // Use map to extract titles, then sort alphabetically
  return libraryBooks.map(book => book.title).sort();
};

/**
 * Finds books whose title contains the given keyword (case-insensitive)
 * and returns them sorted by ID.
 * Uses a function expression.
 *
 * @param {string} keyword - The keyword to search for in book titles.
 * @returns {object[]} An array of book objects matching the keyword, sorted by ID.
 */
const findBooks = function(keyword) {
  if (typeof keyword !== 'string' || keyword.trim() === '') {
    console.log("Please provide a valid keyword.");
    return [];
  }

  const lowerKeyword = keyword.toLowerCase();

  // Filter books that contain the keyword in their title (case-insensitive)
  const foundBooks = libraryBooks.filter(book =>
    book.title.toLowerCase().includes(lowerKeyword)
  );

  // Sort the found books by ID
  foundBooks.sort((a, b) => a.ID - b.ID);

  return foundBooks;
};

// --- Example Usage ---

console.log("--- Initial Library ---");
console.log(libraryBooks);

console.log("\n--- Adding Books ---");
addBook("New Book 1", "Author A", 5000); // Should be added
addBook("Existing Book", "Author B", 1235); // Should not be added (ID 1235 exists)
addBook("New Book 2", "Author C", 6000); // Should be added

console.log("\n--- Library After Adding ---");
console.log(libraryBooks);

console.log("\n--- Getting Titles ---");
const titles = getTitles();
console.log("Sorted Titles:", titles);

console.log("\n--- Finding Books ---");
const foundByRoad = findBooks("Road");
console.log("Books with 'Road':", foundByRoad);

const foundByJobs = findBooks("Jobs");
console.log("Books with 'Jobs':", foundByJobs); // Should find Walter Isaacson

const foundByHunger = findBooks("Hunger");
console.log("Books with 'Hunger':", foundByHunger);

const foundByNonExistent = findBooks("NonExistent");
console.log("Books with 'NonExistent':", foundByNonExistent); // Should be empty array

const foundByEmpty = findBooks("");
console.log("Books with empty keyword:", foundByEmpty); // Should log message and return empty array
