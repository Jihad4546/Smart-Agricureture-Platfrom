"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Expert = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

const FarmerPage = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
   const {lang} = useLanguage();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/experts`
        );

        const data = await response.json();

        if (data.success) {
          setExperts(data.experts);
        }
      } catch (error) {
        console.error("Failed to fetch experts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please login first</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href={"/"} 
className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]">
  <ArrowLeft size={16} />
  {lang === "bn" ? "ফিরে যান" : "Go Back"}
</Link>
      <h1 className="text-2xl font-bold mb-6">
       {lang === "bn" ? "উপলব্ধ বিশেষজ্ঞ" : 'Available Experts'}
      </h1>

      {loading ? (
        <p>Loading experts...</p>
      ) : experts.length === 0 ? (
        <p>No experts available.</p>
      ) : (
        <div className="grid gap-4">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="border rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {expert.image ? (
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    👤
                  </div>
                )}

                <div>
                  <h2 className="font-semibold">
                    {expert.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {expert.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push(
                    `/dashboard/farmerChat?expertId=${expert.id}`
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer"
              >
                {lang === 'bn'? 'বার্তা': 'Chat'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerPage;