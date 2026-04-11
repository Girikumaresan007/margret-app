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
    image: 'https://evoke.sg/wp-content/uploads/2020/06/Curve-LED-Wall.jpg',
    icon: 'Monitor',
  },
  {
    id: 'audio-system',
    title: 'Fabrication And Creative',
    description: 'High-quality sound, lighting, LED walls, and projection systems engineered for maximum audience impact.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2025/3/494522244/XA/II/ZH/137057838/corporate-event-stage-fabrication-1000x1000.jpg',
    icon: 'Speaker',
  },
  {
    id: 'lighting-design',
    title: 'Conference Mangement',
    description: 'Professional live streaming solutions for hybrid and virtual events with multi-camera setups and real-time broadcasting.',
    image: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2018/11/01/1154/SELRS-P1200-Grand-Ballroom-Business-Conference.jpg/SELRS-P1200-Grand-Ballroom-Business-Conference.4x3.jpg',
    icon: 'Lightbulb',
  },
  {
    id: 'stage-setup',
    title: 'Product Launch',
    description: 'Creative stage concepts and dynamic lighting designs that elevate the visual experience of your event.',
    image: 'https://5.imimg.com/data5/RA/HA/GLADMIN-36077309/product-launch-events-management-service-1000x1000.png',
    icon: 'Layout',
  },
  {
    id: 'live-streaming',
    title: 'Award cermony',
    description: 'Complete coordination, vendor management, and on-site supervision to ensure smooth event operations.',
    image: 'https://www.luxuryrestaurantawards.com/wp-content/uploads/sites/9/2023/03/SAT_9326-scaled.jpg',
    icon: 'Video',
  },
  {
    id: 'corporate-events',
    title: 'Production Solution',
    description: 'Custom booth design, setup, and technical support to attract visitors and maximize brand visibility.',
    image: 'https://www.event-hochiminhcity.com/images/service/DSC_493987.jpg',
    icon: 'Briefcase',
  },
  {
    id: 'Wedding Events',
    title: 'College Event',
    description: 'Creative stage concepts and dynamic lighting designs tailored to energize college festivals, cultural programs, symposiums, and campus celebrations.',
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?cs=srgb&dl=pexels-teddy-2263436.jpg&fm=jpg',
    icon: 'Heart',
  },
  {
    id: 'dj-setup',
    title: 'Political Event',
    description: 'Complete coordination, vendor management, and on-site supervision to ensure smooth event operations.',
    image: 'https://i.pinimg.com/originals/92/79/85/927985e6346ecdad2f72254246122808.jpg',
    icon: 'Music',
  },
  {
    id: 'event-management',
    title: 'Wedding Function',
    description: 'Custom booth design, setup, and technical support to attract visitors and maximize brand visibility.',
    image: 'https://boscalicious.co.uk/wp-content/uploads/Wedding-Venue-1.jpg',
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
