import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#EBE6DE] border-t border-black/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
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
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/#services" className="hover:text-gold transition-colors">Our Services</Link></li>
            <li><Link to="/#packages" className="hover:text-gold transition-colors">Pricing Packages</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 text-ink">Services</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><Link to="/#led-wall" className="hover:text-gold transition-colors">LED Wall Setup</Link></li>
            <li><Link to="/#Wedding Events" className="hover:text-gold transition-colors">College Event</Link></li>
            <li><Link to="/#live-streaming" className="hover:text-gold transition-colors">Award Ceremony</Link></li>
            <li><Link to="/#dj-setup" className="hover:text-gold transition-colors">Political Event</Link></li>
            <li><Link to="/#event-management" className="hover:text-gold transition-colors">Wedding Function</Link></li>
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
