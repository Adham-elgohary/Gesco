"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import Image from "next/image"
import Logo from "../../assets/Logo.png"

const LogoWithSlogan = ({ slogan, changingWords }: { slogan: string; changingWords: string[] }) => {
const { lang } = useLanguage()
const [currentWordIndex, setCurrentWordIndex] = useState(0)
const [displayedWord, setDisplayedWord] = useState("")
const [isDeleting, setIsDeleting] = useState(false)

useEffect(() => {
    const word = changingWords[currentWordIndex]
    const delay = isDeleting ? 50 : 150

    if (!isDeleting && displayedWord === word) {
    setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedWord === "") {
    setIsDeleting(false)
    setCurrentWordIndex((currentWordIndex + 1) % changingWords.length)
    } else {
    setTimeout(() => {
        setDisplayedWord((prev) => (isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1)))
    }, delay)
    }
}, [changingWords, currentWordIndex, displayedWord, isDeleting])

return (
    <div className="flex flex-col items-center my-8 text-center">
    <div className="mb-4">
        <Image src={Logo} alt="Company Logo" width={300} height={300} />
    </div>
    <div className={`${lang === "ar" ? "rtl" : "ltr"} max-w-2xl`}>
        <h2 className="text-2xl font-bold mb-2">
        {slogan.replace("[WORD]", "")}
        <span className="text-blue-500">{displayedWord}</span>
        <span className="animate-blink">|</span>
        </h2>
    </div>
    </div>
)
}

export default LogoWithSlogan