
import React, { useState, useEffect } from 'react';
import { TextCursor } from 'lucide-react';

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

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    if (isTyping) {
      if (text.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setText(currentTitle.slice(0, text.length + 1));
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
    <h2 className="text-4xl font-mono text-[#4FFFC0] mb-6 animate-slide-down opacity-75 flex items-center gap-1 font-jetbrains" style={{
      animationDelay: '100ms',
      textShadow: '0 0 5px rgba(79, 255, 192, 0.5)'
    }}>
      {text}
      <span 
        className={`inline-block w-1 h-8 bg-[#4FFFC0] ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          boxShadow: '0 0 3px rgba(79, 255, 192, 0.7)'
        }}
      />
    </h2>
  );
};

export default TypewriterText;
