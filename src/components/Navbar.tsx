import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/#services' },
  { name: 'Gallery', path: '/about#portfolio' },
  { name: 'Packages', path: '/#packages' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // GSAP: Cinematic navbar entrance on first mount
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.nav-link-item',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.nav-cta',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 1.0 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-2',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5'
          : 'bg-white shadow-sm'
      )}
      style={{ opacity: 0 }} // GSAP will animate this in
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Margret AV Logo"
              className="h-14 w-auto object-contain flex-shrink-0 -translate-y-[2px]"
            />
            <span className="font-display font-bold text-2xl tracking-tight text-ink mt-[1px]">
              MARGRET <span className="text-gold">AUDIO VISUAL</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="nav-link-item text-sm font-medium text-ink hover:text-gold transition-colors relative group opacity-0"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="nav-cta opacity-0"
          >
            <Link
              to="/contact"
              className="bg-gold text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gold-light transition-colors shadow-[0_0_16px_rgba(218,165,32,0.25)]"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-ink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -16, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-white border-t border-black/5 p-6 md:hidden flex flex-col gap-4 shadow-md origin-top"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className="text-lg font-medium text-ink hover:text-gold transition-colors block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
            >
              <Link
                to="/contact"
                className="bg-gold text-black px-6 py-3 rounded-xl text-center font-bold hover:bg-gold-light transition-colors block"
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex justify-center gap-6 mt-4"
            >
              <Instagram className="w-5 h-5 text-gray-600" />
              <Facebook className="w-5 h-5 text-gray-600" />
              <Youtube className="w-5 h-5 text-gray-600" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
