import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './ProductModal.css'

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  )
}

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="pmodal-overlay" onClick={onClose}>
      <div className="pmodal" onClick={(e) => e.stopPropagation()}>
        <button className="pmodal-close" onClick={onClose}>✕</button>
        <div className="pmodal-img-wrap">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className={`pmodal-badge badge-${product.badge.toLowerCase().replace(' ','-')}`}>{product.badge}</span>}
        </div>
        <div className="pmodal-info">
          <span className="pmodal-category">{product.category}</span>
          <h2>{product.name}</h2>
          <Stars rating={product.rating} />
          <p className="pmodal-reviews">{product.reviews.toLocaleString()} verified reviews</p>
          <p className="pmodal-desc">{product.description}</p>
          <div className="pmodal-price-row">
            <span className="pmodal-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="pmodal-original">${product.originalPrice.toFixed(2)}</span>
                <span className="pmodal-discount">-{discount}%</span>
              </>
            )}
          </div>
          <div className="pmodal-qty-row">
            <span className="pmodal-qty-label">Quantity</span>
            <div className="pmodal-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <div className="pmodal-actions">
            <button className={`pmodal-add ${added ? 'added' : ''}`} onClick={handleAdd}>
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button className={`pmodal-wish ${isWished(product.id) ? 'wished' : ''}`} onClick={() => toggle(product)}>
              {isWished(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="pmodal-perks">
            <span>🚚 Free shipping</span>
            <span>↩️ 30-day returns</span>
            <span>🔒 Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  )
}
