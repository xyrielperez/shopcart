import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CartPage from './pages/CartPage'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/NotFound'
import './App.css'

function PlaceholderPage({ title }) {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: '48px 24px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>{title}</h1>
      <p style={{ color: '#6b7280' }}>This page is coming soon.</p>
    </main>
  )
}

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<PlaceholderPage title="Login / My Account" />} />
            <Route path="/help" element={<PlaceholderPage title="Help Center" />} />
            <Route path="/track" element={<PlaceholderPage title="Track Your Order" />} />
            <Route path="/returns" element={<PlaceholderPage title="Returns & Refunds" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  )
}

export default App
