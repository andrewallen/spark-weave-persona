
import React, { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

const ProjectCard = ({ title, description, technologies, imageUrl, link }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative rounded-lg overflow-hidden bg-secondary h-[400px] interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 transform transition-transform duration-500 scanlines">
        <div 
          className={`transform transition-all duration-500 ${
            isHovered ? 'translate-y-0' : 'translate-y-12'
          }`}
        >
          <h3 
            className="text-2xl font-bold mb-2 text-[#33FF33] text-shadow-glow burn-in chromatic-aberration" 
            data-text={title}
          >
            {title}
          </h3>
          
          <p 
            className={`mb-4 text-sm transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {description}
          </p>
          
          <div 
            className={`flex flex-wrap gap-2 mb-4 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-navy/60 rounded text-lightSlate"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`inline-block px-4 py-2 bg-[#33FF33] text-navy font-medium rounded hover:bg-coral transition-all duration-300 transform ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } text-shadow-glow`}
          >
            View Project
          </a>
        </div>
      </div>
      
      {/* Occasional screen artifact effect */}
      <div 
        className={`absolute inset-0 bg-[#33FF33]/10 z-10 pointer-events-none opacity-0 ${
          Math.random() > 0.7 ? 'animate-[flicker_0.15s_forwards]' : ''
        }`}
        style={{
          top: `${Math.floor(Math.random() * 100)}%`,
          height: '1px',
          opacity: Math.random() > 0.7 ? 0.7 : 0
        }}
      ></div>
    </div>
  );
};

export default ProjectCard;
