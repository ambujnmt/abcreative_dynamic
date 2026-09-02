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
    banner_title: "Visualization",
    banner_subtitle: "Add credibility to your internal team conversations and external investor presentations with high-quality 3D visualizations for all B2B developments.",
};

const fallbackIntro = {
};

const fallbackCaseStudies = [

];

const fallbackContactCard = {
  
};

// Two image+content blocks below the intro. Each item's description
// supports inline HTML (an <a> link mid-sentence), typed directly in the
// admin panel's paragraph field.
const fallbackContentBlocks = [
  
];

const fallbackWorkflow = {
};

const fallbackWorkflowSteps = [
];

const fallbackDeliverables = {
};

const fallbackDeliverableItems = [
];

const fallbackNeeds = {
};

const fallbackNeedsCards = [
];

export default function Visualization() {

    const [page, setPage] = useState(null);
    const [introSection, setIntroSection] = useState(null);
    const [caseStudies, setCaseStudies] = useState([]);
    const [contactCard, setContactCard] = useState(null);
    const [contentBlocksSection, setContentBlocksSection] = useState(null);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [workflowSection, setWorkflowSection] = useState(null);
    const [workflowSteps, setWorkflowSteps] = useState([]);
    const [deliverablesSection, setDeliverablesSection] = useState(null);
    const [deliverableItems, setDeliverableItems] = useState([]);
    const [needsSection, setNeedsSection] = useState(null);
    const [needsCards, setNeedsCards] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('visualization');
            if (!pageData) return;
            setPage(pageData);

            const intro = getSection(pageData, 'visualization_intro');
            if (intro) setIntroSection(intro);

            const cases = getSection(pageData, 'visualization_case_studies');
            if (cases) setCaseStudies(cases.items?.length ? cases.items : []);

            const contact = getSection(pageData, 'visualization_contact_card');
            if (contact) setContactCard(contact);

            const blocksSection = getSection(pageData, 'visualization_content_blocks');
            if (blocksSection) {
                setContentBlocksSection(blocksSection);
                setContentBlocks(blocksSection.items?.length ? blocksSection.items : []);
            }

            const workflow = getSection(pageData, 'visualization_workflow');
            if (workflow) {
                setWorkflowSection(workflow);
                setWorkflowSteps(workflow.items?.length ? workflow.items : []);
            }

            const deliverables = getSection(pageData, 'visualization_deliverables');
            if (deliverables) {
                setDeliverablesSection(deliverables);
                setDeliverableItems(deliverables.items?.length ? deliverables.items : []);
            }

            const needs = getSection(pageData, 'visualization_needs');
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
    const introDescription = introSection?.description || fallbackIntro.description;

    const cases = caseStudies.length ? caseStudies : fallbackCaseStudies;

    const cardTitle = contactCard?.title || fallbackContactCard.title;
    const cardDescription = contactCard?.description || fallbackContactCard.description;

    const isDynamicBlocks = contentBlocks.length > 0;
    const blocks = isDynamicBlocks
        ? contentBlocks.map((b) => ({
            id: b.id,
            image: mediaUrl(b.image),
            title: b.title,
            description: b.description,
            // subheading + extra points are stored together in count_text as
            // "Subheading text||point 1||point 2||point 3"
            subheading: b.count_text ? b.count_text.split("||")[0] : "",
            extra_points: b.count_text ? b.count_text.split("||").slice(1) : [],
            image2: null,
        }))
        : fallbackContentBlocks;

    const workflowTitle = workflowSection?.title || fallbackWorkflow.title;
    const workflowClosing = workflowSection?.description || fallbackWorkflow.closing_paragraph;
    const steps = workflowSteps.length ? workflowSteps : fallbackWorkflowSteps;

    const deliverablesTitle = deliverablesSection?.title || fallbackDeliverables.title;
    const deliverablesImage = deliverablesSection?.image ? mediaUrl(deliverablesSection.image) : fallbackDeliverables.image;
    const deliverables = deliverableItems.length ? deliverableItems : fallbackDeliverableItems;

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

                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-10 gap-y-5 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">
                                <p dangerouslySetInnerHTML={{ __html: introDescription }} />
                            </div>

                            {/* case studies */}
                            <div className="mt-16">
                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"> Other case studies: </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                                    {cases.map((c) => (
                                        <Link href={c.link || "#"} className="group flex items-center gap-3 text-[var(--primary-color)]" key={c.id}>
                                            <span className="w-2 h-2 rounded-full bg-[var(--primary-color)] group-hover:scale-150 transition"></span>
                                            {c.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Content blocks (image + heading + paragraph, optional subheading + extra points) */}
                            {blocks.map((block) => (
                                <div className="mt-[50px]" key={block.id}>
                                    <div className="">
                                        <img
                                            src={block.image}
                                            alt="image"
                                            className="w-full h-auto mb-[30px] rounded-xl"
                                        />
                                    </div>
                                    <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"> {block.title} </h3>
                                    <p
                                        className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]"
                                        dangerouslySetInnerHTML={{ __html: block.description }}
                                    />

                                    {block.subheading && (
                                        <>
                                            <div className="mt-5"></div>
                                            <h5 className="font-semibold text-[25px] leading-[100%] text-[var(--text-color1)] mb-4">{block.subheading}</h5>
                                            {block.extra_points?.map((point, i) => (
                                                <p key={i} className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]" dangerouslySetInnerHTML={{ __html: point }} />
                                            ))}
                                        </>
                                    )}

                                    {block.image2 && (
                                        <div className="">
                                            <img
                                                src={block.image2}
                                                alt="image"
                                                className="w-full h-auto mt-5 mb-[30px] rounded-xl"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Workflow Section */}
                <section className="container pb-[80px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

                        <div className="lg:col-span-4">
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5 text-[var(--text-color1)]"> {workflowTitle} </h3>

                            <div className="hidden lg:block mt-8 w-24 h-1 bg-[#35b3c3]"></div>
                        </div>

                        <div className="lg:col-span-8">
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


                {/* Deliverables */}
                <div className="container mb-[60px]">
                    <div className="grid grid-cols-12 lg:gap-10 gap-4">
                        <div className="col-span-12 lg:col-span-5">
                            <img
                                src={deliverablesImage}
                                alt="Visualization"
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-7">
                            <div className="">
                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5"> {deliverablesTitle} </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {deliverables.map((item) => (
                                        <p key={item.id} className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Your Visualization May Need */}
                <section className="bg-[#eef7f8] py-14">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] mb-5 text-[var(--text-color1)]">{needsTitle} </h3>
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