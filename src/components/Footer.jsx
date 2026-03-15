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
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <span className="font-semibold text-gray-800 text-lg">Brand</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((s) => (
                <a key={s} href="#" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-gray-500 text-xs">
                  {s[0].toUpperCase()}
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
                <span>🍎</span> App Store
              </a>
              <a href="#" className="bg-black text-white text-xs px-3 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <span>▶</span> Google Play
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
            🇬🇧 English <span className="ml-1">▲</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
