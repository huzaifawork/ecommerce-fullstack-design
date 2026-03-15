import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, MessageSquare, Package, User, ChevronDown, Menu, X, Search, Heart } from 'lucide-react'

const navLinks = ['Hot offers', 'Gift boxes', 'Projects', 'Menu item']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 mr-4 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-lg">Brand</span>
          </Link>

          {/* Search */}
          <div className="flex flex-1 max-w-2xl border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <select className="border-l border-gray-300 px-2 text-sm text-gray-600 bg-gray-50 outline-none">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home</option>
            </select>
            <button className="bg-blue-600 text-white px-4 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Search size={16} /> Search
            </button>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-5 ml-auto shrink-0">
            <Link to="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs gap-0.5">
              <User size={20} /><span>Profile</span>
            </Link>
            <Link to="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs gap-0.5">
              <MessageSquare size={20} /><span>Message</span>
            </Link>
            <Link to="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs gap-0.5">
              <Package size={20} /><span>Orders</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs gap-0.5">
              <ShoppingCart size={20} /><span>My cart</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden ml-auto text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-10 text-sm">
          <button className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-blue-600">
            <Menu size={16} /> All category
          </button>
          <div className="w-px h-5 bg-gray-200" />
          {navLinks.map((link) => (
            <Link key={link} to="#" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">{link}</Link>
          ))}
          <div className="flex items-center gap-1 text-gray-600 hover:text-blue-600 cursor-pointer">
            Help <ChevronDown size={14} />
          </div>
          <div className="ml-auto flex items-center gap-4 text-gray-600 text-xs">
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <span className="text-base">🇺🇸</span> English, USD <ChevronDown size={12} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Ship to <span className="text-base">🇩🇪</span> <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-3 text-sm">
          {['All category', ...navLinks, 'Help'].map((link) => (
            <Link key={link} to="#" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>{link}</Link>
          ))}
          <Link to="/cart" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>My Cart</Link>
        </div>
      )}
    </header>
  )
}
