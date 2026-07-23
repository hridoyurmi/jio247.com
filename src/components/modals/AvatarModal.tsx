import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_AVATARS } from '../../data/mockData';
import { AvatarOption } from '../../types';
import { X, Sparkles, Check, UserCheck } from 'lucide-react';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useApp();

  if (!isOpen || !user) return null;

  const handleSelectAvatar = (avatar: AvatarOption) => {
    setUser({
      ...user,
      avatar: avatar.icon
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#032d29] via-[#022320] to-[#011715] border-2 border-[#FFD700] rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FFD700] text-slate-950 rounded-xl font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                আপনার রয়্যাল অ্যাভাটার নির্বাচন করুন
              </h3>
              <p className="text-[11px] text-amber-200"> Select Your Official Avatar Identity</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/40 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {INITIAL_AVATARS.map((item) => {
            const isSelected = user.avatar === item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectAvatar(item)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-[#FFD700]/20 border-[#FFD700] ring-2 ring-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                    : 'bg-[#021f1c] border-white/10 hover:border-[#FFD700]/40 hover:bg-[#032925]'
                }`}
              >
                <div className="text-4xl my-1 animate-pulse">{item.icon}</div>
                <div className="text-center space-y-0.5">
                  <span className="font-extrabold text-xs text-white block">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-black/40 text-amber-300 rounded-full border border-amber-400/30 inline-block">
                    {item.badge}
                  </span>
                </div>

                {isSelected && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#FFD700] text-slate-950 font-black text-xs py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          ঠিক আছে (Done)
        </button>
      </div>
    </div>
  );
};
