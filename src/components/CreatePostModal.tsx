import React, { useState } from 'react';
import { X, Sparkles, Calendar, Send, Layers, Image, CheckCircle2, Clock, Globe, ArrowRight } from 'lucide-react';
import { PostItem, PlatformChannel, PostStatus } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Partial<PostItem>) => void;
  initialData?: Partial<PostItem>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [channel, setChannel] = useState<PlatformChannel>(initialData?.channel || 'linkedin');
  const [content, setContent] = useState(initialData?.content || '');
  const [status, setStatus] = useState<PostStatus>(initialData?.status || 'scheduled');
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.scheduledAt || new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [mediaUrl, setMediaUrl] = useState(initialData?.mediaUrl || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      title,
      channel,
      content,
      status,
      scheduledAt: new Date(scheduledAt).toISOString(),
      author: 'Alex Rivera',
      mediaUrl: mediaUrl || undefined,
    });

    onClose();
  };

  const channelOptions: { value: PlatformChannel; label: string; icon: string; color: string }[] = [
    { value: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'text-blue-400' },
    { value: 'twitter', label: 'X / Twitter', icon: '𝕏', color: 'text-cyan-400' },
    { value: 'instagram', label: 'Instagram', icon: '📸', color: 'text-pink-400' },
    { value: 'facebook', label: 'Facebook', icon: '👥', color: 'text-indigo-400' },
    { value: 'blog', label: 'SEO Blog', icon: '📝', color: 'text-emerald-400' },
    { value: 'newsletter', label: 'Newsletter', icon: '📬', color: 'text-purple-400' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b0f1b]/95 border border-white/10 rounded-2xl max-w-xl w-full p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto backdrop-blur-xl custom-scrollbar">
        {/* Glow decorative gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                {initialData ? 'Edit Campaign Asset' : 'Dispatch New Campaign Asset'}
              </h3>
              <p className="text-[11px] text-slate-400">Autonomous Content & Publishing Pipeline</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs relative z-10">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center justify-between">
              <span>Post Title / Strategic Hook <span className="text-purple-400">*</span></span>
              <span className="text-[10px] text-slate-500 font-mono">CAMPAIGN-ID: #MKT-{Math.floor(1000 + Math.random() * 9000)}</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 AI Marketing Automations for B2B Founders"
              className="w-full bg-[#070a13] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Platform Channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as PlatformChannel)}
                className="w-full bg-[#070a13] border border-white/10 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-colors cursor-pointer"
              >
                {channelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0b0f1b] text-slate-200">
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Pipeline Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full bg-[#070a13] border border-white/10 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500/60 transition-colors cursor-pointer"
              >
                <option value="scheduled" className="bg-[#0b0f1b] text-slate-200">🕒 Scheduled Queue</option>
                <option value="in_review" className="bg-[#0b0f1b] text-slate-200">🔍 AI Review Pending</option>
                <option value="draft" className="bg-[#0b0f1b] text-slate-200">📝 Draft Mode</option>
                <option value="published" className="bg-[#0b0f1b] text-slate-200">⚡ Instant Publish</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Scheduled Deployment Time
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full bg-[#070a13] border border-white/10 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500/60 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-purple-400" />
                Featured Media Asset URL (Optional)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">PNG / JPG / WEBP</span>
            </label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-[#070a13] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium">
                Post Body Copy <span className="text-purple-400">*</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">
                {content.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Draft your autonomous post copy, hashtags, and CTA here..."
              className="w-full bg-[#070a13] border border-white/10 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 font-normal leading-relaxed text-xs resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Grounded in Active Brand Voice</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {initialData ? 'Save Changes' : 'Queue Deployment'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
