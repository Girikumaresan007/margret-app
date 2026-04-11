import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, ShieldCheck, Zap, Clock, Star } from 'lucide-react';
import { PACKAGES } from '../constants';
import { cn } from '../lib/utils';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES.find(p => p.id === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Packages
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-ink">{pkg.name} <span className="text-gold">Package</span></h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our {pkg.name} package is designed to provide a comprehensive technical solution for your event. We combine high-end equipment with professional engineering to ensure every aspect of your production is flawless.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-ink">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="glass p-6 rounded-2xl flex items-start gap-4">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" />
                    <span className="font-medium text-ink">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-ink">Add-ons Available</h2>
              <div className="space-y-4">
                {[
                  { name: 'Extra LED Screen (55")', price: '+$150/ea' },
                  { name: 'Wireless Microphone Kit', price: '+$75/ea' },
                  { name: 'Fog Machine / Special Effects', price: '+$200' },
                  { name: 'Additional Technical Support', price: '+$50/hr' },
                ].map((addon, i) => (
                  <div key={i} className="flex justify-between items-center p-4 glass rounded-xl">
                    <span className="text-gray-700">{addon.name}</span>
                    <span className="text-gold font-bold">{addon.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-gold p-10 rounded-[2rem] sticky top-32"
            >
              <div className="text-sm font-bold text-gold uppercase tracking-widest mb-2">Package Price</div>
              <div className="text-5xl font-bold mb-8 text-ink">{pkg.price}</div>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-sm text-ink">
                  <ShieldCheck className="text-gold" />
                  <span>Full Insurance Coverage</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-ink">
                  <Zap className="text-gold" />
                  <span>Express Setup Available</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-ink">
                  <Clock className="text-gold" />
                  <span>24/7 Technical Support</span>
                </div>
              </div>

              <Link
                to="/contact"
                state={{ packageId: pkg.id }}
                className="block w-full bg-gold text-black py-5 rounded-2xl font-bold text-center hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
              >
                Contact Us
              </Link>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                * Final pricing may vary based on location and specific requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
