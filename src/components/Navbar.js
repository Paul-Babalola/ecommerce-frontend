import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navigation = ({ cartCount }) => {
  return (
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
          <Nav.Link as={Link} to="/cart" className="position-relative">
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
  );
};

export default Navigation;
