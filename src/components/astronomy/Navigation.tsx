
import { motion } from "framer-motion";
import { Star, Sun, Moon, Telescope } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
}

export const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Star },
    { id: 'solar-system', label: 'Sistema Solar', icon: Sun },
    { id: 'deep-space', label: 'Espaço Profundo', icon: Moon },
    { id: 'planets', label: 'Planetas', icon: Telescope },
    { id: 'galaxies', label: 'Galáxias', icon: Star },
    { id: 'data', label: 'Dados', icon: Telescope },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-blue-500/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Suko Stellar
          </motion.h1>
          
          <div className="flex space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-500/30'
                      : 'hover:bg-blue-500/20 text-blue-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
