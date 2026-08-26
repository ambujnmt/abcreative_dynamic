"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// page/sections are empty, so the layout never looks broken.
const fallbackPage = {
    banner_title: "Clients",
};

const fallbackIntro = {
    title: '<span class="text-[var(--primary-color)]">ABCreative</span> recent cases',
    description: '<span class="text-[var(--primary-color)]">20 years</span> of delivering 3D product visualization and rendering services. We know how to delight our European and global business clients. Get inspired about how we can help you with the cases below!',
    image: "/assets/img/visu-img7.jpg",
    button_text: "Request a Free Consult",
    button_link: "#",
};

// Each case card uses: icon = the case photo (left image), image = the
// brand logo (top-right small image), title = the label above the text
// (usually "Our work:"), description = the case summary, link = the
// "Read more" button link.
const fallbackCases = [
];

export default function Clients() {

    const [page, setPage] = useState(null);
    const [introSection, setIntroSection] = useState(null);
    const [casesSection, setCasesSection] = useState(null);
    const [caseItems, setCaseItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('clients');
            if (!pageData) return;

            setPage(pageData);

            const intro = getSection(pageData, 'clients_intro');
            if (intro) setIntroSection(intro);

            const cases = getSection(pageData, 'clients_cases');
            if (cases) {
                setCasesSection(cases);
                setCaseItems(cases.items?.length ? cases.items : []);
            }
        };
        loadData();
    }, []);

    const bannerTitle = page?.banner_title || fallbackPage.banner_title;

    const introTitle = introSection?.title || fallbackIntro.title;
    const introDescription = introSection?.description || fallbackIntro.description;
    const introImage = introSection?.image ? mediaUrl(introSection.image) : fallbackIntro.image;
    const introButtonText = introSection?.button_text || fallbackIntro.button_text;
    const introButtonLink = introSection?.button_link || fallbackIntro.button_link;

    const cases = caseItems.length ? caseItems : fallbackCases;
    const isDynamicCases = caseItems.length > 0;

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
            <section className="bg-white py-20">
                <div className="container">
                    {/* Section 1 */}
                        <section className="pb-[30px]">
                            <div className="container">
                                <div className="grid grid-cols-12 gap-6 items-center">
                                    <div className="lg:col-span-6 md:col-span-6 col-span-12">
                                        <h3
                                            className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"
                                            dangerouslySetInnerHTML={{ __html: introTitle }}
                                        />
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
                    <section className="container mt-[70px]">
                        <div className="grid grid-cols-12 gap-6">
                            {cases.map((item) => {
                                const caseImageSrc = isDynamicCases ? mediaUrl(item.image) : item.image;
                                const brandLogoSrc = isDynamicCases ? mediaUrl(item.icon) : item.icon;

                                return (
                                    <div className="lg:col-span-6 md:col-span-6 col-span-12" key={item.id}>
                                        <div className="grid grid-cols-12 gap-6 items-stretch rounded-2xl border border-slate-100 p-2 shadow-sm bg-indigo-50">
                                            <div className="lg:col-span-5 col-span-12">
                                                <div className="h-full">
                                                    <img
                                                        src={caseImageSrc}
                                                        alt={item.title}
                                                        className="rounded-xl w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="lg:col-span-7 col-span-12">
                                                <div className="h-full">
                                                    <img
                                                        src={brandLogoSrc}
                                                        alt={item.title}
                                                        className="w-[50%] h-auto"
                                                    />
                                                    <div className="mb-4"></div>
                                                    <h3 className="text-[20px] font-bold text-slate-900">{item.title}</h3>
                                                    <div className="mb-2"></div>
                                                    <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">{item.description}</p>
                                                    <a href={item.link || "#"}>
                                                        <button className="mt-[20px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-5 py-3 rounded-lg transition border border-[var(--primary-color)] text-[17px] font-medium leading-[100%]">Read more about this case &nbsp; <FaArrowRightLong /></button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    {/* // Section 2 */}
                </div>
            </section>
            {/* // Page start here */}
        </>
    )
}