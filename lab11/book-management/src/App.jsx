import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { BookProvider, useBookContext } from './context/BookContext';
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import './App.css';

// Wrapper component to handle edit route with params
const EditBookWrapper = () => {
  const { id } = useParams();
  const { books } = useBookContext();
  const navigate = useNavigate();
  
  const book = books.find(b => b.id === Number(id) || b.id === id);
  
  if (!book) {
    return <Navigate to="/" replace />;
  }
  
  return <EditBookForm book={book} onCancel={() => navigate('/')} />;
};

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <header>
            <h1>Book Library Management</h1>
            <Navigation />
          </header>
          
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/add" element={<AddBookForm />} />
                <Route path="/edit/:id" element={<EditBookWrapper />} />
              </Routes>
            </div>
          </main>
          
          <footer>
            <p>Book Library Management System - React Router</p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;
