import React, { useEffect, useState } from "react";
import { Link } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaRegCopyright } from "react-icons/fa6";
import { fetchSettings, mediaUrl } from '../../utils/abcreativeApi';

// Fallback content — used only while loading, or if Site Settings are
// empty, so the footer never looks broken.
const fallbackSettings = {
  logo: "/assets/img/logo.png",
  tagline: "Premium 3D visualisation & Rendering services for businesses worldwide,",
  facebook_link: "#",
  instagram_link: "#",
  linkedin_link: "#",
  twitter_link: "#",
  copyright_text: "2026 abcreative. All right reserved.",
};

export default function Footer() {

  const [settings, setSettings] = useState(fallbackSettings);
  const [isDynamicLogo, setIsDynamicLogo] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSettings();
      if (data && Object.keys(data).length) {
        setSettings({
          logo: data.logo ? mediaUrl(data.logo) : fallbackSettings.logo,
          tagline: data.tagline || fallbackSettings.tagline,
          facebook_link: data.facebook_link || fallbackSettings.facebook_link,
          instagram_link: data.instagram_link || fallbackSettings.instagram_link,
          linkedin_link: data.linkedin_link || fallbackSettings.linkedin_link,
          twitter_link: data.twitter_link || fallbackSettings.twitter_link,
          copyright_text: data.copyright_text || fallbackSettings.copyright_text,
        });
        if (data.logo) setIsDynamicLogo(true);
      }
    };
    loadSettings();
  }, []);

  return (
    <section className="bg-[var(--dark-bg)] pt-[80px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 lg:gap-10 gap-4">
          {/* Column 1 */}
          <div className="lg:col-span-5 md:col-span-6 col-span-12">
            <img
              src={settings.logo}
              alt="logo"
              className="w-auto h-auto mb-5"
            />

            <p className="text-white text-[18px] font-normal leading-[138%]">
              {settings.tagline}
            </p>

            <div className="mt-[30px]">
              <ul className="flex items-center">
                <li>
                  <Link
                    href={settings.instagram_link}
                    className="w-[50px] h-[50px] mr-[10px] rounded-full border border-white-200 flex items-center justify-center"
                  >
                    <FaInstagram className="text-[23px] text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={settings.twitter_link}
                    className="w-[50px] h-[50px] mr-[10px] rounded-full border border-white-200 flex items-center justify-center"
                  >
                    <BsTwitterX className="text-[23px] text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={settings.facebook_link}
                    className="w-[50px] h-[50px] mr-[10px] rounded-full border border-white-200 flex items-center justify-center"
                  >
                    <FaFacebookF className="text-[23px] text-white" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={settings.linkedin_link}
                    className="w-[50px] h-[50px] mr-[10px] rounded-full border border-white-200 flex items-center justify-center"
                  >
                    <FaLinkedinIn className="text-[23px] text-white" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 md:col-span-6 col-span-12 lg:mb-[0px] mb-[20px]">
            <h4 className="text-[20px] font-semibold text-white leading-[138%] lg:mb-[30px] mb-[10px]">
              Services
            </h4>
            <ul className="space-y-3">
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/animation"
                >
                  3D Animation
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white hover:text-[var(--primary-color)] text-[18px]"
                  href="/modeling"
                >
                  3D Modeling
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/rendering"
                >
                  3D Rendering
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/visualization"
                >
                  Visualization
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 md:col-span-6 col-span-12 lg:mb-[0px] mb-[20px]">
            <h4 className="text-[20px] font-semibold text-white leading-[138%] lg:mb-[30px] mb-[10px]">
              Company
            </h4>
            <ul className="space-y-3">
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/company"
                >
                  About Us
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/whatWeDo"
                >
                  Our Work
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/contactUs"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3 md:col-span-6 col-span-12 lg:mb-[0px] mb-[20px]">
            <h4 className="text-[20px] font-semibold text-white leading-[138%] lg:mb-[30px] mb-[10px]">
              Resources
            </h4>
            <ul className="space-y-3">
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/privacyPolicy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-none leading-[138%]">
                <Link
                  className="text-white font-normal hover:text-[var(--primary-color)] text-[18px]"
                  href="/termsConditions"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="lg:mt-[160px] mt-[50px] border-t border-[#8b8b8b]/40 py-[18px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4">
            <h5 className="flex text-white font-extralight items-center text-[17px] mb-0">
              <FaRegCopyright /> &nbsp; {settings.copyright_text}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}