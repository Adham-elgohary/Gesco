import { useLanguage } from "../contexts/LanguageContext"
import { getClientDictionary } from "../dictionaries/clientDictionary"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import Logo from "../../assets/Logo.png"
import Image from "next/image"

const Footer = () => {
  const { lang } = useLanguage()
  const dict = getClientDictionary(lang as "en" | "ar")
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 shadow-md text-white py-28 sm:py-6 justify-center space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://www.facebook.com/gefsc2021" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-white text-3xl" />
        </a>
        <a href="https://www.instagram.com/gesco.misr/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white text-3xl" />
        </a>
        <a href="https://www.linkedin.com/company/grand-egypt-for-scientific-consultation" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-white text-3xl" />
        </a>
        <a href="https://x.com/MisrGesco" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white text-3xl" />
        </a>
      </div>
      <div className="flex justify-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white flex items-center justify-center">
          <Image src={Logo} alt="Logo" className="absolute w-20 h-20" />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 justify-center text-center">
        <h3> {dict.footer.copyright} </h3>
      </div>
    </footer>
  )
}

export default Footer