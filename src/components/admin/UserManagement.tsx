import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserCheck, ShieldCheck, Edit3, CheckCircle2, XCircle, Award } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { 
    users, 
    kycRequests, 
    updateUserBalance, 
    updateUserStatus, 
    updateUserVip,
    approveKYC,
    rejectKYC
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'kyc' | 'status'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editBalanceAmt, setEditBalanceAmt] = useState<number>(0);

  const filteredUsers = users.filter(u => 
    u.phone.includes(searchTerm) || u.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-white/10 gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-2 border-b-2 transition-all ${
            activeTab === 'all' ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          সকল ব্যবহারকারী (All Users) ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('kyc')}
          className={`pb-2 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'kyc' ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>KYC/ভেরিফিকেশন</span>
          {kycRequests.filter(k => k.status === 'pending').length > 0 && (
            <span className="bg-[#00BFFF]/20 text-[#00BFFF] text-[10px] px-2 py-0.5 rounded-full border border-[#00BFFF]/30">
              {kycRequests.filter(k => k.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`pb-2 border-b-2 transition-all ${
            activeTab === 'status' ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          অ্যাকাউন্ট স্ট্যাটাস (Account Status)
        </button>
      </div>

      {/* Tab 1: All Users */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#00BFFF] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="ফোন নম্বর বা ডাকনাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          {/* Users Table */}
          <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)]">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#050505] text-[#FFD700] font-bold uppercase text-[11px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">ব্যবহারকারী</th>
                  <th className="p-3">ব্যালেন্স (৳)</th>
                  <th className="p-3">VIP লেভেল</th>
                  <th className="p-3">KYC স্ট্যাটাস</th>
                  <th className="p-3">যোগদানের তারিখ</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 flex items-center gap-2">
                      <img src={user.avatar} className="w-8 h-8 rounded-full border border-[#D4AF37]/50" />
                      <div>
                        <p className="font-bold text-white">{user.phone}</p>
                        <p className="text-[10px] text-gray-400">{user.nickname}</p>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#FFD700]">
                      ৳ {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3">
                      <select
                        value={user.vipLevel}
                        onChange={(e) => updateUserVip(user.id, Number(e.target.value))}
                        className="bg-[#1a1a1a] border border-[#D4AF37]/40 rounded px-2 py-1 text-xs text-[#FFD700]"
                      >
                        {[0, 1, 2, 3, 4, 5].map(v => (
                          <option key={v} value={v}>VIP {v}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        user.isKycVerified ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-gray-800/60 text-gray-400 border-gray-700'
                      }`}>
                        {user.isKycVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400">{user.joinedDate}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user.id);
                          setEditBalanceAmt(user.balance);
                        }}
                        className="bg-gold-button text-slate-950 font-bold px-3 py-1 rounded hover:brightness-110 text-[11px]"
                      >
                        ব্যালেন্স এডিট
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: KYC */}
      {activeTab === 'kyc' && (
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] space-y-4">
          <h4 className="font-bold text-[#FFD700] text-base">KYC ভেরিফিকেশন রিকোয়েস্টসমূহ</h4>
          
          {kycRequests.length > 0 ? (
            <div className="space-y-3">
              {kycRequests.map(req => (
                <div key={req.id} className="bg-[#050505] p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">{req.userName} ({req.userPhone})</h5>
                    <p className="text-xs text-gray-400">NID নাম্বার: {req.nidNumber}</p>
                    <span className="text-[10px] text-gray-500">জমা দেওয়ার তারিখ: {req.submittedAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => approveKYC(req.id)}
                          className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs hover:brightness-110"
                        >
                          অনুমোদন (Approve)
                        </button>
                        <button
                          onClick={() => rejectKYC(req.id)}
                          className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-red-700"
                        >
                          বাতিল (Reject)
                        </button>
                      </>
                    ) : (
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        req.status === 'approved' ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-gray-400 py-6">কোনো পেন্ডিং KYC রিকোয়েস্ট নেই।</p>
          )}
        </div>
      )}

      {/* Tab 3: Account Status */}
      {activeTab === 'status' && (
        <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-[0_10px_30px_-15px_rgba(212,175,55,0.2)] space-y-4">
          <h4 className="font-bold text-[#FFD700] text-base">অ্যাকাউন্ট স্ট্যাটাস নিয়ন্ত্রণ (Account Status Management)</h4>

          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="bg-[#050505] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{u.phone} ({u.nickname})</p>
                  <p className="text-xs text-gray-400">বর্তমান স্ট্যাটাস: <span className="font-bold uppercase text-[#FFD700]">{u.status}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateUserStatus(u.id, 'active')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      u.status === 'active' ? 'bg-emerald-500 text-slate-950' : 'bg-[#1a1a1a] text-gray-300 border border-white/10'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => updateUserStatus(u.id, 'suspended')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      u.status === 'suspended' ? 'bg-amber-500 text-slate-950' : 'bg-[#1a1a1a] text-gray-300 border border-white/10'
                    }`}
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => updateUserStatus(u.id, 'frozen')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      u.status === 'frozen' ? 'bg-red-600 text-white' : 'bg-[#1a1a1a] text-gray-300 border border-white/10'
                    }`}
                  >
                    Freeze
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Balance Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border-2 border-[#FFD700] p-5 rounded-2xl w-full max-w-sm text-white shadow-2xl">
            <h4 className="text-[#FFD700] font-bold text-base mb-3">ব্যবহারকারীর ব্যালেন্স সংশোধন করুন</h4>
            <input
              type="number"
              value={editBalanceAmt}
              onChange={(e) => setEditBalanceAmt(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-sm font-bold font-mono text-[#FFD700] mb-4 focus:outline-none focus:border-[#FFD700]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
              >
                বাতিল (Cancel)
              </button>
              <button
                onClick={() => {
                  updateUserBalance(selectedUser, editBalanceAmt, 'Admin manual edit');
                  setSelectedUser(null);
                }}
                className="bg-gold-button font-bold text-slate-950 text-xs px-4 py-1.5 rounded-lg"
              >
                সেভ করুন (Save)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

