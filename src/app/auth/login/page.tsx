"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUserClient, DEFAULT_USERS } from "../../../lib/auth";
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginFormContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // 1. Check default hardcoded users
    let matchedUser: any = DEFAULT_USERS[email.toLowerCase()];
    
    // 2. Check registered users in localStorage
    if (!matchedUser) {
      try {
        const storedUsers = localStorage.getItem("registered_users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const found = users.find(
            (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );
          if (found) {
            matchedUser = {
              name: found.name,
              email: found.email,
              role: found.role || "Farmer",
            };
          }
        }
      } catch (err) {
        console.error("Failed to read registered users", err);
      }
    } else {
      // Check password for default user
      if (matchedUser.password !== password) {
        matchedUser = undefined;
      }
    }

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    // Success! Log in
    loginUserClient({
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    });

    // Redirect and refresh
    router.push(redirectUrl);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#E4DFD1] bg-white shadow-[0_25px_70px_-25px_rgba(31,61,43,0.25)] md:grid-cols-2">

          {/* Left Side */}
          <section className="relative hidden overflow-hidden bg-[#1F3D2B] p-10 md:flex md:flex-col md:justify-between lg:p-14">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-[#2F5943]" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[40px] border-[#2F5943]" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0A458] text-[#1F3D2B]">
                  <Sprout size={22} strokeWidth={2.2} />
                </span>

                <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                  AgriTech
                </span>
              </Link>
            </div>

            <div className="relative z-10 max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#E0A458]">
                Smart Farming
              </p>

              <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                Smarter farming,
                <br />
                better future.
              </h1>

              <p className="mt-6 max-w-sm text-base leading-7 text-[#DCE5DE]">
                Manage your farm, monitor your crops, understand the
                market and make smarter farming decisions with AgriTech.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-sm text-[#C8D6CB]">
              <span className="h-2 w-2 rounded-full bg-[#E0A458]" />
              Smart Agriculture Platform
            </div>
          </section>

          {/* Right Side */}
          <section className="p-7 sm:p-10 lg:p-14">
            {/* Mobile Brand */}
            <div className="mb-8 flex items-center justify-center md:hidden">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F3D2B] text-[#E0A458]">
                  <Sprout size={21} />
                </span>

                <span className="font-serif text-2xl font-semibold text-[#1F3D2B]">
                  AgriTech
                </span>
              </Link>
            </div>

            <div className="mx-auto w-full max-w-md">
              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-[#C6863A]">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-[#16241C]">
                  Login to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7A6E]">
                  Continue managing your farm with AgriTech.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div 
                  className="mb-5 rounded-xl p-3.5 text-sm font-medium"
                  style={{
                    backgroundColor: "#FDF2F2",
                    border: "1px solid #FDE8E8",
                    color: "#9B1C1C",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#16241C]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A6E]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] pl-11 pr-4 text-sm text-[#16241C] outline-none transition placeholder:text-[#9AA69D] focus:border-[#2F5943] focus:bg-white focus:ring-4 focus:ring-[#EAF0E8]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#16241C]"
                    >
                      Password
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="text-xs font-medium text-[#2F5943] transition hover:text-[#C6863A]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A6E]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-12 w-full rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] pl-11 pr-12 text-sm text-[#16241C] outline-none transition placeholder:text-[#9AA69D] focus:border-[#2F5943] focus:bg-white focus:ring-4 focus:ring-[#EAF0E8]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#6B7A6E] transition hover:bg-[#EAF0E8] hover:text-[#1F3D2B]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#E4DFD1] accent-[#1F3D2B]"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-[#6B7A6E]"
                  >
                    Remember me
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white shadow-lg shadow-[#1F3D2B]/15 transition hover:bg-[#2F5943] hover:shadow-xl active:scale-[0.99]"
                >
                  Login
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              {/* Register */}
              <p className="mt-8 text-center text-sm text-[#6B7A6E]">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-[#1F3D2B] underline decoration-[#E0A458] decoration-2 underline-offset-4 transition hover:text-[#C6863A]"
                >
                  Create account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <Sprout className="mx-auto h-12 w-12 animate-pulse text-[#1F3D2B]" />
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">Loading AgriTech...</p>
        </div>
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginPage;