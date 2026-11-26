import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import './Wishlist.css'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const [toast, setToast] = useState(null)

  if (wishlist.length === 0) return (
    <main className="wishlist-empty">
      <span className="empty-icon">🤍</span>
      <h2>Your wishlist is empty</h2>
      <p>Save items you love and come back to them anytime.</p>
      <Link to="/shop" className="shop-btn">Browse Products</Link>
    </main>
  )

  return (
    <main className="wishlist">
      {toast && <Toast message={`${toast} added to cart!`} onClose={() => setToast(null)} />}
      <div className="wishlist-header">
        <div>
          <span className="section-label">Saved Items</span>
          <h1>My Wishlist <span className="wl-count">{wishlist.length} items</span></h1>
        </div>
        <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
      </div>
      <div className="grid">
        {wishlist.map((p, i) => (
          <ProductCard key={p.id} product={p} onAdd={setToast} delay={i * 60} />
        ))}
      </div>
    </main>
  )
}
