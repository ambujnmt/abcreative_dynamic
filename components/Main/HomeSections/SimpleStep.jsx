import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, mediaUrl } from '../../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/items are empty, so the layout never looks broken.
const fallbackSection = {

};

// Each step uses both image fields:
//   icon  = the small step-number badge (step1.png)
//   image = the step illustration (step1-img.png)
const fallbackSteps = [

];

export default function SimpleStep() {

    const [section, setSection] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const simpleStepSection = getSection(pageData, 'simple_step');

            if (simpleStepSection) {
                setSection(simpleStepSection);
                setItems(simpleStepSection.items?.length ? simpleStepSection.items : []);
            }
        };
        loadData();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const title = section?.title || fallbackSection.title;
    const description = section?.description || fallbackSection.description;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;
    const steps = items.length ? items : fallbackSteps;

    return (
        <>
            <section className="bg-[#F9FAFC] py-[50px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 flex justify-center mb-[50px]">
                            <div className="max-w-3xl text-center">
                                <h6 className="block m-auto w-max text-[18px] leading-[100%] text-[var(--primary-color)] relative before:content-[''] before:absolute before:w-[40px] before:h-[4px] before:bg-[var(--primary-color)] before:top-[7px] before:left-[-50px] after:content-[''] after:absolute after:bg-[var(--primary-color)] after:w-[40px] after:h-[4px] after:top-[7px] after:right-[-50px] uppercase mb-4">{tagLabel}</h6>
                                <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{title}</h3>
                                <p className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">{description}</p>
                            </div>
                        </div>

                        {steps.map((step) => {
                            const badgeSrc = items.length ? mediaUrl(step.icon) : step.icon;
                            const illustrationSrc = items.length ? mediaUrl(step.image) : step.image;

                            return (
                                <div className="lg:col-span-4 md:col-span-6 col-span-12" key={step.id}>
                                    <div className="text-center">
                                        <img
                                            src={badgeSrc}
                                            alt={step.title}
                                            className="block m-auto mb-10"
                                        />
                                        <img
                                            src={illustrationSrc}
                                            alt={step.title}
                                            className="block m-auto mb-10"
                                        />
                                        <h5 className="text-[20px] text-[var(--text-color1)] font-semibold leading-[25px] mb-3">{step.title}</h5>
                                        <p className="text-[18px] text-[var(--text-color1)] font-normal leading-[25px]">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="col-span-12 block m-auto">
                            <a href={buttonLink}>
                                <button className="mt-[25px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}