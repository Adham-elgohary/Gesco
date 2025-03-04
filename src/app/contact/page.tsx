"use client";

import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getClientDictionary } from "../dictionaries/clientDictionary";
import { sendMail } from "../api/contact/mail"; 

export default function Contact() {
  const { lang } = useLanguage();
  const dict = getClientDictionary(lang as "en" | "ar");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Changes
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", question: "" }); // Reset form
      } else {
        setMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setMessage("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Question Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-4">{dict.contact.form.title}</h2>
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
          <p className="text-lg flex items-center gap-2"><span className="font-semibold">📍</span> {dict.contact.location?.address}</p>
          <p className="text-lg flex items-center gap-2 mt-2"><span className="font-semibold">📞</span> {dict.contact.location?.phone}</p>
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