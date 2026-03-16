import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Grid3x3, List, ChevronDown, ChevronLeft, ChevronRight, X, ShoppingCart, User, Search } from 'lucide-react'

const allProducts = [
  { id: 1, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Huawei', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 2, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Apple', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 3, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Poco', condition: 'Refurbished', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 4, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Apple', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 5, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 6, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Huawei', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 7, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Poco', condition: 'Old items', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 8, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Lenovo', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 9, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 10, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Samsung', condition: 'Refurbished', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 11, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Apple', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
  { id: 12, name: 'Regular Fit Resort Shirt', price: 57.70, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Huawei', condition: 'Brand new', features: ['64GB'], description: 'Lorem ipsum dolor sit amet' },
]

const categories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
const features = ['64GB', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items']

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
  const [viewMode, setViewMode] = useState('list')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('Newest')
  const [selectedBrands, setSelectedBrands] = useState(['Huawei', 'Apple'])
  const [selectedFeatures, setSelectedFeatures] = useState(['64GB'])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [wishlist, setWishlist] = useState(new Set())

  const filtered = useMemo(() => {
    let list = allProducts
    
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand))
    }
    if (selectedFeatures.length > 0) {
      list = list.filter(p => selectedFeatures.some(f => p.features.includes(f)))
    }

    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [selectedBrands, selectedFeatures, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleWishlist = (id) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(id)) newWishlist.delete(id)
    else newWishlist.add(id)
    setWishlist(newWishlist)
  }

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
    setCurrentPage(1)
  }

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature])
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedFeatures([])
    setCurrentPage(1)
  }

  const activeFilters = [
    ...selectedBrands.map(b => ({ type: 'brand', value: b })),
    ...selectedFeatures.map(f => ({ type: 'feature', value: f })),
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">Mobile accessory</h1>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="text-gray-600"><ShoppingCart size={20} /></Link>
            <Link to="#" className="text-gray-600"><User size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb - Desktop only */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Clothings</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Men's wear</Link>
        <span className="mx-2">/</span>
        <span>Summer clothing</span>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search" className="w-full bg-gray-100 rounded-lg pl-9 pr-3 py-2 text-sm outline-none" />
        </div>
      </div>

      {/* Mobile Category Tabs */}
      <div className="md:hidden overflow-x-auto scrollbar-hide bg-white border-b border-gray-200">
        <div className="flex gap-2 px-4 py-3 min-w-min">
          {['Tablets', 'Phones', 'Ipads', 'Ipod', 'Ja'].map((cat) => (
            <button key={cat} className="text-sm text-blue-600 whitespace-nowrap px-3 py-1 rounded-full border border-blue-300 hover:bg-blue-50">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-200 flex items-center gap-2">
        <button className="flex-1 border rounded px-3 py-2 text-sm text-gray-700 flex items-center justify-between">
          Sort: {sortBy} <ChevronDown size={14} />
        </button>
        <button className="border rounded px-3 py-2 text-sm text-gray-700 flex items-center gap-1">
          Filter ({activeFilters.length}) <ChevronDown size={14} />
        </button>
        <div className="flex gap-1">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
            <Grid3x3 size={16} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="px-4 py-3 bg-white border-b border-gray-200 flex flex-wrap items-center gap-2">
          {activeFilters.map((filter, i) => (
            <div key={i} className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-sm">
              <span className="text-gray-700">{filter.value}</span>
              <button onClick={() => {
                if (filter.type === 'brand') toggleBrand(filter.value)
                else if (filter.type === 'feature') toggleFeature(filter.value)
              }} className="text-gray-500 hover:text-gray-700">
                <X size={14} />
              </button>
            </div>
          ))}
          <button onClick={clearAllFilters} className="text-blue-600 text-sm font-medium hover:underline">
            Clear all filter
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:block">
          {/* Brands */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Brands <ChevronDown size={16} />
            </h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Features <ChevronDown size={16} />
            </h3>
            <div className="space-y-2">
              {features.map(feature => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => toggleFeature(feature)} className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Products - List View (Mobile default) */}
          <div className="space-y-3 mb-4">
            {paginatedProducts.map(product => (
              <div key={product.id} className="bg-white rounded p-3 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <Link to={`/products/${product.id}`} className="shrink-0">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${product.id}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-base font-bold text-gray-900">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-500">• {product.orders} orders</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-1">Free Shipping</p>
                  </div>
                  <button onClick={() => toggleWishlist(product.id)} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={18} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination */}
          <div className="md:hidden bg-white rounded p-3 flex items-center justify-between mb-6">
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }} className="border rounded px-2 py-1 text-xs">
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
              <option value={50}>Show 50</option>
            </select>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-1 hover:bg-gray-100 disabled:opacity-50">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 py-1 rounded text-xs ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-1 hover:bg-gray-100 disabled:opacity-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* You may also like - Mobile only */}
          <div className="md:hidden">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">You may also like</h3>
            <div className="grid grid-cols-2 gap-3">
              {allProducts.slice(0, 4).map(product => (
                <Link to={`/products/${product.id}`} key={product.id} className="bg-white rounded p-3 hover:shadow-md transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded mb-2" />
                  <p className="text-sm font-semibold text-gray-800">${product.price}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{product.name}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          {viewMode === 'grid' && (
            <div className="hidden md:grid grid-cols-3 gap-4 mb-4">
              {paginatedProducts.map(product => (
                <div key={product.id} className="bg-white rounded p-4 hover:shadow-md transition-shadow">
                  <div className="relative mb-3">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded" />
                    </Link>
                    <button onClick={() => toggleWishlist(product.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2">
                      <Heart size={18} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                    <Link to={`/products/${product.id}`} className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2">
                      {product.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop List View */}
          {viewMode === 'list' && (
            <div className="hidden md:space-y-4 md:block mb-4">
              {paginatedProducts.map(product => (
                <div key={product.id} className="bg-white rounded p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <Link to={`/products/${product.id}`} className="shrink-0">
                      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${product.id}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-500">• {product.orders} orders</span>
                        <span className="text-xs text-green-600 font-medium">Free Shipping</span>
                      </div>
                    </div>
                    <button onClick={() => toggleWishlist(product.id)} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={20} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Desktop Pagination */}
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
        </div>
      </div>

      {/* Newsletter */}
      <section className="bg-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Subscribe on our newsletter</h3>
          <p className="text-gray-600 text-sm mt-1 mb-4">Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="flex justify-center gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="Email" className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
            <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
