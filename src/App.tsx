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
import ScrollToTop from './components/ScrollToTop';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <Layout>
          <AnimatedRoutes />
        </Layout>
      )}
    </Router>
  );
}
