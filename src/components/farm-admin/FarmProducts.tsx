import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from "@/components/ui/multi-select"; // Assuming you have a MultiSelect component

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
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleProductChange = (newSelectedProducts: string[]) => {
        setSelectedProducts(newSelectedProducts);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here (like an API call)
        console.log("Updated products:", selectedProducts);
        navigate('/farm-admin/dashboard'); // Redirect after updating
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Update Farm Products</h1>

            <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Product Selection */}
                <div className="flex flex-col">
                    <Label htmlFor="products" className="font-semibold text-lg">
                        Select Products
                    </Label>
                    <MultiSelect
                        id="products"
                        name="products"
                        options={transformedProductList}
                        defaultValue={selectedProducts}
                        onValueChange={handleProductChange}
                        placeholder="Select the products your farm offers"
                        className="mt-2"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="submit" variant="default" className="w-full sm:w-auto">
                        Update Products
                    </Button>
                </div>
            </form>
        </div>
    );
}


