export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 'led-wall',
    title: 'LED Wall Setup',
    description: 'High-definition LED screens for crystal clear visual experiences at any scale.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    icon: 'Monitor',
  },
  {
    id: 'audio-system',
    title: 'Audio System',
    description: 'Professional sound engineering with premium equipment for immersive audio.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    icon: 'Speaker',
  },
  {
    id: 'lighting-design',
    title: 'Lighting Design',
    description: 'Cinematic lighting solutions that set the perfect mood for your event.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    icon: 'Lightbulb',
  },
  {
    id: 'stage-setup',
    title: 'Stage Setup',
    description: 'Custom stage designs and construction tailored to your event theme.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
    icon: 'Layout',
  },
  {
    id: 'live-streaming',
    title: 'Live Streaming',
    description: 'Professional multi-camera broadcasting for global audience reach.',
    image: 'https://images.unsplash.com/photo-1560169897-bb333ef3df40?auto=format&fit=crop&q=80&w=800',
    icon: 'Video',
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    description: 'Seamless technical execution for conferences, seminars, and galas.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    icon: 'Briefcase',
  },
  {
    id: 'wedding-events',
    title: 'Wedding Events',
    description: 'Elegant audio-visual setups for your most special day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    icon: 'Heart',
  },
  {
    id: 'dj-setup',
    title: 'DJ Setup',
    description: 'High-energy sound and light rigs for parties and concerts.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800',
    icon: 'Music',
  },
  {
    id: 'event-management',
    title: 'Event Management',
    description: 'End-to-end technical coordination and production management.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800',
    icon: 'Settings',
  },
];

export const PACKAGES: Package[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$999',
    features: ['Standard Audio System', '2 LED Screens (55")', 'Basic Stage Lighting', '4 Hours Support', 'Setup & Teardown'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$2,499',
    features: ['Premium Audio System', '10x8ft LED Wall', 'Moving Head Lights', 'Live Mixing', '8 Hours Support', 'Event Photography'],
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$4,999',
    features: ['Concert Grade Audio', '20x10ft LED Wall', 'Full Lighting Rig', 'Multi-cam Live Stream', 'Full Day Support', 'Cinematic Video Highlights'],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 'Custom',
    features: ['Custom Stage Design', 'Multiple LED Surfaces', 'Special Effects (Pyros/Fog)', 'Satellite Broadcasting', 'Dedicated Production Team', 'International Support'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Marketing Director, TechCorp',
    rating: 5,
    text: 'Margret Audio Visual transformed our annual conference. The LED wall was stunning and the sound was crystal clear in every corner of the hall.',
    image: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Event Planner',
    rating: 5,
    text: 'I have worked with many AV companies, but Margret is on another level. Their attention to detail and professional team made my job so much easier.',
    image: 'https://i.pravatar.cc/150?u=michael',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Bride',
    rating: 5,
    text: 'Our wedding lighting was like a fairy tale. They understood exactly what we wanted and exceeded our expectations. Highly recommended!',
    image: 'https://i.pravatar.cc/150?u=elena',
  },
];
