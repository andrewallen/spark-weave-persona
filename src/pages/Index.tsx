import React, { useEffect, useState } from 'react';
import Cursor from '../components/Cursor';
import ParticleGrid from '../components/ParticleGrid';
import NavMenu from '../components/NavMenu';
import ProjectCard from '../components/ProjectCard';
import ContactSection from '../components/ContactSection';
import TypewriterText from '../components/TypewriterText';
const Index = () => {
  const [isVisible, setIsVisible] = useState({
    about: false,
    projects: false
  });
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting && id in isVisible) {
          setIsVisible(prev => ({
            ...prev,
            [id]: true
          }));
        }
      });
    }, {
      threshold: 0.2
    });
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);
  const projects = [{
    title: 'AI Powered Analytics Platform',
    description: 'A machine learning platform that provides insights and predictions for business data.',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow'],
    imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0',
    link: '#'
  }, {
    title: 'E-commerce Mobile App',
    description: 'A modern shopping experience with personalized recommendations.',
    technologies: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f',
    link: '#'
  }, {
    title: 'Blockchain Wallet Interface',
    description: 'A secure and intuitive wallet for managing cryptocurrency assets.',
    technologies: ['Vue.js', 'Web3.js', 'Solidity', 'GraphQL'],
    imageUrl: 'https://images.unsplash.com/photo-1607359390930-93e1a8a61896',
    link: '#'
  }];
  return <div className="crt">
      <Cursor />
      <ParticleGrid />
      <NavMenu />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative scanlines">
        <div className="container mx-auto px-6 pt-32">
          <div className="max-w-3xl">
            
            <h1 className="text-gradient mb-4 animate-slide-down">Andrew Allen</h1>
            <TypewriterText />
            <p className="text-xl mb-8 max-w-xl animate-slide-down" style={{
            animationDelay: '200ms'
          }}>I shape the future of digital experiences at the crossroads of design, technology, and creativity — blending strategic insight, innovation, and leadership to push what’s possible.</p>
            <div className="flex flex-wrap gap-4 animate-slide-down" style={{
            animationDelay: '300ms'
          }}>
              <a href="#projects" className="px-6 py-3 bg-mint text-navy font-medium rounded-md hover:bg-coral transition-colors duration-300 interactive">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 border border-mint text-mint font-medium rounded-md hover:bg-mint/10 transition-all duration-300 interactive">
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
      
      {/* About Section */}
      <section id="about" className={`py-24 relative scanlines ${isVisible.about ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About Me</h2>
              <p className="mb-4">
                I'm a multidisciplinary developer and designer with over 6 years of experience creating 
                engaging digital experiences. My work blends technical expertise with creative vision 
                to produce intuitive, visually stunning solutions.
              </p>
              <p className="mb-4">
                After graduating with a degree in Computer Science, I honed my skills working with 
                startups and established companies alike, focusing on creating memorable user experiences 
                that drive engagement and deliver results.
              </p>
              <p>
                When I'm not coding or designing, you'll find me exploring new technologies, 
                contributing to open-source projects, or hiking in the mountains with my dog.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full aspect-square bg-secondary rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-mint rounded-full flex items-center justify-center text-navy font-bold z-10 border-4 border-navy animate-spin-slow">
                <div className="text-center m-auto">
                  <div className="text-xs">Creative</div>
                  <div className="text-xs">Problem</div>
                  <div className="text-xs">Solver</div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 transform -translate-x-4 -translate-y-4 border-2 border-mint rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className={`py-24 relative scanlines ${isVisible.projects ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, index) => <ProjectCard key={index} title={project.title} description={project.description} technologies={project.technologies} imageUrl={project.imageUrl} link={project.link} />)}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-mint hover:text-coral transition-colors duration-300 group interactive">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
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
    </div>;
};
export default Index;