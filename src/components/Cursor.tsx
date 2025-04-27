import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [trail, setTrail] = useState<{x: number, y: number, opacity: number}[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, opacity: 1 }];
        // Keep only recent positions
        if (newTrail.length > 5) {
          return newTrail.slice(newTrail.length - 5);
        }
        return newTrail;
      });
    };

    const handleMouseEnterLink = () => setLinkHovered(true);
    const handleMouseLeaveLink = () => setLinkHovered(false);
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    // Fade effect for trail
    const fadeInterval = setInterval(() => {
      setTrail(prevTrail => 
        prevTrail.map(point => ({
          ...point,
          opacity: point.opacity > 0 ? point.opacity - 0.2 : 0
        })).filter(point => point.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
      
      clearInterval(fadeInterval);
    };
  }, []);

  const cursorOuterStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
  };

  const cursorInnerStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
  };

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div 
          key={index}
          className="fixed pointer-events-none z-[9990]"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: '4px',
            height: '4px',
            backgroundColor: '#33FF33',
            borderRadius: '50%',
            opacity: point.opacity * 0.5,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 5px rgba(51, 255, 51, 0.7)',
            transition: 'opacity 0.2s ease'
          }}
        />
      ))}
      
      <div 
        className={`cursor-outer ${linkHovered ? 'link-hover' : ''}`}
        style={cursorOuterStyle}
      />
      <div 
        className={`cursor-inner ${linkHovered ? 'link-hover' : ''}`}
        style={cursorInnerStyle}
      />
    </>
  );
};

export default Cursor;
