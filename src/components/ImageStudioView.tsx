import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Layers,
  Layout,
  RefreshCw,
  Download,
  Copy,
  Check,
  Palette,
  FileImage,
  Sliders,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface ImageStudioViewProps {
  brandSettings: BrandSettings;
}

export const ImageStudioView: React.FC<ImageStudioViewProps> = ({ brandSettings }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Modern Minimalist Gradient');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80'
  );
  const [expandedPrompt, setExpandedPrompt] = useState<string>('');
  const [carouselSlides, setCarouselSlides] = useState<any[]>([
    { slide: 1, headline: 'The Old Way vs The AI Way', subtext: 'Why traditional content marketing is breaking down in 2026.' },
    { slide: 2, headline: '80% Creation Time Saved', subtext: 'Automate research, drafting, and scheduling in one command.' },
    { slide: 3, headline: '100% Brand Consistency', subtext: 'Enforce tone guidelines across LinkedIn, X, and Instagram.' },
    { slide: 4, headline: 'Ready to Automate?', subtext: 'Try MarketMind AI workspace today.' },
  ]);

  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const shuroqTemplates = [
    { title: 'Shuroq Corporate Banner', url: '/shuroq-banner.svg', ratio: '16:9' },
    { title: 'Shuroq Primary Horizontal Logo', url: '/shuroq-logo.svg', ratio: '3:1' },
    { title: 'Shuroq App Icon Emblem', url: '/shuroq-icon.svg', ratio: '1:1' },
  ];

  const handleGenerateImageStudio = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/image-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
          brandInfo: brandSettings,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      }
      if (data.expandedPrompt) {
        setExpandedPrompt(data.expandedPrompt);
      }
      if (data.carouselSlides) {
        setCarouselSlides(data.carouselSlides);
      }
    } catch (e) {
      console.error('Image Studio failed:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPromptText = () => {
    if (!expandedPrompt) return;
    navigator.clipboard.writeText(expandedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
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
                <ImageIcon className="w-3.5 h-3.5" /> AI Visual & Asset Studio
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                Agent: Creative Designer (ACTIVE)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Design Banners, Carousels & Visual Assets</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate AI image prompts, visual slide carousels, and social media banners aligned with <span className="text-purple-300 font-semibold">{brandSettings.brandName}</span>'s aesthetic.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
              <Palette className="w-4 h-4 text-purple-400" /> Image Studio Parameters
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Concept / Prompt Idea</label>
              <textarea
                rows={3}
                placeholder="e.g. Modern B2B SaaS dashboard UI preview with sleek neon gradient highlights and growth metrics..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 font-mono transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Visual Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono transition-all"
              >
                <option value="Modern Minimalist Gradient">Modern Minimalist Gradient</option>
                <option value="3D Vector Glassmorphism">3D Vector Glassmorphism</option>
                <option value="SaaS UI Mockup">SaaS Product UI Mockup</option>
                <option value="Editorial Cyberpunk Dark">Editorial Cyberpunk Dark</option>
                <option value="Infographic Typography Card">Infographic Typography Card</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 font-mono text-[11px] uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {['16:9', '1:1', '4:5'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 rounded-xl text-xs font-semibold border font-mono transition-all cursor-pointer ${
                      aspectRatio === ratio
                        ? 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'bg-[#070b14] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateImageStudio}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Visual Assets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Generate Visual Package</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Showcase */}
        <div className="lg:col-span-7 space-y-6">
          {/* Official Shuroq Brand Asset Presets */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <Palette className="w-4 h-4 text-cyan-400" /> Official Brand Asset Presets
              </h3>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">
                Vector Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shuroqTemplates.map((tpl, i) => (
                <div
                  key={i}
                  onClick={() => setResultImage(tpl.url)}
                  className="p-3 bg-[#070b14] border border-white/[0.06] hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all space-y-2 group"
                >
                  <div className="h-20 bg-[#0b0f1b] rounded-lg overflow-hidden flex items-center justify-center p-2 border border-white/[0.04]">
                    <img src={tpl.url} alt={tpl.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">{tpl.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-white/[0.05] text-slate-400 rounded font-mono shrink-0">{tpl.ratio}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Banner Preview */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <FileImage className="w-4 h-4 text-purple-400" /> Generated Social Banner
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{aspectRatio} Ratio</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-[#070b14] border border-white/[0.06] flex items-center justify-center min-h-[260px] group">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Generated marketing banner"
                  className="w-full h-auto max-h-[360px] object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="text-center p-8 text-slate-500 text-xs font-mono">No image generated yet.</div>
              )}
            </div>

            {expandedPrompt && (
              <div className="p-3.5 rounded-xl bg-[#070b14] border border-white/[0.06] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 text-[10px] uppercase font-mono">Expanded AI Image Prompt</span>
                  <button
                    onClick={copyPromptText}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] font-mono leading-relaxed">{expandedPrompt}</p>
              </div>
            )}
          </div>

          {/* Carousel Slide Builder Preview */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                <Layers className="w-4 h-4 text-cyan-400" /> Multi-Slide Carousel Deck
              </h3>
              <span className="text-[10px] text-cyan-400 font-mono">{carouselSlides.length} Slides Ready</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {carouselSlides.map((slide, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#070b14] border border-white/[0.06] rounded-xl space-y-2 flex flex-col justify-between hover:border-purple-500/40 transition-all"
                >
                  <div className="space-y-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center justify-center font-mono border border-purple-500/30">
                      {slide.slide || i + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2">{slide.headline}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">{slide.subtext}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono font-medium pt-1.5 border-t border-white/[0.04]">
                    Slide {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
