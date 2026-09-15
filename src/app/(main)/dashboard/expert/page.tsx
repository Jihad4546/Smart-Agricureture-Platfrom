import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ExpertHomePage = () => {
    return (
        <div>
            <Link href={"/"} 
className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943] ml-100">
  <ArrowLeft size={16} />
  Go Back
</Link>
            expert
        </div>
    );
};

export default ExpertHomePage;