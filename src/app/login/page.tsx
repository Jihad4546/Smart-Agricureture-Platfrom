"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Card, Form, Input, Label } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()); 
  
    try {
      const { data, error } = await authClient.signIn.email({
        email: String(user.email),
        password: String(user.password),
        callbackURL: "/",
      });
      
      if (error) {
        toast.error(error.message ?? "Sign in failed");
        setLoading(false);
        return;
      }
      toast.success("✅ Sign In Successful!");
      router.push("/");
    } catch (err) {
      toast.error("❌ Sign In Failed!");
      console.log(err);
      setLoading(false);
    }
  };  

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      {/* max-w-md ব্যবহার করে প্রস্থ কমানো হয়েছে এবং প্যাডিং অ্যাডজাস্ট করা হয়েছে */}
      <Card className="w-full max-w-md border border-[#2F5943] py-6 px-6 sm:px-8 shadow-2xl rounded-2xl">
        <h1 className="text-center text-2xl font-black text-[#2F5943] mb-4">LogIn</h1>
        
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-xs text-black font-semibold">Email</Label>
            <Input
              name="email"
              required
              placeholder="john@example.com"
              type="email"
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-xs text-black font-semibold">Password</Label>
            <div className="relative w-full">
              <Input
                name="password"
                required
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full"
              />
              <button 
                type="button" 
                onClick={() => setIsShowPassword(!isShowPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 hover:text-slate-600"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 mt-2">
            <Button 
              className='w-full bg-[#2F5943] text-white font-bold h-11 rounded-xl shadow-lg cursor-pointer' 
              type="submit" 
              isDisabled={loading}
            >
              {loading ? "Logging In..." : "LogIn"} 
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;