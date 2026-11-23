import React from 'react';
import {
  FileText,
  Target,
  PieChart,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Play,
  Calendar,
} from 'lucide-react';
import { WeeklyBrief, BrandSettings } from '../types';

interface WeeklyBriefViewProps {
  weeklyBrief: WeeklyBrief;
  brandSettings: BrandSettings;
  onGenerateTopic: (topic: string) => void;
}

export const WeeklyBriefView: React.FC<WeeklyBriefViewProps> = ({
  weeklyBrief,
  brandSettings,
  onGenerateTopic,
}) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider">
              Autonomous Weekly Brief
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Marketing & Content Strategy Brief</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Period: <span className="text-slate-200 font-medium">{weeklyBrief.weekOf}</span>
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="px-4 py-2 bg-[#070b14] border border-white/[0.08] rounded-xl text-right">
            <p className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Active Brand</p>
            <p className="text-xs font-bold text-purple-300 font-mono">{brandSettings.brandName}</p>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-gradient-to-r from-purple-950/30 via-[#0b0f1b]/90 to-[#070b14] border border-purple-500/30 rounded-2xl p-5 space-y-2.5 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-purple-300 text-xs font-bold font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Executive AI Summary</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-normal bg-[#070b14]/50 p-3 rounded-xl border border-white/[0.04]">
          {weeklyBrief.summary}
        </p>
      </div>

      {/* Grid: Strategic Goals + Pillars & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Goals */}
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-tight font-mono">Top Priorities For The Week</h3>
          </div>

          <div className="space-y-2.5">
            {weeklyBrief.topGoals.map((goal, i) => (
              <div
                key={i}
                className="p-3.5 bg-[#070b14] border border-white/[0.06] rounded-xl flex items-start gap-3 hover:border-emerald-500/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-medium leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Pillars Distribution */}
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <PieChart className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recommended Pillar Allocation</h3>
          </div>

          <div className="space-y-3">
            {weeklyBrief.contentPillarsFocus.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 font-mono">
                  <span>{p}</span>
                </div>
                <div className="w-full h-2 bg-[#070b14] rounded-full overflow-hidden border border-white/[0.06]">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    style={{ width: `${i === 0 ? 40 : 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Competitor Alerts */}
          <div className="pt-2 border-t border-white/[0.06] space-y-2">
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
              <AlertTriangle className="w-3.5 h-3.5" /> Competitor Signals
            </span>
            {weeklyBrief.competitorAlerts.map((alt, idx) => (
              <p key={idx} className="text-xs text-slate-300 bg-[#070b14] border border-amber-500/20 p-3 rounded-xl leading-relaxed">
                {alt}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* High-Converting Topic Recommendations */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-tight font-mono">Recommended High-Intent Topics</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">1-Click Content Launch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyBrief.suggestedTopics.map((top, i) => (
            <div
              key={i}
              className="p-4 bg-[#070b14] border border-white/[0.06] hover:border-purple-500/40 rounded-xl flex flex-col justify-between space-y-3.5 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {top.platform}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">High Reach</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                  {top.topic}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{top.reasoning}</p>
              </div>

              <button
                onClick={() => onGenerateTopic(top.topic)}
                className="w-full py-2.5 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-mono shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Launch in Generator</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
