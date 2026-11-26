import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import products from '../data/products'
import './Shop.css'

const categories = ['All', ...new Set(products.map((p) => p.category))]

export default function Shop() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [toast, setToast] = useState(null)

  const filtered = products
    .filter((p) => {
      const matchCat = active === 'All' || p.category === active
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price
      if (sort === 'high') return b.price - a.price
      return 0
    })

  return (
    <main className="shop">
      {toast && <Toast message={`${toast} added to cart!`} onClose={() => setToast(null)} />}

      <div className="shop-hero">
        <h1>All Products <span className="count">{filtered.length} items</span></h1>
        <p>Find exactly what you're looking for — search, filter, and sort with ease.</p>
        <div className="shop-controls">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
            />
          </div>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
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
          ? filtered.map((p) => <ProductCard key={p.id} product={p} onAdd={setToast} />)
          : <p className="empty">😕 No products found. Try a different search.</p>}
      </div>
    </main>
  )
}
