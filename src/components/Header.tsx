import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export default function Header({ currentPage, setPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setMobileMenuOpen(false);
    
    if (page === 'contact') {
      setTimeout(() => {
        const form = document.getElementById('appointment-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#830404] shadow-md py-4' : 'bg-[#830404] py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer flex flex-col items-center justify-center -mt-1"
          onClick={() => handleNavClick('home')}
        >
          <div className="flex items-end mb-1">
            <span className="neon-glow text-6xl leading-none" style={{ fontFamily: 'var(--font-script)' }}>E</span>
            <span className="neon-glow text-2xl tracking-[0.15em] font-sans uppercase font-medium pb-1 ml-1">STADES</span>
          </div>
          <span className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold drop-shadow-[0_0_8px_rgba(197,160,0,0.8)]">SALON</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                currentPage === item.id 
                  ? 'text-brand-gold font-medium' 
                  : 'text-white hover:text-brand-gold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => handleNavClick('contact')}
            className="bg-brand-black text-brand-cream border border-brand-gold px-6 py-2.5 uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#830404] border-t border-white/10 shadow-lg py-6 px-6 flex flex-col space-y-6 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-lg uppercase tracking-wider text-left ${
                  currentPage === item.id ? 'text-brand-gold' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-brand-black text-brand-cream border border-brand-gold px-6 py-3 uppercase tracking-widest text-sm text-center w-full"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
