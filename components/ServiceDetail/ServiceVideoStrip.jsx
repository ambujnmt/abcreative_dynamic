"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { FaPlay, FaTimes } from "react-icons/fa";
import { resolveSrc, getVideoEmbed } from './serviceHelpers';

// Dummy content — shown until this section is connected to the admin panel.
// Each item: title, image (thumbnail), video_url (mp4 upload or YouTube/Vimeo link),
// icon (optional small round badge before the title — falls back to the red "ab" badge).
const fallbackItems = [
     {
        id: "v1",
        title: "Port Operations - Crane Control",
        image: "/assets/img/port/port-operations-crane-control.jpg",
        video_url: "/assets/video/port/PortOperationsCranecontrol.mp4",
    },
    {
        id: "v2",
        title: "Port Operations - Driverless Trucks",
        image: "/assets/img/port/port-operations-driverless-trucks.jpg",
        video_url: "/assets/video/port/PortOperationsDriverlessTrucks.mp4",
    },
    {
        id: "v3",
        title: "Port Operations - Twistlocks",
        image: "/assets/img/port/port-operations-twistlocks.jpg",
        video_url: "/assets/video/port/PortOperationsTwistlocks.mp4",
    },
    {
        id: "v4",
        title: "Port Operations - Water and Landside",
        image: "/assets/img/port/port-operations-water-and-landside.jpg",
        video_url: "/assets/video/port/PortOperationsWaterandLandside.mp4",
    },
];

export default function ServiceVideoStrip({ items }) {

    const videos = items?.length ? items : fallbackItems;
    const [activeVideo, setActiveVideo] = useState(null);
    const closeModal = useCallback(() => setActiveVideo(null), []);

    return (
        <section className="bg-black pt-[10px] pb-[12px] px-[4px]">
            {/* 4 cards per row on desktop, 2 on tablet, swipe row on mobile.
                More than 4 items -> the row scrolls sideways. */}
            <div className="flex lg:gap-[30px] gap-3 overflow-x-auto snap-x snap-mandatory
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {videos.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveVideo(item)}
                        aria-label={`Play video: ${item.title}`}
                        className="group snap-start shrink-0 w-[80%] sm:w-[calc(50%-6px)] lg:w-[calc(25%-22.5px)] text-left focus:outline-none"
                    >
                        <span className="relative block aspect-video rounded-[10px] overflow-hidden bg-[#111] group-focus-visible:ring-2 group-focus-visible:ring-[var(--primary-color)]">
                            <img
                                src={resolveSrc(item.image)}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            />
                            {/* Play button — appears on hover */}
                            <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                                <span className="w-[56px] h-[56px] rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                                    <FaPlay className="ml-[3px] text-[18px]" />
                                </span>
                            </span>
                        </span>

                        <span className="flex items-center gap-2 mt-[8px] px-[2px]">
                            <ChannelBadge icon={item.icon} />
                            <span className="text-white font-medium lg:text-[17px] text-[14px] leading-[1.2] truncate">
                                {item.title}
                            </span>
                        </span>
                    </button>
                ))}
            </div>

            {activeVideo && <VideoModal item={activeVideo} onClose={closeModal} />}
        </section>
    );
}

// Small round badge before each title (the red "ab" mark in the design).
function ChannelBadge({ icon }) {
    if (icon) {
        return (
            <img
                src={resolveSrc(icon)}
                alt=""
                className="shrink-0 w-[26px] h-[26px] rounded-full object-cover"
            />
        );
    }
    return (
        <span className="shrink-0 w-[26px] h-[26px] rounded-full bg-[#d0312d] border border-white/70 flex items-center justify-center text-white text-[10px] font-bold leading-none">
            ab
        </span>
    );
}

// Full-screen video popup — closes on ✕, backdrop click or Esc.
function VideoModal({ item, onClose }) {
    const embed = getVideoEmbed(resolveSrc(item.video_url));

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[10000] bg-black/85 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
        >
            <div className="relative w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-[52px] right-0 w-[42px] h-[42px] rounded-full bg-white/10 hover:bg-[var(--primary-color)] text-white flex items-center justify-center transition-colors"
                >
                    <FaTimes />
                </button>

                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                    {embed?.type === "iframe" && (
                        <iframe
                            src={embed.src}
                            title={item.title}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                    {embed?.type === "video" && (
                        <video
                            src={embed.src}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                        />
                    )}
                    {!embed && (
                        <div className="w-full h-full flex items-center justify-center text-white/80 text-[18px]">
                            Video coming soon.
                        </div>
                    )}
                </div>

                <h4 className="text-white lg:text-[20px] text-[17px] font-medium mt-4">{item.title}</h4>
            </div>
        </div>
    );
}
