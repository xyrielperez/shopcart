import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

const fmt = (n) => '₱' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function CartDrawer({ open, onClose }) {
  const { cart, total, removeFromCart, updateQty } = useCart()

  return (
    <>
      <div className={`drawer-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="drawer-empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="drawer-item">
                  <img src={item.image} alt={item.name} />
                  <div className="drawer-item-info">
                    <p>{item.name}</p>
                    <span>{fmt(item.price)}</span>
                    <div className="drawer-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="drawer-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className="drawer-footer">
              <div className="drawer-total">
                <span>Total</span><strong>{fmt(total)}</strong>
              </div>
              <Link to="/cart" className="view-cart-btn" onClick={onClose}>View Full Cart</Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
