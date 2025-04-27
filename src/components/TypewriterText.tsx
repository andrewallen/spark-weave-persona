import React, { useState, useEffect } from 'react';

const titles = [
  "Creative Developer",
  "Digital Innovator", 
  "Tech Strategist",
  "Problem Solver",
  "UX Engineer",
  "Adventurer",
  "Amateur Athlete",
  "Lifelong Learner"
];

export const TypewriterText = () => {
  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [glitchText, setGlitchText] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootTimeout = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(bootTimeout);
  }, []);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    if (isTyping) {
      if (text.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setText(currentTitle.slice(0, text.length + 1));
          // Random glitch effect
          if (Math.random() < 0.1) {
            setGlitchText(true);
            setTimeout(() => setGlitchText(false), 50);
          }
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length === 0) {
        const nextIndex = (titleIndex + 1) % titles.length;
        setTitleIndex(nextIndex);
        setIsTyping(true);
      } else {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, titleIndex, isTyping]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 
      className={`text-4xl font-mono text-[#33FF33] mb-4 opacity-90 flex items-center gap-1 font-jetbrains text-glow typing-text ${
        glitchText ? 'glitch' : ''
      }`}
      style={{
        minHeight: '1.5em',
        lineHeight: '1.2',
        filter: glitchText ? 'blur(0.5px)' : 'none',
      }}
    >
      {isBooting ? '>' : text}
      <span 
        className={`inline-block w-1 h-8 bg-[#33FF33] ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 cursor-glow`}
      />
    </h2>
  );
};

export default TypewriterText;
