import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Gift, UserPlus, Award, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activePlayerTab, setActivePlayerTab } = useApp();

  const tabs: { id: 'home' | 'promotion' | 'invite' | 'reward' | 'member'; label: string; icon: any; badge?: number }[] = [
    { id: 'home', label: 'হোম (Home)', icon: Home },
    { id: 'promotion', label: 'প্রোমশন', icon: Gift },
    { id: 'invite', label: 'আমন্ত্রণ', icon: UserPlus },
    { id: 'reward', label: 'রিওয়ার্ড', icon: Award, badge: 1 },
    { id: 'member', label: 'মেম্বার', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#022320]/95 backdrop-blur-md border-t border-[#ffd700]/30 py-1 px-2 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePlayerTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActivePlayerTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                isActive ? 'text-amber-300 font-bold scale-105' : 'text-emerald-100/70 hover:text-amber-200'
              }`}
              id={`bottom-nav-${tab.id}`}
            >
              {tab.badge && (
                <span className="absolute -top-1 right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {tab.badge}
                </span>
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-emerald-200/80'}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
