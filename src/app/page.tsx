"use client"

import { useLanguage } from "./contexts/LanguageContext"
import { getClientDictionary } from "./dictionaries/clientDictionary"
import Image from "next/image"
import Hero from "../assets/Hero.jpeg"
import CeoQuote from "./components/CeoQuote"

// Import the 7 images
import Img7 from "../assets/Pics/1.png"
import Img5 from "../assets/Pics/20170618072951_الهيئة_القومية_لضمان_جودة_التعليم_والاعتماد-removebg-preview.png"
import Img3 from "../assets/Pics/ABET-small-removebg-preview.png"
import Img4 from "../assets/Pics/Engineering-Council-removebg-preview.png"
import Img2 from "../assets/Pics/Logoo22-small-removebg.png"
import Img6 from "../assets/Pics/asic-logo-white-removebg-preview.png"
import Img1 from "../assets/Pics/نقابة-المهندسين-المصرية-removebg-preview.png"
import LogoWithSlogan from "./components/LogoWithSologan"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import FieldComponent from "./components/fieldcomp"

export default function Home() {
  const { lang } = useLanguage()
  const dict = getClientDictionary(lang as "en" | "ar")

  return (
    <div className="w-full py-12 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden rounded-lg">
        <Image
          src={Hero}
          alt="Hero"
          layout="fill"
          objectFit="cover"
        />
        <div className={`absolute bottom-10 mb-6 ${lang === "ar" ? "right-6" : "left-6"} text-white`}>
          <h1 className="text-4xl font-bold mb-2">{dict.home.title}</h1>
            {Array.isArray(dict.home.description) ? (
            dict.home.description.map((line: string, index: Key) => (
              <p key={index} className="text-2xl">{line}</p>
            ))
            ) : (
            <p className="text-xl">{dict.home.description}</p>
            )}
        </div>
      </div>
      <br />
      {/* Fields Section */}
      <div className="w-full flex-row items-center justify-center">
        <FieldComponent />
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <CeoQuote quote={dict.home.ceoQuote} />
      </div>
       {/* Middle Segment with Gradient Strip */}
      <div className="mt-10 w-full"> {/* Margin top */}
        <div className="w-full h-auto rounded-lg flex items-center justify-center flex-col">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Accreditation Bodies
          </h2>
          <div className="container justify-center flex gap-4 px-6 w-full overflow-x-auto pb-6">
            {[Img1, Img2, Img3, Img4, Img5, Img6, Img7].map((img, index) => (
              <div key={index} className="justify-center flex-shrink-0 w-1/12 h-32 relative overflow-hidden rounded-lg">
                <Image src={img} alt={`Image ${index + 1}`} layout="fill" objectFit="contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <LogoWithSlogan slogan={dict.home.slogan} changingWords={dict.home.changingWords} />
      </div>
    </div>
  )
}