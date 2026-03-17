import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, MessageSquare, ShoppingCart, Check, ChevronLeft, ChevronRight, Globe, Menu } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart, isInCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-xl font-semibold text-gray-700">{error || 'Product not found'}</p>
        <Link to="/products" className="mt-4 inline-block text-blue-600 hover:underline">Back to Products</Link>
      </div>
    )
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <h1 className="text-base font-semibold">Product Details</h1>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="p-1">
              <ShoppingCart size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Product Image with Navigation */}
        <div className="relative bg-white">
          <div className="aspect-square bg-gray-100">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button onClick={prevImage} className="w-10 h-10 rounded-full bg-gray-600/70 text-white flex items-center justify-center hover:bg-gray-700/70">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="w-10 h-10 rounded-full bg-gray-600/70 text-white flex items-center justify-center hover:bg-gray-700/70">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white px-4 py-4">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} />
            <MessageSquare size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{product.reviews?.length || 0} reviews</span>
            <span className="text-gray-400">•</span>
            <ShoppingCart size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{product.stock} in stock</span>
          </div>

          {/* Product Name */}
          <h1 className="text-lg font-normal text-gray-900 mb-3">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-red-500">${product.price}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded font-medium transition-colors ${
                product.stock === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center text-blue-600 hover:bg-gray-50">
              <Heart size={20} />
            </button>
          </div>

          {/* Specifications */}
          <div className="space-y-3 mb-4">
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Category</div>
              <div className="flex-1 text-sm text-gray-900">{product.category}</div>
            </div>
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Stock</div>
              <div className="flex-1 text-sm text-gray-900">{product.stock} items</div>
            </div>
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Rating</div>
              <div className="flex-1 text-sm text-gray-900">{product.rating.toFixed(1)}/5</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left + Center Column - Images and Product Info */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded p-6">
                <div className="flex gap-6">
                  {/* Main Image and Thumbnails */}
                  <div className="flex-1">
                    {/* Main Image */}
                    <div className="aspect-square rounded overflow-hidden bg-gray-100 mb-3">
                      <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Thumbnail Row */}
                    <div className="flex gap-2">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`w-16 h-16 rounded border-2 overflow-hidden ${
                            selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info - Right side of image */}
                  <div className="w-80 shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Check size={16} /> In stock
                      </span>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-3">{product.name}</h1>
                    <div className="flex items-center gap-2 mb-4">
                      <StarRating rating={product.rating} />
                      <span className="text-yellow-600 font-semibold text-sm">{product.rating.toFixed(1)}</span>
                      <span className="text-gray-400">•</span>
                      <MessageSquare size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-600">{product.reviews?.length || 0} reviews</span>
                      <span className="text-gray-400">•</span>
                      <ShoppingCart size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-600">{product.stock} in stock</span>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-b py-3 my-3">
                      <div className="text-2xl font-bold text-red-500">${product.price}</div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2">
                      <div className="flex text-xs">
                        <div className="w-28 text-gray-500">Category:</div>
                        <div className="flex-1 text-gray-700">{product.category}</div>
                      </div>
                      <div className="flex text-xs">
                        <div className="w-28 text-gray-500">Stock:</div>
                        <div className="flex-1 text-gray-700">{product.stock} items</div>
                      </div>
                      <div className="flex text-xs">
                        <div className="w-28 text-gray-500">Rating:</div>
                        <div className="flex-1 text-gray-700">{product.rating.toFixed(1)}/5</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded mt-4">
                <div className="border-b">
                  <div className="flex gap-6 px-6">
                    {['Description', 'Reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.toLowerCase()
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'description' && (
                    <div>
                      <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div>
                      <p className="text-sm text-gray-600">
                        {product.reviews && product.reviews.length > 0
                          ? `${product.reviews.length} reviews`
                          : 'No reviews yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Supplier */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded p-4 sticky top-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm mb-1">Supplier</div>
                    <div className="text-sm text-gray-700">E-Commerce Store</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe size={14} />
                    Worldwide
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-green-600" />
                    Verified Seller
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-2.5 rounded text-sm font-medium transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } mb-2`}
                >
                  {product.stock === 0 ? 'Out of Stock' : addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <Link 
                  to="/cart"
                  className="w-full border border-blue-600 text-blue-600 py-2.5 rounded text-sm font-medium hover:bg-blue-50 transition-colors text-center block"
                >
                  View Cart
                </Link>

                <button className="w-full flex items-center justify-center gap-2 text-blue-600 py-2.5 text-sm font-medium hover:bg-blue-50 rounded transition-colors mt-4">
                  <Heart size={18} />
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
