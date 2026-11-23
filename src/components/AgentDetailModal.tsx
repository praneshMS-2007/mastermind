import React, { useState } from 'react';
import {
  X,
  Cpu,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Activity,
  Zap,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AgentProfile, AgentTask } from '../types/agentTypes';
import { INITIAL_TOOLS } from '../../lib/tools/toolRegistry';

interface AgentDetailModalProps {
  agent: AgentProfile | null;
  tasks: AgentTask[];
  onClose: () => void;
  onViewArtifact?: (task: AgentTask) => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  tasks,
  onClose,
  onViewArtifact,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'logs' | 'capabilities'>('overview');

  if (!agent) return null;

  const agentTasks = tasks.filter((t) => t.assigned_agent === agent.id);
  const currentTask = agentTasks.find((t) => t.execution_status === 'running') || agentTasks[0];
  const allLogs = agentTasks.flatMap((t) => t.logs);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Running
          </span>
        );
      case 'waiting_for_approval':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Waiting for Approval
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Available
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b101b] border border-white/[0.12] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header Hero */}
        <div className="px-6 py-5 border-b border-white/[0.08] bg-gradient-to-r from-[#0d1424] via-[#090e1a] to-[#0d1424] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-slate-950 border border-white/20">
                <Cpu className="w-3 h-3 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white">{agent.name}</h2>
                {getStatusBadge(agent.status)}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{agent.role} • {agent.department}</p>
              <p className="text-[11px] text-indigo-300/90 italic mt-0.5">{agent.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-white/[0.08] bg-[#080d16] flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Overview & Current Task
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Task History ({agentTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Live Agent Logs ({allLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('capabilities')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'capabilities'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Tools & Capabilities
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Total Tasks Executed
                  </span>
                  <div className="text-xl font-extrabold text-white mt-1">{agent.totalTasksCompleted}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Execution Success Rate
                  </span>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1">{agent.successRate}%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Average Latency
                  </span>
                  <div className="text-xl font-extrabold text-cyan-400 mt-1">{agent.avgLatency}</div>
                </div>
              </div>

              {/* Current Active Task Card */}
              {currentTask ? (
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#0c1424] to-[#070b14] border border-indigo-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Current Task
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {currentTask.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    {getStatusBadge(currentTask.execution_status)}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{currentTask.objective}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentTask.description}</p>
                  </div>

                  {/* Subtasks Progress */}
                  {currentTask.subtasks && currentTask.subtasks.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Subtasks Checklist
                      </span>
                      <div className="space-y-1.5">
                        {currentTask.subtasks.map((st, i) => {
                          const isDone =
                            currentTask.execution_status === 'completed' ||
                            currentTask.completed_subtasks?.includes(st);
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-900/50 border border-white/[0.04]"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                              )}
                              <span className={isDone ? 'line-through text-slate-500' : 'text-slate-200'}>
                                {st}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Output Trigger */}
                  {currentTask.result && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onViewArtifact?.(currentTask)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Deliverable Artifact
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center rounded-xl bg-slate-900/30 border border-white/[0.06] text-slate-400 text-xs">
                  No active tasks currently assigned to {agent.name}.
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {agentTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{t.objective}</h4>
                      {getStatusBadge(t.execution_status)}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.expected_output}</p>
                  </div>
                  {t.result && (
                    <button
                      onClick={() => onViewArtifact?.(t)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 hover:text-white transition-colors flex items-center gap-1 shrink-0"
                    >
                      <FileText className="w-3 h-3" /> View Result
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-2">
              <div className="p-4 rounded-xl bg-[#070b13] border border-white/[0.08] font-mono text-xs max-h-96 overflow-y-auto custom-scrollbar space-y-2">
                {allLogs.length > 0 ? (
                  allLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2.5">
                      <span className="text-[10px] text-slate-500 shrink-0">
                        [{new Date(log.timestamp).toLocaleTimeString()}]
                      </span>
                      <span
                        className={`font-semibold shrink-0 text-[10px] uppercase ${
                          log.level === 'error'
                            ? 'text-rose-400'
                            : log.level === 'warn'
                            ? 'text-amber-400'
                            : log.level === 'success'
                            ? 'text-emerald-400'
                            : 'text-cyan-400'
                        }`}
                      >
                        [{log.level}]
                      </span>
                      <span className="text-slate-300 leading-relaxed">{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 italic">No execution logs recorded yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Core Responsibilities
                </h4>
                <div className="space-y-1.5">
                  {agent.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Assigned Tools & API Permissions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {INITIAL_TOOLS.filter((t) => agent.availableTools.includes(t.id)).map((tool) => (
                    <div
                      key={tool.id}
                      className="p-3 rounded-xl bg-slate-900/50 border border-white/[0.06] flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-white">{tool.name.split('/')[0]}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          tool.isConnected
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tool.isConnected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#080d16] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
