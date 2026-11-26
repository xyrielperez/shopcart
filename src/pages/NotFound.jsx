import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-home">Go Home</Link>
          <Link to="/shop" className="notfound-shop">Browse Shop</Link>
        </div>
      </div>
    </main>
  )
}
