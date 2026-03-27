import { motion } from 'motion/react';
import { TestimonialsSection } from '../components/ui/testimonial-v2';
import { ArrowRight, Star, CheckCircle2, Play, Users, ShieldCheck, Zap, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SERVICES, TESTIMONIALS, PACKAGES } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import ThreeBackground from '../components/ThreeBackground';

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
        <ThreeBackground />
        
        <div className="max-w-7xl mx-auto text-center z-10 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gold tracking-wide uppercase">
              Premium Event Solutions
            </span>
          </motion.div>
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

        {/* <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </div>
        </motion.div> */}
      </section>

      {/* Marquee Section */}
      <section className="py-6 bg-[#EFE7D7] overflow-hidden border-y border-black/5 relative">

        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#F5F2ED] to-transparent z-10" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#F5F2ED] to-transparent z-10" />

        <div className="flex gap-12 whitespace-nowrap animate-marquee">

          {[
            "Wedding Events",
            "Corporate Events",
            "Live Concerts",
            "DJ Nights",
            "Birthday Parties",
            "Product Launch",
            "College Events",
            "Fashion Shows",
            "Award Functions"
          ]
            .concat([
              "Wedding Events",
              "Corporate Events",
              "Live Concerts",
              "DJ Nights",
              "Birthday Parties",
              "Product Launch",
              "College Events",
              "Fashion Shows",
              "Award Functions"
            ])
            .map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-lg font-semibold text-ink tracking-wide hover:text-gold transition"
              >
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                {item}
              </div>
            ))}

        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-6 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <motion.div
            {...fadeInUp}
            className="relative"
          >

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200"
                alt="Margret AV Production"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* FLOATING BADGE 🔥 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:-bottom-6 md:-left-6 
         bg-gradient-to-br from-gold to-gold-light text-black 
         px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 
        rounded-xl sm:rounded-2xl 
        shadow-lg sm:shadow-xl 
       max-w-[180px] sm:max-w-none"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">15+</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                Years Experience
              </div>
            </motion.div>

          </motion.div>

          {/* CONTENT */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6"
          >

            <motion.div {...fadeInUp} className="text-gold font-bold text-sm uppercase tracking-widest">
              About US
            </motion.div>

            <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold text-ink leading-tight">
              Excellence in <span className="text-gold">Production</span>
            </motion.h2>

            <motion.p {...fadeInUp} className="text-gray-600 leading-relaxed">
              Founded on the principles of technical precision and creative vision, Margret Audio Visual has grown into a premier event production partner. We don't just provide equipment; we craft atmospheres that resonate with your audience.
            </motion.p>

            <motion.p {...fadeInUp} className="text-gray-600 leading-relaxed">
              Our team of expert engineers and designers work tirelessly to ensure every pixel is perfect and every note is pure. From intimate corporate gatherings to massive outdoor concerts, we bring the same level of dedication and high-end technology to every project.
            </motion.p>

            {/* FEATURES */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
            >
              {[
                "Certified Engineers",
                "24/7 Support",
                "Global Reach",
                "Latest Tech"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gold/10 transition-all duration-300 border border-black/5"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10">
                    <CheckCircle2 className="text-gold w-4 h-4" />
                  </div>
                  <span className="font-medium text-ink text-sm">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold mb-4 text-ink">Our <span className="text-gold">Mission</span></motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "60px", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
          />
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
              className="relative glass p-10 rounded-3xl text-center group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <item.icon className="text-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" /> */}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">
              Why <span className="text-gold">Choose Us</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600">
              The Margret AV difference lies in our commitment to quality.
            </p>
          </div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Professional Team",
                desc: "Highly trained technicians and engineers.",
                icon: Users,
              },
              {
                title: "High-End Equipment",
                desc: "Latest gear from industry-leading brands.",
                icon: Zap,
              },
              {
                title: "Custom Solutions",
                desc: "Tailored setups for your unique needs.",
                icon: Settings,
              },
              {
                title: "Reliable Service",
                desc: "On-time delivery and flawless execution.",
                icon: ShieldCheck,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-black/5 hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
              >
                {/* Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-gold group-hover:text-black" />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold mb-2 text-ink">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              Premium <span className="text-gold">Services</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600 mt-4">
              Comprehensive technical solutions for events of all types and sizes.
            </p>
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
                  {/* IMAGE */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* DARK OVERLAY (ONLY ON HOVER) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

                  {/* CONTENT (HIDDEN INITIALLY) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    {/* ICON */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F2EDE2]/10 backdrop-blur-md">
                      <Icon size={24} className="text-[#F2EDE2]" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-bold mb-2 !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-white/80 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* BORDER GLOW */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#F2EDE2]/30 rounded-3xl transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">Pricing <span className="text-gold">Packages</span></h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
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
                    "w-full py-4 rounded-xl font-bold text-center transition-colors duration-300",
                    pkg.isPopular
                      ? "bg-gold text-black hover:bg-gold-light"
                      : "bg-white/70 text-ink hover:bg-gold-light hover:text-black"
                  )}
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* YouTube Showcase */}
      <section className="py-20 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              Event <span className="text-gold">Highlights</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600 mt-4">
              See our work in action across various high-profile events.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Video 1 */}
            <div className="group aspect-video rounded-3xl overflow-hidden glass p-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)]">
              <iframe
                className="w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Margret AV Showcase 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video 2 */}
            <div className="group aspect-video rounded-3xl overflow-hidden glass p-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)]">
              <iframe
                className="w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                title="Margret AV Showcase 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

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
