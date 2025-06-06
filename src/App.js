import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navbar';
import SignInAndRegister from './pages/SignIn';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CategoryProducts from './pages/CategoryProducts';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';

function App() {

   const location = useLocation(); // 👈 Detect current route
  const hideFooterRoutes = ['/signin'];

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 20.0, quantity: 1 },
    { id: 2, name: 'Product 2', price: 15.0, quantity: 2 },
  ]);

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      localStorage.removeItem("authUser");
      return null;
    }
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

  const isAuthenticated = !!user?.token;

  return (
    <div>
      <ToastContainer />
      <Navigation
        cartCount={cartItems.length}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <div style={{ minHeight: '80vh' }}>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/categories" element={<Categories />} />
  <Route path="/categories/:id" element={<CategoryProducts />} />
  <Route path="/products" element={<ProductList addToCart={addToCart} />} />
  <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
  <Route path="/cart" element={
    <Cart
      cartItems={cartItems}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
    />
  } />
  <Route path="/signin" element={<SignInAndRegister onLogin={setUser} />} />
  
  {/* ✅ Protect Checkout Route */}
  <Route path="/checkout" element={
    isAuthenticated ? <Checkout /> : <Navigate to="/signin" replace />
  } />
  
  <Route path="*" element={<NotFound />} />
</Routes>
      </div>

  {!hideFooterRoutes.includes(location.pathname) && <Footer />}  
    </div>
  );
}

export default App;
