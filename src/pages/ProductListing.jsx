import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Grid3x3, List, ChevronDown, ChevronLeft, ChevronRight, X, ArrowLeft, ShoppingCart, User, Search, SlidersHorizontal, Menu } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'

const allProducts = [
  { id: 1, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['Metallic'], description: 'Lorem ipsum dolor sit amet' },
  { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 5.0, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Apple', condition: 'Brand new', features: ['Plastic cover'], description: 'Lorem ipsum dolor sit amet' },
  { id: 3, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Poco', condition: 'Refurbished', features: ['8GB Ram'], description: 'Lorem ipsum dolor sit amet' },
  { id: 4, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Apple', condition: 'Brand new', features: ['Super power'], description: 'Lorem ipsum dolor sit amet' },
  { id: 5, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['Large Memory'], description: 'Lorem ipsum dolor sit amet' },
  { id: 6, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Huawei', condition: 'Brand new', features: ['Metallic'], description: 'Lorem ipsum dolor sit amet' },
  { id: 7, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Poco', condition: 'Old items', features: ['Plastic cover'], description: 'Lorem ipsum dolor sit amet' },
  { id: 8, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Lenovo', condition: 'Brand new', features: ['8GB Ram'], description: 'Lorem ipsum dolor sit amet' },
  { id: 9, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['Super power'], description: 'Lorem ipsum dolor sit amet' },
  { id: 10, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Samsung', condition: 'Refurbished', features: ['Large Memory'], description: 'Lorem ipsum dolor sit amet' },
  { id: 11, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Apple', condition: 'Brand new', features: ['Metallic'], description: 'Lorem ipsum dolor sit amet' },
  { id: 12, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, originalPrice: 128.00, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Huawei', condition: 'Brand new', features: ['Plastic cover'], description: 'Lorem ipsum dolor sit amet' },
]

const categories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
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
  const [viewMode, setViewMode] = useState('grid')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('Featured')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple', 'Poco'])
  const [selectedFeatures, setSelectedFeatures] = useState(['Metallic'])
  const [selectedCondition, setSelectedCondition] = useState('Any')
  const [selectedRatings, setSelectedRatings] = useState([4, 3])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [wishlist, setWishlist] = useState(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = allProducts
    
    if (selectedCategories.length > 0) {
      list = list.filter(p => selectedCategories.includes(p.category))
    }
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand))
    }
    if (selectedFeatures.length > 0) {
      list = list.filter(p => selectedFeatures.some(f => p.features.includes(f)))
    }
    if (selectedCondition !== 'Any') {
      list = list.filter(p => p.condition === selectedCondition)
    }
    if (selectedRatings.length > 0) {
      list = list.filter(p => selectedRatings.some(r => Math.round(p.rating) === r))
    }

    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [selectedCategories, selectedBrands, selectedFeatures, selectedCondition, selectedRatings, sortBy])

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

  const toggleRating = (rating) => {
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating])
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedFeatures([])
    setSelectedRatings([])
    setCurrentPage(1)
  }

  const activeFilters = [
    ...selectedBrands.map(b => ({ type: 'brand', value: b })),
    ...selectedFeatures.map(f => ({ type: 'feature', value: f })),
    ...selectedRatings.map(r => ({ type: 'rating', value: `${r} star` })),
  ]

  const categories_tabs = ['Tablets', 'Phones', 'Ipads', 'Ipod', 'Jackets']
  const recommendedProducts = [
    { id: 101, name: 'Solid Backpack blue jeans large size', price: 10.30, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop' },
    { id: 102, name: 'T-shirts with multiple colors, for men', price: 10.30, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop' },
    { id: 103, name: 'T-shirts with multiple colors', price: 10.30, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <h1 className="text-base font-semibold">Mobile accessory</h1>
          <div className="flex items-center gap-3">
            <button className="p-1">
              <ShoppingCart size={24} />
            </button>
            <button className="p-1">
              <User size={24} />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-3 px-4 pb-3 min-w-max">
            {categories_tabs.map(cat => (
              <button key={cat} className="text-sm text-blue-600 whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Filter */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide w-full">
          <div className="flex items-center gap-2 min-w-max">
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm whitespace-nowrap">
              <span>Sort: Newest</span>
              <SlidersHorizontal size={16} />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm whitespace-nowrap">
              <span>Filter (3)</span>
              <SlidersHorizontal size={16} />
            </button>
            <button className="p-2 border rounded-lg shrink-0">
              <Grid3x3 size={18} />
            </button>
            <button className="p-2 border rounded-lg shrink-0">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-2 px-4 pb-3 min-w-max">
            {['Huawei', 'Apple', '64GB'].map(filter => (
              <div key={filter} className="flex items-center gap-1 px-3 py-1 border border-blue-600 rounded-full text-sm whitespace-nowrap">
                <span>{filter}</span>
                <X size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb - Desktop Only */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Clothings</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Men's wear</Link>
        <span className="mx-2">/</span>
        <span>Summer clothing</span>
      </div>

      <div className="max-w-7xl mx-auto md:px-4 md:py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden md:block">
          {/* Category */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Category <ChevronDown size={16} />
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
              <Link to="#" className="text-blue-600 text-sm font-medium">See all</Link>
            </div>
          </div>

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
              <Link to="#" className="text-blue-600 text-sm font-medium">See all</Link>
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
              <Link to="#" className="text-blue-600 text-sm font-medium">See all</Link>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Price range <ChevronDown size={16} />
            </h3>
          </div>

          {/* Condition */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Condition <ChevronDown size={16} />
            </h3>
          </div>

          {/* Ratings */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Ratings <ChevronDown size={16} />
            </h3>
            <div className="space-y-2">
              {[5, 4, 3, 2].map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedRatings.includes(rating)} onChange={() => toggleRating(rating)} className="w-4 h-4" />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg key={s} className={`w-3 h-3 ${s <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Manufacturer */}
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Manufacturer <ChevronDown size={16} />
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Header - Desktop Only */}
          <div className="hidden md:block bg-white rounded p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">{filtered.length.toLocaleString()} items in Mobile accessory</h2>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-gray-700">Verified only</span>
                </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-1 text-sm">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
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
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="bg-white rounded p-4 mb-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((filter, i) => (
                <div key={i} className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-sm">
                  <span className="text-gray-700">{filter.value}</span>
                  <button onClick={() => {
                    if (filter.type === 'brand') toggleBrand(filter.value)
                    else if (filter.type === 'feature') toggleFeature(filter.value)
                    else if (filter.type === 'rating') toggleRating(parseInt(filter.value))
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

          {/* Products - Grid View (3 columns desktop, 1 column mobile) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
              {paginatedProducts.map(product => (
                <div key={product.id} className="bg-white md:rounded p-4 hover:shadow-md transition-shadow border-b md:border-b-0 last:border-b-0">
                  {/* Desktop View */}
                  <div className="hidden md:block">
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
                        <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
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

                  {/* Mobile View */}
                  <div className="md:hidden flex gap-3">
                    <Link to={`/products/${product.id}`} className="shrink-0">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${product.id}`} className="text-sm font-normal text-gray-800 line-clamp-2 mb-1">
                        Regular Fit Resort Shirt
                      </Link>
                      <div className="text-base font-semibold text-gray-900 mb-1">
                        $57.70
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">• {product.orders} orders</span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Free Shipping
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products - List View */}
          {viewMode === 'list' && (
            <div className="space-y-4 mb-4">
              {paginatedProducts.map(product => (
                <div key={product.id} className="bg-white rounded p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <Link to={`/products/${product.id}`} className="shrink-0">
                      <img src={product.image} alt={product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${product.id}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-500">• {product.orders} orders</span>
                        <span className="text-xs text-green-600 font-medium">Free Shipping</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                      <Link to={`/products/${product.id}`} className="text-blue-600 text-xs font-medium mt-2 inline-block hover:underline">
                        View details
                      </Link>
                    </div>
                    <button onClick={() => toggleWishlist(product.id)} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={20} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

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

          {/* You may also like - Mobile Only */}
          <div className="md:hidden mt-6 bg-white py-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 px-4">You may also like</h3>
            <div className="overflow-x-auto scrollbar-hide w-full">
              <div className="flex gap-3 px-4 pb-4 min-w-max">
                {recommendedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shrink-0 w-40 border">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    </Link>
                    <div className="p-3">
                      <div className="text-base font-semibold text-gray-900 mb-1">
                        ${product.price}
                      </div>
                      <Link to={`/products/${product.id}`} className="text-xs text-gray-600 line-clamp-2">
                        {product.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter - Desktop Only */}
      <section className="hidden md:block bg-white mt-12 py-8">
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
