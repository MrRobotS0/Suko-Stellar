
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

const Planet = ({ 
  position, 
  size, 
  color, 
  orbitSpeed, 
  rotationSpeed, 
  name 
}: { 
  position: [number, number, number];
  size: number;
  color: string;
  orbitSpeed: number;
  rotationSpeed: number;
  name: string;
}) => {
  const meshRef = useRef<any>();
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += orbitSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] + size + 0.5, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const SolarSystemScene = () => {
  const planets = [
    { name: "Mercúrio", position: [2, 0, 0] as [number, number, number], size: 0.1, color: "#8C7853", orbitSpeed: 0.02, rotationSpeed: 0.05 },
    { name: "Vênus", position: [3, 0, 0] as [number, number, number], size: 0.15, color: "#FFC649", orbitSpeed: 0.015, rotationSpeed: 0.03 },
    { name: "Terra", position: [4, 0, 0] as [number, number, number], size: 0.16, color: "#6B93D6", orbitSpeed: 0.01, rotationSpeed: 0.02 },
    { name: "Marte", position: [5, 0, 0] as [number, number, number], size: 0.12, color: "#CD5C5C", orbitSpeed: 0.008, rotationSpeed: 0.018 },
    { name: "Júpiter", position: [8, 0, 0] as [number, number, number], size: 0.5, color: "#D8CA9D", orbitSpeed: 0.005, rotationSpeed: 0.01 },
    { name: "Saturno", position: [12, 0, 0] as [number, number, number], size: 0.4, color: "#FAD5A5", orbitSpeed: 0.003, rotationSpeed: 0.008 },
    { name: "Urano", position: [16, 0, 0] as [number, number, number], size: 0.25, color: "#4FD0E3", orbitSpeed: 0.002, rotationSpeed: 0.006 },
    { name: "Netuno", position: [20, 0, 0] as [number, number, number], size: 0.24, color: "#4B70DD", orbitSpeed: 0.001, rotationSpeed: 0.005 },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      
      {/* Sol */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.3} />
      </mesh>
      
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        SOL
      </Text>

      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
      
      <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.2} />
    </>
  );
};

export const SolarSystem = () => {
  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Sistema Solar Interativo
        </h2>
        
        <div className="h-96 mb-8 rounded-lg overflow-hidden border border-blue-500/30 bg-black/20">
          <Canvas camera={{ position: [0, 5, 25], fov: 60 }}>
            <SolarSystemScene />
          </Canvas>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Sol", temp: "5.778 K", mass: "1.989 × 10³⁰ kg", type: "Estrela Anã Amarela" },
            { name: "Terra", temp: "288 K", mass: "5.972 × 10²⁴ kg", type: "Planeta Rochoso" },
            { name: "Júpiter", temp: "165 K", mass: "1.898 × 10²⁷ kg", type: "Gigante Gasoso" },
            { name: "Saturno", temp: "134 K", mass: "5.683 × 10²⁶ kg", type: "Gigante Gasoso" },
          ].map((body, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-blue-500/30"
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-3">{body.name}</h3>
              <p className="text-sm text-gray-300 mb-2"><strong>Temperatura:</strong> {body.temp}</p>
              <p className="text-sm text-gray-300 mb-2"><strong>Massa:</strong> {body.mass}</p>
              <p className="text-sm text-gray-300"><strong>Tipo:</strong> {body.type}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
