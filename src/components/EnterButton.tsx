import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface EnterButtonProps {
  onClick: () => void;
}

const EnterButton: React.FC<EnterButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative px-8 py-4 bg-black border-2 border-green-500 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-green-500/20 group-hover:bg-green-500/30 transition-colors" />
      <div className="relative flex items-center space-x-2">
        <Terminal className="w-6 h-6 text-white" />
        <span className="text-xl font-bold text-white">Enter The Matrix</span>
      </div>
      <div className="absolute -inset-full top-0 block w-1/2 h-full z-5 transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </motion.button>
  );
};

export default EnterButton;