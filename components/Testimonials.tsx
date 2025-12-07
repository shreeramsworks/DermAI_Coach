import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = React.memo(() => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Eczema Warrior",
      text: "This app helped me identify that stress was my biggest trigger. The wellness tips are spot on and so calming when I'm having a flare-up.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Michael Chen",
      role: "Psoriasis Patient",
      text: "Tracking my skin used to be a mess of notes. Now I have a clean history with photos to show my dermatologist during visits.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Emma Wilson",
      role: "Skincare Enthusiast",
      text: "I love that it doesn't try to be a doctor. It just gives practical advice and helps me stay consistent with my moisturizing routine.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {reviews.map((review, i) => (
        <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative hover:shadow-lg transition-all duration-300 group">
          <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <Quote className="w-8 h-8 text-teal-500" />
          </div>
          
          <div className="flex gap-1 mb-6 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          
          <p className="text-slate-600 mb-6 italic leading-relaxed text-sm lg:text-base">
            "{review.text}"
          </p>
          
          <div className="flex items-center gap-4">
            <img 
              src={review.image} 
              alt={`Testimonial from ${review.name}`} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              loading="lazy"
              width="48"
              height="48"
            />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
              <p className="text-xs text-teal-600 font-medium uppercase tracking-wide">{review.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Testimonials;