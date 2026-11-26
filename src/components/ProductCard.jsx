import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
