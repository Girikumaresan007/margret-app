import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

// Auto-updates every year — no manual edits needed
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#EBE6DE] border-t border-black/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Margret AV Logo"
              className="h-14 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300 -translate-y-[2px]"
            />
            <span className="font-display font-bold text-2xl tracking-tight text-ink mt-[1px]">
              MARGRET <span className="text-gold">AUDIO VISUAL</span>
            </span>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crafting unforgettable event experiences with cutting-edge audio-visual
            technology and professional production management.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-ink hover:text-gold hover:scale-110 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <h4 className="font-display font-bold mb-6 text-ink">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'Our Services', to: '/#services' },
              { label: 'Pricing Packages', to: '/#packages' },
              { label: 'Contact Us', to: '/contact' },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-gold hover:translate-x-1 inline-block transition-all duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.14 }}
        >
          <h4 className="font-display font-bold mb-6 text-ink">Services</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            {[
              { label: 'LED Wall Setup', to: '/#led-wall' },
              { label: 'College Event', to: '/#Wedding Events' },
              { label: 'Award Ceremony', to: '/#live-streaming' },
              { label: 'Political Event', to: '/#dj-setup' },
              { label: 'Wedding Function', to: '/#event-management' },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="hover:text-gold hover:translate-x-1 inline-block transition-all duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <h4 className="font-display font-bold mb-6 text-ink">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>123 Event Plaza, Production City, PC 56789</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <span>hello@margretav.com</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar — year updates automatically */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {CURRENT_YEAR} Margret Audio Visual. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
