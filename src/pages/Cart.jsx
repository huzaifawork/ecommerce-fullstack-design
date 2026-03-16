import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Lock, MessageSquare, Truck, ShoppingCart, ArrowLeft, MoreVertical, Menu } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'

const cartData = [
  {
    id: 1,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Artel Market',
    price: 78.99,
    qty: 9,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Best factory LLC',
    price: 39.00,
    qty: 3,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'T-shirts with multiple colors, for men and lady',
    size: 'medium',
    color: 'blue',
    material: 'Plastic',
    seller: 'Artel Market',
    price: 170.50,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop'
  }
]

const savedItems = [
  {
    id: 101,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop'
  },
  {
    id: 102,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
  },
  {
    id: 103,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
  },
  {
    id: 104,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop'
  }
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(cartData)
  const [couponCode, setCouponCode] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const subtotal = 1403.97
  const discount = 60.00
  const tax = 14.00
  const total = 1357.97

  // Mobile calculations
  const mobileItemsTotal = 32.00
  const mobileShipping = 10.00
  const mobileTax = 7.00
  const mobileTotal = 220.00

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const saveForLater = (id) => {
    console.log('Save for later:', id)
  }

  const removeAll = () => {
    setCartItems([])
  }

  const updateQty = (id, newQty) => {
    if (newQty < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Shopping cart</h1>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Cart Items */}
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4">
              <div className="flex gap-3 mb-3">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-normal text-gray-900 mb-1">{item.name}</h3>
                  <div className="text-xs text-gray-500">
                    <div>Size: {item.size}, Color: {item.color}</div>
                    <div>Seller: {item.seller}</div>
                  </div>
                </div>
                <button className="p-1 h-fit">
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600"
                  >
                    −
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-medium">
                    {item.qty}
                  </div>
                  <button 
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold text-gray-900">${item.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-4 mt-2">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items ({cartItems.length}):</span>
              <span>${mobileItemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span>${mobileShipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax:</span>
              <span>${mobileTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
              <span>Total:</span>
              <span>${mobileTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded font-medium mt-4 hover:bg-green-700 transition-colors">
            Checkout ({cartItems.length} items)
          </button>
        </div>

        {/* Saved for later */}
        <div className="bg-white p-4 mt-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved for later</h2>
          <div className="space-y-3">
            {savedItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                <div className="flex-1">
                  <h3 className="text-sm text-gray-900 mb-1">Regular Fit Resort Shirt</h3>
                  <div className="text-base font-semibold text-gray-900 mb-2">${item.price}</div>
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 font-medium border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                      Move to cart
                    </button>
                    <button className="text-sm text-red-500 font-medium border border-red-500 px-3 py-1 rounded hover:bg-red-50">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <div>Size: {item.size}, Color: {item.color}, Material: {item.material}</div>
                        <div>Seller: {item.seller}</div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:text-red-600">
                          Remove
                        </button>
                        <button onClick={() => saveForLater(item.id)} className="text-xs text-blue-600 hover:text-blue-700">
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 mb-2">${item.price}</div>
                      <select 
                        value={item.qty}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to shop and Remove all */}
            <div className="flex items-center justify-between mt-4">
              <Link to="/products" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
                <ChevronLeft size={16} />
                Back to shop
              </Link>
              <button onClick={removeAll} className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Remove all
              </button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <Lock size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Secure payment</div>
                  <div className="text-xs text-gray-500">Have you ever finally just</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <MessageSquare size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Customer support</div>
                  <div className="text-xs text-gray-500">Have you ever finally just</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <Truck size={20} className="text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Free delivery</div>
                  <div className="text-xs text-gray-500">Have you ever finally just</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg p-4">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Have a coupon?</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                  <button className="text-blue-600 text-sm font-medium px-4 hover:text-blue-700">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-red-500">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-green-600">+ ${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded font-medium mt-4 hover:bg-green-700 transition-colors">
                Checkout
              </button>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Saved for later */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved for later</h2>
          <div className="grid grid-cols-4 gap-4">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full aspect-square object-cover bg-gray-100" />
                <div className="p-3">
                  <div className="text-base font-semibold text-gray-900 mb-1">${item.price}</div>
                  <div className="text-xs text-gray-600 line-clamp-2 mb-3">{item.name}</div>
                  <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700">
                    <ShoppingCart size={14} />
                    Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mt-8">
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
    </div>
  )
}
