import React from 'react'
import TestimonialSlider from './TestimonialSlider'

export default function HomeTestimonial() {
    return (
        <>
            <section className="mt-[70px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 flex justify-center mb-[20px]">
                            <div className="max-w-3xl text-center">
                                <h6 className="block m-auto w-max text-[18px] leading-[100%] text-[var(--primary-color)] relative before:content-[''] before:absolute before:w-[40px] before:h-[4px] before:bg-[var(--primary-color)] before:top-[7px] before:left-[-50px] after:content-[''] after:absolute after:bg-[var(--primary-color)] after:w-[40px] after:h-[4px] after:top-[7px] after:right-[-50px] uppercase mb-4">Testimonials</h6>
                                <h3 className="font-semibold lg:text-[55px] text-[23px] lg:leading-[100%] leading-[30px] text-[var(--text-color1)] mb-5">What Our Clients Say <span className="text-[var(--primary-color)] block">About Us</span></h3>
                                <p className="text-[20px] text-[var(--text-color2)] font-normal leading-[25px]">We follow a provenprocess to understand your needs and deliver high- quality 3D viual solutions.</p>
                            </div>
                        </div>

                        {/* Testimonial will come here */}
                        <TestimonialSlider />
                        {/* // Testimonial will come here */}

                    </div>
                </div> 
            </section>
        </>
    )
}
