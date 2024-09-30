import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ModalMenu } from '@/components/shared/menu/ModalMenu';
import { ConfigMenuModal } from '@/components/shared/menu/ConfigMenuModal';

// Lazy load components
const MapComponent = lazy(() => import('./components/shared/Map'));
const About = lazy(() => import('./components/shared/About'));
const Contact = lazy(() => import('./components/shared/Contact'));
const Dashboard = lazy(() => import('./components/farm-admin/Dashboard'));
const GlobalProductList = lazy(() => import('./components/app-admin/GlobalProductList'));
const FarmProducts = lazy(() => import('./components/farm-admin/FarmProducts'));
const FarmDetail = lazy(() => import('./components/farm-admin/FarmDetail'));
const FarmGalleryUpload = lazy(() => import('./components/farm-admin/FarmGalleryUpload'));
const FarmOwners = lazy(() => import('./components/app-admin/FarmOwners'));

export default function App() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FarmFinder.net",
    "url": "https://farmfinder.net",
    "description": "Find and explore local farms in your area"
  };

  return (
    <Router>
      <Helmet>
        <title>FarmFinder.net - Find Local Farms Near You</title>
        <meta name="description" content="Discover and connect with local farms in your area. Find fresh produce, support local agriculture, and explore farm-to-table options." />
        <meta name="keywords" content="local farms, fresh produce, agriculture, farm-to-table, farmers market" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
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
          <Suspense fallback={<div>Loading...</div>}>
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
              <Route path="/farm-admin/farm-gallery-upload" element={<FarmGalleryUpload />} />
            </Routes>
          </Suspense>
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