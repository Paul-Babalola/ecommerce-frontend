import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navbar';
import SignInAndRegister from './pages/SignIn';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

function App() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 20.0, quantity: 1 },
    { id: 2, name: 'Product 2', price: 15.0, quantity: 2 },
  ]);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });


  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      )
    );
  };
  


  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <div>
      <Navigation
        cartCount={cartItems.length}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        isAuthenticated={!!user} // 👈 Check if user is logged in
        onLogout={handleLogout}
              />

      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/products"
            element={<ProductList addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
              <Route path="/signin" element={<SignInAndRegister onLogin={setUser} />} />
              <Route
  path="/cart"
  element={
    <Cart
      cartItems={cartItems}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity} // ✅ Pass the prop
    />
  }
/>

          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
