import React from 'react';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const BillingView: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              AI Quota & Infrastructure
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Subscription & Token Usage</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time Gemini token consumption, team seats, and plan tier limits.
          </p>
        </div>

        <span className="relative z-10 px-3.5 py-1.5 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full font-bold font-mono text-xs shadow-[0_0_15px_rgba(147,51,234,0.2)]">
          Growth Pro Plan ($79/mo)
        </span>
      </div>

      {/* Usage Meter */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center justify-between font-mono">
          <span>Monthly AI Generation Quota</span>
          <span className="text-xs text-slate-400 font-normal">Resets in 12 days</span>
        </h3>

        <div className="space-y-2.5">
          <div className="flex justify-between text-xs font-semibold text-slate-300 font-mono">
            <span>68,400 / 100,000 Credits Used</span>
            <span className="text-purple-400">68.4%</span>
          </div>
          <div className="w-full h-3 bg-[#070b14] rounded-full overflow-hidden border border-white/[0.06]">
            <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full w-[68.4%] shadow-[0_0_12px_rgba(147,51,234,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Posts Generated</span>
            <p className="text-xl font-bold text-white">428 Posts</p>
          </div>
          <div className="p-4 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Research Audits</span>
            <p className="text-xl font-bold text-cyan-300">92 Scans</p>
          </div>
          <div className="p-4 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Team Members</span>
            <p className="text-xl font-bold text-purple-300">3 / 5 Seats</p>
          </div>
        </div>
      </div>

      {/* Plans comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 hover:border-white/[0.15] transition-all">
          <h4 className="font-bold text-white text-base">Starter</h4>
          <p className="text-3xl font-bold text-white font-mono">$29 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2.5 pt-2 border-t border-white/[0.04]">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 20,000 AI Credits</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1 Team Seat</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Standard Generation</li>
          </ul>
        </div>

        <div className="bg-[#0b0f1b] border-2 border-purple-500/80 rounded-2xl p-6 space-y-4 relative shadow-[0_0_30px_rgba(147,51,234,0.2)]">
          <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-mono font-bold uppercase shadow-[0_0_12px_rgba(147,51,234,0.5)]">
            Active Plan
          </span>
          <h4 className="font-bold text-white text-base">Growth Pro</h4>
          <p className="text-3xl font-bold text-purple-300 font-mono">$79 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2.5 pt-2 border-t border-white/[0.06]">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 100,000 AI Credits</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 5 Team Seats + RBAC</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Google Search Grounding</li>
          </ul>
        </div>

        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 hover:border-white/[0.15] transition-all">
          <h4 className="font-bold text-white text-base">Enterprise</h4>
          <p className="text-3xl font-bold text-white font-mono">$249 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <ul className="text-xs text-slate-300 space-y-2.5 pt-2 border-t border-white/[0.04]">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Credits</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Team Seats</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Custom API Access</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
