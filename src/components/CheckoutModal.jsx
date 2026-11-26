import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CheckoutModal.css'

export default function CheckoutModal({ onClose }) {
  const { total, cart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {submitted ? (
          <div className="modal-success">
            <span className="success-icon">🎉</span>
            <h2>Order Confirmed!</h2>
            <p>Thank you, <strong>{form.name}</strong>! Your order of <strong>${total.toFixed(2)}</strong> is on its way.</p>
            <p className="success-sub">Confirmation sent to <strong>{form.email}</strong></p>
            <button className="done-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Checkout</h2>
              <p>Complete your order below</p>
            </div>
            <div className="modal-body">
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
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" placeholder="John Doe" required value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" placeholder="john@example.com" required value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <input name="address" placeholder="123 Main St, City, Country" required value={form.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input name="card" placeholder="4242 4242 4242 4242" required value={form.card} onChange={handleChange} maxLength={19} />
                </div>
                <button type="submit" className="place-order-btn">Place Order →</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
