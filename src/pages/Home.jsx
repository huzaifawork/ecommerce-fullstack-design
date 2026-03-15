import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const sidebarCategories = ['Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech', 'Tools, equipments', 'Sports and outdoor', 'Animal and pets', 'Machinery tools', 'More category']

const dealProducts = [
  { name: 'Smart watches', discount: 25, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop' },
  { name: 'Laptops', discount: 15, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop' },
  { name: 'GoPro cameras', discount: 40, img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=120&h=120&fit=crop' },
  { name: 'Headphones', discount: 25, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop' },
  { name: 'Canon cameras', discount: 25, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop' },
]

const homeOutdoorProducts = [
  { name: 'Soft chairs', from: 19, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop' },
  { name: 'Sofa & chair', from: 19, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop' },
  { name: 'Kitchen dishes', from: 19, img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop' },
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop' },
  { name: 'Kitchen mixer', from: 100, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop' },
  { name: 'Blenders', from: 39, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=80&h=80&fit=crop' },
  { name: 'Home appliance', from: 19, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop' },
  { name: 'Coffee maker', from: 10, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop' },
]

const electronicsProducts = [
  { name: 'Smart watches', from: 19, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop' },
  { name: 'Cameras', from: 89, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&h=80&fit=crop' },
  { name: 'Headphones', from: 70, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop' },
  { name: 'Smart watches', from: 90, img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop' },
  { name: 'Gaming set', from: 35, img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=80&h=80&fit=crop' },
  { name: 'Laptops & PC', from: 340, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop' },
  { name: 'Smartphones', from: 19, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop' },
  { name: 'Electric kettle', from: 240, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop' },
]

const recommendedItems = [
  { id: 1, name: 'T-shirts with multiple colors, for men', price: 10.30, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
  { id: 2, name: 'Jeans shorts for men blue color', price: 10.30, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
  { id: 3, name: 'Brown winter coat medium size', price: 12.50, img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&h=200&fit=crop' },
  { id: 4, name: 'Jeans bag for travel for men', price: 34.00, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
  { id: 5, name: 'Leather wallet', price: 99.00, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop' },
  { id: 6, name: 'Canon camera black, 100x zoom', price: 9.99, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop' },
  { id: 7, name: 'Headset for gaming with mic', price: 8.99, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { id: 8, name: 'Smartwatch silver color modern', price: 10.30, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
  { id: 9, name: 'Blue wallet for men leather metarfial', price: 10.30, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop' },
  { id: 10, name: 'Jeans bag for travel for men', price: 80.95, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
]

const services = [
  { label: 'Source from Industry Hubs', icon: '🔍', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=120&fit=crop' },
  { label: 'Customize Your Products', icon: '📋', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop' },
  { label: 'Fast, reliable shipping by ocean or air', icon: '✈️', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&h=120&fit=crop' },
  { label: 'Product monitoring and inspection', icon: '🌐', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop' },
]

const regions = [
  { country: 'Arabic Emirates', flag: '🇦🇪', domain: 'shopname.ae' },
  { country: 'Australia', flag: '🇦🇺', domain: 'shopname.au' },
  { country: 'United States', flag: '🇺🇸', domain: 'shopname.us' },
  { country: 'Russia', flag: '🇷🇺', domain: 'shopname.ru' },
  { country: 'Italy', flag: '🇮🇹', domain: 'shopname.it' },
  { country: 'Denmark', flag: '🇩🇰', domain: 'denmark.com.dk' },
  { country: 'France', flag: '🇫🇷', domain: 'shopname.com.fr' },
  { country: 'Arabic Emirates', flag: '🇦🇪', domain: 'shopname.ae' },
  { country: 'China', flag: '🇨🇳', domain: 'shopname.cn' },
  { country: 'Great Britain', flag: '🇬🇧', domain: 'shopname.co.uk' },
]

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

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_180px] gap-3">

          {/* Sidebar */}
          <div className="bg-white rounded border border-gray-200 py-2 hidden md:block">
            {sidebarCategories.map((cat, i) => (
              <Link
                key={i}
                to="/products"
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
              <button className="mt-4 bg-white text-gray-800 text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-100 transition-colors">
                Learn more
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=220&fit=crop"
              alt="Electronics"
              className="absolute right-0 bottom-0 h-full object-cover opacity-80"
            />
          </div>

          {/* Right Cards */}
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
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0">
              <h3 className="font-semibold text-gray-800">Deals and offers</h3>
              <p className="text-xs text-gray-500">Hygiene equipments</p>
              <CountdownTimer />
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {dealProducts.map((p, i) => (
                <Link to="/products" key={i} className="border border-gray-200 rounded p-2 flex flex-col items-center hover:border-blue-400 transition-colors">
                  <img src={p.img} alt={p.name} className="w-16 h-16 object-contain" />
                  <p className="text-xs text-gray-700 text-center mt-1 leading-tight">{p.name}</p>
                  <span className="mt-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">-{p.discount}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOME & OUTDOOR + CONSUMER ELECTRONICS ── */}
      {[
        { title: 'Home and outdoor', subtitle: '', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=160&h=180&fit=crop', items: homeOutdoorProducts },
        { title: 'Consumer electronics and gadgets', subtitle: '', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=160&h=180&fit=crop', items: electronicsProducts },
      ].map((section) => (
        <section key={section.title} className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded border border-gray-200 p-4 flex gap-4">
            {/* Left promo */}
            <div className="w-36 shrink-0 hidden md:flex flex-col justify-between rounded overflow-hidden relative bg-amber-50 p-3">
              <div>
                <h4 className="font-bold text-gray-800 text-sm leading-tight">{section.title}</h4>
                <Link to="/products" className="mt-3 inline-block bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-50">
                  Source now
                </Link>
              </div>
              <img src={section.img} alt={section.title} className="w-full h-24 object-cover rounded mt-2" />
            </div>
            {/* Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {section.items.map((item, i) => (
                <Link to="/products" key={i} className="flex items-center gap-2 border border-gray-100 rounded p-2 hover:border-blue-300 transition-colors">
                  <img src={item.img} alt={item.name} className="w-14 h-14 object-contain shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-700 leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">From<br /><span className="text-gray-600">USD {item.from}</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── SEND QUOTE BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="rounded overflow-hidden relative bg-blue-600 flex flex-col md:flex-row items-center">
          <div className="flex-1 p-8 text-white z-10">
            <h2 className="text-2xl font-bold leading-snug">An easy way to send<br />requests to all suppliers</h2>
            <p className="text-blue-100 text-sm mt-2 max-w-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="bg-white rounded m-4 p-5 w-full md:w-80 shrink-0 shadow">
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
        </div>
      </section>

      {/* ── RECOMMENDED ITEMS ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Recommended items</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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

      {/* ── OUR EXTRA SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Our extra services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div key={i} className="relative rounded overflow-hidden group cursor-pointer">
                <img src={s.img} alt={s.label} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-2">
                  <span className="bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-sm mb-1">{s.icon}</span>
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
                <span className="text-xl">{r.flag}</span>
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
            <input type="email" placeholder="✉ Email" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  )
}
