import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Building2,
  Hash,
  AlertOctagon,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Copy,
  Check,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface BrandSettingsViewProps {
  brandSettings: BrandSettings;
  onSaveBrandSettings: (settings: BrandSettings) => void;
}

export const BrandSettingsView: React.FC<BrandSettingsViewProps> = ({
  brandSettings,
  onSaveBrandSettings,
}) => {
  const [formData, setFormData] = useState<BrandSettings>(brandSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const brandAssets = [
    {
      title: 'Primary Logo (Horizontal)',
      subtitle: 'Official Shuroq logo with "TECH REDEFINED" tagline',
      url: '/shuroq-logo.svg',
      preview: (
        <div className="bg-white p-4 rounded-xl border border-slate-700 flex items-center justify-center h-24">
          <img src="/shuroq-logo.svg" alt="Shuroq Primary Logo" className="h-12 object-contain" />
        </div>
      ),
    },
    {
      title: 'App Icon Badge',
      subtitle: 'Circuit rising sun emblem app icon badge',
      url: '/shuroq-icon.svg',
      preview: (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center h-24">
          <img src="/shuroq-icon.svg" alt="Shuroq App Icon" className="h-16 w-16 object-contain" />
        </div>
      ),
    },
    {
      title: 'Corporate Hero Banner',
      subtitle: 'Services suite showcase banner with 5 core pillars',
      url: '/shuroq-banner.svg',
      preview: (
        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-center h-24 overflow-hidden">
          <img src="/shuroq-banner.svg" alt="Shuroq Corporate Banner" className="w-full h-full object-cover rounded-lg" />
        </div>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBrandSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              Brand Identity Guardrails
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px]">
              Active Grounding Profile
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Brand Voice Guidelines & Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Define target personas, tone rules, forbidden terminology, and core value propositions for AI generation.
          </p>
        </div>

        {savedSuccess && (
          <span className="relative z-10 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Official Brand Logos & Media Assets */}
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <ImageIcon className="w-4 h-4 text-cyan-400" /> Official Brand Assets & Vector Logos
            </h3>
            <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">
              3 High-Res Assets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brandAssets.map((asset, idx) => (
              <div key={idx} className="bg-[#070b14] border border-white/[0.06] hover:border-purple-500/30 rounded-xl p-4 space-y-3 flex flex-col justify-between transition-all">
                <div>
                  {asset.preview}
                  <h4 className="text-xs font-bold text-white mt-3">{asset.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{asset.subtitle}</p>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04] text-[11px]">
                  <code className="text-slate-400 text-[10px] font-mono truncate max-w-[120px]">{asset.url}</code>
                  <button
                    type="button"
                    onClick={() => handleCopyPath(asset.url)}
                    className="px-2.5 py-1 bg-[#0b0f1b] hover:bg-white/[0.06] border border-white/[0.08] rounded-lg text-slate-300 flex items-center gap-1 font-mono text-[10px] transition-colors cursor-pointer"
                  >
                    {copiedPath === asset.url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Building2 className="w-4 h-4 text-purple-400" /> Core Brand Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Brand Name</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Industry / Vertical</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Core Value Proposition</label>
              <textarea
                rows={2}
                value={formData.valueProposition}
                onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none leading-relaxed transition-all"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Target Audience Persona</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tone & Guardrails */}
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Sparkles className="w-4 h-4 text-purple-400" /> Tone & Quality Safeguards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Primary Tone of Voice</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              >
                <option value="Professional">Professional & Authoritative</option>
                <option value="Bold & Witty">Bold & Witty</option>
                <option value="Friendly & Warm">Friendly & Warm</option>
                <option value="Tech-Savvy">Tech-Savvy & Concise</option>
                <option value="Casual">Casual Conversational</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Forbidden Terminology (Comma Separated)</label>
              <input
                type="text"
                value={formData.forbiddenWords.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    forbiddenWords: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Default Brand Hashtags (Comma Separated)</label>
              <input
                type="text"
                value={formData.defaultHashtags.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    defaultHashtags: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer font-mono"
          >
            <Save className="w-4 h-4" />
            <span>Save Brand Guidelines</span>
          </button>
        </div>
      </form>
    </div>
  );
};
