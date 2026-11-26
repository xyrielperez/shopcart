import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './CheckoutModal.css'

const fmt = (n) => '₱' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

function formatCard(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function validateCard(val) {
  const digits = val.replace(/\s/g, '')
  return /^\d{16}$/.test(digits)
}

export default function CheckoutModal({ onClose }) {
  const { total, cart, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    const val = name === 'card' ? formatCard(value) : value
    setForm((prev) => ({ ...prev, [name]: val }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!validateCard(form.card)) errs.card = 'Enter a valid 16-digit card number'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    clearCart()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {submitted ? (
          <div className="modal-success">
            <span className="success-icon">🎉</span>
            <h2>Order Confirmed!</h2>
            <p>Thank you, <strong>{form.name}</strong>! Your order of <strong>{fmt(total)}</strong> is on its way.</p>
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
                    <span>{fmt(i.price * i.qty)}</span>
                  </div>
                ))}
                <div className="modal-total">
                  <span>Total</span><strong>{fmt(total)}</strong>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                <div className="form-group">
                  <label htmlFor="co-name">Full Name</label>
                  <input id="co-name" name="name" placeholder="Juan dela Cruz" value={form.name} onChange={handleChange} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="co-email">Email Address</label>
                  <input id="co-email" name="email" type="email" placeholder="juan@example.com" value={form.email} onChange={handleChange} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="co-address">Shipping Address</label>
                  <input id="co-address" name="address" placeholder="123 Rizal St, Makati City" value={form.address} onChange={handleChange} />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="co-card">Card Number</label>
                  <input id="co-card" name="card" placeholder="1234 5678 9012 3456" value={form.card} onChange={handleChange} maxLength={19} inputMode="numeric" />
                  {errors.card && <span className="field-error">{errors.card}</span>}
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
