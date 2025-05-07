import React, { useState } from 'react';
import ProductsListUseState from './components/ProductListUseState';
import ProductsListUseReducer from './components/ProductListUseReducer';

function App() {
  const [useReducerVersion, setUseReducerVersion] = useState(false);
  
  return (
    <div className="App">
      <h1>Product Inventory</h1>
      <button onClick={() => setUseReducerVersion(!useReducerVersion)}>
        Switch to {useReducerVersion ? "useState" : "useReducer"} version
      </button>
      
      {useReducerVersion ? <ProductsListUseReducer /> : <ProductsListUseState />}
    </div>
  );
}

export default App;