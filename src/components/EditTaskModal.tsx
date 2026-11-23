import React, { useState } from 'react';
import { X, Plus, Trash2, ShieldCheck, Check, Sliders, Cpu } from 'lucide-react';
import { AgentId, AgentTask, TaskPriority } from '../types/agentTypes';
import { INITIAL_TOOLS } from '../../lib/tools/toolRegistry';

interface EditTaskModalProps {
  task: AgentTask;
  allTasks: AgentTask[];
  onSave: (taskId: string, updates: Partial<AgentTask>) => void;
  onClose: () => void;
}

const AGENTS_LIST: { id: AgentId; name: string }[] = [
  { id: 'ceo', name: 'CEO Orchestrator' },
  { id: 'marketing', name: 'Marketing & Growth' },
  { id: 'sales', name: 'Sales & Revenue' },
  { id: 'development', name: 'Engineering & Dev' },
  { id: 'operations', name: 'Operations & SOP' },
  { id: 'hr', name: 'HR & Workforce' },
  { id: 'support', name: 'Support & Experience' },
  { id: 'analytics', name: 'Analytics & KPIs' },
];

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  allTasks,
  onSave,
  onClose,
}) => {
  const [assignedAgent, setAssignedAgent] = useState<AgentId>(task.assigned_agent);
  const [objective, setObjective] = useState(task.objective);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [expectedOutput, setExpectedOutput] = useState(task.expected_output);
  const [subtasks, setSubtasks] = useState<string[]>(task.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');
  const [requiredTools, setRequiredTools] = useState<string[]>(task.required_tools || []);
  const [dependencies, setDependencies] = useState<string[]>(task.dependencies || []);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const toggleTool = (toolId: string) => {
    if (requiredTools.includes(toolId)) {
      setRequiredTools(requiredTools.filter((t) => t !== toolId));
    } else {
      setRequiredTools([...requiredTools, toolId]);
    }
  };

  const toggleDependency = (depId: string) => {
    if (dependencies.includes(depId)) {
      setDependencies(dependencies.filter((d) => d !== depId));
    } else {
      setDependencies([...dependencies, depId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task.id, {
      assigned_agent: assignedAgent,
      objective,
      description,
      priority,
      expected_output: expectedOutput,
      subtasks,
      required_tools: requiredTools,
      dependencies,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b101b] border border-white/[0.12] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#080d16]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Edit Task Parameters</h2>
              <p className="text-xs text-slate-400">Modify workforce assignment, priority, and tools</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {/* Assigned Agent & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Assigned Agent
              </label>
              <select
                value={assignedAgent}
                onChange={(e) => setAssignedAgent(e.target.value as AgentId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-medium"
              >
                {AGENTS_LIST.map((agent) => (
                  <option key={agent.id} value={agent.id} className="bg-slate-900 text-white">
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-medium"
              >
                <option value="low" className="bg-slate-900">Low Priority</option>
                <option value="medium" className="bg-slate-900">Medium Priority</option>
                <option value="high" className="bg-slate-900">High Priority</option>
                <option value="critical" className="bg-slate-900">Critical Priority</option>
              </select>
            </div>
          </div>

          {/* Objective */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Task Objective
            </label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Detailed Description & Instructions
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Expected Output */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Expected Deliverable / Output
            </label>
            <input
              type="text"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Execution Subtasks ({subtasks.length})
            </label>
            <div className="space-y-2 mb-2">
              {subtasks.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.06] text-xs text-slate-300"
                >
                  <span className="truncate pr-2">{st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(i)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add subtask step..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Required Tools */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Required Tools & Integrations
            </label>
            <div className="flex flex-wrap gap-2">
              {INITIAL_TOOLS.map((t) => {
                const isSelected = requiredTools.includes(t.id);
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => toggleTool(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                    {t.name.split('/')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dependencies */}
          {allTasks.filter((t) => t.id !== task.id).length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Upstream Task Dependencies
              </label>
              <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar p-1">
                {allTasks
                  .filter((t) => t.id !== task.id)
                  .map((otherTask) => {
                    const isDep = dependencies.includes(otherTask.id);
                    return (
                      <button
                        type="button"
                        key={otherTask.id}
                        onClick={() => toggleDependency(otherTask.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all flex items-center justify-between ${
                          isDep
                            ? 'bg-purple-900/20 text-purple-200 border-purple-500/40'
                            : 'bg-slate-900/40 text-slate-400 border-white/[0.05] hover:border-white/[0.1]'
                        }`}
                      >
                        <span className="truncate">
                          <strong className="text-slate-300 uppercase mr-1">
                            [{otherTask.assigned_agent}]
                          </strong>{' '}
                          {otherTask.objective}
                        </span>
                        {isDep && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
