import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import './Shop.css'

const categories = ['All', ...new Set(products.map((p) => p.category))]

export default function Shop() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) => {
    const matchCat = active === 'All' || p.category === active
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="shop">
      <div className="shop-header">
        <h1>All Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
      </div>

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={active === c ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.length > 0
          ? filtered.map((p) => <ProductCard key={p.id} product={p} />)
          : <p className="empty">No products found.</p>}
      </div>
    </main>
  )
}
