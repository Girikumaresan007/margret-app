import { motion, useScroll, useSpring } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle className="text-white w-8 h-8" />
      </a>
    </div>
  );
}
