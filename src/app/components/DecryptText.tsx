'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DecryptTextProps {
  text: string;
  className?: string;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function DecryptText({ text, className = '' }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIndex = 0;
    let iterations = 0;

    const decrypt = () => {
      if (currentIndex === text.length) {
        clearInterval(interval);
        return;
      }

      iterations++;
      const result = text
        .split('')
        .map((letter, index) => {
          if (index < currentIndex) {
            return text[index];
          }
          if (index === currentIndex) {
            if (iterations > 5) {
              currentIndex++;
              iterations = 0;
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      setDisplayText(result);
    };

    interval = setInterval(decrypt, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayText}
    </motion.div>
  );
}
