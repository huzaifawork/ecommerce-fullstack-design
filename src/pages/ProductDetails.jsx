import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, MessageSquare, ShoppingCart, Check, ArrowLeft, ChevronLeft, ChevronRight, User, Globe, Menu } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'

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

const productData = {
  id: 1,
  name: 'Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle',
  inStock: true,
  rating: 9.3,
  reviews: 32,
  sold: 154,
  prices: [
    { qty: '50-100 pcs', price: 98.00 },
    { qty: '100-700 pcs', price: 90.00 },
    { qty: '700+ pcs', price: 78.00 }
  ],
  negotiable: true,
  specs: [
    { label: 'Type', value: 'Classic shoes' },
    { label: 'Material', value: 'Plastic material' },
    { label: 'Design', value: 'Modern nice' },
    { label: 'Customization', value: 'Customized logo and design custom packages' },
    { label: 'Protection', value: 'Refund Policy' },
    { label: 'Warranty', value: '2 years full warranty' }
  ],
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop'
  ],
  supplier: {
    name: 'Guanjoi Trading LLC',
    avatar: 'R',
    location: 'Germany, Berlin',
    verified: true,
    shipping: 'Worldwide shipping'
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  table: [
    { label: 'Model', value: '#8786867' },
    { label: 'Style', value: 'Classic style' },
    { label: 'Certificate', value: 'ISO-898921212' },
    { label: 'Size', value: '34mm x 450mm x 19mm' },
    { label: 'Memory', value: '36GB RAM' }
  ],
  features: [
    'Some great feature name here',
    'Lorem ipsum dolor sit amet, consectetur',
    'Duis aute irure dolor in reprehenderit',
    'Some great feature name here'
  ],
  youMayLike: [
    { id: 1, name: 'Men Blazers Sets Elegant Formal', price: '7.00 - $99.50', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop' },
    { id: 2, name: 'Men Shirt Sleeve Polo Contrast', price: '7.00 - $99.50', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop' },
    { id: 3, name: 'Apple Watch Series Space Gray', price: '7.00 - $99.50', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop' },
    { id: 4, name: 'Basketball Crew Socks Long Stuff', price: '7.00 - $99.50', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop' },
    { id: 5, name: "New Summer Men's castrol T-Shirts", price: '7.00 - $99.50', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop' }
  ],
  relatedProducts: [
    { id: 1, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
    { id: 2, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 3, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 4, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    { id: 5, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
    { id: 6, name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop' }
  ]
}

export default function ProductDetails() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productData.images.length) % productData.images.length)
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <button className="p-1">
              <ShoppingCart size={24} />
            </button>
            <button className="p-1">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Product Image with Navigation */}
        <div className="relative bg-white">
          <div className="aspect-square bg-gray-100">
            <img src={productData.images[selectedImage]} alt={productData.name} className="w-full h-full object-cover" />
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
            <StarRating rating={4} />
            <MessageSquare size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{productData.reviews} reviews</span>
            <span className="text-gray-400">•</span>
            <ShoppingCart size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">{productData.sold} sold</span>
          </div>

          {/* Product Name */}
          <h1 className="text-lg font-normal text-gray-900 mb-3">Product name goes here</h1>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-red-500">$129.95</span>
            <span className="text-sm text-gray-500">(50-100 pcs)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors">
              Send inquiry
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center text-blue-600 hover:bg-gray-50">
              <Heart size={20} />
            </button>
          </div>

          {/* Specifications */}
          <div className="space-y-3 mb-4">
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Condition</div>
              <div className="flex-1 text-sm text-gray-900">Brand new</div>
            </div>
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Material</div>
              <div className="flex-1 text-sm text-gray-900">Plastic</div>
            </div>
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Category</div>
              <div className="flex-1 text-sm text-gray-900">Electronics, gadgets</div>
            </div>
            <div className="flex">
              <div className="w-24 text-sm text-gray-500">Item num</div>
              <div className="flex-1 text-sm text-gray-900">23421</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Info about edu item is an ideal companion for anyone engaged in learning. The drone provides precise and ...
            </p>
            <button className="text-blue-600 text-sm font-medium mt-1">Read more</button>
          </div>
        </div>

        {/* Supplier Card */}
        <div className="bg-white px-4 py-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                R
              </div>
              <div>
                <div className="text-xs text-gray-500">Supplier</div>
                <div className="text-sm font-medium text-gray-900">Guanjoi Trading LLC</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-4 h-3" />
              Germany
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Check size={14} className="text-green-600" />
              Verified
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Globe size={14} />
              Shipping
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="bg-white px-4 py-4 mt-2">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Similar products</h3>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {productData.youMayLike.slice(0, 3).map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="w-40 shrink-0">
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <div className="text-base font-semibold text-gray-900 mb-1">$10.30</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{product.name}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Clothings</Link>
        <span className="mx-2">/</span>
        <Link to="#" className="hover:text-blue-600">Men's wear</Link>
        <span className="mx-2">/</span>
        <span>Summer clothing</span>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left + Center Column - Images and Product Info */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded p-6">
              <div className="flex gap-6">
                {/* Main Image and Thumbnails */}
                <div className="flex-1">
                  {/* Main Image */}
                  <div className="aspect-square rounded overflow-hidden bg-gray-100 mb-3">
                    <img src={productData.images[selectedImage]} alt={productData.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Thumbnail Row */}
                  <div className="flex gap-2">
                    {productData.images.map((img, idx) => (
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
                  <h1 className="text-xl font-semibold text-gray-900 mb-3">{productData.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={productData.rating} />
                    <span className="text-yellow-600 font-semibold text-sm">{productData.rating}</span>
                    <span className="text-gray-400">•</span>
                    <MessageSquare size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{productData.reviews} reviews</span>
                    <span className="text-gray-400">•</span>
                    <ShoppingCart size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{productData.sold} sold</span>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-b py-3 my-3">
                    <div className="space-y-2">
                      {productData.prices.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="text-xl font-bold text-red-500">${p.price}</div>
                          <div className="text-xs text-gray-500">{p.qty}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-3">
                    Price: <span className="text-gray-700">Negotiable</span>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-2">
                    {productData.specs.map((spec, idx) => (
                      <div key={idx} className="flex text-xs">
                        <div className="w-28 text-gray-500">{spec.label}:</div>
                        <div className="flex-1 text-gray-700">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded mt-4">
              <div className="border-b">
                <div className="flex gap-6 px-6">
                  {['Description', 'Reviews', 'Shipping', 'About seller'].map((tab) => (
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
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{productData.description}</p>
                    
                    <table className="w-full mb-6">
                      <tbody>
                        {productData.table.map((row, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2 text-sm text-gray-500 w-32">{row.label}</td>
                            <td className="py-2 text-sm text-gray-700">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <ul className="space-y-2">
                      {productData.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check size={16} className="text-green-600 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related products</h3>
              <div className="grid grid-cols-6 gap-4">
                {productData.relatedProducts.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded p-3 hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded mb-2" />
                    <div className="text-xs text-gray-600 line-clamp-2 mb-1">{product.name}</div>
                    <div className="text-sm font-semibold text-gray-900">{product.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Supplier */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded p-4 sticky top-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                  {productData.supplier.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Supplier</div>
                  <div className="text-sm text-gray-700">{productData.supplier.name}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-4 h-3" />
                  {productData.supplier.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-green-600" />
                  {productData.supplier.verified ? 'Verified Seller' : 'Seller'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-green-600" />
                  {productData.supplier.shipping}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors mb-2">
                Send inquiry
              </button>
              <button className="w-full border border-blue-600 text-blue-600 py-2.5 rounded text-sm font-medium hover:bg-blue-50 transition-colors">
                Seller's profile
              </button>

              <button className="w-full flex items-center justify-center gap-2 text-blue-600 py-2.5 text-sm font-medium hover:bg-blue-50 rounded transition-colors mt-4">
                <Heart size={18} />
                Save for later
              </button>
            </div>

            {/* You may like */}
            <div className="bg-white rounded p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">You may like</h3>
              <div className="space-y-3">
                {productData.youMayLike.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`} className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-700 line-clamp-2 mb-1">{product.name}</div>
                      <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner - Desktop Only */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Super discount on more than 100 USD</h3>
            <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2.5 rounded font-medium hover:bg-orange-600 transition-colors">
            Shop now
          </button>
        </div>
      </div>
    </div>
  )
}
