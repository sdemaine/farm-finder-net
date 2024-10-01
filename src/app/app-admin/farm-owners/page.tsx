"use client"

import { useState, useEffect } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";


// Sample Data (Replace with actual API call)
const initialFarmOwners = [
  {
    id: 1,
    name: "John Doe",
    birthdate: "1985-04-23",
    personality: "Friendly and outgoing",
    comments: "Loves to experiment with organic farming.",
    contact: "johndoe@example.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    birthdate: "1990-09-12",
    personality: "Detail-oriented and hardworking",
    comments: "Has a reputation for growing the best vegetables.",
    contact: "janesmith@example.com"
  },
  // Add more farm owners as needed
];

export default function FarmOwners() {
  const [farmOwners] = useState(initialFarmOwners);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // If you're fetching data from an API, replace initialFarmOwners with an API call
    // fetchFarmOwners().then(data => setFarmOwners(data));
  }, []);

  const handleSendMessage = (owner: any) => {
    if (!message.trim()) return;
    
    // Logic for sending the message via in-app messaging or email
    console.log(`Message sent to ${owner.name}:`, message);
    
    setMessage(""); // Clear message after sending
  };

  const handleOwnerClick = (owner: any) => {
    setSelectedOwner(owner);
  };

  const filteredOwners = farmOwners.filter((owner) =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Farm Owners</h1>

      {/* Search Farm Owners */}
      <div className="mb-4">
        <Label htmlFor="search" className="font-semibold">
          <span className='text-lg font-bold'>Search Farm Owners</span>
          Search Farm Owners
        </Label>
        <Input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter owner's name"
          className="mt-2"
        />
      </div>

      {/* List of Farm Owners */}
      <div className="flex flex-col space-y-4 mb-6">
        {filteredOwners.map((owner) => (
          <div
            key={owner.id}
            className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleOwnerClick(owner)}
          >
            <h2 className="text-xl font-semibold">{owner.name}</h2>
            <p>Birthdate: {owner.birthdate}</p>
            <p>Personality: {owner.personality}</p>
            <p>Comments: {owner.comments}</p>
            <p>Contact: {owner.contact}</p>
          </div>
        ))}
      </div>

      {/* Communication with Selected Owner */}
      {selectedOwner && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Communicate with {selectedOwner.name}</h2>
          
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write a message to ${selectedOwner.name}`}
            rows={5}
            className="mb-4"
          />

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setSelectedOwner(null)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => handleSendMessage(selectedOwner)}
            >
              Send Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
