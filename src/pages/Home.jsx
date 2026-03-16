import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const dealProducts = [
  { name: 'Smart watches', discount: 25, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop' },
  { name: 'Smart watches', discount: 25, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop' },
  { name: 'Smart watches', discount: 25, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop' },
]

const homeOutdoorProducts = [
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100&h=100&fit=crop' },
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=100&h=100&fit=crop' },
]

const electronicsProducts = [
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop' },
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
]

const recommendedItems = [
  { id: 1, name: 'T-shirts with multiple colors, for men', price: 10.30, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
  { id: 2, name: 'Jeans shorts for men blue color', price: 10.30, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
  { id: 3, name: 'Jeans bag for travel for men', price: 10.30, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
  { id: 4, name: 'Brown winter coat medium size', price: 10.30, img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&h=200&fit=crop' },
]

function CountdownTimer() {
  const [time, setTime] = useState({ days: 13, hours: 34, mins: 56, secs: 0 })
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
    <div className="flex items-center gap-2 mt-2">
      {[['Days', time.days], ['Hour', time.hours], ['Min', time.mins], ['Sec', time.secs]].map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-gray-200 text-gray-700 text-xs font-bold w-10 h-8 flex items-center justify-center rounded">
            {String(val).padStart(2, '0')}
          </div>
          <span className="text-gray-500 text-[8px] mt-0.5">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO BANNER ── */}
      <section className="px-4 py-4 md:px-0 md:py-0">
        <div className="bg-teal-400 rounded-lg md:rounded-none overflow-hidden relative flex items-center px-6 py-8 md:px-8 md:py-12 min-h-[200px] md:min-h-[220px]">
          <div className="z-10">
            <p className="text-white text-xs md:text-sm">Latest trending</p>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">Electronic<br />items</h2>
            <button className="mt-3 md:mt-4 bg-white text-gray-800 text-xs md:text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-100 transition-colors">
              Learn more
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=220&fit=crop"
            alt="Electronics"
            className="absolute right-0 bottom-0 h-full object-cover opacity-80"
          />
        </div>
      </section>

      {/* ── DEALS & OFFERS ── */}
      <section className="px-4 py-4 md:px-0 md:py-3">
        <div className="bg-gray-50 md:bg-white rounded-lg md:rounded-none border-b md:border border-gray-200 p-4 md:p-4">
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Deals and offers</h3>
              <p className="text-xs text-gray-500">Electronic equipments</p>
              <CountdownTimer />
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 min-w-min">
                {dealProducts.map((p, i) => (
                  <Link to="/products" key={i} className="border border-gray-200 rounded p-2 flex flex-col items-center hover:border-blue-400 transition-colors shrink-0 w-24">
                    <img src={p.img} alt={p.name} className="w-14 h-14 object-contain" />
                    <p className="text-xs text-gray-700 text-center mt-1 leading-tight line-clamp-1">{p.name}</p>
                    <span className="mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">-{p.discount}%</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOME & OUTDOOR ── */}
      <section className="px-4 py-4 md:px-0 md:py-3">
        <div className="bg-gray-50 md:bg-white rounded-lg md:rounded-none border-b md:border border-gray-200 p-4 md:p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Home and outdoor</h3>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-min">
              {homeOutdoorProducts.map((item, i) => (
                <Link to="/products" key={i} className="flex flex-col items-center border border-gray-100 rounded p-2 hover:border-blue-300 transition-colors shrink-0 w-24">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" />
                  <p className="text-xs text-gray-700 text-center mt-1 leading-tight line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">From USD {item.from}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/products" className="text-blue-600 text-sm font-medium mt-3 inline-flex items-center gap-1 hover:underline">
            Source now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CONSUMER ELECTRONICS ── */}
      <section className="px-4 py-4 md:px-0 md:py-3">
        <div className="bg-gray-50 md:bg-white rounded-lg md:rounded-none border-b md:border border-gray-200 p-4 md:p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Consumer electronics</h3>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-min">
              {electronicsProducts.map((item, i) => (
                <Link to="/products" key={i} className="flex flex-col items-center border border-gray-100 rounded p-2 hover:border-blue-300 transition-colors shrink-0 w-24">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" />
                  <p className="text-xs text-gray-700 text-center mt-1 leading-tight line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">From USD {item.from}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/products" className="text-blue-600 text-sm font-medium mt-3 inline-flex items-center gap-1 hover:underline">
            Source now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── SEND QUOTE BANNER ── */}
      <section className="px-4 py-4 md:px-0 md:py-3">
        <div className="rounded-lg md:rounded-none overflow-hidden relative bg-blue-600 flex flex-col md:flex-row items-center p-6 md:p-8">
          <div className="flex-1 text-white z-10 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold leading-snug">An easy way to send<br />requests to all suppliers</h2>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition-colors text-sm md:text-base">
            Send inquiry
          </button>
        </div>
      </section>

      {/* ── RECOMMENDED ITEMS ── */}
      <section className="px-4 py-4 md:px-0 md:py-3">
        <div className="bg-gray-50 md:bg-white rounded-lg md:rounded-none border-b md:border border-gray-200 p-4 md:p-4">
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Recommended items</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {recommendedItems.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="border border-gray-100 rounded hover:border-blue-300 hover:shadow-sm transition-all overflow-hidden group">
                <div className="bg-gray-50 aspect-square overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2">
                  <p className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
