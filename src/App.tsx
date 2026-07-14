import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import Contact from './pages/Contact';
// import Book from './pages/Book';
import About from './pages/About';
import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/book" element={<Book />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Three phases: 'loading' -> 'splash' -> 'ready'
  const [phase, setPhase] = useState<'loading' | 'splash' | 'ready'>('loading');

  useEffect(() => {
    // Loading screen shows for 600ms, then transitions to splash
    const timer = setTimeout(() => setPhase('splash'), 600);
    return () => clearTimeout(timer);
  }, []);

  // Lock scrolling and hide scrollbar during loading/splash screens
  useEffect(() => {
    if (phase !== 'ready') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      (window as any).__splashPlayed = true;
    }
    setPhase('ready');
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {phase === 'loading' && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'splash' && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {(phase === 'splash' || phase === 'ready') && (
        <Layout>
          <AnimatedRoutes />
        </Layout>
      )}
    </Router>
  );
}
