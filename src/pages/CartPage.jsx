import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart()

  if (cart.length === 0) return (
    <main className="cart-empty">
      <h2>Your cart is empty 🛒</h2>
      <Link to="/shop" className="continue-btn">Continue Shopping</Link>
    </main>
  )

  return (
    <main className="cart">
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <span className="item-total">${(item.price * item.qty).toFixed(2)}</span>
              <button className="remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="checkout-btn">Proceed to Checkout</button>
          <Link to="/shop" className="continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  )
}
