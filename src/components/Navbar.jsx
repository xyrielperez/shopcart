import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import CartDrawer from './CartDrawer'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()
  const { wishlist } = useWishlist()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <>
      <div className="sale-banner">
        🎉 Free shipping on all orders &nbsp;·&nbsp; Use code <strong>SHOPCART10</strong> for 10% off
      </div>
      <header className="navbar">
        <Link to="/" className="logo">🛍️ ShopCart</Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/wishlist" className={isActive('/wishlist') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            Wishlist {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </Link>
        </nav>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => { setDrawerOpen(true); setMenuOpen(false) }}>
            🛒 <span className="cart-label">Cart</span>
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
