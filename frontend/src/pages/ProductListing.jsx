import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categories = ['All', 'Electronics', 'Accessories', 'Footwear', 'Clothing', 'Lifestyle', 'Sports']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Top Rated']

export default function ProductListing() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState('Default')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory !== 'All') list = list.filter((p) => p.category === activeCategory)
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, sortBy, search])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {sortOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-indigo-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No products found</p>
        </div>
      )}
    </div>
  )
}
