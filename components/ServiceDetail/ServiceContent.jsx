import React from 'react';
import { hasHtml } from './serviceHelpers';

// Dummy content — shown until this section is connected to the admin panel.
// Section: title + subtitle. Items: one block each (title = heading, description = text).
// Line breaks in a description are kept; HTML typed in the admin panel is rendered too.
const fallbackSection = {
    title: "Container Port Operations",
    subtitle: "Bring your container port proposals to life with 4k 3D animation.",
};

const fallbackItems = [
    {
        id: "b1",
        title: "Transform Your Terminal Vision into Living Reality",
        description: "ABCreative turns complex container port designs into cinematic 4K 3D animations that make decision-makers stop and look. We build precise digital scale models of your terminal—complete with ship-to-shore cranes, automated guided vehicles, stacking yards, and live vessel traffic—then bring every element into fluid motion so stakeholders can instantly grasp how your operation will perform.",
    },
    {
        id: "b2",
        title: "See the Entire Flow from Every Angle",
        description: "Watch containers move seamlessly from quay to stack, cranes execute precise cycles, and traffic patterns unfold across the terminal.\nOur animations let you orbit, zoom, and fly through the layout from any viewpoint, revealing bottlenecks, proving capacity, and showcasing efficiency long before a single pile is driven.",
    },
    {
        id: "b3",
        title: "Data-Driven Stories Built for the Boardroom",
        description: "We go far beyond pretty pictures. Operational data is overlaid in real time, real-world scenarios are simulated, and the results are packaged into polished videos that blend 3D sequences, interactive maps, and custom diagrams. Whether you need a concise fly-through or a full operational sequence, the final product is clear, credible, and ready for executive and tender presentations.",
    },
    {
        id: "b4",
        title: "Confidential Work That Wins Trust and Contracts",
        description: "Leading ports and terminal operators already rely on us to convert 2D CAD into compelling 3D narratives that clarify layouts, demonstrate performance, and impress stakeholders. Your next project deserves more than static drawings—it deserves motion that builds confidence and accelerates approval. Let's create it.",
    },
];

export default function ServiceContent({ section }) {

    const title = section?.title || fallbackSection.title;
    const subtitle = section?.subtitle || fallbackSection.subtitle;
    const blocks = section?.items?.length ? section.items : fallbackItems;

    return (
        <section className="bg-white lg:pt-[70px] lg:pb-[120px] pt-[45px] pb-[60px]">
            <div className="container mx-auto px-4">
                <div className="xl:px-[60px]">

                    {/* Intro */}
                    <h2 className="font-extrabold text-black xl:text-[64px] lg:text-[52px] md:text-[40px] text-[30px] leading-[1.1] tracking-[-0.5px]">
                        {title}
                    </h2>
                    <p className="text-black font-normal xl:text-[30px] lg:text-[25px] text-[18px] leading-[1.3] mt-1">
                        {subtitle}
                    </p>

                    {/* Content blocks */}
                    <div className="lg:mt-[80px] mt-[40px] lg:space-y-[50px] space-y-[32px]">
                        {blocks.map((block) => (
                            <div key={block.id}>
                                <h3 className="font-bold text-black lg:text-[24px] text-[19px] leading-[1.3] lg:mb-[22px] mb-[12px]">
                                    {block.title}
                                </h3>
                                {hasHtml(block.description) ? (
                                    <div
                                        className="text-[#222] lg:text-[20px] text-[16px] leading-[1.45] [&_p]:mb-3"
                                        dangerouslySetInnerHTML={{ __html: block.description }}
                                    />
                                ) : (
                                    <p className="text-[#222] lg:text-[20px] text-[16px] leading-[1.45] whitespace-pre-line">
                                        {block.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
