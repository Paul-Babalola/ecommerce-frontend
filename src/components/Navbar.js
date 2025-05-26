import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navigation = ({
  cartCount,
  cartItems,
  removeFromCart,
  isAuthenticated,
  onLogout,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" collapseOnSelect>
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo-01.png"
              alt="ShoeStore Logo"
              style={{ height: "40px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />

          <Navbar.Collapse id="main-navbar-nav">
            {/* Centered Nav links */}
            <Nav className="mx-auto text-center">
              <Nav.Link
                as={Link}
                to="/"
                className={isActive("/") ? "active-link" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/categories"
                className={isActive("/categories") ? "active-link" : ""}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                className={isActive("/products") ? "active-link" : ""}
              >
                Shop All
              </Nav.Link>
            </Nav>

            {/* Cart and Login for small screens (inside collapse) */}
            <div className="d-lg-none text-center mt-3">
              <FaShoppingCart
                style={{ fontSize: "1.5rem", marginRight: "0rem", cursor: "pointer" }}
                onClick={handleShowSidebar}
              />
              <br/>
              <br/>
              {isAuthenticated ? (
                <Button variant="outline-danger" size="sm" onClick={handleLogout} style={{ color: "white" }}>
                  Logout
                </Button>
              ) : (
                <Button as={Link} to="/signin" variant="outline-dark" size="sm"  style={{ color: "white" }}>
                  Login
                </Button>
              )}
            </div>
          </Navbar.Collapse>

          {/* Cart & Login for large screens only */}
          <div className="d-none d-lg-flex align-items-center">
            <FaShoppingCart
              onClick={handleShowSidebar}
              style={{ fontSize: "1.5rem", cursor: "pointer", position: "relative" }}
              />
            {/* {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "-5px",
                  backgroundColor: "#e53e3e",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                {cartCount}
              </span>
            )} */}
            
            {isAuthenticated ? (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-3"
                onClick={handleLogout}
                style={{ color: "white" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                as={Link}
                to="/signin"
                variant="outline-dark"
                size="sm"
                className="ms-3"
                style={{ color: "white" }}
              >
                Login
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Cart Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems && cartItems.length > 0 ? (
            <>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "1rem",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "1rem",
                    }}
                  >
                    <div>{item.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <Link to="/cart" className="btn btn-primary w-100">
                View Cart
              </Link>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
