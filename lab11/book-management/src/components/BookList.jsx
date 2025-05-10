import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../context/BookContext';

const BookList = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const navigate = useNavigate();

  const handleEdit = (book) => {
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
    }
  };

  if (loading && !books.length) {
    return <div className="loading">Loading books...</div>;
  }

  if (error && !books.length) {
    return <div className="error">{error}</div>;
  }

  if (!books.length) {
    return (
      <div className="empty-library">
        No books in the library. 
        <button onClick={() => navigate('/add')} className="add-button">
          Add some books
        </button>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <h2>Book Library</h2>
      
      <div className="book-grid">
        {books.map(book => (
          <div className="book-card" key={book.id}>
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
            <div className="book-actions">
              <button 
                className="edit-button" 
                onClick={() => handleEdit(book)}
                disabled={loading}
              >
                Edit
              </button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(book.id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
