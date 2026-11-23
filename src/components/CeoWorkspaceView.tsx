import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  RotateCw,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Cpu,
  Layers,
  FileText,
  UserCheck,
  ChevronRight,
  Activity,
  Send,
  Zap,
  Check,
  XCircle,
} from 'lucide-react';
import {
  AgentId,
  AgentProfile,
  AgentProject,
  AgentTask,
  TaskPriority,
} from '../types/agentTypes';
import { AgentStore } from '../services/agentStore';
import { TaskArtifactModal } from './TaskArtifactModal';
import { EditTaskModal } from './EditTaskModal';
import { AgentDetailModal } from './AgentDetailModal';

interface CeoWorkspaceViewProps {
  onNavigate: (page: any) => void;
}

export const CeoWorkspaceView: React.FC<CeoWorkspaceViewProps> = ({ onNavigate }) => {
  const store = AgentStore.getInstance();

  const [promptInput, setPromptInput] = useState(
    'Build an AI-powered client onboarding system for Shuroq.'
  );
  const [isPlanning, setIsPlanning] = useState(false);
  const [activeProject, setActiveProject] = useState<AgentProject | undefined>(
    store.getActiveProject()
  );
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [agentProfiles, setAgentProfiles] = useState<AgentProfile[]>([]);

  // Modals
  const [inspectArtifactTask, setInspectArtifactTask] = useState<AgentTask | null>(null);
  const [editingTask, setEditingTask] = useState<AgentTask | null>(null);
  const [inspectingAgent, setInspectingAgent] = useState<AgentProfile | null>(null);

  // Sync with store
  useEffect(() => {
    const update = () => {
      const active = store.getActiveProject();
      setActiveProject(active);
      if (active) {
        setTasks(store.getTasks(active.id));
      }
      setAgentProfiles(store.getAgentProfiles());
    };

    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const handleCreatePlan = async () => {
    if (!promptInput.trim() || isPlanning) return;
    setIsPlanning(true);
    try {
      const newProj = await store.createProjectWithPlan(promptInput.trim(), {
        brandName: 'Shuroq',
        industry: 'Enterprise Solutions & Technology',
      });
      setActiveProject(newProj);
      setTasks(store.getTasks(newProj.id));
    } finally {
      setIsPlanning(false);
    }
  };

  const handleApproveAll = async () => {
    if (!activeProject) return;
    await store.approvePlanAndExecute(activeProject.id);
  };

  const handleApproveSingle = (taskId: string) => {
    store.approveTask(taskId);
  };

  const handleRejectSingle = (taskId: string) => {
    store.rejectTask(taskId);
  };

  const handleReassign = (taskId: string, newAgentId: AgentId) => {
    store.reassignTask(taskId, newAgentId);
  };

  const handleRemoveTask = (taskId: string) => {
    store.removeTask(taskId);
  };

  const handleRetryTask = (taskId: string) => {
    store.retryTask(taskId);
  };

  const handleCancelTask = (taskId: string) => {
    store.cancelTask(taskId);
  };

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Compute live progress stats
  const completedTasks = tasks.filter((t) => t.execution_status === 'completed');
  const runningTasks = tasks.filter((t) => t.execution_status === 'running');
  const failedTasks = tasks.filter((t) => t.execution_status === 'failed');
  const pendingApprovalTasks = tasks.filter((t) => t.approval_status === 'pending');
  const totalTasksCount = tasks.length || 1;
  const overallProgress = Math.round((completedTasks.length / totalTasksCount) * 100);

  const isPlanPending = pendingApprovalTasks.length > 0;
  const isExecuting = runningTasks.length > 0;

  // Flatten latest logs for activity feed
  const recentLogs = tasks
    .flatMap((t) => t.logs)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  return (
    <div className="flex-1 bg-[#06090f] text-slate-100 min-h-screen p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-8 overflow-y-auto">
      {/* Top Banner / Executive Input */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#090d18] to-[#070b14] border border-white/[0.08] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              CEO Orchestration Layer
            </span>
            <span className="text-xs text-slate-400">Autonomous Enterprise Operating System</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {greeting}, Executive.
            </h1>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              What objective should our AI workforce strategize and build today?
            </p>
          </div>

          {/* Goal Input Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your strategic goal (e.g., Build an AI-powered client onboarding system for Shuroq)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreatePlan();
                }}
                className="w-full px-5 py-4 rounded-2xl bg-slate-900/90 border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
              />
            </div>
            <button
              onClick={handleCreatePlan}
              disabled={isPlanning || !promptInput.trim()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isPlanning ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-cyan-300" />
                  Strategizing Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                  Create Execution Plan
                </>
              )}
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-400">Try Prompt:</span>
            {[
              'Build an AI-powered client onboarding system for Shuroq.',
              'Launch a B2B Outbound campaign targeting enterprise CTOs.',
              'Conduct competitor SWOT audit and SEO keyword plan.',
            ].map((preset, i) => (
              <button
                key={i}
                onClick={() => setPromptInput(preset)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/[0.05] transition-colors truncate max-w-xs"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Execution Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {/* Metric Cards */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
              Overall Progress
            </span>
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 sm:mt-2 font-mono">{overallProgress}%</div>
          <div className="w-full bg-slate-800/80 h-1.5 sm:h-2 rounded-full overflow-hidden mt-2.5 sm:mt-3">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
              Pending Approval
            </span>
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1.5 sm:mt-2 font-mono">
            {pendingApprovalTasks.length}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 truncate">Executive sign-off</p>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
              Completed Tasks
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1.5 sm:mt-2 font-mono">
            {completedTasks.length} / {tasks.length}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 truncate">Verified outputs</p>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">
              Active Agents
            </span>
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 mt-1.5 sm:mt-2 font-mono">
            {agentProfiles.length} Agents
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2 truncate">AI workforce fleet</p>
        </div>
      </div>

      {/* Human Approval Banner & Execution Plan Header */}
      {activeProject && (
        <div className="rounded-2xl bg-[#090d16] border border-white/[0.08] p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Active Project
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {activeProject.id}</span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-white mt-1">
                {activeProject.title}
              </h2>
              {activeProject.strategy_summary && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                  {activeProject.strategy_summary}
                </p>
              )}
            </div>

            {/* Global Plan Approval Action Bar */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {isPlanPending && (
                <button
                  onClick={handleApproveAll}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Approve Plan & Execute
                </button>
              )}
              {isExecuting && (
                <div className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 animate-pulse">
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  Executing Multi-Agent Tasks...
                </div>
              )}
              <button
                onClick={() => onNavigate('tasks')}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-colors"
              >
                View Full Task Board
              </button>
            </div>
          </div>

          {/* Human Approval Layer Notice */}
          {isPlanPending && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300">Human Approval Required:</strong> The CEO
                Agent has formulated the strategic task breakdown below. Review, edit, reassign, or
                remove tasks. Agents will <strong>not</strong> execute until you click{' '}
                <span className="font-semibold underline">Approve Plan</span> or approve individual
                tasks.
              </div>
            </div>
          )}

          {/* Task Breakdown Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Agent Assignment Breakdown ({tasks.length} Tasks)</span>
              <span>Workflow Controls</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task) => {
                const agent = agentProfiles.find((a) => a.id === task.assigned_agent);
                const isApproved = task.approval_status === 'approved';
                const isCompleted = task.execution_status === 'completed';
                const isRunning = task.execution_status === 'running';
                const isFailed = task.execution_status === 'failed';

                return (
                  <div
                    key={task.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'bg-slate-900/40 border-emerald-500/30'
                        : isRunning
                        ? 'bg-slate-900/80 border-cyan-500/50 shadow-lg shadow-cyan-950/20'
                        : isFailed
                        ? 'bg-slate-900/60 border-rose-500/40'
                        : 'bg-slate-900/60 border-white/[0.08] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: Agent & Task Meta */}
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div
                          onClick={() => agent && setInspectingAgent(agent)}
                          className="cursor-pointer group shrink-0"
                          title="Click to view agent profile"
                        >
                          <img
                            src={
                              agent?.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                            }
                            alt={task.assigned_agent}
                            className="w-10 h-10 rounded-xl object-cover border border-white/20 group-hover:scale-105 transition-transform"
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-extrabold text-white uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded-md border border-white/[0.08]">
                              {task.assigned_agent} Agent
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase font-mono ${
                                task.priority === 'critical'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : task.priority === 'high'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {task.priority}
                            </span>
                            {/* Status Pill */}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                                isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : isRunning
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                                  : isFailed
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : isApproved
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {isCompleted && <Check className="w-3 h-3 text-emerald-400" />}
                              {isRunning && <RotateCw className="w-3 h-3 animate-spin text-cyan-400" />}
                              {isFailed && <AlertCircle className="w-3 h-3 text-rose-400" />}
                              {task.execution_status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-white leading-snug">
                            {task.objective}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {task.description}
                          </p>

                          {/* Tools & Deliverable pills */}
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 font-semibold">Tools:</span>
                              {task.required_tools.map((t, idx) => (
                                <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 truncate max-w-sm">
                              <span className="text-slate-400 font-semibold">Expected Output:</span>
                              <span className="text-slate-200 truncate">{task.expected_output}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Progress Bar & Actions */}
                      <div className="flex flex-col items-end gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                        {/* Progress display */}
                        <div className="w-full md:w-44 space-y-1">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-slate-400">Execution</span>
                            <span className={isCompleted ? 'text-emerald-400' : 'text-cyan-400'}>
                              {task.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isCompleted
                                  ? 'bg-emerald-400'
                                  : isFailed
                                  ? 'bg-rose-500'
                                  : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* Deliverable Viewer */}
                          {task.result && (
                            <button
                              onClick={() => setInspectArtifactTask(task)}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" /> View Deliverable
                            </button>
                          )}

                          {/* Retry on failure */}
                          {isFailed && (
                            <button
                              onClick={() => handleRetryTask(task.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <RotateCw className="w-3.5 h-3.5" /> Retry
                            </button>
                          )}

                          {/* Approval Controls */}
                          {task.approval_status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveSingle(task.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                title="Approve Task"
                              >
                                <Check className="w-3.5 h-3.5" /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectSingle(task.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors"
                                title="Reject Task"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {/* Edit Task */}
                          <button
                            onClick={() => setEditingTask(task)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Edit Task Parameters"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Reassign Agent Dropdown */}
                          <select
                            value={task.assigned_agent}
                            onChange={(e) => handleReassign(task.id, e.target.value as AgentId)}
                            className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 font-semibold border border-white/[0.08] focus:outline-none focus:border-indigo-500 cursor-pointer"
                            title="Reassign Agent"
                          >
                            <option value="hr">HR</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                            <option value="development">Dev</option>
                            <option value="operations">Ops</option>
                            <option value="support">Support</option>
                            <option value="analytics">Analytics</option>
                          </select>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemoveTask(task.id)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 transition-colors"
                            title="Remove Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Live Agent Fleet & Activity Log Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Fleet Status */}
        <div className="lg:col-span-2 rounded-2xl bg-[#090d16] border border-white/[0.08] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Specialized Agent Fleet
            </h3>
            <button
              onClick={() => onNavigate('agents')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              All Agents <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agentProfiles.slice(0, 6).map((agent) => (
              <div
                key={agent.id}
                onClick={() => setInspectingAgent(agent)}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] hover:border-indigo-500/40 transition-all flex items-center gap-3 cursor-pointer group"
              >
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{agent.name}</h4>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        agent.status === 'running'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                          : agent.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{agent.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity & Telemetry Stream */}
        <div className="rounded-2xl bg-[#090d16] border border-white/[0.08] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Live Telemetry Feed
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar font-mono text-xs">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.04] space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span
                      className={`font-bold uppercase ${
                        log.level === 'error'
                          ? 'text-rose-400'
                          : log.level === 'warn'
                          ? 'text-amber-400'
                          : log.level === 'success'
                          ? 'text-emerald-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {log.level}
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-tight">{log.message}</p>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-500 italic text-center py-6">
                Telemetry events will appear here during execution.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {inspectArtifactTask && (
        <TaskArtifactModal
          task={inspectArtifactTask}
          onClose={() => setInspectArtifactTask(null)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          allTasks={tasks}
          onSave={(taskId, updates) => store.editTask(taskId, updates)}
          onClose={() => setEditingTask(null)}
        />
      )}

      {inspectingAgent && (
        <AgentDetailModal
          agent={inspectingAgent}
          tasks={tasks}
          onClose={() => setInspectingAgent(null)}
          onViewArtifact={(task) => setInspectArtifactTask(task)}
        />
      )}
    </div>
  );
};
