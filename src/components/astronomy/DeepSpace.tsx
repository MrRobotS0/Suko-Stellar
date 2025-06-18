
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Nebula = ({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) => {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
      meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[2, 0.8, 16, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
};

const BlackHole = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.05;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const DeepSpaceScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Stars radius={500} depth={100} count={50000} factor={10} saturation={0} />
      
      <Nebula position={[-10, 5, -20]} color="#9B59B6" scale={1.5} />
      <Nebula position={[15, -8, -30]} color="#3498DB" scale={2} />
      <Nebula position={[0, 10, -40]} color="#E74C3C" scale={1.8} />
      
      <BlackHole position={[5, -5, -15]} />
      
      <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.1} />
    </>
  );
};

export const DeepSpace = () => {
  const phenomena = [
    {
      name: "Nebulosas",
      description: "Vastas nuvens de gás e poeira interestelar onde nascem as estrelas",
      facts: ["Podem ter anos-luz de extensão", "Compostas principalmente de hidrogênio", "Berçários estelares"]
    },
    {
      name: "Buracos Negros",
      description: "Regiões do espaço-tempo onde a gravidade é tão forte que nada pode escapar",
      facts: ["Horizonte de eventos", "Singularidade no centro", "Curvam o espaço-tempo"]
    },
    {
      name: "Pulsares",
      description: "Estrelas de nêutrons em rotação que emitem feixes de radiação",
      facts: ["Rotação extremamente precisa", "Densidade incrível", "Faróis cósmicos"]
    },
    {
      name: "Quasares",
      description: "Núcleos galácticos ativos extremamente luminosos alimentados por buracos negros",
      facts: ["Mais brilhantes que galáxias inteiras", "Distâncias cosmológicas", "Jatos relativísticos"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Espaço Profundo
        </h2>
        
        <div className="h-96 mb-8 rounded-lg overflow-hidden border border-purple-500/30 bg-black/20">
          <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
            <DeepSpaceScene />
          </Canvas>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {phenomena.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-purple-500/30"
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">{item.name}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.facts.map((fact, factIndex) => (
                  <li key={factIndex} className="text-sm text-gray-400 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    {fact}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
