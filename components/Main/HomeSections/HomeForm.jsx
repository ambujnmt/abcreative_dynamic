"use client"
import React, { useEffect, useState } from 'react'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight } from "react-icons/hi"
import { fetchPageBySlug, getSection, fetchSettings, submitContactForm } from '../../../utils/abcreativeApi'

// Fallback content — used only while loading, or if settings/section are
// empty in the admin panel, so the layout never looks broken.
const fallbackSettings = {
   
};

const fallbackSection = {

   
};

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function HomeForm() {

    const [settings, setSettings] = useState(fallbackSettings);
    const [section, setSection] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null); // { status: true/false, message: "..." }

    useEffect(() => {
        const loadSettings = async () => {
            const data = await fetchSettings();
            if (data && Object.keys(data).length) {
                setSettings({
                    email: data.email || fallbackSettings.email,
                    phone: data.phone || fallbackSettings.phone,
                    address: data.address || fallbackSettings.address,
                });
            }
        };
        loadSettings();

        const loadSection = async () => {
            const pageData = await fetchPageBySlug('home');
            const homeFormSection = getSection(pageData, 'home_form');
            if (homeFormSection) {
                setSection(homeFormSection);
            }
        };
        loadSection();
    }, []);

    const tagLabel = section?.tag_label || fallbackSection.tag_label;
    const heading = section?.title || fallbackSection.title;
    const description = section?.description || fallbackSection.description;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFeedback(null);

        const result = await submitContactForm(formData);

        setFeedback(result);
        setSubmitting(false);

        if (result.status) {
            setFormData(initialFormState); // clear the form on success
        }
    };

    return (
        <section className="py-[50px] bg-cover bg-center relative before:content-[''] before:absolute before:bg-[var(--primary-color)] before:opacity-85 before:w-full before:h-auto before:top-0 before:inset-0" style={{ backgroundImage: "url('/assets/img/form-bg-img.png')" }}>
            <div className="container">
                <div className="relative">
                    <div className="relative grid grid-cols-12 lg:gap-10 gap-4">
                        {/* Left Side */}
                        <div className="lg:col-span-5 col-span-12">
                            <div className="flex flex-col justify-center text-white">
                                <h6 className="flex items-center gap-3 text-[18px] uppercase tracking-wide font-medium mb-4">
                                    {tagLabel}
                                    <span className="w-8 h-[2px] bg-white/60 inline-block"></span>
                                </h6>
                                <h2 className="lg:text-[55px] text-[35px] md:text-[44px] font-semibold lg:leading-[100%] leading-[45px] mb-5">
                                    {heading}
                                </h2>
                                <p className="text-[20px] leading-[25px] font-normal text-white/90 mb-10 max-w-md">
                                    {description}
                                </p>

                                <div className="flex flex-col gap-5">
                                    {/* Email */}
                                    <div className="flex items-center gap-4">
                                        <span className="flex-shrink-0 w-11 h-11 rounded-full border border-white/50 flex items-center justify-center">
                                            <HiOutlineMail className="text-white text-2xl" />
                                        </span>
                                        <div>
                                            <h6 className="font-semibold text-[20px]">Email Us</h6>
                                            <p className="text-white/80 text-[18px]">{settings.email}</p>
                                        </div>
                                    </div>

                                    <div className="w-full h-[1px] bg-white/20"></div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-4">
                                        <span className="flex-shrink-0 w-11 h-11 rounded-full border border-white/50 flex items-center justify-center">
                                            <HiOutlinePhone className="text-white text-2xl" />
                                        </span>
                                        <div>
                                            <h6 className="font-semibold text-[20px]">Call Us</h6>
                                            <p className="text-white/80 text-[18px]">{settings.phone}</p>
                                        </div>
                                    </div>

                                    <div className="w-full h-[1px] bg-white/20"></div>

                                    {/* Location */}
                                    <div className="flex items-center gap-4">
                                        <span className="flex-shrink-0 w-11 h-11 rounded-full border border-white/50 flex items-center justify-center">
                                            <HiOutlineLocationMarker className="text-white text-2xl" />
                                        </span>
                                        <div>
                                            <h6 className="font-semibold text-[20px]">Our Location</h6>
                                            <p className="text-white/80 text-[18px]">{settings.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form Card */}
                        <div className="lg:col-span-7 col-span-12">
                            <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl p-6 md:p-8">
                                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-[18px] font-normal">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Full Name"
                                                className="w-full px-4 py-3 rounded-lg bg-white text-[var(--text-color1,#222)] placeholder:text-gray-400 text-[14px] outline-none focus:ring-2 focus:ring-white/70"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-[18px] font-normal">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your Email Address"
                                                className="w-full px-4 py-3 rounded-lg bg-white text-[var(--text-color1,#222)] placeholder:text-gray-400 text-[14px] outline-none focus:ring-2 focus:ring-white/70"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-[18px] font-normal">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your Number"
                                                className="w-full px-4 py-3 rounded-lg bg-white text-[var(--text-color1,#222)] placeholder:text-gray-400 text-[14px] outline-none focus:ring-2 focus:ring-white/70"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-white text-[18px] font-normal">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help"
                                                className="w-full px-4 py-3 rounded-lg bg-white text-[var(--text-color1,#222)] placeholder:text-gray-400 text-[14px] outline-none focus:ring-2 focus:ring-white/70"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-white text-[18px] font-normal">
                                            Message
                                        </label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more about your project or question"
                                            className="w-full px-4 py-3 rounded-lg bg-white text-[var(--text-color1,#222)] placeholder:text-gray-400 text-[14px] outline-none resize-none focus:ring-2 focus:ring-white/70"
                                        ></textarea>
                                    </div>

                                    {feedback && (
                                        <p className={`text-[16px] font-medium ${feedback.status ? "text-green-300" : "text-red-300"}`}>
                                            {feedback.message}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="mt-[25px] flex items-center bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] text-[20px] w-full text-center justify-center font-medium leading-[100%] disabled:opacity-60"
                                    >
                                        {submitting ? "Sending..." : "Send Message"}
                                        <HiArrowRight className="text-lg ml-2" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}