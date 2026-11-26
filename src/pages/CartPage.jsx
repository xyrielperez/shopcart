import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CheckoutModal from '../components/CheckoutModal'
import './CartPage.css'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart()
  const [showModal, setShowModal] = useState(false)

  if (cart.length === 0) return (
    <main className="cart-empty">
      <span className="empty-icon">🛒</span>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="continue-btn">Start Shopping</Link>
    </main>
  )

  return (
    <main className="cart">
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
      <h1 className="cart-title">Your Cart <span className="cart-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span></h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <span className="item-cat">{item.category}</span>
                <span className="item-price">${item.price.toFixed(2)} each</span>
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <span className="item-total">${(item.price * item.qty).toFixed(2)}</span>
              <button className="remove" onClick={() => removeFromCart(item.id)} title="Remove">✕</button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="free">Free ✓</span></div>
          <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={() => setShowModal(true)}>Proceed to Checkout →</button>
          <Link to="/shop" className="continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  )
}
