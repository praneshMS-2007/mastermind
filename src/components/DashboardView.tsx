import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Send,
  BarChart2,
  Calendar as CalendarIcon,
  Search,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Zap,
  Play,
  FileText,
  AlertCircle,
  Users,
  Bot,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  PageId,
  PostItem,
  WeeklyBrief,
  AnalyticsSummary,
  TrendItem,
  BrandSettings,
  UserRole,
} from '../types';

interface DashboardViewProps {
  setActivePage?: (page: PageId) => void;
  onNavigate?: (page: PageId) => void;
  weeklyBrief: WeeklyBrief;
  posts: PostItem[];
  analytics: AnalyticsSummary;
  trends?: TrendItem[];
  brandSettings?: BrandSettings;
  userRole?: UserRole;
  onOpenCreatePost?: () => void;
  onGenerateTopic?: (topic: string) => void;
  onQuickGenerateTopic?: (topic: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActivePage,
  onNavigate,
  weeklyBrief,
  posts = [],
  analytics,
  trends = [],
  brandSettings,
  onGenerateTopic,
  onQuickGenerateTopic,
}) => {
  const nav = onNavigate || setActivePage || (() => {});
  const genTopic = onGenerateTopic || onQuickGenerateTopic || (() => {});

  const [taskFilter, setTaskFilter] = useState<'all' | 'high' | 'scheduled' | 'in_review'>('all');

  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const inReviewPosts = posts.filter((p) => p.status === 'in_review');
  const suggestedTopics = weeklyBrief?.suggestedTopics || [];

  // Autonomous Agent Fleet
  const agentFleet = [
    {
      id: 'agent-marketing',
      name: 'Omni-Channel Content Agent',
      department: 'Marketing',
      deptColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      status: 'WORKING' as const,
      statusColor: 'bg-cyan-400',
      description: 'Generating LinkedIn, X & Blog variations aligned with Brand Voice.',
      metric: '98% Voice Match',
      runs: '512 tasks/mo',
      icon: Sparkles,
    },
    {
      id: 'agent-sales',
      name: 'B2B Growth & Lead Agent',
      department: 'Sales',
      deptColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      status: 'ACTIVE' as const,
      statusColor: 'bg-emerald-400',
      description: 'Architecting executive cold sequences & CTO demo funnels.',
      metric: '4.8% Avg CTR',
      runs: '210 sequences',
      icon: Send,
    },
    {
      id: 'agent-research',
      name: 'Market Intelligence Radar',
      department: 'Research',
      deptColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      status: 'ACTIVE' as const,
      statusColor: 'bg-emerald-400',
      description: 'Monitoring real-time search trends & competitor SWOT shifts.',
      metric: '+310% Trend Catch',
      runs: '128 audits',
      icon: Search,
    },
    {
      id: 'agent-operations',
      name: 'SEO & Generative Engine (GEO)',
      department: 'Operations',
      deptColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      status: 'IDLE' as const,
      statusColor: 'bg-slate-500',
      description: 'Optimizing structured schemas for AI citation & Perplexity answers.',
      metric: '342 Keywords Tracked',
      runs: '342 runs',
      icon: TrendingUp,
    },
    {
      id: 'agent-compliance',
      name: 'Brand Compliance & Reviewer',
      department: 'HR / Brand',
      deptColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      status: 'WORKING' as const,
      statusColor: 'bg-cyan-400',
      description: 'Validating safety, tone consistency, and claim accuracy.',
      metric: '100% Passed Safety',
      runs: '94 reviews',
      icon: ShieldCheck,
    },
  ];

  // Autonomous Task Queue Items (synthesized from real post pipeline & operations)
  const taskQueueItems = [
    ...posts.map((p, idx) => ({
      id: p.id,
      title: p.title,
      department: idx % 3 === 0 ? 'Marketing' : idx % 3 === 1 ? 'Sales' : 'Operations',
      priority: idx === 0 ? ('HIGH' as const) : idx === 1 ? ('HIGH' as const) : ('MEDIUM' as const),
      status: p.status === 'scheduled' ? 'Scheduled' : p.status === 'in_review' ? 'In Review' : p.status === 'published' ? 'Completed' : 'Draft',
      agent: idx % 2 === 0 ? 'Omni-Channel Content Agent' : 'B2B Growth Agent',
      time: p.scheduledAt ? new Date(p.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Pending',
      channel: p.channel,
      content: p.content,
      rawPost: p,
    })),
    {
      id: 'task-swot-1',
      title: 'Autonomous Competitor SWOT Scan (CopyFlow & AutoSocial)',
      department: 'Research',
      priority: 'MEDIUM' as const,
      status: 'Completed',
      agent: 'Market Intelligence Radar',
      time: 'Today',
      channel: 'blog' as const,
      content: 'Live web scraping completed. 2 new competitor whitepapers analyzed.',
    },
    {
      id: 'task-geo-1',
      title: 'GEO Schema Audit for AI Answer Engines (Perplexity & Gemini)',
      department: 'Operations',
      priority: 'LOW' as const,
      status: 'Scheduled',
      agent: 'SEO & GEO Agent',
      time: 'Tomorrow',
      channel: 'blog' as const,
      content: 'Injecting structured FAQ JSON-LD schemas into Q3 enterprise articles.',
    },
  ];

  const filteredTasks = taskQueueItems.filter((t) => {
    if (taskFilter === 'high') return t.priority === 'HIGH';
    if (taskFilter === 'scheduled') return t.status === 'Scheduled';
    if (taskFilter === 'in_review') return t.status === 'In Review';
    return true;
  });

  return (
    <div className="p-5 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top AI Strategy Brief Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#0d1222] to-[#120f28] border border-white/[0.08] p-5 md:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-cyan-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Autonomous Briefing • {weeklyBrief?.weekOf}
              </span>
            </div>
            <button
              onClick={() => nav('weekly_brief')}
              className="text-xs text-cyan-300 hover:text-white font-medium flex items-center gap-1 transition-colors group"
            >
              <span>View Full Strategy Report</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-3xl">
            "{weeklyBrief?.summary}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {suggestedTopics.map((top, idx) => (
              <div
                key={idx}
                className="bg-[#080c16]/80 border border-white/[0.07] hover:border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between transition-all group backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span className="uppercase font-bold tracking-wider text-cyan-400">{top.platform}</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> High Impact
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {top.topic}
                  </p>
                </div>
                <button
                  onClick={() => genTopic(top.topic)}
                  className="mt-3 text-[11px] font-medium text-cyan-400 hover:text-cyan-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <Play className="w-3 h-3 fill-cyan-400" />
                  <span>Execute Campaign Post</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Autonomous AI Agent Fleet Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Autonomous AI Agent Fleet
            </h3>
            <span className="text-[10px] text-slate-400">({agentFleet.length} Active Agents)</span>
          </div>
          <button
            onClick={() => nav('command_center')}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
          >
            <span>Open Agent Command Center</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {agentFleet.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="bg-[#0b0f1b] border border-white/[0.08] hover:border-purple-500/40 rounded-2xl p-4 space-y-3 shadow-lg hover:shadow-purple-500/5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Status Pill */}
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-white/[0.08] text-[9px] font-bold text-slate-300 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.statusColor} ${agent.status === 'WORKING' ? 'animate-pulse' : ''}`} />
                      {agent.status}
                    </span>
                  </div>

                  <div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${agent.deptColor}`}>
                      {agent.department}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                      {agent.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-snug">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">{agent.metric}</span>
                  <button
                    onClick={() => nav('command_center')}
                    className="text-purple-400 hover:text-white font-semibold flex items-center gap-0.5"
                  >
                    Chat <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b0f1b] border border-white/[0.08] hover:border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg transition-all">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Multi-Channel Reach</p>
            <h3 className="text-xl font-extrabold text-white mt-1 tracking-tight">
              {analytics.totalImpressions.toLocaleString()}
            </h3>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> +{analytics.impressionsGrowth}% this cycle
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b0f1b] border border-white/[0.08] hover:border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg transition-all">
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Engagement</p>
            <h3 className="text-xl font-extrabold text-white mt-1 tracking-tight">
              {analytics.totalEngagement.toLocaleString()}
            </h3>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> +{analytics.engagementGrowth}% vs benchmark
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b0f1b] border border-white/[0.08] hover:border-purple-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg transition-all">
          <div>
            <p className="text-xs text-slate-400 font-medium">Average CTR Precision</p>
            <h3 className="text-xl font-extrabold text-white mt-1 tracking-tight">
              {analytics.avgCTR}%
            </h3>
            <span className="text-[11px] font-semibold text-purple-300 flex items-center gap-0.5 mt-1">
              Top channel: {analytics.topPerformingChannel}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b0f1b] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg transition-all">
          <div>
            <p className="text-xs text-slate-400 font-medium">Autonomous Task Queue</p>
            <h3 className="text-xl font-extrabold text-white mt-1 tracking-tight">
              {scheduledPosts.length + inReviewPosts.length} Active Tasks
            </h3>
            <span className="text-[11px] font-medium text-amber-400 flex items-center gap-0.5 mt-1">
              <Clock className="w-3 h-3" /> Next trigger in 18 hrs
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Autonomous Task Queue + Trending Signals Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Autonomous Task Queue */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Autonomous Task Queue</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-white/[0.08] text-[10px] text-slate-400 font-semibold">
                  {filteredTasks.length} queued
                </span>
              </div>

              {/* Priority & Status Filter Pills */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <button
                  onClick={() => setTaskFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    taskFilter === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTaskFilter('high')}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    taskFilter === 'high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => setTaskFilter('scheduled')}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    taskFilter === 'scheduled'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Scheduled
                </button>
                <button
                  onClick={() => setTaskFilter('in_review')}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    taskFilter === 'in_review'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reviewing
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-2.5">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No tasks match this filter.</div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-xl bg-[#070b14] border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Priority Badge */}
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                            task.priority === 'HIGH'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : task.priority === 'MEDIUM'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {task.priority}
                        </span>

                        {/* Department Badge */}
                        <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-900 border border-white/[0.08] text-slate-300">
                          {task.department}
                        </span>

                        {/* Channel Badge */}
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                          {task.channel}
                        </span>

                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {task.time}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                        {task.title}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                        {task.content}
                      </p>

                      <div className="flex items-center gap-2 pt-0.5 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 text-purple-300 font-medium">
                          <Bot className="w-3 h-3 text-purple-400" /> {task.agent}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                          task.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : task.status === 'Scheduled'
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            : task.status === 'In Review'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {task.status}
                      </span>

                      <button
                        onClick={() => nav(task.status === 'In Review' ? 'review' : 'publishing')}
                        className="text-xs px-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 hover:text-white rounded-lg transition-colors font-medium"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick AI Launchpad */}
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              AI Command Launchpad
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => nav('generator')}
                className="p-3.5 rounded-xl bg-[#070b14] hover:bg-indigo-950/30 border border-white/[0.07] hover:border-indigo-500/40 text-left transition-all group"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Content Studio</p>
                <p className="text-[10px] text-slate-400 mt-0.5">LinkedIn, X, Blogs</p>
              </button>

              <button
                onClick={() => nav('research')}
                className="p-3.5 rounded-xl bg-[#070b14] hover:bg-emerald-950/30 border border-white/[0.07] hover:border-emerald-500/40 text-left transition-all group"
              >
                <Search className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">SWOT Radar</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Live Web Research</p>
              </button>

              <button
                onClick={() => nav('image_studio')}
                className="p-3.5 rounded-xl bg-[#070b14] hover:bg-purple-950/30 border border-white/[0.07] hover:border-purple-500/40 text-left transition-all group"
              >
                <FileText className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Visual Studio</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Carousels & Banners</p>
              </button>

              <button
                onClick={() => nav('video_studio')}
                className="p-3.5 rounded-xl bg-[#070b14] hover:bg-amber-950/30 border border-white/[0.07] hover:border-amber-500/40 text-left transition-all group"
              >
                <Play className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Video Hooks</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Reels & Script Angles</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Trending Market Radar & Team Activity */}
        <div className="lg:col-span-4 space-y-4">
          {/* Trending Market Signals Radar */}
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Market Trend Radar</h3>
              </div>
              <button
                onClick={() => nav('research')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Explore Radar
              </button>
            </div>

            <div className="space-y-2.5">
              {trends.map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-[#070b14] border border-white/[0.06] hover:border-white/[0.12] transition-all space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-400">{t.category}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      {t.growth} growth
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-100">{t.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{t.summary}</p>
                  <button
                    onClick={() => genTopic(t.title)}
                    className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 pt-1 flex items-center gap-1"
                  >
                    + Generate Campaign Post →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Team Activity Feed */}
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Workspace Activity
              </span>
              <button onClick={() => nav('team')} className="text-[11px] text-cyan-400 hover:underline">
                Manage
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate text-[11px] text-slate-300">Sarah Chen updated brand guidelines</span>
              </div>
              <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                <span className="truncate text-[11px] text-slate-300">Alex Rivera scheduled 2 LinkedIn posts</span>
              </div>
              <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="truncate text-[11px] text-slate-300">David Kalu requested AI Review for newsletter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

