import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Sparkles, Flower2, Droplet, Eye, Palette, Crown, ChevronRight } from 'lucide-react';
import KineticText from '../components/KineticText';
import TextAnimate from '../components/TextAnimate';

export const pricingData = [
  {
    id: 'hair',
    category: 'HAIR SERVICES',
    icon: <Scissors size={20} />,
    items: [
      { name: "Children's Haircut", price: 'Starting at $31' },
      { name: 'Ladies Haircut', price: 'Starting at $41' },
      { name: "Men's Haircut", price: 'Starting at $32' },
      { name: 'Bang Trim', price: 'Starting at $15' },
      { name: 'Beard Trim', price: 'Starting at $15' }
    ]
  },
  {
    id: 'style',
    category: 'STYLE & CARE',
    icon: <Flower2 size={20} />,
    items: [
      { name: 'Shampoo, Blow-dry & Style', price: 'Starting at $32' },
      { name: 'Special Occasion', price: 'Starting at $78' },
      { name: 'Olaplex Treatment', price: 'Starting at $31' },
      { name: 'Redken Clear Gloss Treatment', price: 'Starting at $31' },
      { name: 'Acidic Bonding Concentrate Treatment', price: 'Starting at $35' },
      { name: 'Absolut Repair Molecular Treatment', price: 'Starting at $35' }
    ]
  },
  {
    id: 'texture',
    category: 'TEXTURE SERVICES',
    icon: <Sparkles size={20} />,
    items: [
      { name: 'Perms & Relaxers', price: 'Starting at $91' },
      { name: 'Brazilian Blowout', price: 'Starting at $240' },
      { name: 'Socap Extensions', price: 'Consultation Required' },
      { name: 'Easihair Pro Tape-in Extensions', price: 'Consultation Required' },
      { name: 'Bellami Extensions', price: 'Consultation Required' },
      { name: 'HaloCouture Extensions', price: 'Consultation Required' }
    ]
  },
  {
    id: 'color',
    category: 'COLOR SERVICES',
    icon: <Palette size={20} />,
    note: '*Prices may vary due to desired look',
    items: [
      { name: 'Hairline Touch-up', price: 'Starting at $67' },
      { name: 'Root Touch Up', price: 'Starting at $63' },
      { name: 'All Over Color', price: 'Starting at $83' },
      { name: 'Partial Highlight', price: 'Starting at $109' },
      { name: 'Full Highlight', price: 'Starting at $138' },
      { name: 'Balayage', price: 'Starting at $162' },
      { name: 'Toner', price: 'Starting at $29' },
      { name: "Men's Color", price: 'Starting at $38' }
    ]
  },
  {
    id: 'waxing',
    category: 'WAXING SERVICES',
    icon: <Droplet size={20} />,
    items: [
      { name: 'Eyebrows', price: 'Starting at $21' },
      { name: 'Lip', price: 'Starting at $17' },
      { name: 'Chin', price: 'Starting at $17' },
      { name: 'Full Face', price: 'Starting at $43' }
    ]
  },
  {
    id: 'glo',
    category: 'GLO MINERALS',
    icon: <Eye size={20} />,
    items: [
      { name: 'Makeup Application', price: '$39' }
    ]
  },
  {
    id: 'bridal',
    category: 'BRIDAL SERVICES',
    icon: <Crown size={20} />,
    items: [
      { name: 'Bridal Packages', price: 'Pricing upon consultation. On site services may be available upon request.' }
    ]
  }
];

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState(pricingData[0].id);

  const activeData = pricingData.find(d => d.id === activeCategory);

  return (
    <div className="w-full bg-brand-cream min-h-screen">
      {/* Hero Header */}
      <section className="relative pt-28 pb-64 md:pt-40 md:pb-32 border-b border-brand-gold overflow-hidden">
        {/* Light Theme Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/pricing-image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Faint dark gradient from right to make white text readable */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-end text-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 md:mb-4"
          >
            <KineticText 
              as="h1" 
              text="Service Menu" 
              className="font-serif text-3xl md:text-7xl text-white drop-shadow-md cursor-default justify-end" 
            />
          </motion.div>
          <TextAnimate 
            animation="blurIn"
            by="text"
            as="p"
            delay={0.2}
            duration={0.6}
            className="text-white uppercase tracking-[0.2em] text-[10px] md:text-base font-bold drop-shadow-md max-w-[200px] md:max-w-none text-right"
          >
            Explore Our World-Class Treatments
          </TextAnimate>
        </div>
      </section>

      {/* Pricing Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 flex-shrink-0 border-r border-brand-black/10 pr-0 lg:pr-8">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 hide-scrollbar">
            {pricingData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center justify-between text-left px-6 py-4 transition-all duration-300 rounded-sm whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-brand-gold text-brand-black shadow-md border-l-4 border-brand-black font-bold' 
                    : 'bg-transparent text-brand-black/70 hover:bg-brand-black/5 hover:text-brand-black font-medium border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${activeCategory === category.id ? 'opacity-100' : 'opacity-60'}`}>
                    {category.icon}
                  </span>
                  <span className="uppercase tracking-widest text-xs md:text-sm">{category.category}</span>
                </div>
                {activeCategory === category.id && (
                  <ChevronRight size={16} className="hidden lg:block opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 md:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-[#830404] border-t-4 border-t-[#830404] relative overflow-hidden"
            >
              {/* Decorative faint background icon */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-brand-black pointer-events-none scale-[4]">
                {activeData?.icon}
              </div>

              <div className="flex items-center gap-4 mb-10 border-b border-brand-black/10 pb-6 relative z-10">
                <div className="w-12 h-12 bg-brand-beige text-brand-gold flex items-center justify-center rounded-full shadow-inner shrink-0">
                  {activeData?.icon}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#830404] uppercase tracking-widest drop-shadow-sm">
                  {activeData?.category}
                </h2>
              </div>

              <div className="space-y-6 relative z-10">
                {activeData?.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-end justify-between group">
                    <h3 
                      className="text-[17px] md:text-[19px] font-medium tracking-[0.03em] text-[#2A2A2A] group-hover:text-brand-gold transition-colors duration-300"
                      style={{ fontFamily: '"Gill Sans MT", "Gill Sans", sans-serif' }}
                    >
                      {item.name}
                    </h3>
                    
                    {/* Dotted line for desktop */}
                    <div className="hidden md:block flex-grow mx-6 border-b-2 border-dotted border-brand-black/20 relative top-[-6px] group-hover:border-brand-gold/40 transition-colors duration-300"></div>
                    
                    <span className="font-sans font-bold text-xs md:text-[13px] text-[#830404] uppercase tracking-wider mt-2 md:mt-0 bg-brand-cream/50 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded-sm inline-block w-fit">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              {activeData?.note && (
                <div className="mt-12 pt-6 border-t border-brand-black/10 relative z-10">
                  <p className="text-sm italic text-brand-black/60">
                    {activeData.note}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
