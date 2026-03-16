import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Heart, Grid3x3, List, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const allProducts = [
  { id: 1, name: 'Canon Camera EOS 2000, Black 10x zoom', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Canon', condition: 'Brand new', features: ['Metallic'], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Electronics', brand: 'GoPro', condition: 'Brand new', features: ['Plastic cover'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 3, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'GoPro', condition: 'Refurbished', features: ['8GB Ram'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 4, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Apple', condition: 'Brand new', features: ['Super power'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 5, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Samsung', condition: 'Brand new', features: ['Large Memory'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 6, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Huawei', condition: 'Brand new', features: ['Metallic'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 7, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Poco', condition: 'Old items', features: ['Plastic cover'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 8, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Lenovo', condition: 'Brand new', features: ['8GB Ram'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 9, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&h=300&fit=crop', category: 'Mobile accessory', brand: 'Canon', condition: 'Brand new', features: ['Super power'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 10, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop', category: 'Electronics', brand: 'Samsung', condition: 'Refurbished', features: ['Large Memory'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 11, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', category: 'Smartphones', brand: 'Apple', condition: 'Brand new', features: ['Metallic'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { id: 12, name: 'GoPro HERO6 4K Action Camera - Black', price: 998, originalPrice: 1128, rating: 7.5, orders: 154, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop', category: 'Modern tech', brand: 'Huawei', condition: 'Brand new', features: ['Plastic cover'], description: 'UI enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
]

const categories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
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
  const [viewMode, setViewMode] = useState('grid')
  const [verifiedOnly, setVerifiedOnly] = useState(true)
  const [sortBy, setSortBy] = useState('Featured')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedCondition, setSelectedCondition] = useState('Any')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [wishlist, setWishlist] = useState(new Set())

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
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (selectedRatings.length > 0) {
      list = list.filter(p => selectedRatings.some(r => Math.round(p.rating) === r))
    }

    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [selectedCategories, selectedBrands, selectedFeatures, selectedCondition, priceRange, selectedRatings, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleWishlist = (id) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(id)) newWishlist.delete(id)
    else newWishlist.add(id)
    setWishlist(newWishlist)
  }

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    setCurrentPage(1)
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Clothings</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Men's wear</Link>
        <span className="mx-2">/</span>
        <span>Summer clothing</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="w-4 h-4" />
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
            <div className="space-y-3">
              <input type="range" min="0" max="2000" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full" />
              <input type="range" min="0" max="2000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full" />
              <div className="flex gap-2 text-sm">
                <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-1/2 border rounded px-2 py-1" placeholder="Min" />
                <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-1/2 border rounded px-2 py-1" placeholder="Max" />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700">Apply</button>
            </div>
          </div>

          {/* Condition */}
          <div className="bg-white rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
              Condition <ChevronDown size={16} />
            </h3>
            <div className="space-y-2">
              {conditions.map(cond => (
                <label key={cond} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="condition" checked={selectedCondition === cond} onChange={() => { setSelectedCondition(cond); setCurrentPage(1) }} className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-white rounded p-4">
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
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Header */}
          <div className="bg-white rounded p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{filtered.length.toLocaleString()} items in Mobile accessory</h2>
            </div>
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

          {/* Products */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
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

          {/* Pagination */}
          <div className="bg-white rounded p-4 mt-4 flex items-center justify-between">
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
