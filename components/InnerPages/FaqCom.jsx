"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { fetchPageBySlug, getSection, fetchFaqs, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/FAQs are empty, so the layout never looks broken.
const fallbackIntro = {
   
};

// Each fallback FAQ's "answer" is an array of short pill tags, matching
// the design. In the admin panel, the answer field is entered as one
// pill per line — the component splits it into this same pill list.
const fallbackFaqs = [
 
];

export default function FaqCom() {

    const [introSection, setIntroSection] = useState(null);
    const [faqs, setFaqs] = useState(fallbackFaqs);
    const [openFaq, setOpenFaq] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('faq');
            const intro = getSection(pageData, 'faq_intro');
            if (intro) setIntroSection(intro);

            const data = await fetchFaqs('faq');
            if (data.length) {
                const mapped = data.map((f) => ({
                    id: f.id,
                    question: f.question,
                    // Answer is entered in the admin panel as one pill per line —
                    // split it into individual pill tags here.
                    pills: f.answer.split("\n").map((p) => p.trim()).filter(Boolean),
                }));
                setFaqs(mapped);
                setOpenFaq(mapped[0].id);
            }
        };
        loadData();
    }, []);

    const heading = introSection?.title || fallbackIntro.title;
    const sideImage = introSection?.image ? mediaUrl(introSection.image) : fallbackIntro.image;

    return (
        <>
            <section className="bg-slate-50">
                    <div className="container">
                        <div className="flex flex-col items-center">
                            <h2 className="mt-6 font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-10">
                                {heading}
                            </h2>
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-6">
                                <img
                                    src={sideImage}
                                    alt="image"
                                    className="w-full h-[600px] rounded-xl object-cover"
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div className="">
                                    {faqs.map((faq, index) => {
                                        const isOpen = openFaq === faq.id;

                                        return (
                                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm" key={faq.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenFaq(isOpen ? 0 : faq.id)}
                                                    className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                            Q{index + 1}
                                                        </span>
                                                        <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                            {faq.question}
                                                        </h3>
                                                    </span>
                                                    <FaChevronDown
                                                        className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>
                                                <div
                                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                        }`}
                                                >
                                                    <div className="overflow-hidden">
                                                        <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                            {faq.pills.map((pill, pillIndex) => (
                                                                <span
                                                                    key={pillIndex}
                                                                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                                                                >
                                                                    {pill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    )
}