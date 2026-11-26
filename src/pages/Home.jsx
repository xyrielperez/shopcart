import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Home.css'

export default function Home() {
  return (
    <main>
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link to="/shop" className="view-all">View All Products →</Link>
      </section>
    </main>
  )
}
