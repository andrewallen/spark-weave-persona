
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
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    if (isTyping) {
      if (text.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setText(currentTitle.slice(0, text.length + 1));
          
          // Random glitch effect (rare)
          if (Math.random() > 0.95) {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 50);
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
      className={`text-4xl font-mono mb-4 animate-slide-down opacity-75 flex items-center gap-1 font-jetbrains retro-text ${glitch ? 'glitch' : ''}`} 
      style={{
        animationDelay: '100ms',
        textShadow: '0 0 8px rgba(51, 255, 51, 0.8), 0 0 12px rgba(51, 255, 51, 0.5)',
        color: '#33ff33',
        minHeight: '1.5em',
        lineHeight: '1.2',
        position: 'relative',
        letterSpacing: '0.5px'
      }}
    >
      <span className="relative inline-block">
        {text}
        <span 
          className="ghost-text absolute top-0 left-0 opacity-20"
          style={{ filter: 'blur(1px)' }}
        >
          {text}
        </span>
      </span>
      <span 
        className={`inline-block w-1 h-8 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          backgroundColor: '#33ff33',
          boxShadow: '0 0 6px rgba(51, 255, 51, 0.9)',
          transform: glitch ? 'translateY(2px)' : 'none',
          transition: 'transform 0.05s ease'
        }}
      />
    </h2>
  );
};

export default TypewriterText;
