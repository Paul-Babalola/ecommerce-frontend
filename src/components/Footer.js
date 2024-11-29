import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* Newsletter Section */}
          <div className="newsletter">
            <h3>Subscribe to our newsletter</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address..." required />
              <button type="submit" className="subscribe-btn">SUBSCRIBE</button>
            </form>
          </div>
  
          {/* Footer Links Section */}
          <div className="footer-links">
            <div className="footer-logo">
              <h4>Walk on Water</h4>
              <p>Be Bold</p>
            </div>
  
            <div className="links">
              <ul>
                <li><a href="#">Shop All</a></li>
                <li><a href="#">Makeup</a></li>
                <li><a href="#">Skin Care</a></li>
                <li><a href="#">Hair Care</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </div>
  
  <div className="links">
  <ul>
  <li><a href="#">Contact</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
  </div>
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon"><img src="/facebook.svg" alt="Facebook" /></a>
              <a href="#" className="social-icon"><img src="/twitter.svg" alt="Twitter" /></a>
              <a href="#" className="social-icon"><img src="/instagram.svg" alt="Instagram" /></a>
            </div>
          </div>
        </div>
  
        {/* Footer Copyright */}
        <div className="footer-bottom">
          <p>Copyright © 2024 PFs Shoe | Powered by PFs Shoe</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;