import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/Map';
import About from './components/About';
import { Contact } from 'lucide-react';
import Market from './components/Market';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-100 h-full">
          <Routes>
            <Route path="/" element={<MapComponent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/market" element={<Market />} />

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
