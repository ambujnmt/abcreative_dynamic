import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {
   
};

// Items 1-2: feature blocks on the left (icon + title + description)
const fallbackFeatures = [
    { id: "f1", icon: "/assets/img/team-goal.png", title: "Team Goal", description: "We are passionate about our work and the relationships we build with our clients." },
    { id: "f2", icon: "/assets/img/approach.png", title: "Our Approach", description: "We use the latest techniques and continue to learn, innovate, and grow with every project." },
];

// Item 3: the floating badge card on top of the right-side image
const fallbackBadge = {
    icon: "/assets/img/approach.png",
    title: "15+ Years",
    description: "of delivering high-quality visual solutions.",
};

export default function CreativeSolution() {

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const creativeSolutionSection = getSection(pageData, 'creative_solution');

            if (creativeSolutionSection) {
                setSection(creativeSolutionSection);
                setItems(creativeSolutionSection.items?.length ? creativeSolutionSection.items : []);
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
    // 1-2 = feature blocks, 3 = floating badge card on the image.
    const features = items.length ? items.slice(0, 2) : fallbackFeatures;
    const badge = items.length ? items[2] : fallbackBadge;

    const iconSrc = (item, fallbackSrc) => (items.length ? mediaUrl(item.icon) : (item?.icon || fallbackSrc));

    return (
        <>
            <section className="bg-[var(--dark-bg)] py-[60px]">
                <div className="container">
                    <div className="grid grid-cols-12 lg:gap-11 gap-4">
                        <div className="lg:col-span-6 col-span-12">
                            <h6 className="uppercase font-medium text-[18px] leading-[100%] text-[var(--primary-color)] w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-[var(--primary-color)] after:right-[-40px] after:top-[8px] mb-5">{tagLabel}</h6>
                            <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-white mb-5">{title} <span className="text-[var(--primary-color)]"> {highlight} </span>.</h3>
                            <p className="text-[20px] text-white font-normal leading-[25px]">{description}</p>
                            <div className="mt-[30px]"></div>

                            {features.map((item) => (
                                <div className="flex items-center p-[20px] rounded-xl border border-gray-700 mb-4" key={item.id}>
                                    <img
                                        src={iconSrc(item, "/assets/img/team-goal.png")}
                                        alt={item.title}
                                        className="mr-5"
                                    />
                                    <div className="">
                                        <h5 className="text-[20px] text-white font-semibold leading-[25px] mb-4">{item.title}</h5>
                                        <p className="text-[18px] text-white font-normal leading-[25px]">{item.description}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-[40px]"></div>
                            <a href={buttonLink} className="block">
                                <button className="mt-[25px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] text-[20px] w-full text-center justify-center font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                            </a>
                        </div>
                        <div className="lg:col-span-6 col-span-12 relative">
                            <img
                                src={sideImage}
                                alt="image"
                                className="object-cover h-[100%] rounded-xl"
                            />
                            {badge && (
                                <div className="absolute lg:bottom-[30px] bottom-[0px] lg:left-[30px] left-[0px] lg:block hidden">
                                    <div className="">
                                        <div className="flex items-center p-[20px] rounded-xl bg-white w-[80%]">
                                            <img
                                                src={iconSrc(badge, "/assets/img/approach.png")}
                                                alt={badge.title}
                                                className="mr-5"
                                            />
                                            <div className="">
                                                <h5 className="text-[20px] text-[var(--text-color1)] font-semibold leading-[25px]">{badge.title}</h5>
                                                <p className="text-[18px] text-[var(--text-color2)] font-normal leading-[25px]">{badge.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}