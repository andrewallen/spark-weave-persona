import React, { useState, useEffect } from 'react';
const NavMenu = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const menuItems = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'about',
    label: 'About'
  }, {
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-navy/80 backdrop-blur-md' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-gradient interactive">andrewallen.uk</a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map(item => <a key={item.id} href={`#${item.id}`} className="nav-item interactive">
              {item.label}
            </a>)}
          <a href="#resume" className="px-4 py-2 border border-mint text-mint hover:bg-mint/10 rounded-md transition-all duration-300 interactive">
            Resume
          </a>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white interactive p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <div className="w-6 flex flex-col space-y-1">
            <span className={`block h-0.5 w-full bg-mint transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 bg-mint transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-full'}`}></span>
            <span className={`block h-0.5 w-full bg-mint transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-navy/95 flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {menuItems.map(item => <a key={item.id} href={`#${item.id}`} className="py-3 px-6 text-2xl font-medium text-lightSlate hover:text-mint interactive" onClick={() => setMobileMenuOpen(false)}>
            {item.label}
          </a>)}
        <a href="#resume" className="mt-6 px-6 py-3 border-2 border-mint text-mint hover:bg-mint/10 rounded-md transition-all duration-300 interactive" onClick={() => setMobileMenuOpen(false)}>
          Resume
        </a>
      </div>
    </nav>;
};
export default NavMenu;