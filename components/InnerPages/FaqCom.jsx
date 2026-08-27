"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FaqCom() {
    const [openFaq, setOpenFaq] = useState(1);

    return (
        <>
            <section className="bg-slate-50">
                    <div className="container">
                        <div className="flex flex-col items-center"> 
                            <h2 className="mt-6 font-semibold lg:text-[40px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-10">
                                Here’s some answers to our most common questions
                            </h2>
                        </div>
            
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-6">
                                <img
                                    src="https://render-vision.com/wp-content/uploads/2026/06/augmented-reality-architecture-design-review.webp"
                                    alt="image"
                                    className="w-full h-[600px] rounded-xl object-cover"
                                />
                            </div>    
                            <div className="col-span-12 lg:col-span-6">
                                <div className=""> 
                                    {/* Q1 */}
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(openFaq === 1 ? 0 : 1)}
                                            className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                        >
                                            <span className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                Q1
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                What does abcreative do?
                                            </h3>
                                            </span>
                                            <FaChevronDown
                                            className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${
                                                openFaq === 1 ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === 1
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D Modeling for multiple purposes
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D Animation
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D visualization
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D Rendering various styles and applications
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Big scene visualization
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Port visualization
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Confidential projects
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Product visualization
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Archviz
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Convert 2D CAD into 3D models
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        VR and VR assets
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D environment model
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Post-production voice-over, synchronized text, music
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    {/* Q2 */}
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(openFaq === 2 ? 0 : 2)}
                                            className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                        >
                                            <span className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                Q2
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                For what do clients come to abcreative?
                                            </h3>
                                            </span>
                                            <FaChevronDown
                                            className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${
                                                openFaq === 2 ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === 2
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D modeling service leading to photorealistic images and animation
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D animated audio-visual movie clips as useful marketing tools
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D visualization of products and project operations
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D photo-realistic presentation materials needed for marketing
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Visualization services for projects, and products under development
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Projects large or small: 10km environment to a piece of jewelry
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Detailed technical 3D animation for confidential tender applications
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Conceptual ideas turned into 3D animated presentations
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D animation and visualization of themed snow and ice playgrounds
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Development of VR assets for a game engine with physical properties
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Development of 3D environments for walkthrough, fly-over, or training
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    {/* Q3 */}
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(openFaq === 3 ? 0 : 3)}
                                            className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                        >
                                            <span className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                Q3
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                what do you need to get started?
                                            </h3>
                                            </span>
                                            <FaChevronDown
                                            className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${
                                                openFaq === 3 ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === 3
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Your purpose for using 3D services, goals, products
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        3D Animation: simple text doc what you want = storyboard
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Reference materials in any form, sketches or concept drawings
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Detailed 2D CAD information
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Complete or partly complete 3D models from any software package
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Actually, with more or less information, we can produce a presentation
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    {/* Q4 */}
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(openFaq === 4 ? 0 : 4)}
                                            className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                        >
                                            <span className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                Q4
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                How much time per project?
                                            </h3>
                                            </span>
                                            <FaChevronDown
                                            className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${
                                                openFaq === 4 ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === 4
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Short projects may take just a few days to complete
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        2-3 mins of animation take approx 2-6 weeks
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Longer projects can take eight weeks or more
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Rendering takes place on the render farm
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    {/* Q5 */}
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(openFaq === 5 ? 0 : 5)}
                                            className="flex w-full items-center justify-between gap-3 p-6 text-left"
                                        >
                                            <span className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-bold text-white">
                                                Q5
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                                What's the next step?
                                            </h3>
                                            </span>
                                            <FaChevronDown
                                            className={`h-3.5 w-3.5 flex-none text-[var(--primary-color)] transition-transform duration-300 ${
                                                openFaq === 5 ? "rotate-180" : ""
                                            }`}
                                            />
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === 5
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-2 px-6 pb-6">
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Contact us to discuss your project
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Best approach per project, deadline, budget
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        Written proposal and price quotation
                                                    </span>
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                                        If agreed, we start!
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    )
}
