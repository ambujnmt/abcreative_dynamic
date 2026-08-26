import { Link } from '@heroui/react'
import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {
  
};

const fallbackItems = [
];

export default function OurWork() {

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const ourWorkSection = getSection(pageData, 'our_work');

            if (ourWorkSection) {
                setSection(ourWorkSection);
                setItems(ourWorkSection.items?.length ? ourWorkSection.items : []);
            }
        };
        loadData();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const title = section?.title || fallbackSection.title;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;
    const cards = items.length ? items : fallbackItems;

    // First card renders large (left column), the rest render in the
    // smaller 2-column grid on the right — same layout as the design.
    const [featuredCard, ...restCards] = cards;

    const buildImageSrc = (item) => (items.length ? mediaUrl(item.image) : item.image);
    const buildLogoSrc = (item) => (items.length ? mediaUrl(item.icon) : item.icon);

    return (
        <>
            <section className='bg-[var(--dark-bg)] mt-[60px] py-[70px]'>
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-[18px] leading-[100%] text-white w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-white after:right-[-40px] after:top-[8px]">{tagLabel}</p>
                                <Link href={buttonLink} className="text-white hover:text-[var(--primary-color)] transition-colors duration-300 ease-in-out group">{buttonText} &nbsp; <FaLongArrowAltRight className="text-white group-hover:text-[var(--primary-color)]" /></Link>
                            </div>
                        </div>

                        {/* == column 5 (featured/first project) == */}
                        {featuredCard && (
                            <div className="lg:col-span-5 col-span-12 group">
                                <h3 className="font-semibold lg:text-[55px] text-[35px] lg:leading-[70px] leading-[45px] text-white mb-[50px] whitespace-pre-line">{title}</h3>
                                <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/90 after:via-black/0 after:to-transparent">
                                    <img
                                        src={buildImageSrc(featuredCard)}
                                        alt={featuredCard.title || "Project"}
                                        className="w-full h-[330px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    />
                                    <div className="flex items-center justify-between absolute bottom-5 left-5 right-5 z-10">
                                        <img
                                            src={buildLogoSrc(featuredCard)}
                                            alt={featuredCard.title || "Client logo"}
                                            className="w-auto h-auto object-cover"
                                        />
                                        <Link href={featuredCard.link || "#"} className="transition-colors duration-500 ease-in-out group-hover:rotate-[39deg]">
                                            <div className="w-[45px] h-[45px] rounded-full border border-white-100 flex justify-center items-center group-hover:border-[var(--primary-color)] transition-colors duration-500 ease-in-out">
                                                <FaArrowRightLong className="text-white text-[20px] -rotate-[37deg] group-hover:text-[var(--primary-color)] transition-colors duration-500 ease-in-out" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* == // column 5 == */}

                        {/* == column 7 (remaining projects grid) == */}
                        {restCards.length > 0 && (
                            <div className="lg:col-span-7 col-span-12 mt-[30px]">
                                <div className="grid grid-cols-12 gap-6">
                                    {restCards.map((item) => (
                                        <div className="lg:col-span-6 md:col-span-6 col-span-12 group" key={item.id}>
                                            <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/90 after:via-black/0 after:to-transparent">
                                                <img
                                                    src={buildImageSrc(item)}
                                                    alt={item.title || "Project"}
                                                    className="w-full h-[230px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                />
                                                <div className="flex items-center justify-between absolute bottom-5 left-5 right-5 z-10">
                                                    <img
                                                        src={buildLogoSrc(item)}
                                                        alt={item.title || "Client logo"}
                                                        className="w-auto h-auto object-cover"
                                                    />
                                                    <Link href={item.link || "#"} className="transition-colors duration-500 ease-in-out group-hover:rotate-[39deg]">
                                                        <div className="w-[45px] h-[45px] rounded-full border border-white-100 flex justify-center items-center group-hover:border-[var(--primary-color)] transition-colors duration-500 ease-in-out">
                                                            <FaArrowRightLong className="text-white text-[20px] -rotate-[37deg] group-hover:text-[var(--primary-color)] transition-colors duration-500 ease-in-out" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* == // column 7 == */}
                    </div>
                </div>
            </section>
        </>
    )
}