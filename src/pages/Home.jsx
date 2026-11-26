import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import Toast from '../components/Toast'
import useInView from '../hooks/useInView'
import products from '../data/products'
import './Home.css'

const categories = [
  { name: 'Electronics', icon: '⚡', color: '#ede9fe' },
  { name: 'Footwear',    icon: '👟', color: '#fef3c7' },
  { name: 'Bags',        icon: '👜', color: '#fce7f3' },
  { name: 'Sports',      icon: '🏋️', color: '#d1fae5' },
  { name: 'Kitchen',     icon: '☕', color: '#ffedd5' },
  { name: 'Home',        icon: '🏠', color: '#e0f2fe' },
  { name: 'Accessories', icon: '🕶️', color: '#fef9c3' },
]

function FadeSection({ children, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`fade-section ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default function Home() {
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const featured = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'New').slice(0, 4)
  const sale = products.filter((p) => p.originalPrice)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <main>
      {toast && <Toast message={`${toast} added to cart!`} onClose={() => setToast(null)} />}

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✨ New Arrivals Every Week</span>
          <h1>Shop Smarter,<br /><span>Live Better</span></h1>
          <p>Discover curated products across electronics, fashion, home & more — all at unbeatable prices.</p>
          <div className="hero-actions">
            <Link to="/shop" className="hero-btn">Shop Now →</Link>
            <Link to="/wishlist" className="hero-btn-outline">My Wishlist 🤍</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">↓ Scroll to explore</div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat"><span className="stat-num">10K+</span><span className="stat-label">Happy Customers</span></div>
        <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Products</span></div>
        <div className="stat"><span className="stat-num">Free</span><span className="stat-label">Shipping Always</span></div>
        <div className="stat"><span className="stat-num">24/7</span><span className="stat-label">Support</span></div>
      </div>

      {/* Categories */}
      <FadeSection>
        <section className="categories-section">
          <div className="section-header">
            <div>
              <span className="section-label">Browse by category</span>
              <h2>Shop by Category</h2>
            </div>
          </div>
          <div className="categories-grid">
            {categories.map((c) => (
              <Link to={`/shop?cat=${c.name}`} key={c.name} className="cat-card" style={{ background: c.color }}>
                <span className="cat-icon">{c.icon}</span>
                <span className="cat-name">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* Featured */}
      <FadeSection>
        <section className="featured">
          <div className="section-header">
            <div>
              <span className="section-label">Handpicked for you</span>
              <h2>Featured Products</h2>
            </div>
            <Link to="/shop" className="view-all">View All →</Link>
          </div>
          <div className="grid">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featured.map((p, i) => <ProductCard key={p.id} product={p} onAdd={setToast} delay={i * 80} />)
            }
          </div>
        </section>
      </FadeSection>

      {/* Sale */}
      <FadeSection>
        <section className="featured">
          <div className="section-header">
            <div>
              <span className="section-label sale-label">🔥 Limited time</span>
              <h2>On Sale Now</h2>
            </div>
            <Link to="/shop" className="view-all">See All Deals →</Link>
          </div>
          <div className="grid">
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : sale.map((p, i) => <ProductCard key={p.id} product={p} onAdd={setToast} delay={i * 80} />)
            }
          </div>
        </section>
      </FadeSection>

      {/* Promo Banner */}
      <FadeSection>
        <div className="promo-banner">
          <div className="promo-text">
            <h2>Free Shipping on Every Order 🚚</h2>
            <p>No minimum spend. No hidden fees. Just great products delivered to your door.</p>
          </div>
          <Link to="/shop" className="promo-btn">Start Shopping</Link>
        </div>
      </FadeSection>
    </main>
  )
}
