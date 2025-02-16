import React, { useEffect, useState } from 'react';

interface AIVoiceProps {
  trigger: boolean;
}

const AIVoice: React.FC<AIVoiceProps> = ({ trigger }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (trigger && voices.length > 0) {
      try {
        const utterance = new SpeechSynthesisUtterance('Welcome to Matrix City');
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        utterance.volume = 1;

        // Find a suitable voice
        const voice = voices.find(v => 
          v.lang.includes('en') && 
          (v.name.includes('Male') || v.name.includes('Daniel'))
        ) || voices[0];

        if (voice) {
          utterance.voice = voice;
        }

        // Debug logs
        console.log('Speaking with voice:', voice?.name);
        
        utterance.onstart = () => console.log('Speech started');
        utterance.onend = () => console.log('Speech ended');
        utterance.onerror = (e) => console.error('Speech error:', e);

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Speech synthesis error:', error);
      }
    }
  }, [trigger, voices]);

  return null;
};

export default AIVoice;