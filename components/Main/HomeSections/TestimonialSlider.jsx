"use client"
import React, { useState, useEffect, useRef } from 'react'
import { FaStar } from "react-icons/fa"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2"
import { fetchTestimonials, mediaUrl } from '../../../utils/abcreativeApi'

// Fallback content — used only while loading, or if the admin panel
// has no testimonials added yet, so the slider never looks empty/broken.
const fallbackTestimonials = [

    {
      
    },
]

export default function TestimonialSlider() {
    const [testimonials, setTestimonials] = useState(fallbackTestimonials)
    const [isDynamic, setIsDynamic] = useState(false)

    // Fetch testimonials from the admin panel API on mount.
    useEffect(() => {
        const loadTestimonials = async () => {
            const data = await fetchTestimonials()

            if (data.length) {
                const mapped = data.map((t) => ({
                    id: t.id,
                    name: t.name,
                    rating: t.rating || 5,
                    review: t.description,
                    avatar: mediaUrl(t.image),
                }))
                setTestimonials(mapped)
                setIsDynamic(true)
            }
        }
        loadTestimonials()
    }, [])

    // Clone last and first slides for infinite loop illusion.
    // Recomputed whenever the testimonials list changes (e.g. after the API loads).
    const slides = [
        testimonials[testimonials.length - 1],
        ...testimonials,
        testimonials[0],
    ]

    const [current, setCurrent] = useState(1) // start at real first slide
    const [withTransition, setWithTransition] = useState(true)
    const [slidesToShow, setSlidesToShow] = useState(3)
    const trackRef = useRef(null)

    // Reset to the first real slide whenever the testimonials data changes
    // (e.g. fallback data gets replaced by real API data).
    useEffect(() => {
        setWithTransition(false)
        setCurrent(1)
    }, [isDynamic])

    // Responsive slides count (like Owl Carousel responsive breakpoints)
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1)
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2)
            } else {
                setSlidesToShow(3)
            }
        }
        updateSlidesToShow()
        window.addEventListener("resize", updateSlidesToShow)
        return () => window.removeEventListener("resize", updateSlidesToShow)
    }, [])

    const handleNext = () => {
        if (current >= slides.length - 1) return
        setWithTransition(true)
        setCurrent((prev) => prev + 1)
    }

    const handlePrev = () => {
        if (current <= 0) return
        setWithTransition(true)
        setCurrent((prev) => prev - 1)
    }

    // Handle the infinite loop jump (snap without animation)
    const handleTransitionEnd = () => {
        if (current === slides.length - 1) {
            setWithTransition(false)
            setCurrent(1)
        } else if (current === 0) {
            setWithTransition(false)
            setCurrent(testimonials.length)
        }
    }

    // Auto slide every 4s (optional, like Owl Carousel autoplay)
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 4000)
        return () => clearInterval(interval)
    }, [current])

    const slideWidthPercent = 100 / slidesToShow

    // The "active/center" slide within the visible group
    const centerSlideIndex = current + Math.floor(slidesToShow / 2)

    return (
        <div className="col-span-12">
            <div className="relative flex items-center justify-center gap-3 md:gap-6">
                {/* Prev button */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center hover:opacity-90 transition z-10"
                >
                    <HiArrowLeft className="text-lg" />
                </button>

                {/* Slider viewport */}
                <div className="overflow-hidden w-full max-w-[1100px]">
                    <div
                        ref={trackRef}
                        onTransitionEnd={handleTransitionEnd}
                        className={`flex ${withTransition ? "transition-transform duration-500 ease-in-out" : ""}`}
                        style={{
                            transform: `translateX(-${current * slideWidthPercent}%)`,
                        }}
                    >
                        {slides.map((t, index) => {
                            const isCenter = slidesToShow === 1
                                ? index === current
                                : index === centerSlideIndex

                            return (
                                <div
                                    key={`${t.id}-${index}`}
                                    className="flex-shrink-0 px-2 md:px-3"
                                    style={{ width: `${slideWidthPercent}%` }}
                                >
                                    <div
                                        className={`
                                            rounded-2xl border transition-all duration-500 ease-in-out
                                            flex flex-col items-center text-center px-6 py-8 h-full
                                            ${isCenter
                                                ? "bg-white border-[var(--primary-color)] shadow-lg scale-100 opacity-100"
                                                : "bg-[var(--bg-color2,#f7f7f7)] border-transparent opacity-60 scale-95"
                                            }
                                        `}
                                    >
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-14 h-14 rounded-full object-cover mb-4"
                                        />
                                        <p className="text-[15px] leading-[22px] text-[var(--text-color2,#666)] mb-4">
                                            "{t.review}"
                                        </p>
                                        <div className="flex gap-1 mb-2">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-[14px]" />
                                            ))}
                                        </div>
                                        <h6 className="font-semibold text-[var(--text-color1,#222)] text-[15px]">
                                            {t.name}
                                        </h6>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Next button */}
                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center hover:opacity-90 transition z-10"
                >
                    <HiArrowRight className="text-lg" />
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setWithTransition(true)
                            setCurrent(i + 1)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                            i === current - 1 ? "bg-[var(--primary-color)] w-5" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}