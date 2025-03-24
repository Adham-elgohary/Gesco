"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { getClientDictionary } from "../dictionaries/clientDictionary";
import Image from "next/image";
import Why_us from "../../assets/why-us.jpg"
import Goals from "../../assets/Goal_Setting.jpg"
import vision from "../../assets/vision.jpg"
import philosophy from "../../assets/philos.png"
import quality from "../../assets/quality.png"

export default function About() {
  const { lang } = useLanguage();
  const dict = getClientDictionary(lang as "en" | "ar");

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-sky-500 text-4xl font-bold text-center pb-20">{dict.about.title}</h1>

      {/* Section 1 */}
      <div className="flex flex-col-reverse sm:flex-row items-center mb-12">
        <div className="sm:w-1/2 text-lg leading-relaxed">
          <p className="text-size">{dict.about.section1}</p>
        </div>
        <div className="sm:w-1/2 ml-10">
          <Image
            src={Why_us}
            alt="About Us Image 1"
            width={700}
            height={700}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col sm:flex-row items-center mb-20">
        <div className="sm:w-1/2 mr-4">
          <Image
            src={Goals}
            alt="About Us Image 2"
            width={700}
            height={700}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="sm:w-1/2 text-lg leading-relaxed pr-4">
          <p className="text-size">{dict.about.section2}</p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col-reverse sm:flex-row items-center mb-20">
        <div className="sm:w-1/2 leading-relaxed">
          <p className="text-xl font-bold mb-2">{dict.about.title_3_1}</p>
          <p className="text-size mb-2">{dict.about.section3_1}</p>
          <p className="text-size">{dict.about.section3_2}</p>
        </div>

        <div className="sm:w-1/2 ml-10">
          <Image
            src={vision}
            alt="About Us Image 3"
            width={700}
            height={700}
            className="rounded-lg shadow-lg"
          />
        </div>
</div>

       {/* Section 4 */}
       <div className="flex flex-col sm:flex-row items-center mb-20">
        <div className="sm:w-1/2 mr-10">
          <Image
            src={philosophy}
            alt="About Us Image 2"
            width={600}
            height={600}
            className="rounded-lg "
          />
        </div>
        <div className="sm:w-1/2 text-lg leading-relaxed">
        <p className="text-xl font-bold mb-2">{dict.about.title_3_2}</p>
        <p className="text-size mb-2">{dict.about.section4_1}</p>
        <p className="text-size">{dict.about.section4_2}</p>
        </div>
      </div>

            {/* Section 5 */}
            <div className="flex flex-col-reverse sm:flex-row items-center mb-20">
        <div className="sm:w-1/2 leading-relaxed">
          <p className="text-xl font-bold mb-2">{dict.about.title4}</p>
          <p className="text-size">{dict.about.section5}</p>
        </div>

        <div className="sm:w-1/2 ml-10">
          <Image
            src={quality}
            alt="About Us Image 3"
            width={500}
            height={500}
            className="rounded-lg "
          />
        </div>
</div>

    </div>
  );
}
