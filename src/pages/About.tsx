import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Sparkles, Award, Star, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import KineticText from '../components/KineticText';
import TextAnimate from '../components/TextAnimate';

const team = [
  {
    name: "Alicia Estades",
    phone: "248•805•7456",
    role: "Salon Owner",
    role2: "Licensed Cosmetologist",
    image: "/alicia.jpg"
  },
  {
    name: "Danielle Casarez",
    phone: "325•203•0070",
    role: "Licensed Nail Tech",
    role2: "Certified Waxing Specialist",
    image: "/danielle.jpg"
  },
  {
    name: "Kayla Cox",
    phone: "325•261•0542",
    role: "Licensed Cosmetologist",
    image: "/kayla.jpg"
  },
  {
    name: "Crystin Benefield",
    phone: "325•200•7377",
    role: "Licensed Massage Therapist",
    role2: "Certified Gua Shau",
    image: "/crystin.jpg"
  },
  {
    name: "Rianna Dossey",
    phone: "325•998•5061",
    role: "Licensed Cosmetologist",
    role2: "Licensed Instructor",
    image: "/rianna.jpg"
  },
  {
    name: "Sheyenne Bowling",
    phone: "830•433•1089",
    role: "Licensed Cosmetologist",
    image: "/Sheyenne.jpg"
  },
  {
    name: "Kilee Hudson",
    phone: "325•260•6615",
    role: "Licensed Cosmetologist",
    image: "/kilee.jpg"
  }
];

const reviews = [
  {
    name: "Lauren",
    stats: "Local Guide • 144 reviews • 79 photos",
    time: "2 years ago",
    text: "I love Estades salon, and I always see Ashley. She does a great job on mine & my 3 year old daughter’s hair. Shes so kind and easy to talk to. Con: I’m a stay at home mom of 2 kids that doesn’t want a baby sitter watching my babies.. and there is a “no kids” sign on the door. Wish I could come with my baby! \uD83E\uDD72"
  },
  {
    name: "Cassie Delgado",
    stats: "9 reviews • 2 photos",
    time: "2 years ago",
    text: "Incredible experience! The salon was very clean and inviting. Alicia was so knowledgeable about hair! She told me everything I needed to know to keep my hair healthy and how to try and maintain it at home! I haven’t been to a salon in over 7 years and I’m glad that I chose Estadas Salon! I had a great experience and because of that I will be back! 5\u2B50"
  },
  {
    name: "Shanda Staggs",
    stats: "1 review",
    time: "10 months ago",
    text: "I’ve been going to Estades salon for a long time, Alicia does my hair. But last night I took my daughter to Genevieve for a trim and wash, she got her in last minute and did a wonderful job! She was kind and so easy to talk to. My daughter left feeling beautiful and we have agreed to go back to her from now on! Love Estades salon and all the girls that are there, best salon in Brownwood!!"
  },
  {
    name: "Zain Duran",
    stats: "6 reviews • 3 photos",
    time: "3 years ago",
    text: "Cassie is a MIRACLE WORKER. She gave me the absolute best haircut. My hair feels so healthy and light! She also cut my fiancé’s hair to absolute perfection. Definitely will be returning for our future cut and styling needs."
  },
  {
    name: "Heather Jackson",
    stats: "5 reviews • 4 photos",
    time: "a year ago",
    text: "Estades salon is the best shop in town. All the stylist are the friendliest. Alicia has been my stylist for years and she runs this salon in the most professional way. My hair always looks amazing. Today Kayla did my hair for Alicia while she was out of town and she did amazing. I also had my eyebrows waxed and Kayla did amazing on those as well"
  }
];

const faqs = [
  {
    question: "Where are you located in Brownwood?",
    answer: "We are centrally located in the heart of Brownwood at 308 N Fisk Ave, Brownwood, TX 76801. Our historic masonry building offers a relaxing, luxurious atmosphere from the moment you step inside."
  },
  {
    question: "Do you accept walk-ins or are you appointment only?",
    answer: "To ensure every guest receives our undivided attention and world-class service, we highly recommend booking an appointment. While we try to accommodate walk-ins, availability is not guaranteed."
  },
  {
    question: "What is your policy regarding children in the salon?",
    answer: "Estades Salon is designed to be a peaceful, luxurious sanctuary where our guests can truly unwind. To maintain this relaxing environment and for safety reasons (hot tools, chemicals), we maintain a strict 'no kids' policy unless they are receiving a service."
  },
  {
    question: "What hair and beauty services do you specialize in?",
    answer: "Our artisans specialize in a full spectrum of luxury services including custom hair color, balayage, precision cuts, gel nail couture, therapeutic massage, and expert face and body waxing."
  },
  {
    question: "How can I prepare for my hair color appointment?",
    answer: "We recommend arriving with relatively clean, dry hair. If you have inspirational photos for your desired look, please bring them! Your stylist will conduct a thorough consultation before beginning any color service."
  }
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <div className="w-full bg-brand-cream">
      
      {/* Why Choose Us Section */}
      <section className="relative pt-40 pb-32 border-b border-brand-gold/30 overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/why-choose-us.jpg" 
            alt="Why Choose Estades Salon" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20" style={{ perspective: "1000px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-6"
            >
              <KineticText 
                as="h1" 
                text="Why choose our salon?" 
                className="font-serif text-4xl md:text-5xl text-white drop-shadow-md text-center cursor-default" 
              />
            </motion.div>
            <TextAnimate 
              animation="blurIn"
              by="text"
              as="p"
              delay={0.2}
              duration={0.7}
              className="text-[#FFD700] text-sm md:text-base leading-relaxed font-bold tracking-widest uppercase max-w-2xl mx-auto"
              style={{
                fontFamily: '"Gill Sans MT", "Gill Sans", sans-serif',
                textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 4px 8px rgba(0,0,0,1)'
              }}
            >
              Experience the perfect blend of Texas hospitality and world-class artistry. We are dedicated to making you look and feel your absolute best in a luxurious, relaxing environment.
            </TextAnimate>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm text-brand-gold flex items-center justify-center rounded-full mb-6 shadow-lg border border-brand-gold/40">
                <Scissors size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4 drop-shadow-sm">10 Years of Experience</h3>
              <p className="text-white leading-relaxed">
                With over a decade of elite experience, our master stylists deliver precision cuts, bespoke color, and flawless styling tailored uniquely to you.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm text-brand-gold flex items-center justify-center rounded-full mb-6 shadow-lg border border-brand-gold/40">
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4 drop-shadow-sm">We're Professionals</h3>
              <p className="text-white leading-relaxed">
                We exclusively use luxury, salon-grade products and professional techniques that protect your hair’s health while delivering breathtaking results.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm text-brand-gold flex items-center justify-center rounded-full mb-6 shadow-lg border border-brand-gold/40">
                <Award size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4 drop-shadow-sm">Certified Hairdressers</h3>
              <p className="text-white leading-relaxed">
                Our team undergoes rigorous continuous education and certification to master the latest global beauty trends and innovative styling methods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-brand-beige border border-[#830404]">
              <img 
                src="/our-story.png" 
                alt="Estades Salon Our Story" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-gold/10 -z-10"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <KineticText 
                as="h2" 
                text="Our Story" 
                className="font-serif text-sm uppercase tracking-[0.2em] text-brand-gold cursor-default" 
              />
            </div>
            <div className="mb-8">
              <KineticText 
                as="h1" 
                text="Elevating the Standard of Beauty in Brownwood." 
                className="font-serif text-4xl md:text-5xl text-brand-black leading-tight cursor-default" 
              />
            </div>
            <div className="space-y-6 text-brand-black/75 leading-relaxed">
              <TextAnimate animation="blurIn" by="text" as="p" delay={0.2} duration={0.6}>
                Founded on the belief that every woman deserves an elite, metropolitan salon experience right in the heart of Texas, Estades Salon is more than a place to get your hair done—it's a sanctuary.
              </TextAnimate>
              <TextAnimate animation="blurIn" by="text" as="p" delay={0.35} duration={0.6}>
                As a proudly women-owned business, we are deeply committed to our local community. Our historic location at 308 N Fisk Ave blends rustic Texas masonry with chic, modern luxury, reflecting our unique approach to style.
              </TextAnimate>
              <TextAnimate animation="blurIn" by="text" as="p" delay={0.5} duration={0.6}>
                From bespoke hair artistry to custom nail couture and aura skin treatments, our team of master artisans is dedicated to making you look and feel extraordinary.
              </TextAnimate>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Showcase Video */}
      <section className="w-full bg-brand-black overflow-hidden">
        <video 
          src="/team-members.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto block object-cover"
        />
      </section>

      {/* Team Section */}
      <section className="bg-brand-beige py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <KineticText 
                as="h2" 
                text="Meet the Artisans" 
                className="font-serif text-4xl text-brand-black cursor-default" 
              />
            </div>
            <TextAnimate 
              animation="blurIn"
              by="text"
              as="p"
              delay={0.2}
              duration={0.6}
              className="text-brand-black/70 max-w-2xl mx-auto"
            >
              Our curated team of professionals brings passion, precision, and world-class training to every appointment.
            </TextAnimate>
            <div className="w-12 h-px bg-brand-gold mx-auto mt-8"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-16" style={{ perspective: "1500px" }}>
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center group w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] max-w-sm cursor-crosshair p-4 bg-white shadow-sm border border-[#830404]"
              >
                <div className="mb-6 overflow-hidden aspect-[4/5] bg-brand-cream mx-auto w-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="font-serif text-2xl text-brand-black mb-1">{member.name}</h3>
                <p className="text-brand-black/70 text-sm mb-3">{member.phone}</p>
                <div className="border border-brand-black/20 py-2 px-1 mx-auto inline-block min-w-[200px]">
                  <p className="text-brand-black text-xs tracking-wider uppercase">{member.role}</p>
                  {member.role2 && <p className="text-brand-black text-xs tracking-wider uppercase mt-1">{member.role2}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-brand-cream py-24 border-t border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16" style={{ perspective: "1000px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-4"
            >
              <KineticText 
                as="h2" 
                text="Words from Our Guests" 
                className="font-serif text-4xl text-brand-black cursor-default" 
              />
            </motion.div>
            <TextAnimate 
              animation="blurIn"
              by="text"
              as="p"
              delay={0.2}
              duration={0.6}
              className="text-brand-black/70 max-w-2xl mx-auto"
            >
              Real experiences from the women who make our salon a community.
            </TextAnimate>
            <div className="w-12 h-px bg-brand-gold mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" style={{ perspective: "1500px" }}>
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: (idx % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, y: -5, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                className="bg-[#830404] p-8 shadow-md rounded-sm relative group cursor-default flex flex-col h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Quote size={40} className="text-white" />
                </div>
                
                <div className="flex items-center space-x-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                
                <p className="text-white opacity-90 font-light leading-relaxed mb-6 text-sm relative z-10">
                  "{review.text}"
                </p>
                
                <div className="mt-auto border-t border-white/20 pt-4 relative z-10">
                  <h4 className="font-serif text-white text-lg">{review.name}</h4>
                  <div className="flex items-center justify-between mt-1 opacity-70">
                    <span className="text-xs text-white truncate pr-2">{review.stats}</span>
                    <span className="text-xs text-white shrink-0">{review.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO & AEO Optimized FAQ Section */}
      <section className="bg-brand-beige py-24 border-t border-brand-gold/20" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16" style={{ perspective: "1000px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-4"
            >
              <KineticText 
                as="h2" 
                text="Frequently Asked Questions" 
                className="font-serif text-4xl text-brand-black cursor-default" 
              />
            </motion.div>
            <TextAnimate 
              animation="blurIn"
              by="text"
              as="p"
              delay={0.2}
              duration={0.6}
              className="text-brand-black/70 max-w-2xl mx-auto"
            >
              Everything you need to know about preparing for your elite salon experience in Brownwood, TX.
            </TextAnimate>
            <div className="w-12 h-px bg-brand-gold mx-auto mt-8"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-[#830404] rounded-sm overflow-hidden shadow-md"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none hover:bg-black/10 transition-colors"
                >
                  <h3 className="font-serif text-lg md:text-xl text-white pr-8" itemProp="name">
                    {faq.question}
                  </h3>
                  <div className="text-white shrink-0">
                    {openFaq === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/20 mx-6 mt-2">
                        <p className="text-white opacity-90 leading-relaxed font-light" itemProp="text">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
