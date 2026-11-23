import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCw,
  Edit3,
  Trash2,
  Check,
  XCircle,
  Sliders,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { AgentId, AgentProject, AgentTask, TaskExecutionStatus, TaskPriority } from '../types/agentTypes';
import { AgentStore } from '../services/agentStore';
import { EditTaskModal } from './EditTaskModal';
import { TaskArtifactModal } from './TaskArtifactModal';

export const TasksManagementView: React.FC = () => {
  const store = AgentStore.getInstance();
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [projects, setProjects] = useState<AgentProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const [editingTask, setEditingTask] = useState<AgentTask | null>(null);
  const [inspectArtifactTask, setInspectArtifactTask] = useState<AgentTask | null>(null);

  useEffect(() => {
    const update = () => {
      setTasks(store.getTasks());
      setProjects(store.getProjects());
    };
    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assigned_agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.execution_status === statusFilter;
    const matchesAgent = agentFilter === 'all' || t.assigned_agent === agentFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesAgent && matchesPriority;
  });

  return (
    <div className="flex-1 bg-[#06090f] text-slate-100 min-h-screen p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Task Management
            </span>
            <span className="text-xs text-slate-400">{tasks.length} Total Registered Tasks</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Autonomous Task Matrix</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor, approve, reassign, and inspect task execution states across all enterprise projects.
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08]">
            <span className="text-slate-400">Approved: </span>
            <span className="text-emerald-400 font-bold">
              {tasks.filter((t) => t.approval_status === 'approved').length}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08]">
            <span className="text-slate-400">Pending: </span>
            <span className="text-amber-400 font-bold">
              {tasks.filter((t) => t.approval_status === 'pending').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-white/[0.08] flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

        {/* Agent Filter */}
        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Agents</option>
          <option value="ceo">CEO Agent</option>
          <option value="hr">HR Agent</option>
          <option value="marketing">Marketing Agent</option>
          <option value="sales">Sales Agent</option>
          <option value="development">Dev Agent</option>
          <option value="operations">Operations Agent</option>
          <option value="support">Support Agent</option>
          <option value="analytics">Analytics Agent</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-slate-300 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tasks Table / Card List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isCompleted = task.execution_status === 'completed';
            const isRunning = task.execution_status === 'running';
            const isFailed = task.execution_status === 'failed';
            const isPending = task.approval_status === 'pending';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-slate-900/40 border-emerald-500/20'
                    : isRunning
                    ? 'bg-slate-900/80 border-cyan-500/40'
                    : isFailed
                    ? 'bg-slate-900/60 border-rose-500/40'
                    : 'bg-[#090d16] border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {/* Left: Task Info */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                      {task.assigned_agent} Agent
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase font-mono ${
                        task.priority === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : task.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : isRunning
                          ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                          : isFailed
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {task.execution_status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white truncate">{task.objective}</h3>
                  <p className="text-xs text-slate-400 truncate max-w-2xl">{task.description}</p>
                </div>

                {/* Right: Progress & Action Controls */}
                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                  {task.result && (
                    <button
                      onClick={() => setInspectArtifactTask(task)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> Output
                    </button>
                  )}

                  {isPending && (
                    <button
                      onClick={() => store.approveTask(task.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}

                  {isFailed && (
                    <button
                      onClick={() => store.retryTask(task.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" /> Retry
                    </button>
                  )}

                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Task"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <select
                    value={task.assigned_agent}
                    onChange={(e) => store.reassignTask(task.id, e.target.value as AgentId)}
                    className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 font-semibold border border-white/[0.08] focus:outline-none cursor-pointer"
                  >
                    <option value="hr">HR</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="development">Dev</option>
                    <option value="operations">Ops</option>
                    <option value="support">Support</option>
                    <option value="analytics">Analytics</option>
                  </select>

                  <button
                    onClick={() => store.removeTask(task.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 transition-colors"
                    title="Remove Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-white/[0.08] text-slate-400 text-xs">
            No tasks match the selected filters.
          </div>
        )}
      </div>

      {/* Modals */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          allTasks={tasks}
          onSave={(taskId, updates) => store.editTask(taskId, updates)}
          onClose={() => setEditingTask(null)}
        />
      )}

      {inspectArtifactTask && (
        <TaskArtifactModal
          task={inspectArtifactTask}
          onClose={() => setInspectArtifactTask(null)}
        />
      )}
    </div>
  );
};
