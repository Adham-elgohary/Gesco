"use client"

import { useState, useEffect } from "react"
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
  const [expandedField, setExpandedField] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleExpand = (field: string) => {
    if (isMobile) {
      setExpandedField(prev => (prev === field ? null : field))
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-sky-600">{dict.fields.title}</h1>
      <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">{dict.fields.description}</p>

      <div className="space-y-8 max-w-5xl mx-auto">
        {dict.fields.list.map((field, index) => (
          <div key={index} className={`border rounded-lg shadow-lg bg-sky-600 overflow-hidden ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl md:text-2xl font-semibold mb-4 text-white p-6 text-center">{field.name}</h2>
            <div className="block md:flex">
              <div className="relative h-96 w-full md:w-1/2 transition-transform duration-300 transform md:hover:scale-110 cursor-pointer" onClick={() => toggleExpand(field.name)}>
                <Image src={fieldImages[index % fieldImages.length]} alt={field.name} layout="fill" objectFit="cover" className="opacity-90 md:hover:opacity-100" />
              </div>
              <div className={`p-6 text-white w-full md:w-1/2 ${expandedField === field.name && isMobile ? "block" : "hidden md:block"}`}>
                {field.explaination && field.explaination.map((desc, i) => (
                  <p key={i} className="mb-2">{desc}</p>
                ))}
              </div>
              <div className={`p-6 text-white w-full ${expandedField === field.name && isMobile ? "block" : "hidden md:hidden"}`}>
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
