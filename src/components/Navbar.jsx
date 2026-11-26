import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">🛍️ ShopCart</Link>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
          <button className="cart-btn" onClick={() => setDrawerOpen(true)}>
            🛒 Cart {count > 0 && <span className="badge">{count}</span>}
          </button>
        </nav>
      </header>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
