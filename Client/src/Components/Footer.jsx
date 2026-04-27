import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">A&A <span className="text-orange-500 font-light">Store</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Providing high-quality electronics and lifestyle products since 2024. 
              Elevating your shopping experience with premium service.
            </p>
          </div>

          {/* Founders Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Founders</h4>
            <p className="text-lg font-medium text-gray-700 italic font-serif">
              Anuj and Ashish
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h4>
            <p className="text-sm text-gray-600">
              Email: <a href="mailto:anuj11112003@gmail.com" className="text-blue-600 hover:underline">anuj11112003@gmail.com</a>
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} A&A Store. All rights reserved.</p>
          <nav className="flex gap-6 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-orange-500 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
