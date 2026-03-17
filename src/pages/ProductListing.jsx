import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Heart, Grid3x3, List, ChevronLeft, ChevronRight, Menu, Search } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'
import { getAllProducts } from '../services/api'
import { useSearch } from '../context/SearchContext'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductListing() {
  const [searchParams] = useSearchParams()
  const { searchQuery: globalSearch } = useSearch()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('Featured')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || globalSearch || '')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [wishlist, setWishlist] = useState(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const categories = ['Electronics', 'Clothing', 'Footwear', 'Accessories']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        setFilteredProducts(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    if (category) setSelectedCategory(category)
    if (search) setSearchQuery(search)
  }, [searchParams])

  useEffect(() => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (sortBy === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'Top Rated') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy, products])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleWishlist = (id) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(id)) newWishlist.delete(id)
    else newWishlist.add(id)
    setWishlist(newWishlist)
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <h1 className="text-base font-semibold">Products</h1>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-3 px-4 pb-3 min-w-max">
            <button
              onClick={() => setSelectedCategory('')}
              className={`text-sm whitespace-nowrap ${selectedCategory === '' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm whitespace-nowrap ${selectedCategory === cat ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Filter */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide w-full">
          <div className="flex items-center gap-2 min-w-max">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm whitespace-nowrap"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
            <button className="p-2 border rounded-lg shrink-0">
              <Grid3x3 size={18} />
            </button>
            <button className="p-2 border rounded-lg shrink-0">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb - Desktop Only */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Products</span>
      </div>

      <div className="max-w-7xl mx-auto md:px-4 md:py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:block">
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">All Products</span>
              </label>
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Header - Desktop Only */}
          <div className="hidden md:block bg-white rounded p-4 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{filteredProducts.length} products found</h2>
              <div className="flex gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                  <Grid3x3 size={18} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No products found</div>
          ) : (
            <>
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4' : 'grid-cols-1'} mb-4`}>
                {paginatedProducts.map(product => (
                  <div key={product._id} className="bg-white md:rounded p-4 hover:shadow-md transition-shadow border-b md:border-b-0 last:border-b-0">
                    {/* Desktop Grid View */}
                    <div className="hidden md:block">
                      <div className="relative mb-3">
                        <Link to={`/products/${product._id}`}>
                          <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover rounded" />
                        </Link>
                        <button onClick={() => toggleWishlist(product._id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2">
                          <Heart size={18} fill={wishlist.has(product._id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
                        </div>
                        <Link to={`/products/${product._id}`} className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2">
                          {product.name}
                        </Link>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden flex gap-3">
                      <Link to={`/products/${product._id}`} className="shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${product._id}`} className="text-sm font-normal text-gray-800 line-clamp-2 mb-1">
                          {product.name}
                        </Link>
                        <div className="text-base font-semibold text-gray-900 mb-1">
                          ${product.price}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination - Desktop Only */}
              <div className="hidden md:flex bg-white rounded p-4 items-center justify-between">
                <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }} className="border rounded px-3 py-1 text-sm">
                  <option value={10}>Show 10</option>
                  <option value={20}>Show 20</option>
                  <option value={50}>Show 50</option>
                </select>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 hover:bg-gray-100 disabled:opacity-50">
                    <ChevronLeft size={18} />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded text-sm ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 hover:bg-gray-100 disabled:opacity-50">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
