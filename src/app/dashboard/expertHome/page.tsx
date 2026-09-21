"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Farmer = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

const ExpertPage = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [farmers, setFarmers] = useState<Farmer[]>([]);

  const [loading, setLoading] = useState(true);
const {lang} = useLanguage();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/farmers`
        );

        const data =
          await response.json();

        if (data.success) {
          setFarmers(data.farmers);
        }
      } catch (error) {
        console.error(
          "Failed to fetch farmers:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        Please login first
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
<Link href={"/"} 
className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]">
  <ArrowLeft size={16} />
  {lang === "bn" ? "ফিরে যান" : "Go Back"}
</Link>
      <h1 className="text-2xl font-bold mb-6">
       {lang === 'bn' ? 'কৃষক' : 'Farmers'}
      </h1>

      {loading ? (
        <p>Loading farmers...</p>
      ) : farmers.length === 0 ? (
        <p>
          No farmers available.
        </p>
      ) : (
        <div className="grid gap-4">

          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="border rounded-xl p-4 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                {farmer.image ? (
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    👤
                  </div>
                )}

                <div>

                  <h2 className="font-semibold">
                    {farmer.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {farmer.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  router.push(
                    `/dashboard/expertChat?farmerId=${farmer.id}`
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-1 cursor-pointer"
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

export default ExpertPage;
