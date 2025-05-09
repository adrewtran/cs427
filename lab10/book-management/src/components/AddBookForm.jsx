import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';

const AddBookForm = () => {
  const { addBook, loading } = useBookContext();
  const [formData, setFormData] = useState({ title: '', author: '' });
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

    // Add the book
    const result = await addBook(formData);
    
    if (result) {
      setMessage('Book added successfully!');
      setFormData({ title: '', author: '' }); // Reset form
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      
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
        
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
