import { Link } from 'react-router-dom'
import { ChevronLeft, Lock, MessageSquare, Truck, Menu, Trash2 } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const subtotal = getCartTotal()
  const discount = 0
  const tax = subtotal * 0.1
  const total = subtotal - discount + tax

  return (
    <div className="bg-gray-50 min-h-screen">
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Shopping cart ({getCartCount()})</h1>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded inline-block hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4">
                  <div className="flex gap-3 mb-3">
                    <Link to={`/products/${item._id}`}>
                      <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item._id}`} className="text-base font-normal text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </Link>
                      <div className="text-xs text-gray-500">
                        <div>Category: {item.category}</div>
                        <div>Stock: {item.stock} available</div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="p-1 h-fit text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600"
                      >
                        −
                      </button>
                      <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-medium">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-4 mt-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({getCartCount()}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded font-medium mt-4 hover:bg-green-700 transition-colors">
                Checkout ({getCartCount()} items)
              </button>
              <Link to="/products" className="block text-center text-blue-600 text-sm mt-3 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My cart ({getCartCount()})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="mb-4">Your cart is empty</p>
                  <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded inline-block hover:bg-blue-700">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-4 border-b last:border-b-0">
                      <div className="flex gap-4">
                        <Link to={`/products/${item._id}`}>
                          <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
                        </Link>
                        <div className="flex-1">
                          <Link to={`/products/${item._id}`} className="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600">
                            {item.name}
                          </Link>
                          <div className="text-xs text-gray-500 space-y-0.5">
                            <div>Category: {item.category}</div>
                            <div>Stock: {item.stock} available</div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => removeFromCart(item._id)} className="text-xs text-red-500 hover:text-red-600">
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900 mb-2">${(item.price * item.quantity).toFixed(2)}</div>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          >
                            {[...Array(Math.min(10, item.stock))].map((_, i) => (
                              <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Back to shop and Remove all */}
            <div className="flex items-center justify-between mt-4">
              <Link to="/products" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
                <ChevronLeft size={16} />
                Back to shop
              </Link>
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="text-red-600 text-sm font-medium hover:text-red-700">
                  Remove all
                </button>
              )}
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Super discount on more than 100 USD</h3>
              <p className="text-blue-100 text-sm">Have you ever finally just write dummy info</p>
            </div>
            <Link to="/products" className="bg-orange-500 text-white px-6 py-2.5 rounded font-medium hover:bg-orange-600 transition-colors">
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
