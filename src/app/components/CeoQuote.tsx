import { useLanguage } from "../contexts/LanguageContext"

const CeoQuote = ({ quote }: { quote: string }) => {
const { lang } = useLanguage()

return (
    <div className="my-8 text-center">
        <blockquote className={`text-3xl italic font-semibold ${lang === "ar" ? "rtl" : "ltr"}`}> {quote} </blockquote>
        <h4 className="mt-4 text-xl font-semibold">
            {lang === "ar" ? "الرئيس التنفيذي والمؤسس" : "CEO and Founder"}
        </h4>
        <h3 className="mt-4 font-mono font-semibold text-2xl">
            {lang === "ar" ? "أ.د محمود الجوهري" : "Assoc.Prof. Mahmoud Elgohary"}
        </h3>
    </div>
)
}

export default CeoQuote