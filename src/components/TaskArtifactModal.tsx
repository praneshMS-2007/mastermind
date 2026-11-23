import React from 'react';
import { X, Copy, Check, FileText, Download, Sparkles, ExternalLink } from 'lucide-react';
import { AgentTask } from '../types/agentTypes';

interface TaskArtifactModalProps {
  task: AgentTask | null;
  onClose: () => void;
}

export const TaskArtifactModal: React.FC<TaskArtifactModalProps> = ({ task, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!task || !task.result) return null;

  const { result } = task;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${task.assigned_agent}-output-${task.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b101b] border border-white/[0.12] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#080d16]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {task.assigned_agent} Agent Deliverable
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {task.id}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 truncate max-w-xl">
                {task.objective}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Executive Deliverable Summary
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{result.summary}</p>
          </div>

          {/* Metrics Row (if any) */}
          {result.metrics && Object.keys(result.metrics).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(result.metrics).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-lg font-extrabold text-white mt-0.5 font-mono">{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Markdown Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Full Generated Artifact
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-white/[0.06]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Content'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-xs font-medium text-white transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .md
                </button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#070b13] border border-white/[0.08] text-slate-200 text-sm font-sans leading-relaxed whitespace-pre-wrap select-text selection:bg-indigo-500 selection:text-white font-mono text-[13px]">
              {result.content}
            </div>
          </div>

          {/* Suggested Next Steps */}
          {result.suggestedNextSteps && result.suggestedNextSteps.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06] space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agent Recommended Next Steps
              </span>
              <ul className="space-y-1.5">
                {result.suggestedNextSteps.map((step, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#080d16] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Completed at:{' '}
            <span className="text-slate-200">
              {task.completed_at ? new Date(task.completed_at).toLocaleTimeString() : 'Recently'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
