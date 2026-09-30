import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Page } from '../App';

const servicesList = [
  {
    id: "01",
    title: "Hair Artistry",
    desc: "Refresh your look with a custom haircut that complements your style. Whether it's a bold change or a trim, we'll make sure you leave feeling great.",
    img: "/hair artistry.jpg"
  },
  {
    id: "02",
    title: "Nail Couture",
    desc: "Indulge in meticulous nail care, long-lasting gel applications, and luxurious spa treatments designed for your hands and feet.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "03",
    title: "Massage Therapy",
    desc: "Unwind with therapeutic massage techniques designed to relieve tension, improve circulation, and revitalize your body in a serene environment.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "04",
    title: "Body Waxing",
    desc: "Experience meticulous and gentle body waxing services for smooth, radiant skin. We ensure a comfortable and precise hair removal process.",
    img: "/body waxing.jpg"
  },
  {
    id: "05",
    title: "Brows & Lashes",
    desc: "Define your features with expert eyebrow shaping, microblading, and tinting services for a flawless, natural look.",
    img: "/brows & lashes.jpg"
  }
];

export default function Services({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="w-full bg-brand-beige pb-0">
      {/* Top Video Header */}
      <div className="w-full bg-brand-black overflow-hidden">
        <video 
          src="/estades-service.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto block object-cover"
        />
      </div>

      {/* Hero Banner Image */}
      <div className="w-full">
        {/* Mobile Image */}
        <img 
          src="/service-mobile-image.jpg" 
          alt="Estades Salon Services Mobile" 
          className="w-full h-auto md:hidden"
        />
        {/* Desktop Image */}
        <img 
          src="/service-image-1.jpg" 
          alt="Estades Salon Services" 
          className="w-full h-auto hidden md:block"
        />
      </div>

      {/* Zig-Zag Services Layout */}
      <div className="py-24 md:py-40 max-w-[1400px] mx-auto px-4 md:px-8 space-y-32 md:space-y-48">
        {servicesList.map((s, i) => {
           const isEven = i % 2 !== 0;
           return (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 80, rotateX: 10 }}
               whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
               viewport={{ once: true, margin: "-150px" }}
               transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
               className={`flex flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''} items-center justify-center relative`}
               style={{ perspective: "1500px" }}
             >
                <div className="w-full lg:w-[60%] h-[450px] lg:h-[650px] relative z-0 overflow-hidden">
                   <motion.img 
                     initial={{ scale: 1.15 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                     src={s.img} alt={s.title} className="w-full h-full object-cover" 
                   />
                </div>
                
                <motion.div 
                   initial={{ opacity: 0, x: isEven ? -50 : 50, z: -50 }}
                   whileInView={{ opacity: 1, x: 0, z: 0 }}
                   viewport={{ once: true, margin: "-150px" }}
                   transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                   className={`w-[90%] lg:w-[45%] bg-brand-cream p-12 lg:p-24 relative z-10 -mt-24 lg:mt-0 ${isEven ? 'lg:-mr-32' : 'lg:-ml-32'} shadow-2xl border border-[#830404] flex flex-col items-center text-center`}
                >
                   <div className="absolute top-6 right-6 lg:top-10 lg:right-10 opacity-70">
                      <ArrowUpRight size={48} strokeWidth={1} className="text-brand-black" />
                   </div>
                   
                   <span className="uppercase tracking-[0.2em] text-xs font-bold text-brand-black mb-6 block">
                      SERVICE {s.id}
                   </span>
                   
                   <h2 className="font-serif text-4xl lg:text-5xl text-brand-black mb-8 leading-tight">
                     {s.title}
                   </h2>
                   
                   <p className="text-brand-black/80 font-light leading-relaxed text-lg max-w-sm">
                      {s.desc}
                   </p>
                </motion.div>
             </motion.div>
           )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-black py-32 text-center px-6 relative overflow-hidden flex items-center justify-center min-h-[500px]">
         {/* Desktop Background */}
         <img src="/estades-salon.png" alt="Estades Salon" className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-60" />
         {/* Mobile Background */}
         <img src="/service-mobile.png" alt="Estades Salon Mobile" className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-60" />
         <div className="absolute inset-0 bg-brand-black/40"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
         <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-serif text-5xl md:text-6xl text-brand-cream mb-10 leading-tight drop-shadow-lg">Ready for your transformation?</h2>
            <button 
              onClick={() => setPage('contact')}
              className="bg-brand-gold text-brand-black px-12 py-5 uppercase tracking-[0.2em] text-sm font-bold hover:bg-brand-cream transition-colors duration-500 shadow-xl"
            >
              Reserve an Appointment
            </button>
         </div>
      </div>
    </div>
  );
}
