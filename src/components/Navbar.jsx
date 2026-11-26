import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import CartDrawer from './CartDrawer'
import './Navbar.css'

export default function Navbar() {
  const { count } = useCart()
  const { wishlist } = useWishlist()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path

  const closeMenu = () => setMenuOpen(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SHOPCART10').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      closeMenu()
    }
  }

  return (
    <>
      <div className="navbar-wrap">
        <div className="sale-banner">
          🎉 Free shipping on all orders &nbsp;·&nbsp; Use code{' '}
          <button className={`promo-code-btn ${copied ? 'copied' : ''}`} onClick={handleCopyCode} title="Click to copy">
            SHOPCART10
            {copied && <span className="promo-copied-tip">Copied!</span>}
          </button>{' '}
          for 10% off
        </div>
        <header className="navbar">
          <Link to="/" className="logo" onClick={closeMenu}>🛍️ ShopCart</Link>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link>
            <Link to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={closeMenu}>Shop</Link>
            <Link to="/wishlist" className={isActive('/wishlist') ? 'active' : ''} onClick={closeMenu}>
              Wishlist {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </Link>

            {/* Search bar inside mobile menu only */}
            <form className="nav-search-mobile" onSubmit={handleSearch}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
              />
            </form>
          </nav>

          <form className="nav-search" onSubmit={handleSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search electronics, bags, accessories..."
            />
          </form>

          <div className="nav-actions">
            <Link to="/login" className="login-btn" onClick={closeMenu} title="Login / Profile">
              👤
            </Link>
            <button className="cart-btn" onClick={() => { setDrawerOpen(true); closeMenu() }}>
              🛒 <span className="cart-label">Cart</span>
              {count > 0 && <span className="badge">{count}</span>}
            </button>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </header>
      </div>

      {menuOpen && <div className="menu-backdrop" onClick={closeMenu} />}

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
