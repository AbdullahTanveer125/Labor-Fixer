import React from 'react';

export default function FirstMainSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/40 to-black/70 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in-up">
          Welcome to Labor-Fixer
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mb-8 animate-fade-in-up delay-100">
          Your one-stop solution for finding skilled labor and fixing your daily needs. Fast, reliable, and trusted by thousands.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 animate-fade-in-up delay-200">
          Join Our Community
        </button>
      </div>
    </section>
  );
}
