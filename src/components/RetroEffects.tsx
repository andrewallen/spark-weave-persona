
import React, { useEffect, useState } from 'react';

const RetroEffects = () => {
  const [randomGlitch, setRandomGlitch] = useState(false);
  
  useEffect(() => {
    // Random glitch effect - reduced frequency and complexity
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.98) {
        setRandomGlitch(true);
        setTimeout(() => setRandomGlitch(false), 120);
      }
    }, 5000);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, []);
  
  return (
    <>
      {/* Screen overlay for color tinting - simplified */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[#001000]/10 mix-blend-overlay"></div>
      
      {/* Noise effect - using CSS background instead of div for better performance */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.2,
          pointerEvents: 'none'
        }}
      ></div>
      
      {/* Random screen artifacts - only render when active */}
      {randomGlitch && (
        <div 
          className="fixed z-30 pointer-events-none"
          style={{ 
            height: '2px', 
            width: '100%',
            left: 0,
            top: `${Math.floor(Math.random() * window.innerHeight)}px`,
            backgroundColor: 'rgba(51, 255, 51, 0.5)',
            boxShadow: '0 0 10px rgba(51, 255, 51, 0.7), 0 0 20px rgba(51, 255, 51, 0.3)'
          }}
        ></div>
      )}
      
      {/* Subtle horizontal lines for screen texture - simplified */}
      <div 
        className="fixed inset-0 pointer-events-none z-15" 
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 10, 2, 0.03) 50%)',
          backgroundSize: '100% 2px'
        }}
      ></div>
      
      {/* Screen edge vignette - simplified */}
      <div 
        className="fixed inset-0 pointer-events-none z-25"
        style={{
          background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 10, 0, 0.4) 100%)'
        }}
      ></div>
      
      {/* Screen flicker animation - using CSS animation for better performance */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 animate-[flicker_8s_infinite]"
        style={{
          backgroundColor: 'rgba(51, 255, 51, 0.02)',
          opacity: 0
        }}
      ></div>
    </>
  );
};

export default RetroEffects;
