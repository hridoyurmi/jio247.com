import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Lock, Eye, EyeOff, X, Check, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    setIsLoggedIn, 
    setCurrentUser, 
    users 
  } = useApp();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [is18Plus, setIs18Plus] = useState(true);
  const [wantOffers, setWantOffers] = useState(true);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || !password) {
      setError('অনুগ্রহ করে সকল ঘর পূরণ করুন');
      return;
    }

    if (authModalTab === 'register') {
      if (password !== confirmPassword) {
        setError('পাসওয়ার্ড দুটি মিলছে না');
        return;
      }
      if (!is18Plus) {
        setError('আপনাকে অবশ্যই ১৮ বছর বা তার বেশি হতে হবে');
        return;
      }

      // Create new user
      const newUser = {
        id: `u-${Date.now()}`,
        phone,
        nickname: phone,
        balance: 100.00, // Welcome gift balance
        vipLevel: 0,
        isKycVerified: false,
        kycStatus: 'none' as const,
        status: 'active' as const,
        joinedDate: new Date().toISOString().substring(0, 10),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        totalDeposit: 0,
        totalWithdraw: 0,
        totalBets: 0,
        refCode: `CV666-${Math.floor(10 + Math.random() * 90)}`
      };

      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
    } else {
      // Login
      const found = users.find(u => u.phone === phone);
      if (found) {
        setCurrentUser(found);
      }
      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#032d29] via-[#022320] to-[#011715] border-2 border-amber-400 rounded-3xl p-6 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-amber-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header - Matching Screenshots 1 & 2 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gold-shine tracking-tight">
            CV666.COM
          </h2>
          <h3 className="text-xl font-bold text-amber-300 mt-1">
            {authModalTab === 'login' ? 'Login' : 'Register'}
          </h3>

          <p className="text-xs text-emerald-200/80 mt-1">
            {authModalTab === 'login' ? (
              <>
                No account yet?{' '}
                <button
                  onClick={() => setAuthModalTab('register')}
                  className="text-amber-300 font-bold underline hover:text-amber-200"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthModalTab('login')}
                  className="text-amber-300 font-bold underline hover:text-amber-200"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2.5 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Phone Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#011816] border border-amber-400/40 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-100 placeholder-emerald-200/50 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#011816] border border-amber-400/40 rounded-xl pl-10 pr-10 py-3 text-sm text-amber-100 placeholder-emerald-200/50 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-400 hover:text-amber-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password if Register */}
          {authModalTab === 'register' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#011816] border border-amber-400/40 rounded-xl pl-10 pr-10 py-3 text-sm text-amber-100 placeholder-emerald-200/50 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          )}

          {/* Register Checkboxes - Matching Screenshot 1 */}
          {authModalTab === 'register' ? (
            <div className="space-y-2 text-xs text-emerald-100/90 pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={is18Plus}
                  onChange={(e) => setIs18Plus(e.target.checked)}
                  className="mt-0.5 rounded border-amber-400 text-amber-500 focus:ring-0 bg-[#011816]"
                />
                <span>I am over 18 years of age and have read and accepted Terms & Conditions, Privacy Policy & Betting Rules as published on the site.</span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantOffers}
                  onChange={(e) => setWantOffers(e.target.checked)}
                  className="mt-0.5 rounded border-amber-400 text-amber-500 focus:ring-0 bg-[#011816]"
                />
                <span>I would like to receive details of special offers, free bets and other promotions.</span>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-emerald-200 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-amber-400 bg-[#011816]" />
                <span>Remember</span>
              </label>
              <button type="button" className="text-amber-300 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gold-button font-black text-slate-950 py-3 rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all text-sm mt-2"
          >
            {authModalTab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Social Connect Options - Matching Screenshots 1 & 2 */}
        <div className="mt-6 pt-4 border-t border-amber-400/20 text-center">
          <p className="text-xs text-emerald-200/70 mb-3">Or Connect With</p>
          <div className="flex justify-center gap-4">
            {/* Facebook */}
            <button
              onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform shadow-md"
            >
              f
            </button>
            {/* Google */}
            <button
              onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
              className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center font-black text-lg hover:scale-110 transition-transform shadow-md"
            >
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
