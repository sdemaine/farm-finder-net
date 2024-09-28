import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { useObservable } from '../hooks/useObservable';
import { selectAllFarms, selectFilteredFarms, selectSearchQuery } from '../state/store';
import { setSearchQuery, setAllFarms } from '../state/actions';
import { Farm } from '../types/Farm';

const position: [number, number] = [43.2081, -71.5376]; // Approximate center of New Hampshire

const farmData: Farm[] = [
  { name: 'Green Meadows Farm', miles: 2, city: 'Exeter', state: 'NH', products: ['tomatoes', 'cucumbers', 'lettuce', 'handmade soap'] },
  { name: 'Hilltop Orchards', miles: 5, city: 'Concord', state: 'NH', products: ['apples', 'peaches', 'apple cider', 'apple pie'] },
  // ... (rest of the farm data)
];

export default function MapComponent() {
  const filteredFarms = useObservable(selectFilteredFarms()) || [];
  const searchQuery = useObservable(selectSearchQuery()) || '';

  useEffect(() => {
    // Initialize farms with the data from farmData
    setAllFarms(farmData);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const farmsList = searchQuery.length >= 3 ? filteredFarms : [];

  return (
    <div className="flex flex-col h-screen">
 

      {/* Main content */}
      <div className="flex-grow relative overflow-hidden">
        {/* Map (positioned as background) */}
        <div className="absolute inset-0 z-0">
          <MapContainer
            center={position}
            zoom={8}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
        {/* Overlay UI (Input and other components) */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search for products..."
            className="shadow-md rounded-full p-2 pl-4 w-full text-lg h-12  bg-white border-2 border-[#333333]"
          />
          {farmsList.length > 0 && (
            <ul className="bg-white border rounded-2xl mt-1 shadow-lg max-h-60 overflow-y-auto">
              {farmsList.map((farm, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {farm.name} <span className="text-gray-500">{farm.miles}mi</span>
                  <br />
                  <span className="text-sm text-gray-500">{farm.city}, {farm.state}</span>
                  <br />
                  <span className="text-xs text-gray-400">{farm.products.join(', ')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f9f7f4] border-t border-gray-300 p-2 text-center text-sm">
        <p>Quick Guide</p>
      </footer>
    </div>
  );
}