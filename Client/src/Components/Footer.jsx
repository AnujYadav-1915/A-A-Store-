import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} NakliZon. All rights reserved.</p>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
        </nav>
      </div>
    </footer>
  );
}
