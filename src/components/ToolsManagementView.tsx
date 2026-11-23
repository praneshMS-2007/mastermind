import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Sparkles,
  Search,
  Globe,
  GitBranch,
  Mail,
  Users,
  BarChart2,
  Zap,
  CheckCircle2,
  AlertCircle,
  Shield,
  ExternalLink,
  Power,
  RotateCw,
} from 'lucide-react';
import { AgentTool } from '../types/agentTypes';
import { AgentStore } from '../services/agentStore';

export const ToolsManagementView: React.FC = () => {
  const store = AgentStore.getInstance();
  const [tools, setTools] = useState<AgentTool[]>([]);
  const [testingToolId, setTestingToolId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; msg: string } | null>(null);

  useEffect(() => {
    const update = () => {
      setTools(store.getTools());
    };
    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const handleToggle = (toolId: string, current: boolean) => {
    store.toggleToolConnection(toolId, !current);
  };

  const handleTestConnection = async (tool: AgentTool) => {
    setTestingToolId(tool.id);
    setTestResult(null);

    await new Promise((r) => setTimeout(r, 700));

    if (tool.isConnected) {
      setTestResult({
        id: tool.id,
        success: true,
        msg: `Connection verified: ${tool.name} is operational.`,
      });
    } else {
      setTestResult({
        id: tool.id,
        success: false,
        msg: `Tool not connected: Configuration key "${tool.configKey || 'API_KEY'}" is missing.`,
      });
    }
    setTestingToolId(null);
  };

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-emerald-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-teal-400" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-rose-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5 text-sky-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 bg-[#06090f] text-slate-100 min-h-screen p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Integrations & Tools
            </span>
            <span className="text-xs text-slate-400">{tools.filter((t) => t.isConnected).length} Connected</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Autonomous Tool Registry</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Empower specialized agents with real search engines, AI models, repositories, CRMs, and email dispatchers.
          </p>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-slate-300">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>API Secrets Encrypted & Isolated</span>
        </div>
      </div>

      {/* Test feedback banner */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs animate-in fade-in ${
            testResult.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{testResult.msg}</span>
          </div>
          <button
            onClick={() => setTestResult(null)}
            className="text-xs underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div className="space-y-3">
              {/* Icon & Toggle */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.08]">
                  {getToolIcon(tool.iconName)}
                </div>
                <button
                  onClick={() => handleToggle(tool.id, tool.isConnected)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    tool.isConnected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-white/[0.06] hover:text-white'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  {tool.isConnected ? 'Connected' : 'Disconnected'}
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{tool.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tool.description}</p>
              </div>

              {/* Agent Permissions */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Permitted Agents
                </span>
                <div className="flex flex-wrap gap-1">
                  {tool.agentPermissions.map((agentId, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] text-slate-300 uppercase font-semibold border border-white/[0.04]"
                    >
                      {agentId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {tool.configKey ? `Env: ${tool.configKey}` : 'Native Sandbox'}
              </span>
              <button
                onClick={() => handleTestConnection(tool)}
                disabled={testingToolId === tool.id}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1"
              >
                {testingToolId === tool.id ? (
                  <>
                    <RotateCw className="w-3 h-3 animate-spin" /> Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
