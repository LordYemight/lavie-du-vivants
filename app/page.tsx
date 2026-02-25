'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Quote, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Sparkles, 
  Clock, 
  HeartHandshake, 
  Award,
  Zap,
  CookingPot,
  GlassWater,
  Package,
  Soup,
  ChefHat
} from 'lucide-react';

/* --- HOOKS --- */

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 80) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

/* --- DATA --- */

const BRAND = {
  name: "Lavie du Vivants",
  tagline: "It's All About The TASTE",
  description: "A premier food and spice brand based in Kaduna, Nigeria, dedicated to elevating everyday cooking through artisanal mastery.",
  region: "Nigeria",
  currency: "₦"
};

const PRODUCTS = [
  { name: "Premium Spice Blends", price: "Varies", desc: "Artisanal, carefully curated seasoning mixes to instantly elevate any meal.", img: "https://images.unsplash.com/photo-1532336411638-b199ee97f394?auto=format&fit=crop&w=800&q=80" },
  { name: "Gourmet Granola", price: "₦3,500", desc: "Guilt-free, crunchy granola perfect for breakfast or as a healthy snack.", img: "https://images.unsplash.com/photo-1517093157656-b9424f441b12?auto=format&fit=crop&w=800&q=80" },
  { name: "Artisanal Mocktails", price: "Varies", desc: "Refreshing, non-alcoholic beverages expertly crafted for events and daily enjoyment.", img: "https://images.unsplash.com/photo-1513558116341-75f146137284?auto=format&fit=crop&w=800&q=80" },
  { name: "Fresh Salad Bowls", price: "₦4,200", desc: "Pre-made, nutrient-dense salad bowls for quick, healthy lunches.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { name: "Rice & Complements", price: "Varies", desc: "Complete meal solutions featuring perfectly cooked rice and gourmet side dishes.", img: "https://images.unsplash.com/photo-1512058560366-cd2427ff0630?auto=format&fit=crop&w=800&q=80" },
  { name: "Event Catering", price: "By Quote", desc: "Full-service food styling and catering for corporate and private events.", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
];

const REVIEWS = [
  { name: "Aisha M.", role: "Home Cook, Abuja", text: "The cooking spices are a revelation; my Jollof has never tasted this authentic with so little effort! Truly premium." },
  { name: "Chidi O.", role: "Event Planner, Lagos", text: "The mocktails were the highlight of our corporate launch. Elegant presentation and perfectly balanced flavors." },
  { name: "Dr. Bello", role: "Young Professional, Kaduna", text: "The salad bowls are my lunchtime savior. Fresh, perfectly portioned, and delicious." },
];

/* --- COMPONENTS --- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-heading text-2xl font-bold tracking-tighter text-secondary">
          LAVIE DU VIVANTS
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
          {['home', 'about', 'products', 'features', 'contact'].map(link => (
            <a key={link} href={`#${link}`} className="hover:text-accent transition-colors">{link}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden sm:flex bg-accent text-white px-6 py-2 rounded-full font-bold text-xs tracking-widest hover:brightness-110 transition-all uppercase">
            Holla At Us
          </a>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto w-[80%] h-full bg-primary p-10 flex flex-col shadow-2xl">
            <button className="self-end text-white mb-10" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-heading">
              {['home', 'about', 'products', 'features', 'contact'].map(link => (
                <a key={link} href={`#${link}`} onClick={() => setMenuOpen(false)} className="capitalize border-b border-white/10 pb-2">{link}</a>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-secondary font-heading text-xl mb-4">It's All About The Taste</p>
              <div className="flex gap-4">
                <Instagram className="text-accent" />
                <span className="text-sm opacity-60">@_lavie_du</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default function Page() {
  const [formSent, setFormSent] = useState(false);
  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const featureReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="relative overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section 
        id="home" 
        ref={heroReveal.ref}
        className="min-h-screen grid md:grid-cols-2 items-center bg-primary pt-20"
      >
        <div className="px-8 md:px-20 py-12 relative z-10 order-2 md:order-1">
          <div className="w-20 h-1 bg-accent mb-8" />
          <h1 className="font-heading text-5xl md:text-8xl font-bold leading-[0.9] text-white tracking-tight">
            The Essence of <br />
            <span className="text-secondary italic">Flavor.</span> <br />
            Simplified.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/70 max-w-lg font-light leading-relaxed">
            Discover Lavie du Vivants: Where premium spice artistry meets the demands of modern Nigerian cooking. High-quality, artisanal blends for the busy food lover.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#products" className="bg-accent text-white px-10 py-4 rounded-full font-bold tracking-widest hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all uppercase flex items-center gap-2">
              Explore Our Blends <ArrowRight size={18} />
            </a>
            <a href="#about" className="border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold tracking-widest hover:bg-white hover:text-primary transition-all uppercase">
              The Story
            </a>
          </div>
        </div>
        
        <div className="relative h-[60vh] md:h-screen order-1 md:order-2 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80"
            alt="Artisanal Spices"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          
          {/* Floating Accents */}
          <div className="absolute top-1/4 right-1/4 animate-float opacity-40">
            <Sparkles className="text-accent" size={48} />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-secondary py-6 overflow-hidden rotate-[-1deg] scale-105 z-20 relative shadow-2xl">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-primary font-heading font-black text-2xl uppercase tracking-tighter">
              <span>Artisanal Spices</span>
              <Zap size={24} className="fill-accent text-accent" />
              <span>Gourmet Granola</span>
              <Zap size={24} className="fill-accent text-accent" />
              <span>Event Styling</span>
              <Zap size={24} className="fill-accent text-accent" />
              <span>Kaduna Finest</span>
              <Zap size={24} className="fill-accent text-accent" />
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section 
        id="about" 
        ref={aboutReveal.ref}
        className={`py-32 px-6 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Cooking process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent rounded-full flex items-center justify-center p-8 text-center animate-pulse-glow">
                <p className="font-heading text-xl font-bold leading-tight">Taste The Passion</p>
              </div>
            </div>
            
            <div>
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm">Since Inception</span>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mt-4 leading-tight">
                A Home of Taste <br />in Kaduna
              </h2>
              <p className="mt-8 text-white/60 text-lg leading-relaxed">
                Lavie du Vivants was founded on the belief that exceptional meals shouldn't require hours of effort. We source the finest ingredients to create complex, balanced flavors that ease up your cooking time and dramatically elevate your meals.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <Award size={24} />
                  </div>
                  <span className="text-3xl font-heading font-bold mt-2 text-secondary">10+</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">Signature Blends</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                    <MapPin size={24} />
                  </div>
                  <span className="text-3xl font-heading font-bold mt-2 text-secondary">Kaduna</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">Proudly Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section 
        id="products" 
        ref={productReveal.ref}
        className="py-32 bg-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-widest uppercase text-xs">The Collection</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold mt-4">Our Culinary Offerings</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod, idx) => (
              <div 
                key={idx}
                className={`group relative bg-primary/40 rounded-3xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500 ${productReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={prod.img} 
                    alt={prod.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-bold">{prod.price}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-secondary transition-colors">{prod.name}</h3>
                  <p className="text-white/50 mt-3 text-sm leading-relaxed">{prod.desc}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                    Order Now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section 
        id="features" 
        ref={featureReveal.ref}
        className="py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Our Specialty</span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold mt-4">Beyond the Spice Jar</h2>
            </div>
            <p className="text-white/50 max-w-sm mb-2">Specialized services designed for the discerning food lover and event host.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Clock className="text-accent" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Time-Saving Blends</h3>
              <p className="text-white/60 leading-relaxed">Our signature spice formulations cut down prep time without sacrificing authentic, deep flavor profiles.</p>
            </div>

            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ChefHat className="text-secondary" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Event Food Styling</h3>
              <p className="text-white/60 leading-relaxed">Professional culinary presentation services to make your gatherings unforgettable and elegant.</p>
            </div>

            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <HeartHandshake className="text-white" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Healthy & Fresh</h3>
              <p className="text-white/60 leading-relaxed">Commitment to fresh ingredients in all salads and granola, supporting a nutritious lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section 
        ref={testimonialReveal.ref}
        className="py-32 bg-primary relative overflow-hidden"
      >
        <div className="blur-orb w-[500px] h-[500px] bg-accent/10 top-0 left-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-bold">What Our Patrons Say</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <div 
                key={i} 
                className={`bg-white/5 p-10 rounded-3xl border border-white/10 relative ${testimonialReveal.isVisible ? 'animate-scaleIn' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <Quote className="text-accent absolute top-8 right-8 opacity-20" size={40} />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-secondary text-secondary" />)}
                </div>
                <p className="text-xl italic text-white/80 leading-relaxed mb-8">"{rev.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-secondary tracking-widest uppercase mt-1">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section 
        id="contact" 
        ref={contactReveal.ref}
        className="py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-bold leading-none">Let's <br />Collaborate</h2>
              <p className="mt-8 text-white/50 text-lg max-w-md">Ready to elevate your meal prep or book catering for your next big event? Holla at us and let's create something delicious.</p>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Call / WhatsApp</p>
                    <p className="text-xl font-heading">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Instagram</p>
                    <p className="text-xl font-heading">@_lavie_du</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Kitchen Base</p>
                    <p className="text-xl font-heading">Kaduna, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 relative">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary mb-6">
                    <Sparkles size={40} />
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-secondary">Message Sent!</h3>
                  <p className="mt-4 text-white/60">We'll holla at you very soon to confirm your request.</p>
                  <button onClick={() => setFormSent(false)} className="mt-8 text-accent font-bold uppercase tracking-widest">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-white/40">Name</label>
                      <input type="text" required className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-white/40">Region</label>
                      <input type="text" placeholder="e.g. Kaduna" className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Interested In</label>
                    <select className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition-all appearance-none text-white/60">
                      <option>Spice Blends</option>
                      <option>Event Catering</option>
                      <option>Monthly Granola Pack</option>
                      <option>Mocktail Service</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Your Message</label>
                    <textarea rows={4} required className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-4 focus:border-accent outline-none transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 hover:shadow-lg hover:shadow-accent/20 transition-all">
                    Send Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-6 tracking-tighter">LAVIE DU VIVANTS</h2>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Specializing in high-quality, artisanal spice blends, granola, fresh mocktails, and gourmet salad bowls. Making everyday cooking effortless.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Mail size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/60">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-secondary transition-colors">Our Products</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Order Now</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-white/60">Explore</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-secondary transition-colors">Spice Gallery</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Catering Portfolio</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Gift Boxes</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Taste</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 uppercase tracking-widest font-bold">
          <p>&copy; 2024 Lavie du Vivants. All Rights Reserved.</p>
          <p>Handcrafted for Premium Tastes</p>
        </div>
      </footer>
    </main>
  );
}