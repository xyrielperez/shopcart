import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🛍️ ShopCart</span>
          <p>Your one-stop destination for curated products at unbeatable prices. Shop smarter, live better.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Facebook">👤</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop">New Arrivals</Link>
          <Link to="/shop">Best Sellers</Link>
          <Link to="/shop">Sale</Link>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/track">Track Order</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>Get exclusive deals and new arrivals straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopCart. All rights reserved.</p>
        <div className="footer-badges">
          <span>🔒 SSL Secured</span>
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>🅿️ PayPal</span>
        </div>
      </div>
    </footer>
  )
}
