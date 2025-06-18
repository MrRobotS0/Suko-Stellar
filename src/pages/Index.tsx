
import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/astronomy/Hero";
import { Navigation } from "@/components/astronomy/Navigation";
import { SolarSystem } from "@/components/astronomy/SolarSystem";
import { DeepSpace } from "@/components/astronomy/DeepSpace";
import { PlanetDetails } from "@/components/astronomy/PlanetDetails";
import { GalaxyViewer } from "@/components/astronomy/GalaxyViewer";
import { AstronomicalData } from "@/components/astronomy/AstronomicalData";

type Section = 'home' | 'solar-system' | 'deep-space' | 'planets' | 'galaxies' | 'data';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'solar-system':
        return <SolarSystem />;
      case 'deep-space':
        return <DeepSpace />;
      case 'planets':
        return <PlanetDetails />;
      case 'galaxies':
        return <GalaxyViewer />;
      case 'data':
        return <AstronomicalData />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cg fill='%23ffffff' opacity='0.1'%3E%3Ccircle cx='100' cy='100' r='1'/%3E%3Ccircle cx='300' cy='200' r='0.5'/%3E%3Ccircle cx='500' cy='150' r='1.5'/%3E%3Ccircle cx='700' cy='300' r='0.8'/%3E%3Ccircle cx='200' cy='400' r='1.2'/%3E%3Ccircle cx='800' cy='500' r='0.6'/%3E%3Ccircle cx='400' cy='600' r='1'/%3E%3Ccircle cx='600' cy='700' r='0.7'/%3E%3Ccircle cx='150' cy='800' r='1.3'/%3E%3Ccircle cx='750' cy='150' r='0.9'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <motion.main
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {renderSection()}
      </motion.main>
    </div>
  );
};

export default Index;
