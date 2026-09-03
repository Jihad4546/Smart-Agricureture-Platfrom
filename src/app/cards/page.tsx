"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShoppingBag, Heart, X } from "lucide-react";

// Product Data Type
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  onSale?: boolean;
  description?: string;
}

// Sample Products List
const products: Product[] = [
  {
    id: "1",
    name: "Basil leaves",
    price: 13.0,
    originalPrice: 24.99,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1608683273573-000c0a905a30?q=80&w=400&auto=format&fit=crop",
    onSale: true,
    description: "Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit.",
  },
  {
    id: "2",
    name: "Sprouted wheat",
    price: 19.0,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop",
    description: "Freshly sprouted organic wheat. Rich in proteins and natural minerals for healthy meals.",
  },
  {
    id: "3",
    name: "Assorted",
    price: 15.0,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop",
    description: "A fresh mix of assorted microgreens perfect for salads and garnish.",
  },
  {
    id: "4",
    name: "Sprouted wheat",
    price: 16.5,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop",
    description: "High quality sprouted wheat seeds grown under controlled organic environments.",
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Our products
        </h2>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all text-center"
          >
            {/* Sale Badge */}
            {product.onSale && (
              <span className="absolute top-3 left-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                SALE!
              </span>
            )}

            {/* Product Image & Hover Action Buttons */}
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md flex items-center justify-center bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Buttons */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
                  }}
                  title="Quick View"
                  className="p-2 bg-white text-gray-700 rounded-full hover:bg-amber-400 hover:text-white transition-colors shadow"
                >
                  <Search size={18} />
                </button>
                <button
                  title="Add to Cart"
                  className="p-2 bg-white text-gray-700 rounded-full hover:bg-amber-400 hover:text-white transition-colors shadow"
                >
                  <ShoppingBag size={18} />
                </button>
                <button
                  title="Add to Wishlist"
                  className="p-2 bg-white text-gray-700 rounded-full hover:bg-amber-400 hover:text-white transition-colors shadow"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <h3
              onClick={() => {
                setSelectedProduct(product);
                setQuantity(1);
              }}
              className="text-lg font-medium text-gray-800 hover:text-amber-500 cursor-pointer transition-colors"
            >
              {product.name}
            </h3>

            <div className="mt-2 flex items-center justify-center gap-2 text-sm">
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-amber-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500">/ {product.weight}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            {/* Sale Badge inside Modal */}
            {selectedProduct.onSale && (
              <span className="absolute top-4 left-4 z-10 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded">
                SALE!
              </span>
            )}

            {/* Modal Image */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-72 object-contain"
              />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-2 mb-4 text-lg">
                  {selectedProduct.originalPrice && (
                    <span className="text-gray-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-amber-600 font-bold">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    / {selectedProduct.weight}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 border border-gray-300 rounded px-3 py-2 text-center text-gray-700 focus:outline-none focus:border-amber-500"
                />
                <button className="flex-1 bg-amber-400 text-white font-bold py-2.5 px-4 rounded hover:bg-amber-500 transition-colors uppercase text-xs tracking-wider">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}