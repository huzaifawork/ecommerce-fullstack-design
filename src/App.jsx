import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'

function AppContent() {
  const location = useLocation()
  const hideNavbarOnMobile = location.pathname === '/products' || location.pathname.startsWith('/products/') || location.pathname === '/cart'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideNavbarOnMobile && <Navbar />}
      <div className="hidden md:block">
        {hideNavbarOnMobile && <Navbar />}
      </div>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  )
}
