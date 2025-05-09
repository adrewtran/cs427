import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';
import EditBookForm from './EditBookForm';

const BookList = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  if (loading && !books.length) {
    return <div className="loading">Loading books...</div>;
  }

  if (error && !books.length) {
    return <div className="error">{error}</div>;
  }

  if (!books.length) {
    return <div className="empty-library">No books in the library. Add some!</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Book Library</h2>
      
      {editingBook ? (
        <EditBookForm book={editingBook} onCancel={handleCancelEdit} />
      ) : (
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
      )}
    </div>
  );
};

export default BookList;
