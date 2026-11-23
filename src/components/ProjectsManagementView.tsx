import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  Cpu,
  ArrowRight,
  Sparkles,
  Activity,
} from 'lucide-react';
import { AgentProject, AgentTask } from '../types/agentTypes';
import { AgentStore } from '../services/agentStore';

interface ProjectsManagementViewProps {
  onNavigateToCeo: () => void;
}

export const ProjectsManagementView: React.FC<ProjectsManagementViewProps> = ({
  onNavigateToCeo,
}) => {
  const store = AgentStore.getInstance();
  const [projects, setProjects] = useState<AgentProject[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [newObjective, setNewObjective] = useState('');

  useEffect(() => {
    const update = () => {
      setProjects(store.getProjects());
      setTasks(store.getTasks());
      const active = store.getActiveProject();
      if (active) setActiveProjectId(active.id);
    };
    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const handleSelectProject = (projectId: string) => {
    store.setActiveProject(projectId);
    setActiveProjectId(projectId);
    onNavigateToCeo();
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjective.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const proj = await store.createProjectWithPlan(newObjective.trim());
      setNewObjective('');
      store.setActiveProject(proj.id);
      onNavigateToCeo();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex-1 bg-[#06090f] text-slate-100 min-h-screen p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Project Hub
            </span>
            <span className="text-xs text-slate-400">{projects.length} Total Projects</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Enterprise AI Projects</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinate multi-agent strategic initiatives, track milestones, and switch active operating projects.
          </p>
        </div>
      </div>

      {/* Create Project Card */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-white/[0.08] shadow-xl">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Initialize New Strategic Project
        </h2>
        <form onSubmit={handleCreateProject} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter business objective (e.g., Build an automated enterprise onboarding system)..."
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-white/[0.1] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={isCreating || !newObjective.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            {isCreating ? 'Creating Plan...' : 'Create & Plan with CEO'}
          </button>
        </form>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.project_id === project.id);
          const completedCount = projectTasks.filter((t) => t.execution_status === 'completed').length;
          const totalCount = projectTasks.length || 1;
          const progress = project.progress ?? Math.round((completedCount / totalCount) * 100);
          const isActive = project.id === activeProjectId;

          return (
            <div
              key={project.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow-lg ${
                isActive
                  ? 'bg-slate-900/80 border-indigo-500/60 ring-1 ring-indigo-500/30'
                  : 'bg-[#090d16] border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      project.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : project.status === 'in_progress'
                        ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {project.status.replace(/_/g, ' ')}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      Active
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.objective}</p>
                </div>

                {/* Assigned Agents */}
                <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Workforce Roster
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.assigned_agents.map((agentId, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 uppercase font-semibold"
                      >
                        {agentId}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-emerald-400 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {completedCount} / {projectTasks.length} Tasks Done
                </span>
                <button
                  onClick={() => handleSelectProject(project.id)}
                  className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Open in CEO Workspace <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
