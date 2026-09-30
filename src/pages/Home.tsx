import { motion } from 'motion/react';
import { Star, ShieldCheck, Heart, Scissors, Sparkles, Flower2, Droplet, Eye } from 'lucide-react';
import { Page } from '../App';
import KineticText from '../components/KineticText';

interface HomeProps {
  setPage: (page: Page) => void;
}

export default function Home({ setPage }: HomeProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-brand-black overflow-hidden">
        {/* Cinematic Video Background */}
        {/* Mobile Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          src="/mobile-video.mp4"
        />
        {/* Desktop Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          src="/desktop-video.mp4"
        />
        
        <div className="absolute top-[40px] md:top-[50px] left-6 md:left-12 z-10 text-left max-w-xl lg:max-w-2xl" style={{ perspective: "1000px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <KineticText 
              as="p"
              text="Brownwood's Premier Women-Owned Salon"
              className="uppercase tracking-[0.2em] text-xs md:text-sm font-black mb-4 text-[#FFD700] cursor-default"
              style={{ 
                fontFamily: '"Gill Sans MT", "Gill Sans", sans-serif',
                textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 4px 8px rgba(0,0,0,1)' 
              }}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <KineticText 
              as="h1"
              text="Where Texas Hospitality Meets World-Class Beauty."
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight mb-6 cursor-default"
              style={{
                textShadow: '2px 2px 4px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 4px 12px rgba(0,0,0,1)'
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 left-6 md:left-12 z-10"
        >
          <button 
            onClick={() => {
              setPage('contact');
              setTimeout(() => {
                const form = document.getElementById('appointment-form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 150);
            }}
            className="bg-brand-gold text-brand-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-brand-cream transition-colors duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.5)]"
          >
            Reserve Your Experience
          </button>
        </motion.div>
      </section>

      {/* Curated For You Image Only Section */}
      <section className="w-full relative">
        {/* Mobile Image */}
        <img 
          src="/curated-mobile.jpg" 
          alt="Curated Salon Services" 
          className="w-full h-auto block md:hidden"
        />
        {/* Desktop Image */}
        <img 
          src="/curated-home.jpg" 
          alt="Curated Salon Services" 
          className="w-full h-auto hidden md:block"
        />
        {/* Invisible clickable overlay over the 'BOOK NOW' area of the desktop image */}
        <div 
          onClick={() => {
            setPage('contact');
            setTimeout(() => {
              const form = document.getElementById('appointment-form');
              if (form) {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 150);
          }}
          className="absolute z-10 cursor-pointer hidden md:block"
          style={{
            top: '56%',
            left: '67.5%',
            width: '18%',
            height: '11%'
          }}
          title="Book Now"
        >
          <div className="w-full h-full hover:bg-black/5 transition-colors" />
        </div>
      </section>

      {/* Trust Badges / USPs */}
      <section className="bg-brand-beige py-12 border-b border-brand-cream/50" style={{ perspective: "1200px" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col items-center p-8 bg-white border border-[#830404] shadow-sm rounded-sm cursor-default"
          >
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-gold shadow-sm">
              <Star size={24} fill="currentColor" />
            </div>
            <h3 className="font-serif text-xl mb-2 text-brand-black">4.9 Star Rated</h3>
            <p className="text-sm text-brand-black/70">Over 66+ glowing reviews from our beloved local community.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col items-center p-8 bg-white border border-[#830404] shadow-sm rounded-sm cursor-default"
          >
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-gold shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-serif text-xl mb-2 text-brand-black">Impeccably Clean</h3>
            <p className="text-sm text-brand-black/70">Rigorous sanitation protocols in a pristine, relaxing atmosphere.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.4, ease: "easeOut" } }}
            className="flex flex-col items-center p-8 bg-white border border-[#830404] shadow-sm rounded-sm cursor-default"
          >
            <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-gold shadow-sm">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-xl mb-2 text-brand-black">Women-Owned</h3>
            <p className="text-sm text-brand-black/70">Empowering women through elite styling and local leadership.</p>
          </motion.div>

        </div>
      </section>

      {/* Promotional Banner Image */}
      <section className="w-full bg-brand-cream pb-24 relative overflow-hidden" style={{ perspective: "1000px" }}>
        <motion.img 
          initial={{ opacity: 0, scale: 1.1, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src="/home-page.jpg" 
          alt="Estades Salon - True Luxury" 
          className="w-full h-auto cursor-pointer"
          onClick={() => {
            setPage('contact');
            setTimeout(() => {
              const form = document.getElementById('appointment-form');
              if (form) {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 150);
          }}
        />
      </section>
    </div>
  );
}
