"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../assets/Logo.png"
import { useLanguage } from "../contexts/LanguageContext"
import { GB, SA } from "country-flag-icons/react/3x2"

const Header = () => {
  const { lang, setLang } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
    setIsMenuOpen(false)
    localStorage.setItem("lang", newLang)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { href: "/about", labelEn: "About Us", labelAr: "من نحن" },
    { href: "/fields", labelEn: "Fields", labelAr: "المجالات" },
    { href: "/consultants", labelEn: "Consultants", labelAr: "المستشارون" },
    { href: "/binder", labelEn: "Binder", labelAr: "المجلد" },
    { href: "/contact", labelEn: "Contact Us", labelAr: "اتصل بنا" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } ${isVisible ? "top-0" : "-top-full"}`}
    >
      <nav className={`container mx-auto px-4 sm:px-6 py-2 sm:py-4 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <div className="flex justify-between items-center">
          {/* Logo as Home Button */}
          <Link href={`/`} className="flex items-center">
            <Image
              src={Logo}
              alt="Company Logo"
              width={100}
              height={100}
              className={lang === "ar" ? "ml-2" : "mr-2"}
            />
          </Link>

          {/* Desktop and Tablet Menu */}
          <div className={`hidden md:flex ${lang === "ar" ? "space-x-reverse" : ""} space-x-2 lg:space-x-4`}>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`custom-button text-sm lg:text-base ${lang === "ar" ? "arabic-button" : ""}`}
              >
                {lang === "en" ? item.labelEn : item.labelAr}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-2 language-selector">
            <button
              onClick={() => handleLanguageChange(lang === "en" ? "ar" : "en")}
              className="flex items-center space-x-2 bg-transparent border rounded px-2 py-1 text-sm lg:text-base text-gray-800 border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              {lang === "en" ? (
                <>
                  <GB className="w-4 h-4" />
                  <span>English</span>
                </>
              ) : (
                <>
                  <SA className="w-4 h-4" />
                  <span>العربية</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${
              isScrolled ? "text-gray-800" : "text-gray-800"
            }`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 transition-opacity ease-in-out duration-500"></div>
            <div className={`absolute inset-y-0 ${lang === "ar" ? "left-0" : "right-0"} max-w-full flex`}>
              <div className="relative w-screen max-w-sm">
                <div
                  className={`h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll ${lang === "ar" ? "rtl" : "ltr"}`}
                >
                  <div className="px-4 sm:px-6">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="flex flex-col space-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`custom-button text-sm ${lang === "ar" ? "arabic-button" : ""}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {lang === "en" ? item.labelEn : item.labelAr}
                        </Link>
                      ))}
                      <button
                        onClick={() => handleLanguageChange(lang === "en" ? "ar" : "en")}
                        className="flex items-center space-x-2 bg-transparent border rounded px-2 py-1 text-sm text-gray-800 border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                      >
                        {lang === "en" ? (
                          <>
                            <GB className="w-4 h-4" />
                            <span>English</span>
                          </>
                        ) : (
                          <>
                            <SA className="w-4 h-4" />
                            <span>العربية</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header