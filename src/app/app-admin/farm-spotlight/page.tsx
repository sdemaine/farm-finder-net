"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Farm {
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  website: string;
  featuredProducts: string[];
  testimonial: string;
}

const farms: Farm[] = [
  {
    name: "Sunny Acres Farm",
    description:
      "Sunny Acres is a family-owned organic farm, dedicated to growing fresh, sustainable produce while maintaining the highest quality standards. Our free-range poultry and organic vegetables are customer favorites.",
    imageUrl: "/images/sunny-acres.jpg",
    location: "Springfield, USA",
    website: "https://sunnyacres.com",
    featuredProducts: ["Organic Vegetables", "Free-Range Poultry", "Fresh Herbs"],
    testimonial:
      "“Sunny Acres Farm has transformed our family's diet. Their produce is the freshest we've ever had, and the care they put into everything they do is evident.” – Emily R.",
  },
  {
    name: "Green Valley Dairy",
    description:
      "Green Valley Dairy produces award-winning, artisan cheese made from organic milk sourced from our grass-fed cows. Our commitment to sustainability drives every aspect of our dairy operation.",
    imageUrl: "/images/green-valley.jpg",
    location: "Valleyville, USA",
    website: "https://greenvalleydairy.com",
    featuredProducts: ["Artisan Cheese", "Organic Milk", "Butter"],
    testimonial:
      "“The cheeses from Green Valley Dairy are unmatched. Their rich, creamy flavor is perfect for any occasion. It's my go-to for holiday gifts!” – Sarah M.",
  },
  {
    name: "Harvest Moon Orchards",
    description:
      "Harvest Moon Orchards is known for its delicious apple varieties and fresh cider. Our family-run orchard offers visitors the best fruit-picking experience and a chance to enjoy nature.",
    imageUrl: "/images/harvest-moon.jpg",
    location: "Appleton, USA",
    website: "https://harvestmoonorchards.com",
    featuredProducts: ["Apples", "Peaches", "Fresh Cider"],
    testimonial:
      "“We make the trip to Harvest Moon every year for apple picking. The fruit is always perfect, and their fresh cider is to die for.” – David L.",
  },
];

export default function FarmSpotlight() {
  const [farmOfTheWeek, setFarmOfTheWeek] = useState<Farm | null>(null);

  useEffect(() => {
    const randomFarm = farms[Math.floor(Math.random() * farms.length)];
    setFarmOfTheWeek(randomFarm);
  }, []);

  if (!farmOfTheWeek) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-center text-green-700 mb-4"
      >
        Farm of the Week
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl"
      >
        <Image
          src={farmOfTheWeek.imageUrl}
          alt={`${farmOfTheWeek.name} Image`}
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
        <div className="p-8">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-semibold text-green-800 mb-4"
          >
            {farmOfTheWeek.name}
          </motion.h2>
          <p className="text-lg text-gray-700 mb-6">{farmOfTheWeek.description}</p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold text-green-600 mb-2">Featured Products</h3>
            <ul className="list-disc ml-6 text-gray-800">
              {farmOfTheWeek.featuredProducts.map((product, index) => (
                <li key={index} className="text-lg">{product}</li>
              ))}
            </ul>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="italic border-l-4 border-green-500 pl-4 text-gray-600 mb-6"
          >
            {farmOfTheWeek.testimonial}
          </motion.blockquote>

          <motion.a
            href={farmOfTheWeek.website}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 transition duration-300"
          >
            Visit {farmOfTheWeek.name} Website
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
