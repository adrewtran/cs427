import React, { useReducer } from 'react';
import Product from './Product';

const initialData = [
  { id: 1, name: 'Apple', price: 1, inStock: true },
  { id: 2, name: 'Banana', price: 1, inStock: false },
  { id: 3, name: 'Cherry', price: 2, inStock: true }
];

function productsReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_STOCK':
      return state.map(product => 
        product.id === action.id 
          ? { ...product, inStock: !product.inStock } 
          : product
      );
    default:
      return state;
  }
}

function ProductsListUseReducer() {
  const [products, dispatch] = useReducer(productsReducer, initialData);

  const toggleStock = (id) => {
    dispatch({ type: 'TOGGLE_STOCK', id });
  };

  return (
    <div className="products-list">
      <h2>Products List (useReducer version)</h2>
      {products.map(product => (
        <Product 
          key={product.id} 
          {...product} 
          onToggleStock={() => toggleStock(product.id)} 
        />
      ))}
    </div>
  );
}

export default ProductsListUseReducer;