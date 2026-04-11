import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, phone, message } = formState;

  const subject = `New Contact from ${name}`;
  const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`;

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@margretav.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(gmailLink, "_blank");

  // ⏳ clear after 3 seconds
  setTimeout(() => {
    setFormState({ name: '', email: '', phone: '', message: '' });
  }, 3000);
};
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-ink"
          >
            Get in <span className="text-gold">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Have a question or ready to start your project? Reach out to us and our team will be happy to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0 text-gold">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-ink">Email Us</h3>
                  <p className="text-gray-600">hello@margretav.com</p>
                  <p className="text-gray-600">support@margretav.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0 text-gold">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-ink">Call Us</h3>
                  <p className="text-gray-600">+1 (234) 567-890</p>
                  <p className="text-gray-600">Mon - Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0 text-gold">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-ink">Visit Us</h3>
                  <p className="text-gray-600">123 Event Plaza, Production City</p>
                  <p className="text-gray-600">PC 56789, United States</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-ink">Follow Our Journey</h3>
              <div className="flex gap-4">
  {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
    <a
      key={i}
      href="#"
      className="group w-12 h-12 rounded-xl flex items-center justify-center 
                 bg-white/70 backdrop-blur-md 
                 border border-gray-200
                 transition-all duration-300 
                 hover:bg-gold hover:scale-110 hover:shadow-lg hover:shadow-gold/30"
    >
      <Icon 
        size={20} 
        className="text-ink transition-all duration-300 
                   group-hover:text-black group-hover:rotate-12 group-hover:scale-110"
      />
    </a>
  ))}
</div>
            </div>

            <div className="h-64 rounded-3xl overflow-hidden glass p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2f9755%3A0xd601c3003190848!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2s!4v1647854682345!5m2!1sen!2s" 
                className="w-full h-full rounded-2xl grayscale opacity-60"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass p-10 rounded-[2.5rem] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <input 
                  type="tel" 
                  value={formState.phone}
                  onChange={(e) => setFormState({...formState, phone: e.target.value})}
                  className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Your Message</label>
                <textarea 
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors resize-none text-ink"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gold text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-lg shadow-gold/10"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
