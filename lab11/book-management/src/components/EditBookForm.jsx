import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../context/BookContext';

const EditBookForm = ({ book, onCancel }) => {
  const { updateBook, loading } = useBookContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author
  });
  const [validation, setValidation] = useState({ title: true, author: true });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Reset validation error when user starts typing
    if (!validation[name]) {
      setValidation({
        ...validation,
        [name]: true
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const titleValid = !!formData.title.trim();
    const authorValid = !!formData.author.trim();
    
    setValidation({
      title: titleValid,
      author: authorValid
    });

    // If any validation fails, stop submission
    if (!titleValid || !authorValid) {
      return;
    }

    // Update the book
    const result = await updateBook(formData);
    
    if (result) {
      setMessage('Book updated successfully!');
      setTimeout(() => {
        setMessage('');
        navigate('/'); // Navigate back to list
      }, 2000);
    }
  };

  return (
    <div className="edit-book-form">
      <h2>Edit Book</h2>
      
      {message && (
        <div className="success-message">{message}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
          />
          {!validation.title && (
            <div className="error-message">Title is required</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={loading}
          />
          {!validation.author && (
            <div className="error-message">Author is required</div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Book'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={loading}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
