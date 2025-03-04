"use client"

import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { getClientDictionary } from "../dictionaries/clientDictionary"
import Image from "next/image"

// Import images for the fields
import FieldImg1 from "../../assets/field1.png"
import FieldImg2 from "../../assets/field2.jpg"
import FieldImg3 from "../../assets/field3.png"
import FieldImg4 from "../../assets/field4.jpeg"

const fieldImages = [FieldImg1, FieldImg2, FieldImg3, FieldImg4]

export default function Fields() {
  const { lang } = useLanguage()
  const dict = getClientDictionary(lang as "en" | "ar")

  // Allow multiple expanded fields
  const [expandedFields, setExpandedFields] = useState<string[]>([])

  const toggleField = (field: string) => {
    setExpandedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">{dict.fields.title}</h1>
      <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">{dict.fields.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {dict.fields.list.map((field, index) => (
          <div key={index} className="border rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="container justify-center relative h-72 w-full bg-white">
              <Image src={fieldImages[index % fieldImages.length]} alt={field.name} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
              <button
                onClick={() => toggleField(field.name)}
                className="w-full flex justify-between items-center px-6 py-4 text-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
              >
                {field.name}
                <span className={`text-2xl transform transition-transform duration-300 ${expandedFields.includes(field.name) ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedFields.includes(field.name) ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
                } overflow-hidden px-6 bg-gray-100 text-gray-700 text-lg`}
              >
                {field.explaination && field.explaination.map((desc, i) => (
                  <p key={i} className="mb-2">{desc}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
