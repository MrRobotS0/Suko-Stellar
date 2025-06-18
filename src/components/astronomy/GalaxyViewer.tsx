
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Galaxy = ({ type }: { type: 'spiral' | 'elliptical' | 'irregular' }) => {
  const pointsRef = useRef<any>();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(10000 * 3);
    
    for (let i = 0; i < 10000; i++) {
      const i3 = i * 3;
      
      if (type === 'spiral') {
        const radius = Math.random() * 10;
        const spinAngle = radius * 0.3;
        const branchAngle = (i % 4) * Math.PI * 0.5;
        const angle = branchAngle + spinAngle;
        
        positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
        positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      } else if (type === 'elliptical') {
        const phi = Math.random() * Math.PI * 2;
        const costheta = Math.random() * 2 - 1;
        const theta = Math.acos(costheta);
        const radius = Math.random() * 8;
        
        positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi) * 0.6;
        positions[i3 + 2] = radius * Math.cos(theta);
      } else {
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;
      }
    }
    
    return positions;
  }, [type]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export const GalaxyViewer = () => {
  const galaxyTypes = [
    {
      name: "Galáxia Espiral",
      type: "spiral" as const,
      description: "Galáxias com braços espirais bem definidos, como nossa Via Láctea",
      characteristics: [
        "Braços espirais contendo estrelas jovens",
        "Disco galáctico achatado",
        "Bulbo central com estrelas mais velhas",
        "Aproximadamente 60% das galáxias observadas"
      ],
      examples: ["Via Láctea", "Andrômeda", "Galáxia do Triângulo"]
    },
    {
      name: "Galáxia Elíptica",
      type: "elliptical" as const,
      description: "Galáxias de forma oval com distribuição suave de estrelas",
      characteristics: [
        "Forma elíptica ou esférica",
        "Pouco gás e poeira interestelar",
        "Estrelas principalmente velhas e vermelhas",
        "Podem ser gigantescas ou anãs"
      ],
      examples: ["M87", "IC 1101", "NGC 4889"]
    },
    {
      name: "Galáxia Irregular",
      type: "irregular" as const,
      description: "Galáxias sem forma definida, geralmente pequenas",
      characteristics: [
        "Sem estrutura espiral ou elíptica clara",
        "Rica em gás e formação estelar",
        "Geralmente menores que espirais",
        "Podem resultar de interações gravitacionais"
      ],
      examples: ["Nuvens de Magalhães", "IC 10", "NGC 1427A"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Tipos de Galáxias
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {galaxyTypes.map((galaxy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/30 backdrop-blur-md rounded-lg border border-purple-500/30 overflow-hidden"
            >
              <div className="h-64 relative">
                <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                  <ambientLight intensity={0.2} />
                  <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} />
                  <Galaxy type={galaxy.type} />
                  <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={1} />
                </Canvas>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-3">{galaxy.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{galaxy.description}</p>
                
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Características:</h4>
                <ul className="space-y-1 mb-4">
                  {galaxy.characteristics.map((char, charIndex) => (
                    <li key={charIndex} className="text-xs text-gray-400 flex items-start">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                      {char}
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Exemplos:</h4>
                <div className="flex flex-wrap gap-1">
                  {galaxy.examples.map((example, exIndex) => (
                    <span
                      key={exIndex}
                      className="text-xs bg-purple-600/30 text-purple-200 px-2 py-1 rounded"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-black/30 backdrop-blur-md p-8 rounded-lg border border-cyan-500/30"
        >
          <h3 className="text-2xl font-bold text-cyan-300 mb-4">Nossa Galáxia - Via Láctea</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-4">
                A Via Láctea é uma galáxia espiral barrada com aproximadamente 100-400 bilhões de estrelas. 
                Nosso Sistema Solar está localizado em um dos braços espirais, a cerca de 26.000 anos-luz do centro galáctico.
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Diâmetro: ~100.000 anos-luz
                </li>
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Espessura: ~1.000 anos-luz
                </li>
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Massa: ~1.5 trilhões de massas solares
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Estrutura:</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Centro galáctico com buraco negro supermassivo
                </li>
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Braços espirais: Perseus, Scutum-Centaurus, Sagittarius
                </li>
                <li className="text-sm text-gray-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Halo galáctico com matéria escura
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
