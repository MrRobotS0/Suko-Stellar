
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";

const FloatingPlanet = ({ position, color, size }: { position: [number, number, number], color: string, size: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
      
      <FloatingPlanet position={[-5, 2, -3]} color="#4A90E2" size={0.8} />
      <FloatingPlanet position={[5, -1, -5]} color="#E24A4A" size={0.6} />
      <FloatingPlanet position={[2, 3, -8]} color="#E2A04A" size={1.2} />
      <FloatingPlanet position={[-3, -2, -6]} color="#4AE290" size={0.9} />
      
      <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Scene3D />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SUKO STELLAR
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed"
          >
            Explore os mistérios do universo através de visualizações 3D interativas, 
            dados astronômicos precisos e uma jornada imersiva pelo cosmos infinito.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">93 Bilhões</h3>
              <p className="text-sm text-gray-300">Anos-luz de diâmetro observável</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">2 Trilhões</h3>
              <p className="text-sm text-gray-300">Galáxias estimadas</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-pink-500/30">
              <h3 className="text-lg font-semibold text-pink-300 mb-2">13.8 Bilhões</h3>
              <p className="text-sm text-gray-300">Anos de idade do universo</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
