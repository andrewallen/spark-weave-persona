
import React, { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
