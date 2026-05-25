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
    title: 'LED Wall Renting',
    description: 'High-quality LED wall rentals delivering stunning visuals and reliable technical support for any event.',
    image: '/Curve-LED-Wall.webp',
    icon: 'Monitor',
  },
  {
    id: 'audio-system',
    title: 'Fabrication And Creative',
    description: 'High-quality sound, lighting, LED walls, and projection systems engineered for maximum audience impact.',
    image: '/corporate-event-stage-fabrication-1000x1000.webp',
    icon: 'Layers',
  },
  {
    id: 'lighting-design',
    title: 'Conference Management',
    description: 'Professional live streaming solutions for hybrid and virtual events with multi-camera setups and real-time broadcasting.',
    image: '/confernces management.webp',
    icon: 'Presentation',
  },
  {
    id: 'stage-setup',
    title: 'Product Launch',
    description: 'Creative stage concepts and dynamic lighting designs that elevate the visual experience of your event.',
    image: '/product-launch-events-management-service-1000x1000.webp',
    icon: 'Rocket',
  },
  {
    id: 'live-streaming',
    title: 'Award Ceremony',
    description: 'Complete coordination, vendor management, and on-site supervision to ensure smooth event operations.',
    image: '/award-ceremony.webp',
    icon: 'Award',
  },
  {
    id: 'corporate-events',
    title: 'Production Solution',
    description: 'Custom booth design, setup, and technical support to attract visitors and maximize brand visibility.',
    image: '/production sloution.webp',
    icon: 'Settings',
  },
  {
    id: 'Wedding Events',
    title: 'College Event',
    description: 'Creative stage concepts and dynamic lighting designs tailored to energize college festivals, cultural programs, symposiums, and campus celebrations.',
    image: '/pexels-teddy-2263436.webp',
    icon: 'GraduationCap',
  },
  {
    id: 'dj-setup',
    title: 'Political Event',
    description: 'Complete coordination, vendor management, and on-site supervision to ensure smooth event operations.',
    image: '/political event.webp',
    icon: 'Megaphone',
  },
  {
    id: 'event-management',
    title: 'Wedding Function',
    description: 'Custom booth design, setup, and technical support to attract visitors and maximize brand visibility.',
    image: '/Wedding-Venue-1.webp',
    icon: 'Heart',
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
