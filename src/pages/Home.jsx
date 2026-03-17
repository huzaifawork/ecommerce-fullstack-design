import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { getAllProducts } from '../services/api'

function CountdownTimer() {
  const [time, setTime] = useState({ days: 4, hours: 13, mins: 34, secs: 56 })
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        let { days, hours, mins, secs } = t
        secs--
        if (secs < 0) { secs = 59; mins-- }
        if (mins < 0) { mins = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; mins = 0; secs = 0 }
        return { days, hours, mins, secs }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex items-center gap-1 mt-1">
      {[['Days', time.days], ['Hour', time.hours], ['Min', time.mins], ['Sec', time.secs]].map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-gray-800 text-white text-xs font-bold w-8 h-7 flex items-center justify-center rounded">
            {String(val).padStart(2, '0')}
          </div>
          <span className="text-gray-500 text-[9px]">{label}</span>
        </div>
      ))}
    </div>
  )
}

const services = [
  { label: 'Source from Industry Hubs', icon: '📦', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=120&fit=crop' },
  { label: 'Customize Your Products', icon: '📋', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop' },
  { label: 'Fast, reliable shipping by ocean or air', icon: '✈️', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&h=120&fit=crop' },
  { label: 'Product monitoring and inspection', icon: '✅', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop' },
]

const regions = [
  { country: 'Arabic Emirates', code: 'AE', domain: 'shopname.ae' },
  { country: 'Australia', code: 'AU', domain: 'shopname.au' },
  { country: 'United States', code: 'US', domain: 'shopname.us' },
  { country: 'Russia', code: 'RU', domain: 'shopname.ru' },
  { country: 'Italy', code: 'IT', domain: 'shopname.it' },
  { country: 'Denmark', code: 'DK', domain: 'denmark.com.dk' },
  { country: 'France', code: 'FR', domain: 'shopname.com.fr' },
  { country: 'China', code: 'CN', domain: 'shopname.cn' },
  { country: 'Great Britain', code: 'GB', domain: 'shopname.co.uk' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getAllProducts()
        setProducts(data)
        
        const uniqueCategories = [...new Set(data.map(p => p.category))]
        setCategories(uniqueCategories)
        
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const recommendedItems = products.slice(0, 10)
  const dealProducts = products.slice(0, 5)
  const homeOutdoorProducts = products.filter(p => p.category === 'Accessories' || p.category === 'Footwear').slice(0, 8)
  const electronicsProducts = products.filter(p => p.category === 'Electronics').slice(0, 8)

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-3">

          {/* Sidebar - Hidden on mobile */}
          <div className="bg-white rounded border border-gray-200 py-2 hidden md:block">
            {categories.map((cat, i) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${i === 0 ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
              >
                {cat} {i === 0 && <ChevronRight size={14} />}
              </Link>
            ))}
          </div>

          {/* Banner */}
          <div className="bg-teal-400 rounded overflow-hidden relative flex items-center px-8 min-h-[220px]">
            <div className="z-10">
              <p className="text-white text-sm">Latest trending</p>
              <h2 className="text-white text-3xl font-bold leading-tight">Electronic<br />items</h2>
              <Link to="/products?category=Electronics" className="mt-4 bg-white text-gray-800 text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-100 transition-colors inline-block">
                Learn more
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=220&fit=crop"
              alt="Electronics"
              className="absolute right-0 bottom-0 h-full object-cover opacity-80"
            />
          </div>

          {/* Right Cards - Hidden on mobile */}
          <div className="flex flex-col gap-2 hidden md:flex">
            <div className="bg-white rounded border border-gray-200 p-3">
              <p className="text-sm font-medium text-gray-700">Hi, user</p>
              <p className="text-xs text-gray-500 mb-2">let's get started</p>
              <Link to="#" className="block w-full bg-blue-600 text-white text-xs text-center py-1.5 rounded mb-1.5 hover:bg-blue-700">Join now</Link>
              <Link to="#" className="block w-full border border-blue-600 text-blue-600 text-xs text-center py-1.5 rounded hover:bg-blue-50">Log in</Link>
            </div>
            <div className="bg-orange-400 rounded p-3 text-white text-xs font-medium">
              Get US $10 off<br />with a new<br />supplier
            </div>
            <div className="bg-teal-500 rounded p-3 text-white text-xs font-medium">
              Send quotes with<br />supplier<br />preferences
            </div>
          </div>
        </div>
      </section>

      {/* ── DEALS & OFFERS ── */}
      {dealProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="shrink-0">
                <h3 className="font-semibold text-gray-800">Deals and offers</h3>
                <p className="text-xs text-gray-500">Limited time only</p>
                <CountdownTimer />
              </div>
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 overflow-x-auto">
                {dealProducts.map((p) => (
                  <Link to={`/products/${p._id}`} key={p._id} className="border border-gray-200 rounded p-2 flex flex-col items-center hover:border-blue-400 transition-colors">
                    <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-contain" />
                    <p className="text-xs text-gray-700 text-center mt-1 leading-tight line-clamp-2">{p.name}</p>
                    <span className="mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">-{Math.floor(Math.random() * 30 + 10)}%</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── HOME & OUTDOOR ── */}
      {homeOutdoorProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded border border-gray-200 p-4 flex gap-4">
            <div className="w-36 shrink-0 hidden md:flex flex-col justify-between rounded overflow-hidden relative bg-amber-50 p-3">
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight">Home and outdoor</h4>
                <Link to="/products?category=Accessories" className="mt-3 inline-block bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-50">
                  Source now
                </Link>
              </div>
              <img src={homeOutdoorProducts[0]?.images[0]} alt="Home" className="w-full h-24 object-cover rounded mt-2" />
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {homeOutdoorProducts.map((item) => (
                <Link to={`/products/${item._id}`} key={item._id} className="flex items-center gap-2 border border-gray-100 rounded p-2 hover:border-blue-300 transition-colors">
                  <img src={item.images[0]} alt={item.name} className="w-14 h-14 object-contain shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-700 leading-tight line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">From<br /><span className="text-gray-600">USD {Math.floor(item.price)}</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden mt-2">
            <Link to="/products?category=Accessories" className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 hover:underline">
              Source now <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* ── CONSUMER ELECTRONICS ── */}
      {electronicsProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded border border-gray-200 p-4 flex gap-4">
            <div className="w-36 shrink-0 hidden md:flex flex-col justify-between rounded overflow-hidden relative bg-amber-50 p-3">
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight">Consumer electronics</h4>
                <Link to="/products?category=Electronics" className="mt-3 inline-block bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-50">
                  Source now
                </Link>
              </div>
              <img src={electronicsProducts[0]?.images[0]} alt="Electronics" className="w-full h-24 object-cover rounded mt-2" />
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {electronicsProducts.map((item) => (
                <Link to={`/products/${item._id}`} key={item._id} className="flex items-center gap-2 border border-gray-100 rounded p-2 hover:border-blue-300 transition-colors">
                  <img src={item.images[0]} alt={item.name} className="w-14 h-14 object-contain shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-700 leading-tight line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">From<br /><span className="text-gray-600">USD {Math.floor(item.price)}</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden mt-2">
            <Link to="/products?category=Electronics" className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 hover:underline">
              Source now <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* ── SEND QUOTE BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="rounded overflow-hidden relative bg-blue-600 flex flex-col md:flex-row items-center">
          <div className="flex-1 p-8 text-white z-10">
            <h2 className="text-2xl font-bold leading-snug">An easy way to send<br />requests to all suppliers</h2>
            <p className="text-blue-100 text-sm mt-2 max-w-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="bg-white rounded m-4 p-5 w-full md:w-80 shrink-0 shadow hidden md:block">
            <h3 className="font-semibold text-gray-800 mb-3">Send quote to suppliers</h3>
            <p className="text-xs text-gray-500 mb-1">What item you need?</p>
            <input type="text" placeholder="Type more details" className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3 outline-none focus:ring-1 focus:ring-blue-400" />
            <div className="flex gap-2 mb-3">
              <input type="number" placeholder="Quantity" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
              <select className="border border-gray-300 rounded px-2 py-2 text-sm outline-none">
                <option>Pcs</option><option>Kg</option><option>Box</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
              Send inquiry
            </button>
          </div>
          <button className="md:hidden bg-white text-blue-600 font-semibold px-6 py-2 rounded m-4 hover:bg-gray-100 transition-colors text-sm">
            Send inquiry
          </button>
        </div>
      </section>

      {/* ── RECOMMENDED ITEMS ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Recommended items</h3>
          {recommendedItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No products available</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {recommendedItems.map((item) => (
                <Link to={`/products/${item._id}`} key={item._id} className="border border-gray-100 rounded hover:border-blue-300 hover:shadow-sm transition-all overflow-hidden group">
                  <div className="bg-gray-50 aspect-square overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── OUR EXTRA SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Our extra services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div key={i} className="relative rounded overflow-hidden group cursor-pointer">
                <img src={s.img} alt={s.label} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                  <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-lg mb-1.5">{s.icon}</span>
                  <p className="text-white text-xs font-medium leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPLIERS BY REGION ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Suppliers by region</h3>
            <Link to="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {regions.map((r, i) => (
              <Link to="#" key={i} className="flex items-center gap-2 p-2 border border-gray-100 rounded hover:border-blue-300 transition-colors">
                <img 
                  src={`https://flagcdn.com/w40/${r.code.toLowerCase()}.png`} 
                  alt={r.country}
                  className="w-6 h-4 object-cover rounded"
                />
                <div>
                  <p className="text-xs font-medium text-gray-700">{r.country}</p>
                  <p className="text-xs text-gray-400">{r.domain}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="max-w-7xl mx-auto px-4 py-3 pb-6">
        <div className="bg-white rounded border border-gray-200 p-6 text-center">
          <h3 className="font-semibold text-gray-800">Subscribe on our newsletter</h3>
          <p className="text-xs text-gray-500 mt-1 mb-4">Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="flex justify-center gap-2 max-w-sm mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
              <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2 pl-8 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  )
}
