import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CheckoutModal.css'

export default function CheckoutModal({ onClose }) {
  const { total, cart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">🎉</div>
            <h2>Order Placed!</h2>
            <p>Thank you, <strong>{form.name}</strong>! Your order of <strong>${total.toFixed(2)}</strong> has been confirmed.</p>
            <p className="success-sub">A confirmation will be sent to <strong>{form.email}</strong></p>
            <button className="done-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2>Checkout</h2>
            <div className="modal-summary">
              {cart.map((i) => (
                <div key={i.id} className="modal-item">
                  <span>{i.name} × {i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="modal-total">
                <span>Total</span><strong>${total.toFixed(2)}</strong>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form">
              <input name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} />
              <input name="email" type="email" placeholder="Email Address" required value={form.email} onChange={handleChange} />
              <input name="address" placeholder="Shipping Address" required value={form.address} onChange={handleChange} />
              <input name="card" placeholder="Card Number (e.g. 4242 4242 4242 4242)" required value={form.card} onChange={handleChange} maxLength={19} />
              <button type="submit" className="place-order-btn">Place Order</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
