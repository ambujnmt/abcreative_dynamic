"use client";

import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {

};

const fallbackSlides = [

];

export default function ProjectType() {
    const scrollRef = useRef(null);

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const projectTypeSection = getSection(pageData, 'project_type');

            if (projectTypeSection) {
                setSection(projectTypeSection);
                setItems(projectTypeSection.items?.length ? projectTypeSection.items : []);
            }
        };
        loadData();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const title = section?.title || fallbackSection.title;
    const description = section?.description || fallbackSection.description;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;
    const projectSlides = items.length ? items : fallbackSlides;

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const card = container.querySelector("[data-card]");
        const cardWidth = card ? card.offsetWidth + 24 : 320; // width + gap

        container.scrollBy({
            left: direction === "left" ? -cardWidth : cardWidth,
            behavior: "smooth",
        });
    };

    return (
        <>
            <section className="bg-[var(--dark-bg)] py-[60px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="lg:col-span-4 col-span-12">
                            <h6 className="uppercase font-medium text-[18px] leading-[100%] text-[var(--primary-color)] w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-[var(--primary-color)] after:right-[-40px] after:top-[8px] mb-5">{tagLabel}</h6>
                            <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-white mb-5">{title}</h3>
                            <p className="text-[20px] text-white font-normal leading-[25px]">{description}</p>
                            <a href={buttonLink}>
                                <button className="mt-[25px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                            </a>
                        </div>

                        {/* Here is slider column */}
                        <div className="lg:col-span-8 col-span-12">
                            <div
                                ref={scrollRef}
                                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
                                           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            >
                                {projectSlides.map((item) => (
                                    <div
                                        key={item.id}
                                        data-card
                                        className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                    >
                                        <SliderCard item={item} isDynamic={items.length > 0} />
                                    </div>
                                ))}
                            </div>

                            {/* Arrow buttons — bottom right */}
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    onClick={() => scroll("left")}
                                    aria-label="Previous slide"
                                    className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-[var(--primary-color)] hover:border-[var(--primary-color)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                                >
                                    <FaArrowLeftLong size={16} />
                                </button>
                                <button
                                    onClick={() => scroll("right")}
                                    aria-label="Next slide"
                                    className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-[var(--primary-color)] hover:border-[var(--primary-color)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                                >
                                    <FaArrowRightLong size={16} />
                                </button>
                            </div>
                        </div>
                        {/* // Here is slider column */}
                    </div>
                </div>
            </section>
        </>
    )
}

function SliderCard({ item, isDynamic }) {
    const imageSrc = isDynamic ? mediaUrl(item.image) : item.image;
    const linkHref = item.link || "#";

    return (

        <a href={linkHref}
            className="group relative block h-[380px] rounded-2xl overflow-hidden ring-1 ring-white/10"
        >
            <img
                src={imageSrc}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                <span className="inline-flex items-center gap-1.5 text-[var(--primary-color)] text-sm font-medium">
                    Read More
                    <FaArrowRightLong size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </a>
    );
}