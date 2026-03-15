import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">Shopify</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[['/', 'Home'], ['/products', 'Products']].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          {[['/', 'Home'], ['/products', 'Products'], ['/cart', 'Cart']].map(([to, label]) => (
            <NavLink key={to} to={to} end onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-600'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
