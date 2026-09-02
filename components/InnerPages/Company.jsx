"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCube, FaUsers, FaAward, FaFilm, FaDraftingCompass, FaShip, FaSolarPanel, FaWarehouse, FaChartLine, FaCheckCircle, FaHeadset, FaArrowRight, FaBolt, FaClipboardList, FaCommentDots, FaBoxOpen, FaVideo, FaHandshake, FaRocket, FaClock, FaFileInvoiceDollar, FaSyncAlt, FaTruck, FaChevronDown } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { SiGooglemarketingplatform } from "react-icons/si";
import { FaTableTennis } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "@heroui/react";
import FaqCom from "./FaqCom";
import { fetchPageBySlug, getSection, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if the admin panel
// page/sections are empty, so the layout never looks broken.
// NOTE: the decorative React icons (FaFilm, FaCube, FaShip, etc.) stay
// STATIC throughout this page — they are not uploaded images, so they
// are not wired to the admin panel. Only real photos (hero image, team
// photos, the artstation showcase image) come from the admin panel.

const fallbackHero = {
};

const fallbackHeroStats = [
];

const fallbackHeroBadge = { };

const fallbackIntro = {
};

const fallbackIntroPills = [
];

const introIcons = [FaFilm, FaDraftingCompass, FaVideo];
const fallbackIntroCards = [
 ];

const fallbackTeamHeading = { title: "ABCreative is the ideal 3D Partner", description: "A small, senior team that treats every project like it's our own." };
const fallbackTeam = [
];

const expertiseIcons = [FaCube, FaHandshake];
const fallbackExpertise = [
];

const fallbackCasesHeading = { title: "Some project cases", description: "A snapshot of the industries and clients we've brought into 3D." };
const caseIcons = [FaShip, FaShip, FaDraftingCompass, FaCube, FaBolt, FaFilm, FaWarehouse, FaWarehouse, FaSolarPanel, FaWarehouse, HiMiniSquare3Stack3D, SiGooglemarketingplatform, FaTableTennis];
const fallbackCases = [
 ];
const fallbackCasesImage = "https://cdna.artstation.com/p/assets/images/images/026/909/610/large/gourav-soni-untitled1.jpg?1590064512";

const fallbackProjectTypesHeading = { };
const fallbackProjectTypes = [
 ];
const fallbackProjectTypesImage = "https://cdna.artstation.com/p/assets/images/images/026/909/610/large/gourav-soni-untitled1.jpg?1590064512";

const fallbackWorkflow = {
};
const fallbackWorkflowItems = [
];

const fallbackDeliverables = {
  };
const deliverableSpecIcons = [FaCube, FaFilm, FaVideo, FaDraftingCompass];
const fallbackDeliverableSpecs = [
  ];
const fallbackDeliverableChecklist = [

];

const fallbackFinalCta = {
   
};

export default function Company() {

    const [page, setPage] = useState(null);
    const [hero, setHero] = useState(null);
    const [heroStats, setHeroStats] = useState([]);
    const [heroBadge, setHeroBadge] = useState(null);
    const [intro, setIntro] = useState(null);
    const [introPills, setIntroPills] = useState([]);
    const [introCards, setIntroCards] = useState([]);
    const [teamHeading, setTeamHeading] = useState(null);
    const [team, setTeam] = useState([]);
    const [expertise, setExpertise] = useState([]);
    const [casesHeading, setCasesHeading] = useState(null);
    const [cases, setCases] = useState([]);
    const [casesImage, setCasesImage] = useState(null);
    const [projectTypesHeading, setProjectTypesHeading] = useState(null);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectTypesImage, setProjectTypesImage] = useState(null);
    const [workflow, setWorkflow] = useState(null);
    const [workflowItems, setWorkflowItems] = useState([]);
    const [deliverables, setDeliverables] = useState(null);
    const [deliverableSpecs, setDeliverableSpecs] = useState([]);
    const [deliverableChecklist, setDeliverableChecklist] = useState([]);
    const [finalCta, setFinalCta] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const pageData = await fetchPageBySlug('company');
            if (!pageData) return;
            setPage(pageData);

            const heroSection = getSection(pageData, 'company_hero');
            if (heroSection) {
                setHero(heroSection);
                const items = heroSection.items || [];
                setHeroStats(items.slice(0, 3));
                if (items[3]) setHeroBadge(items[3]);
            }

            const introSection = getSection(pageData, 'company_intro');
            if (introSection) {
                setIntro(introSection);
                const items = introSection.items || [];
                setIntroPills(items.slice(0, 4));
                setIntroCards(items.slice(4, 7));
            }

            const teamSection = getSection(pageData, 'company_team');
            if (teamSection) {
                setTeamHeading(teamSection);
                setTeam(teamSection.items?.length ? teamSection.items : []);
            }

            const expertiseSection = getSection(pageData, 'company_expertise');
            if (expertiseSection) setExpertise(expertiseSection.items?.length ? expertiseSection.items : []);

            const casesSection = getSection(pageData, 'company_cases');
            if (casesSection) {
                setCasesHeading(casesSection);
                setCases(casesSection.items?.length ? casesSection.items : []);
                if (casesSection.image) setCasesImage(mediaUrl(casesSection.image));
            }

            const typesSection = getSection(pageData, 'company_project_types');
            if (typesSection) {
                setProjectTypesHeading(typesSection);
                setProjectTypes(typesSection.items?.length ? typesSection.items : []);
                if (typesSection.image) setProjectTypesImage(mediaUrl(typesSection.image));
            }

            const workflowSection = getSection(pageData, 'company_workflow');
            if (workflowSection) {
                setWorkflow(workflowSection);
                setWorkflowItems(workflowSection.items?.length ? workflowSection.items : []);
            }

            const deliverablesSection = getSection(pageData, 'company_deliverables');
            if (deliverablesSection) setDeliverables(deliverablesSection);

            const specsSection = getSection(pageData, 'company_deliverables_specs');
            if (specsSection) setDeliverableSpecs(specsSection.items?.length ? specsSection.items : []);

            const checklistSection = getSection(pageData, 'company_deliverables_checklist');
            if (checklistSection) setDeliverableChecklist(checklistSection.items?.length ? checklistSection.items : []);

            const ctaSection = getSection(pageData, 'company_final_cta');
            if (ctaSection) setFinalCta(ctaSection);
        };
        loadData();
    }, []);

    const bannerTitle = page?.banner_title || "Company";

    const heroTag = hero?.tag_label || fallbackHero.tag_label;
    const heroTitle = hero?.title || fallbackHero.title;
    const heroHighlight = hero?.subtitle || fallbackHero.subtitle;
    const heroDescription = hero?.description || fallbackHero.description;
    const heroImage = hero?.image ? mediaUrl(hero.image) : fallbackHero.image;
    const heroButtonText = hero?.button_text || fallbackHero.button_text;
    const stats = heroStats.length ? heroStats : fallbackHeroStats;
    const badge = heroBadge || fallbackHeroBadge;

    const introTitle = intro?.title || fallbackIntro.title;
    const introDescription = intro?.description || fallbackIntro.description;
    const pills = introPills.length ? introPills : fallbackIntroPills;
    const cards = introCards.length ? introCards : fallbackIntroCards;

    const teamTitle = teamHeading?.title || fallbackTeamHeading.title;
    const teamDescription = teamHeading?.description || fallbackTeamHeading.description;
    const isDynamicTeam = team.length > 0;
    const teamMembers = isDynamicTeam ? team : fallbackTeam;

    const expertiseItems = expertise.length ? expertise : fallbackExpertise;

    const casesTitle = casesHeading?.title || fallbackCasesHeading.title;
    const casesDescription = casesHeading?.description || fallbackCasesHeading.description;
    const caseItems = cases.length ? cases : fallbackCases;
    const casesShowcaseImage = casesImage || fallbackCasesImage;

    const typesTitle = projectTypesHeading?.title || fallbackProjectTypesHeading.title;
    const typeItems = projectTypes.length ? projectTypes : fallbackProjectTypes;
    const typesShowcaseImage = projectTypesImage || fallbackProjectTypesImage;

    const workflowTitle = workflow?.title || fallbackWorkflow.title;
    const workflowDescription = workflow?.description || fallbackWorkflow.description;
    const workflowCards = workflowItems.length ? workflowItems : fallbackWorkflowItems;

    const deliverablesTitle = deliverables?.title || fallbackDeliverables.title;
    const deliverablesDescription = deliverables?.description || fallbackDeliverables.description;
    const specs = deliverableSpecs.length ? deliverableSpecs : fallbackDeliverableSpecs;
    const checklist = deliverableChecklist.length ? deliverableChecklist : fallbackDeliverableChecklist;

    const ctaTitle = finalCta?.title || fallbackFinalCta.title;
    const ctaDescription = finalCta?.description || fallbackFinalCta.description;
    const ctaButtonText = finalCta?.button_text || fallbackFinalCta.button_text;
    const ctaButtonLink = finalCta?.button_link || fallbackFinalCta.button_link;

    return (
        <>
            {/* Breadcrumb section */}
            <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
                <img
                    src="/assets/img/breadcrumb-img.png"
                    alt="Company Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 text-center pt-[30px]">
                    <h1 className="text-4xl font-bold text-white mb-3">{bannerTitle}</h1>
                    <div className="flex items-center justify-center gap-2 text-white text-[16px] font-medium">
                        <span>Home</span>
                        <IoIosArrowForward size={16} />
                        <span className="text-[var(--primary-color)]">{bannerTitle}</span>
                    </div>
                </div>
            </div>
            {/* // Breadcrumb section */}


            {/* Page start here */}
            <main className="w-full bg-white text-slate-800">
                {/* Section 1 - Hero */}
                <section className="bg-[#FBFCFD] py-[70px]">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="lg:col-span-6 md:col-span-6 col-span-12">
                                <h6 className="uppercase font-medium text-[18px] leading-[100%] text-[var(--primary-color)] w-max relative after:content-[''] after:absolute after:w-[30px] after:h-[2px] after:bg-[var(--primary-color)] after:right-[-40px] after:top-[8px] mb-5">{heroTag}</h6>
                                <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{heroTitle} <span className="text-[var(--primary-color)]"> {heroHighlight} </span></h3>
                                <p className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">{heroDescription}</p>

                                <div className="mt-[30px] flex justify-between bg-[#F1F8FA] py-[15px] px-[12px] rounded-xl shadow-[0px_5px_10px_rgba(0,0,0,0.15)]">
                                    {stats.map((s) => (
                                        <div className="flex items-center" key={s.id}>
                                            <div className="">
                                                <h5 className="text-[18px] font-semibold text-[var(--text-color1)] leading-[25px]">{s.count_text}</h5>
                                                <p className="text-[16px] font-normal text-[var(--text-color2)]">{s.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="mt-[40px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%]">{heroButtonText} &nbsp; <FaArrowRightLong /></button>
                            </div>
                            <div className="lg:col-span-6 md:col-span-6 col-span-12">
                                <div className="relative">
                                    <img
                                        src={heroImage}
                                        alt="image"
                                        className="rounded-xl w-full h-auto"
                                    />
                                    <div className="w-[60%] shadow-[0px_5px_10px_rgba(0,0,0,0.15)] rounded-xl border-l-3 border-l-[var(--primary-color)] p-5 absolute bottom-[-80px] left-[40px] bg-white">
                                        <FaAward className="h-6 w-6 flex-none text-[var(--primary-color)] mb-2" />
                                        <p className="text-[18px] italic text-[var(--text-color2)] font-medium leading-[25px]">{badge.title}</p>
                                        <p className="text-[16px] text-[var(--text-color2)] font-normal leading-[25px]">{badge.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // Section 1 */}


                {/* Section 2 */}
                <section className="py-20">
                    <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
                        <div>
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">
                                {introTitle}
                            </h3>
                            <p
                                className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]"
                                dangerouslySetInnerHTML={{ __html: introDescription }}
                            />
                            <div className="mt-8 flex flex-wrap gap-3">
                                {pills.map((p) => (
                                    <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-[16px] font-normal text-[var(--primary-color)]" key={p.id}>
                                        {p.title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {cards.map((c, i) => {
                                const Icon = introIcons[i % introIcons.length];
                                return (
                                    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-5 shadow-sm bg-indigo-50" key={c.id}>
                                        <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-xl bg-[var(--primary-color)] text-white">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[17px] font-bold text-slate-900">{c.title}</h3>
                                            <p className="mt-1 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">{c.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {/* // Section 2 */}


                {/* Section 3 - Team */}
                <section className="bg-slate-50">
                    <div className="container text-center">
                        <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{teamTitle}</h3>
                        <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">
                            {teamDescription}
                        </p>

                        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
                            {teamMembers.map((m, i) => (
                                <div className={`rounded-2xl bg-white p-6 shadow-md ${i === 1 ? "sm:-translate-y-6" : "sm:translate-y-0"}`} key={m.id}>
                                    <img
                                        src={isDynamicTeam ? mediaUrl(m.image) : m.image}
                                        alt={m.title}
                                        className="mx-auto h-[250px] w-[250px] rounded-full object-cover"
                                    />
                                    <h3 className="mt-5 text-[17px] mb-1 font-bold text-[var(--primary-color)]">
                                        {m.title}
                                    </h3>
                                    <p className="text-[14px] font-semibold text-[var(--text-color1)]">
                                        {m.subtitle}
                                    </p>
                                    <div className="flex justify-center mt-[15px]">
                                        <Link href="#" className="bg-[var(--primary-color)] text-white w-[30px] h-[30px] rounded-full text-[28px] mx-[4px] p-[10px]">
                                            <FaFacebookF className="text-[18px]" />
                                        </Link>
                                        <Link href="#" className="bg-[var(--primary-color)] text-white w-[30px] h-[30px] rounded-full text-[28px] mx-[4px] p-[10px]">
                                            <FaInstagram className="text-[18px]" />
                                        </Link>
                                        <Link href="#" className="bg-[var(--primary-color)] text-white w-[30px] h-[30px] rounded-full text-[28px] mx-[4px] p-[10px]">
                                            <FaLinkedinIn className="text-[18px]" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* // Section 3 */}


                {/* section 4 - Expertise */}
                <section className="py-20">
                    <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {expertiseItems.map((item, i) => {
                            const Icon = expertiseIcons[i % expertiseIcons.length];
                            return (
                                <div className="rounded-2xl border border-slate-100 p-5 shadow-sm bg-indigo-50" key={item.id}>
                                    <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-xl bg-[var(--primary-color)] text-white mb-5">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="text-[17px] font-bold text-slate-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>
                {/* // section 4 */}


                {/* section 5 - Project cases */}
                <section className="">
                    <div className="container">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                            <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{casesTitle}</h3>
                            <p className="max-w-sm text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">
                                {casesDescription}
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {caseItems.map((c, i) => {
                                const Icon = caseIcons[i % caseIcons.length];
                                return (
                                    <div className="rounded-2xl border-l-4 border-[var(--primary-color)] bg-white p-5 shadow-sm" key={c.id}>
                                        <div className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-xl bg-[var(--primary-color)] text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <p className="mt-3 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]" dangerouslySetInnerHTML={{ __html: c.description }} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {/* // section 5 */}


                {/* section 6 - Project types */}
                <section className="py-20">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                                <h3 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">{typesTitle}</h3>
                            </div>

                            {typeItems.map((t) => (
                                <div className="lg:col-span-4 col-span-12" key={t.id}>
                                    <div className="rounded-2xl border border-slate-100 p-5 shadow-sm bg-indigo-50 h-full">
                                        <p className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px] py-[8px]" dangerouslySetInnerHTML={{ __html: t.description }} />
                                    </div>
                                </div>
                            ))}

                            <div className="lg:col-span-4 col-span-12">
                                <div className="h-full">
                                    <img
                                        src={typesShowcaseImage}
                                        alt="image"
                                        className="w-full h-auto rounded-lg object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // section 6 */}


                {/* section 7 - Workflow */}
                <section className="bg-[var(--dark-bg)] px-4 py-20">
                    <div className="container">
                        <div className="text-left">
                            <h2 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-white sm:text-4xl">
                                {workflowTitle}
                            </h2>
                            <div
                                className="mx-auto mt-4 text-[16px] text-slate-300 font-normal leading-[25px]"
                                dangerouslySetInnerHTML={{ __html: workflowDescription }}
                            />
                        </div>

                        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {workflowCards.map((w) => (
                                <div className="rounded-2xl bg-white/5 p-6" key={w.id}>
                                    <p className="mt-2 text-[16px] text-slate-300 font-normal leading-[25px]">
                                        {w.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* // section 7 */}


                {/* section 8 - Deliverables */}
                <section className="py-20">
                    <div className="container">
                        <h2 className="font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">
                            {deliverablesTitle}
                        </h2>
                        <div
                            className="text-[16px] text-[var(--text-color1)] font-normal leading-[25px]"
                            dangerouslySetInnerHTML={{ __html: deliverablesDescription }}
                        />

                        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
                            {/* Left: deliverable-type spec list */}
                            <div className="space-y-6">
                                {specs.map((s, i) => {
                                    const Icon = deliverableSpecIcons[i % deliverableSpecIcons.length];
                                    return (
                                        <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-5 shadow-sm bg-indigo-50" key={s.id}>
                                            <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-xl bg-[var(--primary-color)] text-white">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <h3 className="text-[17px] font-bold text-slate-900">{s.title}</h3>
                                                <p className="mt-1 text-[16px] text-[var(--text-color1)] font-normal leading-[25px]">{s.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right: dark checklist card */}
                            <div className="rounded-3xl bg-[var(--dark-bg)] p-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                                    Included with every delivery
                                </h3>
                                <ul className="mt-6 space-y-4 text-sm text-slate-200">
                                    {checklist.map((item) => (
                                        <li className="flex items-start gap-3" key={item.id}>
                                            <FaCheckCircle className="mt-0.5 h-4 w-4 flex-none text-[var(--primary-color)]" />
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // section 8 */}


                {/* section 9 FAQ */}
                <FaqCom />
                {/* // Section 9 FAQ */}

                {/* section 10 - Final CTA */}
                <section className="container pb-20 pt-4 mt-10">
                    <div className="rounded-3xl bg-[var(--primary-color)] py-14 text-center shadow-2xl">
                        <h2 className="mt-4 font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-white sm:text-4xl">
                            {ctaTitle}
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[16px] text-white font-normal leading-[25px]">
                            {ctaDescription}
                        </p>
                        <a href={ctaButtonLink}>
                            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-slate-100 sm:text-base hover:text-[var(--primary-color)]">
                                {ctaButtonText}
                                <FaArrowRight className="h-3 w-3" />
                            </button>
                        </a>
                    </div>
                </section>
                {/* // section 10 */}
            </main>
            {/* // Page start here */}
        </>
    )
}