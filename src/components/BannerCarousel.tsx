import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Gift, Sparkles } from 'lucide-react';

export const BannerCarousel: React.FC = () => {
  const { banners, setIsDepositModalOpen } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBanners = banners.filter(b => b.active);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeBanners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 my-3">
      <div className="relative overflow-hidden rounded-xl border border-[#ffd700]/30 bg-gradient-to-r from-[#032d29] via-[#06423d] to-[#022320] shadow-xl aspect-[21/9] sm:aspect-[24/8] md:aspect-[30/9]">
        
        {/* Banner Slide Content */}
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-between p-4 sm:p-6 md:p-8 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background artwork */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#022320] via-[#022320]/80 to-transparent" />

            {/* Banner Text Area */}
            <div className="relative z-10 max-w-xl flex flex-col justify-center items-start gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                <Sparkles className="w-3 h-3" />
                {banner.tag || 'CV666 PROMO'}
              </span>

              <h2 className="text-base sm:text-2xl md:text-3xl font-black text-amber-300 drop-shadow-md leading-tight">
                {banner.title}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 line-clamp-2 max-w-md font-medium">
                {banner.subtitle}
              </p>

              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="mt-1 sm:mt-2 bg-gold-button font-bold text-slate-950 text-xs sm:text-sm px-4 py-1.5 sm:py-2 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <Gift className="w-4 h-4 text-slate-950" />
                <span>বোনাস গ্রহণ করুন</span>
              </button>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + activeBanners.length) % activeBanners.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-amber-300 hover:bg-black/70 border border-amber-400/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % activeBanners.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-amber-300 hover:bg-black/70 border border-amber-400/30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 right-4 z-20 flex items-center gap-1.5">
              {activeBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
