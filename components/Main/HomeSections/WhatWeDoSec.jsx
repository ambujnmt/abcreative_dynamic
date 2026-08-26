import { Link } from '@heroui/react'
import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {

};

const fallbackItems = [

];

export default function WhatWeDoSec() {

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const whatWeDoSection = getSection(pageData, 'what_we_do');

            if (whatWeDoSection) {
                setSection(whatWeDoSection);
                setItems(whatWeDoSection.items?.length ? whatWeDoSection.items : []);
            }
        };
        loadData();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const title = section?.title || fallbackSection.title;
    const description = section?.description || fallbackSection.description;
    const cards = items.length ? items : fallbackItems;

    return (
        <>
            <div className="container my-[70px]">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 flex justify-center">
                        <div className="max-w-3xl text-center">
                            <h6 className="block m-auto w-max text-[18px] leading-[100%] text-[var(--primary-color)] relative before:content-[''] before:absolute before:w-[40px] before:h-[4px] before:bg-[var(--primary-color)] before:top-[7px] before:left-[-50px] after:content-[''] after:absolute after:bg-[var(--primary-color)] after:w-[40px] after:h-[4px] after:top-[7px] after:right-[-50px] uppercase mb-4">{tagLabel}</h6>
                            <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{title}</h3>
                            <p className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">{description}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mt-[60px]">
                    {cards.map((item) => {
                        const imageSrc = items.length ? mediaUrl(item.image) : item.image;
                        const iconSrc = items.length ? mediaUrl(item.icon) : item.icon;
                        const linkHref = item.link || "#";

                        return (
                            <div className="lg:col-span-3 md:col-span-6 col-span-12 group" key={item.id}>
                                <div className="border-2 border-[var(--text-color2)] rounded-xl overflow-hidden h-full">
                                    <img
                                        src={imageSrc}
                                        alt={item.title}
                                        className="h-[213px] object-cover rounded-t-[10px] transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    />
                                    <div className="mt-[-30px] ml-[20px]">
                                        <img
                                            src={iconSrc}
                                            alt={item.title}
                                            className="z-10 relative"
                                        />
                                    </div>
                                    <div className="px-5 pb-4">
                                        <Link href={linkHref}>
                                            <h4 className="text-[20px] leading-[100%] font-semibold text-[var(--text-color1)] mt-[20px]">{item.title}</h4>
                                        </Link>
                                        <div className="border-b-2 border-[var(--primary-color)] w-[30px] mt-1 mb-3"></div>
                                        <p className="text-[var(--text-color2)] text-[16px] leading-[100%] font-normal mb-3">{item.description}</p>
                                        <Link href={linkHref} className="text-[var(--primary-color)] text-[16px] hover:text-[var(--text-color1)] transition-colors duration-300 ease-in-out">Read More &nbsp; <FaLongArrowAltRight /></Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}