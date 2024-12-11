import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navigation = ({ cartCount, cartItems, removeFromCart }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo-01.png" // Update with your logo path
              alt="ShoeStore Logo"
              style={{ height: '40px' }}
            />
          </Navbar.Brand>

          <Nav className="ml-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/categories">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Shop All
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              onMouseEnter={handleShowSidebar}
              className="position-relative"
              style={{ cursor: 'pointer' }}
            >
              <FaShoppingCart style={{ fontSize: '1.5rem' }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '0px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems && cartItems.length > 0 ? (
            <>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: '1rem',
                      borderBottom: '1px solid #ddd',
                      paddingBottom: '1rem',
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
