"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet'; // Popup added here
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useObservable } from '../../hooks/useObservable';
import { selectFilteredFarms, selectSearchQuery } from '../../state/store';
import { setSearchQuery } from '../../state/actions';
import { Farm } from '../../types/Farm';
import { Button } from '@/components/ui/button';
import BenefitsModal from '@/components/shared/BenefitsModal';
import SearchComponent from '@/components/shared/SearchComponent';
import { Navigation } from 'lucide-react'; // Icon from lucide-react
import { toast } from 'react-toastify'; // Assuming you have react-toastify or similar

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
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
    toast.success("Coordinates copied to clipboard!"); // Show toast notification after copy
  }).catch(err => {
    toast.error("Failed to copy coordinates."); // Error handling
  });
};

export default function MapComponent() {
  const observedFilteredFarms = useObservable(selectFilteredFarms()) || [];
  const searchQuery = useObservable(selectSearchQuery()) || '';
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.2081, -71.5376]);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null); // State to track the active marker's tooltip
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
    event.stopPropagation(); // Prevent the click from closing the tooltip
    const googleMapsUrl = getGoogleMapsUrl(farm);
    const geoLink = getGeoLink(farm);

    if (isAndroid()) {
      window.location.href = geoLink; // Use geo link for Android
    } else {
      window.location.href = googleMapsUrl; // Fallback to Google Maps URL for iOS or non-supported devices
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
                  click: () => handleMarkerClick(index) // For mobile and desktop click
                }}
              >
                <Popup // Popup instead of Tooltip for interaction
                  interactive 
                  keepInView
                >
                  <div style={tooltipStyle}>
                    {/* Farm Name */}
                    <div className="font-semibold text-lg">
                      {farm.name} ({farm.miles} mi)
                    </div>

                    {/* Location */}
                    <div className="text-sm text-gray-500">
                      {farm.city}, {farm.state}
                    </div>

                    {/* Products */}
                    <div className="text-xs text-gray-400">
                      {farm.products.join(', ')}
                    </div>

                    {/* Link to farm website */}
                    <div className="mt-2">
                      <a
                        href={`https://${farm.website}`} // assuming farm.website is a valid URL
                        target="_blank"
                        rel="noopener noreferrer"
                        style={farmLinkStyle}
                      >
                        Visit Site
                      </a>
                    </div>

                    {/* Show navigation button only on mobile */}
                    {isMobile() && (
                      <div className="mt-3 flex justify-center">
                        <button
                          onClick={(event) => handleNavigationClick(farm, event)} // Direct navigation using geo link or Google Maps URL
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
            suggestions={unifiedList} // Use unified list of suggestions and farms, default to empty array
            handleFarmClick={() => {}} // Handle farm clicks if necessary
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
