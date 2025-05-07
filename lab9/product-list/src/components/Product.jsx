import React from 'react';

function Product({ id, name, price, inStock, onToggleStock }) {
  const nameStyle = {
    color: inStock ? 'green' : 'red',
    fontWeight: 'bold'
  };

  return (
    <div className="product" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0',
      backgroundColor: '#000'
    }}>
      <h3 style={nameStyle}>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Status: {inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button 
        onClick={onToggleStock}
        style={{
          backgroundColor: inStock ? '#ff6b6b' : '#51cf66',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
      </button>
    </div>
  );
}

export default Product;