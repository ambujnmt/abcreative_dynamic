import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section is empty, so the layout never looks broken.
const fallbackSection = {
   
};

export default function HomeCta() {

    const [section, setSection] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const homeCtaSection = getSection(pageData, 'home_cta');

            if (homeCtaSection) {
                setSection(homeCtaSection);
            }
        };
        loadData();
    }, []);

    const title = section?.title || fallbackSection.title;
    const highlight = section?.subtitle || fallbackSection.subtitle;
    // Description supports simple HTML (e.g. <u>word</u>) typed in the
    // admin panel's paragraph field, so words can still be underlined
    // like in the original design.
    const description = section?.description || fallbackSection.description;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;

    return (
        <>
            <section className="relative">
                <img
                    src="/assets/img/left-circle.png"
                    alt="image"
                    className="absolute left-0 bottom-0 w-[180px] h-auto lg:block hidden"
                />
                <img
                    src="/assets/img/right-circle.png"
                    alt="image"
                    className="absolute right-0 top-0 w-[180px] h-auto lg:block hidden"
                />
                <div className="container py-[80px]">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 flex justify-center mb-[20px] mt-[70px]">
                            <div className="max-w-4xl text-center">
                                <h3 className="font-semibold lg:text-[55px] text-[35px] lg:leading-[65px] leading-[45px] text-[var(--text-color1)] mb-5">{title}
                                    <span className="text-[var(--primary-color)] block">{highlight}</span>
                                </h3>
                                <p
                                    className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </div>
                        </div>
                        <div className="col-span-12 block m-auto">
                            <a href={buttonLink}>
                                <button className="flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}