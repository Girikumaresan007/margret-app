import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const headingRef = useRef<HTMLHeadingElement>(null);

  // GSAP: Character-by-character heading reveal
  useEffect(() => {
    if (!headingRef.current) return;
    const heading = headingRef.current;
    const text = heading.innerHTML;
    // Split plain text chars (preserve inner span for gold "Touch")
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 40, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formState;
    const subject = `New Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:hello@margretav.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=hello@margretav.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
    setTimeout(() => setFormState({ name: '', email: '', phone: '', message: '' }), 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading — GSAP reveal */}
        <div className="text-center mb-16">
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold mb-6 text-ink"
            style={{ opacity: 0 }}
          >
            Get in <span className="text-gold">Touch</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Have a question or ready to start your project? Reach out to us and our team
            will be happy to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-12"
          >
            <div className="space-y-8">
              {[
                {
                  Icon: Mail,
                  title: 'Email Us',
                  lines: ['hello@margretav.com', 'support@margretav.com'],
                },
                {
                  Icon: Phone,
                  title: 'Call Us',
                  lines: ['+1 (234) 567-890', 'Mon - Fri, 9am - 6pm'],
                },
                {
                  Icon: MapPin,
                  title: 'Visit Us',
                  lines: ['123 Event Plaza, Production City', 'PC 56789, United States'],
                },
              ].map(({ Icon, title, lines }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                  className="flex items-start gap-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(218,165,32,0.15)' }}
                    className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0 text-gold transition-colors"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-ink">{title}</h3>
                    {lines.map((l) => (
                      <p key={l} className="text-gray-600">{l}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-ink">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    className="group w-12 h-12 rounded-xl flex items-center justify-center bg-white/70 backdrop-blur-md border border-gray-200 transition-all duration-300 hover:bg-gold hover:shadow-lg hover:shadow-gold/30"
                  >
                    <Icon size={20} className="text-ink transition-all duration-300 group-hover:text-black" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="h-64 rounded-3xl overflow-hidden glass p-2"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2f9755%3A0xd601c3003190848!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2s!4v1647854682345!5m2!1sen!2s"
                className="w-full h-full rounded-2xl grayscale opacity-60"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <form onSubmit={handleSubmit} className="glass p-10 rounded-[2.5rem] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <input
                    type="text" required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-ink"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <input
                    type="email" required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-ink"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.69 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-ink"
                  placeholder="+1 (234) 567-890"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.76 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-600">Your Message</label>
                <textarea
                  required rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none text-ink"
                  placeholder="How can we help you?"
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(218,165,32,0.35)' }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="w-full bg-gold text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-lg shadow-gold/10"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
