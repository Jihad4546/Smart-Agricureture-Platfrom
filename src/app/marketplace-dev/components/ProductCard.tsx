import React, { useState } from "react";
import { Product } from "../types";
import { Star, User, MapPin, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export default function ProductCard({ product, onAddToCart, isInCart = false }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(product.image);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <article className="bg-white rounded-xl border border-[#E4DFD1] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#2F5943]/30 transition-all duration-200 group">
      {/* Image Container */}
      <div className="relative w-full h-44 sm:h-48 bg-[#EAF0E8] overflow-hidden">
        <img
          src={imgSrc}
          alt={product.nameBn}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80"
            )
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Pill */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1F3D2B] text-white shadow-xs">
          {product.category}
        </span>

        {/* Rating Badge */}
        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-white/90 backdrop-blur-xs text-[#16241C] shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          {product.rating.toFixed(1)}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Product Names */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-[#16241C] text-base md:text-lg leading-snug group-hover:text-[#1F3D2B] transition-colors">
                {product.nameBn}
              </h3>
              <p className="text-xs text-[#6B7A6E] font-medium">
                {product.nameEn}
              </p>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-[#E4DFD1]/60">
            <div>
              <span className="text-xl md:text-2xl font-extrabold text-[#1F3D2B]">
                ৳{product.price}
              </span>
              <span className="text-xs text-[#6B7A6E] font-medium ml-1">
                / {product.unit}
              </span>
            </div>

            <span className="text-xs font-medium text-[#2F5943] bg-[#EAF0E8] px-2 py-1 rounded">
              উপলব্ধ: {product.quantity} {product.unit}
            </span>
          </div>

          {/* Metadata: Farmer & Location */}
          <div className="mt-3 space-y-1 text-xs text-[#6B7A6E]">
            <div className="flex items-center gap-1.5 font-medium text-[#16241C]">
              <User className="w-3.5 h-3.5 text-[#2F5943]" />
              <span>কৃষক: {product.farmer}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2F5943]" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            addedAnimation || isInCart
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-[#1F3D2B] text-white hover:bg-[#2F5943] active:scale-[0.99]"
          }`}
          aria-label={`${product.nameBn} কার্টে যোগ করুন`}
        >
          {addedAnimation || isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>কার্টে যোগ হয়েছে</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>কার্টে যোগ করুন</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
