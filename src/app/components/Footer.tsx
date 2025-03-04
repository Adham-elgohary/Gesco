import { useLanguage } from "../contexts/LanguageContext"
import { getClientDictionary } from "../dictionaries/clientDictionary"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const { lang } = useLanguage()
  const dict = getClientDictionary(lang as "en" | "ar")
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 shadow-md text-white py-28 sm:py-6">
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
      <div className="container mx-auto px-4 sm:px-6">
      </div>
    </footer>
  )
}

export default Footer