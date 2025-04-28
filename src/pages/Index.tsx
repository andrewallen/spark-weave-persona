
import React from 'react';
import Cursor from '../components/Cursor';
import ContactSection from '../components/ContactSection';
import TypewriterText from '../components/TypewriterText';

const Index = () => {
  return (
    <div className="crt relative">
      <Cursor />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative scanlines">
        <div className="container mx-auto px-6 pt-32">
          <div className="max-w-3xl">
            <p className="text-mint mb-4 animate-fade-in">Hi there! I'm</p>
            <h1 className="text-gradient mb-4 animate-slide-down">Andrew Allen</h1>
            <TypewriterText />
            <p className="text-xl mb-8 max-w-xl animate-slide-down" style={{
            animationDelay: '200ms'
          }}>I shape the future of digital experiences at the crossroads of design, technology, and creativity — blending strategic insight, innovation, and leadership to push what's possible.</p>
            <div className="flex flex-wrap gap-4 animate-slide-down" style={{
            animationDelay: '300ms'
          }}>
              <a href="#contact" className="px-6 py-3 bg-mint text-navy font-medium rounded-md hover:bg-coral transition-colors duration-300 interactive">
                Get In Touch
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
            <div className="w-6 h-10 rounded-full border-2 border-mint flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-mint rounded-full animate-slide-down" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-mint/10 scanlines">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-mint/70">
              © {new Date().getFullYear()} Andrew Allen. All rights reserved.
            </p>
            <p className="text-mint/70 mt-2 md:mt-0">
              Built with <span className="text-coral">❤</span> by Andrew Allen
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
