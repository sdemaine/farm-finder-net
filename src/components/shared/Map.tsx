"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useObservable } from '../../hooks/useObservable';
import { selectFilteredFarms, selectSearchQuery } from '../../state/store';
import { setSearchQuery } from '../../state/actions';
import { Farm } from '../../types/Farm';
import { Button } from '@/components/ui/button';
import BenefitsModal from '@/components/shared/BenefitsModal';
import SearchComponent from '@/components/shared/SearchComponent';
import { Navigation } from 'lucide-react';
import { toast } from 'react-toastify'; // Assuming you have react-toastify or similar

// Dynamic import for react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Configure Leaflet marker icons
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// Utility function to detect Android devices
const isAndroid = (): boolean => {
  return typeof window !== 'undefined' && /Android/i.test(window.navigator.userAgent);
};

// Utility function to detect mobile devices
const isMobile = (): boolean => {
  return typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent);
};

// Function to copy to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Coordinates copied to clipboard!");
  }).catch(err => {
    toast.error("Failed to copy coordinates.");
  });
};

export default function MapComponent() {
  const observedFilteredFarms = useObservable(selectFilteredFarms()) || [];
  const searchQuery = useObservable(selectSearchQuery()) || '';
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.2081, -71.5376]);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [displayFarms, setDisplayFarms] = useState<Farm[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const searchBoxRef = useRef<HTMLDivElement>(null); // Use ref for the search component

  const searchSuggestions = [
    "tomatoes", "potatoes", "carrots", "onions", "garlic", "cabbage", "lettuce",
    "cucumbers", "zucchini", "pumpkins", "corn", "peas", "beans", "radishes", "spinach",
    "asparagus", "broccoli", "cauliflower", "celery", "chives", "cilantro", "collards",
    "dill", "fennel", "mint", "parsley", "thyme", "basil"
  ];

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const newFilteredSuggestions = searchSuggestions.filter((term) =>
        term.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(newFilteredSuggestions);

      const farmsFilteredByProducts = observedFilteredFarms.filter((farm) =>
        farm.products.some((product) =>
          product.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDisplayFarms(farmsFilteredByProducts);
    } else {
      setFilteredSuggestions([]);
      setDisplayFarms([]);
    }
  }, [searchQuery, observedFilteredFarms]);

  // Combine suggestions and farms into a unified list for SearchComponent, default to empty array if undefined
  const unifiedList = [...filteredSuggestions, ...displayFarms] || [];
  console.log("Unified list of suggestions and farms:", unifiedList);

  // Custom styling for tooltips
  const tooltipStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0', // Light gray background
    color: '#000',
    padding: '15px',
    borderRadius: '12px', // Rounded corners
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', // Softer shadow
    maxWidth: '250px', // Set a max width for the tooltip
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const farmLinkStyle: React.CSSProperties = {
    color: '#3498db', // Blue link
    textDecoration: 'underline',
    fontSize: '14px',
  };

  const handleMarkerClick = (index: number) => {
    setActiveTooltip(index === activeTooltip ? null : index); // Toggle tooltip visibility on click
  };

  // Geo link for Android native navigation
  const getGeoLink = (farm: Farm) => {
    return `geo:${farm.latitude},${farm.longitude}`;
  };

  // Google Maps navigation link fallback
  const getGoogleMapsUrl = (farm: Farm) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${farm.latitude},${farm.longitude}`;
  };

  // Handle navigation button press
  const handleNavigationClick = (farm: Farm, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from closing the popup
    const googleMapsUrl = getGoogleMapsUrl(farm);
    const geoLink = getGeoLink(farm);

    if (isAndroid()) {
      window.location.href = geoLink;
    } else {
      window.location.href = googleMapsUrl;
    }

    // Copy the coordinates or address to clipboard
    const coordinatesText = `${farm.latitude},${farm.longitude}`;
    copyToClipboard(coordinatesText);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow relative">
        {/* Map Container */}
        <div className="absolute inset-0 z-0">
          <MapContainer center={mapCenter} zoom={8} className="h-full w-full" zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {observedFilteredFarms.map((farm, index) => (
              <Marker 
                key={index} 
                position={[farm.latitude, farm.longitude]} 
                eventHandlers={{
                  click: () => handleMarkerClick(index)
                }}
              >
                <Popup interactive keepInView>
                  <div style={tooltipStyle}>
                    <div className="font-semibold text-lg">
                      {farm.name} ({farm.miles} mi)
                    </div>
                    <div className="text-sm text-gray-500">
                      {farm.city}, {farm.state}
                    </div>
                    <div className="text-xs text-gray-400">
                      {farm.products.join(', ')}
                    </div>
                    <div className="mt-2">
                      <a href={`https://${farm.website}`} target="_blank" rel="noopener noreferrer" style={farmLinkStyle}>
                        Visit Site
                      </a>
                    </div>
                    {isMobile() && (
                      <div className="mt-3 flex justify-center">
                        <button
                          onClick={(event) => handleNavigationClick(farm, event)}
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
                        >
                          <Navigation className="mr-2" size={16} />
                          Navigate
                        </button>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Search Component */}
        <div ref={searchBoxRef} className="absolute top-4 left-4 right-4 z-10">
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={unifiedList}
            handleFarmClick={() => {}}
          />
        </div>

        {/* Call to Action Button */}
        <div className="absolute bottom-24 right-4 z-20">
          <Button
            onClick={() => setIsBenefitsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Become a Member
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f9f7f4] border-t border-gray-300 p-2 text-center text-sm z-30 relative">
        <p>Quick Guide</p>
      </footer>

      {/* Benefits Modal */}
      <BenefitsModal isOpen={isBenefitsModalOpen} onClose={() => setIsBenefitsModalOpen(false)} />
    </div>
  );
}
