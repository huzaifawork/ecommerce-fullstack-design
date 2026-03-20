import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, ChevronDown, Menu, X, Search } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useCart } from '../context/CartContext'
import { useSearch } from '../context/SearchContext'
import { useAuth } from '../context/AuthContext'

const navLinks = ['Hot offers', 'Gift boxes', 'Projects', 'Menu item', 'Help']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { getCartCount } = useCart()
  const { handleSearch } = useSearch()
  const { user, logout, isAdmin } = useAuth()

  const onSearch = (e) => {
    e.preventDefault()
    if (localSearch.trim()) {
      handleSearch(localSearch)
      setLocalSearch('')
    }
  }

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-sm">Brand</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="text-gray-600 relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <Link to="#" className="text-gray-600">
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 py-3 border-b border-gray-200">
          <form onSubmit={onSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-gray-100 rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
            />
          </form>
        </div>

        {/* Mobile Category Tabs */}
        <div className="overflow-x-auto scrollbar-hide border-b border-gray-200">
          <div className="flex gap-2 px-4 py-3 min-w-min">
            {['All category', 'Electronics', 'Clothing', 'Footwear', 'Accessories'].map((cat) => (
              <Link
                key={cat}
                to={cat === 'All category' ? '/products' : `/products?category=${cat}`}
                className="text-sm text-blue-600 whitespace-nowrap px-3 py-1 rounded-full border border-blue-300 hover:bg-blue-50"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-14">
          <Link to="/" className="flex items-center gap-1.5 mr-4 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-lg">Brand</span>
          </Link>

          <form onSubmit={onSearch} className="flex flex-1 max-w-2xl border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5">
              <Search size={16} /> Search
            </button>
          </form>

          <div className="ml-auto flex items-center gap-4 text-gray-600 text-xs shrink-0">
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex flex-col items-center hover:text-blue-600 gap-0.5"
              >
                <User size={20} />
                <span>{user ? user.name.split(' ')[0] : 'Profile'}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {isAdmin() && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout()
                          setShowUserMenu(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <Link to="/cart" className="flex flex-col items-center hover:text-blue-600 gap-0.5 relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
              <span>My cart</span>
            </Link>
          </div>
        </div>

        {/* Desktop Bottom Nav */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-10 text-sm border-t border-gray-200">
          <button className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-blue-600">
            <Menu size={16} /> <Link to="/products">All category</Link>
          </button>
          <div className="w-px h-5 bg-gray-200" />
          {navLinks.map((link) => (
            <Link key={link} to={link === 'All category' ? '/products' : '#'} className="text-gray-600 hover:text-blue-600 whitespace-nowrap">{link}</Link>
          ))}
          <div className="ml-auto flex items-center gap-4 text-gray-600 text-xs">
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3" /> English, USD <ChevronDown size={12} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Ship to <img src="https://flagcdn.com/w20/de.png" alt="DE" className="w-4 h-3" /> <ChevronDown size={12} />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
