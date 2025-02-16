import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from './components/MatrixRain';
import EnterButton from './components/EnterButton';
import AIVoice from './components/AIVoice';

function App() {
  const [isEntering, setIsEntering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldPlayVoice, setShouldPlayVoice] = useState(false);

  const handleEnterStore = () => {
    setShouldPlayVoice(true); // Trigger voice first
    setIsEntering(true);

    // Reset the voice trigger after a delay
    setTimeout(() => {
      setShouldPlayVoice(false);
    }, 1000);

    // After animation, attempt to redirect to Shopify store
    setTimeout(async () => {
      try {
        // Try to connect to the store
        await fetch('https://matrixcity.click', {
          mode: 'no-cors'
        });
        window.location.href = 'https://matrixcity.click';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        setIsEntering(false);
        setShouldPlayVoice(false); // Reset voice trigger if there's an error
        setError('Unable to connect to the store. Please try again later.');
        setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
      }
    }, 3000);
  };

  // Check if we're returning from the store
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('return') === 'true') {
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <MatrixRain />
      <AIVoice trigger={shouldPlayVoice} />
      
      <AnimatePresence>
        {!isEntering && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Matrix City
            </motion.h1>
            
            <motion.p
              className="text-white text-xl md:text-2xl mb-12 text-center max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to the future of commerce. Take the digital pill and explore our cybernetic marketplace.
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-300 text-lg mb-6 text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            <EnterButton onClick={handleEnterStore} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.5, 40] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-20"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-white text-2xl font-mono"
              >
                Entering the Matrix...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;