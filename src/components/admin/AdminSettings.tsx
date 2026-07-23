import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, ShieldCheck, Check } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#D4AF37]/20 pb-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#FFD700]" />
          <span>পেমেন্ট ও সিস্টেম কনফিগারেশন (System Control Settings)</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          বিকাশ, নগদ এজেন্ট নম্বর, সর্বনিম্ন/সর্বোচ্চ ডিপোজিট ও বোনাস পার্সেন্টেজ আপডেট করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0f0f0f] border border-[#D4AF37]/30 p-6 rounded-2xl shadow-2xl space-y-6">
        {/* Agent Numbers */}
        <div>
          <h3 className="text-sm font-bold text-[#FFD700] mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>মোবাইল ব্যাংকিং এজেন্ট নম্বরসমূহ (Agent Cash In Numbers)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                bKash এজেন্ট নম্বর:
              </label>
              <input
                type="text"
                value={form.bkashAgentNumber}
                onChange={(e) => setForm({ ...form, bkashAgentNumber: e.target.value })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Nagad এজেন্ট নম্বর:
              </label>
              <input
                type="text"
                value={form.nagadAgentNumber}
                onChange={(e) => setForm({ ...form, nagadAgentNumber: e.target.value })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Rocket এজেন্ট নম্বর:
              </label>
              <input
                type="text"
                value={form.rocketAgentNumber}
                onChange={(e) => setForm({ ...form, rocketAgentNumber: e.target.value })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Upay এজেন্ট নম্বর:
              </label>
              <input
                type="text"
                value={form.upayAgentNumber}
                onChange={(e) => setForm({ ...form, upayAgentNumber: e.target.value })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>
        </div>

        {/* Deposit/Withdraw Limits & Bonus */}
        <div className="border-t border-white/10 pt-5">
          <h3 className="text-sm font-bold text-[#00BFFF] mb-3">
            ডিপোজিট ও উত্তোলন সীমা এবং বোনাস পার্সেন্টেজ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                সর্বনিম্ন ডিপোজিট (৳):
              </label>
              <input
                type="number"
                value={form.minDeposit}
                onChange={(e) => setForm({ ...form, minDeposit: Number(e.target.value) })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                সর্বনিম্ন উত্তোলন (৳):
              </label>
              <input
                type="number"
                value={form.minWithdraw}
                onChange={(e) => setForm({ ...form, minWithdraw: Number(e.target.value) })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ডিপোজিট বোনাস (%):
              </label>
              <input
                type="number"
                value={form.depositBonusPercent}
                onChange={(e) => setForm({ ...form, depositBonusPercent: Number(e.target.value) })}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#00BFFF]"
              />
            </div>
          </div>
        </div>

        {/* Support & Site Settings */}
        <div className="border-t border-white/10 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              সাইট নাম (Portal Name):
            </label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              কাস্টমার সাপোর্ট ফোন/হোয়াটসঅ্যাপ:
            </label>
            <input
              type="text"
              value={form.supportPhone}
              onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FFD700]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gold-button font-black text-slate-950 py-3 rounded-xl hover:brightness-110 active:scale-98 transition-all text-xs flex items-center justify-center gap-2 shadow-xl"
          >
            {saved ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'সেটিং সফলভাবে সংরক্ষিত হয়েছে!' : 'সেটিংস সেভ করুন (Save System Settings)'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
