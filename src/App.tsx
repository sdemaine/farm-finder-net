import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/Map';
import About from './components/About';
import Contact from './components/Contact';
import { ModalMenu } from '@/components/Menu/ModalMenu';
import { ConfigMenuModal } from '@/components/Menu/ConfigMenuModal';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#beb5a8]">
        <header className="bg-[#f9f7f4] border-b border-gray-300 p-2 flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <ModalMenu />
            <h1 className="text-xl font-bold ml-2 flex-grow text-center font-rockwell">
              FarmFinder<span className="text-sm">.net</span>
            </h1>
          </div>
          <ConfigMenuModal />
        </header>
        <main className="flex-grow bg-[#beb5a8] h-full">
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
}