"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getClientDictionary } from "../dictionaries/clientDictionary";
import Image from "next/image";

export default function Consultants() {
  const { lang } = useLanguage();
  const dict = getClientDictionary(lang as "en" | "ar");

  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedConsultant(index === selectedConsultant ? null : index);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-sky-500 justify-center text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{dict.consultants.title}</h1>
      <p className="justify-center text-center text-lg sm:text-xl mb-6 sm:mb-8">{dict.consultants.description}</p>

      {/* Expanded Consultant Info */}
      {selectedConsultant !== null && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 sm:mb-8 flex flex-col items-center">
          <Image
            src={dict.consultants.list[selectedConsultant].image}
            alt={dict.consultants.list[selectedConsultant].name}
            width={200}
            height={200}
            className="rounded-full mb-4 w-[200px] h-[200px] object-contain"
          />
          <h2 className="text-2xl font-semibold mb-2">{dict.consultants.list[selectedConsultant].name}</h2>
          <h3 className="text-lg text-gray-600 mb-3">{dict.consultants.list[selectedConsultant].specialty}</h3>
          <p className="text-base text-gray-700 text-center">{dict.consultants.list[selectedConsultant].description}</p>
        </div>
      )}

      {/* Grid of Consultants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {dict.consultants.list.map((consultant, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center cursor-pointer transition-all hover:scale-105"
            onClick={() => handleSelect(index)}
          >
            <Image
              src={consultant.image}
              alt={consultant.name}
              width={150}
              height={150}
              className="rounded-full mb-3 w-[150px] h-[150px] object-contain" 
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-center">{consultant.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
