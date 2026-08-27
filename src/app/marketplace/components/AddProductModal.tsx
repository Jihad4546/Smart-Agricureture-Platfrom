import React, { useState } from "react";
import { Product } from "../types";
import { X, PlusCircle, AlertCircle } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, "id" | "farmer" | "rating">) => void;
}

export default function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    nameBn: "",
    nameEn: "",
    category: "সবজি",
    price: "",
    unit: "কেজি",
    quantity: "",
    location: "গাজীপুর",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nameBn.trim()) newErrors.nameBn = "পণ্যের নাম (বাংলা) আবশ্যক";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "সঠিক দাম প্রদান করুন";
    if (!formData.quantity || Number(formData.quantity) <= 0) newErrors.quantity = "সঠিক পরিমাণ প্রদান করুন";
    if (!formData.location.trim()) newErrors.location = "অবস্থান প্রদান করুন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddProduct({
      nameBn: formData.nameBn.trim(),
      nameEn: formData.nameEn.trim() || formData.nameBn.trim(),
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      quantity: Number(formData.quantity),
      location: formData.location.trim(),
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
      description: formData.description.trim(),
    });

    // Reset form
    setFormData({
      nameBn: "",
      nameEn: "",
      category: "সবজি",
      price: "",
      unit: "কেজি",
      quantity: "",
      location: "গাজীপুর",
      image: "",
      description: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-product-title"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E4DFD1] p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4DFD1]">
          <h2 id="add-product-title" className="text-xl md:text-2xl font-bold text-[#1F3D2B] flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-[#2F5943]" />
            নতুন পণ্য যোগ করুন
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B7A6E] hover:text-[#16241C] hover:bg-[#FAF8F3] transition"
            aria-label="Modal বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Row 1: Bangla & English Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nameBn" className="block font-medium text-[#16241C] mb-1">
                পণ্যের নাম (বাংলা) *
              </label>
              <input
                id="nameBn"
                type="text"
                value={formData.nameBn}
                onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                placeholder="যেমন: তাজা দেশি টমেটো"
                className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] ${
                  errors.nameBn ? "border-rose-500" : "border-[#E4DFD1]"
                }`}
              />
              {errors.nameBn && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.nameBn}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nameEn" className="block font-medium text-[#16241C] mb-1">
                Product Name (English)
              </label>
              <input
                id="nameEn"
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Fresh Red Tomato"
                className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
              />
            </div>
          </div>

          {/* Row 2: Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block font-medium text-[#16241C] mb-1">
                ক্যাটাগরি *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] cursor-pointer"
              >
                <option value="ধান">ধান</option>
                <option value="সবজি">সবজি</option>
                <option value="ফল">ফল</option>
                <option value="শস্য">শস্য</option>
                <option value="মসলা">মসলা</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block font-medium text-[#16241C] mb-1">
                অবস্থান / জেলা *
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="যেমন: গাজীপুর"
                className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] ${
                  errors.location ? "border-rose-500" : "border-[#E4DFD1]"
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Price, Unit, Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="price" className="block font-medium text-[#16241C] mb-1">
                দাম (৳) *
              </label>
              <input
                id="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="৫০"
                className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] ${
                  errors.price ? "border-rose-500" : "border-[#E4DFD1]"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.price}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="unit" className="block font-medium text-[#16241C] mb-1">
                একক *
              </label>
              <select
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
              >
                <option value="কেজি">কেজি</option>
                <option value="মন">মন</option>
                <option value="ডজন">ডজন</option>
                <option value="প্যাক">প্যাক</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block font-medium text-[#16241C] mb-1">
                পরিমাণ *
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="১০০"
                className={`w-full px-3 py-2 bg-[#FAF8F3] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] ${
                  errors.quantity ? "border-rose-500" : "border-[#E4DFD1]"
                }`}
              />
              {errors.quantity && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.quantity}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: Image URL */}
          <div>
            <label htmlFor="image" className="block font-medium text-[#16241C] mb-1">
              পণ্যের ছবি লিংক (Image URL)
            </label>
            <input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
            />
          </div>

          {/* Row 5: Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-[#16241C] mb-1">
              বিবরণ (Description)
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="পণ্যের সংক্ষিপ্ত বিবরণ লিখুন..."
              className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E4DFD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E4DFD1]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#E4DFD1] text-sm font-semibold text-[#6B7A6E] hover:bg-[#FAF8F3] transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-[#1F3D2B] text-white hover:bg-[#2F5943] transition shadow-xs"
            >
              পণ্য যোগ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
