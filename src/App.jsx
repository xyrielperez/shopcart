import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CartPage from './pages/CartPage'
import Wishlist from './pages/Wishlist'
import './App.css'

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
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  )
}

export default App
