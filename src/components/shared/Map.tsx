import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { useObservable } from '../../hooks/useObservable';
import { selectFilteredFarms, selectSearchQuery } from '../../state/store';
import { setSearchQuery } from '../../state/actions';
import { Farm } from '../../types/Farm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, RotateCw } from 'lucide-react';
import ReactCardFlip from 'react-card-flip';
import BenefitsModal from '@/components/BenefitsModal';

// Import marker icons
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}


L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Custom icons for markers
const defaultIcon = new L.Icon.Default();
// const preferredIcon = new Icon({
//   iconUrl: '/path-to-preferred-icon.png',
//   iconRetinaUrl: '/path-to-preferred-icon@2x.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

export default function MapComponent() {
  const filteredFarms = useObservable(selectFilteredFarms()) || [];
  const searchQuery = useObservable(selectSearchQuery()) || '';
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    43.2081,
    -71.5376,
  ]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFarmClick = (farm: Farm) => {
    setSelectedFarm(farm);
    setMapCenter([farm.latitude, farm.longitude]);
    setIsModalOpen(true);
    setIsCardFlipped(false);
    setSearchQuery('');
  };

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const sortedFarmsList =
    searchQuery.length >= 3
      ? [...filteredFarms].sort(
        (a, b) => (b.preferred ? 1 : 0) - (a.preferred ? 1 : 0)
      )
      : [];

  const FrontCard = () => (
    <div className="card-face p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{selectedFarm?.name}</h2>
        {selectedFarm?.preferred && (
          <Star className="h-5 w-5 text-yellow-400" />
        )}
      </div>
      <div className="mt-2">
        <p>
          <strong>Location:</strong> {selectedFarm?.city}, {selectedFarm?.state}
        </p>
        <p>
          <strong>Distance:</strong> {selectedFarm?.miles} miles
        </p>
        <p>
          <strong>Products:</strong> {selectedFarm?.products.join(', ')}
        </p>
        {selectedFarm?.preferred && (
          <p className="text-yellow-600 font-semibold mt-2">
            Preferred Farm
          </p>
        )}
      </div>
      {selectedFarm?.preferred && (
        <Button
          className="absolute bottom-4 right-4"
          variant="outline"
          size="sm"
          onClick={handleCardFlip}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          More Info
        </Button>
      )}
    </div>
  );

  const BackCard = () => (
    <div className="card-face p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">
          {selectedFarm?.name} - Additional Info
        </h2>
        {selectedFarm?.preferred && (
          <Star className="h-5 w-5 text-yellow-400" />
        )}
      </div>
      <div className="mt-2 space-y-2">
        <p>
          <strong>Description:</strong> {selectedFarm?.description}
        </p>
        <p>
          <strong>Founded:</strong> {selectedFarm?.foundedYear}
        </p>
        <p>
          <strong>Farm Size:</strong> {selectedFarm?.farmSize}
        </p>
        <p>
          <strong>Certifications:</strong>{' '}
          {selectedFarm?.certifications?.join(', ')}
        </p>
        <p>
          <strong>Contact Email:</strong> {selectedFarm?.contactEmail}
        </p>
        <p>
          <strong>Phone Number:</strong> {selectedFarm?.phoneNumber}
        </p>
      </div>
      <Button
        className="absolute bottom-4 right-4"
        variant="outline"
        size="sm"
        onClick={handleCardFlip}
      >
        <RotateCw className="h-4 w-4 mr-2" />
        Back
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow relative">
        {/* Map Container */}
        <div className="absolute inset-0 z-0">
          <MapContainer
            center={mapCenter}
            zoom={8}
            className="h-full w-full"
            zoomControl={false}
          >
            <ChangeView center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredFarms.map((farm, index) => (
              <Marker
                key={index}
                position={[farm.latitude, farm.longitude]}
                icon={farm.preferred ? defaultIcon : defaultIcon}
                eventHandlers={{
                  click: () => handleFarmClick(farm),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* Search input and results */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search for products..."
            className="shadow-md rounded-full p-2 pl-4 w-full text-lg h-12 bg-white border-2 border-[#333333]"
          />
          {sortedFarmsList.length > 0 && (
            <ul className="bg-white border rounded-2xl mt-1 shadow-lg max-h-60 overflow-y-auto">
              {sortedFarmsList.map((farm, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => handleFarmClick(farm)}
                >
                  <div>
                    <div className="font-semibold">
                      {farm.name}{' '}
                      <span className="text-gray-500 font-normal">
                        {farm.miles}mi
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {farm.city}, {farm.state}
                    </div>
                    <div className="text-xs text-gray-400">
                      {farm.products.join(', ')}
                    </div>
                  </div>
                  {farm.preferred && (
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          )}
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

      {/* Farm Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <ReactCardFlip isFlipped={isCardFlipped} flipDirection="horizontal">
            <FrontCard />
            <BackCard />
          </ReactCardFlip>
          <Button
            className="absolute top-2 right-2 z-20"
            variant="ghost"
            size="icon"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Benefits Modal */}
      <BenefitsModal
        isOpen={isBenefitsModalOpen}
        onClose={() => setIsBenefitsModalOpen(false)}
      />
    </div>
  );
}