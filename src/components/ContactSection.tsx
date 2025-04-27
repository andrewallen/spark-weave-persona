
import React, { useState } from 'react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };
  
  return (
    <div id="contact" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-mint/20 to-coral/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-coral/20 to-mint/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">Get In Touch</h2>
          <p className="mb-12 text-xl">
            Ready to start a conversation? I'm always open to discussing new projects, 
            creative ideas, or opportunities to be part of your vision.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="space-y-6 relative backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-lightSlate">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-md text-lightSlate placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-mint"
                placeholder="John Doe"
                value={formState.name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-lightSlate">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-md text-lightSlate placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-mint"
                placeholder="john@example.com"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-lightSlate">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-md text-lightSlate placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-mint"
                placeholder="How can I help you?"
                value={formState.message}
                onChange={handleChange}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-slate text-navy cursor-wait' 
                  : submitStatus === 'success'
                  ? 'bg-mint text-navy'
                  : 'bg-mint text-navy hover:bg-coral hover:scale-[1.02]'
              }`}
            >
              {isSubmitting 
                ? 'Sending...' 
                : submitStatus === 'success' 
                ? 'Message Sent!' 
                : 'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="absolute bottom-4 right-4 text-mint text-sm animate-fade-in">
                Thanks for your message! I'll get back to you soon.
              </div>
            )}
          </form>
          
          <div className="flex justify-center space-x-8 mt-16">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-mint transition-colors duration-300 interactive">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-mint transition-colors duration-300 interactive">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-mint transition-colors duration-300 interactive">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
