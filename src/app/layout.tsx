"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"
import { useState } from "react"
import { LanguageProvider } from "./contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [lang, setLang] = useState("en")

  return (
    <LanguageProvider value={{ lang, setLang }}>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
        <body className={`${inter.className} min-h-screen flex flex-col bg-white`}>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  )
}