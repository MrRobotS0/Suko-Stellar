
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const AstronomicalData = () => {
  const stellarData = [
    { name: "Anãs Vermelhas", value: 75, color: "#FF6B6B" },
    { name: "Tipo Solar", value: 10, color: "#FFD93D" },
    { name: "Gigantes", value: 8, color: "#FF8E53" },
    { name: "Anãs Brancas", value: 6, color: "#74C0FC" },
    { name: "Outras", value: 1, color: "#9775FA" }
  ];

  const planetaryData = [
    { planet: "Mercúrio", distance: 0.39, mass: 0.055, temperature: 167 },
    { planet: "Vênus", distance: 0.72, mass: 0.815, temperature: 462 },
    { planet: "Terra", distance: 1.0, mass: 1.0, temperature: 15 },
    { planet: "Marte", distance: 1.52, mass: 0.107, temperature: -65 },
    { planet: "Júpiter", distance: 5.2, mass: 317.8, temperature: -110 },
    { planet: "Saturno", distance: 9.5, mass: 95.2, temperature: -140 },
    { planet: "Urano", distance: 19.2, mass: 14.5, temperature: -195 },
    { planet: "Netuno", distance: 30.1, mass: 17.1, temperature: -200 }
  ];

  const cosmicScaleData = [
    { object: "Terra", size: 1, unit: "diâmetros terrestres" },
    { object: "Sol", size: 109, unit: "diâmetros terrestres" },
    { object: "Betelgeuse", size: 1400, unit: "diâmetros solares" },
    { object: "Via Láctea", size: 100000, unit: "anos-luz" },
    { object: "Universo Observável", size: 93000000000, unit: "anos-luz" }
  ];

  const exoplanetDiscoveries = [
    { year: 1995, total: 1 },
    { year: 2000, total: 50 },
    { year: 2005, total: 180 },
    { year: 2010, total: 490 },
    { year: 2015, total: 1500 },
    { year: 2020, total: 4300 },
    { year: 2023, total: 5500 }
  ];

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Dados Astronômicos
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-green-500/30"
          >
            <h3 className="text-xl font-bold text-green-300 mb-4">Distribuição de Tipos Estelares</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stellarData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {stellarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-blue-500/30"
          >
            <h3 className="text-xl font-bold text-blue-300 mb-4">Descobertas de Exoplanetas</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exoplanetDiscoveries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #3B82F6',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 mb-8"
        >
          <h3 className="text-xl font-bold text-purple-300 mb-4">Comparação Planetária (Sistema Solar)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planetaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="planet" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #A855F7',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="mass" fill="#A855F7" name="Massa (Terra = 1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Idade do Universo", value: "13.8", unit: "bilhões de anos" },
            { title: "Velocidade da Luz", value: "299.792.458", unit: "m/s" },
            { title: "Temperatura do CMB", value: "2.725", unit: "Kelvin" },
            { title: "Constante de Hubble", value: "70", unit: "km/s/Mpc" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-cyan-500/30 text-center"
            >
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">{item.title}</h4>
              <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
              <p className="text-sm text-gray-400">{item.unit}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-yellow-500/30"
        >
          <h3 className="text-2xl font-bold text-yellow-300 mb-6">Escala Cósmica</h3>
          <div className="space-y-4">
            {cosmicScaleData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
              >
                <span className="text-lg font-medium text-white">{item.object}</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-yellow-300">{item.size.toLocaleString()}</span>
                  <p className="text-sm text-gray-400">{item.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Dados compilados de NASA, ESA, IAU e observatórios astronômicos mundiais
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
