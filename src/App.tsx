import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import MapComponent from './components/Map';
import About from './components/About';
import { Contact } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold">
                  FarmFinder
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                  <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<MapComponent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm">&copy; {new Date().getFullYear()} FarmFinder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
