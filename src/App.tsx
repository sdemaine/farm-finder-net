import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Home, Contact } from 'lucide-react';
import About from './components/About';
import { Menu } from 'lucide-react';  // For the hamburger icon

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo or Title */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold">
                  FarmFinder
                </Link>
              </div>

              {/* Links (Desktop) */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                  <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </div>
              </div>

              {/* Hamburger Menu (Mobile) */}
              <div className="flex md:hidden">
                <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                <Link to="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">About</Link>
                <Link to="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Contact</Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm">&copy; {new Date().getFullYear()} FarmFinder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}