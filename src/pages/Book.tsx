// import { motion } from 'motion/react';
// import { Calendar, MapPin, Users, Briefcase, User, Mail, Phone, Building, CheckCircle2, Send } from 'lucide-react';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { PACKAGES } from '../constants';
// import { cn } from '../lib/utils';

// export default function Book() {
//   const location = useLocation();
//   const initialPackage = location.state?.packageId || '';

//   const [formState, setFormState] = useState({
//     package: initialPackage,
//     date: '',
//     location: '',
//     eventType: '',
//     attendees: '',
//     requirements: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     company: '',
//     agreed: false
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formState.agreed) {
//       alert('Please agree to the Terms & Conditions.');
//       return;
//     }
//     alert('Booking request submitted! Our team will contact you within 24 hours.');
//   };

//   return (
//     <div className="pt-32 pb-24 px-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-16">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl font-bold mb-6 text-ink"
//           >
//             Book Your <span className="text-gold">Event</span>
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-gray-600"
//           >
//             Fill out the form below to request a technical setup for your upcoming event.
//           </motion.p>
//         </div>

//         <motion.form 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           onSubmit={handleSubmit} 
//           className="glass p-8 md:p-12 rounded-[3rem] space-y-10"
//         >
//           {/* Event Details */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-bold flex items-center gap-3 text-ink">
//               <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center text-gold">
//                 <Calendar size={18} />
//               </div>
//               Event Details
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Select Package</label>
//                 <select 
//                   required
//                   value={formState.package}
//                   onChange={(e) => setFormState({...formState, package: e.target.value})}
//                   className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors appearance-none text-ink"
//                 >
//                   <option value="" className="bg-beige">Select a package</option>
//                   {PACKAGES.map(pkg => (
//                     <option key={pkg.id} value={pkg.id} className="bg-beige">{pkg.name} Package</option>
//                   ))}
//                   <option value="custom" className="bg-beige">Custom Solution</option>
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Event Date</label>
//                 <input 
//                   type="date" 
//                   required
//                   value={formState.date}
//                   onChange={(e) => setFormState({...formState, date: e.target.value})}
//                   className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Event Location</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <input 
//                     type="text" 
//                     required
//                     value={formState.location}
//                     onChange={(e) => setFormState({...formState, location: e.target.value})}
//                     className="w-full bg-ink/5 border border-ink/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                     placeholder="Venue Name, City"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Event Type</label>
//                 <select 
//                   required
//                   value={formState.eventType}
//                   onChange={(e) => setFormState({...formState, eventType: e.target.value})}
//                   className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors appearance-none text-ink"
//                 >
//                   <option value="" className="bg-beige">Select type</option>
//                   <option value="wedding" className="bg-beige">Wedding</option>
//                   <option value="corporate" className="bg-beige">Corporate</option>
//                   <option value="concert" className="bg-beige">Concert</option>
//                   <option value="private" className="bg-beige">Private Event</option>
//                   <option value="other" className="bg-beige">Other</option>
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Number of Attendees</label>
//                 <div className="relative">
//                   <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <input 
//                     type="number" 
//                     required
//                     value={formState.attendees}
//                     onChange={(e) => setFormState({...formState, attendees: e.target.value})}
//                     className="w-full bg-ink/5 border border-ink/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                     placeholder="e.g. 200"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-600">Special Requirements</label>
//               <textarea 
//                 rows={4}
//                 value={formState.requirements}
//                 onChange={(e) => setFormState({...formState, requirements: e.target.value})}
//                 className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors resize-none text-ink"
//                 placeholder="Tell us about any specific technical needs or themes..."
//               />
//             </div>
//           </div>

//           <hr className="border-ink/5" />

//           {/* Contact Details */}
//           <div className="space-y-6">
//             <h3 className="text-xl font-bold flex items-center gap-3 text-ink">
//               <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center text-gold">
//                 <User size={18} />
//               </div>
//               Contact Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Full Name</label>
//                 <input 
//                   type="text" 
//                   required
//                   value={formState.fullName}
//                   onChange={(e) => setFormState({...formState, fullName: e.target.value})}
//                   className="w-full bg-ink/5 border border-ink/10 rounded-xl px-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <input 
//                     type="email" 
//                     required
//                     value={formState.email}
//                     onChange={(e) => setFormState({...formState, email: e.target.value})}
//                     className="w-full bg-ink/5 border border-ink/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <input 
//                     type="tel" 
//                     required
//                     value={formState.phone}
//                     onChange={(e) => setFormState({...formState, phone: e.target.value})}
//                     className="w-full bg-ink/5 border border-ink/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                     placeholder="+1 (234) 567-890"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-600">Company / Organization</label>
//                 <div className="relative">
//                   <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//                   <input 
//                     type="text" 
//                     value={formState.company}
//                     onChange={(e) => setFormState({...formState, company: e.target.value})}
//                     className="w-full bg-ink/5 border border-ink/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-gold transition-colors text-ink"
//                     placeholder="Your Company Name"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="pt-4">
//             <label className="flex items-start gap-3 cursor-pointer group">
//               <div className="relative mt-1">
//                 <input 
//                   type="checkbox" 
//                   className="sr-only"
//                   checked={formState.agreed}
//                   onChange={(e) => setFormState({...formState, agreed: e.target.checked})}
//                 />
//                 <div className={cn(
//                   "w-5 h-5 border-2 rounded transition-all",
//                   formState.agreed ? "bg-gold border-gold" : "border-ink/20 group-hover:border-gold/50"
//                 )}>
//                   {formState.agreed && <CheckCircle2 size={14} className="text-black mx-auto mt-0.5" />}
//                 </div>
//               </div>
//               <span className="text-sm text-gray-600">
//                 I agree to the <a href="#" className="text-gold hover:underline">Terms & Conditions</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a>.
//               </span>
//             </label>
//           </div>

//           <button 
//             type="submit"
//             className="w-full bg-gold text-black py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-xl shadow-gold/20"
//           >
//             Confirm Booking Request <Send size={20} />
//           </button>
//         </motion.form>
//       </div>
//     </div>
//   );
// }
