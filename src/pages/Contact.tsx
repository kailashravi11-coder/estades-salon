import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageSquare, Send, Smartphone, ExternalLink, Calendar, User, Copy, Check } from 'lucide-react';
import { pricingData } from './Pricing';
import KineticText from '../components/KineticText';
import TextAnimate from '../components/TextAnimate';

interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  customService: string;
  date: string;
  time: string;
  timestamp: string;
}

function createSmsLink(phone: string, text: string) {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  return `sms:${phone}${separator}body=${encodeURIComponent(text)}`;
}

function createAppointmentSmsText(lead: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  customService?: string;
  date?: string;
  time?: string;
}) {
  return (
    `Hi Kailash & Estades Salon!\n\n` +
    `I would like to request an appointment:\n` +
    `• Name: ${lead.firstName} ${lead.lastName}\n` +
    `• Phone: ${lead.phone}\n` +
    `• Email: ${lead.email}\n` +
    `• Service: ${lead.service}\n` +
    (lead.customService ? `• Custom Notes: ${lead.customService}\n` : '') +
    `• Preferred Date: ${lead.date || 'Flexible'}\n` +
    `• Preferred Time: ${lead.time || 'Flexible'}\n\n` +
    `Please confirm my booking. Sent from estadessalon.com`
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recentLeads, setRecentLeads] = useState<LeadData[]>([]);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<LeadData | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    customService: '',
    date: '',
    time: '',
  });

  // Load existing leads from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('estades_appointment_leads');
      if (saved) {
        setRecentLeads(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const newLead: LeadData = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toLocaleString(),
    };

    // 1. Prepare formatted SMS for test number (+91 9142251998)
    const smsText = createAppointmentSmsText(newLead);
    const smsUrl = createSmsLink('+919142251998', smsText);

    try {
      // 2. Send live Email via FormSubmit to user's test email
      const response = await fetch('https://formsubmit.co/ajax/kailash.ravi11@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `✨ New Appointment Request: ${formData.firstName} ${formData.lastName} (${formData.service})`,
          _template: 'table',
          _captcha: 'false',
          'Client Name': `${formData.firstName} ${formData.lastName}`,
          'Phone Number': formData.phone,
          'Email Address': formData.email,
          'Desired Service': formData.service,
          'Additional Notes': formData.customService || 'None provided',
          'Preferred Date': formData.date || 'Flexible',
          'Preferred Time': formData.time || 'Flexible',
          'Submitted At': newLead.timestamp,
        }),
      });

      if (!response.ok) {
        console.warn('FormSubmit returned status:', response.status);
      }
    } catch (err) {
      console.error('Email dispatch error (saving locally):', err);
    }

    // 3. Persist lead to local storage
    try {
      const updated = [newLead, ...recentLeads];
      setRecentLeads(updated);
      localStorage.setItem('estades_appointment_leads', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setLastSubmittedLead(newLead);
    setFormStatus('success');

    // 4. Automatically launch the user's phone Messages app with pre-filled SMS
    setTimeout(() => {
      try {
        window.location.href = smsUrl;
      } catch (err) {
        console.warn('Direct SMS launch:', err);
      }
    }, 400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-brand-cream pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16" style={{ perspective: "1000px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-4"
          >
            <KineticText 
              as="h1" 
              text="Reserve Your Experience" 
              className="font-serif text-4xl md:text-5xl text-brand-black cursor-default justify-center" 
            />
          </motion.div>
          <TextAnimate 
            animation="blurIn"
            by="text"
            as="p"
            delay={0.2}
            duration={0.6}
            className="text-brand-black/70 text-lg"
          >
            Submit a request below, or <a href="https://instagram.com/estadessalon" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-semibold">DM us on Instagram</a> to book an appointment.
          </TextAnimate>

          {/* Quick link for salon manager to inspect received leads */}
          {recentLeads.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setShowLeadsModal(true)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-white/80 border border-[#830404]/30 px-3 py-1.5 text-brand-black hover:bg-white hover:border-[#830404] transition-colors rounded-sm shadow-sm"
              >
                <MessageSquare size={13} className="text-[#830404]" />
                <span>View Received Leads ({recentLeads.length})</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Booking Form */}
          <motion.div 
            id="appointment-form"
            initial={{ opacity: 0, x: -50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 md:p-12 shadow-sm border-[3px] border-[#830404] relative z-10"
            style={{ perspective: "1500px" }}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-black/10">
              <h2 className="font-serif text-2xl text-brand-black">Appointment Request</h2>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Live Email & SMS Active</span>
              </div>
            </div>
            
            {formStatus === 'success' && lastSubmittedLead ? (
              <div className="bg-brand-cream/40 p-6 md:p-8 text-center border border-brand-gold/60 h-full flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl mb-1 text-brand-black">Appointment Request Ready!</h3>
                <p className="text-brand-black/70 text-xs md:text-sm max-w-md mb-4 leading-relaxed">
                  We pre-filled your appointment details into your phone's Messages app.
                </p>

                {/* Primary Action Callout */}
                <div className="w-full bg-[#830404]/5 border-2 border-[#830404] p-4 rounded-md mb-6 text-left">
                  <div className="flex items-center gap-2 text-[#830404] font-bold text-xs uppercase tracking-wider mb-1">
                    <Smartphone size={16} />
                    <span>Step 2: Tap Send in your SMS App</span>
                  </div>
                  <p className="text-xs text-brand-black/80 leading-relaxed mb-3">
                    Your SMS app was opened to text (+91 9142251998) directly from your phone number: <strong>{lastSubmittedLead.phone}</strong>. If your SMS app didn't open automatically, tap the button below:
                  </p>

                  <a 
                    href={createSmsLink('+919142251998', createAppointmentSmsText(lastSubmittedLead))}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#830404] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors rounded shadow-md"
                  >
                    <Smartphone size={16} />
                    <span>Open Messages App & Send SMS</span>
                  </a>
                </div>

                {/* Pre-formatted Message Preview */}
                <div className="w-full bg-white p-3.5 border border-brand-black/15 rounded text-left mb-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-brand-black/70 mb-2 pb-1 border-b border-brand-black/10">
                    <span>Pre-formatted SMS to +91 9142251998:</span>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(createAppointmentSmsText(lastSubmittedLead))}
                      className="inline-flex items-center gap-1 text-[#830404] hover:underline"
                    >
                      {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-sans text-brand-black/80 whitespace-pre-wrap leading-relaxed bg-brand-cream/30 p-2.5 rounded border border-brand-black/5">
                    {createAppointmentSmsText(lastSubmittedLead)}
                  </pre>
                </div>

                {/* Secondary Actions */}
                <div className="w-full space-y-2 mb-6">
                  <a 
                    href={`https://wa.me/919142251998?text=${encodeURIComponent(createAppointmentSmsText(lastSubmittedLead))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-[#1EBE5D] transition-colors rounded shadow-xs"
                  >
                    <Send size={15} />
                    <span>Or Send via WhatsApp (+91 9142251998)</span>
                  </a>
                </div>

                {/* Status indicator */}
                <div className="text-[11px] text-brand-black/60 mb-5">
                  ✅ Email copy also dispatched to: <strong>kailash.ravi11@gmail.com</strong>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                  <button 
                    onClick={() => setShowLeadsModal(true)}
                    className="text-[#830404] hover:underline font-semibold"
                  >
                    Review All Leads ({recentLeads.length})
                  </button>
                  <span className="text-brand-black/30">•</span>
                  <button 
                    onClick={() => {
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        service: '',
                        customService: '',
                        date: '',
                        time: '',
                      });
                      setFormStatus('idle');
                    }}
                    className="text-brand-black hover:text-[#830404] uppercase tracking-wider font-bold"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">First Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Last Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                    placeholder="jane@example.com" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                    placeholder="(555) 123-4567" 
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Desired Service *</label>
                  <select 
                    required 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black"
                  >
                    <option value="">Select a service...</option>
                    {pricingData.map((category) => (
                      <optgroup key={category.id} label={category.category}>
                        {category.items.map((item, idx) => (
                          <option key={`${category.id}-${idx}`} value={`${item.name} (${item.price})`}>
                            {item.name} ({item.price})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Additional / Custom Service (Optional)</label>
                  <input 
                    type="text" 
                    name="customService"
                    value={formData.customService}
                    onChange={handleChange}
                    className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/30 text-brand-black" 
                    placeholder="Looking for something else? Let us know..." 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-black/70 mb-2">Preferred Time</label>
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full border-b border-brand-beige py-2 bg-transparent focus:outline-none focus:border-brand-gold transition-colors text-brand-black" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-[#830404] text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-black transition-all duration-300 disabled:opacity-70 mt-4 shadow-md flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Dispatching Lead to Client...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Request (Sends Email & SMS)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-12"
            style={{ perspective: "1500px" }}
          >
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-lg mb-1">Location</h4>
                    <p className="text-brand-black/70 text-sm leading-relaxed">
                      308 N Fisk Ave,<br/>
                      Brownwood, TX 76801
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Phone className="text-brand-gold shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg mb-1">Phone / SMS</h4>
                    <p className="text-brand-black/70 text-sm">
                      <a href="tel:+13252035096" className="hover:text-brand-gold transition-colors font-medium">+1 325-203-5096</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="text-brand-gold shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg mb-1">Email</h4>
                    <p className="text-brand-black/70 text-sm">
                      <a href="mailto:estadessalonllc@gmail.com" className="hover:text-brand-gold transition-colors font-medium">estadessalonllc@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-4">
                  <Clock className="text-brand-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-lg mb-2">Hours</h4>
                    <ul className="text-brand-black/70 text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Mon - Fri</span>
                        <span>9AM - 7PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday</span>
                        <span>10AM - 5PM</span>
                      </li>
                      <li className="flex justify-between text-brand-black/40">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex-grow w-full bg-brand-beige border border-brand-beige relative min-h-[300px]">
              {/* Styled container for the map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.528345719941!2d-98.9863483!3d31.716182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8650e1814e5b9f93%3A0xcfcfbf989108b98b!2s308%20N%20Fisk%20Ave%2C%20Brownwood%2C%20TX%2076801!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Received Leads Modal / Dashboard for Client Verification */}
      <AnimatePresence>
        {showLeadsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-2xl border border-brand-black/20 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-brand-black/10 flex items-center justify-between bg-brand-cream/60">
                <div>
                  <h3 className="font-serif text-xl text-brand-black">Client Lead Inbox (Test & Verification)</h3>
                  <p className="text-xs text-brand-black/60">All appointments submitted through this site are captured and dispatched.</p>
                </div>
                <button 
                  onClick={() => setShowLeadsModal(false)}
                  className="w-8 h-8 rounded-full bg-brand-black/10 hover:bg-brand-black hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {recentLeads.length === 0 ? (
                  <p className="text-center text-brand-black/50 py-10 text-sm">No leads submitted yet. Fill out the form to test live!</p>
                ) : (
                  recentLeads.map((lead) => (
                    <div key={lead.id} className="p-4 rounded border border-brand-black/15 bg-white shadow-xs hover:border-[#830404] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-brand-black/10">
                        <div className="flex items-center gap-2">
                          <User size={15} className="text-[#830404]" />
                          <span className="font-serif font-bold text-base text-brand-black">{lead.firstName} {lead.lastName}</span>
                        </div>
                        <span className="text-[11px] text-brand-black/50">{lead.timestamp}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-black/80 mb-3">
                        <div>
                          <span className="text-brand-black/50">Phone: </span>
                          <a href={`tel:${lead.phone}`} className="font-medium text-[#830404] hover:underline">{lead.phone}</a>
                        </div>
                        <div>
                          <span className="text-brand-black/50">Email: </span>
                          <a href={`mailto:${lead.email}`} className="font-medium hover:underline">{lead.email}</a>
                        </div>
                        <div>
                          <span className="text-brand-black/50">Service: </span>
                          <span className="font-medium text-brand-black">{lead.service}</span>
                        </div>
                        <div>
                          <span className="text-brand-black/50">Requested Date: </span>
                          <span className="font-medium text-brand-black">{lead.date || 'Flexible'} {lead.time ? `(${lead.time})` : ''}</span>
                        </div>
                      </div>

                      {lead.customService && (
                        <div className="text-xs bg-brand-cream/60 p-2 rounded text-brand-black/80 mb-3">
                          <span className="text-brand-black/50">Notes: </span>
                          {lead.customService}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-black/10">
                        <a 
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 text-[11px] bg-brand-cream border border-brand-black/20 px-2.5 py-1 rounded text-brand-black hover:bg-brand-gold hover:text-white transition-colors"
                        >
                          <Phone size={12} />
                          <span>Call Client</span>
                        </a>
                        <a 
                          href={`sms:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 text-[11px] bg-brand-cream border border-brand-black/20 px-2.5 py-1 rounded text-brand-black hover:bg-brand-gold hover:text-white transition-colors"
                        >
                          <Smartphone size={12} />
                          <span>SMS Client</span>
                        </a>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-1.5 text-[11px] bg-brand-cream border border-brand-black/20 px-2.5 py-1 rounded text-brand-black hover:bg-brand-gold hover:text-white transition-colors"
                        >
                          <Mail size={12} />
                          <span>Email Client</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-brand-black/10 bg-brand-cream/40 flex items-center justify-between text-xs">
                <span className="text-brand-black/60">Target (Test Mode): <strong>kailash.ravi11@gmail.com</strong> | <strong>+91 9142251998</strong></span>
                {recentLeads.length > 0 && (
                  <button 
                    onClick={() => {
                      if (confirm('Clear test leads?')) {
                        localStorage.removeItem('estades_appointment_leads');
                        setRecentLeads([]);
                      }
                    }}
                    className="text-red-700 hover:underline"
                  >
                    Clear History
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

