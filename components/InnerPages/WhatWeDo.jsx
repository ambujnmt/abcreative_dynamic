"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import WhatWeDoSec from "../Main/HomeSections/WhatWeDoSec";
import TrustedCompanies from "./TrustedCompanies";
import { FaArrowRight } from "react-icons/fa";
import { fetchPageBySlug, getSection, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// page/sections are empty, so the layout never looks broken.
const fallbackPage = {
   
};

const fallbackIntro = {
   
};

const fallbackValue = {
  
};

const fallbackValueItems = [

];

const fallbackCta = {
 
};

export default function WhatWeDo() {

    const [page, setPage] = useState(null);
    const [introSection, setIntroSection] = useState(null);
    const [valueSection, setValueSection] = useState(null);
    const [valueItems, setValueItems] = useState([]);
    const [ctaSection, setCtaSection] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('what-we-do');
            if (!pageData) return;

            setPage(pageData);

            const intro = getSection(pageData, 'wwd_intro');
            if (intro) setIntroSection(intro);

            const value = getSection(pageData, 'wwd_value');
            if (value) {
                setValueSection(value);
                setValueItems(value.items?.length ? value.items : []);
            }

            const cta = getSection(pageData, 'wwd_cta');
            if (cta) setCtaSection(cta);
        };
        loadData();
    }, []);

    const bannerTitle = page?.banner_title || fallbackPage.banner_title;

    const introTitle = introSection?.title || fallbackIntro.title;
    const introDescription = introSection?.description || fallbackIntro.description;
    const introImage = introSection?.image ? mediaUrl(introSection.image) : fallbackIntro.image;
    const introButtonText = introSection?.button_text || fallbackIntro.button_text;
    const introButtonLink = introSection?.button_link || fallbackIntro.button_link;

    const valueTitle = valueSection?.title || fallbackValue.title;
    const valueCards = valueItems.length ? valueItems : fallbackValueItems;

    const ctaTitle = ctaSection?.title || fallbackCta.title;
    const ctaHighlight = ctaSection?.subtitle || fallbackCta.subtitle;
    const ctaDescription = ctaSection?.description || fallbackCta.description;
    const ctaButtonText = ctaSection?.button_text || fallbackCta.button_text;
    const ctaButtonLink = ctaSection?.button_link || fallbackCta.button_link;

    return (
        <>
            {/* Breadcrumb section */}
            <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/img/breadcrumb-img.png"
                    alt="Company Banner"
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
            <section className="bg-white pt-20">
                <div className="container">
                    {/* Section 1 */}
                    <section className="pb-[30px]">
                        <div className="container">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                                    <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{introTitle}</h3>
                                    <p
                                        className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]"
                                        dangerouslySetInnerHTML={{ __html: introDescription }}
                                    />

                                    <a href={introButtonLink}>
                                        <button className="mt-[40px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{introButtonText} &nbsp; <FaArrowRightLong /></button>
                                    </a>
                                </div>
                                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                                    <div className="relative">
                                        <img
                                            src={introImage}
                                            alt="image"
                                            className="rounded-xl w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* // Section 1 */}


                    {/* Section 2 */}
                    <WhatWeDoSec />
                    {/* // Section 2 */}


                    {/* Section 3 */}
                    <section>
                        <h2 className="mx-auto text-center font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5 whitespace-pre-line">
                            {valueTitle}
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-[50px]">
                            {valueCards.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-2xl  border border-slate-100 p-5 shadow-sm bg-indigo-50 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#14B8A6]/10"
                                >
                                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--primary-color)] transition duration-300 group-hover:scale-x-100" />
                                    <div className="mb-5 flex h-[50px] w-[50px] flex-none items-center justify-center rounded-xl bg-[var(--primary-color)] text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-[17px] font-bold text-slate-900">{item.title}</h3>
                                    <p className="mt-1 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* // Section 3 */}


                    {/* Section 4 */}
                    <TrustedCompanies />
                    {/* // Section 4 */}


                    {/* Section 5 */}
                    <section className="container pb-20 pt-4 mt-10">
                        <div className="rounded-3xl bg-[var(--primary-color)] py-14 text-center shadow-2xl">
                            <h2 className="mt-4 font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-white sm:text-4xl">
                                {ctaTitle} <span className="lg:block"> {ctaHighlight}</span>
                            </h2>
                            <p
                                className="mx-auto mt-3 max-w-xl text-[16px] text-white font-normal leading-[25px]"
                                dangerouslySetInnerHTML={{ __html: ctaDescription }}
                            />
                            <a href={ctaButtonLink}>
                                <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 sm:text-base hover:text-[var(--primary-color)]">
                                    {ctaButtonText}
                                    <FaArrowRight className="h-3 w-3" />
                                </button>
                            </a>
                        </div>
                    </section>
                    {/* // Section 4 */}
                </div>
            </section>
            {/* // Page start here */}
        </>
    )
}