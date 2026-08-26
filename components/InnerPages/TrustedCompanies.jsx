import React, { useEffect, useState } from 'react';
import { Link } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchPageBySlug, getSection, fetchClients, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// section/clients are empty, so the layout never looks broken.
const fallbackSection = {
    title: "ABCreative services trusted by teams at companies including...",
    button_text: "See Cases",
    button_link: "#",
};

const fallbackClients = [
    { id: 1, logo: "/assets/img/com-logo1.png", name: "Client 1" },
    { id: 2, logo: "/assets/img/com-logo2.png", name: "Client 2" },
    { id: 3, logo: "/assets/img/com-logo3.png", name: "Client 3" },
    { id: 4, logo: "/assets/img/com-logo4.png", name: "Client 4" },
    { id: 5, logo: "/assets/img/com-logo5.png", name: "Client 5" },
    { id: 6, logo: "/assets/img/com-logo6.png", name: "Client 6" },
    { id: 7, logo: "/assets/img/com-logo7.png", name: "Client 7" },
    { id: 8, logo: "/assets/img/com-logo8.png", name: "Client 8" },
    { id: 9, logo: "/assets/img/com-logo9.png", name: "Client 9" },
    { id: 10, logo: "/assets/img/com-logo10.png", name: "Client 10" },
];

export default function TrustedCompanies() {

    const [section, setSection] = useState(null);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('home');
            const trustedSection = getSection(pageData, 'trusted_companies');
            if (trustedSection) setSection(trustedSection);

            const clientsData = await fetchClients();
            if (clientsData.length) setClients(clientsData);
        };
        loadData();
    }, []);

    const title = section?.title || fallbackSection.title;
    const buttonText = section?.button_text || fallbackSection.button_text;
    const buttonLink = section?.button_link || fallbackSection.button_link;
    const logos = clients.length ? clients : fallbackClients;

    return (
        <>
            <section className="bg-white">
                    <div className="container">
                        <div className="grid grid-cols-12 lg:gap-8 gap-4 items-center">
                            <div className="lg:col-span-6 col-span-12">
                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5 text-[var(--text-color1)] lg:mt-0 mt-[40px]"> {title} </h3>
                                <a href={buttonLink}>
                                    <button className="mt-[25px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{buttonText} &nbsp; <FaArrowRightLong /></button>
                                </a>
                            </div>
                            <div className="lg:col-span-6 col-span-12 bg-[url('/assets/img/pattern-img.png')] bg-cover bg-center lg:px-10 px-4 py-[50px]">
                                <div className="grid grid-cols-12 gap-4">
                                    {logos.map((client) => (
                                        <div className="col-span-6 lg:col-span-4" key={client.id}>
                                            <img
                                                src={clients.length ? mediaUrl(client.logo) : client.logo}
                                                alt={client.name || "Client logo"}
                                                className="w-full h-auto shadow-[0px_5px_10px_rgba(0,0,0,0.15)] rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    )
}