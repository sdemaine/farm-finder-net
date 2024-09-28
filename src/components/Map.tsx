import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';

const position: [number, number] = [43.2081, -71.5376]; // Approximate center of New Hampshire

interface Farm {
  name: string;
  miles: number;
  city: string;
  state: string;
  products: string[];
}

const farmData: Farm[] = [
  { name: 'Green Meadows Farm', miles: 2, city: 'Exeter', state: 'NH', products: ['tomatoes', 'cucumbers', 'lettuce', 'handmade soap'] },
  { name: 'Hilltop Orchards', miles: 5, city: 'Concord', state: 'NH', products: ['apples', 'peaches', 'apple cider', 'apple pie'] },
  { name: 'Riverside Dairy', miles: 8, city: 'Dover', state: 'NH', products: ['milk', 'cheese', 'yogurt', 'butter'] },
  { name: 'Mountain View Farm', miles: 12, city: 'Intervale', state: 'NH', products: ['maple syrup', 'honey', 'beeswax candles'] },
  { name: 'Sunny Fields', miles: 15, city: 'Hampton', state: 'NH', products: ['strawberries', 'blueberries', 'raspberries', 'jam'] },
  { name: 'Pine Tree Poultry', miles: 18, city: 'Keene', state: 'NH', products: ['eggs', 'chicken', 'turkey', 'duck'] },
  { name: 'Valley View Vegetables', miles: 22, city: 'Lebanon', state: 'NH', products: ['carrots', 'potatoes', 'onions', 'garlic'] },
  { name: 'Lakeside Lavender', miles: 25, city: 'Wolfeboro', state: 'NH', products: ['lavender', 'lavender oil', 'dried lavender', 'lavender soap'] },
  { name: 'Forest Edge Mushrooms', miles: 28, city: 'Littleton', state: 'NH', products: ['shiitake mushrooms', 'oyster mushrooms', 'lions mane mushrooms'] },
  { name: 'Granite State Grains', miles: 32, city: 'Lancaster', state: 'NH', products: ['wheat flour', 'cornmeal', 'oats', 'rye flour'] },
  { name: 'Seacoast Seafood', miles: 35, city: 'Portsmouth', state: 'NH', products: ['fresh fish', 'lobster', 'clams', 'mussels'] },
  { name: 'White Mountain Winery', miles: 38, city: 'North Conway', state: 'NH', products: ['red wine', 'white wine', 'grape juice', 'wine vinegar'] },
  { name: 'Monadnock Berries', miles: 42, city: 'Troy', state: 'NH', products: ['strawberries', 'blackberries', 'gooseberries', 'currants'] },
  { name: 'Granite State Dairy', miles: 45, city: 'Walpole', state: 'NH', products: ['ice cream', 'butter', 'cream', 'buttermilk'] },
  { name: 'Sap House Meadery', miles: 48, city: 'Center Ossipee', state: 'NH', products: ['mead', 'honey', 'beeswax candles'] },
  { name: 'Beaver Brook Farm', miles: 52, city: 'Newport', state: 'NH', products: ['pork', 'bacon', 'ham', 'sausage'] },
  { name: 'Squam Lake Artisans', miles: 55, city: 'Holderness', state: 'NH', products: ['handmade pottery', 'wooden crafts', 'quilts', 'jewelry'] },
  { name: 'Merrimack Valley Apiaries', miles: 58, city: 'Billerica', state: 'NH', products: ['honey', 'beeswax', 'pollen', 'propolis'] },
  { name: 'Cheshire Garden', miles: 62, city: 'Winchester', state: 'NH', products: ['heirloom tomatoes', 'herbs', 'edible flowers', 'herbal teas'] },
  { name: 'Windswept Mountain View Farm', miles: 65, city: 'Wentworth', state: 'NH', products: ['wool', 'yarn', 'sheepskin', 'lamb'] }
];

export default function MapComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFarms = useMemo(() => {
    if (searchQuery.length < 3) return [];
    return farmData.filter((farm) =>
      farm.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase())) ||
      farm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-[#f9f7f4] border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-2">≡</div>
          <h1 className="text-xl font-bold">FarmFinder<span className="text-sm">.net</span></h1>
        </div>
        <div className="text-xl">⚙️</div>
      </header>

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
          {filteredFarms.length > 0 && (
            <ul className="bg-white border rounded-2xl mt-1 shadow-lg max-h-60 overflow-y-auto">
              {filteredFarms.map((farm, index) => (
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