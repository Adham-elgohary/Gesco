"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { getClientDictionary } from "../dictionaries/clientDictionary"

export default function FieldComponent() {
const { lang } = useLanguage()
const dict = getClientDictionary(lang as "en" | "ar")

// Allow multiple expanded fields
const [expandedFields, setExpandedFields] = useState<string[]>([])

const toggleField = (field: string) => {
    setExpandedFields((prev) =>
    prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    )
}

return (
    <div className="container mx-auto px-6 py-12">
    <h1 className="text-4xl font-bold text-center mb-8">{dict.fields.title}</h1>
    <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">{dict.fields.description}</p>

    <div className="space-y-4 max-w-3xl mx-auto">
        {dict.fields.list.map((field, index) => (
        <div key={index} className="border rounded-2xl shadow-lg bg-white overflow-hidden">
            <button
            onClick={() => toggleField(field.name)}
            className="w-full flex justify-between items-center px-6 py-4 text-xl font-semibold bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300"
            >
            {field.name}
            <span className={`text-2xl transform transition-transform duration-300 ${expandedFields.includes(field.name) ? "rotate-180" : ""}`}>
                ▼
            </span>
            </button>

            <div
            className={`grid transition-all duration-300 ease-in-out ${
                expandedFields.includes(field.name) ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
            } overflow-hidden px-6 bg-gray-100 text-gray-700 text-lg`}
            >
            {field.descriptions.map((desc: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<string>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<string>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                <p key={i} className="mb-2">{desc}</p>
            ))}
            </div>
        </div>
        ))}
    </div>
    </div>
)
}
