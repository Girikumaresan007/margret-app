import { motion } from 'motion/react';
import { ArrowRight, Star, CheckCircle2, Play, Users, ShieldCheck, Zap, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SERVICES, TESTIMONIALS, PACKAGES } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-tight text-ink"
          >
            Professional <span className="text-gold">LED & Audio Visual</span> Solution for Every Event
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Transform your events with cutting-edge LED screens, crystal-clear audio systems and professional lighting solutions. Crafting unforgettable experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#services" className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-all group">
              Explore Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/book" className="w-full sm:w-auto glass px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Book Now
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 px-6 bg-white/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass p-2">
              <img 
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200" 
                alt="Margret AV Production" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-gold p-8 rounded-2xl hidden md:block">
              <div className="text-4xl font-bold text-gold mb-1">15+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-ink">Years Experience</div>
            </div>
          </motion.div>
          
          <motion.div {...fadeInUp} className="space-y-6">
            <div className="text-gold font-bold text-sm uppercase tracking-widest">About Margret AV</div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">Excellence in <span className="text-gold">Production</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Founded on the principles of technical precision and creative vision, Margret Audio Visual has grown into a premier event production partner. We don't just provide equipment; we craft atmospheres that resonate with your audience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of expert engineers and designers work tirelessly to ensure every pixel is perfect and every note is pure. From intimate corporate gatherings to massive outdoor concerts, we bring the same level of dedication and high-end technology to every project.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold" />
                <span className="font-medium text-ink">Certified Engineers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold" />
                <span className="font-medium text-ink">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold" />
                <span className="font-medium text-ink">Global Reach</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold" />
                <span className="font-medium text-ink">Latest Tech</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold mb-4 text-ink">Our <span className="text-gold">Mission</span></motion.h2>
          <motion.p {...fadeInUp} className="text-gray-600 max-w-2xl mx-auto">To empower event creators with world-class technical solutions that bridge the gap between imagination and reality.</motion.p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Innovation', desc: 'Constantly pushing the boundaries of what is possible in event technology.', icon: Zap },
            { title: 'Reliability', desc: 'Ensuring flawless execution through rigorous testing and redundant systems.', icon: ShieldCheck },
            { title: 'Passion', desc: 'A deep-rooted love for the art of production and live experiences.', icon: Heart },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl text-center group hover:border-gold/50 transition-all"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="text-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">Why <span className="text-gold">Choose Us</span></h2>
            <p className="text-gray-600">The Margret AV difference lies in our commitment to quality.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: 'Professional Team', desc: 'Highly trained technicians and engineers.', icon: Users },
              { title: 'High-End Equipment', desc: 'Latest gear from industry-leading brands.', icon: Zap },
              { title: 'Custom Solutions', desc: 'Tailored setups for your unique needs.', icon: Settings },
              { title: 'Reliable Service', desc: 'On-time delivery and flawless execution.', icon: ShieldCheck },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass p-8 rounded-2xl hover:bg-gold/10 transition-all border-transparent hover:border-gold/30"
              >
                <feature.icon className="text-gold mb-6 w-10 h-10" />
                <h4 className="font-bold mb-2 text-ink">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <div className="text-gold font-bold text-sm uppercase tracking-widest">Our Expertise</div>
              <h2 className="text-4xl md:text-5xl font-bold text-ink">Premium <span className="text-gold">Services</span></h2>
            </div>
            <p className="text-gray-600 max-w-md">Comprehensive technical solutions for events of all types and sizes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = (Icons as any)[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-black transition-all">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-gold transition-colors text-white">{service.title}</h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 rounded-3xl transition-all pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Showcase */}
      <section className="py-24 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-ink">Event <span className="text-gold">Highlights</span></h2>
          <p className="text-gray-600">See our work in action across various high-profile events.</p>
        </div>
        
        <div className="max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden glass p-2">
          <iframe 
            className="w-full h-full rounded-2xl grayscale-0"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Margret AV Showcase"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">Client <span className="text-gold">Stories</span></h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="flex justify-center">
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: activeTestimonial === i ? 1 : 0,
                    x: activeTestimonial === i ? 0 : (activeTestimonial > i ? -100 : 100),
                    scale: activeTestimonial === i ? 1 : 0.9
                  }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "absolute w-full glass p-12 rounded-3xl text-center",
                    activeTestimonial !== i && "pointer-events-none"
                  )}
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={20} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl italic mb-8 leading-relaxed text-ink">"{testimonial.text}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-gold" />
                    <div className="text-left">
                      <div className="font-bold text-ink">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="h-[400px] md:h-[350px]" /> {/* Spacer */}
            
            <div className="flex justify-center gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeTestimonial === i ? "bg-gold w-8" : "bg-ink/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">Pricing <span className="text-gold">Packages</span></h2>
            <p className="text-gray-600">Choose the perfect technical setup for your event scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "glass p-8 rounded-3xl flex flex-col relative group transition-all hover:-translate-y-2",
                  pkg.isPopular && "border-gold/50 bg-gold/5"
                )}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-ink">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gold mb-8">{pkg.price}</div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={`/package/${pkg.id}`}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-center transition-all",
                    pkg.isPopular ? "bg-gold text-black hover:bg-gold-light" : "glass hover:bg-ink/5 text-ink"
                  )}
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-gold p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 text-ink">Ready to <span className="text-gold">Elevate</span> Your Event?</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Let's discuss your vision and create a technical masterpiece together. Our team is ready to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/book" className="w-full sm:w-auto bg-gold text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gold-light transition-all">
              Start Booking
            </Link>
            <Link to="/contact" className="w-full sm:w-auto glass px-10 py-5 rounded-full font-bold text-lg hover:bg-ink/5 text-ink transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
