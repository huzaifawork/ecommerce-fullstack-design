import { Link } from 'react-router-dom'

const footerLinks = {
  About: ['About Us', 'Find store', 'Categories', 'Blogs'],
  Partnership: ['About Us', 'Find store', 'Categories', 'Blogs'],
  Information: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'],
  'For users': ['Login', 'Register', 'Settings', 'My Orders'],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 text-lg">Brand</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-3">
              {['👥', '🐦', '💼', '📷', '🎬'].map((icon, i) => (
                <a key={i} href="#" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-gray-800 text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get App */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Get app</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a href="#" className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-blue-600">
            <span className="text-base">🇬🇧</span> English <span className="ml-1">▲</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
