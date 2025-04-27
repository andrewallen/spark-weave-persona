import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [trail, setTrail] = useState<{x: number, y: number, opacity: number}[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail - reduced number of trail points for better performance
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, opacity: 1 }];
        // Keep only recent positions (reduced from 5 to 3)
        if (newTrail.length > 3) {
          return newTrail.slice(newTrail.length - 3);
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
    
    // Track scrolling to fix the disappearing cursor issue
    let scrollTimer: number;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    // IMPORTANT: Only get truly interactive elements, not just any with the "interactive" class
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    // Fade effect for trail - less frequent updates for better performance
    const fadeInterval = setInterval(() => {
      setTrail(prevTrail => 
        prevTrail.map(point => ({
          ...point,
          opacity: point.opacity > 0 ? point.opacity - 0.3 : 0
        })).filter(point => point.opacity > 0)
      );
    }, 100);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
      
      clearInterval(fadeInterval);
      clearTimeout(scrollTimer);
    };
  }, []);

  const cursorOuterStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden || isScrolling ? 0 : 0.8,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
  };

  const cursorInnerStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden || isScrolling ? 0 : 0.8,
  };

  return (
    <>
      {/* Trail effect - reduced for better performance */}
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
            opacity: point.opacity * 0.4,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 5px rgba(51, 255, 51, 0.6)',
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
