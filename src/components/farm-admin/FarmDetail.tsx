import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

export default function FarmDetail() {
  const [farmData, setFarmData] = useState({
    name: "",
    description: "",
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here, like an API call
    console.log("Farm data updated:", farmData);
    navigate('/farm-admin/dashboard'); // Redirect to dashboard after update
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update Farm Information</h1>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Farm Name */}
        <div className="flex flex-col">
          <Label htmlFor="name" className="font-semibold text-lg">
            Farm Name
          </Label>
          <Input
            id="name"
            name="name"
            value={farmData.name}
            onChange={handleInputChange}
            placeholder="Enter your farm name"
            required
            className="mt-2"
          />
        </div>

        {/* Farm Description */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="font-semibold text-lg">
            Farm Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={farmData.description}
            onChange={handleInputChange}
            placeholder="Enter a description for your farm"
            required
            rows={5}
            className="mt-2"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <Label htmlFor="location" className="font-semibold text-lg">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={farmData.location}
            onChange={handleInputChange}
            placeholder="Enter farm location"
            required
            className="mt-2"
          />
        </div>

        {/* Contact Name */}
        <div className="flex flex-col">
          <Label htmlFor="contactName" className="font-semibold text-lg">
            Contact Name
          </Label>
          <Input
            id="contactName"
            name="contactName"
            value={farmData.contactName}
            onChange={handleInputChange}
            placeholder="Enter the contact person's name"
            required
            className="mt-2"
          />
        </div>

        {/* Contact Email */}
        <div className="flex flex-col">
          <Label htmlFor="contactEmail" className="font-semibold text-lg">
            Contact Email
          </Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            value={farmData.contactEmail}
            onChange={handleInputChange}
            placeholder="Enter contact email"
            required
            type="email"
            className="mt-2"
          />
        </div>

        {/* Contact Phone */}
        <div className="flex flex-col">
          <Label htmlFor="contactPhone" className="font-semibold text-lg">
            Contact Phone
          </Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            value={farmData.contactPhone}
            onChange={handleInputChange}
            placeholder="Enter contact phone number"
            required
            type="tel"
            className="mt-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" variant="default" className="w-full sm:w-auto">
            Update Farm Information
          </Button>
        </div>
      </form>
    </div>
  );
}