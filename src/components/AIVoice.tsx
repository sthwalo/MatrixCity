import React, { useEffect, useState } from 'react';

interface AIVoiceProps {
  trigger: boolean;
}

const AIVoice: React.FC<AIVoiceProps> = ({ trigger }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance('Welcome to Matrix City');
        
        // Get all available voices
        const availableVoices = window.speechSynthesis.getVoices();
        console.log('Available voices:', availableVoices.map(v => `${v.name} (${v.lang})`));

        // Try to find a female English voice
        const femaleVoice = availableVoices.find(voice => 
          voice.lang.includes('en') && 
          (voice.name.includes('Female') || 
           voice.name.includes('Victoria') || 
           voice.name.includes('Samantha') ||
           voice.name.includes('Karen'))
        );

        if (femaleVoice) {
          console.log('Selected voice:', femaleVoice.name);
          utterance.voice = femaleVoice;
        } else {
          console.log('No female voice found, using default');
        }

        // Adjust voice settings for more feminine sound
        utterance.pitch = 1.2;  // Higher pitch
        utterance.rate = 0.9;   // Slightly slower
        utterance.volume = 1;

        // Debug logs
        utterance.onstart = () => console.log('Speech started');
        utterance.onend = () => console.log('Speech ended');
        utterance.onerror = (e) => console.error('Speech error:', e);

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Speech synthesis error:', error);
      }
    }
  };

  useEffect(() => {
    // Initialize voices
    const initVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        console.log('Voices loaded:', availableVoices.length);
      }
    };

    // Load voices and handle voice changes
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      initVoices();
      window.speechSynthesis.onvoiceschanged = initVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.onvoiceschanged) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (trigger && voices.length > 0) {
      speak();
    }
  }, [trigger, voices]);

  return null;
};

export default AIVoice;