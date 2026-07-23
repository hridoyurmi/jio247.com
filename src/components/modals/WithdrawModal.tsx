import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { X, ArrowUpCircle } from 'lucide-react';

export const WithdrawModal: React.FC = () => {
  const { 
    isWithdrawModalOpen, 
    setIsWithdrawModalOpen, 
    currentUser, 
    settings, 
    submitWithdrawal 
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bKash');
  const [amount, setAmount] = useState<number>(1000);
  const [accountNumber, setAccountNumber] = useState(currentUser.phone);
  const [error, setError] = useState('');

  if (!isWithdrawModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = submitWithdrawal(amount, selectedMethod, accountNumber);
    if (!res.success) {
      setError(res.message);
    } else {
      alert('উত্তোলন অনুরোধ গ্রহণ করা হয়েছে! ১০ থেকে ৩০ মিনিটের মধ্যে আপনার পার্সোনাল ওয়ালেটে টাকা পৌঁছে যাবে।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
      <div className="relative w-full max-w-lg bg-[#022320] border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-400/30">
          <h3 className="text-lg font-black text-emerald-300 flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
            <span>টাকা উত্তোলন (Withdrawal)</span>
          </h3>
          <button
            onClick={() => setIsWithdrawModalOpen(false)}
            className="p-1 rounded-full bg-[#053b36] text-amber-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Chip */}
        <div className="my-3 bg-[#011816] p-3 rounded-2xl border border-emerald-400/30 flex justify-between items-center">
          <span className="text-xs text-emerald-200">উত্তোলনযোগ্য ব্যালেন্স:</span>
          <span className="text-lg font-black text-amber-300 font-mono">
            ৳ {currentUser.balance.toFixed(2)}
          </span>
        </div>

        {/* Payment Method Selector Grid */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-amber-200 mb-2">
            উত্তোলন মাধ্যম (Method):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['bKash', 'Nagad'] as PaymentMethod[]).map(method => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  selectedMethod === method
                    ? 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-md'
                    : 'bg-[#04332e] text-amber-100 border-amber-400/30 hover:border-amber-400'
                }`}
              >
                <span className="text-sm font-bold">{method} Personal</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2.5 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1">
              উত্তোলনের পরিমাণ (Amount ৳):
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[500, 1000, 2000].map(amt => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold border ${
                    amount === amt
                      ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                      : 'bg-[#04332e] text-amber-200 border-amber-400/30'
                  }`}
                >
                  ৳{amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#011816] border border-emerald-400/40 rounded-xl px-3.5 py-2.5 text-sm text-emerald-100 font-bold focus:outline-none focus:border-emerald-400"
            />
            <span className="text-[10px] text-emerald-200/70 mt-1 block">
              * সর্বনিম্ন উত্তোলন ৳{settings.minWithdraw}, সর্বোচ্চ ৳{settings.maxWithdraw}
            </span>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1">
              আপনার {selectedMethod} পার্সোনাল নম্বর:
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-[#011816] border border-emerald-400/40 rounded-xl px-3.5 py-2.5 text-sm text-emerald-100 font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 font-black text-slate-950 py-3 rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all text-sm mt-2"
          >
            উত্তোলন রিকোয়েস্ট পাঠান (Submit Withdrawal)
          </button>
        </form>
      </div>
    </div>
  );
};
