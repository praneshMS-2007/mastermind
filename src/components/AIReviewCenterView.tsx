import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ThumbsUp,
  BarChart,
  Zap,
} from 'lucide-react';
import { BrandSettings, PostItem } from '../types';

interface AIReviewCenterViewProps {
  brandSettings: BrandSettings;
  postsInReview: PostItem[];
  onApprovePost: (postId: string) => void;
}

export const AIReviewCenterView: React.FC<AIReviewCenterViewProps> = ({
  brandSettings,
  postsInReview,
  onApprovePost,
}) => {
  const [contentToReview, setContentToReview] = useState(
    postsInReview.length > 0
      ? postsInReview[0].content
      : `🚀 Turning 1 Hour of Marketing Planning Into 30 Days of Content.\n\nMost founders struggle with content volume because they rely on manual research and inconsistent writing.\n\nHere is how MarketMind AI fixes it:\n1. Live Competitor SWOT Research\n2. 100% Brand Voice Consistency\n3. Instant Multi-Platform Publishing\n\nClaim your workspace demo today!`
  );

  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>({
    overallScore: 94,
    brandVoiceCompliance: 96,
    readabilityGrade: 'Grade 8 (Easy to scan)',
    grammarCheck: {
      errorsFound: 0,
      status: 'Clean & Pristine',
    },
    toneAnalysis: `${brandSettings.tone}, confident, and value-driven`,
    duplicateRisk: 'Low (0.8% similarity across web)',
    improvements: [
      'Consider adding a specific question at the end to boost comments and organic reach.',
      'Forbidden words check passed: No prohibited terms detected.',
    ],
  });

  const handleRunReview = async () => {
    setIsReviewing(true);

    try {
      const res = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentToReview,
          targetChannel: 'General Social',
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      setReviewResult(data);
    } catch (e) {
      console.error('Review failed:', e);
    } finally {
      setIsReviewing(false);
    }
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
                <ShieldCheck className="w-3.5 h-3.5" /> AI Quality & Brand Compliance Review
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                Agent: Brand Voice Compliance (ACTIVE)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Brand Voice, Grammar & Quality Inspection</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ensure 100% compliance with <span className="text-purple-300 font-semibold">{brandSettings.brandName}</span> guidelines, check readability, and auto-detect tone deviations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input text */}
        <div className="lg:col-span-6 space-y-6">
          {postsInReview.length > 0 && (
            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-4 space-y-2.5">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Posts Pending Review:</span>
              <div className="space-y-2">
                {postsInReview.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setContentToReview(p.content)}
                    className="p-3 bg-[#070b14] border border-white/[0.06] rounded-xl cursor-pointer hover:border-purple-500/50 flex items-center justify-between text-xs transition-all"
                  >
                    <div>
                      <span className="font-bold text-slate-200">{p.title}</span>
                      <span className="text-[10px] text-cyan-400 block uppercase font-mono mt-0.5">{p.channel}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprovePost(p.id);
                      }}
                      className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-lg text-[10px] font-semibold transition-all cursor-pointer font-mono"
                    >
                      Approve Post
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
              <FileText className="w-4 h-4 text-purple-400" /> Content Copy to Inspect
            </h3>

            <textarea
              rows={8}
              value={contentToReview}
              onChange={(e) => setContentToReview(e.target.value)}
              className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 leading-relaxed font-mono transition-all"
            />

            <button
              onClick={handleRunReview}
              disabled={isReviewing || !contentToReview.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
            >
              {isReviewing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Brand Compliance...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Run AI Quality Inspection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Score Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <BarChart className="w-4 h-4 text-cyan-400" /> AI Review Score Breakdown
              </h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                Score: {reviewResult.overallScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Brand Tone Match</span>
                <p className="text-lg font-bold text-purple-300 font-mono">{reviewResult.brandVoiceCompliance}%</p>
                <p className="text-[10px] text-slate-400">{reviewResult.toneAnalysis}</p>
              </div>

              <div className="p-3.5 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Readability Score</span>
                <p className="text-lg font-bold text-emerald-300 font-mono">{reviewResult.readabilityGrade}</p>
                <p className="text-[10px] text-slate-400">Optimal for mobile feed dwell time</p>
              </div>

              <div className="p-3.5 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Grammar Check</span>
                <p className="text-lg font-bold text-cyan-300 font-mono">{reviewResult.grammarCheck?.status || 'Pristine'}</p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {reviewResult.grammarCheck?.errorsFound || 0} Errors Detected
                </p>
              </div>

              <div className="p-3.5 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Plagiarism Risk</span>
                <p className="text-lg font-bold text-amber-300 font-mono">{reviewResult.duplicateRisk}</p>
                <p className="text-[10px] text-slate-400">Unique copy fingerprint</p>
              </div>
            </div>

            {/* Actionable Improvements */}
            <div className="pt-2 border-t border-white/[0.06] space-y-2.5">
              <span className="text-xs font-bold text-purple-300 block font-mono text-[11px] uppercase tracking-wider">AI Editorial Recommendations:</span>
              <div className="space-y-2">
                {reviewResult.improvements?.map((imp: string, i: number) => (
                  <div key={i} className="p-3 bg-[#070b14] border border-white/[0.06] rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
