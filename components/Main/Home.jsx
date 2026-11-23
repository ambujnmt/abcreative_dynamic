"use client";

import React from 'react'
import Header from "../Menu/Header"
import Footer from "../Menu/Footer"
import HomeForm from "./HomeSections/HomeForm"   // apne project ke hisaab se path adjust karo

import ServiceHero from "../ServiceDetail/ServiceHero"
import ServiceVideoStrip from "../ServiceDetail/ServiceVideoStrip"
import ServiceContent from "../ServiceDetail/ServiceContent"

export default function Home() {
  return (
    <section className='homePage'>
      <Header darkNav />

      <ServiceHero />
      <ServiceVideoStrip />
      <ServiceContent />

      <HomeForm />
      <Footer />
    </section>
  )
}