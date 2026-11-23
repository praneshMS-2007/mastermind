import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  Building2,
  UserCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  X,
  Plus,
  LogOut,
  ShieldCheck,
  Users,
  Eye,
  Cpu,
  Activity,
  Command,
  Menu,
} from 'lucide-react';
import { NavPage, UserRole, AuthUser } from '../types';

interface HeaderProps {
  activePage: NavPage;
  userRole: UserRole;
  currentUser: AuthUser | null;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onOpenNewPostModal: () => void;
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  userRole,
  currentUser,
  onRoleChange,
  onLogout,
  onOpenNewPostModal,
  onToggleMobileNav,
  isMobileNavOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: '1',
      title: 'Autonomous Campaign Scheduled',
      time: '10m ago',
      desc: 'LinkedIn Thought Leadership post scheduled for tomorrow at 09:00 AM UTC.',
      type: 'scheduled',
    },
    {
      id: '2',
      title: 'AI Review & Brand Voice Score 96%',
      time: '1h ago',
      desc: 'Instagram Carousel reviewed and approved by Compliance Agent.',
      type: 'review',
    },
    {
      id: '3',
      title: 'Competitor Intelligence Alert',
      time: '3h ago',
      desc: 'Competitor launched a new campaign. Research Agent generated SWOT summary.',
      type: 'radar',
    },
  ];

  const pageTitles: Record<NavPage, { title: string; subtitle: string; tag: string }> = {
    ceo_workspace: { title: 'CEO Orchestration Workspace', subtitle: 'Strategic objective breakdown, multi-agent delegation & human-in-the-loop control', tag: 'ORCHESTRATOR' },
    tasks: { title: 'Autonomous Task Matrix', subtitle: 'Cross-project task approvals, state transitions, dependencies & deliverable outputs', tag: 'TASKS' },
    agents: { title: 'Specialized Agent Directory', subtitle: 'Active AI workforce fleet across HR, Sales, Marketing, Dev, Ops, Support & Analytics', tag: 'FLEET' },
    tools: { title: 'Tool & API Integration Registry', subtitle: 'Connected LLMs, search engines, repositories, CRMs, and email dispatchers', tag: 'INTEGRATIONS' },
    projects: { title: 'Enterprise Strategic Projects', subtitle: 'Multi-agent project management, milestone tracking & progress metrics', tag: 'PROJECTS' },
    dashboard: { title: 'Executive Command Center', subtitle: 'Real-time marketing metrics, AI agent fleet status, and task queue', tag: 'OVERVIEW' },
    command_center: { title: 'Autonomous AI Command Center', subtitle: 'Direct prompt interface & multi-agent execution workspace', tag: 'AI AGENTS' },
    weekly_brief: { title: 'Weekly Strategy Briefing', subtitle: 'Automated market intelligence and high-priority campaign pillars', tag: 'INTELLIGENCE' },
    ai_strategy: { title: 'AI Agent Fleet & GTM Hub', subtitle: 'Autonomous agent marketplace, buyer personas, and RAG knowledge base', tag: 'STRATEGY' },
    research: { title: 'Research & Competitor Radar', subtitle: 'AI web research grounding, competitor tracking, and SWOT matrix', tag: 'RESEARCH' },
    planner: { title: 'Content Planner & Calendar', subtitle: 'Multi-platform editorial schedule and campaign pipeline', tag: 'PLANNING' },
    generator: { title: 'Multi-Channel Content Generator', subtitle: 'Generate LinkedIn, X, Instagram, Blog, and Newsletter copy', tag: 'CREATION' },
    image_studio: { title: 'Visual & Infographic Studio', subtitle: 'Social banners, carousel slides, and visual prompt engineering', tag: 'STUDIO' },
    video_studio: { title: 'Short-Form Video Hook Studio', subtitle: 'Reels, Shorts & TikTok script generator with viral hooks', tag: 'STUDIO' },
    seo: { title: 'SEO & Search Optimization (GEO)', subtitle: 'Keyword suggestions, hashtags, and generative search grounding', tag: 'OPTIMIZATION' },
    review: { title: 'AI Review & Compliance Center', subtitle: 'Grammar, readability, and brand voice alignment validation', tag: 'COMPLIANCE' },
    publishing: { title: 'Publishing & Task Queue', subtitle: 'Autonomous multi-platform distribution and approval queue', tag: 'OPERATIONS' },
    automation: { title: 'Automation & Integration Hub', subtitle: 'Workflow builder, CRM connectors (HubSpot, Salesforce), n8n & webhooks', tag: 'AUTOMATION' },
    analytics: { title: 'Performance Analytics Dashboard', subtitle: 'Cross-platform engagement metrics, CTR rates, and audience reach', tag: 'ANALYTICS' },
    team: { title: 'Team Workspace & Access Control', subtitle: 'Role-based access management, team seats, and approval workflows', tag: 'TEAM' },
    brand_settings: { title: 'Brand Guidelines & Digital Assets', subtitle: 'Logos, tone of voice presets, brand color palettes, and pillars', tag: 'SETTINGS' },
    enterprise: { title: 'Enterprise Governance & Security', subtitle: 'Multi-workspace controls, RBAC, audit logs & AI token quotas', tag: 'ENTERPRISE' },
    billing: { title: 'Billing & AI Token Consumption', subtitle: 'Subscription tier, API token utilization, and rate limits', tag: 'BILLING' },
  };

  const currentMeta = pageTitles[activePage] || {
    title: 'MarketMind AI Workspace',
    subtitle: 'Autonomous AI technology & marketing operations platform',
    tag: 'WORKSPACE',
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#090d16]/85 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between sticky top-0 z-20">
      {/* Context Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleMobileNav}
          aria-label="Toggle mobile menu"
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors shrink-0"
        >
          <Menu className="w-5 h-5 text-indigo-400" />
        </button>
        <span className="hidden md:inline-flex px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold tracking-widest uppercase">
          {currentMeta.tag}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
              {currentMeta.title}
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 truncate max-w-md hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden lg:flex items-center w-72">
        <div className="w-full relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search campaigns, agents, posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c101c] border border-white/[0.08] hover:border-indigo-500/40 focus:border-indigo-500/60 rounded-xl pl-8 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all"
          />
          <span className="absolute right-2.5 top-2 text-[10px] text-slate-500 font-mono flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" />K
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Live System Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>4 Agents Online</span>
        </div>

        {/* Quick Action Button */}
        <button
          onClick={onOpenNewPostModal}
          className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Content</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-[#0c101c] hover:bg-slate-800/80 border border-white/[0.08] rounded-xl text-slate-400 hover:text-slate-200 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0d1220] border border-white/[0.1] rounded-2xl shadow-2xl p-4 space-y-3 z-50 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">System Feed</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">3 New</span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 bg-[#080c16] rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {n.title}
                      </span>
                      <span className="text-[9px] text-slate-500 font-normal shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug pl-3">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Menu */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="px-2.5 py-1 bg-[#0c101c] border border-white/[0.08] rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800/80 flex items-center gap-2 transition-colors"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-lg object-cover border border-cyan-500/40"
              />
            ) : (
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold text-white line-clamp-1">
                {currentUser?.name || 'Alex Rivera'}
              </span>
              <span className="block text-[9px] text-cyan-400 capitalize font-medium">
                {userRole.replace('_', ' ')}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#0d1220] border border-white/[0.1] rounded-2xl shadow-2xl p-3 space-y-3 z-50 text-xs backdrop-blur-xl">
              {/* User Profile Card */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-xl object-cover border border-cyan-500/40"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="overflow-hidden">
                  <span className="font-bold text-white block text-xs truncate">
                    {currentUser?.name || 'Alex Rivera'}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {currentUser?.email || 'alex@marketmind.ai'}
                  </span>
                  <span
                    className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      userRole === 'admin'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : userRole === 'team_member'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Role: {userRole.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Role Switcher */}
              <div className="space-y-1">
                <span className="px-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  Switch Active Role View
                </span>
                {(['admin', 'team_member', 'viewer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg capitalize font-medium flex items-center justify-between transition-all ${
                      userRole === r
                        ? 'bg-indigo-600/25 text-indigo-200 font-bold border border-indigo-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {r === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                      {r === 'team_member' && <Users className="w-3.5 h-3.5 text-cyan-400" />}
                      {r === 'viewer' && <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{r.replace('_', ' ')}</span>
                    </div>
                    {userRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="pt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setShowRoleMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-bold flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out / Switch Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

