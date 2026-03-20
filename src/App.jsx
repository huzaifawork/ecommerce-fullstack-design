import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import ProductForm from './pages/ProductForm'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'
import { SearchProvider } from './context/SearchContext'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const location = useLocation()
  const hideNavbarOnMobile = location.pathname === '/products' || location.pathname.startsWith('/products/') || location.pathname === '/cart'
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && !isAuthRoute && (
        <>
          {!hideNavbarOnMobile && <Navbar />}
          <div className="hidden md:block">
            {hideNavbarOnMobile && <Navbar />}
          </div>
        </>
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute adminOnly>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <ProtectedRoute adminOnly>
              <ProductForm />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
