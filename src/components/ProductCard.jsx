import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import useInView from '../hooks/useInView'
import ProductModal from './ProductModal'
import './ProductCard.css'

function Stars({ rating }) {
  return (
    <div className="card-stars">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
      ))}
      <span className="card-rating">{rating}</span>
    </div>
  )
}

export default function ProductCard({ product, onAdd, delay = 0 }) {
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()
  const [added, setAdded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [ref, inView] = useInView()

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(product)
    onAdd?.(product.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWish = (e) => {
    e.stopPropagation()
    toggle(product)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <>
      <div
        ref={ref}
        className={`card ${inView ? 'visible' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
        onClick={() => setShowModal(true)}
      >
        <div className="card-img-wrap">
          <img src={product.image} alt={product.name} loading="lazy" />
          {product.badge && (
            <span className={`card-badge badge-${product.badge.toLowerCase().replace(' ','-')}`}>
              {product.badge}
            </span>
          )}
          {discount && <span className="card-discount">-{discount}%</span>}
          <button className={`wish-btn ${isWished(product.id) ? 'wished' : ''}`} onClick={handleWish}>
            {isWished(product.id) ? '❤️' : '🤍'}
          </button>
          <div className="card-overlay">
            <span>Quick View</span>
          </div>
        </div>
        <div className="card-body">
          <span className="category">{product.category}</span>
          <h3>{product.name}</h3>
          <Stars rating={product.rating} />
          <p className="card-reviews">{product.reviews.toLocaleString()} reviews</p>
          <div className="card-footer">
            <div className="price-wrap">
              <span className="price">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <button className={`add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
    </>
  )
}
