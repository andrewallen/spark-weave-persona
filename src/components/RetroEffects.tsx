
import React, { useEffect, useState } from 'react';

const RetroEffects = () => {
  const [randomGlitch, setRandomGlitch] = useState(false);
  
  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setRandomGlitch(true);
        setTimeout(() => setRandomGlitch(false), 150);
      }
    }, 3000);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, []);
  
  return (
    <>
      {/* Screen overlay for color tinting */}
      <div className="screen-overlay"></div>
      
      {/* Noise effect */}
      <div className="screen-noise"></div>
      
      {/* Random screen artifacts */}
      {randomGlitch && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none"
          style={{ 
            height: '2px', 
            top: `${Math.floor(Math.random() * window.innerHeight)}px`,
            backgroundColor: 'rgba(51, 255, 51, 0.5)',
            boxShadow: '0 0 10px rgba(51, 255, 51, 0.7), 0 0 20px rgba(51, 255, 51, 0.3)'
          }}
        ></div>
      )}
      
      {/* Subtle horizontal lines for screen texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-20" 
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 10, 2, 0.03) 50%)',
          backgroundSize: '100% 2px',
          mixBlendMode: 'multiply'
        }}
      ></div>
      
      {/* Screen edge vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 10, 0, 0.4) 100%)',
          mixBlendMode: 'multiply'
        }}
      ></div>
      
      {/* Screen flicker animation */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-0"
        style={{
          backgroundColor: 'rgba(51, 255, 51, 0.05)',
          animation: 'flicker 8s infinite'
        }}
      ></div>
    </>
  );
};

export default RetroEffects;
