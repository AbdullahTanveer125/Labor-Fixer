import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Amit Sharma',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'Labor-Fixer helped me find a reliable electrician in minutes. The process was smooth and the service was excellent!',
    datetime: '2024-06-01 14:23',
  },
  {
    name: 'Priya Verma',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'I registered as a plumber and got my first job within a day. Great platform for skilled workers!',
    datetime: '2024-05-28 09:10',
  },
  {
    name: 'Rahul Singh',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    feedback: 'The review system is transparent and the support team is very responsive. Highly recommended!',
    datetime: '2024-05-25 18:45',
  },
  {
    name: 'Sunita Patel',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback: 'I found a trustworthy laborer for my home renovation. The feedback and ratings helped a lot.',
    datetime: '2024-05-20 12:30',
  },
  {
    name: 'Vikas Kumar',
    img: 'https://randomuser.me/api/portraits/men/77.jpg',
    feedback: 'Easy to use and very effective. I will definitely use Labor-Fixer again!',
    datetime: '2024-05-18 16:05',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-blue-100 via-white to-blue-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-800 mb-8 animate-fade-in-up">What Our Users Say</h2>
        <div className="relative w-full">
          <div className="flex w-max animate-marquee gap-8">
            {testimonials.concat(testimonials).map((review, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mx-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              >
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-200 mb-3 object-cover shadow"
                />
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <div className="font-bold text-blue-900 text-lg mb-1">{review.name}</div>
                <div className="text-gray-600 text-center mb-2">"{review.feedback}"</div>
                <div className="text-xs text-blue-500 mt-auto">{review.datetime}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Marquee animation style */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 32s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
} 