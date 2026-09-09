"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUserClient } from "../../../lib/auth";
import {
  Sprout,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const RegisterFormContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const storedUsers = localStorage.getItem("registered_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (userExists) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        role: "Farmer" as const,
      };
      users.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(users));

      loginUserClient({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#E4DFD1] bg-white shadow-[0_25px_70px_-25px_rgba(31,61,43,0.25)] md:grid-cols-2">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="relative hidden overflow-hidden bg-[#1F3D2B] p-10 md:flex md:flex-col md:justify-between lg:p-14">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-[#2F5943]" />

            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[40px] border-[#2F5943]" />

            {/* Brand */}

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0A458] text-[#1F3D2B]">
                  <Sprout
                    size={22}
                    strokeWidth={2.2}
                  />
                </span>

                <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                  AgriTech
                </span>
              </Link>
            </div>

            {/* Content */}

            <div className="relative z-10 max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#E0A458]">
                Join AgriTech
              </p>

              <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                Grow smarter.
                <br />
                Farm better.
              </h1>

              <p className="mt-6 max-w-sm text-base leading-7 text-[#DCE5DE]">
                Create your AgriTech account and get access to
                smart farming tools, crop insights and agricultural
                intelligence.
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-3">
                {[
                  "Smart farm management",
                  "Crop and weather insights",
                  "AI-powered farming assistance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#DCE5DE]"
                  >
                    <CheckCircle2
                      size={17}
                      className="text-[#E0A458]"
                    />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}

            <div className="relative z-10 flex items-center gap-2 text-sm text-[#C8D6CB]">
              <span className="h-2 w-2 rounded-full bg-[#E0A458]" />
              Smart Agriculture Platform
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

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
                  Get started
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-[#16241C]">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6B7A6E]">
                  Join AgriTech and start your smarter farming journey.
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

              {/* =================================================
                  REGISTER FORM
              ================================================= */}

              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >

                {/* Full Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#16241C]"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A6E]"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="h-12 w-full rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] pl-11 pr-4 text-sm text-[#16241C] outline-none transition placeholder:text-[#9AA69D] focus:border-[#2F5943] focus:bg-white focus:ring-4 focus:ring-[#EAF0E8]"
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#16241C]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A6E]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="h-12 w-full rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] pl-11 pr-12 text-sm text-[#16241C] outline-none transition placeholder:text-[#9AA69D] focus:border-[#2F5943] focus:bg-white focus:ring-4 focus:ring-[#EAF0E8]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
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

                  <p className="mt-2 text-xs text-[#6B7A6E]">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm Password */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-[#16241C]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A6E]"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="h-12 w-full rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] pl-11 pr-12 text-sm text-[#16241C] outline-none transition placeholder:text-[#9AA69D] focus:border-[#2F5943] focus:bg-white focus:ring-4 focus:ring-[#EAF0E8]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#6B7A6E] transition hover:bg-[#EAF0E8] hover:text-[#1F3D2B]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}

                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#E4DFD1] accent-[#1F3D2B]"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-[#6B7A6E]"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-[#1F3D2B] underline decoration-[#E0A458] underline-offset-2"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-[#1F3D2B] underline decoration-[#E0A458] underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Register Button */}

                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] px-5 text-sm font-semibold text-white shadow-lg shadow-[#1F3D2B]/15 transition hover:bg-[#2F5943] hover:shadow-xl active:scale-[0.99]"
                >
                  Create account

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              {/* Login Link */}

              <p className="mt-8 text-center text-sm text-[#6B7A6E]">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-[#1F3D2B] underline decoration-[#E0A458] decoration-2 underline-offset-4 transition hover:text-[#C6863A]"
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const RegisterPage = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <Sprout className="mx-auto h-12 w-12 animate-pulse text-[#1F3D2B]" />
          <p className="mt-4 text-sm font-medium text-[#6B7A6E]">Loading AgriTech...</p>
        </div>
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
};

export default RegisterPage;