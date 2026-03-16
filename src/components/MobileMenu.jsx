import { Link } from 'react-router-dom'
import { Home, List, Heart, Package, Globe, Headphones, Building, X, User } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-white z-[70] md:hidden overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* User Section */}
        <div className="p-6 pb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <User size={24} className="text-gray-400" />
          </div>
          <div className="text-sm text-gray-900">
            <Link to="#" className="hover:text-blue-600" onClick={onClose}>Sign in</Link>
            <span className="mx-2">|</span>
            <Link to="#" className="hover:text-blue-600" onClick={onClose}>Register</Link>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="px-4">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link 
            to="/products" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <List size={20} />
            <span>Categories</span>
          </Link>
          <Link 
            to="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </Link>
          <Link 
            to="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Package size={20} />
            <span>My orders</span>
          </Link>
        </nav>

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Secondary Menu */}
        <nav className="px-4">
          <Link 
            to="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Globe size={20} />
            <span>English | USD</span>
          </Link>
          <Link 
            to="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Headphones size={20} />
            <span>Contact us</span>
          </Link>
          <Link 
            to="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            <Building size={20} />
            <span>About</span>
          </Link>
        </nav>

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Footer Links */}
        <nav className="px-8 pb-6">
          <Link 
            to="#" 
            className="block py-2 text-sm text-gray-700 hover:text-blue-600"
            onClick={onClose}
          >
            User agreement
          </Link>
          <Link 
            to="#" 
            className="block py-2 text-sm text-gray-700 hover:text-blue-600"
            onClick={onClose}
          >
            Partnership
          </Link>
          <Link 
            to="#" 
            className="block py-2 text-sm text-gray-700 hover:text-blue-600"
            onClick={onClose}
          >
            Privacy policy
          </Link>
        </nav>
      </div>
    </>
  )
}
