"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { authClient, useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = useSession();

  const user = session?.user;
  const userEmail = user?.email;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
  });

  const {lang} = useLanguage();

useEffect(() => {
  const loadProfile = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${encodeURIComponent(
          userEmail
        )}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load profile");
      }

      setProfile({
        name: data?.name || user?.name || "",
        email: data?.email || user?.email || "",
        image: data?.image || user?.image || "",
      });

      setPreview(data?.image || user?.image || "");

    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, [userEmail]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaving = async () => {
    if (!userEmail) {
      toast.error("No user email");
      return;
    }
    setSaving(true);
    try {   
      let uploadedImage = profile.image;

      if (imageFile) {
        uploadedImage = await uploadImage(imageFile);
      }

      const result = await authClient.updateUser({
        name: profile.name,
        image: uploadedImage,
      });

      console.log("BetterAuth update:", result);
     console.log("PROFILE BEFORE PATCH:", profile);
console.log("UPLOADED IMAGE:", uploadedImage);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...profile,
            image: uploadedImage,
          }),
        }
      );

      const data = await res.json();

      console.log("Backend update:", data);

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Profile update failed"
        );
      }

      setProfile((oldData) => ({
        ...oldData,
        name: profile.name,
        image: uploadedImage,
      }));

      setPreview(uploadedImage);
      setImageFile(null);
      setIsEditing(false);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-b-gray-200 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl max-h-140 mx-auto bg-[#FAF8F3] p-8 rounded-xl shadow">
<Link href={"/"} 
className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]">
  <ArrowLeft size={16} />
  {lang === "bn" ? "ফিরে যান" : "Go Back"}
</Link>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold mr-1 text-[#1F3D2B]">
          {lang === "bn" ? "আমার প্রোফাইল" : "My Profile"}
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            {lang === "bn" ? "এডিট" : "Edit"}
          </button>
        ) : (
          <button
            onClick={handleSaving}
            disabled={saving}
            className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving..." : lang === "bn" ? "সেভ" : "Save"}
          </button>
        )}

      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-8">

        <div className="relative">

          <img
            src={
              preview ||
              profile.image ||
              user?.image ||
              "/default-profile.png"
            }
            alt="profile image"
            className="w-32 h-32 rounded-full object-cover border"
          />

          {isEditing && (
            <>
              <label
                htmlFor="image"
    className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm"
              >
                {lang === "bn" ? "পরিবর্তন" : "Change"}
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </>
          )}

        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-[#1F3D2B]">
            {lang === "bn" ? "নাম" : "Name"}
          </label>

          <input
            type="text"
            name="name"
            defaultValue={user?.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-[#1F3D2B]">
            {lang === "bn" ? "ইমেইল" : "Email"}
          </label>

          <input
            type="email"
            defaultValue={user?.email}
            disabled
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>
    </div>
  
  );
};

export default ProfilePage;

