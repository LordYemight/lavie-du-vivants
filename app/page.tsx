'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Instagram, MessageCircle, Mail, MapPin, 
  ArrowRight, Star, Leaf, Clock, Sparkles, ChefHat, 
  Wine, Cookie, Soup, UtensilsCrossed, Users, Award,
  ChevronRight, Phone, Send, CheckCircle2
} from 'lucide-react';

// --- Types ---
interface Product {
  name: string;
  description: string;
  price: string;
  emoji: string;
  icon: any;
}

interface Feature {
  title: string;
  description: string;
  icon: any;
}

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

// --- Hooks ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return { ref, isVisible };
};

// --- Components ---

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Catering', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-heading font-bold tracking-tighter text-secondary group flex items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary text-sm">LV</span>
          Lavie du Vivants
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-lg shadow-accent/20">
            Order Sharp-Sharp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-secondary p-2">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[110] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 shadow-2xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading font-bold text-xl">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-full">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-heading hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-accent text-primary text-center py-4 rounded-xl font-bold text-lg">
              Order Now ₦
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${centered ? 'text-center' : ''}`}>
      <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-secondary/60 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className={`h-1.5 w-24 bg-accent mt-6 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const products: Product[] = [
    { name: "Premium Spice Blends", description: "Artisan seasoning mixes designed to simplify gourmet cooking.", price: "From ₦3,500", emoji: "🧂", icon: ChefHat },
    { name: "Gourmet Granola", description: "Crunchy, wholesome oats and nuts perfect for breakfast or snacking.", price: "From ₦2,800", emoji: "🍞", icon: Cookie },
    { name: "Signature Mocktails", description: "Refreshing, custom-blended non-alcoholic drinks for any occasion.", price: "From ₦1,500", emoji: "🍹", icon: Wine },
    { name: "Fresh Salad Bowls", description: "Nutrient-dense, chef-prepared salads ready for lunch or dinner.", price: "From ₦4,000", emoji: "🥗", icon: Leaf },
    { name: "R&C Complements", description: "Perfect pairings like perfectly cooked rice and curated side dishes.", price: "Custom Quote", emoji: "🍜", icon: Soup },
    { name: "Event Catering & Styling", description: "Full-service culinary support and beautiful food presentation for your events.", price: "Custom Quote", emoji: "🎂", icon: UtensilsCrossed },
  ];

  const features: Feature[] = [
    { title: "Time-Saving Blends", description: "Elevate your weeknight meals instantly with our perfectly balanced seasoning mixes.", icon: Clock },
    { title: "Sustainably Sourced", description: "We prioritize high-quality, fresh ingredients sourced responsibly within Nigeria.", icon: Leaf },
    { title: "Custom Event Menus", description: "Bespoke mocktail and food styling services tailored to your event's theme.", icon: Sparkles },
  ];

  const testimonials: Testimonial[] = [
    { name: "Aisha K.", text: "The Jollof Spice mix is a game-changer! My Sunday rice has never tasted this rich without hours of effort.", role: "Home Chef, Abuja" },
    { name: "Samuel O.", text: "Impeccable service for our corporate event. The mocktails were a huge hit and tasted incredibly fresh.", role: "Event Planner, Kaduna" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: featureRef, isVisible: featureVisible } = useScrollReveal();

  return (
    <main className="relative bg-primary overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div ref={heroRef} className={`relative z-10 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold mb-8 animate-fadeIn">
            <Sparkles size={16} /> <span>THE TASTE REVOLUTION IS HERE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 leading-[1.1] text-secondary">
            Elevate Every Meal. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Effortlessly.</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover the premium taste of Lavie du Vivants spice blends, granola, and bespoke catering services in Kaduna and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#products" className="bg-accent text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-accent/30 group flex items-center gap-2">
              Explore Our Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-5 rounded-full border border-white/20 font-bold text-lg hover:bg-white/5 transition-all">
              Book for Event
            </a>
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center"><ChefHat size={32} /><span className="text-[10px] mt-2 uppercase tracking-widest">Spice King</span></div>
             <div className="flex flex-col items-center"><Wine size={32} /><span className="text-[10px] mt-2 uppercase tracking-widest">Mocktail Bar</span></div>
             <div className="flex flex-col items-center"><UtensilsCrossed size={32} /><span className="text-[10px] mt-2 uppercase tracking-widest">Catering</span></div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 relative px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Our Culinary Offerings" 
            subtitle="From essential seasonings to unforgettable event catering, experience the taste revolution."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <product.icon size={100} />
                </div>
                <span className="text-6xl block mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  {product.emoji}
                </span>
                <h3 className="text-2xl font-heading font-bold text-secondary mb-3">{product.name}</h3>
                <p className="text-secondary/60 text-sm mb-6 leading-relaxed line-clamp-3">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-accent font-bold text-lg">{product.price}</span>
                  <a href="#contact" className="p-3 bg-accent/10 rounded-full text-accent hover:bg-accent hover:text-primary transition-all duration-300">
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={featureRef} className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ${featureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {features.map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                  <feature.icon className="text-accent group-hover:text-primary transition-colors" size={36} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{feature.title}</h3>
                <p className="text-secondary/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 relative px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div ref={aboutRef} className={`lg:w-1/2 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <SectionHeading title="The Lavie Difference" />
              <p className="text-lg text-secondary/70 leading-relaxed mb-8">
                At Lavie du Vivants, we believe cooking should be a joy, not a chore. We meticulously source and blend authentic spices to create seasoning mixes that cut preparation time while maximizing flavor depth. 
              </p>
              <p className="text-lg text-secondary/70 leading-relaxed mb-12">
                Our commitment extends to crafting wholesome granola and vibrant mocktails, all designed to bring a touch of premium elegance to your daily life and special gatherings across Nigeria.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { n: "5+", l: "Years Experience", i: UtensilsCrossed },
                  { n: "12", l: "Spice Blends", i: Award },
                  { n: "200+", l: "Happy Clients", i: Users }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
                    <stat.i size={24} className="text-accent mb-4" />
                    <div className="text-3xl font-bold mb-1">{stat.n}</div>
                    <div className="text-[10px] uppercase tracking-wider text-secondary/50 font-bold">{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary flex items-center justify-center text-[180px]">
                🥘
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
                 <p className="italic text-xl font-heading">&quot;It&apos;s all about the taste and the soul we put into every blend.&quot;</p>
                 <p className="mt-4 font-bold text-accent">— Founder, Lavie du Vivants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Patron Love" centered />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-10 rounded-3xl bg-primary border border-white/5 relative overflow-hidden">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl font-heading leading-relaxed mb-8">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{t.name}</h4>
                    <p className="text-sm text-secondary/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 bg-gradient-to-br from-accent/20 to-transparent">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Let&apos;s Create Magic Together</h2>
              <p className="text-secondary/70 mb-12 text-lg">
                Ready to elevate your meals or book for an event? Send us a message and we&apos;ll get back to you sharp-sharp!
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-bold">Call/WhatsApp</p>
                    <p className="text-xl">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-bold">Visit Us</p>
                    <p className="text-xl">Kaduna, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-bold">Instagram</p>
                    <p className="text-xl">@_lavie_du</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20 bg-primary/50 backdrop-blur-md">
              {formStatus === 'sent' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                  <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4">Sent!</h3>
                  <p className="text-secondary/70">Oya! We&apos;ve received your message. We&apos;ll holla at you soon!</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-8 text-accent underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-secondary/40">Full Name</label>
                      <input type="text" required placeholder="Aisha S." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-secondary/40">Phone Number</label>
                      <input type="tel" required placeholder="080..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-secondary/40">Your Request</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-colors">
                      <option className="bg-primary">Spice Blend Order</option>
                      <option className="bg-primary">Event Catering</option>
                      <option className="bg-primary">Granola/Mocktail Delivery</option>
                      <option className="bg-primary">General Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-secondary/40">Message</label>
                    <textarea required rows={4} placeholder="Tell us what you need..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-colors"></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full bg-accent text-primary font-bold py-5 rounded-xl text-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'} <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#home" className="text-3xl font-heading font-bold text-secondary mb-6 block">Lavie du Vivants</a>
              <p className="text-secondary/60 max-w-sm mb-8">
                Home of premium spices that ease up your cooking time and elevate your meals. It&apos;s all about the taste!
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-accent">Quick Links</h4>
              <ul className="space-y-4 text-secondary/60">
                <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Our Menu</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-accent">Region</h4>
              <ul className="space-y-4 text-secondary/60">
                <li>Kaduna, Nigeria</li>
                <li>Abuja (Delivery)</li>
                <li>Lagos (Delivery)</li>
                <li>Port Harcourt (Delivery)</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-secondary/40 text-sm">© {new Date().getFullYear()} Lavie du Vivants. All rights reserved.</p>
            <p className="text-secondary/40 text-sm flex items-center gap-1">Made with <Star size={14} className="text-accent" /> for Nigerian Kitchens</p>
          </div>
        </div>
      </footer>
    </main>
  );
}