
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
  const [syncIssue, setSyncIssue] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    if (isTyping) {
      if (text.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setText(currentTitle.slice(0, text.length + 1));
          // Random sync issue effect (rarely)
          if (Math.random() < 0.01) {
            setSyncIssue(true);
            setTimeout(() => setSyncIssue(false), 100);
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
      className={`text-3xl md:text-4xl font-mono text-[#33FF33] mb-3 animate-slide-down opacity-75 flex items-center gap-1 font-jetbrains ${syncIssue ? 'animate-[horizontal-sync_0.5s_ease]' : ''}`} 
      style={{
        animationDelay: '100ms',
        textShadow: '0 0 5px rgba(51, 255, 51, 0.5), 0 0 10px rgba(51, 255, 51, 0.2)',
        minHeight: '1.3em',
        lineHeight: '1.1',
        animation: syncIssue ? 'horizontal-sync 0.5s ease' : 'text-jitter 0.5s infinite'
      }}
      data-text={text}
    >
      {text}
      <span 
        className={`inline-block w-1 h-7 bg-[#33FF33] ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          boxShadow: '0 0 5px rgba(51, 255, 51, 0.7)'
        }}
      />
    </h2>
  );
};

export default TypewriterText;
