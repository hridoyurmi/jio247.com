import React from 'react';
import { Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MarqueeNotice: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="bg-[#032b27] border-y border-[#ffd700]/20 py-2 px-3 flex items-center gap-2 overflow-hidden shadow-inner">
      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs shrink-0 bg-[#06423d] px-2 py-0.5 rounded border border-amber-400/30">
        <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
        <span className="hidden sm:inline">ঘোষণা</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap text-xs text-amber-100 font-medium tracking-wide">
        <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {settings.marqueeNotice || 'স্বাগতম Jio247.com-এ! বিকাশ, নগদ ও রকেটের মাধ্যমে মাত্র ১ মিনিটে ডিপোজিট ও ১০ মিনিটে উত্তোলন করুন।'}
        </div>
      </div>
    </div>
  );
};
