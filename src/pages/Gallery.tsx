import { motion } from 'motion/react';
import KineticText from '../components/KineticText';
import TextAnimate from '../components/TextAnimate';

const galleryImages = [
  {
    url: '/1.jpg',
    title: 'Salon Experience',
    size: 'tall'
  },
  {
    url: '/2.jpg',
    title: 'Our Modern Styling Stations',
    size: 'wide'
  },
  {
    url: '/3.jpg',
    title: 'Transformations',
    size: 'square'
  },
  {
    url: '/4.jpg',
    title: 'Precision & Artistry',
    size: 'square'
  },
  {
    url: '/5.jpg',
    title: 'Luxury Environment',
    size: 'tall'
  },
  {
    url: '/6.jpg',
    title: 'Beautiful Results',
    size: 'wide'
  },
  {
    url: '/7.jpg',
    title: 'Signature Styling',
    size: 'square'
  },
  {
    url: '/8.jpg',
    title: 'Bespoke Services',
    size: 'square'
  },
  {
    url: '/9.jpg',
    title: 'Creative Vision',
    size: 'tall'
  },
  {
    url: '/10.jpg',
    title: 'Flawless Finish',
    size: 'square'
  },
  {
    url: '/11.jpg',
    title: 'Salon Details',
    size: 'wide'
  }
];

export default function Gallery() {
  return (
    <div className="w-full bg-brand-cream pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center py-20" style={{ perspective: "1000px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6"
        >
          <KineticText 
            as="h1" 
            text="Our Portfolio" 
            className="font-serif text-4xl md:text-5xl text-brand-black cursor-default justify-center" 
          />
        </motion.div>
        <TextAnimate 
          animation="blurIn"
          by="text"
          as="p"
          delay={0.2}
          duration={0.6}
          className="text-brand-black/70 text-lg max-w-2xl mx-auto"
        >
          A glimpse into the Estades Salon experience. Featuring our historic stone masonry facade, warm wood floors, and real client transformations.
        </TextAnimate>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12" style={{ perspective: "1500px" }}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden break-inside-avoid rounded-sm cursor-crosshair border border-[#830404]"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors duration-300 flex items-end p-6">
                <p className="text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-24">
        <button className="bg-brand-black text-brand-cream border border-brand-gold px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-all duration-300">
          Follow us on Instagram
        </button>
      </div>
    </div>
  );
}
