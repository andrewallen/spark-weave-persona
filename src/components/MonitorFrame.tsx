
import React, { useState, useEffect } from 'react';

interface MonitorFrameProps {
  children: React.ReactNode;
}

const MonitorFrame = ({ children }: MonitorFrameProps) => {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootTimeout = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(bootTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black p-4 sm:p-6 md:p-8">
      <div className="relative w-full h-full max-w-[2000px] mx-auto">
        {/* Monitor frame with beveled edges */}
        <div className="absolute inset-0 bg-[#1A1F2C] rounded-2xl transform -skew-x-[0.2deg] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#333333] to-[#1A1F2C] rounded-2xl opacity-50" />
        </div>
        
        {/* Screen content */}
        <div className="relative w-full h-full overflow-auto rounded-xl bg-black/90 shadow-inner">
          {/* Power button */}
          <div className="absolute -right-3 top-6 w-3 h-12 bg-[#333] rounded-r-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          </div>
          
          {/* Screen effects */}
          <div className={`relative w-full h-full ${isBooting ? 'booting' : ''}`}>
            {/* Vignette effect */}
            <div className="pointer-events-none fixed inset-0 rounded-xl bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            
            {/* CRT screen curve effect */}
            <div className="pointer-events-none fixed inset-0 rounded-xl bg-gradient-to-b from-transparent via-black/10 to-transparent opacity-40" />
            
            {/* Content */}
            <div className="relative h-full overflow-auto">
              {children}
            </div>
            
            {/* Scan line effect */}
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorFrame;
