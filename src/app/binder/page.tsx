"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { getClientDictionary } from "../dictionaries/clientDictionary";
import { FaHardHat } from "react-icons/fa";

export default function Binder() {
  const { lang } = useLanguage();
  const dict = getClientDictionary(lang as "en" | "ar");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      {/* Animated Construction Icon /}
      <motion.div
        initial={{ y: -15 }}
        animate={{ y: 15 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        }}
        className="text-yellow-500 text-9xl mb-6"
      >
        <FaHardHat />
      </motion.div>

      {/ Animated Title /}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-6xl font-extrabold mb-4"
      >
        {dict.binder.title}
      </motion.h1>

      {/ Animated Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="text-2xl text-gray-600 text-center max-w-3xl"
      >
        {dict.binder.description}
      </motion.p>
    </div>
  );
}