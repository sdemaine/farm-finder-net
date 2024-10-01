"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useObservable } from '../../hooks/useObservable';
import { selectFilteredFarms, selectSearchQuery, updateState } from '../../state/store'; // RxJS store functions
import { Farm } from '../../types/Farm';
import { Button } from '../../components/ui/button';
import { Navigation } from 'lucide-react';
import { toast } from 'react-toastify';
import BenefitsModal from '../BenefitsModal';
import SearchComponent from './SearchComponent';

// Leaflet marker icon configuration
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

const searchSuggestions = [
  "tomatoes", "potatoes", "carrots", "onions", "garlic", "cabbage", "lettuce",
  "cucumbers", "zucchini", "pumpkins", "corn", "peas", "beans", "radishes", "spinach",
  "asparagus", "broccoli", "cauliflower", "celery", "chives", "cilantro", "collards",
  "dill", "fennel", "mint", "parsley", "thyme", "basil"
];

export default function MapComponent() {
  // Observing the filtered farms and search query using RxJS observables
  const rawFilteredFarms = useObservable(selectFilteredFarms()) || [];
  const searchQuery = useObservable(selectSearchQuery()) || '';

  const observedFilteredFarms = useMemo(() => rawFilteredFarms || [], [rawFilteredFarms]);

  const [mapCenter, setMapCenter] = useState<[number, number]>([43.2081, -71.5376]);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [displayFarms, setDisplayFarms] = useState<Farm[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Filtering farms and suggestions based on the search query
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

  const unifiedList = [...filteredSuggestions, ...displayFarms];

  // Handling marker click events
  const handleMarkerClick = (index: number) => {
    setActiveTooltip(index === activeTooltip ? null : index);
  };

  const isAndroid = (): boolean => {
    return typeof window !== 'undefined' && /Android/i.test(window.navigator.userAgent);
  };

  const isMobile = (): boolean => {
    return typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent);
  };

  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  };

  const getNavigationUrl = (farm: Farm) => {
    if (isIOS()) {
      // Apple Maps URL for iOS devices
      return `maps://?daddr=${farm.latitude},${farm.longitude}`;
    } else {
      // Google Maps URL for Android devices
      return `google.navigation:q=${farm.latitude},${farm.longitude}`;
    }
  };

  const handleNavigationClick = (farm: Farm, event: React.MouseEvent) => {
    event.stopPropagation();
   
    const navigationUrl = getNavigationUrl(farm);
    window.location.href = navigationUrl;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow relative">
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
                  <div>
                    <div className="font-semibold text-lg">{farm.name} ({farm.miles} mi)</div>
                    <div className="text-sm text-gray-500">{farm.city}, {farm.state}</div>
                    <div className="text-xs text-gray-400">{farm.products.join(', ')}</div>
                    <div className="mt-2">
                      <a href={`https://${farm.website}`} target="_blank" rel="noopener noreferrer">
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

        <div ref={searchBoxRef} className="absolute top-4 left-4 right-4 z-10">
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={(query) => updateState({ searchQuery: query })} // Using RxJS updateState to set search query
            suggestions={unifiedList}
            handleFarmClick={() => { }}
          />
        </div>

        <div className="absolute bottom-24 right-4 z-20">
          <Button
            onClick={() => setIsBenefitsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Become a Member
          </Button>
        </div>
      </div>

      <footer className="bg-[#f9f7f4] border-t border-gray-300 p-2 text-center text-sm z-30 relative">
        <p>Quick Guide</p>
      </footer>

      <BenefitsModal isOpen={isBenefitsModalOpen} onClose={() => setIsBenefitsModalOpen(false)} />
    </div>
  );
}
