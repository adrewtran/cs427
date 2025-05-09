import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'https://67d17ef590e0670699ba5929.mockapi.io/books';

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch books');
      
      // Using placeholder API might not have books endpoint, 
      // so adding fallback data
      let data = await response.json();
      if (!data || data.length === 0) {
        data = [
          { id: 1, title: "React Patterns", author: "Michael Chan" },
          { id: 2, title: "Learning JavaScript", author: "Ethan Brown" },
          { id: 3, title: "Clean Code", author: "Robert C. Martin" }
        ];
      }
      
      setBooks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
      
      // Fallback data for demonstration
      setBooks([
        { id: 1, title: "React Patterns", author: "Michael Chan" },
        { id: 2, title: "Learning JavaScript", author: "Ethan Brown" },
        { id: 3, title: "Clean Code", author: "Robert C. Martin" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (book) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
      
      if (!response.ok) throw new Error('Failed to add book');
      
      const newBook = await response.json();
      // Most mock APIs return the created item with an ID
      setBooks([...books, newBook]);
      setError(null);
      return true;
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
      
      // Fallback behavior for demonstration
      const newBook = { ...book, id: Date.now() };
      setBooks([...books, newBook]);
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing book
  const updateBook = async (updatedBook) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });
      
      if (!response.ok) throw new Error('Failed to update book');
      
      // Update local state
      setBooks(books.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      ));
      setError(null);
      return true;
    } catch (err) {
      console.error('Error updating book:', err);
      setError('Failed to update book. Please try again.');
      
      // Fallback behavior for demonstration
      setBooks(books.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      ));
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete book');
      
      // Update local state
      setBooks(books.filter(book => book.id !== id));
      setError(null);
      return true;
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again.');
      
      // Fallback behavior for demonstration
      setBooks(books.filter(book => book.id !== id));
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ 
      books, 
      addBook, 
      updateBook, 
      deleteBook, 
      loading, 
      error 
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
