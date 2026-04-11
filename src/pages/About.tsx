import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, CalendarCheck, Mic2, Users, MapPin, MonitorPlay, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollGallery } from '../components/ui/scroll-gallery';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};

export default function About() {
  return (
    <div className="relative bg-[#F5F2ED] overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.pro-audio-visual.co.uk/wp-content/uploads/2020/05/con-2.jpg"
            alt="Premium LED Wall and Stage Production"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gold tracking-wide uppercase">
              Who We Are
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-tight text-white drop-shadow-lg"
          >
            <span className="text-white"> Crafting Unforgettable</span>
            <br /><span className="text-gold">Event Experiences</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl max-w-2xl mx-auto mb-10"
          >
            LED walls, audio systems, and professional lighting solutions that transform ordinary spaces into extraordinary memories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#portfolio" className="bg-gold text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-all group w-fit mx-auto">
              Explore Our Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Story (About) */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="relative group rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://www.avrental.com.sg/wp-content/uploads/2024/05/led-wall-rental-ascott-3.jpeg"
              alt="Corporate Event Production"
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Glassmorphism Badge */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/60 backdrop-blur-md border border-gold-light/20 p-6 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2 text-gray-300">
                Technical Excellence
              </h3>
              <p className="text-sm text-black">Delivering perfection since 2008.</p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-gold" />
              <span className="text-gold font-bold text-sm uppercase tracking-widest">Our Story</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-ink leading-tight">
              Pioneering the Future of <br /> <span className="text-gold">Live Events</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Margret Audio Visual was born from a passion for flawless execution and technical precision. We are more than an equipment rental company—we are architects of atmosphere.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Our mission is to bridge the gap between your imagination and reality. By leveraging cutting-edge LED walls, immersive audio configurations, and dynamic lighting, we ensure your message doesn't just reach the audience—it moves them.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {[
                "Innovative Designs",
                "Flawless Execution",
                "Premium Equipment",
                "Dedicated Team"
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-sm border border-black/5">
                  <CheckCircle2 className="text-gold w-5 h-5 shrink-0" />
                  <span className="font-medium text-ink">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-24 px-6 bg-ink relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              <span className="text-white">Proven </span>
              <span className="text-gold">Excellence</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="h-[2px] w-[60px] mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { num: "15+", label: "Years Experience", icon: CalendarCheck, desc: "Delivering perfection consistently." },
              { num: "500+", label: "Events Completed", icon: MonitorPlay, desc: "From corporate AV to massive stages." },
              { num: "120+", label: "Happy Clients", icon: Users, desc: "Trusted by top industry brands." },
              { num: "10+", label: "Cities Covered", icon: MapPin, desc: "Providing premium rentals nationwide." }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative group p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-all duration-500 overflow-hidden shadow-xl"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-500 shadow-[0_0_15px_rgba(218,165,32,0.1)]">
                      <Icon className="w-5 h-5 text-gold drop-shadow-sm" />
                    </div>
                    <div className="text-3xl md:text-4xl font-display font-black text-white mb-2 tracking-tight group-hover:text-gold transition-colors duration-300">
                      {stat.num}
                    </div>
                    <div className="text-gold font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2">
                      {stat.label}
                    </div>
                    <div className="text-white/60 text-xs leading-relaxed max-w-[200px]">
                      {stat.desc}
                    </div>
                  </div>

                  {/* Bottom line indicator */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Founder / CEO Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gold rounded-3xl translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                alt="Founder & CEO"
                className="relative rounded-3xl object-cover w-full aspect-[4/5] z-10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-bold text-ink">Meet the Founder</h2>
            <h3 className="text-xl text-gold font-medium">Margret AV <span className="text-gray-400">|</span> <span className="text-gray-600">CEO & Chief Engineer</span></h3>

            <blockquote className="text-2xl font-serif text-gray-800 italic leading-relaxed border-l-4 border-gold pl-6 py-2 my-8">
              "Technology is only as powerful as the emotion it evokes. We handle the complexity so you can focus on the connection."
            </blockquote>

            <p className="text-gray-600 leading-relaxed">
              With over two decades of experience in acoustic engineering and visual design, our founders created Margret AV to elevate the standard of live events. Our vision ensures that every client receives white-glove service combined with robust, fail-safe technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Gallery / Portfolio */}
      <ScrollGallery />

      {/* 6. Client Logos / Trust Section */}
      <section className="py-16 bg-white border-y border-black/5 overflow-hidden">
        <h3 className="text-center text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">Trusted by Industry Leaders</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex gap-16 whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-16 items-center">
                {["L'Oréal", "Red Bull", "TEDx", "Samsung", "BMW", "Spotify", "Forbes", "Vogue"].map((client, i) => (
                  <span key={i} className="text-3xl font-display font-black text-gray-200 hover:text-gold transition-colors duration-300 cursor-default">
                    {client}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-ink to-ink z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            <span className="text-white"> Let's Create Something</span>
            <br /><span className="text-gold">Extraordinary</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl font-light mb-12 max-w-2xl mx-auto"
          >
            Partner with Margret AV to bring your vision to life. No event is too complex, no detail is too small.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* <Link to="/book" className="w-full sm:w-auto bg-gold text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gold-light hover:scale-105 transition-all shadow-[0_0_30px_rgba(218,165,32,0.4)]">
              Book Now
            </Link> */}
            <Link to="/contact" className="w-full sm:w-auto bg-gold backdrop-blur-md text-black border border-white/50 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
