// utils/abcreativeApi.js
//
// All calls to the ABCreative Laravel admin/API backend live here.
// Every component (Hero, WhatWeDoSec, SimpleStep, etc.) imports the
// function it needs from this single file instead of writing its own
// fetch() calls.
//
// Add this to your .env file (project root, same level as package.json):
//   NEXT_PUBLIC_ABCREATIVE_API_URL="https://site2demo.in/abcreative"

const API_URL = process.env.NEXT_PUBLIC_ABCREATIVE_API_URL;

/** Builds a full public URL for a stored image/icon/video path returned by the API. */
export const mediaUrl = (path) => (path ? `${API_URL}/public/uploads/${path}` : null);

/** GET /api/pages -> list of all pages (id, name, slug) — useful for menus. */
export async function fetchAllPages() {
  try {
    const res = await fetch(`${API_URL}/api/pages`);
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching pages list:", error);
    return [];
  }
}
 
/**
 * GET /api/pages/{slug} -> full page data: banner + all sections + their items.
 * Use this on every page component (Home, Company, Animation, Modeling, etc.)
 */
export async function fetchPageBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/api/pages/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error);
    return null;
  }
}

/** Helper: pull one specific section (by section_key) out of a page's sections array. */
export function getSection(pageData, sectionKey) {
  return pageData?.sections?.find((s) => s.section_key === sectionKey) || null;
}

/** GET /api/testimonials */
export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_URL}/api/testimonials`);
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

/** GET /api/clients */
export async function fetchClients() {
  try {
    const res = await fetch(`${API_URL}/api/clients`);
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

/** GET /api/faqs?page_slug=home (page_slug is optional) */
export async function fetchFaqs(pageSlug) {
  try {
    const url = pageSlug
      ? `${API_URL}/api/faqs?page_slug=${pageSlug}`
      : `${API_URL}/api/faqs`;
    const res = await fetch(url);
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

/** GET /api/settings -> site-wide logo, phone, email, social links etc. */
export async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/api/settings`);
    const json = await res.json();
    return json?.data || {};
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

/** POST /api/contact -> submit the contact form (HomeForm / ContactUs page). */
export async function submitContactForm({ name, email, phone, subject, message }) {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, subject, message }),
    });
    const json = await res.json();
    if (!res.ok) {
      return { status: false, message: json?.message || "Something went wrong." };
    }
    return { status: true, message: json?.message, data: json?.data };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { status: false, message: "Network error, please try again." };
  }
}