import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Terminal, History } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#D4AF37]/20 pb-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#00BFFF]" />
          <span>অডিট ও নিরাপত্তা লগ (System Audit Trail)</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          অ্যাডমিন অ্যাকশন, ব্যালেন্স পরিবর্তন ও সিকিউরিটি লগ
        </p>
      </div>

      <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#050505] border-b border-[#D4AF37]/20 flex items-center justify-between">
          <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4" />
            <span>সিকিউরিটি রেকর্ডস ({auditLogs.length})</span>
          </span>
          <span className="text-[10px] bg-[#00BFFF]/20 text-[#00BFFF] px-2.5 py-0.5 rounded border border-[#00BFFF]/30 font-mono">
            REALTIME AUDIT
          </span>
        </div>

        <div className="p-4 space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="bg-[#050505] p-3.5 rounded-xl border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00BFFF] mt-1.5 shrink-0 shadow-[0_0_6px_#00BFFF]" />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="text-[#00BFFF] uppercase">{log.action}</span>
                    <span className="text-[10px] text-gray-400 font-mono">by {log.adminName}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{log.details}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-gray-500 font-mono">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
