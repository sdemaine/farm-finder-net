"use client";

import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { useRouter } from "next/navigation";
import { MultiSelect } from "src/components/ui/multi-select"; // Assuming you have a MultiSelect component

// Sample GlobalProductList (can be fetched from an API or stored globally)
const GlobalProductList = [
    { id: 1, name: "Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 3, name: "Dairy" },
    { id: 4, name: "Meat" },
    { id: 5, name: "Grains" },
    { id: 6, name: "Honey" },
    { id: 7, name: "Flowers" },
];

const transformedProductList = GlobalProductList.map((product) => ({
    label: product.name,          // Using 'name' as label
    value: product.id.toString(), // Using 'id' as value and converting to string
}));

export default function FarmProducts() {
    const router = useRouter();
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleProductChange = (newSelectedProducts: string[]) => {
        setSelectedProducts(newSelectedProducts);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated products:", selectedProducts);
        router.push('/farm-admin/dashboard'); // Redirect after updating
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-12 bg-white shadow-lg rounded-xl mt-10 mb-10">
            <h1 className="text-3xl font-extrabold text-center text-green-800 mb-6">
                Update Farm Products
            </h1>

            <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Product Selection */}
                <div className="flex flex-col">
                    <Label htmlFor="products" className="text-lg font-semibold text-gray-700">
                        Select Products
                    </Label>
                    <MultiSelect
                        id="products"
                        name="products"
                        options={transformedProductList}
                        defaultValue={selectedProducts}
                        onValueChange={handleProductChange}
                        placeholder="Select the products your farm offers"
                        className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 transition duration-300"
                    >
                        Update Products
                    </Button>
                </div>
            </form>
        </div>
    );
}
