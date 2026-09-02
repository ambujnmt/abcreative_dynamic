import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCube, FaCog, FaRegComments } from "react-icons/fa";
import { Link } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import TrustedCompanies from "./TrustedCompanies";
import { fetchPageBySlug, getSection, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// page/sections are empty, so the layout never looks broken.
const fallbackPage = {
    banner_title: "Rendering",
    banner_subtitle: "Let your business-to-business project stand out to potential investors by using our 3D rendering service.",
};

const fallbackIntro = {
    tag_label: "Rendering",
    title: "Rendering in our projects",
};

// Each item's description supports inline HTML (an <a> link mid-sentence),
// typed directly in the admin panel's paragraph field.
const fallbackIntroPoints = [
    { id: "p1", description: 'Do you want to see how our <a href="#" class="text-[var(--primary-color)] underline">3D design</a> service can get your idea off the ground?' },
    { id: "p2", description: 'How can <a href="#" class="text-[var(--primary-color)] underline">3D renderings</a> help you to persuade your investors?' },
    { id: "p3", description: 'Our <a href="#" class="text-[var(--primary-color)] underline">product rendering</a> service is ready to help you get photo-realistic animation and renders.' },
    { id: "p4", description: 'See how our 3D <a href="#" class="text-[var(--primary-color)] underline">stylized renders</a> can graphically simplify your concept.' },
    { id: "p5", description: 'Want to see how our 3D <a href="#" class="text-[var(--primary-color)] underline">solar park visualization</a> service works?' },
    { id: "p6", description: 'See how <a href="#" class="text-[var(--primary-color)] underline">warehouse visualization</a> can convince your investors and stakeholders.' },
];

const fallbackRecentClients = [
    { id: "c1", title: "Padel Tennis Club for T3S BV.", link: "#" },
    { id: "c2", title: "3D visuals for Vitrotem.", link: "#" },
    { id: "c3", title: "Amstelwijck and Tripkouw solarparks for HVC Group.", link: "#" },
];

const fallbackContactCard = {
    title: "Let's talk about 3D design",
    description: "We are unique in that this is what we can help you with your project!",
    button_text: "Rendering project",
};

const fallbackWhy = {
    tag_label: "01",
    title: "Why rendering?",
    description: "When you can't find the right images online for your project, even on Google, custom-made 3D renders are an option to consider. That's why you are reading this page, right? We can create photorealistic 3D renders from your project data. Our 3D rendering service will provide you with top-class marketing material for your project in development! From a well-made 3D model, you can have a series of 3D renders from many camera angles using different lighting setups and material options. It's just perfect for comparing options!",
};

const fallbackWhyChecklist = [
    { id: "w1", title: "Enhance your project presentation materials." },
    { id: "w2", title: "Give your project more impact with 3D renders." },
    { id: "w3", title: "Quickly apply several changes to every iteration." },
    { id: "w4", title: "One model leads to a series of 3D renders from any angle." },
];

const fallbackWorkflow = {
    tag_label: "02",
    title: "Workflow",
    description: "3D rendering is one of the output stages at the ABCreative rendering bureau. Preview renders occur early on and throughout the project, and final renders at the end after client-requested changes. We proudly use the Dutch open-source 3D software called Blender. Once we have a 3D design model to work with, textures make the object appear solid. We add lighting, environment, and movement for extra realism. Then, with a few props, we start rendering. Rendering images from multiple camera angles gives alternative viewpoints. Rendering still images takes seconds to minutes or even hours per image. For 3D animation, thousands of frames must render for hours or overnight using our in-house custom-made render farm. We regularly use Adobe during the post-production phase.",
    // The closing paragraph shown after the timeline reuses the section's
    // "subtitle" field (not used for a highlighted word on this page).
    subtitle: "Professional 3D design models produced by ABCreative specifically for your project will be appropriately textured and lit, leading to a whole set of related 3D renders to supplement the presentation of your project. The placement of virtual cameras around the model means we can have multiple views with various lighting conditions. Imagine how compelling your marketing material would be if ABCreative rendered your project. We're hands-on, and our nonsense approach gets the job done on time and within budget. That's why our B2B clients return again and again. You direct us, and we produce just what you need!",
};

// Each step's "title" is the bold lead-in text (optional), "description"
// is the rest of the sentence.
const fallbackWorkflowSteps = [
    { id: "s1", title: "You share your project purpose,", description: "expectations & deadlines." },
    { id: "s2", title: "", description: "Both you and we get our questions answered." },
    { id: "s3", title: "", description: "We give a price indication." },
    { id: "s4", title: "", description: "For long projects, we ask for payment in stages." },
    { id: "s5", title: "", description: "On the price agreement, you provide us with project data." },
    { id: "s6", title: "We start work", description: "following the best workflow for the project." },
    { id: "s7", title: "We provide regular updates", description: "using email, calls, or meetings." },
    { id: "s8", title: "", description: "We provide preview visuals via email or Vimeo for animation." },
    { id: "s9", title: "", description: "Your comments lead to changes professionally handled." },
    { id: "s10", title: "", description: "Several preview phases pass before handing over a final product." },
    { id: "s11", title: "", description: "Post-production with voice-over and subtitles, are options." },
    { id: "s12", title: "", description: "We deliver final versions." },
];

const fallbackNeeds = {
    title: "Your rendering may need",
};

const fallbackNeedsCards = [
    { id: "n1", image: "/assets/img/Animation.jpg", title: "Animation", description: "Animation Showcase your latest development, product, or services with our 3D animation service.", link: "/animation" },
    { id: "n2", image: "/assets/img/Modeling.jpg", title: "Modeling", description: "Have our 3D modeling service make an accurate digital representation of your project.", link: "/modeling" },
    { id: "n3", image: "/assets/img/Visualization.jpg", title: "Visualization", description: "3D visualizations are computer-generated images that create the illusion of three-dimensional space.", link: "/visualization" },
];

export default function Rendering() {

    const [page, setPage] = useState(null);
    const [introSection, setIntroSection] = useState(null);
    const [introPoints, setIntroPoints] = useState([]);
    const [recentClients, setRecentClients] = useState([]);
    const [contactCard, setContactCard] = useState(null);
    const [whySection, setWhySection] = useState(null);
    const [whyChecklist, setWhyChecklist] = useState([]);
    const [workflowSection, setWorkflowSection] = useState(null);
    const [workflowSteps, setWorkflowSteps] = useState([]);
    const [needsSection, setNeedsSection] = useState(null);
    const [needsCards, setNeedsCards] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('rendering');
            if (!pageData) return;
            setPage(pageData);

            const intro = getSection(pageData, 'rendering_intro');
            if (intro) {
                setIntroSection(intro);
                setIntroPoints(intro.items?.length ? intro.items : []);
            }

            const recent = getSection(pageData, 'rendering_recent_clients');
            if (recent) setRecentClients(recent.items?.length ? recent.items : []);

            const contact = getSection(pageData, 'rendering_contact_card');
            if (contact) setContactCard(contact);

            const why = getSection(pageData, 'rendering_why');
            if (why) {
                setWhySection(why);
                setWhyChecklist(why.items?.length ? why.items : []);
            }

            const workflow = getSection(pageData, 'rendering_workflow');
            if (workflow) {
                setWorkflowSection(workflow);
                setWorkflowSteps(workflow.items?.length ? workflow.items : []);
            }

            const needs = getSection(pageData, 'rendering_needs');
            if (needs) {
                setNeedsSection(needs);
                setNeedsCards(needs.items?.length ? needs.items : []);
            }
        };
        loadData();
    }, []);

    const bannerTitle = page?.banner_title || fallbackPage.banner_title;
    const bannerSubtitle = page?.banner_subtitle || fallbackPage.banner_subtitle;

    const introTag = introSection?.tag_label || fallbackIntro.tag_label;
    const introTitle = introSection?.title || fallbackIntro.title;
    const points = introPoints.length ? introPoints : fallbackIntroPoints;

    const clients = recentClients.length ? recentClients : fallbackRecentClients;

    const cardTitle = contactCard?.title || fallbackContactCard.title;
    const cardDescription = contactCard?.description || fallbackContactCard.description;
    const cardButtonText = contactCard?.button_text || fallbackContactCard.button_text;

    const whyTag = whySection?.tag_label || fallbackWhy.tag_label;
    const whyTitle = whySection?.title || fallbackWhy.title;
    const whyDescription = whySection?.description || fallbackWhy.description;
    const checklist = whyChecklist.length ? whyChecklist : fallbackWhyChecklist;

    const workflowTag = workflowSection?.tag_label || fallbackWorkflow.tag_label;
    const workflowTitle = workflowSection?.title || fallbackWorkflow.title;
    const workflowDescription = workflowSection?.description || fallbackWorkflow.description;
    const workflowClosing = workflowSection?.subtitle || fallbackWorkflow.subtitle;
    const steps = workflowSteps.length ? workflowSteps : fallbackWorkflowSteps;

    const needsTitle = needsSection?.title || fallbackNeeds.title;
    const needCards = needsCards.length ? needsCards : fallbackNeedsCards;
    const isDynamicNeeds = needsCards.length > 0;

    return (
        <>
            {/* Breadcrumb section */}
            <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/img/breadcrumb-img.png"
                    alt="Company Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-center pt-[30px]">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        {bannerTitle}
                    </h1>
                    <p className="text-white max-w-2xl mx-auto pb-5 text-[18px]">{bannerSubtitle}</p>

                    <div className="flex items-center justify-center gap-2 text-white text-[16px] font-medium">
                        <Link href="/" className="text-white">Home</Link>
                        <IoIosArrowForward size={16} />
                        <span className="text-[var(--primary-color)]">
                            {bannerTitle}
                        </span>
                    </div>
                </div>
            </div>
            {/* // Breadcrumb section */}


            {/* Page start here */}
            <main className="bg-[#f6f9fa] text-[#172031]">

                {/* Intro Section */}
                <section className="container py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

                        {/* Left Content */}
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-4">
                                <h6 className="uppercase font-medium text-[18px] leading-[100%] text-[var(--primary-color)] w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-[var(--primary-color)] after:right-[-40px] after:top-[8px] mb-3">{introTag}</h6>
                            </div>
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"> {introTitle} </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">
                                {points.map((point) => (
                                    <p key={point.id} dangerouslySetInnerHTML={{ __html: point.description }} />
                                ))}
                            </div>

                            {/* Recent Clients */}
                            <div className="mt-16">
                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"> Recent clients </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {clients.map((client) => (
                                        <Link href={client.link || "#"} className="group flex items-center gap-3 text-[var(--primary-color)]" key={client.id}>
                                            <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] group-hover:scale-150 transition"></span>
                                            {client.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating Contact Card */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <div className="relative overflow-hidden rounded-[28px] bg-[#142536] p-8 sm:p-10 text-white shadow-[0_25px_60px_rgba(20,37,54,0.2)]">
                                    <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border-[25px] border-[#35b3c3]/20"></div>
                                    <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full border-[30px] border-white/5"></div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#35b3c3] mb-8">
                                            <FaCube className="text-2xl" />
                                        </div>

                                        <h3 className="text-2xl font-bold leading-tight mb-5">
                                            {cardTitle}
                                        </h3>

                                        <p className="text-white/70 font-normal leading-[25px] text-[16px]">
                                            {cardDescription}
                                        </p>

                                        <div className="mt-8 h-px bg-white/15"></div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-sm text-white/60">
                                                {cardButtonText}
                                            </span>

                                            <IoIosArrowForward className="text-[#35b3c3]" size={22} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Why Rendering Section */}
                <section className="relative bg-[url('/assets/img/bg1.jpg')] bg-cover bg-center bg-fixed text-white">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/80"></div>

                    {/* Content */}
                    <div className="container py-16 lg:py-24 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

                            <div className="lg:col-span-4">
                                <span className="text-[var(--primary-color)] text-sm font-bold uppercase tracking-[0.2em]">
                                    {whyTag}
                                </span>

                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5">
                                    {whyTitle}
                                </h3>
                            </div>

                            <div className="lg:col-span-8">
                                <p className="text-white/90 text-[16px] font-normal leading-[25px]">
                                    {whyDescription}
                                </p>

                                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90 text-[16px] font-normal leading-[25px]">
                                    {checklist.map((item) => (
                                        <li className="flex gap-3" key={item.id}>
                                            <span className="text-[var(--primary-color)]">✓</span>
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>


                {/* Workflow Section */}
                <section className="container py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

                        <div className="lg:col-span-4">
                            <span className="text-[#35aeba] text-sm font-bold uppercase tracking-[0.2em]">
                                {workflowTag}
                            </span>
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5 text-[var(--text-color1)]"> {workflowTitle} </h3>

                            <div className="hidden lg:block mt-8 w-24 h-1 bg-[#35b3c3]"></div>
                        </div>

                        <div className="lg:col-span-8">
                            <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">
                                {workflowDescription}
                            </p>

                            <div className="relative mt-10 pl-8 border-l-2 border-[#b9dce1]">
                                <div className="space-y-6 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">
                                    {steps.map((step) => (
                                        <div className="relative" key={step.id}>
                                            <span className="absolute -left-[43px] top-2 w-5 h-5 rounded-full bg-[#35b3c3] border-4 border-[#f6f9fa]"></span>
                                            <p>
                                                {step.title && (
                                                    <span className="font-bold text-[#172031]">
                                                        {step.title}{" "}
                                                    </span>
                                                )}
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px] mt-10">
                                {workflowClosing}
                            </p>
                        </div>
                    </div>
                </section>


                {/* Your rendering may need */}
                <section className="bg-[#eef7f8] py-14">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5 text-[var(--text-color1)]"> {needsTitle} </h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {needCards.map((card) => {
                                const imageSrc = isDynamicNeeds ? mediaUrl(card.image) : card.image;

                                return (
                                    <div className="group relative min-h-[360px] rounded-[28px] overflow-hidden bg-[#102536]" key={card.id}>
                                        <Link href={card.link || "#"}>
                                            <img
                                                src={imageSrc}
                                                alt={card.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-700"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#102536] via-[#102536]/30 to-transparent"></div>

                                            <div className="relative z-10 h-full min-h-[360px] flex flex-col justify-end p-7 text-white">
                                                <h3 className="font-semibold text-[30px] mb-3">
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm leading-7 text-white/80 font-normal">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* Trusted Companies */}
                <TrustedCompanies />
                {/* // Trusted Companies */}
            </main>
            {/* // Page end here */}
        </>
    );
}