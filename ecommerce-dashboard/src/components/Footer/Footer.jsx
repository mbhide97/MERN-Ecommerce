import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company */}
        <div className="footer-box">
          <h2>E-Shop</h2>

          <p>
            Your one-stop destination for Fashion,
            Electronics, Shoes and Lifestyle products.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Flash Sale</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-box">
          <h3>Categories</h3>

          <ul>
            <li>Fashion</li>
            <li>Electronics</li>
            <li>Shoes</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-box">
          <h3>Contact</h3>

          <p><FaPhoneAlt /> +91 9876543210</p>

          <p><FaEnvelope /> support@eshop.com</p>

          <p><FaMapMarkerAlt /> Pune, Maharashtra</p>

          <div className="social-icons">

            <FaFacebookF />

            <FaInstagram />

            <FaTwitter />

            <FaLinkedinIn />

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 E-Shop | All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;