import { Link } from '@heroui/react';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";

// Base URL of the ABCreative Laravel admin/API backend.
// Add this to your .env file:
// NEXT_PUBLIC_ABCREATIVE_API_URL="https://site2demo.in/abcreative"
const API_URL = process.env.NEXT_PUBLIC_ABCREATIVE_API_URL;

export default function Hero() {

  const [hero, setHero] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const [pageRes, clientsRes] = await Promise.all([
          fetch(`${API_URL}/api/pages/home`),
          fetch(`${API_URL}/api/clients`),
        ]);

        const pageJson = await pageRes.json();
        const clientsJson = await clientsRes.json();

        const heroSection = pageJson?.data?.sections?.find(
          (section) => section.section_key === "hero"
        );

        setHero(heroSection || null);
        setClients(clientsJson?.data || []);
      } catch (error) {
        console.error("Error loading hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroData();
  }, []);

  // Helper to build a full public storage URL from a stored relative path
  const mediaUrl = (path) => (path ? `${API_URL}/public/uploads/${path}` : null);

  // Fallback content shown while loading or if a field is empty,
  // so the layout never looks broken.
  const title = hero?.title || "3D Visualization for Modern Businesses";
  const description =
    hero?.description ||
    "Premium 3D animation, modeling, and rendering services for business-to-business clients.";
  const videoUrl = mediaUrl(hero?.video_url) || hero?.video_url || "/assets/img/hero-vdo.mp4";
  const buttonText = hero?.button_text || "Request a Free Consult";
  const buttonLink = hero?.button_link || "/contact-us";
  const button2Text = hero?.button2_text || "View Our Work";
  const button2Link = hero?.button2_link || "/company";

  const counters = hero?.items?.length
    ? hero.items
    : [
        { id: "c1", count_text: "10+", title: "Years Experience" },
        { id: "c2", count_text: "500+", title: "Projects Completed" },
        { id: "c3", count_text: "100+", title: "Client Satisfaction" },
      ];

  return (
    <>

      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto h-full px-4">
          <div className="grid grid-cols-12 absolute text-left left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-[2] w-full px-4">
            <div className="col-span-12 lg:col-span-7">
              <h1 className="text-white lg:text-[63.49px] text-[35px] font-semibold lg:leading-[70px] leading-[45px] mb-6">
                {title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8 md:block hidden">
                {description}
              </p>
              <div className="mt-10"></div>

              <Link href={buttonLink}>
                <button className="bg-[var(--primary-color)] hover:bg-black text-white px-7 py-4 rounded-lg transition border border-[var(--primary-color)] lg:text-[20px] text-[18px] font-medium leading-[100%] mb-[10px] lg:mb-0">
                  {buttonText}
                </button>
              </Link>

              <Link href={button2Link}>
                <button className="hover:bg-[var(--primary-color)] text-white md:ml-4 ml-0 px-7 py-4 rounded-lg transition border border-white-200 lg:text-[20px] text-[18px] font-medium leading-[100%]">
                  {button2Text}
                </button>
              </Link>

              <div className="mb-[50px]"></div>
            </div>

            {/* Hero Counter */}
            <div className="col-span-7 lg:block hidden">
              <div className="grid grid-cols-12">
                {counters.map((item) => (
                  <div className="col-span-4" key={item.id}>
                    <h5 className="font-semibold text-[var(--primary-color)] text-[22px] leading-[100%] mb-2">
                      {item.count_text}
                    </h5>
                    <p className="text-white text-[18px] leading-[100%] font-normal">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* // Hero Counter */}
          </div>
          {/* // Hero Counter */}

        </div>
      </section>


      {/* Marquee Section */}
      <section className='bg-black py-5 lg:block hidden'>
        <div className="container">
          <marquee>
            <ul className="flex items-center gap-10">
              {(clients.length
                ? clients
                : [1, 2, 3, 4, 5, 6].map((n) => ({
                    id: n,
                    logo: `/assets/img/slide-img${n}.png`,
                    name: `Client ${n}`,
                  }))
              ).map((client) => (
                <li key={client.id}>
                  <img
                    src={clients.length ? mediaUrl(client.logo) : client.logo}
                    alt={client.name || "Client logo"}
                  />
                </li>
              ))}
            </ul>
          </marquee>
        </div>
      </section>
      {/* // Marquee Section */}

    </>
  )
}