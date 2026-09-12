"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, Form, Input, Label, Button } from "@heroui/react"; 
import { FaCamera, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const SignUp = () => {
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") || "");
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        const confirmPassword = String(formData.get("confirmPassword") || "");

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; 
        let imageUrl = "";

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        if (imageFile) {
            try {
                const imgFormData = new FormData();
                imgFormData.append("file", imageFile);
                if (uploadPreset) {
                    imgFormData.append("upload_preset", uploadPreset);
                }

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: imgFormData,
                });

                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.error?.message || "Upload failed");
                }

                imageUrl = data.secure_url;
            } catch (error) {
                console.error("Image upload error:", error);
                toast.error("Image upload failed!");
                setLoading(false);
                return;
            }
        } else {
            toast.error("Please upload an avatar first");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                image: imageUrl,
                password,
                callbackURL: "/login",
            });

            if (error) {
                console.error("Sign up error:", error);
                toast.error(error.message ?? "Sign up failed");
                setLoading(false);
                return;
            }

            await authClient.signOut();
            toast.success("✅ Sign Up Successful!");
            router.push("/login");
        } catch (err) {
            toast.error("❌ Sign Up Failed!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center">
            <Card className="w-full max-w-xl border border-[#2F5943] py-8 px-6 sm:px-8 shadow-2xl rounded-2xl">
                <h1 className="text-center text-3xl font-black bg-clip-text text-[#2F5943] mb-2">Sign Up</h1>
                <p className="text-center text-slate-400 text-sm mb-8">Create an account to start sharing your ideas and collaborating with others.</p>

                <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center gap-3 mb-4 w-full">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#2F5943] shadow-lg bg-slate-800">
                                {preview ? (
                                    <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <FaUser size={32} />
                                    </div>
                                )}
                            </div>
                            <label htmlFor="image" className="absolute bottom-0 right-0 bg-[#2F5943] hover:bg-[#2F5943]/80 text-white p-2 rounded-full cursor-pointer shadow-lg transition">
                                <FaCamera size={12} />
                            </label>
                        </div>
                        <input
                            name="image"
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <p className="text-xs text-black">Upload your profile picture</p>
                    </div>

                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-black font-semibold">Name</Label>
                        <Input
                            name="name"
                            required
                            placeholder="Enter your name"
                            type="text"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-black font-semibold">Email</Label>
                        <Input
                            name="email"
                            required
                            placeholder="john@example.com"
                            type="email"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-xs text-black font-semibold">Password</Label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    required
                                    type={isShowPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
<button type="button" onClick={() => setIsShowPassword(!isShowPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-xs text-black font-semibold">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    name="confirmPassword"
                                    required
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter password"
                                />
                                <button type="button" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                                    {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>      
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 mt-4">
<Button className='flex-1 bg-[#2F5943] text-white font-bold h-11 rounded-xl shadow-lg cursor-pointer' type="submit" isDisabled={loading}>
                            {loading ? "Signing Up..." : "SignUp"} 
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;