"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaFileContract } from "react-icons/fa";
import { fetchPageBySlug, getSection, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// page/sections are empty, so the layout never looks broken.

const fallbackIntro = {
   };

const fallbackClauses = [
   
];

// Strips a leading "1. " / "14. " numeral from a clause title, for the
// sidebar TOC label and for building each clause's scroll-to anchor id.
function stripNumber(title) {
    return (title || "").replace(/^\d+\.\s*/, "");
}
function slugify(title, index) {
    const base = stripNumber(title).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return base || `section-${index}`;
}

export default function TermsConditions() {

    const [page, setPage] = useState(null);
    const [intro, setIntro] = useState(null);
    const [clauses, setClauses] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('terms-conditions');
            if (!pageData) return;
            setPage(pageData);

            const introSection = getSection(pageData, 'terms_intro');
            if (introSection) setIntro(introSection);

            const contentSection = getSection(pageData, 'terms_content');
            if (contentSection) setClauses(contentSection.items?.length ? contentSection.items : []);
        };
        loadData();
    }, []);

    const bannerTitle = page?.banner_title || fallbackIntro.title;

    const introTag = intro?.tag_label || fallbackIntro.tag_label;
    const introTitle = intro?.title || fallbackIntro.title;
    const introSubtitle = intro?.subtitle || fallbackIntro.subtitle;
    const introDescription = intro?.description || fallbackIntro.description;

    const clauseItems = clauses.length ? clauses : fallbackClauses;
    const clauseAnchors = clauseItems.map((c, i) => slugify(c.title, i));

    return (
        <>
            {/* Breadcrumb section */}
            <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/img/breadcrumb-img.png"
                    alt="Terms & Conditions Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 text-center pt-[30px]">
                    <h1 className="text-4xl font-bold text-white mb-3">{bannerTitle}</h1>
                    <div className="flex items-center justify-center gap-2 text-white text-[16px] font-medium">
                        <span>Home</span>
                        <IoIosArrowForward size={16} />
                        <span className="text-[var(--primary-color)]">{bannerTitle}</span>
                    </div>
                </div>
            </div>
            {/* // Breadcrumb section */}

            {/* Page start here */}
            <main className="w-full bg-white text-slate-800">

                {/* Section 1 - Intro */}
                <section className="pt-16 pb-8">
                    <div className="container w-full px-5 sm:px-8 lg:px-12">
                      
                        <h2 className="font-semibold lg:text-[34px] text-[24px] leading-[110%] text-[var(--text-color1)] mb-2">
                            {introTitle}
                        </h2>
                        <p className="text-[13px] text-[var(--text-color2)] font-medium mb-4">
                            {introSubtitle}
                        </p>
                        <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[26px]">
    {introDescription}
</p>
                    </div>
                </section>
                {/* // Section 1 */}

                {/* Section 2 - TOC + Terms clauses */}
                <section className="pb-24">
                    <div className="container px-5 sm:px-8 lg:px-12">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                            {/* Sidebar table of contents */}
                            <aside className="lg:col-span-4 order-2 lg:order-1">
                                <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-100 shadow-sm p-6 bg-white">
                                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-color2)] mb-4">
                                        On this page
                                    </h4>
                                    <nav className="flex flex-col gap-1">
                                        {clauseItems.map((c, i) => (
                                            <a
                                                key={c.id ?? i}
                                                href={`#${clauseAnchors[i]}`}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-[var(--text-color1)] hover:bg-indigo-50 hover:text-[var(--primary-color)] transition"
                                            >
                                                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-indigo-50 text-[var(--primary-color)] text-[11px] font-bold">
                                                    {i + 1}
                                                </span>
                                                <span className="truncate">{stripNumber(c.title)}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* Clause cards */}
                            <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                                {clauseItems.map((c, i) => (
                                    <div
                                        key={c.id ?? i}
                                        id={clauseAnchors[i]}
                                        className="scroll-mt-28 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition p-6 lg:p-8"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-white text-[15px] font-bold">
                                                {i + 1}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="text-[19px] font-bold text-[var(--text-color1)] mb-2">
                                                    {stripNumber(c.title)}
                                                </h3>
                                                <p
                                                    className="text-[16px] text-[var(--text-color1)] font-normal leading-[26px]"
                                                    dangerouslySetInnerHTML={{ __html: c.description }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
                {/* // Section 2 */}

            </main>
            {/* // Page start here */}
        </>
    )
}