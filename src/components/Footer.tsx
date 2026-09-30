import { useState } from 'react';
import { Page } from '../App';
import { MapPin, Phone, Instagram, Facebook, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setPage: (page: Page) => void;
}

const PrivacyPolicy = () => (
  <div className="space-y-6 text-brand-black/80">
    <h2 className="text-3xl font-serif text-brand-black mb-6">Privacy Policy</h2>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">1. Information We Collect</h3>
    <p>We collect information you provide directly to us, such as when you book an appointment, create an account, subscribe to our newsletter, or contact us for support. The types of personal information we may collect include your name, email address, phone number, payment information, and any other information you choose to provide.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">2. How We Use Your Information</h3>
    <p>We use the information we collect to operate our business, provide and improve our services, process your transactions, send you technical notices and support messages, and communicate with you about products, services, offers, and events offered by Estades Salon.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">3. Information Sharing</h3>
    <p>We do not share your personal information with third parties except as described in this privacy policy, such as with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">4. Security</h3>
    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">5. Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at estadessalonllc@gmail.com.</p>
  </div>
);

const TermsOfService = () => (
  <div className="space-y-6 text-brand-black/80">
    <h2 className="text-3xl font-serif text-brand-black mb-6">Terms of Service</h2>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">1. Agreement to Terms</h3>
    <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations in the United States and the State of Texas.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">2. Appointments and Cancellations</h3>
    <p>We require at least 24 hours notice for all appointment cancellations. Failure to cancel within this timeframe or "no-shows" may result in a cancellation fee equal to a percentage of the scheduled service.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">3. Services and Pricing</h3>
    <p>All prices listed on our website are starting prices and are subject to change based on the length, thickness, and condition of your hair, as well as the specific techniques required to achieve your desired result. We recommend a consultation for exact pricing.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">4. Salon Policies</h3>
    <p>Estades Salon maintains a safe, respectful environment. We reserve the right to refuse service to anyone demonstrating inappropriate behavior. For the safety and relaxation of all guests, children are not permitted in the salon unless they are receiving a service.</p>
    
    <h3 className="text-xl font-medium mt-6 mb-2">5. Governing Law</h3>
    <p>These terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.</p>
  </div>
);

export default function Footer({ setPage }: FooterProps) {
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-brand-black text-brand-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col items-start mb-6 cursor-pointer" onClick={() => setPage('home')}>
            <div className="flex items-end mb-2">
              <span className="neon-glow text-7xl leading-none -mb-1" style={{ fontFamily: 'var(--font-script)' }}>E</span>
              <span className="neon-glow text-3xl tracking-[0.15em] font-sans uppercase font-medium pb-1 ml-1">STADES</span>
            </div>
            <span className="text-[12px] tracking-[0.4em] text-brand-gold uppercase font-bold drop-shadow-[0_0_8px_rgba(197,160,0,0.8)] ml-2">SALON</span>
          </div>
          <p className="text-sm text-brand-beige/70 leading-relaxed mb-6">
            Texas Modern Chic meets international luxury. Brownwood's premier destination for women-owned, world-class beauty services.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com/estadessalon" target="_blank" rel="noopener noreferrer" className="text-brand-beige hover:text-brand-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com/EstadesSalon" target="_blank" rel="noopener noreferrer" className="text-brand-beige hover:text-brand-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg tracking-wide mb-6">Explore</h4>
          <ul className="space-y-4">
            {['home', 'services', 'gallery', 'about', 'contact'].map((page) => (
              <li key={page}>
                <button 
                  onClick={() => setPage(page as Page)}
                  className="text-brand-beige/70 hover:text-brand-gold text-sm uppercase tracking-wider transition-colors"
                >
                  {page.replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg tracking-wide mb-6">Contact</h4>
          <ul className="space-y-4 text-brand-beige/70 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span>308 N Fisk Ave,<br/>Brownwood, TX 76801</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-brand-gold shrink-0" />
              <span>+1 325-203-5096</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-brand-gold shrink-0" />
              <a href="mailto:estadessalonllc@gmail.com" className="hover:text-brand-gold transition-colors">estadessalonllc@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-serif text-lg tracking-wide mb-6">Hours</h4>
          <ul className="space-y-3 text-brand-beige/70 text-sm">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Monday - Friday</span>
              <span>9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span>Saturday</span>
              <span>10:00 AM - 5:00 PM</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-white/10 text-center flex flex-col justify-center items-center text-xs text-brand-beige/50 space-y-6">
        <div className="flex flex-col md:flex-row justify-between w-full items-center space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Estades Salon. All rights reserved.</p>
          <div className="space-x-4">
            <button onClick={() => setModalContent('privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button>
            <button onClick={() => setModalContent('terms')} className="hover:text-brand-gold transition-colors">Terms of Service</button>
          </div>
        </div>
        
        <div className="text-white tracking-widest text-[10px] md:text-[11px] uppercase pb-4">
          Created by <span className="text-[#FFD700] font-bold">SHYAM CREATIVES LABS</span> (KAILASHH PRASAAD)
        </div>
      </div>
    </footer>

    {/* Modals */}
    <AnimatePresence>
      {modalContent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6"
          onClick={() => setModalContent(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-brand-cream w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl border-t-4 border-[#830404]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-brand-cream border-b border-brand-black/10 flex justify-end p-4 z-10">
              <button 
                onClick={() => setModalContent(null)}
                className="text-brand-black/50 hover:text-[#830404] transition-colors p-2"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-8 md:p-12">
              {modalContent === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
