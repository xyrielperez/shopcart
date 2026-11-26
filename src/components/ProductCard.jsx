import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product, onAdd }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wished, setWished] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    onAdd?.(product.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={product.image} alt={product.name} />
        <button className={`wish-btn ${wished ? 'wished' : ''}`} onClick={() => setWished(!wished)}>
          {wished ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className={`add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
