import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { MarqueeNotice } from './components/MarqueeNotice';
import { QuickNav } from './components/QuickNav';
import { JackpotTicker } from './components/JackpotTicker';
import { GameGrid } from './components/GameGrid';
import { MemberCenter } from './components/MemberCenter';
import { BottomNav } from './components/BottomNav';
import { SideDrawer } from './components/SideDrawer';
import { AuthModal } from './components/modals/AuthModal';
import { DepositModal } from './components/modals/DepositModal';
import { WithdrawModal } from './components/modals/WithdrawModal';
import { DepositSuccessToast } from './components/DepositSuccessToast';
import { GameLockModal } from './components/modals/GameLockModal';
import { AvatarModal } from './components/modals/AvatarModal';
import { LiveOddsSportsbook } from './components/LiveOddsSportsbook';
import { AviatorGame } from './components/games/AviatorGame';
import { SuperAceSlot } from './components/games/SuperAceSlot';
import { AdminLayout } from './components/admin/AdminLayout';
import { Sparkles, Gift, Share2, Award, ArrowLeft } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    activePlayerTab, 
    setActivePlayerTab, 
    activeGameToPlay, 
    setActiveGameToPlay,
    setIsDepositModalOpen,
    depositSuccessToast,
    setDepositSuccessToast,
    banners,
    activeCategory,
    isGameLockModalOpen,
    setIsGameLockModalOpen,
    lockedGame,
    isAvatarModalOpen,
    setIsAvatarModalOpen
  } = useApp();

  // Detect URL parameter for direct admin link (?view=admin or ?route=admin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'admin' || params.get('route') === 'admin') {
      setCurrentView('admin');
    }
  }, [setCurrentView]);

  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col pb-20 selection:bg-[#FFD700] selection:text-slate-950">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-2 space-y-4">
        {/* Active Game Modal / Full Screen Player */}
        {activeGameToPlay ? (
          <div className="space-y-3">
            <button
              onClick={() => setActiveGameToPlay(null)}
              className="flex items-center gap-2 bg-[#0f0f0f] border border-[#D4AF37]/30 text-[#FFD700] font-bold text-xs px-4 py-2 rounded-xl hover:border-[#FFD700] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>গেমে ফিরে যান (Back to Lobby)</span>
            </button>

            {activeGameToPlay.playType === 'aviator' ? (
              <AviatorGame />
            ) : (
              <SuperAceSlot />
            )}
          </div>
        ) : (
          <>
            {/* View Switcher based on Active Tab */}
            {activePlayerTab === 'home' && (
              <>
                <BannerCarousel />
                <MarqueeNotice />
                <QuickNav />
                <JackpotTicker />

                {/* Live Odds & VR Sports Section when sports or virtual category selected */}
                {(activeCategory === 'sports' || activeCategory === 'virtual') && (
                  <LiveOddsSportsbook />
                )}

                <GameGrid />
              </>
            )}

            {/* Promotions Tab */}
            {activePlayerTab === 'promotion' && (
              <div className="p-4 space-y-4">
                <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-2xl">
                  <h2 className="text-xl font-black text-[#FFD700] flex items-center gap-2 mb-2">
                    <Gift className="w-6 h-6 text-[#FFD700]" />
                    <span>বিশেষ প্রমোশন ও বোনাস অফার</span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    Jio247 অফিসিয়াল প্রমোশন ও প্রতিদিনের ক্যাশব্যাক সুবিধা
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {banners.map((banner) => (
                    <div
                      key={banner.id}
                      className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between gap-3"
                    >
                      <img src={banner.imageUrl} alt={banner.title} className="w-full h-44 object-cover rounded-xl" />
                      <div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFD700] text-slate-950">
                          {banner.tag}
                        </span>
                        <h3 className="text-base font-bold text-white mt-2">{banner.title}</h3>
                        <p className="text-xs text-gray-300 mt-1">{banner.subtitle}</p>
                      </div>
                      <button
                        onClick={() => setIsDepositModalOpen(true)}
                        className="w-full bg-gold-button font-black text-slate-950 py-2.5 rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
                      >
                        বোনাস ক্লেইম করুন (Claim Bonus)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invite Tab */}
            {activePlayerTab === 'invite' && (
              <div className="p-4 space-y-4 max-w-2xl mx-auto">
                <div className="bg-[#0f0f0f] border border-[#00BFFF]/30 rounded-2xl p-6 text-center space-y-3 shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#00BFFF]/20 text-[#00BFFF] flex items-center justify-center mx-auto border border-[#00BFFF]/40">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black text-white">বন্ধুদের আমন্ত্রণ জানান ও ৫০০ টাকা বোনাস পান</h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    আপনার রেফারেল লিংক ব্যবহার করে যেকোনো বন্ধু অ্যাকাউন্ট খুললেই পাবেন স্বয়ংক্রিয় ১০% রেফারেল কমিশন!
                  </p>
                  <div className="bg-[#050505] p-3 rounded-xl border border-white/10 font-mono text-xs text-[#FFD700] font-bold">
                    https://jio247.com/register?ref=JIO247-88
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://jio247.com/register?ref=JIO247-88');
                      alert('রেফারেল লিংক কপি করা হয়েছে!');
                    }}
                    className="w-full bg-gradient-to-r from-[#00BFFF] to-cyan-500 font-black text-slate-950 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all shadow-lg"
                  >
                    লিংক কপি করুন (Copy Referral Link)
                  </button>
                </div>
              </div>
            )}

            {/* Rewards Tab */}
            {activePlayerTab === 'reward' && (
              <div className="p-4 space-y-4 max-w-2xl mx-auto">
                <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl p-6 text-center space-y-3 shadow-2xl">
                  <Award className="w-12 h-12 text-[#FFD700] mx-auto animate-bounce" />
                  <h2 className="text-xl font-black text-[#FFD700]">ডেইলি রিওয়ার্ড ও হুইল স্পিন</h2>
                  <p className="text-xs text-gray-300">
                    প্রতিদিন লগইন করে ও নির্দিষ্ট পরিমাণ বেট করে জিতে নিন ফ্রি স্পিন রিওয়ার্ড!
                  </p>
                  <button
                    onClick={() => alert('আজকের ডেইলি বোনাস ৫০ টাকা আপনার একাউন্টে যোগ হয়েছে!')}
                    className="bg-gold-button font-black text-slate-950 px-6 py-3 rounded-xl text-xs hover:scale-105 transition-all shadow-xl"
                  >
                    ডেইলি রিওয়ার্ড সংগ্রহ করুন (Claim Daily Reward)
                  </button>
                </div>
              </div>
            )}

            {/* Member Center Tab */}
            {activePlayerTab === 'member' && <MemberCenter />}
          </>
        )}
      </main>

      {/* Global Modals & Navigation Drawers */}
      <BottomNav />
      <SideDrawer />
      <AuthModal />
      <DepositModal />
      <WithdrawModal />
      <AvatarModal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)} 
      />
      <GameLockModal 
        isOpen={isGameLockModalOpen} 
        onClose={() => setIsGameLockModalOpen(false)} 
        onUnlock={() => {
          if (lockedGame) {
            setActiveGameToPlay(lockedGame);
          }
          setIsGameLockModalOpen(false);
        }}
        game={lockedGame} 
      />
      <DepositSuccessToast 
        data={depositSuccessToast} 
        onClose={() => setDepositSuccessToast(null)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
