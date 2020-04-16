import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

import { ProductContext } from "./context/ProductContext";
import { CartContext } from "./context/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkCart = JSON.parse(localStorage.getItem("cart"));
    if (checkCart) {
      setCart(checkCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    // add the given item to the cart
    setCart([...cart, item]);
  };

  const removeItem = (item) => {
    const filtered = cart.filter((it) => it.id !== item.id);
    setCart(filtered);
  };

  console.log("cart here ", cart);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
