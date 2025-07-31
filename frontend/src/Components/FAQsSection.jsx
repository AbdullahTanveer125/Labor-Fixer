import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    q: 'What is Labor-Fixer?',
    a: 'Labor-Fixer is a platform connecting clients with skilled employees such as laborers, electricians, plumbers, and more for various jobs.'
  },
  {
    q: 'How do I register as an employee?',
    a: 'Click on the Sign-up button, select Employee, and fill in your details to join our network of skilled professionals.'
  },
  {
    q: 'How can clients find workers?',
    a: 'Clients can browse categories, view employee profiles, and contact suitable workers directly through the platform.'
  },
  {
    q: 'Is there a fee for registration?',
    a: 'Registration is free for both employees and clients. We believe in open access to opportunities.'
  },
  {
    q: 'How are employees verified?',
    a: 'We verify employee details and skills through documentation and, in some cases, interviews to ensure quality service.'
  },
  {
    q: 'Can I hire for urgent jobs?',
    a: 'Yes, you can post urgent jobs and get quick responses from available employees in your area.'
  },
  {
    q: 'What types of jobs can I post?',
    a: 'You can post jobs for labor, electrical work, plumbing, carpentry, cleaning, and many other categories.'
  },
  {
    q: 'How do I contact support?',
    a: 'You can reach our support team via the Contact Us page or by emailing support@laborfixer.com.'
  },
  {
    q: 'Is my information safe?',
    a: 'Yes, we use secure technology and strict privacy policies to protect your personal information.'
  },
  {
    q: 'Can I rate or review employees?',
    a: 'Absolutely! After a job is completed, clients can rate and review employees to help others make informed decisions.'
  },
];

export default function FAQsSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-800 mb-8 animate-fade-in-up">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-blue-100 rounded-xl shadow-sm overflow-hidden bg-blue-50">
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg md:text-xl font-semibold text-blue-900 focus:outline-none focus:bg-blue-100 transition-all duration-200 group"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                  {openIdx === idx ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div
                className={`px-5 pb-4 text-blue-800 text-base md:text-lg transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                style={{
                  transitionProperty: 'max-height, opacity',
                }}
              >
                {openIdx === idx && <div>{faq.a}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 