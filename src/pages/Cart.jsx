import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const initialCart = [
  { ...products[0], qty: 1 },
  { ...products[1], qty: 2 },
  { ...products[2], qty: 1 },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart)

  const updateQty = (id, delta) => {
    setCartItems((items) =>
      items.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    )
  }

  const removeItem = (id) => setCartItems((items) => items.filter((item) => item.id !== id))

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-6xl mb-4">🛒</p>
        <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
        <Link to="/products" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-sm text-indigo-500 mt-0.5">{item.category}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">${item.price}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-gray-300 text-sm font-bold hover:border-indigo-400 transition-colors">−</button>
                  <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-gray-300 text-sm font-bold hover:border-indigo-400 transition-colors">+</button>
                </div>
                <p className="text-sm font-semibold text-gray-700">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline mt-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2 mt-5">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Apply</button>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mt-5 hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
