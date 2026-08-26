import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {

};

// Items 1-3: feature list (icon + title + description)
const fallbackFeatures = [

];

// Item 4: the quote card (icon + description used as the quote text)
const fallbackQuote = {

};

// Items 5-7: bottom stats (icon + count_text + title used as the label)
const fallbackStats = [

];

export default function WorksFast() {

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const worksFastSection = getSection(pageData, 'works_fast');

            if (worksFastSection) {
                setSection(worksFastSection);
                setItems(worksFastSection.items?.length ? worksFastSection.items : []);
            }
        };
        loadData();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const title = section?.title || fallbackSection.title;
    const highlight = section?.subtitle || fallbackSection.subtitle;
    const description = section?.description || fallbackSection.description;
    const sideImage = section?.image ? mediaUrl(section.image) : fallbackSection.image;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;

    // Admin ordering convention for this section's items (by sort_order):
    // 1-3 = feature list, 4 = quote card, 5-7 = bottom stats.
    const features = items.length ? items.slice(0, 3) : fallbackFeatures;
    const quote = items.length ? items[3] : fallbackQuote;
    const stats = items.length ? items.slice(4, 7) : fallbackStats;

    const iconSrc = (item, fallbackSrc) => (items.length ? mediaUrl(item.icon) : (item?.icon || fallbackSrc));

    return (
        <>
            <section className="bg-[#FBFCFD] py-[70px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="lg:col-span-6 col-span-12">
                            <h6 className="uppercase font-medium text-[18px] leading-[100%] text-[var(--primary-color)] w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-[var(--primary-color)] after:right-[-40px] after:top-[8px] mb-5">{tagLabel}</h6>
                            <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{title} <span className="text-[var(--primary-color)]"> {highlight} </span></h3>
                            <p className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">{description}</p>

                            {features.map((item, index) => (
                                <div className="flex items-center mt-[40px]" key={item.id || index}>
                                    <img
                                        src={iconSrc(item, "/assets/img/strong-icon1.png")}
                                        alt={item.title}
                                        className="mr-5"
                                    />
                                    <div className="">
                                        <h4 className="text-[20px] text-[var(--text-color1)] font-semibold leading-[25px] mb-[9px]">{item.title}</h4>
                                        <p className="text-[18px] text-[var(--text-color1)] font-normal leading-[25px]">{item.description}</p>
                                        {index < features.length - 1 && (
                                            <div className="border border-gray-200 w-[70%] relative top-[18px]"></div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <a href={buttonLink}>
                                <button className="mt-[40px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                            </a>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="relative">
                                <img
                                    src={sideImage}
                                    alt="image"
                                    className=""
                                />
                                {quote && (
                                    <div className="lg:w-[60%] w-[80%] shadow-[0px_5px_10px_rgba(0,0,0,0.15)] rounded-xl border-l-3 border-l-[var(--primary-color)] p-5 lg:absolute relative lg:bottom-[-80px] bottom-[auto] lg:left-[40px] left-[20px] bg-white">
                                        <img
                                            src={iconSrc(quote, "/assets/img/quote-img.png")}
                                            alt="quote"
                                            className="mb-4"
                                        />
                                        <p className="text-[18px] italic text-[var(--text-color2)] font-medium leading-[25px]">{quote.description}</p>
                                    </div>
                                )}
                            </div>

                            {stats.length > 0 && (
                                <div className="mt-[140px] lg:flex justify-between bg-[#F1F8FA] py-[15px] px-[12px] rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.15)] hidden">
                                    {stats.map((item, index) => (
                                        <div className="flex items-center" key={item.id || index}>
                                            <img
                                                src={iconSrc(item, "/assets/img/project-icon1.png")}
                                                alt={item.title}
                                                className="mr-3"
                                            />
                                            <div className="">
                                                <h5 className="text-[18px] font-semibold text-[var(--text-color1)] leading-[25px]">{item.count_text}</h5>
                                                <p className="text-[16px] font-normal text-[var(--text-color2)]">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}