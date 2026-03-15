import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categories = ['Electronics', 'Accessories', 'Footwear', 'Clothing', 'Lifestyle', 'Sports']

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="bg-white/20 text-sm px-3 py-1 rounded-full">New Collection 2025</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
              Shop the <br className="hidden md:block" />Latest Trends
            </h1>
            <p className="mt-4 text-indigo-100 text-lg max-w-md">
              Discover thousands of products at unbeatable prices. Free shipping on orders over $50.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/products" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                Shop Now
              </Link>
              <Link to="/products" className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                View Deals
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=500&fit=crop"
              alt="Hero"
              className="w-72 md:w-96 rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:text-indigo-600 transition-all font-medium text-gray-700"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-indigo-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Get 20% Off Your First Order</h2>
            <p className="text-gray-500 mt-2">Sign up for our newsletter and receive an exclusive discount.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
