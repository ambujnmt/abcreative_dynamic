"use client";

import React from 'react';

// 👉 Adjust these 3 paths to wherever Header, Footer and HomeForm live in your project.
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HomeForm from '../components/Home/HomeSections/HomeForm';

import ServiceHero from '../components/ServiceDetail/ServiceHero';
import ServiceVideoStrip from '../components/ServiceDetail/ServiceVideoStrip';
import ServiceContent from '../components/ServiceDetail/ServiceContent';

// Container Port Operations page.
// Right now every section shows its own dummy content (see the fallback
// consts at the top of each ServiceDetail component).
//
// To make it dynamic later (same pattern as the Home sections):
//
//   const [pageData, setPageData] = useState(null);
//   useEffect(() => {
//       fetchPageBySlug('container-port-operations').then(setPageData);
//   }, []);
//
//   <ServiceHero       section={getSection(pageData, 'service_hero')} />
//   <ServiceVideoStrip items={getSection(pageData, 'service_videos')?.items} />
//   <ServiceContent    section={getSection(pageData, 'service_content')} />
//
// Any section that comes back empty keeps showing its dummy content.

export default function ContainerPortOperations() {
    return (
        <>
            {/* Remove Header/Footer here if your _app / layout already renders them */}
            <Header darkNav />

            <ServiceHero />
            <ServiceVideoStrip />
            <ServiceContent />

            {/* Same "Send Us Email" block as the home page */}
            <HomeForm />

            <Footer />
        </>
    );
}
