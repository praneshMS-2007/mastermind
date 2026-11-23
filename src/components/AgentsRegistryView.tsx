import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Zap,
  Activity,
  Search,
  Filter,
} from 'lucide-react';
import { AgentProfile, AgentTask } from '../types/agentTypes';
import { AgentStore } from '../services/agentStore';
import { AgentDetailModal } from './AgentDetailModal';
import { TaskArtifactModal } from './TaskArtifactModal';

export const AgentsRegistryView: React.FC = () => {
  const store = AgentStore.getInstance();
  const [agents, setAgents] = useState<AgentProfile[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);
  const [inspectArtifactTask, setInspectArtifactTask] = useState<AgentTask | null>(null);

  useEffect(() => {
    const update = () => {
      setAgents(store.getAgentProfiles());
      setTasks(store.getTasks());
    };
    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'all' || agent.department.includes(departmentFilter);
    return matchesSearch && matchesDept;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Running
          </span>
        );
      case 'waiting_for_approval':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Pending Approval
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-white/[0.08] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Available
          </span>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#06090f] text-slate-100 min-h-screen p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Workforce Directory
            </span>
            <span className="text-xs text-slate-400">{agents.length} Coordinated Agents</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Autonomous Agent Fleet</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Specialized AI workforce members with assigned capabilities, tool permissions, and operational SLAs.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search agents or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className="group p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/30 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4"
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 rounded-md bg-slate-950 border border-white/20">
                    <Cpu className="w-2.5 h-2.5 text-cyan-400" />
                  </div>
                </div>
                {getStatusBadge(agent.status)}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">{agent.role}</p>
                <p className="text-[11px] text-indigo-300/80 italic mt-0.5">{agent.tagline}</p>
              </div>

              {/* Department */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-semibold uppercase tracking-wider">{agent.department}</span>
                <span className="font-mono text-slate-300">{agent.availableTools.length} Tools</span>
              </div>

              {/* Capabilities snippet */}
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 2).map((cap, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] text-slate-300 border border-white/[0.04]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Stats & Action */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">{agent.successRate}% Success</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{agent.avgLatency}</span>
              </div>
              <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                Inspect <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent}
          tasks={tasks}
          onClose={() => setSelectedAgent(null)}
          onViewArtifact={(t) => setInspectArtifactTask(t)}
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
