import React from 'react';
import { BookProvider } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  return (
    <BookProvider>
      <div className="App">
        <header>
          <h1>Book Library Management</h1>
        </header>
        
        <main>
          <div className="container">
            <div className="add-book-section">
              <AddBookForm />
            </div>
            
            <div className="book-list-section">
              <BookList />
            </div>
          </div>
        </main>
        
        <footer>
          <p>Book Library Management System - React Context API</p>
        </footer>
      </div>
    </BookProvider>
  );
}

export default App;
