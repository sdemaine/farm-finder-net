import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/shared/Map';
import About from './components/shared/About';
import Contact from './components/shared/Contact';
import Dashboard from './app/farm-admin/dashboard/page';
import FarmOwners from './app/app-admin/farm-owners/page';
import GlobalProductList from './app/app-admin/global-product-list/page';
import FarmDetail from './app/farm-admin/farm-detail/page';
import FarmProducts from './app/farm-admin/farm-products/page';
import { ConfigMenuModal } from './components/shared/menu/ConfigMenuModal';
import { ModalMenu } from './components/shared/menu/ModalMenu';
import { store } from './state/store';

export default function App() {
  return (
    <Provider store={store}>
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
              {/* shared */}
              <Route path="/" element={<MapComponent />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* app-admin */}
              <Route path="/app-admin/products" element={<GlobalProductList />} />
              <Route path="/app-admin/farm-owners" element={<FarmOwners />} />

              {/* farm-admin */}
              <Route path="/farm-admin/dashboard" element={<Dashboard />} />
              <Route path="/farm-admin/products" element={<FarmProducts />} />
              <Route path="/farm-admin/farm-detail" element={<FarmDetail />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm">&copy; {new Date().getFullYear()} FarmFinder. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}
