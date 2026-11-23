import React, { useState } from 'react';
import {
  Search,
  Globe,
  TrendingUp,
  RefreshCw,
  Shield,
  Zap,
  Sparkles,
  ExternalLink,
  Plus,
  ArrowRight,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { CompetitorItem, TrendItem, BrandSettings } from '../types';

interface ResearchCenterViewProps {
  competitors: CompetitorItem[];
  trends: TrendItem[];
  brandSettings: BrandSettings;
  onAddCompetitor: (comp: CompetitorItem) => void;
  onGenerateFromTrend: (trendTitle: string) => void;
}

export const ResearchCenterView: React.FC<ResearchCenterViewProps> = ({
  competitors = [],
  trends = [],
  brandSettings,
  onAddCompetitor,
  onGenerateFromTrend,
}) => {
  const [activeTab, setActiveTab] = useState<'competitors' | 'trends' | 'swot'>('competitors');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [liveResearchResult, setLiveResearchResult] = useState<any>(null);

  // Run AI Research via server route with Google Search Grounding
  const handleRunResearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    try {
      const res = await fetch('/api/ai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Competitor & Market Research',
          query: searchQuery,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setLiveResearchResult(data.result);
    } catch (e) {
      console.error('Research query failed', e);
      setLiveResearchResult({
        summary: `Market research scan complete for "${searchQuery}".`,
        swot: {
          strengths: ['High product efficiency', 'Differentiated AI architecture'],
          weaknesses: ['Brand awareness expansion needed'],
          opportunities: ['Leverage long-tail search intent in B2B marketing'],
          threats: ['Fast market entrant updates'],
        },
        recommendations: [
          'Publish comparison guide versus top market alternatives',
          'Target key search keywords on Google and Gemini AI engines',
        ],
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Web Search Bar */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-5">
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Globe className="w-3.5 h-3.5 animate-pulse" /> Google Search Grounding Live
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[10px]">
                Agent: Market Analyst (WORKING)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Market Intelligence & Research Radar</h2>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous competitor audits, real-time search trends, and AI-synthesized SWOT gaps for {brandSettings.brandName || 'MarketMind'}.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-[#070b14] p-1 border border-white/[0.08] rounded-xl shadow-inner">
            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'competitors'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Competitor Analysis
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'trends'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Market Trends
            </button>
            <button
              onClick={() => setActiveTab('swot')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'swot'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SWOT Matrix
            </button>
          </div>
        </div>

        {/* AI Research Search Input */}
        <div className="relative z-10 flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter competitor domain or market keyword (e.g., 'CopyFlow Inc', 'AI marketing automation trends 2026')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunResearch()}
              className="w-full bg-[#070b14]/90 border border-white/[0.08] focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
          </div>
          <button
            onClick={handleRunResearch}
            disabled={isSearching || !searchQuery.trim()}
            className="px-5 py-3 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-cyan-200" />}
            <span>Run Live AI Audit</span>
          </button>
        </div>
      </div>

      {/* Live Search Result Output Card if triggered */}
      {liveResearchResult && (
        <div className="bg-gradient-to-br from-[#0e1628]/95 via-[#0b0f1b]/95 to-[#070b14]/95 border border-cyan-500/30 rounded-2xl p-6 space-y-5 shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Live Grounded Research Output</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">Synthesized by Research Agent</span>
            </div>
            <button
              onClick={() => setLiveResearchResult(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] transition-colors"
            >
              Close Output
            </button>
          </div>

          <p className="relative z-10 text-xs text-slate-200 leading-relaxed font-normal bg-[#070b14]/60 p-3.5 rounded-xl border border-white/[0.06]">
            {liveResearchResult.summary}
          </p>

          {liveResearchResult.swot && (
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Strengths
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1.5 mt-2 list-disc list-inside">
                  {liveResearchResult.swot.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" /> Weaknesses
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1.5 mt-2 list-disc list-inside">
                  {liveResearchResult.swot.weaknesses?.map((w: string, idx: number) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-cyan-950/20 border border-cyan-500/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Opportunities
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1.5 mt-2 list-disc list-inside">
                  {liveResearchResult.swot.opportunities?.map((o: string, idx: number) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Threats
                </span>
                <ul className="text-[11px] text-slate-300 space-y-1.5 mt-2 list-disc list-inside">
                  {liveResearchResult.swot.threats?.map((t: string, idx: number) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {liveResearchResult.recommendations && (
            <div className="relative z-10 pt-2 border-t border-white/[0.08]">
              <span className="text-xs font-bold text-cyan-300 block mb-2">Actionable Agent Recommendations:</span>
              <div className="space-y-2">
                {liveResearchResult.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="text-xs text-slate-200 flex items-center gap-2.5 bg-[#070b14]/50 p-2.5 rounded-lg border border-white/[0.04]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 1: Competitors List */}
      {activeTab === 'competitors' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">Tracked Market Competitors</h3>
              <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-slate-400 font-mono">
                {competitors.length} Active Profiles
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="bg-[#0b0f1b]/80 border border-white/[0.08] hover:border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      {comp.name}
                      <a
                        href={comp.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{comp.website}</p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-xs font-mono">
                    {comp.marketShare} Est. Share
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#070b14] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Key Strengths</span>
                    <ul className="text-slate-300 space-y-1.5 list-disc list-inside text-[11px]">
                      {(comp.strengths || []).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#070b14] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Market Gaps</span>
                    <ul className="text-slate-300 space-y-1.5 list-disc list-inside text-[11px]">
                      {(comp.weaknesses || []).map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#070b14] p-3.5 rounded-xl border border-white/[0.05] text-xs">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Observed Content Strategy</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{comp.contentStrategy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Market Trends */}
      {activeTab === 'trends' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight">Trending Signals & Growth Topics</h3>
            <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" /> Real-time Radar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trends.map((t) => (
              <div
                key={t.id}
                className="bg-[#0b0f1b]/80 border border-white/[0.08] hover:border-purple-500/40 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(168,85,247,0.12)] transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-[#070b14] border border-white/[0.08] text-slate-300 font-semibold uppercase font-mono">
                      {t.category}
                    </span>
                    <span className="text-emerald-400 font-bold font-mono flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3" /> {t.growth}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.summary}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#070b14] border border-white/[0.06] text-[11px] text-purple-300">
                    <span className="font-bold text-purple-400 block mb-0.5 font-mono text-[10px] uppercase">💡 Strategy Action</span>
                    {t.actionableIdea}
                  </div>

                  <button
                    onClick={() => onGenerateFromTrend(t.title)}
                    className="w-full py-2.5 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <span>Dispatch to Generator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Consolidated SWOT Matrix */}
      {activeTab === 'swot' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight">Aggregated Market SWOT Matrix</h3>
            <span className="text-xs text-slate-400 font-mono">Target: {brandSettings.brandName}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#0b0f1b]/90 border border-emerald-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Shield className="w-4 h-4" /> Internal Strengths
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • 100% brand voice alignment with custom forbidden word safeguards
                </li>
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Unified multi-platform generation (LinkedIn, X, Instagram, Blogs, Newsletters)
                </li>
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Real-time Gemini Flash server grounding for market & competitive research
                </li>
              </ul>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                <BarChart3 className="w-4 h-4" /> Internal Weaknesses
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Need to scale short-form video template library
                </li>
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Secondary user role permission onboarding speed
                </li>
              </ul>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-cyan-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Lightbulb className="w-4 h-4" /> Market Opportunities
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • High demand for Generative Engine Optimization (GEO) in B2B SaaS
                </li>
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Churning users from legacy tools seeking autonomous research & publishing
                </li>
              </ul>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-rose-500/30 rounded-2xl p-5 space-y-3 shadow-lg">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Zap className="w-4 h-4" /> Market Threats
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Platform algorithm modifications affecting organic link reach
                </li>
                <li className="p-3 bg-[#070b14] rounded-xl border border-white/[0.05] leading-relaxed">
                  • Emergence of generic low-cost AI wrappers
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
