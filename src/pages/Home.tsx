import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Team from '../components/sections/Team';
import Clients from '../components/sections/Clients';
import Portfolio from '../components/sections/Portfolio';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Team />
      <Clients />
      <Portfolio />
      <Contact />
    </>
  );
}