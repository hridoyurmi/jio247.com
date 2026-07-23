import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { Copy, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const DepositModal: React.FC = () => {
  const { 
    isDepositModalOpen, 
    setIsDepositModalOpen, 
    settings, 
    submitDeposit 
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bKash');
  const [amount, setAmount] = useState<number>(500);
  const [senderAccount, setSenderAccount] = useState('');
  const [txnId, setTxnId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (!isDepositModalOpen) return null;

  const getAgentNumber = () => {
    switch (selectedMethod) {
      case 'bKash': return settings.bkashAgentNumber;
      case 'Nagad': return settings.nagadAgentNumber;
      case 'Rocket': return settings.rocketAgentNumber;
      case 'Upay': return settings.upayAgentNumber;
      default: return settings.bkashAgentNumber;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAgentNumber());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < settings.minDeposit) {
      setError(`সর্বনিম্ন জমা ৳${settings.minDeposit}`);
      return;
    }
    if (!senderAccount || !txnId) {
      setError('নম্বর এবং ট্রানজেকশন আইডি (TxID) দিন');
      return;
    }

    setError('');
    submitDeposit(amount, selectedMethod, senderAccount, txnId);
    setSenderAccount('');
    setTxnId('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
      <div className="relative w-full max-w-lg bg-[#022320] border-2 border-amber-400 rounded-3xl p-5 shadow-2xl text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-400/30">
          <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
            <span>ইনস্ট্যান্ট জমা (Deposit)</span>
          </h3>
          <button
            onClick={() => setIsDepositModalOpen(false)}
            className="p-1 rounded-full bg-[#053b36] text-amber-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Method Selector Grid */}
        <div className="my-4">
          <label className="block text-xs font-bold text-amber-200 mb-2">
            পেমেন্ট পদ্ধতি নির্বাচন করুন (Select Method):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['bKash', 'Nagad', 'Rocket', 'Upay'] as PaymentMethod[]).map(method => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  selectedMethod === method
                    ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-105'
                    : 'bg-[#04332e] text-amber-100 border-amber-400/30 hover:border-amber-400'
                }`}
              >
                <span className="text-xs font-bold">{method}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Agent Number & Cash Out Instructions */}
        <div className="bg-[#011816] p-4 rounded-2xl border border-amber-400/40 mb-4">
          <div className="flex items-center justify-between text-xs text-emerald-200 mb-1">
            <span>{selectedMethod} এজেন্ট ক্যাশ-ইন নম্বর:</span>
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
              ক্যাশ ইন (Cash In)
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#042d29] p-3 rounded-xl border border-amber-400/30">
            <span className="text-lg font-mono font-black text-amber-300 tracking-wider">
              {getAgentNumber()}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg hover:brightness-110 active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
          </div>

          <p className="text-[11px] text-emerald-200/80 mt-2 leading-relaxed">
            * উপরিউক্ত নম্বরে ক্যাশ ইন করার পর প্রাপ্ত ট্রানজেকশন আইডি (TxID) নিচে দিন। ১০% ডিপোজিট বোনাস স্বয়ংক্রিয়ভাবে যোগ হবে!
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="bg-red-900/60 border border-red-500 text-red-200 text-xs p-2 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Quick Amount Selector */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1.5">
              জমার পরিমাণ (Amount ৳):
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[500, 1000, 2000, 5000].map(amt => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    amount === amt
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-[#04332e] text-amber-200 border-amber-400/30'
                  }`}
                >
                  ৳{amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="পরিমাণ লিখুন"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#011816] border border-amber-400/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 font-bold focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Sender Account */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1">
              আপনার {selectedMethod} নম্বর (Sender Number):
            </label>
            <input
              type="text"
              placeholder="017XXXXXXXX"
              value={senderAccount}
              onChange={(e) => setSenderAccount(e.target.value)}
              className="w-full bg-[#011816] border border-amber-400/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 font-bold focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1">
              ট্রানজেকশন আইডি (TxID):
            </label>
            <input
              type="text"
              placeholder="যেমন: BK9X8229A1"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              className="w-full bg-[#011816] border border-amber-400/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 font-mono font-bold focus:outline-none focus:border-amber-400 uppercase"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full bg-gold-button font-black text-slate-950 py-3 rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all text-sm mt-2"
          >
            ডিপোজিট সাবমিট করুন (Submit Deposit)
          </button>
        </form>
      </div>
    </div>
  );
};
