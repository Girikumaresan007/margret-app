import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Instagram, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';
import { MenuToggleIcon } from '@/src/components/ui/menu-toggle-icon';

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

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const isHash = path.includes('#');
    const targetPathname = isHash ? path.split('#')[0] : path;
    const targetHash = isHash ? path.split('#')[1] : '';

    if (location.pathname === targetPathname) {
      e.preventDefault();
      if (targetHash) {
        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-2',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5'
          : 'bg-white shadow-sm'
      )}
      style={{ opacity: 0 }} // GSAP will animate this in
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Link to="/" className="flex items-center gap-2 lg:gap-3 group">
            <img
              id="navbar-logo"
              src="/logo.png"
              alt="Margret AV Logo"
              className="h-12 lg:h-14 w-auto object-contain flex-shrink-0 -translate-y-[1px] lg:-translate-y-[2px]"
            />
            {/* Mobile Branding (Visible on mobile only) */}
            <div className="flex flex-col justify-center lg:hidden">
              <span className="font-display font-bold text-lg leading-none tracking-tight text-ink">
                MARGRET
              </span>
              <span className="font-display font-bold text-[9px] tracking-[0.16em] text-gold uppercase mt-0.5 leading-none">
                AUDIO VISUAL
              </span>
            </div>
            {/* Desktop/Tablet Branding (Visible on Tablet & Desktop) */}
            <span className="hidden lg:inline font-display font-bold text-2xl tracking-tight text-ink mt-[1px]">
              MARGRET <span className="text-gold">AUDIO VISUAL</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavLinkClick(e, link.path)}
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border transition-all duration-300 relative z-50 focus:outline-none active:scale-90",
            isOpen
              ? "border-gold/30 bg-gold/10 text-gold"
              : "border-black/5 bg-black/[0.03] text-ink"
          )}
          aria-label="Toggle Menu"
        >
          <MenuToggleIcon open={isOpen} className="w-6 h-6" duration={350} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -16, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-black/5 py-8 px-6 lg:hidden flex flex-col items-center justify-center gap-6 shadow-xl origin-top"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="w-full text-center"
              >
                <Link
                  to={link.path}
                  onClick={(e) => handleNavLinkClick(e, link.path)}
                  className="text-xl font-display font-semibold text-ink hover:text-gold transition-colors inline-block relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-1/2" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.05 }}
              className="w-full max-w-[240px] mt-2"
            >
              <Link
                to="/contact"
                className="bg-gold text-black px-6 py-3 rounded-full text-center font-bold hover:bg-gold-light transition-colors block shadow-[0_4px_16px_rgba(218,165,32,0.25)]"
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex justify-center gap-6 mt-2"
            >
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@margretaudiovisual1095"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                <Youtube className="w-5 h-5 text-gray-600 hover:text-gold transition-colors" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
