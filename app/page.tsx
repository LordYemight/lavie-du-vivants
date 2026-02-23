'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Menu, X, ArrowRight, Instagram, Mail, Phone, MapPin, UtensilsCrossed, Apple, Salad, GlassWater, CookingPot, Sparkles, CalendarCheck, Clock, Soup, Leaf, HeartHandshake, Star, ChevronRight } from 'lucide-react';

// --- Utilities & Hooks ---

const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useMarqueeItems = (items: string[]) => {
    const content = useMemo(() => [...items, ...items].map((item, index) => (
        <span key={index} className="mx-8 text-4xl font-bold tracking-widest whitespace-nowrap">
            {item}
        </span>
    )), [items]);
    return content;
}

// --- Components ---

// H3 - Navigation Component
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#products" },
    { name: "Catering", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="home" className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-lg shadow-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="text-3xl font-heading font-bold text-white transition-colors duration-300 hover:text-[var(--color-accent)]">
            Lavie du Vivants
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-[var(--color-accent)] transition-colors relative group pb-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact" 
              className="ml-4 px-5 py-2.5 text-sm font-bold rounded-full bg-[var(--color-accent)] text-primary hover:bg-white transition-all duration-300 flex items-center gap-1 shadow-lg hover:shadow-xl"
            >
              Holla At Us <ChevronRight size={16} />
            </a>
          </nav>

          {/* Mobile Button */}
          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-primary z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 md:hidden`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-end p-6 border-b border-white/10">
            <button 
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
            >
                <X size={32} />
            </button>
        </div>
        <nav className="flex flex-col p-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-heading text-white hover:text-[var(--color-accent)] transition-colors border-b border-white/10 pb-3"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="mt-8 w-full text-center px-6 py-3 text-lg font-bold rounded-xl bg-[var(--color-accent)] text-primary hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
          >
            Let's Link Up <ArrowRight size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
};

// HR1 - Hero Section
const HeroSection: React.FC = () => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section ref={ref} id="hero-section" className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/80 to-[var(--color-accent)]/10 opacity-80 transition-opacity duration-1000" />
            
            {/* Abstract Shapes for Depth */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl animate-float transition-all duration-1000" style={{animationDelay: '0.5s'}} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl transition-all duration-1000" style={{animationDelay: '1s'}} />
            
            <div className={`relative z-10 text-center max-w-4xl px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-lg text-[var(--color-secondary)] font-medium mb-4 uppercase tracking-widest">
                    Lavie du Vivants | Since 2024
                </p>
                <h1 className="font-heading text-6xl sm:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
                    The Art of Flavor, Perfected.
                </h1>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                    Discover premium spice blends, fresh bites, and bespoke catering that define modern Nigerian elegance. It's All About The TASTE 🍷.
                </p>
                <a
                    href="#products"
                    className="inline-flex items-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-[var(--color-accent)] text-primary hover:bg-white transition-all duration-300 shadow-2xl cta-glow"
                >
                    Explore Our Menu <ArrowRight size={20} />
                </a>
            </div>
        </section>
    );
};

// S3 - Marquee Section
const MarqueeSection: React.FC = () => {
    const { ref, isVisible } = useScrollReveal();
    const marqueeItems = useMarqueeItems(["PREMIUM SPICES", "FRESH GRANOLA", "EVENT CATERING", "KADUNA MADE", "TASTE ELEVATED"]);
    
    return (
        <section ref={ref} className={`py-12 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full whitespace-nowrap flex animate-marquee">
                {marqueeItems}
            </div>
        </section>
    );
};

// Product Card Component
interface Product {
    name: string;
    description: string;
    price: string;
    emoji: string;
    icon: React.ElementType;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const IconComponent = product.icon ? React.useMemo(() => {
        // Simple mapping for icons based on the brief data
        const IconMap: { [key: string]: React.ElementType } = {
            CookingPot, Apple, Salad, GlassWater, UtensilsCrossed
        };
        return IconMap[product.icon] || UtensilsCrossed;
    }, [product.icon]) : UtensilsCrossed;

    return (
        <div className="group relative overflow-hidden rounded-2xl 
            bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 
            border border-white/10 p-8 hover:scale-[1.02] 
            hover:shadow-2xl transition-all duration-500 premium-card-hover">
            
            {/* Emoji as visual */}
            <span className="text-6xl block mb-4 
                group-hover:scale-110 transition-transform duration-300">
                {product.emoji}
            </span>
            
            <h3 className="font-heading text-2xl font-bold">{product.name}</h3>
            <p className="text-white/60 mt-2 text-sm">{product.description}</p>
            <p className="text-[var(--color-secondary)] font-bold text-xl mt-4">{product.price}</p>
            
            <a href="#contact"
                className="inline-flex items-center gap-2 mt-6 
                bg-[var(--color-accent)] text-primary px-6 py-3 rounded-full 
                font-bold text-sm hover:brightness-110 hover:gap-3 
                transition-all duration-300 shadow-md"
            >
                Order This Sharp! <IconComponent size={16} />
            </a>
        </div>
    );
};

// C4 - Products Section (Layout Grid-3)
const ProductsSection: React.FC<{ title: string, subtitle: string, products: Product[] }> = ({ title, subtitle, products }) => {
    const { ref, isVisible } = useScrollReveal();

    const iconMap = {
        Spice: Leaf, HeartHandshake: HeartHandshake, Soup: Soup, Flame: CookingPot, Crown: Award
    };

    const getIconComponent = (iconName: string) => {
        // Mapping based on the brief data's specific icons for features/stats section
        const IconMap: { [key: string]: React.ElementType } = {
            Sparkles, CalendarCheck, Clock, Spice: Leaf, HeartHandshake, Soup
        };
        return IconMap[iconName] || Sparkles;
    };


    return (
        <section id="products" ref={ref} className={`py-24 px-6 sm:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-white">
                    {title}
                </h2>
                <p className="text-lg text-[var(--color-secondary)] mb-16 max-w-xl mx-auto">
                    {subtitle}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, index) => (
                        <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: `${index * 0.15}s` }}>
                            <ProductCard product={product as unknown as Product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// About Section (S1 - Philosophy with Stats)
const AboutSection: React.FC<{ title: string, description: string, stats: { number: string, label: string, icon: string }[] }> = ({ title, description, stats }) => {
    const { ref, isVisible } = useScrollReveal();
    
    const getIconComponent = (iconName: string) => {
        const IconMap: { [key: string]: React.ElementType } = {
            Spice: Leaf, HeartHandshake: HeartHandshake, Soup: Soup, Crown: Award
        };
        return IconMap[iconName] || Leaf;
    };

    return (
        <section id="about" ref={ref} className="py-24 px-6 sm:px-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl transition-all duration-1000" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl transition-all duration-1000" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Content */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
                        {title}
                    </h2>
                    <div className="h-1 w-20 bg-[var(--color-accent)] mb-6 rounded-full"></div>
                    <p className="text-lg text-white/70 mb-8 leading-relaxed">
                        {description}
                    </p>
                    <p className="text-md italic text-[var(--color-secondary)]">
                        — We cook with heart, you eat with pleasure.
                    </p>
                </div>

                {/* Right: Stats */}
                <div className={`grid grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {stats.map((stat, index) => {
                        const IconComponent = getIconComponent(stat.icon);
                        return (
                            <div 
                                key={index} 
                                className="p-6 bg-white/5 border border-white/10 rounded-xl text-center transition-all duration-500 hover:bg-white/10 hover:shadow-lg"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center">
                                    <IconComponent size={24} className="text-[var(--color-accent)]" />
                                </div>
                                <p className="text-4xl font-heading font-bold text-white leading-none mb-1">
                                    {stat.number}
                                </p>
                                <p className="text-xs uppercase tracking-wider text-white/70 mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// Feature Icon Card Component
interface Feature {
    title: string;
    description: string;
    icon: string;
}

const FeatureCard: React.FC<{ feature: Feature, index: number }> = ({ feature, index }) => {
    const IconComponent = useMemo(() => {
        const IconMap: { [key: string]: React.ElementType } = {
            Sparkles, CalendarCheck, Clock, Star, Heart, Award, Shield, Zap, TrendingUp, CheckCircle
        };
        return IconMap[feature.icon] || Sparkles;
    }, [feature.icon]);

    return (
        <div 
            className="p-8 rounded-2xl bg-white/5 border border-white/10
            hover:bg-white/10 transition-all duration-300 group premium-card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/20 
                flex items-center justify-center mb-5
                group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                <IconComponent size={28} className="text-[var(--color-accent)] 
                    group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/60 text-sm">{feature.description}</p>
        </div>
    );
};

// About/Features Section (Derived from Brief structure - using Features data for clarity)
const FeaturesSection: React.FC<{ features: Feature[] }> = ({ features }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section id="features" className="py-24 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                        Why Choose Lavie du Vivants?
                    </h2>
                    <p className="text-lg text-[var(--color-secondary)]">
                        Our core values ensure premium quality in every spoonful and sip.
                    </p>
                </div>
                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <FeatureCard feature={feature} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// Testimonial Card Component
const TestimonialCard: React.FC<{ item: { name: string, text: string, role: string }, index: number }> = ({ item, index }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div 
            ref={ref}
            className={`p-8 bg-white/5 border border-white/10 rounded-3xl shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="flex mb-4 text-amber-300">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="mr-1" />)}
            </div>
            <Quote className="text-[var(--color-accent)] mb-4" size={32} />
            <p className="text-lg italic text-white mb-6 leading-relaxed">
                "{item.text}"
            </p>
            <div className="flex items-center border-t border-white/10 pt-4">
                <div className="w-10 h-10 bg-[var(--color-accent)]/30 rounded-full flex items-center justify-center mr-3 text-xl font-heading font-bold text-[var(--color-accent)]">
                    {item.name[0]}
                </div>
                <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-white/60">{item.role}</p>
                </div>
            </div>
        </div>
    );
};


// Testimonials Section
const TestimonialsSection: React.FC<{ title: string, items: { name: string, text: string, role: string }[] }> = ({ title, items }) => {
    return (
        <section id="testimonials" className="py-24 px-6 sm:px-8 bg-primary/50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-white">
                    {title}
                </h2>
                <p className="text-md text-[var(--color-secondary)] mb-12">
                    Hear from Nigerians who have experienced the Lavie difference.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <TestimonialCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};


// Contact Section (C1)
const ContactSection: React.FC<{ title: string }> = ({ title }) => {
    const { ref, isVisible } = useScrollReveal();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (formData.name && formData.email && formData.message) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    const contactInfo = [
        { icon: Phone, label: "Call Us", value: "+234 800 000 0000", href: `tel:+2348000000000` },
        { icon: Mail, label: "Email Us", value: "contact@lavieduvivants.com", href: "mailto:contact@lavieduvivants.com" },
        { icon: MapPin, label: "Find Us", value: "Kaduna, Nigeria", href: "#" },
    ];

    return (
        <section id="contact" ref={ref} className={`py-24 px-6 sm:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-white">
                        {title}
                    </h2>
                    <p className="text-lg text-[var(--color-secondary)]">
                        Let's connect! Whether you need spices or catering services, we're ready.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                    
                    {/* Left: Contact Info */}
                    <div className="space-y-8 lg:pt-4">
                        <h3 className="font-heading text-3xl font-bold text-[var(--color-accent)]">
                            Get In Touch
                        </h3>
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <a key={index} href={info.href} className="flex items-start gap-4 hover:text-[var(--color-accent)] transition-colors group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-all duration-300">
                                        <IconComponent size={22} className="text-[var(--color-accent)] group-hover:text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-wider text-white/60">{info.label}</p>
                                        <p className="text-lg font-medium text-white group-hover:text-[var(--color-accent)] transition-colors">{info.value}</p>
                                    </div>
                                </a>
                            );
                        })}
                        <div className="pt-4">
                            <h4 className="text-xl font-heading font-bold mb-3">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href={`https://instagram.com/_lavie_du`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--color-accent)] transition-colors">
                                    <Instagram size={28} />
                                </a>
                                {/* Add other socials if needed */}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div>
                        <h3 className="font-heading text-3xl font-bold mb-6 text-white">
                            Send A Message
                        </h3>
                        
                        {status === 'success' ? (
                            <div className="p-10 bg-green-600/20 border-2 border-green-500 rounded-xl text-center min-h-[300px] flex flex-col justify-center items-center">
                                <div className="text-6xl mb-3 animate-scaleIn">🎉</div>
                                <p className="text-2xl font-heading font-bold text-green-300">Message Sent ✓</p>
                                <p className="text-white mt-2">We have received your enquiry. We will holla back sharp sharp!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] text-white transition-all duration-300"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] text-white transition-all duration-300"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">Your Enquiry</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] text-white transition-all duration-300"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={`w-full flex justify-center items-center gap-2 px-6 py-3 text-lg font-bold rounded-xl transition-all duration-300 ${
                                        status === 'submitting' 
                                        ? 'bg-white/30 text-primary cursor-not-allowed' 
                                        : 'bg-[var(--color-accent)] text-primary hover:bg-white shadow-lg hover:shadow-xl cta-glow'
                                    }`}
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <span className="animate-spin inline-block w-5 h-5 border-2 border-t-2 border-t-transparent border-primary rounded-full"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send size={20} />
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-center mt-3">Something went wrong. Please fill all fields correctly.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


// Footer (F2)
const Footer: React.FC<{ title: string }> = ({ title }) => {
    return (
        <footer id="footer" className="bg-primary border-t border-white/10 py-16 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                
                {/* Brand Info */}
                <div className="col-span-2 md:col-span-1">
                    <h3 className="text-3xl font-heading font-bold text-white mb-4">
                        {title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                        It's All About The TASTE 🍷. Elevating everyday meals with premium culinary solutions from Kaduna.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <a href={`https://instagram.com/_lavie_du`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--color-accent)] transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href={`mailto:contact@lavieduvivants.com`} className="text-white/70 hover:text-[var(--color-accent)] transition-colors">
                            <Mail size={24} />
                        </a>
                        <a href={`tel:+2348000000000`} className="text-white/70 hover:text-[var(--color-accent)] transition-colors">
                            <Phone size={24} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4 text-[var(--color-secondary)]">Quick Links</h4>
                    <ul className="space-y-2">
                        {[{name:"Menu", href:"#products"}, {name:"About Us", href:"#about"}, {name:"Contact", href:"#contact"}].map((link, i) => (
                            <li key={i}>
                                <a href={link.href} className="text-sm text-white/70 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                                    <ChevronRight size={14} className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Offerings */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4 text-[var(--color-secondary)]">Offerings</h4>
                    <ul className="space-y-2">
                        {["Spices", "Granola", "Salads", "Mocktails"].map((item, i) => (
                            <li key={i}>
                                <a href="#products" className="text-sm text-white/70 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                                <ChevronRight size={14} className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                 {/* Location */}
                <div>
                    <h4 className="text-lg font-heading font-bold mb-4 text-[var(--color-secondary)]">Location</h4>
                    <p className="text-sm text-white/70 mb-2 flex items-center gap-2"><MapPin size={16} /> Kaduna, Nigeria</p>
                    <p className="text-sm text-white/70">Delivery available across major Nigerian cities.</p>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-white/50">
                    &copy; {new Date().getFullYear()} Lavie du Vivants. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

// --- Main Page Component ---

const brandData = {
    products: [
        { name: "Signature Spice Blend", description: "A complex, balanced mix of premium spices perfect for seasoning meats and stews.", price: "₦3,500", emoji: "🌶️", icon: "CookingPot" },
        { name: "Artisan Granola", description: "Oven-baked oats, nuts, and seeds with a hint of honey and cinnamon.", price: "₦2,800", emoji: "🥣", icon: "Apple" },
        { name: "Gourmet Salad Bowls", description: "Freshly prepared, nutrient-dense salads with house-made dressings.", price: "₦4,000", emoji: "🥬", icon: "Salad" },
        { name: "Event Mocktails", description: "Custom-blended, non-alcoholic signature drinks for events.", price: "Varies", emoji: "🍹", icon: "GlassWater" },
        { name: "R&C (Rice & Complements)", description: "Ready-to-eat rice dishes paired with savory complements for quick meals.", price: "₦5,500", emoji: "🍚", icon: "Utensils" },
    ],
    features: [
        { title: "Elevated Flavor Profiles", description: "Our spice chemists design unique flavor maps that guarantee restaurant-quality taste at home.", icon: "Sparkles" },
        { title: "Event Styling & Catering", description: "Bespoke food styling and mocktail setups for seamless, elegant gatherings.", icon: "CalendarCheck" },
        { title: "Time-Saving Convenience", description: "Pre-blended spices and ready-made meals that cut your prep time in half.", icon: "Clock" },
    ],
    testimonials: [
        { name: "Aisha K.", text: "The seasoning mix is a game-changer! My jollof has never tasted this rich. Absolutely premium.", role: "Home Cook" },
        { name: "Jide O.", text: "Hired them for a launch party. The mocktails and presentation were flawless. Truly street-luxe quality.", role: "Event Planner" },
        { name: "Nneka D.", text: "The granola is my new morning ritual. It’s perfectly toasted and never too sweet.", role: "Young Professional" }
    ]
};


export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      <Header />
      <main>
        {/* HR1: Hero Section */}
        <HeroSection />
        
        {/* S3: Marquee */}
        <MarqueeSection />

        {/* C4: Products */}
        <ProductsSection 
            title="Our Culinary Collection" 
            subtitle="From everyday essentials to event showstoppers, taste the difference quality ingredients make."
            products={brandData.products}
        />
        
        {/* Features - Using Features data as a logical section flow */}
        <FeaturesSection features={brandData.features} />

        {/* S1: About & Stats */}
        <AboutSection 
            title="Our Philosophy: Taste Meets Time"
            description="Lavie du Vivants was born from a desire to merge traditional, deep flavors with modern, convenient lifestyles. We believe that exceptional meals should not require hours of preparation. Our team meticulously sources the finest ingredients to create spice blends that are intensely flavorful and perfectly balanced. We are committed to being the silent partner in your kitchen, helping you craft memorable moments around the dinner table, whether it's a quiet weeknight meal or a grand celebration."
            stats={[
                {number:"5+",label:"Spice Blends", icon:"Spice"},
                {number:"100+",label:"Happy Events", icon:"HeartHandshake"},
                {number:"7+",label:"Ready Meals", icon:"Soup"}
            ]}
        />
        
        {/* Testimonials */}
        <TestimonialsSection 
            title="What Our Clients Are Saying"
            items={brandData.testimonials}
        />

        {/* C1: Contact */}
        <ContactSection title="Ready to Elevate Your Meal?" />
      </main>
      
      {/* F2: Footer */}
      <Footer title="Lavie du Vivants" />
    </div>
  );
}