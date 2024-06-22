import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="4">
            <h5>Contact Us</h5>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Location: 123 Main Street, Anytown, USA</p>
          </Col>
          <Col md="4">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                {/* <FaFacebook /> */}
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                {/* <FaTwitter /> */}
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                {/* <FaInstagram /> */}
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                {/* <FaLinkedin /> */}
              </a>
            </div>
          </Col>
          <Col md="4">
            <h5>Additional Info</h5>
            <p>About Us</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
