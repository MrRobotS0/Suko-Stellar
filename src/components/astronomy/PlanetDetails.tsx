
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

const PlanetModel = ({ color, size, rings = false }: { color: string, size: number, rings?: boolean }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.1}>
      <group>
        <mesh>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {rings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[size * 1.5, 0.1, 16, 100]} />
            <meshStandardMaterial color="#D4AF37" transparent opacity={0.6} />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export const PlanetDetails = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(0);

  const planets = [
    {
      name: "Mercúrio",
      color: "#8C7853",
      size: 1,
      distance: "57.9 milhões km",
      diameter: "4.879 km",
      mass: "3.301 × 10²³ kg",
      temperature: "167°C (dia) / -183°C (noite)",
      moons: 0,
      orbitalPeriod: "88 dias terrestres",
      composition: "Núcleo de ferro, manto rochoso",
      facts: [
        "O planeta mais próximo do Sol",
        "Não possui atmosfera significativa",
        "Tem crateras similares à Lua",
        "Um dia em Mercúrio dura 176 dias terrestres"
      ]
    },
    {
      name: "Vênus",
      color: "#FFC649",
      size: 1.2,
      distance: "108.2 milhões km",
      diameter: "12.104 km",
      mass: "4.867 × 10²⁴ kg",
      temperature: "462°C (superfície)",
      moons: 0,
      orbitalPeriod: "225 dias terrestres",
      composition: "Atmosfera densa de CO₂, superfície rochosa",
      facts: [
        "O planeta mais quente do Sistema Solar",
        "Atmosfera extremamente densa",
        "Rotação retrógrada",
        "Pressão atmosférica 90x maior que a Terra"
      ]
    },
    {
      name: "Terra",
      color: "#6B93D6",
      size: 1.3,
      distance: "149.6 milhões km",
      diameter: "12.756 km",
      mass: "5.972 × 10²⁴ kg",
      temperature: "15°C (média global)",
      moons: 1,
      orbitalPeriod: "365.25 dias",
      composition: "Oceanos de água, atmosfera de N₂ e O₂",
      facts: [
        "O único planeta conhecido com vida",
        "71% da superfície coberta por água",
        "Atmosfera protetora",
        "Campo magnético forte"
      ]
    },
    {
      name: "Marte",
      color: "#CD5C5C",
      size: 1.1,
      distance: "227.9 milhões km",
      diameter: "6.792 km",
      mass: "6.39 × 10²³ kg",
      temperature: "-65°C (média)",
      moons: 2,
      orbitalPeriod: "687 dias terrestres",
      composition: "Atmosfera fina de CO₂, superfície rochosa",
      facts: [
        "Conhecido como 'Planeta Vermelho'",
        "Possui as maiores montanhas do Sistema Solar",
        "Evidências de água no passado",
        "Duas pequenas luas: Fobos e Deimos"
      ]
    },
    {
      name: "Júpiter",
      color: "#D8CA9D",
      size: 2.5,
      distance: "778.5 milhões km",
      diameter: "142.984 km",
      mass: "1.898 × 10²⁷ kg",
      temperature: "-110°C (topo das nuvens)",
      moons: 95,
      orbitalPeriod: "11.9 anos terrestres",
      composition: "Principalmente hidrogênio e hélio",
      facts: [
        "O maior planeta do Sistema Solar",
        "Grande Mancha Vermelha - tempestade gigante",
        "Protege planetas internos de asteroides",
        "Sistema de anéis tênues"
      ]
    },
    {
      name: "Saturno",
      color: "#FAD5A5",
      size: 2.2,
      rings: true,
      distance: "1.432 bilhões km",
      diameter: "120.536 km",
      mass: "5.683 × 10²⁶ kg",
      temperature: "-140°C (topo das nuvens)",
      moons: 146,
      orbitalPeriod: "29.4 anos terrestres",
      composition: "Hidrogênio, hélio, gelo e rocha",
      facts: [
        "Famoso pelo sistema de anéis espetacular",
        "Densidade menor que a água",
        "Titã: lua com atmosfera densa",
        "Hexágono no polo norte"
      ]
    }
  ];

  const currentPlanet = planets[selectedPlanet];

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Exploração Planetária
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="h-96 rounded-lg overflow-hidden border border-blue-500/30 bg-black/20">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <PlanetModel 
                color={currentPlanet.color} 
                size={currentPlanet.size} 
                rings={currentPlanet.rings}
              />
              <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {planets.map((planet, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPlanet(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedPlanet === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {planet.name}
                </button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlanet}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-blue-500/30"
              >
                <h3 className="text-3xl font-bold text-blue-300 mb-4">{currentPlanet.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Distância do Sol:</span> {currentPlanet.distance}</p>
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Diâmetro:</span> {currentPlanet.diameter}</p>
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Massa:</span> {currentPlanet.mass}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Temperatura:</span> {currentPlanet.temperature}</p>
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Luas:</span> {currentPlanet.moons}</p>
                    <p className="text-sm"><span className="text-blue-300 font-semibold">Período Orbital:</span> {currentPlanet.orbitalPeriod}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4"><span className="text-blue-300 font-semibold">Composição:</span> {currentPlanet.composition}</p>
                
                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Fatos Interessantes:</h4>
                  <ul className="space-y-2">
                    {currentPlanet.facts.map((fact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-gray-300 flex items-start"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
