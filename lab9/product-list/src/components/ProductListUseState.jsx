import React, { useState } from 'react';
import Product from './Product';

function ProductsListUseState() {
  const initialData = [
    { id: 1, name: 'Apple', price: 1, inStock: true },
    { id: 2, name: 'Banana', price: 1, inStock: false },
    { id: 3, name: 'Cherry', price: 2, inStock: true }
  ];

  const [products, setProducts] = useState(initialData);

  const toggleStock = (id) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id 
          ? { ...product, inStock: !product.inStock } 
          : product
      )
    );
  };

  return (
    <div className="products-list">
      <h2>Products List (useState version)</h2>
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

export default ProductsListUseState;