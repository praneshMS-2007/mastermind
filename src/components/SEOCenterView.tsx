import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Sparkles,
  RefreshCw,
  Hash,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface SEOCenterViewProps {
  brandSettings: BrandSettings;
  onGeneratePostFromKeyword: (kw: string) => void;
}

export const SEOCenterView: React.FC<SEOCenterViewProps> = ({
  brandSettings,
  onGeneratePostFromKeyword,
}) => {
  const [topic, setTopic] = useState('');
  const [contentToOptimize, setContentToOptimize] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [seoResult, setSeoResult] = useState<any>({
    keywords: [
      { keyword: 'ai marketing automation platform', volume: '22.4K/mo', difficulty: 'Medium (42)', intent: 'Commercial' },
      { keyword: 'automated social media content planner', volume: '14.8K/mo', difficulty: 'Low (28)', intent: 'Commercial' },
      { keyword: 'generative engine optimization strategy', volume: '31.1K/mo', difficulty: 'High (68)', intent: 'Informational' },
      { keyword: 'b2b brand voice compliance software', volume: '8.2K/mo', difficulty: 'Low (19)', intent: 'Transactional' },
    ],
    hashtags: ['#MarketingAI', '#GrowthHacking', '#ContentStrategy', '#B2BGrowth', '#SaaS'],
    meta: {
      title: `${brandSettings.brandName} - AI Marketing & Content Automation Workspace`,
      description: `Automate research, content planning, multi-channel post generation, and SEO optimization in one intelligent workspace with ${brandSettings.brandName}.`,
    },
    optimizationScore: 92,
    suggestions: [
      "Include primary keyword 'ai marketing automation platform' in the first 100 words.",
      "Add 2 internal links to your features breakdown and pricing page.",
      "Ensure H2 and H3 subheadings incorporate search intent questions.",
    ],
  });

  const [copiedMeta, setCopiedMeta] = useState(false);

  const handleRunSeoAnalysis = async () => {
    setIsSearching(true);

    try {
      const res = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywordOrTopic: topic || brandSettings.industry,
          contentToOptimize,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setSeoResult(data);
    } catch (e) {
      console.error('SEO analysis failed:', e);
    } finally {
      setIsSearching(false);
    }
  };

  const copyMetaText = () => {
    const fullMeta = `Meta Title: ${seoResult.meta?.title}\nMeta Description: ${seoResult.meta?.description}`;
    navigator.clipboard.writeText(fullMeta);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <TrendingUp className="w-3.5 h-3.5" /> SEO & Generative Search Center
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                GEO Optimization Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Keyword Discovery & Content Optimization</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Discover high-intent target keywords, trending hashtags, and optimized meta tags for <span className="text-purple-300 font-semibold">{brandSettings.brandName}</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
              <Search className="w-4 h-4 text-purple-400" /> SEO Query & Content Optimizer
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Target Keyword or Industry Niche</label>
              <input
                type="text"
                placeholder="e.g. AI marketing automation, B2B SaaS content strategy..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 font-mono transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Content Snippet to Audit (Optional)</label>
              <textarea
                rows={4}
                placeholder="Paste blog draft or page content here to calculate SEO optimization score..."
                value={contentToOptimize}
                onChange={(e) => setContentToOptimize(e.target.value)}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all leading-relaxed"
              />
            </div>

            <button
              onClick={handleRunSeoAnalysis}
              disabled={isSearching}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Search Engines...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Analyze SEO & Keywords</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-6">
          {/* Keyword Table */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <Zap className="w-4 h-4 text-cyan-400" /> Discovered High-Intent Keywords
              </h3>
              <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-[#070b14] border border-white/[0.06]">
                {seoResult.keywords?.length || 0} Suggestions
              </span>
            </div>

            <div className="space-y-2.5">
              {seoResult.keywords?.map((kw: any, i: number) => (
                <div
                  key={i}
                  className="p-3.5 bg-[#070b14] border border-white/[0.06] hover:border-purple-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs transition-all"
                >
                  <div>
                    <span className="font-bold text-slate-100 font-mono">{kw.keyword}</span>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                      <span className="text-cyan-400">Vol: {kw.volume}</span>
                      <span>• Diff: {kw.difficulty}</span>
                      <span className="text-purple-400 font-medium">• Intent: {kw.intent}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onGeneratePostFromKeyword(kw.keyword)}
                    className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-600 border border-purple-500/30 text-purple-300 hover:text-white rounded-lg text-[10px] font-semibold transition-all cursor-pointer font-mono"
                  >
                    + Generate Post
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Meta Tags & Score */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <FileCode className="w-4 h-4 text-purple-400" /> Meta Title & Description
              </h3>

              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                  Score: {seoResult.optimizationScore}/100
                </span>
                <button
                  onClick={copyMetaText}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#070b14] border border-white/[0.06] transition-colors cursor-pointer"
                >
                  {copiedMeta ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedMeta ? 'Copied' : 'Copy Meta'}</span>
                </button>
              </div>
            </div>

            {seoResult.meta && (
              <div className="p-4 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider font-mono">Meta Title:</span>
                  <p className="text-slate-100 font-semibold mt-0.5">{seoResult.meta.title}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono">Meta Description:</span>
                  <p className="text-slate-300 leading-relaxed mt-0.5">{seoResult.meta.description}</p>
                </div>
              </div>
            )}

            {/* Trending Hashtags */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
                <Hash className="w-3.5 h-3.5 text-purple-400" /> Trending Hashtags:
              </span>
              <div className="flex flex-wrap gap-2">
                {seoResult.hashtags?.map((tag: string, tIdx: number) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-[#070b14] border border-purple-500/20 text-purple-300 text-[11px] font-mono hover:border-purple-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
