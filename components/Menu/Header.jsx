import { Link } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { fetchSettings, mediaUrl } from '../../utils/abcreativeApi';

// Fallback logo — used only while loading, or if no logo has been
// uploaded in Site Settings yet, so the header never looks broken.
const fallbackLogo = "/assets/img/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(fallbackLogo);
  const [siteName, setSiteName] = useState("ABCreative");

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSettings();
      if (data?.logo) setLogo(mediaUrl(data.logo));
      if (data?.site_name) setSiteName(data.site_name);
    };
    loadSettings();
  }, []);

  return (
    <header className="absolute top-0 z-[9999] w-full">
      <div className="">
        <div className="container mx-auto">
          <div className="flex items-center justify-between pt-2">

            {/* Logo */}
            <div className="flex items-center min-w-[185px]">
              <Link href="/">
                <img
                  src={logo}
                  alt={siteName}
                  className="h-auto lg:max-w-[300px] max-w-[195px]"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center">
              <nav>
                <ul className="flex items-center">
                  <li className="mx-[20px]">
                    <Link
                      href="/"
                      className="text-[20px] leading-[100%] font-medium hover:text-[var(--primary-color)] text-[#fff]"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="mx-[20px] relative group">
                    <Link
                      href="/company"
                      className="text-[20px] leading-[100%] font-medium hover:text-[var(--primary-color)] text-[#fff]"
                    >
                      Company
                    </Link>
                  </li>

                  <li className="mx-[20px]">
                    <Link
                      href="/whatWeDo"
                      className="text-[20px] leading-[100%] font-medium hover:text-[var(--primary-color)] text-[#fff]">
                      What we do
                    </Link>
                  </li>

                  <li className="mx-[20px]">
                    <Link
                      href="clients"
                      className="text-[20px] leading-[100%] font-medium hover:text-[var(--primary-color)] text-[#fff]">
                      Clients
                    </Link>
                  </li>

                  <li className="ml-5">
                    <Link
                      href="/contactUs"
                      className="inline-block text-[20px] font-medium transition-all duration-500 ease-in-out hover:bg-[var(--secondary-color)] rounded-[12px] bg-[var(--primary-color)] px-7 py-2 text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Mobile Toggle */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-[50px] w-[50px] items-center justify-center rounded bg-white shadow-md"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li><Link className="text-[var(--primary-color)]" href="/">Home</Link></li>
              <li><Link className="text-[var(--primary-color)]" href="/company">Company</Link></li>
              <li><Link className="text-[var(--primary-color)]" href="/whatWeDo">What we do</Link></li>
              <li><Link className="text-[var(--primary-color)]" href="/clients">Clients</Link></li>
              <li>
                <Link
                  href="/contactUs"
                  className="inline-block text-[15px] rounded-full bg-[var(--primary-color)] px-6 py-3 text-white font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}