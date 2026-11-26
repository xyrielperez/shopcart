import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <div className="newsletter-success">
        <span className="newsletter-check">✓</span>
        <p>You're in! Watch your inbox for exclusive deals.</p>
      </div>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError('') }}
        aria-label="Email address"
      />
      <button type="submit">Subscribe</button>
      {error && <span className="newsletter-error">{error}</span>}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">🛍️ ShopCart</span>
          <p>Handpicked essentials for work, home, wellness, and travel — delivered with care.</p>
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
          <Newsletter />
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
