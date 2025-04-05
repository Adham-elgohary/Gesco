"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getClientDictionary } from "../dictionaries/clientDictionary";

export default function Contact() {
  const { lang } = useLanguage();
  const dict = getClientDictionary(lang as "en" | "ar");

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [remainingEmails, setRemainingEmails] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  // Handle Form Submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);
    if (data.success) {
      setMessage(`✅ ${data.message}`);
      setRemainingEmails(data.remaining);
      setTimeout(() => setRemainingEmails(null), 5000); // Hide counter after 5 seconds
      setFormData({ name: "", email: "", question: "" });
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };
  return (
<div className="container mx-auto px-6 py-12">
  <h1 className="text-sky-500 justify-center text-center text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 pb-20">{dict.contact.title}</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-4">{dict.contact.form.title}</h2>
        
        {remainingEmails !== null && (
          <p className="mb-4 text-lg text-gray-700">📩 {remainingEmails} emails remaining today</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={dict.contact.form.name}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={dict.contact.form.email}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder={dict.contact.form.question}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
            <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition"
            disabled={loading}
          >
          {loading ? "Sending..." : dict.contact.form.submit}
          </button>
        </form>
        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </div>

      {/* Contact & Map Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Google Map */}
        <iframe
          src={dict.contact.location?.mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          className="rounded-md shadow-md"
        ></iframe>
        
        {/* Contact Details */}
        <div className="bg-gray-100 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{dict.contact.location?.title}</h2>
          <p className="text-lg flex items-center gap-2">
            <span className="font-semibold">📍</span> {dict.contact.location?.address}
          </p>
          <p className="text-lg flex items-center gap-2 mt-2">
            <span className="font-semibold">📞</span>
            <a
              href="https://wa.me/201119389769"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline"
            >
              {dict.contact.location?.phone}
            </a>
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-12">
        <h2 className="text-2xl font-bold mb-4">{dict.contact.faq.title}</h2>
        <div className="space-y-4">
          {dict.contact.faq.questions.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow">
              <h3 className="font-semibold text-lg">{item.question}</h3>
              <p className="text-gray-700 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}