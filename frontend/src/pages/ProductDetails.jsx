import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

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
  const product = products.find((p) => p.id === Number(id))
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-xl font-semibold text-gray-700">Product not found</p>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">Back to Products</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600">Products</Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-indigo-500 text-sm font-medium uppercase tracking-wide">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-indigo-600 mt-4">${product.price}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {/* Size */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium border transition-colors ${
                    selectedSize === s ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:border-indigo-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-lg border border-gray-300 text-lg font-bold hover:border-indigo-400 transition-colors">−</button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-lg border border-gray-300 text-lg font-bold hover:border-indigo-400 transition-colors">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
