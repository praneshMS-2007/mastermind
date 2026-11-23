import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Send,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Sparkles,
  Award,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Activity,
} from 'lucide-react';
import { AnalyticsSummary, PostItem } from '../types';
import { AgentStore } from '../services/agentStore';

interface AnalyticsDashboardViewProps {
  analytics: AnalyticsSummary;
  posts: PostItem[];
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  analytics,
  posts = [],
}) => {
  const store = AgentStore.getInstance();
  const [activeTab, setActiveTab] = useState<'workforce' | 'marketing'>('workforce');
  const [workforceStats, setWorkforceStats] = useState(store.getAnalytics());

  useEffect(() => {
    const update = () => {
      setWorkforceStats(store.getAnalytics());
    };
    update();
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, []);

  const publishedPosts = (posts || []).filter((p) => p.status === 'published' && p.analytics);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Executive Analytics & Telemetry
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                Analytics Agent: Active
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Business & Agent Intelligence</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live telemetry tracking multi-agent execution success rates, workforce capacity, and marketing performance.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('workforce')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'workforce'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> AI Workforce Telemetry
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'marketing'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Marketing Performance
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'workforce' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Workforce KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Total AI Projects</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{workforceStats.totalProjects}</p>
              <span className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                <Activity className="w-3 h-3" /> {workforceStats.activeProjects} Active Projects
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Completed Tasks</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-400 font-mono">
                {workforceStats.completedTasks} / {workforceStats.totalTasks}
              </p>
              <span className="text-[11px] font-semibold text-slate-400">
                {workforceStats.pendingApprovalTasks} Pending Approval
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Execution Success Rate</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{workforceStats.successRate}%</p>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Enterprise Grade Reliability
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Avg Task Latency</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-400 font-mono">{workforceStats.avgCompletionTime}</p>
              <span className="text-[11px] font-semibold text-slate-400">
                Sub-second model dispatch
              </span>
            </div>
          </div>

          {/* Agent Utilization Breakdown */}
          <div className="bg-[#0b0f1b]/90 border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Agent Fleet Utilization & Workload
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workforceStats.agentUtilization.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase">{agent.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        agent.status === 'running'
                          ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                          : agent.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{agent.department}</div>

                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Tasks Done:</span>
                    <span className="text-emerald-400 font-bold">{agent.completedTasks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marketing' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl hover:border-cyan-500/30 rounded-2xl p-5 space-y-2 shadow-xl transition-all">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Total Impressions</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{analytics.totalImpressions.toLocaleString()}</p>
              <span className="text-[11px] font-semibold font-mono text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{analytics.impressionsGrowth}% this month
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl hover:border-purple-500/30 rounded-2xl p-5 space-y-2 shadow-xl transition-all">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Engagement Actions</span>
                <Heart className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{analytics.totalEngagement.toLocaleString()}</p>
              <span className="text-[11px] font-semibold font-mono text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{analytics.engagementGrowth}% vs target
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/30 rounded-2xl p-5 space-y-2 shadow-xl transition-all">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Average CTR Rate</span>
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{analytics.avgCTR}%</p>
              <span className="text-[11px] font-semibold font-mono text-indigo-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{analytics.ctrGrowth}% increase
              </span>
            </div>

            <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl hover:border-amber-500/30 rounded-2xl p-5 space-y-2 shadow-xl transition-all">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Top Channel</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white uppercase font-mono">{analytics.topPerformingChannel}</p>
              <span className="text-[11px] font-semibold font-mono text-slate-400">
                {analytics.publishedCount} Total Posts Published
              </span>
            </div>
          </div>

          {/* Grid: Channel Breakdown + Top Performing Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Channel Distribution & Engagement
              </h3>
              <div className="space-y-3">
                {analytics.channelBreakdown.map((item) => (
                  <div key={item.channel} className="p-3 rounded-xl bg-slate-900/50 border border-white/[0.04] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white uppercase">{item.channel}</span>
                      <p className="text-[11px] text-slate-400">{item.posts} published posts</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 font-mono">{item.growthRate}</span>
                      <p className="text-[11px] text-slate-400 font-mono">{item.engagement.toLocaleString()} actions</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Top Performing Content
              </h3>
              <div className="space-y-3">
                {publishedPosts.length > 0 ? (
                  publishedPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.04] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase font-mono">
                          {post.channel}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">
                          {post.analytics?.views.toLocaleString()} views
                        </span>
                      </div>
                      <p className="text-xs text-white font-medium line-clamp-2">{post.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 italic">
                    Published post performance will appear here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
