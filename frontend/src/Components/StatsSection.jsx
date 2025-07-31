import React from 'react';
import { FaUsers, FaUserTie, FaCheckCircle, FaTools } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers className="text-blue-600 text-4xl md:text-5xl drop-shadow" />,
    label: 'Total Employees',
    value: '2,500+',
    desc: 'Labor, Electricians, Plumbers, and more',
  },
  {
    icon: <FaUserTie className="text-green-600 text-4xl md:text-5xl drop-shadow" />,
    label: 'Total Clients',
    value: '1,200+',
    desc: 'Happy clients finding skilled workers',
  },
  {
    icon: <FaCheckCircle className="text-yellow-500 text-4xl md:text-5xl drop-shadow" />,
    label: 'Jobs Completed',
    value: '8,000+',
    desc: 'Successful projects and tasks',
  },
  {
    icon: <FaTools className="text-purple-600 text-4xl md:text-5xl drop-shadow" />,
    label: 'Categories',
    value: '20+',
    desc: 'Wide range of professions',
  },
];

export default function StatsSection() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-800 mb-4 animate-fade-in-up">Our Impact in Numbers</h2>
        <p className="text-center text-blue-700 mb-10 text-lg md:text-xl animate-fade-in-up delay-100">
          Connecting skilled employees with clients and delivering quality work every day.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-blue-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500 text-center">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 