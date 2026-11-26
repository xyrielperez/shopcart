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
          <h1>Shop the Latest Trends</h1>
          <p>Discover thousands of products at unbeatable prices.</p>
          <Link to="/shop" className="hero-btn">Shop Now</Link>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={setToast} />
          ))}
        </div>
        <Link to="/shop" className="view-all">View All Products →</Link>
      </section>
    </main>
  )
}
