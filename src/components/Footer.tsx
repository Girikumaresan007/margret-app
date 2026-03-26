import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#EBE6DE] border-t border-black/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-ink">
              MARGRET <span className="text-gold">AV</span>
            </span>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crafting unforgettable event experiences with cutting-edge audio-visual technology and professional production management.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors text-ink">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors text-ink">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors text-ink">
              <Youtube size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors text-ink">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-ink">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-gold transition-colors">Our Services</a></li>
            <li><a href="#packages" className="hover:text-gold transition-colors">Pricing Packages</a></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-ink">Services</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gold transition-colors">LED Wall Setup</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Audio Engineering</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Lighting Design</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Live Streaming</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Event Management</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-ink">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0" />
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 Margret Audio Visual. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
