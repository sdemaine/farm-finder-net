import React from 'react';
import { Leaf, Truck, Users, Apple } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-700">About FarmFinder</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Mission</h2>
        <p className="text-lg mb-4">
          At FarmFinder, we're passionate about bridging the gap between local farmers and consumers. 
          We believe in the power of community-supported agriculture and the importance of knowing where your food comes from.
        </p>
        <p className="text-lg">
          Our platform is designed to make it easy for you to discover, connect with, and support local farms in your area. 
          By doing so, we aim to promote sustainable farming practices, support local economies, and provide you with the freshest, most nutritious food possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
            <Leaf className="mr-2" /> Why Local Matters
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Fresher, more nutritious produce</li>
            <li>Reduced carbon footprint from transportation</li>
            <li>Support for local economies and farmers</li>
            <li>Preservation of local varieties and biodiversity</li>
            <li>Stronger connection to seasonal eating</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
            <Truck className="mr-2" /> The Problem with Long-Distance Food
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Loss of nutrients during long transportation</li>
            <li>Increased use of preservatives and packaging</li>
            <li>Higher carbon emissions from long-distance shipping</li>
            <li>Disconnection from food sources and farming practices</li>
            <li>Economic drain on local communities</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">How FarmFinder Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Users size={48} className="mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-2">Connect</h3>
            <p>Find and connect with local farmers in your area</p>
          </div>
          <div className="text-center">
            <Apple size={48} className="mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-2">Discover</h3>
            <p>Explore a wide variety of fresh, locally grown produce</p>
          </div>
          <div className="text-center">
            <Truck size={48} className="mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-2">Support</h3>
            <p>Support local agriculture and enjoy farm-fresh food</p>
          </div>
        </div>
      </div>

      <div className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Join the Local Food Movement</h2>
        <p className="text-lg mb-4">
          By choosing locally grown foods, you're not just making a healthier choice for yourself and your family. 
          You're also supporting a more sustainable and resilient food system, preserving local farming traditions, 
          and contributing to the vitality of your local community.
        </p>
        <p className="text-lg font-semibold">
          Let's work together to create a future where fresh, local food is accessible to everyone. 
          Join us in supporting local farmers and enjoying the bounty of your region!
        </p>
      </div>
    </div>
  );
}