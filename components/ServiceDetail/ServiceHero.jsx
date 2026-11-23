import React from 'react';
import { resolveSrc } from './serviceHelpers';

// Dummy content — shown until this section is connected to the admin panel.
// Field names match the admin's section fields (title, subtitle, image, video_url).
const fallbackSection = {
    title: "Container Port Operations",
    subtitle: "Bring your container port proposals to life with 4k 3D animation.",
    image: "/assets/img/port/port-hero.jpg",
    video_url: "", // optional — if set, it plays as the background instead of the image
};

export default function ServiceHero({ section }) {

    const title = section?.title || fallbackSection.title;
    const subtitle = section?.subtitle || fallbackSection.subtitle;
    const image = resolveSrc(section?.image || fallbackSection.image);
    const video = resolveSrc(section ? section.video_url : fallbackSection.video_url);

    return (
        <section className="relative w-full lg:h-screen lg:min-h-[640px] h-[75vh] min-h-[480px] overflow-hidden bg-black">

            {/* Background — video if available, otherwise image */}
            {video ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={image || undefined}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={video} type="video/mp4" />
                </video>
            ) : (
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Overlay — darkens the render so the white text stays readable */}
            <div className="absolute inset-0 bg-black/45"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Title block — bottom left, like the design */}
            <div className="relative z-[2] container mx-auto px-4 h-full flex items-end">
                <div className="xl:px-[60px] lg:pb-[200px] md:pb-[110px] pb-[70px] max-w-[1250px]">
                    <h1 className="text-white font-bold xl:text-[80px] lg:text-[64px] md:text-[48px] text-[34px] leading-[1.05] tracking-[-0.5px] mb-3">
                        {title}
                    </h1>
                    <p className="text-white/90 font-normal xl:text-[32px] lg:text-[26px] md:text-[22px] text-[17px] leading-[1.25]">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
