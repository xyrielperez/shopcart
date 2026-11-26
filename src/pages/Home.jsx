import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import products from '../data/products'
import './Home.css'

export default function Home() {
  const [toast, setToast] = useState(null)

  return (
    <main>
      {toast && <Toast message={`${toast} added to cart!`} onClose={() => setToast(null)} />}

      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✨ New Arrivals Every Week</span>
          <h1>Shop Smarter,<br /><span>Live Better</span></h1>
          <p>Discover curated products across electronics, fashion, home & more — all at unbeatable prices.</p>
          <div className="hero-actions">
            <Link to="/shop" className="hero-btn">Shop Now →</Link>
            <Link to="/shop" className="hero-btn-outline">Browse Categories</Link>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat"><span className="stat-num">10K+</span><span className="stat-label">Happy Customers</span></div>
        <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Products</span></div>
        <div className="stat"><span className="stat-num">Free</span><span className="stat-label">Shipping Always</span></div>
        <div className="stat"><span className="stat-num">24/7</span><span className="stat-label">Customer Support</span></div>
      </div>

      <section className="featured">
        <div className="section-header">
          <div>
            <span className="section-label">Handpicked for you</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop" className="view-all">View All →</Link>
        </div>
        <div className="grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={setToast} />
          ))}
        </div>
      </section>

      <div className="promo-banner">
        <div>
          <h2>Free Shipping on Every Order 🚚</h2>
          <p>No minimum spend. No hidden fees. Just great products delivered to your door.</p>
        </div>
        <Link to="/shop" className="promo-btn">Start Shopping</Link>
      </div>
    </main>
  )
}
