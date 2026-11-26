import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()

  return (
    <header className="navbar">
      <Link to="/" className="logo">🛍️ ShopCart</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart {count > 0 && <span className="badge">{count}</span>}
        </Link>
      </nav>
    </header>
  )
}
